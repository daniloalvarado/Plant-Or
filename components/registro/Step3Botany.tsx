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

export function Step3({ form }: { form: any }) {
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
              <YStack gap="$4">
                <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                  <H4 color="#1FC451">Bloque 3: Identificación y Hábito</H4>
                  
                  <YStack style={{ backgroundColor: "rgba(31, 196, 81, 0.1)", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1FC451" }}>
                    <Text color="#ffffff" fontSize={16} fontWeight="bold">Planta N° {numeroPlantaAutogenerado + 1} de 20</Text>
                  </YStack>

                  {/* Identificación botánica */}
                  <YStack gap="$2" ref={(el) => registerFieldRef && registerFieldRef('nombresComunes', el)}>
                    <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Nombre local / común *</Label>{(showHelperButton && missingSections.some(m => m.id === 'nombresComunes')) && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={nombresComunes}
                      onChangeText={setNombresComunes}
                      placeholder="Ej. Platanillo, Bijao rojo"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                    />
                  </YStack>

                  <YStack gap="$2" ref={(el) => registerFieldRef && registerFieldRef('nombreCientifico', el)}>
                    <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Nombre científico *</Label>{(showHelperButton && missingSections.some(m => m.id === 'nombreCientifico')) && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={nombreCientifico}
                      onChangeText={setNombreCientifico}
                      placeholder="Ej. Heliconia rostrata"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                      autoCapitalize="words"
                    />
                  </YStack>

                  <YStack gap="$2" ref={(el) => registerFieldRef && registerFieldRef('familia', el)}>
                    <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Familia botánica *</Label>{(showHelperButton && missingSections.some(m => m.id === 'familia')) && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      value={familia}
                      onChangeText={setFamilia}
                      placeholder="Ej. Heliconiaceae"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                      autoCapitalize="words"
                    />
                  </YStack>

                  <YStack gap="$2" ref={(el) => registerFieldRef && registerFieldRef('habito', el)}>
                    <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>1. Hábito de la planta *</Label>{(showHelperButton && missingSections.some(m => m.id === 'habito')) && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                    <RadioSelect 
                      options={['Árbol', 'Palmera', 'Arbusto', 'Liana', 'Hierba']}
                      value={datosBotanicos.habito}
                      onChange={(val) => updateBotanic('habito', val)}
                    />
                  </YStack>

                  <YStack gap="$2" ref={(el) => registerFieldRef && registerFieldRef('tipoVida', el)}>
                    <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>2. Tipo de vida *</Label>{(showHelperButton && missingSections.some(m => m.id === 'tipoVida')) && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                    <RadioSelect 
                      options={['Terrestre', 'Epífita', 'Parásita']}
                      value={datosBotanicos.tipoVida}
                      onChange={(val) => updateBotanic('tipoVida', val)}
                    />
                  </YStack>
                </Card>

                {datosBotanicos.habito === 'Árbol' && (
                  <FormArbol data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}
                {datosBotanicos.habito === 'Palmera' && (
                  <FormPalmera data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}
                {datosBotanicos.habito === 'Arbusto' && (
                  <FormArbusto data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}
                {datosBotanicos.habito === 'Liana' && (
                  <FormLiana data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}
                {datosBotanicos.habito === 'Hierba' && (
                  <FormHierba data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}

                {/* Variables compartidas por todas las plantas (solo se muestra si se eligió un hábito y NO es Palmera/Arbusto/Liana/Hierba, ya que tienen sus propios campos) */}
                {datosBotanicos.habito !== '' && datosBotanicos.habito !== 'Palmera' && datosBotanicos.habito !== 'Arbusto' && datosBotanicos.habito !== 'Liana' && datosBotanicos.habito !== 'Hierba' && (
                  <FormCompartido data={datosBotanicos} updateData={updateBotanic} registerRef={registerFieldRef} missingFields={missingSections} />
                )}
                
                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                  <YStack gap="$2">
                    <Button 
                      bg="#1FC451" 
                      color="white" 
                      onPress={handleContinuarBloque3}
                      pressStyle={{ bg: '#15963c' }}
                    >
                      Continuar a Fotografías
                    </Button>
                    <Button variant="outlined" borderColor="rgba(255,255,255,0.2)" color="white" onPress={prevStep} pressStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
                      Volver
                    </Button>
                  </YStack>
                </Card>
              </YStack>
            </>
  );
}
