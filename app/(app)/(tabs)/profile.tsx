import { SignOutButton } from "@/components/SignOutButton";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getUserDisplayName, getUserInitials } from "@/lib/utils/user";
import { useUser } from "@clerk/clerk-expo";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { client } from "@/lib/sanity";
import { Image, Pressable, StyleSheet, Modal, Alert } from "react-native";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Card,
  H1,
  H2,
  ScrollView,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
  Input,
  Label,
  Button,
  Paragraph
} from "tamagui";

let isNavigatingToAbout = false;

export default function Profile() {
  const { user, isLoaded } = useUser();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];
  const router = useRouter();
  
  const [validatedCount, setValidatedCount] = useState(0);

  const [dni, setDni] = useState((user?.unsafeMetadata?.dni as string) || '');
  const [curso, setCurso] = useState((user?.unsafeMetadata?.curso as string) || '');
  const [facultad, setFacultad] = useState((user?.unsafeMetadata?.facultad as string) || '');
  const [escuela, setEscuela] = useState((user?.unsafeMetadata?.escuela as string) || '');
  const [diaClase, setDiaClase] = useState((user?.unsafeMetadata?.dia_clase as string) || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);

  const generateCertificateHTML = (name: string, date: string, code: string) => `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; margin: 0; padding: 0; background: white; color: #08130D; }
        .container { width: 1000px; height: 700px; border: 15px solid #1FC451; padding: 40px; box-sizing: border-box; text-align: center; position: relative; }
        .logo { font-size: 32px; font-weight: bold; color: #1FC451; margin-bottom: 20px; }
        .title { font-size: 50px; font-weight: bold; margin: 20px 0; text-transform: uppercase; letter-spacing: 2px; }
        .subtitle { font-size: 24px; color: #555; margin-bottom: 40px; }
        .name { font-size: 45px; font-weight: bold; color: #15963c; border-bottom: 2px solid #1FC451; display: inline-block; padding: 0 40px 10px; margin-bottom: 40px; }
        .text { font-size: 20px; color: #444; line-height: 1.6; max-w: 800px; margin: 0 auto 40px; }
        .footer { position: absolute; bottom: 50px; width: calc(100% - 80px); display: flex; justify-content: space-between; align-items: flex-end; }
        .signature { border-top: 1px solid #000; padding-top: 10px; width: 250px; text-align: center; font-size: 16px; }
        .validation-box { text-align: right; font-size: 14px; color: #666; }
        .code { font-weight: bold; font-family: monospace; font-size: 16px; color: #000; }
        .bg-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; font-size: 400px; z-index: -1; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="bg-icon">🌿</div>
        <div class="logo">🌿 PLANT-OR</div>
        <div class="title">Certificado de Reconocimiento</div>
        <div class="subtitle">Otorgado a</div>
        
        <div class="name">${name}</div>
        
        <div class="text">
          Por haber completado exitosamente la meta de <strong>100 registros botánicos validados</strong> en la plataforma PLANT-OR, 
          contribuyendo significativamente a la catalogación y conservación de nuestra flora urbana.
        </div>
        
        <div class="footer">
          <div class="signature">
            <strong>Firma Autorizada</strong><br>
            Proyecto PLANT-OR
          </div>
          
          <div class="validation-box">
            Emitido el: ${date}<br><br>
            Verifique la autenticidad de este<br>
            documento en nuestro portal web<br>
            Código: <span class="code">${code}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const handleGenerateCertificate = async () => {
    if (!user) return;
    setIsGeneratingCert(true);
    
    try {
      // 1. Check if certificate exists
      const existingCert = await client.fetch(`*[_type == "certificado" && usuario_id == $userId][0]`, { userId: user.id });
      
      let certData;
      
      if (existingCert) {
        certData = existingCert;
      } else {
        // Create new certificate
        const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
        const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const newCode = `CERT-${dateStr}-${randomStr}`;
        
        const writeClient = client.withConfig({
          token: process.env.EXPO_PUBLIC_SANITY_TOKEN,
        });
        
        certData = await writeClient.create({
          _type: 'certificado',
          codigo: newCode,
          usuario_id: user.id,
          usuario_nombre: getUserDisplayName(user),
          fecha_emision: new Date().toISOString()
        });
      }
      
      // 2. Generate PDF
      const dateStrFormatted = new Date(certData.fecha_emision).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      const html = generateCertificateHTML(certData.usuario_nombre, dateStrFormatted, certData.codigo);
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      // 3. Share / Save
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Mi Certificado PLANT-OR',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert("Error", "La función de compartir no está disponible en este dispositivo.");
      }
      
    } catch (error) {
      console.error("Error generating certificate", error);
      Alert.alert("Error", "No se pudo generar el certificado. Verifica tu conexión.");
    } finally {
      setIsGeneratingCert(false);
    }
  };

  const pickProfilePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Se requiere permiso para acceder a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });
    
    if (!result.canceled && result.assets[0].base64) {
      try {
        setIsSaving(true);
        // Clerk expect a base64 string prefix
        const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        await user?.setProfileImage({ file: base64Image });
        await user?.reload();
        Alert.alert("Éxito", "Foto de perfil actualizada correctamente.");
      } catch (err) {
        console.error("Error al subir foto", err);
        Alert.alert("Error", "No se pudo actualizar la foto de perfil.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const saveProfile = async () => {
    setErrorMsg('');
    if (!user) return;
    
    if (!dni || dni.length !== 8) {
      setErrorMsg("El DNI debe tener exactamente 8 dígitos numéricos.");
      return;
    }

    setIsSaving(true);
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          dni,
          curso,
          facultad,
          escuela,
          dia_clase: diaClase
        }
      });
      // Forzar recarga de Clerk para sincronizar de inmediato
      await user.reload();
      
      setIsEditing(false);
      setShowSuccess(true);
    } catch (e) {
      console.error(e);
      setErrorMsg("Error al guardar el perfil. Intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        // Solo contamos los registros en estado "Validado"
        client.fetch(`count(*[_type == "planta" && autor == $userId && estado_revision == "Validado"])`, { userId: user.id })
          .then(count => setValidatedCount(count))
          .catch(err => console.error(err));
      }
    }, [user?.id])
  );

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Spinner size="large" />
        </View>
      </View>
    );
  }

  const initials = getUserInitials(user);
  const displayName = getUserDisplayName(user);

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 20,
        }}
      >
        <YStack px="$4" gap="$4" pb={insets.bottom + 100}>
          {/* Profile Header Card */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$6"
          >
            <YStack gap="$4" style={{ alignItems: "center" }}>
              {/* Profile Picture */}
              <Pressable 
                onPress={pickProfilePhoto}
                style={({ pressed }) => [
                  {
                    borderRadius: 60,
                    width: 120,
                    height: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e5e7eb",
                    position: 'relative'
                  },
                  pressed && { opacity: 0.8 }
                ]}
              >
                <View style={{ borderRadius: 60, overflow: 'hidden', width: 120, height: 120, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb' }}>
                  {user?.imageUrl ? (
                    <Image
                      source={{ uri: user.imageUrl }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Text fontSize={42} fontWeight="700" color="$color11">
                      {initials}
                    </Text>
                  )}
                </View>
                <View style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, backgroundColor: '#1FC451', borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#1e1e1e' }}>
                  <MaterialCommunityIcons name="camera" size={16} color="white" />
                </View>
              </Pressable>

              {/* Name & Email */}
              <Pressable onPress={() => setIsEditing(true)}>
                <YStack style={{ alignItems: "center" }} gap="$2">
                  <H1
                    fontSize={28}
                    fontWeight="700"
                    color="#ffffff"
                    style={{ textAlign: "center" }}
                  >
                    {displayName}
                  </H1>
                  {user?.primaryEmailAddress?.emailAddress && (
                    <Text fontSize={14} color="rgba(255,255,255,0.7)">
                      {user.primaryEmailAddress.emailAddress}
                    </Text>
                  )}
                  <XStack gap="$1" style={{ alignItems: "center", marginTop: 4 }}>
                    <MaterialCommunityIcons name="pencil-outline" size={14} color="#1FC451" />
                    <Text fontSize={12} color="#1FC451" fontWeight="bold">Toca para editar perfil académico</Text>
                  </XStack>
                </YStack>
              </Pressable>

              {/* Plan Badge */}
              <View style={styles.proPlanBadge}>
                <Text fontSize={13} fontWeight="700" color="#1FC451">
                  🌱 PLANT-OR
                </Text>
              </View>
            </YStack>
          </Card>

          {/* Progreso del Curso Card - Solo visible para estudiantes */}
          {(user?.unsafeMetadata?.dni || user?.unsafeMetadata?.facultad) && (
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$5"
          >
            <YStack gap="$3">
              <XStack style={{ alignItems: 'center' }} gap="$2" mb="$1">
                <MaterialCommunityIcons name="leaf" size={24} color="#1FC451" />
                <H2 fontSize={18} fontWeight="700" color="#ffffff">
                  Progreso del Curso
                </H2>
              </XStack>
              
              <Text fontSize={14} color="rgba(255,255,255,0.7)">
                Necesitas registrar 20 especies distintas para cumplir con la meta del curso.
              </Text>
              
              <View style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden', marginTop: 10 }}>
                <View style={{ width: `${Math.min((validatedCount / 20) * 100, 100)}%`, height: '100%', backgroundColor: '#1FC451', borderRadius: 6 }} />
              </View>
              
              <XStack style={{ justifyContent: 'space-between' }} mt="$1">
                <Text fontSize={12} color="#1FC451" fontWeight="bold">
                  {validatedCount} validadas
                </Text>
                <Text fontSize={12} color="rgba(255,255,255,0.5)">
                  Meta: 20
                </Text>
              </XStack>
            </YStack>
          </Card>
          )}

          {/* Certificación Progress Card */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$5"
          >
            <YStack gap="$3">
              <XStack style={{ alignItems: 'center' }} gap="$2" mb="$1">
                <MaterialCommunityIcons name="certificate" size={24} color="#1FC451" />
                <H2 fontSize={18} fontWeight="700" color="#ffffff">
                  {validatedCount >= 100 ? '¡Certificado Desbloqueado!' : 'Progreso para Certificado'}
                </H2>
              </XStack>
              
              <Text fontSize={14} color="rgba(255,255,255,0.7)">
                {validatedCount >= 100 
                  ? 'Has alcanzado los 100 registros validados. Ya puedes generar tu certificado oficial del proyecto.'
                  : 'Al alcanzar 100 registros validados obtendrás un Certificado Digital oficial del proyecto. (Aplica para estudiantes y ciudadanos).'}
              </Text>
              
              {validatedCount >= 100 ? (
                <Button
                  mt="$2"
                  bg="#1FC451"
                  color="white"
                  onPress={handleGenerateCertificate}
                  disabled={isGeneratingCert}
                  opacity={isGeneratingCert ? 0.7 : 1}
                  icon={isGeneratingCert ? <Spinner color="white" /> : <MaterialCommunityIcons name="download" size={20} color="white" />}
                >
                  {isGeneratingCert ? 'Generando PDF...' : 'Generar Certificado Oficial'}
                </Button>
              ) : (
                <>
                  <View style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden', marginTop: 10 }}>
                    <View style={{ width: `${Math.min((validatedCount / 100) * 100, 100)}%`, height: '100%', backgroundColor: '#1FC451', borderRadius: 6 }} />
                  </View>
                  
                  <XStack style={{ justifyContent: 'space-between' }} mt="$1">
                    <Text fontSize={12} color="#1FC451" fontWeight="bold">
                      {validatedCount} validadas
                    </Text>
                    <Text fontSize={12} color="rgba(255,255,255,0.5)">
                      Meta: 100
                    </Text>
                  </XStack>
                </>
              )}
            </YStack>
          </Card>



          {/* Acerca de Section */}
          <Pressable 
            onPress={() => {
              if (isNavigatingToAbout) return;
              isNavigatingToAbout = true;
              router.push("/about");
              setTimeout(() => { isNavigatingToAbout = false; }, 800);
            }}
          >
            <Card
              size="$4"
              bordered
              bg="rgba(255,255,255,0.05)"
              borderColor="rgba(255,255,255,0.1)"
              padding="$5"
            >
              <YStack gap="$4">
                <YStack gap="$2">
                  <XStack style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <H2 fontSize={18} fontWeight="700" color="#ffffff">
                      PLANT-OR
                    </H2>
                    <Feather name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
                  </XStack>
                  <Text fontSize={14} color="rgba(255,255,255,0.7)" lineHeight={22} fontWeight="bold">
                    Catálogo Virtual de Plantas Ornamentales Amazónicas
                  </Text>
                  <Text fontSize={12} color="rgba(255,255,255,0.5)" lineHeight={18} mt="$1">
                    Proyecto de Responsabilidad Social Universitaria (RSU){'\n'}
                    Facultad de Ciencias Forestales & Fac. de Ing. de Sistemas - UNAP
                  </Text>
                </YStack>
              </YStack>
            </Card>
          </Pressable>

          {/* Account Section */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$5"
          >
            <YStack gap="$4">
              <YStack gap="$2">
                <H2 fontSize={18} fontWeight="700" color="#ffffff">
                  Cuenta
                </H2>
                <Text fontSize={13} color="rgba(255,255,255,0.7)" lineHeight={18}>
                  Administrar la configuración de tu cuenta
                </Text>
              </YStack>
              <SignOutButton />
            </YStack>
          </Card>
        </YStack>
      </ScrollView>

      {/* Modal de Edición de Perfil */}
      <Modal visible={isEditing} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#12221A', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <XStack style={{ justifyContent: "space-between", alignItems: "center" }} mb="$4">
              <H2 color="white" fontSize={20}>Editar Datos</H2>
              <Pressable onPress={() => setIsEditing(false)}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </XStack>

            <YStack gap="$4" pb={insets.bottom > 0 ? insets.bottom : 20}>
              <YStack gap="$2">
                <Label color="#ffffff">DNI (8 dígitos)</Label>
                <Input
                  value={dni}
                  onChangeText={(text) => setDni(text.replace(/[^0-9]/g, ''))}
                  maxLength={8}
                  keyboardType="numeric"
                  bg="rgba(255,255,255,0.05)"
                  borderWidth={0}
                  color="white"
                />
              </YStack>

              <YStack gap="$2">
                <Label color="#ffffff">Facultad</Label>
                <Input
                  value={facultad}
                  onChangeText={setFacultad}
                  bg="rgba(255,255,255,0.05)"
                  borderWidth={0}
                  color="white"
                />
              </YStack>

              <YStack gap="$2">
                <Label color="#ffffff">Escuela</Label>
                <Input
                  value={escuela}
                  onChangeText={setEscuela}
                  bg="rgba(255,255,255,0.05)"
                  borderWidth={0}
                  color="white"
                />
              </YStack>

              <YStack gap="$2">
                <Label color="#ffffff">Curso</Label>
                <Input
                  value={curso}
                  onChangeText={setCurso}
                  bg="rgba(255,255,255,0.05)"
                  borderWidth={0}
                  color="white"
                />
              </YStack>

              <YStack gap="$2">
                <Label color="#ffffff">Día de clase</Label>
                <Input
                  value={diaClase}
                  onChangeText={setDiaClase}
                  placeholder="Ej. Martes"
                  bg="rgba(255,255,255,0.05)"
                  borderWidth={0}
                  color="white"
                />
              </YStack>

              {errorMsg ? (
                <View style={{ backgroundColor: 'rgba(255,68,68,0.2)', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ff4444' }}>
                  <Text style={{ color: '#ff4444', textAlign: 'center', fontSize: 13 }}>{errorMsg}</Text>
                </View>
              ) : null}

              <Button 
                mt="$4" 
                bg="#1FC451" 
                color="#08130D" 
                onPress={saveProfile}
                disabled={isSaving}
                opacity={isSaving ? 0.5 : 1}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </YStack>
          </View>
        </View>
      </Modal>

      {/* Modal de Éxito */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Card padding="$6" alignItems="center" gap="$4" backgroundColor="#12221A" borderWidth={1} borderColor="#1FC451" borderRadius="$6" width="100%">
            <MaterialCommunityIcons name="check-circle" size={80} color="#1FC451" />
            <H2 mt="$2" color="#1FC451">¡Perfil Actualizado!</H2>
            <Paragraph style={{ textAlign: 'center' }} color="rgba(255,255,255,0.7)">
              Tus datos académicos se han guardado. A partir de ahora, se adjuntarán automáticamente a tus nuevos registros.
            </Paragraph>
            <Button
              mt="$4"
              width="100%"
              bg="#1FC451"
              color="#08130D"
              onPress={() => setShowSuccess(false)}
            >
              Entendido
            </Button>
          </Card>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
  },
  planBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
  },
  proPlanBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(31, 196, 81, 0.4)",
    backgroundColor: "transparent",
  },
});
