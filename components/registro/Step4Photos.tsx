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

export function Step4({ form }: { form: any }) {
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
                <H4 color="#1FC451" mb="$2">Bloque 4: Fotografías</H4>
                <Paragraph color="rgba(255,255,255,0.7)" mb="$4">
                  El documento exige capturar 5 fotografías clave de la planta.
                </Paragraph>
                
                <YStack gap="$4">
                  {/* Array de fotos a tomar */}
                  {[
                    { id: 'planta_completa', label: '1. Planta Completa' },
                    { id: 'hoja', label: '2. Detalle de Hoja' },
                    { id: 'flor', label: '3. Detalle de Flor' },
                    { id: 'fruto', label: '4. Detalle de Fruto' },
                    { id: 'semilla', label: '5. Detalle de Semilla' },
                  ].map((item) => {
                    const uri = fotos[item.id as keyof typeof fotos];
                    return (
                      <YStack key={item.id} style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 8 }} gap="$2">
                        <XStack style={{ alignItems: "center" }} gap="$3">
                          {uri ? (
                            <Pressable onPress={() => setSelectedPhoto(uri)}>
                              <Image source={{ uri }} style={{ width: 56, height: 56, borderRadius: 8 }} />
                            </Pressable>
                          ) : (
                            <View style={{ width: 56, height: 56, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
                              <MaterialCommunityIcons name="image-outline" size={28} color="rgba(255,255,255,0.3)" />
                            </View>
                          )}
                          <YStack flex={1}>
                            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>{item.label}</Label>
                            {uri
                              ? <XStack style={{ alignItems: "center" }} gap="$2">
                                  <Paragraph color="#1FC451" size="$1">✓ Capturada</Paragraph>
                                  <Button size="$2" bg="transparent" onPress={() => setFotos((prev: any) => ({...prev, [item.id]: null}))}>
                                    <MaterialCommunityIcons name="trash-can-outline" size={16} color="#ff4444" />
                                  </Button>
                                </XStack>
                              : <Paragraph color="rgba(255,255,255,0.4)" size="$1">Sin foto</Paragraph>
                            }
                          </YStack>
                        </XStack>
                        <XStack gap="$2">
                          <Button
                            flex={1}
                            size="$3"
                            bg="rgba(255,255,255,0.08)"
                            color="white"
                            icon={<MaterialCommunityIcons name="camera" size={16} color="white" />}
                            onPress={() => takePhoto(item.id as keyof typeof fotos)}
                            pressStyle={{ bg: 'rgba(255,255,255,0.15)' }}
                          >
                            Cámara
                          </Button>
                          <Button
                            flex={1}
                            size="$3"
                            bg="rgba(255,255,255,0.08)"
                            color="white"
                            icon={<MaterialCommunityIcons name="image-multiple" size={16} color="white" />}
                            onPress={() => pickFromGallery(item.id as keyof typeof fotos)}
                            pressStyle={{ bg: 'rgba(255,255,255,0.15)' }}
                          >
                            Galería
                          </Button>
                        </XStack>
                      </YStack>
                    );
                  })}

                  <Spacer size="$2" />

                  {/* Fotografías Adicionales */}
                  <YStack gap="$2">
                    <H4 color="white" fontSize={16}>Fotografías Adicionales (Opcional)</H4>
                    <Paragraph color="rgba(255,255,255,0.7)" size="$2">
                      Si lo deseas, puedes agregar fotos extra (tronco, raíces, entorno, etc).
                    </Paragraph>
                    
                    {fotosExtra.map((uri: string, idx: number) => (
                      <YStack key={`extra-${idx}`} style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: 12, borderRadius: 8 }} gap="$2">
                        <XStack style={{ alignItems: "center" }} gap="$3">
                          <Pressable onPress={() => setSelectedPhoto(uri)}>
                            <Image source={{ uri }} style={{ width: 56, height: 56, borderRadius: 8 }} />
                          </Pressable>
                          <YStack flex={1}>
                            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Foto Extra {idx + 1}</Label>
                            <Paragraph color="#1FC451" size="$1">✓ Agregada</Paragraph>
                          </YStack>
                          <Button 
                            bg="rgba(255,68,68,0.1)" 
                            color="#ff4444" 
                            size="$2" 
                            onPress={() => removeExtraPhoto(idx)}
                            icon={<MaterialCommunityIcons name="delete" size={16} color="#ff4444" />}
                          />
                        </XStack>
                      </YStack>
                    ))}
                    
                    <XStack gap="$2" mt="$2">
                       <Button flex={1} size="$3" bg="rgba(255,255,255,0.08)" color="white" icon={<MaterialCommunityIcons name="camera-plus" size={16} color="white" />} onPress={takeExtraPhoto} pressStyle={{ bg: 'rgba(255,255,255,0.15)' }}>
                         Cámara Extra
                       </Button>
                       <Button flex={1} size="$3" bg="rgba(255,255,255,0.08)" color="white" icon={<MaterialCommunityIcons name="image-plus" size={16} color="white" />} onPress={pickExtraFromGallery} pressStyle={{ bg: 'rgba(255,255,255,0.15)' }}>
                         Galería Extra
                       </Button>
                    </XStack>
                  </YStack>

                  <Spacer size="$2" />
                  
                  <YStack gap="$2">
                    {rolRegistro === 'ciudadano' ? (
                      <Button 
                        bg="#1FC451" 
                        color="white" 
                        onPress={() => {
                          if (!isStep4Valid) setShowStep3Error(true);
                          else { setShowStep3Error(false); handleFinalSubmit(); }
                        }}
                        disabled={isSubmitting}
                        opacity={isSubmitting ? 0.5 : 1}
                        pressStyle={{ bg: '#15963c' }}
                      >
                        {isSubmitting ? "Enviando fotos..." : (editId ? "Guardar Cambios" : "Finalizar (Ciudadano)")}
                      </Button>
                    ) : (
                      <Button 
                        bg="#1FC451" 
                        color="white" 
                        onPress={() => {
                          if (!isStep4Valid) setShowStep3Error(true);
                          else { setShowStep3Error(false); nextStep(); }
                        }}
                        pressStyle={{ bg: '#15963c' }}
                      >
                        Continuar al Resumen
                      </Button>
                    )}
                    
                    {(!isStep4Valid && showStep3Error) && (
                      <Paragraph style={{ textAlign: 'center' }} color="#ff4444" size="$2">
                        Faltan tomar fotografías obligatorias
                      </Paragraph>
                    )}

                    <Button variant="outlined" borderColor="rgba(255,255,255,0.2)" color="white" onPress={prevStep} pressStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
                      Volver
                    </Button>
                  </YStack>
                </YStack>
              </Card>
            </>
  );
}
