import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, StyleSheet, Dimensions, Pressable, ActivityIndicator, Image, Platform } from "react-native";
import { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { client, urlFor } from "@/lib/sanity";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { Text, Card, XStack, YStack, Button, Input } from "tamagui";
import { useRouter, useFocusEffect, Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

// Estilo oscuro simple para el mapa
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
];

export default function MapaScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];
  const router = useRouter();
  const mapRef = useRef<any>(null);

  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  const [plantas, setPlantas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanta, setSelectedPlanta] = useState<any | null>(null);

  // Coordenadas centrales de Iquitos
  const iquitosRegion = {
    latitude: -3.74912,
    longitude: -73.25383,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  useFocusEffect(
    useCallback(() => {
      fetchMapData();
    }, [])
  );

  const fetchMapData = async () => {
    try {
      // Todas las plantas con coordenadas (validadas Y en revisión)
      const data = await client.fetch(`
        *[_type == "planta" && defined(latitud) && defined(longitud) && estado_revision == "Validado"] | order(_createdAt desc) {
          _id,
          nombre_cientifico,
          nombres_comunes,
          habito,
          latitud,
          longitud,
          galeria,
          familia,
          estado_revision,
          distrito,
          direccion,
          tipo_ubicacion_1,
          tipo_ubicacion_2,
          numero_casa
        }
      `);
      setPlantas(data);
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlantas = plantas.filter(p => {
    const textToSearch = `${p.distrito || ''} ${p.direccion || ''} ${p.tipo_ubicacion_1 || ''} ${p.tipo_ubicacion_2 || ''} ${p.numero_casa || ''} ${p.nombres_comunes || ''} ${p.nombre_cientifico || ''}`.toLowerCase();
    return !searchTerm || textToSearch.includes(searchTerm.toLowerCase());
  });

  const getMarkerColor = (estado: string) => {
    switch (estado) {
      case 'Validado': return '#1FC451';
      case 'Observado': return '#f97316';
      case 'Rechazado': return '#ef4444';
      default: return '#facc15'; // En revisión = amarillo
    }
  };

  const handleMarkerPress = (planta: any) => {
    setSelectedPlanta(planta);
    mapRef.current?.animateToRegion({
      latitude: planta.latitud - 0.005,
      longitude: planta.longitud,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 500);
  };

  const handleMapPress = () => {
    setSelectedPlanta(null);
  };

  const validadas = plantas.filter(p => p.estado_revision === 'Validado').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background as any }]} edges={['top']}>
      {loading ? (
        <View style={[styles.loadingOverlay, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color="#1FC451" />
          <Text style={{ color: theme.text as any, marginTop: 16 }}>Cargando mapa forestal...</Text>
        </View>
      ) : null}

      <MapView mapType="satellite"
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={iquitosRegion}
        customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
        onPress={handleMapPress}
        showsUserLocation={true}
        clusterColor="#1FC451"
        clusterTextColor="#ffffff"
        spiderLineColor="#1FC451"
        renderCluster={(cluster) => {
          const { id, geometry, onPress, properties } = cluster;
          const points = properties.point_count;
          return (
            <Marker
              key={`cluster-${id}`}
              coordinate={{
                longitude: geometry.coordinates[0],
                latitude: geometry.coordinates[1],
              }}
              onPress={onPress}
            >
              <View style={[styles.markerPin, { width: 36, height: 36, borderRadius: 18, backgroundColor: '#1FC451', borderColor: '#ffffff' }]}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>{points}</Text>
              </View>
            </Marker>
          );
        }}
      >
        {filteredPlantas.map((planta) => {
          const color = getMarkerColor(planta.estado_revision);
          return (
            <Marker
              key={planta._id}
              identifier={planta._id}
              coordinate={{ latitude: planta.latitud, longitude: planta.longitud }}
              onPress={(e) => {
                e.stopPropagation();
                handleMarkerPress(planta);
              }}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.markerPin, { backgroundColor: color, borderColor: '#fff' }]}>
                  <MaterialCommunityIcons name="leaf" size={16} color="#08130D" />
                </View>
                <View style={[styles.markerPointer, { borderTopColor: color }]} />
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* Floating Card for Selected Plant */}
      {selectedPlanta && (
        <View style={[styles.floatingCardContainer, { paddingBottom: insets.bottom + 80 }]}>
          <Card 
            elevate 
            size="$4" 
            bordered 
            bg={colorScheme === "dark" ? "#12221A" : "#ffffff"} 
            borderColor="rgba(31, 196, 81, 0.3)"
            animation="bouncy"
            scale={1}
            pressStyle={{ scale: 0.98 }}
            onPress={() => router.push(`/plant/${selectedPlanta._id}` as any)}
          >
            <XStack style={{ padding: 12, alignItems: 'center' }} gap="$3">
              {/* Thumbnail */}
              <View style={styles.thumbnailContainer}>
                {selectedPlanta.galeria && selectedPlanta.galeria.length > 0 ? (
                  <Image 
                    source={{ uri: urlFor(selectedPlanta.galeria[0]).width(200).url() }} 
                    style={styles.thumbnail} 
                  />
                ) : (
                  <MaterialCommunityIcons name="leaf" size={32} color="#1FC451" />
                )}
              </View>

              {/* Info */}
              <YStack flex={1} gap="$1">
                <YStack gap="$0.5">
                  <Text fontSize={17} fontWeight="bold" style={{ color: theme.text as any }} numberOfLines={1}>
                    {selectedPlanta.nombres_comunes || 'Planta'}
                  </Text>
                  {!!selectedPlanta.nombre_cientifico && (
                    <Text fontSize={13} fontStyle="italic" style={{ color: theme.icon as any }} numberOfLines={1}>
                      {selectedPlanta.nombre_cientifico}
                    </Text>
                  )}
                </YStack>
                
                <XStack gap="$2" flexWrap="wrap">
                  <View style={styles.badge}>
                    <MaterialCommunityIcons name="sprout" size={12} color="#1FC451" />
                    <Text fontSize={11} style={{ color: theme.text as any }}>{selectedPlanta.habito}</Text>
                  </View>
                  <View style={styles.badge}>
                    <MaterialCommunityIcons name="file-tree" size={12} color="#f59e0b" />
                    <Text fontSize={11} style={{ color: theme.text as any }}>{selectedPlanta.familia || 'Desconocida'}</Text>
                  </View>
                </XStack>
                
                <Text fontSize={12} style={{ color: "#1FC451", marginTop: 4 }} fontWeight="bold">
                  Toca para ver ficha técnica ➝
                </Text>
              </YStack>
            </XStack>
          </Card>
        </View>
      )}

      {/* Top Overlay: Search Bar */}
      <View style={[styles.topOverlay, { top: insets.top + 10, paddingHorizontal: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: 12, paddingHorizontal: 12, borderWidth: 1, borderColor: 'rgba(31,196,81,0.3)', width: '100%' }}>
          <MaterialCommunityIcons name="magnify" size={20} color="#1FC451" />
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            flex={1}
            borderWidth={0}
            bg="transparent"
            color="white"
            placeholder="Buscar por planta, calle o distrito..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={searchTerm}
            onChangeText={setSearchTerm}
            height={44}
          />
          <View style={{ backgroundColor: 'rgba(31,196,81,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginLeft: 8 }}>
            <Text style={{ color: "#1FC451", fontSize: 12, fontWeight: 'bold' }}>{filteredPlantas.length}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPin: {
    backgroundColor: '#1FC451',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  markerPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1FC451',
    marginTop: -2,
  },
  floatingCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 5,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: 'rgba(31, 196, 81, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  }
});
