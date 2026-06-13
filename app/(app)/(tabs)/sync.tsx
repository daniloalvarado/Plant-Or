import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack, XStack, Button, Card, H3, Paragraph } from 'tamagui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Network from 'expo-network';
import { checkIsOffline } from '@/lib/network';
import { useFocusEffect, useRouter } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { getRegistrosOffline, syncRegistro, OfflineRegistro, removeRegistroOffline } from '@/lib/offline-storage';

export default function SyncScreen() {
  const [registros, setRegistros] = useState<OfflineRegistro[]>([]);
  const [isOnline, setIsOnline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const loadData = async () => {
    const isOffline = await checkIsOffline();
    setIsOnline(!isOffline);
    const data = await getRegistrosOffline();
    setRegistros(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSyncAll = async () => {
    if (!isOnline) {
      alert("No tienes conexión a internet para sincronizar.");
      return;
    }

    if (!isSignedIn || !user) {
      alert("Para subir tus registros a la base de datos necesitamos asociarlos a tu cuenta. Por favor inicia sesión.");
      router.push('/sign-in');
      return;
    }
    
    setIsSyncing(true);
    let successCount = 0;

    for (const reg of registros) {
      // Si el usuario recién se loguea y no tiene DNI en su cuenta, sacarlo del registro
      if (!user.unsafeMetadata.dni && reg.data.registrador_dni) {
        try {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              dni: reg.data.registrador_dni,
              facultad: reg.data.registrador_facultad,
              escuela: reg.data.registrador_escuela,
              curso: reg.data.registrador_curso,
              dia_clase: reg.data.registrador_dia_clase,
              role: 'estudiante'
            }
          });
        } catch (e) {
          console.error("Error guardando metadatos en Clerk:", e);
        }
      }

      const success = await syncRegistro(reg, user);
      if (success) {
        successCount++;
      }
    }

    setIsSyncing(false);
    await loadData();
    
    if (successCount > 0) {
      alert(`Se sincronizaron ${successCount} registros exitosamente.`);
    } else if (registros.length > 0) {
      alert("Ocurrió un error al sincronizar. Revisa tu conexión e intenta de nuevo.");
    }
  };

  const handleRemove = async (id: string) => {
    await removeRegistroOffline(id);
    await loadData();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#08130D' }} edges={['top']}>
      <YStack style={{ padding: 16, flex: 1 }} gap="$4">
        <XStack style={{ alignItems: "center", justifyContent: "space-between" }}>
          <H3 color="white">Sincronización</H3>
          <XStack gap="$2" style={{ backgroundColor: isOnline ? 'rgba(31,196,81,0.2)' : 'rgba(255,68,68,0.2)', alignItems: "center", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
            <MaterialCommunityIcons name={isOnline ? "wifi" : "wifi-off"} size={16} color={isOnline ? "#1FC451" : "#ff4444"} />
            <Text color={isOnline ? "#1FC451" : "#ff4444"} fontSize={12} fontWeight="bold">
              {isOnline ? "Conectado" : "Sin conexión"}
            </Text>
          </XStack>
        </XStack>

        <Paragraph color="rgba(255,255,255,0.7)" size="$3">
          Aquí aparecerán los registros de plantas que guardaste mientras no tenías internet.
        </Paragraph>

        {registros.length > 0 && (
          <Button 
            bg="#1FC451" 
            color="white" 
            onPress={handleSyncAll}
            disabled={!isOnline || isSyncing}
            opacity={(!isOnline || isSyncing) ? 0.5 : 1}
            icon={isSyncing ? <MaterialCommunityIcons name="loading" size={20} color="white" /> : <MaterialCommunityIcons name="cloud-upload" size={20} color="white" />}
          >
            {isSyncing ? "Sincronizando..." : `Sincronizar Todo (${registros.length})`}
          </Button>
        )}

        <ScrollView 
          contentContainerStyle={{ gap: 16, paddingBottom: 20, flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1FC451" />}
        >
          {registros.length === 0 ? (
            <YStack style={{ flex: 1, alignItems: "center", justifyContent: "center" }} gap="$4" mt="$10">
              <MaterialCommunityIcons name="cloud-check-outline" size={64} color="rgba(255,255,255,0.2)" />
              <Text color="rgba(255,255,255,0.5)" style={{ textAlign: "center" }}>
                No hay registros pendientes por sincronizar.
              </Text>
            </YStack>
          ) : (
            registros.map((reg) => (
              <Card key={reg.id} padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={1} borderColor="rgba(255,255,255,0.1)">
                <XStack style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <YStack gap="$1" style={{ flex: 1 }}>
                    <Text color="white" fontWeight="bold" fontSize={16} numberOfLines={1}>
                      {reg.data.nombre_cientifico || 'Por identificar'}
                    </Text>
                    <Text color="rgba(255,255,255,0.7)" fontSize={14}>
                      Hábito: {reg.data.habito}
                    </Text>
                    <Text color="rgba(255,255,255,0.5)" fontSize={12}>
                      Guardado el: {new Date(reg.timestamp).toLocaleString()}
                    </Text>
                    
                    {reg.status === 'error' && reg.errorMsg && (
                      <Text color="#ff4444" fontSize={12} mt="$2">
                        Error: {reg.errorMsg}
                      </Text>
                    )}
                  </YStack>
                  <Button 
                    circular 
                    size="$3" 
                    bg="rgba(255,68,68,0.1)" 
                    onPress={() => handleRemove(reg.id)}
                  >
                    <MaterialCommunityIcons name="delete" size={18} color="#ff4444" />
                  </Button>
                </XStack>
              </Card>
            ))
          )}
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}
