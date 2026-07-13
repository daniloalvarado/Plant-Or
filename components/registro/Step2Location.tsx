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

export function Step2({ form }: { form: any }) {
  const {
    nombre, setNombre, email, setEmail, dni, setDni, facultad, setFacultad,
    escuela, setEscuela, curso, setCurso, diaClase, setDiaClase, rolRegistro,
    setRolRegistro, nextStep, prevStep, step, isStep1Valid, isStep2Valid, isStep3Valid,
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
                <H4 color="#1FC451" mb="$2">Bloque 2: Ubicación GPS</H4>
                <YStack gap="$4">
                  {errorMsg && step === 2 ? (
                    <Paragraph color="#ff4444">{errorMsg}</Paragraph>
                  ) : location ? (
                    <View style={{ height: 300, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                      <MapView mapType="satellite"
                        style={{ flex: 1 }}
                        region={{
                          latitude: location.latitude,
                          longitude: location.longitude,
                          latitudeDelta: 0.00345,
                          longitudeDelta: 0.00015,
                        }}
                        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
                      >
                        <Marker
                          draggable
                          coordinate={location}
                          onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
                        />
                      </MapView>
                      <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                        <Button
                          size="$3"
                          circular
                          icon={<MaterialCommunityIcons name="crosshairs-gps" size={20} color="white" />}
                          bg="#1FC451"
                          onPress={fetchLocation}
                        />
                      </View>
                    </View>
                  ) : (
                    <Paragraph color="rgba(255,255,255,0.7)">Obteniendo ubicación GPS...</Paragraph>
                  )}
                  <Paragraph color="rgba(255,255,255,0.5)" size="$2">
                    Puedes mover el marcador manteniéndolo presionado, o tocando en cualquier parte del mapa.
                  </Paragraph>

                  <YStack gap="$2">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Distrito</Label>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      size="$3"
                      value={distrito}
                      onChangeText={setDistrito}
                      placeholder="Ej. Iquitos, San Juan Bautista, Punchana..."
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Dirección / Referencia</Label>
                    <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                      size="$3"
                      value={direccion}
                      onChangeText={setDireccion}
                      placeholder="Ej. Malecón Tarapacá, Calle Próspero..."
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                    />
                  </YStack>

                  <YStack gap="$4">
                    <YStack gap="$2">
                      <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ubicación 1</Label>
                      <RadioSelect 
                        options={['Jirón', 'Avenida', 'Calle', 'Pasaje', 'Parque', 'Otro']}
                        value={tipoUbicacion}
                        onChange={setTipoUbicacion}
                      />
                    </YStack>
                    <YStack gap="$2">
                      <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ubicación 2</Label>
                      <RadioSelect 
                        options={['Vereda', 'Berma central', 'Dentro del domicilio', 'Otro']}
                        value={tipoUbicacion2}
                        onChange={setTipoUbicacion2}
                      />
                    </YStack>
                  </YStack>

                  <YStack gap="$4">
                    <YStack gap="$2">
                      <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>N° de Casa</Label>
                      <Input cursorColor="#ffffff" selectionColor="#0D5E26"
                        size="$3"
                        value={numeroCasa}
                        onChangeText={setNumeroCasa}
                        placeholder="Ej. 123 o S/N"
                        borderWidth={0}
                        bg="rgba(255,255,255,0.05)"
                        color="#ffffff"
                        placeholderTextColor="rgba(255,255,255,0.3)" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                      />
                    </YStack>
                    <YStack gap="$2">
                      <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Sustrato / Ubicación</Label>
                      <RadioSelect 
                        options={['En tierra', 'En macetero', 'Otro']}
                        value={sustratoPlanta}
                        onChange={setSustratoPlanta}
                      />
                    </YStack>
                  </YStack>

                  <Spacer size="$2" />
                  
                  <YStack gap="$2">
                    <Button bg="#1FC451" color="white" onPress={nextStep} disabled={!isStep2Valid} opacity={!isStep2Valid ? 0.5 : 1} pressStyle={{ bg: '#15963c' }}>
                      {rolRegistro === 'estudiante' ? "Siguiente: Identificación" : "Siguiente: Fotografías"}
                    </Button>
                    <Button variant="outlined" borderColor="rgba(255,255,255,0.2)" color="white" onPress={prevStep} pressStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
                      Volver
                    </Button>
                  </YStack>
                </YStack>
              </Card>
            </>
  );
}
