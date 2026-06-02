import { SignOutButton } from "@/components/SignOutButton";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getUserDisplayName, getUserInitials } from "@/lib/utils/user";
import { useUser } from "@clerk/clerk-expo";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { client, urlFor } from "@/lib/sanity";
import { Image, Pressable, StyleSheet, Modal, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system/legacy";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
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
  
  const [stats, setStats] = useState({ total: 0, validados: 0, observados: 0, rechazados: 0 });
  const [validatedCount, setValidatedCount] = useState(0);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [dni, setDni] = useState((user?.unsafeMetadata?.dni as string) || '');
  const [curso, setCurso] = useState((user?.unsafeMetadata?.curso as string) || '');
  const [facultad, setFacultad] = useState((user?.unsafeMetadata?.facultad as string) || '');
  const [escuela, setEscuela] = useState((user?.unsafeMetadata?.escuela as string) || '');
  const [diaClase, setDiaClase] = useState((user?.unsafeMetadata?.dia_clase as string) || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showStudentFields, setShowStudentFields] = useState(
    !!(user?.unsafeMetadata?.dni || user?.unsafeMetadata?.facultad || user?.unsafeMetadata?.escuela)
  );
  
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [photoOptionsVisible, setPhotoOptionsVisible] = useState(false);

  const generateCertificateHTML = (
    name: string, 
    date: string, 
    code: string, 
    type: string, 
    count: number, 
    period: string,
    config: any
  ) => {
    const textoBase = config?.texto_certificado || 'Por haber participado en el proyecto PLANT-OR en calidad de {tipo}, durante el periodo académico {periodo}. Aportando significativamente a la catalogación botánica con un total de {count} especies validadas.';
    const textoFinal = textoBase
      .replace('{count}', `<strong>${count}</strong>`)
      .replace('{tipo}', `<strong>${type}</strong>`)
      .replace('{periodo}', `<strong>${period}</strong>`);
      
    const titulo = config?.titulo_certificado || 'Certificado de Reconocimiento';
    const subtitulo = config?.subtitulo_certificado || 'Otorgado a:';
    
    const firma1Url = config?.responsable_1_firma ? urlFor(config.responsable_1_firma) : '';
    const firma2Url = config?.responsable_2_firma ? urlFor(config.responsable_2_firma) : '';
    
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; margin: 0; padding: 0; background: white; color: #08130D; }
        .container { width: 1000px; height: 700px; border: 15px solid #1FC451; padding: 40px; box-sizing: border-box; text-align: center; position: relative; }
        .logo { font-size: 32px; font-weight: bold; color: #1FC451; margin-bottom: 10px; }
        .title { font-size: 44px; font-weight: bold; margin: 10px 0; text-transform: uppercase; letter-spacing: 2px; }
        .subtitle { font-size: 22px; color: #555; margin-bottom: 25px; }
        .name { font-size: 40px; font-weight: bold; color: #15963c; border-bottom: 2px solid #1FC451; display: inline-block; padding: 0 40px 10px; margin-bottom: 25px; }
        .paragraph { font-size: 18px; color: #444; line-height: 1.6; max-width: 800px; margin: 0 auto 30px; }
        .details { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; }
        .detail-item { font-size: 16px; background: #f4f4f4; padding: 10px 20px; border-radius: 8px; border: 1px solid #ddd; }
        .footer { position: absolute; bottom: 40px; width: calc(100% - 80px); display: flex; justify-content: space-between; align-items: flex-end; }
        .signatures-container { display: flex; gap: 40px; }
        .signature { border-top: 1px solid #000; padding-top: 10px; width: 220px; text-align: center; font-size: 14px; position: relative; }
        .signature-img { position: absolute; bottom: 45px; left: 50%; transform: translateX(-50%); max-height: 80px; max-width: 200px; }
        .validation-box { text-align: right; font-size: 13px; color: #666; }
        .code { font-weight: bold; font-family: monospace; font-size: 15px; color: #000; }
        .bg-icon { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.05; font-size: 400px; z-index: -1; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="bg-icon">🌿</div>
        <div class="logo">🌿 PLANT-OR</div>
        <div class="title">${titulo}</div>
        <div class="subtitle">${subtitulo}</div>
        
        <div class="name">${name}</div>
        
        <div class="paragraph">
          ${textoFinal}
        </div>
        
        <div class="details">
          <div class="detail-item"><strong>Registros Validados:</strong> ${count}</div>
          <div class="detail-item"><strong>Participación:</strong> ${type}</div>
          <div class="detail-item"><strong>Periodo:</strong> ${period}</div>
        </div>
        
        <div class="footer">
          <div class="signatures-container">
            <div class="signature">
              ${firma1Url ? '<img src="' + firma1Url + '" class="signature-img" />' : ''}
              <strong>${config?.responsable_1_nombre || 'Firma Autorizada'}</strong><br>
              ${config?.responsable_1_cargo || 'Proyecto PLANT-OR'}
            </div>
            ${config?.responsable_2_nombre ? 
            '<div class="signature">' +
              (firma2Url ? '<img src="' + firma2Url + '" class="signature-img" />' : '') +
              '<strong>' + config.responsable_2_nombre + '</strong><br>' +
              (config.responsable_2_cargo || 'Proyecto PLANT-OR') +
            '</div>'
             : ''}
          </div>
          
          <div class="validation-box">
            Emitido el: ${date}<br><br>
            Verifique la autenticidad de este<br>
            documento en: <strong>${config?.url_validacion || 'plant-or.com'}</strong><br>
            Código: <span class="code">${code}</span>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
  };

  const handleGenerateCertificate = async () => {
    if (!user) return;
    setIsGeneratingCert(true);
    
    try {
      // 1. Check if certificate exists
      const existingCert = await client.fetch(`*[_type == "certificado" && usuario_id == $userId][0]`, { userId: user.id });
      
      const isStudent = !!(user.unsafeMetadata?.dni || user.unsafeMetadata?.facultad || user.unsafeMetadata?.escuela);
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const periodCalc = `${currentYear}-${currentMonth < 7 ? 'I' : 'II'}`;
      const tipoCalc = isStudent ? 'Estudiante' : 'Ciudadano';
      
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
          registros_validados: validatedCount,
          tipo_participacion: tipoCalc,
          periodo: periodCalc,
          fecha_emision: new Date().toISOString()
        });
      }
      
      // 1.5 Get dynamic info for certificate
      const config = await client.fetch(`*[_type == "configuracion"][0]`);
      
      // 2. Generate PDF
      const dateStrFormatted = new Date(certData.fecha_emision).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
      
      // Leer valores de certData estrictamente (prioriza lo guardado en BD, falla a calculados si es viejo)
      const finalName = certData.usuario_nombre;
      const finalCount = certData.registros_validados ?? validatedCount;
      const finalType = certData.tipo_participacion || tipoCalc;
      const finalPeriod = certData.periodo || periodCalc;

      const html = generateCertificateHTML(
        finalName, 
        dateStrFormatted, 
        certData.codigo,
        finalType,
        finalCount,
        finalPeriod,
        config
      );
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
        width: 1000,
        height: 700
      });
      
      // 2.5 Rename the file to Certificado_PlantOR.pdf
      const renamedUri = `${(FileSystem as any).cacheDirectory}Certificado_PlantOR.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: renamedUri
      });
      
      // 3. Share / Save
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(renamedUri, {
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
      } catch (err) {
        console.error("Error al subir foto", err);
        Alert.alert("Error", "No se pudo actualizar la foto de perfil.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const removeProfilePhoto = async () => {
    setPhotoOptionsVisible(false);
    try {
      setIsSaving(true);
      await user?.setProfileImage({ file: null });
      await user?.reload();
    } catch (err) {
      console.error("Error al eliminar foto", err);
      Alert.alert("Error", "No se pudo eliminar la foto de perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoPress = () => {
    if (user?.hasImage) {
      setPhotoOptionsVisible(true);
    } else {
      pickProfilePhoto();
    }
  };

  const saveProfile = async () => {
    setErrorMsg('');
    if (!user) return;
    
    const isStudentFieldsFilled = showStudentFields && (dni || facultad || escuela || curso || diaClase);
    
    if (isStudentFieldsFilled) {
      if (!dni || dni.length !== 8 || !facultad || !escuela) {
        setErrorMsg("Si eres estudiante, debes llenar obligatoriamente el DNI, Facultad y Escuela.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const academicData = isStudentFieldsFilled ? {
        dni, curso, facultad, escuela, dia_clase: diaClase
      } : {
        dni: '', curso: '', facultad: '', escuela: '', dia_clase: ''
      };

      const studentDataChanged = 
        academicData.dni !== (user.unsafeMetadata.dni || '') ||
        academicData.facultad !== (user.unsafeMetadata.facultad || '') ||
        academicData.escuela !== (user.unsafeMetadata.escuela || '') ||
        academicData.curso !== (user.unsafeMetadata.curso || '') ||
        academicData.dia_clase !== (user.unsafeMetadata.dia_clase || '');

      await user.update({
        firstName,
        lastName,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          ...academicData
        }
      });
      // Forzar recarga de Clerk para sincronizar de inmediato
      await user.reload();
      
      setIsEditing(false);
      if (studentDataChanged) {
        setShowSuccess(true);
      }
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
        client.fetch(`{
          "total": count(*[_type == "planta" && autor == $userId]),
          "validados": count(*[_type == "planta" && autor == $userId && estado_revision == "Validado"]),
          "observados": count(*[_type == "planta" && autor == $userId && estado_revision == "Observado"]),
          "rechazados": count(*[_type == "planta" && autor == $userId && estado_revision == "Rechazado"])
        }`, { userId: user.id })
          .then(data => {
            setStats(data);
            setValidatedCount(data.validados);
          })
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
                onPress={handlePhotoPress}
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
                    lineHeight={30}
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
                    <MaterialCommunityIcons name="cog" size={14} color="#1FC451" />
                    <Text fontSize={12} color="#1FC451" fontWeight="bold">Toca para editar tus datos y perfil académico</Text>
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
                  {validatedCount >= 1 ? '¡Certificado Desbloqueado!' : 'Progreso para Certificado'}
                </H2>
              </XStack>
              
              <Text fontSize={14} color="rgba(255,255,255,0.7)">
                {validatedCount >= 1 
                  ? 'Has alcanzado los requisitos. Ya puedes generar tu certificado oficial del proyecto.'
                  : 'Al alcanzar los requisitos obtendrás un Certificado Digital oficial del proyecto. (Aplica para estudiantes y ciudadanos).'}
              </Text>
              
              {validatedCount >= 1 ? (
                <Button
                  mt="$2"
                  bg="#1FC451"
                  color="white"
                  pressStyle={{ bg: '#19a343' }}
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
                    <View style={{ width: `${Math.min((validatedCount / 1) * 100, 100)}%`, height: '100%', backgroundColor: '#1FC451', borderRadius: 6 }} />
                  </View>
                  
                  <XStack style={{ justifyContent: 'space-between' }} mt="$1">
                    <Text fontSize={12} color="#1FC451" fontWeight="bold">
                      {validatedCount} validadas
                    </Text>
                    <Text fontSize={12} color="rgba(255,255,255,0.5)">
                      Meta: 1
                    </Text>
                  </XStack>
                </>
              )}
            </YStack>
          </Card>



          {/* Reporte Semestral Card */}
          <Card
            size="$4"
            bordered
            bg="rgba(255,255,255,0.05)"
            borderColor="rgba(255,255,255,0.1)"
            padding="$5"
          >
            <YStack gap="$4">
              <XStack style={{ alignItems: 'center' }} gap="$2">
                <MaterialCommunityIcons name="chart-bar" size={24} color="#1FC451" />
                <H2 fontSize={18} fontWeight="700" color="#ffffff">
                  Resumen de Mis Registros
                </H2>
              </XStack>
              <Text fontSize={14} color="rgba(255,255,255,0.7)">
                Estadísticas generales de todos los registros enviados a la plataforma.
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginTop: 4 }}>
                <View style={{ width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                  <Text fontSize={12} color="rgba(255,255,255,0.6)" mb="$1">Enviados Totales</Text>
                  <Text fontSize={24} fontWeight="bold" color="#ffffff">{stats.total}</Text>
                </View>
                <View style={{ width: '48%', backgroundColor: 'rgba(31, 196, 81, 0.1)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(31, 196, 81, 0.2)' }}>
                  <Text fontSize={12} color="#1FC451" mb="$1">Validados</Text>
                  <Text fontSize={24} fontWeight="bold" color="#1FC451">{stats.validados}</Text>
                </View>
                <View style={{ width: '48%', backgroundColor: 'rgba(250, 150, 0, 0.1)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(250, 150, 0, 0.2)' }}>
                  <Text fontSize={12} color="#fa9600" mb="$1">Observados</Text>
                  <Text fontSize={24} fontWeight="bold" color="#fa9600">{stats.observados}</Text>
                </View>
                <View style={{ width: '48%', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                  <Text fontSize={12} color="#ef4444" mb="$1">Rechazados</Text>
                  <Text fontSize={24} fontWeight="bold" color="#ef4444">{stats.rechazados}</Text>
                </View>
              </View>

              <Button
                mt="$2"
                bg="rgba(255,255,255,0.1)"
                color="white"
                pressStyle={{ bg: "rgba(255,255,255,0.2)" }}
                onPress={() => {
                  router.push({ pathname: "/", params: { openNotif: 'true' } } as any);
                }}
                icon={<MaterialCommunityIcons name="bell-ring" size={20} color="white" />}
              >
                Ver mis aportes (en Notificaciones)
              </Button>
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
                    <XStack style={{ alignItems: "center" }} gap="$2">
                      <MaterialCommunityIcons name="leaf" size={22} color="#1FC451" />
                      <H2 fontSize={18} fontWeight="700" color="#ffffff">
                        PLANT-OR
                      </H2>
                    </XStack>
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
                <XStack style={{ alignItems: "center" }} gap="$2">
                  <MaterialCommunityIcons name="account-cog" size={22} color="#1FC451" />
                  <H2 fontSize={18} fontWeight="700" color="#ffffff">
                    Cuenta
                  </H2>
                </XStack>
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
              <Pressable onPress={() => { setIsEditing(false); setErrorMsg(''); }}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </XStack>

            <YStack gap="$3" pb={insets.bottom > 0 ? insets.bottom : 20}>
              <XStack gap="$3">
                <YStack flex={1}>
                  <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Nombres</Text>
                  <Input height={40} value={firstName} onChangeText={setFirstName} bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                </YStack>
                <YStack flex={1}>
                  <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Apellidos</Text>
                  <Input height={40} value={lastName} onChangeText={setLastName} bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                </YStack>
              </XStack>

              <Pressable 
                onPress={() => setShowStudentFields(!showStudentFields)}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', marginTop: 8 }}
              >
                <YStack>
                  <Text color="#ffffff" fontSize={14} fontWeight="bold">¿Eres estudiante?</Text>
                  <Text color="rgba(255,255,255,0.5)" fontSize={12}>Llena estos campos para tu perfil académico</Text>
                </YStack>
                <MaterialCommunityIcons name={showStudentFields ? "chevron-up" : "chevron-down"} size={24} color="rgba(255,255,255,0.5)" />
              </Pressable>

              {showStudentFields && (
                <YStack gap="$3">
                  <XStack gap="$3">
                    <YStack flex={1}>
                      <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>DNI (Obligatorio)</Text>
                      <Input height={40} value={dni} onChangeText={(text) => setDni(text.replace(/[^0-9]/g, ''))} maxLength={8} keyboardType="numeric" placeholder="Ej. 89765434" placeholderTextColor="rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                    </YStack>
                    <YStack flex={1}>
                      <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Día de clase (Opcional)</Text>
                      <Input height={40} value={diaClase} onChangeText={setDiaClase} placeholder="Ej. Martes" placeholderTextColor="rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                    </YStack>
                  </XStack>

                  <YStack>
                    <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Facultad (Obligatorio)</Text>
                    <Input height={40} value={facultad} onChangeText={setFacultad} placeholder="Ej. Ciencias Forestales" placeholderTextColor="rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                  </YStack>

                  <XStack gap="$3">
                    <YStack flex={1}>
                      <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Escuela (Obligatorio)</Text>
                      <Input height={40} value={escuela} onChangeText={setEscuela} placeholder="Ej. Ing. Forestal" placeholderTextColor="rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                    </YStack>
                    <YStack flex={1}>
                      <Text color="rgba(255,255,255,0.7)" fontSize={12} mb={4}>Curso (Opcional)</Text>
                      <Input height={40} value={curso} onChangeText={setCurso} placeholder="Ej. Botánica" placeholderTextColor="rgba(255,255,255,0.3)" bg="rgba(255,255,255,0.05)" borderWidth={0} color="white" />
                    </YStack>
                  </XStack>
                </YStack>
              )}

              {errorMsg ? (
                <View style={{ backgroundColor: 'rgba(255,68,68,0.2)', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#ff4444' }}>
                  <Text style={{ color: '#ff4444', textAlign: 'center', fontSize: 13 }}>{errorMsg}</Text>
                </View>
              ) : null}

              <Button 
                mt="$2" 
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
          <Card padding="$6" alignItems="center" gap="$4" backgroundColor="#12221A" borderWidth={1} borderColor="#1FC451" borderRadius="$6" width="100%" maxWidth={340}>
            <MaterialCommunityIcons name="check-circle" size={80} color="#1FC451" />
            <H2 mt="$2" color="#1FC451" style={{ textAlign: 'center' }}>¡Perfil Actualizado!</H2>
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

      {/* Modal de Opciones de Foto de Perfil */}
      <Modal visible={photoOptionsVisible} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#12221A', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <XStack style={{ justifyContent: "space-between", alignItems: "center" }} mb="$4">
              <H2 color="white" fontSize={18}>Foto de Perfil</H2>
              <Pressable onPress={() => setPhotoOptionsVisible(false)}>
                <Feather name="x" size={24} color="rgba(255,255,255,0.5)" />
              </Pressable>
            </XStack>
            <YStack gap="$3" pb={insets.bottom > 0 ? insets.bottom : 20}>
              <Button bg="#1FC451" color="#08130D" onPress={() => { setPhotoOptionsVisible(false); pickProfilePhoto(); }}>
                Cambiar foto
              </Button>
              <Button bg="rgba(255,68,68,0.1)" color="#ff4444" onPress={removeProfilePhoto}>
                Eliminar foto
              </Button>
              <Button bg="transparent" color="white" borderWidth={1} borderColor="rgba(255,255,255,0.2)" pressStyle={{ bg: 'rgba(255,255,255,0.1)' }} onPress={() => setPhotoOptionsVisible(false)}>
                Cancelar
              </Button>
            </YStack>
          </View>
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
