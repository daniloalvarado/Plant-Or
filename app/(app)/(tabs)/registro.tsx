import React from 'react';
import { KeyboardAvoidingView, Platform, View, ScrollView, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, H2, H4, Paragraph, YStack, XStack, Text } from 'tamagui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRegistroForm } from '@/components/registro/useRegistroForm';
import { Step1 as Step1Personal } from '@/components/registro/Step1Personal';
import { Step2 as Step2Location } from '@/components/registro/Step2Location';
import { Step3 as Step3Botany } from '@/components/registro/Step3Botany';
import { Step4 as Step4Photos } from '@/components/registro/Step4Photos';
import { Step5Summary } from '@/components/registro/Step5Summary';

export default function RegistroScreen() {
  const form = useRegistroForm();
  
  const {
    step, scrollViewRef, insets, showMissingModal, setShowMissingModal, missingSections,
    scrollToField, showHelperButton, showSuccess, isOfflineSaved, editId, resetFormAndGoHome,
    selectedPhoto, setSelectedPhoto, isClosed, closureMessage
  } = form;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#12221A' }} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <YStack gap="$4">
            
            {/* Cabecera dinámica de pasos */}
            {step < 5 && (
              <XStack style={{ justifyContent: "space-between", alignItems: "center" }} mb="$2">
                {[1, 2, 3, 4].map(s => (
                  <View key={s} style={{ height: 4, flex: 1, backgroundColor: s <= step ? '#1FC451' : 'rgba(255,255,255,0.1)', marginHorizontal: 2, borderRadius: 2 }} />
                ))}
              </XStack>
            )}

            {step === 1 && <Step1Personal form={form} />}
            {step === 2 && <Step2Location form={form} />}
            {step === 3 && <Step3Botany form={form} />}
            {step === 4 && <Step4Photos form={form} />}
            {step === 5 && <Step5Summary form={form} />}
            
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FAB para re-abrir modal de errores */}
      {showHelperButton && missingSections.length > 0 && (
        <View style={{ position: 'absolute', top: 100, right: 20, zIndex: 1000 }}>
          <Button 
            bg="rgba(220, 30, 30, 0.95)" 
            color="#ffffff" 
            borderColor="#ff4444"
            borderWidth={1}
            circular
            size="$5" 
            onPress={() => setShowMissingModal(true)}
            pressStyle={{ bg: '#ff4444' }}
            icon={<MaterialCommunityIcons name="alert-circle-outline" size={24} color="#ffffff" />}
          />
        </View>
      )}

      {/* Modal de Validacion de Faltantes */}
      <Modal visible={showMissingModal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#12221A', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: '#1FC451', maxHeight: '70%', paddingBottom: Platform.OS === 'ios' ? Math.max(24, insets.bottom + 12) : 24 }}>
            <XStack style={{ justifyContent: "space-between", alignItems: "center" }} mb="$4">
              <H4 color="#1FC451">Campos Obligatorios</H4>
              <Button size="$2" circular bg="white" pressStyle={{ bg: '#cccccc' }} onPress={() => setShowMissingModal(false)} icon={<MaterialCommunityIcons name="close" size={20} color="black" />} />
            </XStack>
            <Paragraph color="rgba(255,255,255,0.7)" mb="$4">
              Por favor completa los siguientes campos para poder continuar con el registro:
            </Paragraph>
            <ScrollView>
              <YStack gap="$2">
                {missingSections.map((item, idx) => (
                  <Button 
                    key={idx} 
                    bg="rgba(255,68,68,0.1)" 
                    borderColor="#ff4444" 
                    borderWidth={1}
                    style={{ justifyContent: "flex-start" }}
                    icon={<MaterialCommunityIcons name="alert-circle" size={18} color="#ff4444" />}
                    pressStyle={{ bg: 'rgba(255,68,68,0.3)' }}
                    onPress={() => {
                      setShowMissingModal(false);
                      setTimeout(() => scrollToField(item.id), 300);
                    }}
                  >
                    <Text color="white" flex={1}>{item.label}</Text>
                  </Button>
                ))}
              </YStack>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal de Exito */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#12221A', borderWidth: 1, borderColor: '#1FC451', borderRadius: 20, padding: 32, width: '100%', alignItems: 'center', gap: 16 }}>
            <MaterialCommunityIcons name={isOfflineSaved ? "cloud-off-outline" : "check-circle"} size={90} color="#1FC451" />
            <H2 mt="$2" color="#1FC451" style={{ textAlign: 'center' }}>
              {isOfflineSaved ? 'Guardado Localmente' : `${editId ? 'Editado' : 'Registrado'} con Éxito!`}
            </H2>
            <Paragraph style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 22 }}>
              {isOfflineSaved 
                ? 'No tienes conexión a internet. El registro se ha guardado en tu dispositivo y se enviará automáticamente cuando recuperes la conexión.'
                : `Tu planta ha sido ${editId ? 'editada y devuelta a revisión' : 'enviada a revisión'}. Podrás verla en el mapa una vez que los docentes la validen.`}
            </Paragraph>
            <Button
              mt="$4"
              bg="#1FC451"
              color="white"
              onPress={resetFormAndGoHome}
              icon={<MaterialCommunityIcons name="home" size={20} color="white" />}
              style={{ width: '100%' }}
              pressStyle={{ bg: '#15963c' }}
            >
              Volver al Inicio
            </Button>
          </View>
        </View>
      </Modal>

      {/* Modal Visor de Fotos */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 1000 }}>
            <Button 
              circular bg="rgba(255,255,255,0.2)"
              icon={<MaterialCommunityIcons name="close" size={24} color="white" />}
              onPress={() => setSelectedPhoto(null)}
            />
          </View>
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto }} style={{ width: '100%', height: '80%', resizeMode: 'contain' }} />
          )}
        </View>
      </Modal>

      {/* Modal de Cierre de Registros */}
      <Modal visible={isClosed} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#12221A', borderWidth: 1, borderColor: '#ff4444', borderRadius: 20, padding: 32, width: '100%', alignItems: 'center', gap: 16 }}>
            <MaterialCommunityIcons name="clock-alert-outline" size={70} color="#ff4444" />
            <H2 mt="$2" color="#ff4444" style={{ textAlign: 'center' }}>
              Registros Cerrados
            </H2>
            <Paragraph style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 22 }}>
              {closureMessage || "El periodo de registro ha finalizado. Ya no se aceptan nuevos envíos."}
            </Paragraph>
            <Button
              mt="$4"
              bg="#ff4444"
              color="white"
              onPress={resetFormAndGoHome}
              icon={<MaterialCommunityIcons name="home" size={20} color="white" />}
              style={{ width: '100%' }}
              pressStyle={{ bg: '#cc0000' }}
            >
              Volver al Inicio
            </Button>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
