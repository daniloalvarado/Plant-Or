import { PlantCard } from "@/components/PlantCard";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client, urlFor } from "@/lib/sanity";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Modal, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Text, View } from "tamagui";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";

export default function HomeScreen() {
  const { user } = useUser();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const [plantas, setPlantas] = useState<any[]>([]);
  const [misPlantas, setMisPlantas] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHabit, setActiveHabit] = useState("Todo");
  const router = useRouter();
  const params = useLocalSearchParams();

  // Filter States
  const [modalVisible, setModalVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [filterFlower, setFilterFlower] = useState("");
  const [filterFruit, setFilterFruit] = useState("");
  const [filterSemilla, setFilterSemilla] = useState("");
  const [filterInflorescencia, setFilterInflorescencia] = useState("");
  
  // Dynamic Filters
  const [filtrosDinamicos, setFiltrosDinamicos] = useState<any[]>([]);
  const [selectedFiltros, setSelectedFiltros] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const data = await client.fetch(`*[_type == "planta" && !(_id in path("drafts.**")) && estado_revision == "Validado"]`);
      setPlantas(data);

      const filtrosData = await client.fetch(`*[_type == "filtro" && activo == true] | order(categoria asc, nombre_filtro asc)`);
      setFiltrosDinamicos(filtrosData);
    } catch (e) { console.error(e); }

    if (user?.id) {
      try {
        const misAportes = await client.fetch(`*[_type == "planta" && autor == $userId] | order(_createdAt desc) {
          _id,
          nombre_cientifico,
          estado_revision
        }`, { userId: user.id });
        setMisPlantas(misAportes);

        // Check if there are new updates
        const storedSignature = await AsyncStorage.getItem(`notifs_sig_${user.id}`);
        // Create a signature representing the current state of all records
        const currentSignature = JSON.stringify(misAportes.map((p: any) => p._id + p.estado_revision));
        
        if (storedSignature !== currentSignature && misAportes.length > 0) {
          setHasUnread(true);
        }
      } catch (e) { console.error(e); }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      if (params.openNotif === 'true') {
        setNotifVisible(true);
        router.setParams({ openNotif: '' });
      }
    }, [user?.id, params.openNotif])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const userName = user?.firstName || "Explorador";
  const userRole = user?.publicMetadata?.role as string;
  const showBadge = userRole === "admin" || userRole === "profesor_validador";
  const badgeText = userRole === "admin" ? "ADMIN" : userRole === "profesor_validador" ? "PROFESOR" : "";

  const hasValue = (obj: any, targetValue: string): boolean => {
    if (!obj) return false;
    if (typeof obj === 'string') return obj === targetValue;
    if (Array.isArray(obj)) return obj.some(item => hasValue(item, targetValue));
    if (typeof obj === 'object') return Object.values(obj).some(val => hasValue(val, targetValue));
    return false;
  };

  const filteredPlantas = plantas.filter((p) => {
    const matchesSearch =
      ((p.nombre_cientifico || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nombres_comunes || "").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHabit = activeHabit === "Todo" || p.habito === activeHabit;

    const matchesDynamic = selectedFiltros.length === 0 || selectedFiltros.every(dato_tecnico => hasValue(p, dato_tecnico));

    return matchesSearch && matchesHabit && matchesDynamic;
  });

  // Dynamic Options merged with static values from PLANT-OR document
  const habitsList = ["Todo", "Árbol", "Palmera", "Arbusto", "Liana", "Hierba"];

  // Group dynamic filters by category
  const groupedFiltros = filtrosDinamicos.reduce((acc, filtro) => {
    if (!acc[filtro.categoria]) acc[filtro.categoria] = [];
    acc[filtro.categoria].push(filtro);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      {/* Fixed Header + Search */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20, backgroundColor: theme.background }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Avatar circular size="$4">
              <Avatar.Image src={user?.imageUrl || "https://i.pravatar.cc/150"} />
              <Avatar.Fallback backgroundColor="#1FC451" />
            </Avatar>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={[styles.greeting, { color: '#ffffff' }]}>Hola, {userName}!</Text>
                {showBadge && (
                  <View style={{ backgroundColor: '#1FC451', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#08130D' }}>{badgeText}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.subtitle, { color: theme.icon }]}>¡Descubre la flora amazónica hoy!</Text>
            </View>
          </View>
          <Pressable 
            onPress={async () => {
              setNotifVisible(true);
              setHasUnread(false);
              if (user?.id) {
                const currentSignature = JSON.stringify(misPlantas.map((p: any) => p._id + p.estado_revision));
                await AsyncStorage.setItem(`notifs_sig_${user.id}`, currentSignature);
              }
            }} 
            style={[styles.bellContainer, { backgroundColor: "rgba(255,255,255,0.05)" }]}
          >
            <MaterialCommunityIcons name="bell" size={20} color={theme.text} />
            {hasUnread && (
              <View style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#ff4444', width: 10, height: 10, borderRadius: 5 }} />
            )}
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: "rgba(255,255,255,0.05)" }]}>
          <MaterialCommunityIcons name="magnify" size={20} color={theme.icon} />
          <TextInput cursorColor="#ffffff" selectionColor="#0D5E26"
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Por nombre científico o común..."
            placeholderTextColor={theme.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable
            onPress={async () => {
              try {
                const filtrosData = await client.fetch(`*[_type == "filtro" && activo == true] | order(categoria asc, nombre_filtro asc)`);
                setFiltrosDinamicos(filtrosData);
              } catch (e) { console.error(e); }
              setModalVisible(true);
            }}
            style={[styles.filterButton, { backgroundColor: selectedFiltros.length > 0 ? "#1FC451" : "rgba(255,255,255,0.1)", justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }]}
          >
            <MaterialCommunityIcons name="filter-variant" size={20} color={selectedFiltros.length > 0 ? "#08130D" : theme.text} />
          </Pressable>
        </View>
      </View>

      {/* Scrollable: Chips + Plants */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1FC451" colors={['#1FC451']} />
        }
      >
        {/* Categories Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {habitsList.map((habit) => (
            <Pressable
              key={habit}
              onPress={() => setActiveHabit(habit)}
              style={[
                styles.categoryBadge,
                activeHabit === habit 
                  ? { backgroundColor: 'rgba(31,196,81,0.2)', borderColor: '#1FC451' } 
                  : { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.15)' }
              ]}
            >
              <Text style={[
                activeHabit === habit ? { color: '#1FC451', fontWeight: "bold" } : { color: 'rgba(255,255,255,0.7)' },
                { fontSize: 13 }
              ]}>
                {habit}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Grid of Plants */}
        <View style={styles.gridContainer}>
          {filteredPlantas.length > 0 ? (
            filteredPlantas.map((planta) => {
              const imageUrl = planta.galeria && planta.galeria.length > 0
                ? urlFor(planta.galeria[0]).width(400).url()
                : null;

              return (
                <PlantCard
                  key={planta._id}
                  id={planta._id}
                  title={planta.nombre_cientifico || planta.nombres_comunes || "Planta"}
                  habito={planta.habito || "Planta"}
                  familia={planta.familia || "-"}
                  imageUrl={imageUrl || undefined}
                />
              );
            })
          ) : (
            <View style={{ width: '100%', padding: 40, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name="leaf-off" size={48} color={theme.icon} style={{ opacity: 0.5, marginBottom: 16 }} />
              <Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center', fontSize: 16 }}>
                No se encontraron especies con los filtros o parámetros de búsqueda actuales.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Advanced Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#12221A' : '#fff' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Filtros</Text>
              <Pressable onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                <MaterialCommunityIcons name="close" size={20} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {Object.keys(groupedFiltros).length > 0 ? (
                Object.keys(groupedFiltros).map(categoria => (
                  <View key={categoria}>
                    <Text style={[styles.filterLabel, { color: theme.icon }]}>{categoria}</Text>
                    <View style={styles.filterChipContainer}>
                      {groupedFiltros[categoria].map((filtro: any) => {
                        const isActive = selectedFiltros.includes(filtro.dato_tecnico);
                        return (
                          <Pressable
                            key={filtro._id}
                            onPress={() => {
                              setSelectedFiltros(prev => {
                                if (isActive) {
                                  return prev.filter(f => f !== filtro.dato_tecnico);
                                }
                                
                                let newSelected = [...prev];
                                
                                // Respetar "Selección única"
                                if (filtro.tipo_seleccion === 'Selección única') {
                                  // Remover cualquier otro filtro seleccionado de esta misma categoría
                                  const categoryFilters = groupedFiltros[categoria].map((f: any) => f.dato_tecnico);
                                  newSelected = newSelected.filter(f => !categoryFilters.includes(f));
                                }
                                
                                // Límite de máximo 3 filtros en total
                                if (newSelected.length >= 3) {
                                  // Eliminamos el más antiguo para hacer espacio al nuevo
                                  newSelected.shift();
                                }
                                
                                return [...newSelected, filtro.dato_tecnico];
                              });
                            }}
                            style={[
                              styles.filterChip,
                              isActive ? { backgroundColor: "#1FC451", borderColor: "#1FC451" } : { backgroundColor: "rgba(255,255,255,0.05)" }
                            ]}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              {filtro.icono && (
                                <MaterialCommunityIcons 
                                  name={filtro.icono as any} 
                                  size={16} 
                                  color={isActive ? "#08130D" : theme.icon} 
                                />
                              )}
                              <Text style={{ color: isActive ? "#08130D" : theme.text, fontWeight: isActive ? "bold" : "normal" }}>
                                {filtro.nombre_filtro}
                              </Text>
                            </View>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                ))
              ) : (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <MaterialCommunityIcons name="filter-off-outline" size={40} color={theme.icon} style={{ opacity: 0.5, marginBottom: 12 }} />
                  <Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center' }}>No hay filtros dinámicos disponibles.</Text>
                </View>
              )}

            </ScrollView>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
              <Pressable
                onPress={() => {
                  setSelectedFiltros([]);
                  setActiveHabit("Todo");
                }}
                style={[styles.modalButton, { flex: 1, backgroundColor: "rgba(255,255,255,0.05)" }]}
              >
                <Text style={{ color: theme.text, textAlign: 'center', fontWeight: 'bold' }}>Limpiar Filtros</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { flex: 1, backgroundColor: "#1FC451" }]}
              >
                <Text style={{ color: "#08130D", textAlign: 'center', fontWeight: 'bold' }}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal (Mis Aportes) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notifVisible}
        onRequestClose={() => setNotifVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colorScheme === 'dark' ? '#12221A' : '#fff' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Mis Aportes</Text>
              <Pressable onPress={() => setNotifVisible(false)} style={styles.closeModalButton}>
                <MaterialCommunityIcons name="close" size={20} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
              {misPlantas.length > 0 ? misPlantas.map(planta => (
                <Pressable 
                  key={planta._id} 
                  onPress={() => {
                    if (planta.estado_revision === 'Observado') {
                      setNotifVisible(false);
                      router.push({ pathname: '/registro', params: { editId: planta._id } } as any);
                    } else if (planta.estado_revision === 'Validado') {
                      setNotifVisible(false);
                      router.push(`/plant/${planta._id}` as any);
                    }
                  }}
                  style={({ pressed }) => [
                    { 
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                      backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, marginBottom: 12 
                    },
                    pressed && (planta.estado_revision === 'Observado' || planta.estado_revision === 'Validado') ? { opacity: 0.7 } : {}
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: 'bold' }}>{planta.nombre_cientifico || 'Planta sin nombre'}</Text>
                    <Text style={{ color: theme.icon, fontSize: 11, marginTop: 2 }}>
                      Cód: {planta._id}
                    </Text>
                    {planta.estado_revision === 'Observado' ? (
                       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
                         <Text style={{ color: "#FFA500", fontSize: 12, fontWeight: 'bold' }}>
                           ¡Toca para corregir!
                         </Text>
                         <MaterialCommunityIcons name="pencil" size={14} color="#FFA500" />
                       </View>
                    ) : planta.estado_revision === 'Validado' ? (
                       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
                         <Text style={{ color: "#1FC451", fontSize: 12, fontWeight: 'bold' }}>
                           ¡Ver ficha técnica!
                         </Text>
                         <MaterialCommunityIcons name="eye" size={14} color="#1FC451" />
                       </View>
                    ) : (
                       <Text style={{ color: theme.icon, fontSize: 12, marginTop: 4 }}>
                         Estado actual
                       </Text>
                    )}
                  </View>
                  <View style={{ 
                    backgroundColor: planta.estado_revision === 'Validado' ? 'rgba(31,196,81,0.2)' : 
                                    planta.estado_revision === 'Observado' ? 'rgba(255,165,0,0.2)' : 
                                    planta.estado_revision === 'Rechazado' ? 'rgba(255,68,68,0.2)' : 
                                    'rgba(255,255,255,0.1)', 
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 
                  }}>
                    <Text style={{ 
                      color: planta.estado_revision === 'Validado' ? '#1FC451' : 
                             planta.estado_revision === 'Observado' ? '#FFA500' : 
                             planta.estado_revision === 'Rechazado' ? '#FF4444' : 
                             '#ffffff', 
                      fontSize: 12, fontWeight: 'bold' 
                    }}>
                      {planta.estado_revision === 'en_revision' ? 'En revisión' : planta.estado_revision || 'En revisión'}
                    </Text>
                  </View>
                </Pressable>
              )) : (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <MaterialCommunityIcons name="leaf" size={48} color={theme.icon} style={{ opacity: 0.5, marginBottom: 16 }} />
                  <Text style={{ color: theme.text, opacity: 0.7, textAlign: 'center' }}>Aún no has registrado ninguna planta.</Text>
                </View>
              )}
            </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  bellContainer: {
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryBadge: {
    backgroundColor: "rgba(31,196,81,0.2)",
    borderColor: "#1FC451",
  },
  activeCategoryText: {
    color: "#1FC451",
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  closeModalButton: {
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterChipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  modalButton: {
    paddingVertical: 16,
    borderRadius: 12,
  }
});