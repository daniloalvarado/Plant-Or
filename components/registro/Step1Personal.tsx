import React from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { Button, Card, H2, H4, Input, Label, Paragraph, Spacer, YStack, XStack, Text } from 'tamagui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RadioSelect } from '@/components/forms/CustomSelectors';
import MapView, { Marker } from 'react-native-maps';
import { FormArbol } from '@/components/forms/FormArbol';
import { FormPalmera } from '@/components/forms/FormPalmera';
import { FormArbusto } from '@/components/forms/FormArbusto';
import { FormLiana } from '@/components/forms/FormLiana';
import { FormHierba } from '@/components/forms/FormHierba';
import { FormCompartido } from '@/components/forms/FormCompartido';

export function Step1({ form }: { form: any }) {
  const {
    nombre, setNombre, email, setEmail, dni, setDni, facultad, setFacultad,
    escuela, setEscuela, curso, setCurso, diaClase, setDiaClase, rolRegistro,
    setRolRegistro, nextStep, prevStep, isStep1Valid, isStep2Valid, isStep3Valid,
    isStep4Valid, errorMsg, location, setLocation, fetchLocation, distrito,
    setDistrito, direccion, setDireccion, tipoUbicacion, setTipoUbicacion,
    tipoUbicacion2, setTipoUbicacion2, numeroCasa, setNumeroCasa, sustratoPlanta,
    setSustratoPlanta, fotos, setFotos, fotosExtra, setFotosExtra, takePhoto,
    pickFromGallery, takeExtraPhoto, pickExtraFromGallery, removeExtraPhoto,
    setSelectedPhoto, showStep3Error, setShowStep3Error, handleFinalSubmit,
    isSubmitting, editId, numeroPlantaAutogenerado, nombresComunes,
    setNombresComunes, nombreCientifico, setNombreCientifico, familia, setFamilia,
    datosBotanicos, updateBotanic, registerFieldRef, showHelperButton,
    missingSections, handleContinuarBloque3, formatLabel, derivedRole
  } = form;

  return (
    <>
              <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                <H4 color="#1FC451" mb="$2">Bloque 1: Datos Personales</H4>
                <YStack gap="$4">
                  <YStack gap="$2" mb="$4">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>¿Cómo estás registrando esta planta?</Label>
                    {derivedRole ? (
                      <Card backgroundColor="rgba(31, 196, 81, 0.1)" borderColor="rgba(31, 196, 81, 0.3)" borderWidth={1} padding="$3">
                        <XStack gap="$2" style={{ alignItems: "center" }}>
                          <MaterialCommunityIcons name="check-circle" size={20} color="#1FC451" />
                          <Text color="#ffffff" fontWeight="bold">Rol fijado: {derivedRole === 'estudiante' ? 'Estudiante' : 'Ciudadano'}</Text>
                        </XStack>
                        <Paragraph color="rgba(255,255,255,0.7)" size="$2" mt="$1">
                          Tu perfil ya está vinculado a este rol.
                        </Paragraph>
                      </Card>
                    ) : (
                      <XStack gap="$3">
                        <Button
                          flex={1}
                          bg={rolRegistro === 'estudiante' ? '#1FC451' : 'rgba(255,255,255,0.05)'}
                          color={rolRegistro === 'estudiante' ? '#08130D' : 'white'}
                          onPress={() => setRolRegistro('estudiante')}
                          pressStyle={{ bg: '#15963c' }}
                        >
                          Estudiante
                        </Button>
                        <Button
                          flex={1}
                          bg={rolRegistro === 'ciudadano' ? '#1FC451' : 'rgba(255,255,255,0.05)'}
                          color={rolRegistro === 'ciudadano' ? '#08130D' : 'white'}
                          onPress={() => setRolRegistro('ciudadano')}
                          pressStyle={{ bg: '#15963c' }}
                        >
                          Ciudadano
                        </Button>
                      </XStack>
                    )}
                    <Paragraph color="rgba(255,255,255,0.6)" size="$2" mt="$2">
                      {rolRegistro === 'estudiante' 
                        ? "Deberás llenar el formulario botánico completo." 
                        : "Registro rápido: Solo nombre, ubicación y fotografías."}
                    </Paragraph>
                    {!editId && !derivedRole && (
                      <Paragraph color="#FFA500" size="$2" mt="$1">
                        ⚠️ Al enviar tu primera planta, tu rol quedará fijado de forma permanente.
                      </Paragraph>
                    )}
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Nombre completo *</Label>
                    {/* Email is always required */}
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={nombre}
                      onChangeText={setNombre}
                      placeholder="Ej. Juan Pérez"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Email *</Label>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Ej. juan@gmail.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                    />
                  </YStack>

                  {rolRegistro === 'estudiante' && (
                    <>
                      <YStack gap="$2">
                        <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>DNI *</Label>
                        <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                          value={dni}
                          onChangeText={(text) => setDni(text.replace(/[^0-9]/g, ''))} // Solo permite números
                          maxLength={8}
                          keyboardType="numeric"
                          placeholder="Ej: 71234567"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Facultad *</Label>
                        <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                          value={facultad}
                          onChangeText={setFacultad}
                          placeholder="Ej. Ciencias Forestales"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Escuela *</Label>
                        <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                          value={escuela}
                          onChangeText={setEscuela}
                          placeholder="Ej. Ingeniería Forestal"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Curso</Label>
                        <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                          value={curso}
                          onChangeText={setCurso}
                          placeholder="Ej. Botánica"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Día de clase</Label>
                        <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                          value={diaClase}
                          onChangeText={setDiaClase}
                          placeholder="Ej. Lunes"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                        />
                      </YStack>
                    </>
                  )}

                  <Spacer size="$2" />
                  
                  <Button
                    bg="#1FC451"
                    color="white"
                    onPress={nextStep}
                    disabled={!isStep1Valid}
                    opacity={!isStep1Valid ? 0.5 : 1}
                    pressStyle={{ bg: '#15963c' }}
                  >
                    Siguiente: Ubicación
                  </Button>
                </YStack>
              </Card>
            </>
  );
}
