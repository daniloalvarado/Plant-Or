import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Image, findNodeHandle, UIManager, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  H2,
  H4,
  Input,
  Label,
  Paragraph,
  Spacer,
  YStack,
  XStack,
  Text,
} from 'tamagui';
import { useUser } from '@clerk/clerk-expo';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RadioSelect } from '@/components/forms/CustomSelectors';
import { FormArbol } from '@/components/forms/FormArbol';
import { FormPalmera } from '@/components/forms/FormPalmera';
import { FormArbusto } from '@/components/forms/FormArbusto';
import { FormLiana } from '@/components/forms/FormLiana';
import { FormHierba } from '@/components/forms/FormHierba';
import { FormCompartido } from '@/components/forms/FormCompartido';
import { validateArbol, validatePalmera, validateArbusto, validateLiana, validateHierba, getMissingSections } from '@/lib/validation';
import { Modal } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { client, urlFor } from '@/lib/sanity';
import * as Network from 'expo-network';
import { saveRegistroOffline, persistImage } from '@/lib/offline-storage';

export default function RegistroScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const router = useRouter();
  const { editId } = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [rolRegistro, setRolRegistro] = useState<'estudiante' | 'ciudadano'>('estudiante');
  const [offlineUserCache, setOfflineUserCache] = useState<any>(null);

  // Intentar cargar la sesión offline
  useEffect(() => {
    import('@react-native-async-storage/async-storage').then(({ default: AsyncStorage }) => {
      AsyncStorage.getItem('offline_user_profile').then(data => {
        if (data) {
          const parsedUser = JSON.parse(data);
          setOfflineUserCache(parsedUser);
          
          // Si estamos offline (user de clerk no cargó), rellenamos con el caché
          if (!user && !editId) {
            setNombre(parsedUser.fullName || '');
            setEmail(parsedUser.primaryEmailAddress?.emailAddress || '');
            if (parsedUser.unsafeMetadata?.dni) setDni(parsedUser.unsafeMetadata.dni);
            if (parsedUser.unsafeMetadata?.curso) setCurso(parsedUser.unsafeMetadata.curso);
            if (parsedUser.unsafeMetadata?.facultad) setFacultad(parsedUser.unsafeMetadata.facultad);
            if (parsedUser.unsafeMetadata?.escuela) setEscuela(parsedUser.unsafeMetadata.escuela);
            if (parsedUser.unsafeMetadata?.dia_clase) setDiaClase(parsedUser.unsafeMetadata.dia_clase);
            if (parsedUser.unsafeMetadata?.role) setRolRegistro(parsedUser.unsafeMetadata.role);
          }
        }
      });
    });
  }, [user, editId]);


  // Form State: Bloque 1
  const [nombre, setNombre] = useState(user?.fullName || '');
  const [dni, setDni] = useState((user?.unsafeMetadata?.dni as string) || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [curso, setCurso] = useState((user?.unsafeMetadata?.curso as string) || '');
  const [facultad, setFacultad] = useState((user?.unsafeMetadata?.facultad as string) || '');
  const [escuela, setEscuela] = useState((user?.unsafeMetadata?.escuela as string) || '');
  const [diaClase, setDiaClase] = useState((user?.unsafeMetadata?.dia_clase as string) || '');

  // Form State: Bloque 3 - Identificación botánica
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [nombresComunes, setNombresComunes] = useState('');
  const [familia, setFamilia] = useState('');

  const [estadoRevision, setEstadoRevision] = useState('');
  const [motivoObservacion, setMotivoObservacion] = useState('');

  // Form State: Bloque 2
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distrito, setDistrito] = useState('');
  const [direccion, setDireccion] = useState('');
  const [tipoUbicacion, setTipoUbicacion] = useState(''); // tipo_ubicacion_1
  const [tipoUbicacion2, setTipoUbicacion2] = useState(''); // tipo_ubicacion_2
  const [numeroCasa, setNumeroCasa] = useState('');
  const [sustratoPlanta, setSustratoPlanta] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State: Planta Autogenerado
  const [numeroPlantaAutogenerado, setNumeroPlantaAutogenerado] = useState<number>(0);

  // Form State: Bloque 3
  const [fotos, setFotos] = useState<{
    planta_completa: string | null;
    hoja: string | null;
    flor: string | null;
    fruto: string | null;
    semilla: string | null;
  }>({
    planta_completa: null,
    hoja: null,
    flor: null,
    fruto: null,
    semilla: null,
  });
  const [fotosExtra, setFotosExtra] = useState<string[]>([]);

  // Form State: Bloque 4 (Botánico)
  const [datosBotanicos, setDatosBotanicos] = useState<any>({
    habito: '',
    tipoVida: '',
  });


  const [missingSections, setMissingSections] = useState<{ id: string; label: string }[]>([]);
  const [showHelperButton, setShowHelperButton] = useState(false);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [showStep3Error, setShowStep3Error] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const fieldRefs = React.useRef<{ [key: string]: any }>({});

  const registerFieldRef = useCallback((key: string, el: any) => {
    if (el) {
      fieldRefs.current[key] = el;
    }
  }, []);

  const scrollToField = (key: string) => {
    const el = fieldRefs.current[key];
    const sv = scrollViewRef.current;
    
    if (el && sv) {
      const scrollNode = (sv as any).getInnerViewNode ? (sv as any).getInnerViewNode() : findNodeHandle(sv);
      const elNode = findNodeHandle(el);
      
      if (elNode && scrollNode) {
        UIManager.measureLayout(
          elNode,
          scrollNode,
          () => console.log('Failed to measure layout'),
          (x: number, y: number) => {
            sv.scrollTo({ y: Math.max(0, y - 50), animated: true });
          }
        );
      } else {
        // Fallback
        if (el.measureLayout) {
          try {
            el.measureLayout(
              findNodeHandle(sv),
              (x: number, y: number) => {
                sv.scrollTo({ y: Math.max(0, y - 50), animated: true });
              },
              () => console.log('Failed fallback measure layout')
            );
          } catch (e) {}
        }
      }
    }
    setShowMissingModal(false);
  };

  const checkStep3Valid = () => {
    // Primero: campos de identificación botánica (inicio del bloque 3)
    const identMissing: { id: string; label: string }[] = [];
    if (!nombresComunes.trim()) identMissing.push({ id: 'nombresComunes', label: 'Nombre local / común' });
    if (!nombreCientifico.trim()) identMissing.push({ id: 'nombreCientifico', label: 'Nombre científico' });
    if (!familia.trim()) identMissing.push({ id: 'familia', label: 'Familia botánica' });
    if (!datosBotanicos.habito) identMissing.push({ id: 'habito', label: 'Hábito de la planta' });
    if (!datosBotanicos.tipoVida) identMissing.push({ id: 'tipoVida', label: 'Tipo de vida' });

    // Luego: campos dasométricos, tronco, hojas, reproductivos, estado e impacto
    const botanicMissing = getMissingSections(datosBotanicos.habito, datosBotanicos);

    // El orden del modal debe reflejar exactamente el orden visual del formulario
    return [...identMissing, ...botanicMissing];
  };

  useEffect(() => {
    if (showHelperButton) {
      const missing = checkStep3Valid();
      setMissingSections(missing);
      if (missing.length === 0) {
        setShowHelperButton(false);
        setShowMissingModal(false);
      }
    }
  }, [datosBotanicos, nombresComunes, nombreCientifico, familia, showHelperButton]);

  const handleContinuarBloque3 = () => {
    const missing = checkStep3Valid();
    if (missing.length > 0) {
      setMissingSections(missing);
      setShowMissingModal(true);
      setShowHelperButton(true);
    } else {
      setShowHelperButton(false);
      nextStep();
    }
  };


  const numericFields = [
    'altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular',
    'altura_inicio_copa', 'numero_troncos', 'longitud_peciolo', 'diametro_peciolo',
    'fruto_tamano_largo', 'fruto_tamano_ancho', 'flor_tamano', 'flor_tamano_largo', 'flor_tamano_ancho',
    'semilla_numero', 'semilla_tamano_largo', 'semilla_tamano_ancho', 'semilla_tamano',
    'hoja_largo', 'hoja_ancho', 'peciolo_largo', 'peciolo_diametro', 'numero_tallos',
    'altura_inicio_ramificacion', 'longitud_visible', 'altura_maxima', 'diametro_tallo',
    'cobertura', 'fruto_tamano'
  ];

  const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {
    let finalValue = nestedValue !== undefined ? nestedValue : fieldOrValue;
    const finalField = nestedValue !== undefined ? fieldOrValue : sectionOrKey;

    // Sanitización para campos numéricos: solo dejar números y puntos
    if (typeof finalValue === 'string' && numericFields.includes(finalField)) {
      finalValue = finalValue.replace(/[^0-9.]/g, '');
    }

    setDatosBotanicos((prev: any) => {
      if (nestedValue !== undefined) {
        // Es una actualización anidada: section, field, value
        return {
          ...prev,
          [sectionOrKey]: {
            ...(prev[sectionOrKey] || {}),
            [finalField]: finalValue
          }
        };
      }
      // Actualización directa: key, value
      return { ...prev, [finalField]: finalValue };
    });
  };

  // Sync profile data on tab focus (for new records)
  useFocusEffect(
    useCallback(() => {
      if (!editId && user) {
        setNombre(user.fullName || '');
        setEmail(user.primaryEmailAddress?.emailAddress || '');
        if (user.unsafeMetadata?.dni) setDni(user.unsafeMetadata.dni as string);
        if (user.unsafeMetadata?.curso) setCurso(user.unsafeMetadata.curso as string);
        if (user.unsafeMetadata?.facultad) setFacultad(user.unsafeMetadata.facultad as string);
        if (user.unsafeMetadata?.escuela) setEscuela(user.unsafeMetadata.escuela as string);
        if (user.unsafeMetadata?.dia_clase) setDiaClase(user.unsafeMetadata.dia_clase as string);
        if (user.unsafeMetadata?.role) setRolRegistro(user.unsafeMetadata.role as 'estudiante' | 'ciudadano');

        // Consultar el número de plantas actual para autogenerar
        client.fetch(`count(*[_type == "planta" && autor == $userId])`, { userId: user.id })
          .then(count => setNumeroPlantaAutogenerado(count))
          .catch(err => console.error("Error fetching count", err));
      }
    }, [user, editId])
  );

  // Use offline user data to bypass validation checks if necessary
  const effectiveUser = user || offlineUserCache;

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Se requiere permiso para acceder al GPS.');
      return;
    }

    try {
      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    } catch (err) {
      setErrorMsg('Error obteniendo la ubicación.');
    }
  };

  useEffect(() => {
    if (step === 2 && !location && !editId) {
      fetchLocation();
    }
  }, [step]);

  // Load existing data if editId is provided
  useEffect(() => {
    if (editId) {
      loadExistingData(editId as string);
    }
  }, [editId]);

  const loadExistingData = async (id: string) => {
    setIsLoadingEdit(true);
    try {
      const doc = await client.fetch(`*[_id == $id][0]`, { id });
      if (doc) {
        setEstadoRevision(doc.estado_revision || '');
        setMotivoObservacion(doc.motivo_observacion || '');
        setNombreCientifico(doc.nombre_cientifico && doc.nombre_cientifico !== 'Por identificar' ? doc.nombre_cientifico : '');
        setNombresComunes(doc.nombres_comunes || '');
        setFamilia(doc.familia || '');
        setNombre(doc.registrador_nombre || user?.fullName || '');
        setDni(doc.registrador_dni || (user?.unsafeMetadata?.dni as string) || '');
        setEmail(doc.registrador_email || user?.primaryEmailAddress?.emailAddress || '');
        setCurso(doc.registrador_curso || (user?.unsafeMetadata?.curso as string) || '');
        setFacultad(doc.registrador_facultad || (user?.unsafeMetadata?.facultad as string) || '');
        setEscuela(doc.registrador_escuela || (user?.unsafeMetadata?.escuela as string) || '');
        setDiaClase(doc.registrador_dia_clase || (user?.unsafeMetadata?.dia_clase as string) || '');
        
        if (doc.latitud && doc.longitud) {
          setLocation({ latitude: doc.latitud, longitude: doc.longitud });
        }
        setDistrito(doc.distrito || '');
        setDireccion(doc.direccion || '');
        
        // Handle "Otro" options correctly when loading
        if (['Jirón', 'Avenida', 'Calle', 'Pasaje', 'Parque'].includes(doc.tipo_ubicacion_1)) {
          setTipoUbicacion(doc.tipo_ubicacion_1 || '');
        } else if (doc.tipo_ubicacion_1) {
          setTipoUbicacion('Otro:' + doc.tipo_ubicacion_1);
        } else { setTipoUbicacion(''); }
        
        if (['Vereda', 'Berma central', 'Dentro del domicilio'].includes(doc.tipo_ubicacion_2)) {
          setTipoUbicacion2(doc.tipo_ubicacion_2 || '');
        } else if (doc.tipo_ubicacion_2) {
          setTipoUbicacion2('Otro:' + doc.tipo_ubicacion_2);
        } else { setTipoUbicacion2(''); }
        
        setNumeroCasa(doc.numero_casa || '');
        
        if (['En tierra', 'En macetero'].includes(doc.ubicacion_planta)) {
          setSustratoPlanta(doc.ubicacion_planta || '');
        } else if (doc.ubicacion_planta) {
          setSustratoPlanta('Otro:' + doc.ubicacion_planta);
        } else { setSustratoPlanta(''); }
        
        if (doc.numero_planta) setNumeroPlantaAutogenerado(Number(doc.numero_planta));

        setDatosBotanicos({
          habito: doc.habito || '',
          tipoVida: doc.tipo_vida || '',
          compartido: {
            estado_fenologico: doc.estado_fenologico,
            estado_individuo: doc.estado_individuo,
            // Map old sanity values to new form values if necessary, otherwise keep them
            valor_ornamental: doc.valor_ornamental?.map((v: string) => v === 'Da sombra' ? 'Genera sombra' : v === 'Tiene copa atractiva' ? 'Tiene copa o forma atractiva' : v === 'Valor cultural' ? 'Tiene valor cultural' : v === 'Valor alimenticio' ? 'Tiene valor alimenticio' : v === 'Valor medicinal' ? 'Tiene valor medicinal' : v),
            impacto_urbano: doc.impacto_urbano?.map((v: string) => v === 'Raíces rompen el piso' ? 'Raíces levantan vereda' : v === 'Raíces afectan veredas' ? 'Raíces levantan vereda' : v === 'Raíces afectan cimientos' ? 'Raíces afectan cimientos o paredes' : v === 'Tronco inclinado (riesgo)' ? 'Tronco o tallo inclinado' : v),
          },
          reproductivo: doc.reproductivo || {},
          // Map back the flattened data based on habit
          ...(doc.habito === 'Árbol' && {
            dasometria: { altura_total: doc.arbol_datos?.altura_total?.toString(), cap: doc.arbol_datos?.cap?.toString(), diametro_copa_paralelo: doc.arbol_datos?.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: doc.arbol_datos?.diametro_copa_perpendicular?.toString(), altura_inicio_copa: doc.arbol_datos?.altura_inicio_copa?.toString(), raices_visibles: doc.arbol_datos?.raices_visibles },
            tronco: { forma: doc.arbol_datos?.forma_tronco, color_corteza: doc.arbol_datos?.color_corteza, lenticelas: doc.arbol_datos?.lenticelas, corteza_externa: doc.arbol_datos?.corteza_externa, numero_troncos: doc.arbol_datos?.numero_troncos?.toString(), espinas_tronco: doc.arbol_datos?.espinas_tronco, olor_corteza: doc.arbol_datos?.olor_corteza },
            exudado: { presencia: doc.arbol_datos?.exudado_presencia, tipo: doc.arbol_datos?.exudado_tipo, color: doc.arbol_datos?.exudado_color },
            copa: { tipo_ramificacion: doc.arbol_datos?.tipo_ramificacion, forma_copa: doc.arbol_datos?.forma_copa, densidad_copa: doc.arbol_datos?.densidad_copa },
            hojas: { tipo: doc.arbol_datos?.tipo_hoja, disposicion_hoja: doc.arbol_datos?.disposicion_hoja, forma_hoja: doc.arbol_datos?.forma_hoja, borde_hoja: doc.arbol_datos?.borde_hoja, textura_hoja: doc.arbol_datos?.textura_hoja, color_enves: doc.arbol_datos?.color_enves, pelos_hoja: doc.arbol_datos?.pelos_hoja, tipo_peciolo: doc.arbol_datos?.tipo_peciolo, longitud_peciolo: doc.arbol_datos?.longitud_peciolo?.toString(), diametro_peciolo: doc.arbol_datos?.diametro_peciolo?.toString(), peciolo_pulvino: doc.arbol_datos?.peciolo_pulvino }
          }),
          ...(doc.habito === 'Palmera' && {
            dasometria: { altura_total: doc.palmera_datos?.altura_total?.toString(), cap: doc.palmera_datos?.cap?.toString(), diametro_copa_paralelo: doc.palmera_datos?.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: doc.palmera_datos?.diametro_copa_perpendicular?.toString(), altura_inicio_copa: doc.palmera_datos?.altura_inicio_copa?.toString(), numero_tallos: doc.palmera_datos?.numero_tallos, raices_visibles: doc.palmera_datos?.raices_visibles },
            general: { tipo: doc.palmera_datos?.tipo_palmera },
            tallo: { caracteristicas: doc.palmera_datos?.tallo },
            hojas: { tipo: doc.palmera_datos?.tipo_hoja, segmentos: doc.palmera_datos?.segmentos, hoja_largo: doc.palmera_datos?.hoja_largo?.toString(), hoja_ancho: doc.palmera_datos?.hoja_ancho?.toString(), peciolo_largo: doc.palmera_datos?.peciolo_largo?.toString(), peciolo_diametro: doc.palmera_datos?.peciolo_diametro?.toString(), color_hoja: doc.palmera_datos?.color_hoja },
            espinas: { presencia: doc.palmera_datos?.espinas_palmera },
            inflorescencia: { presencia: doc.palmera_datos?.inflorescencia_presencia, posicion: doc.palmera_datos?.inflorescencia_posicion, forma: doc.palmera_datos?.inflorescencia_forma, espata: doc.palmera_datos?.inflorescencia_espata }
          }),
          ...(doc.habito === 'Arbusto' && {
            dasometria: { altura_total: doc.arbusto_datos?.altura_total?.toString(), diametro_copa_paralelo: doc.arbusto_datos?.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: doc.arbusto_datos?.diametro_copa_perpendicular?.toString(), altura_inicio_ramificacion: doc.arbusto_datos?.altura_inicio_ramificacion?.toString() },
            tallo: { numero_tallos: doc.arbusto_datos?.numero_tallos, forma_general: doc.arbusto_datos?.forma_general, densidad_follaje: doc.arbusto_datos?.densidad_follaje, tipo_ramificacion: doc.arbusto_datos?.tipo_ramificacion, tipo_tallo: doc.arbusto_datos?.tipo_tallo, presencia_espinas: doc.arbusto_datos?.presencia_espinas },
            hojas: { tipo: doc.arbusto_datos?.tipo_hoja, hoja_compuesta_tipo: doc.arbusto_datos?.hoja_compuesta_tipo, forma_hoja: doc.arbusto_datos?.forma_hoja, disposicion_hoja: doc.arbusto_datos?.disposicion_hoja, borde_hoja: doc.arbusto_datos?.borde_hoja, color_hoja: doc.arbusto_datos?.color_hoja }
          }),
          ...(doc.habito === 'Liana' && {
            dasometria: { longitud_visible: doc.liana_datos?.longitud_visible?.toString(), altura_maxima: doc.liana_datos?.altura_maxima?.toString(), diametro_tallo: doc.liana_datos?.diametro_tallo?.toString(), numero_tallos: doc.liana_datos?.numero_tallos },
            crecimiento: { tipo_soporte: doc.liana_datos?.tipo_soporte, forma_crecimiento: doc.liana_datos?.forma_crecimiento, mecanismo_fijacion: doc.liana_datos?.mecanismo_fijacion, presencia_espinas: doc.liana_datos?.presencia_espinas },
            hojas: { tipo: doc.liana_datos?.tipo_hoja, hoja_compuesta_tipo: doc.liana_datos?.hoja_compuesta_tipo, forma_hoja: doc.liana_datos?.forma_hoja, disposicion_hoja: doc.liana_datos?.disposicion_hoja, borde_hoja: doc.liana_datos?.borde_hoja, color_hoja: doc.liana_datos?.color_hoja }
          }),
          ...(doc.habito === 'Hierba' && {
            dasometria: { altura_total: doc.hierba_datos?.altura_total?.toString(), cobertura: doc.hierba_datos?.cobertura?.toString(), numero_tallos: doc.hierba_datos?.numero_tallos },
            crecimiento: { tipo_crecimiento: doc.hierba_datos?.tipo_crecimiento, tipo_tallo: doc.hierba_datos?.tipo_tallo },
            hojas: { tipo: doc.hierba_datos?.tipo_hoja, hoja_compuesta_tipo: doc.hierba_datos?.hoja_compuesta_tipo, forma_hoja: doc.hierba_datos?.forma_hoja, disposicion_hoja: doc.hierba_datos?.disposicion_hoja, borde_hoja: doc.hierba_datos?.borde_hoja, color_hoja: doc.hierba_datos?.color_hoja, olor_hoja: doc.hierba_datos?.olor_hoja, exudado_corte: doc.hierba_datos?.exudado_corte }
          })
        });

        // Set photos if they exist (using Sanity URL to display, but we'll need to handle skip in upload)
        if (doc.galeria && doc.galeria.length >= 5) {
          setFotos({
            planta_completa: urlFor(doc.galeria[0]).url(),
            hoja: urlFor(doc.galeria[1]).url(),
            flor: urlFor(doc.galeria[2]).url(),
            fruto: urlFor(doc.galeria[3]).url(),
            semilla: urlFor(doc.galeria[4]).url()
          });
          if (doc.galeria.length > 5) {
            setFotosExtra(doc.galeria.slice(5).map((img: any) => urlFor(img).url()));
          }
        }
      }
    } catch (e) {
      console.error("Error loading edit data", e);
    } finally {
      setIsLoadingEdit(false);
    }
  };

  const takePhoto = async (tipo: keyof typeof fotos) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      setErrorMsg("Permiso de cámara denegado.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled) {
      setFotos((prev) => ({ ...prev, [tipo]: result.assets[0].uri }));
    }
  };

  const pickFromGallery = async (tipo: keyof typeof fotos) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setErrorMsg("Permiso de galería denegado.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled) {
      setFotos((prev) => ({ ...prev, [tipo]: result.assets[0].uri }));
    }
  };

  const takeExtraPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      setErrorMsg("Permiso de cámara denegado.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled) {
      setFotosExtra(prev => [...prev, result.assets[0].uri]);
    }
  };

  const pickExtraFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      setErrorMsg("Permiso de galería denegado.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.7,
    });
    if (!result.canceled) {
      setFotosExtra(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeExtraPhoto = (index: number) => {
    setFotosExtra(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    if (step === 1 && user) {
      try {
        let newMetadata: any = { ...user.unsafeMetadata };
        let shouldUpdate = false;

        if (rolRegistro === 'estudiante') {
          if (dni !== (user.unsafeMetadata?.dni || '')) { newMetadata.dni = dni; shouldUpdate = true; }
          if (facultad !== (user.unsafeMetadata?.facultad || '')) { newMetadata.facultad = facultad; shouldUpdate = true; }
          if (escuela !== (user.unsafeMetadata?.escuela || '')) { newMetadata.escuela = escuela; shouldUpdate = true; }
          if (curso !== (user.unsafeMetadata?.curso || '')) { newMetadata.curso = curso; shouldUpdate = true; }
          if (diaClase !== (user.unsafeMetadata?.dia_clase || '')) { newMetadata.dia_clase = diaClase; shouldUpdate = true; }
        }

        if (shouldUpdate) {
          await user.update({ unsafeMetadata: newMetadata });
        }
      } catch (e) {
        console.error("Auto-save profile error:", e);
      }
    }
    
    if (step === 2 && rolRegistro === 'ciudadano') {
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step === 4 && rolRegistro === 'ciudadano') {
      setStep(2);
    } else {
      setStep(step - 1);
    }
  };

  // Validaciones estrictas
  const isStep1Valid = rolRegistro === 'estudiante' 
    ? (nombre.trim() !== '' && dni.length === 8 && email.trim() !== '' && facultad.trim() !== '' && escuela.trim() !== '')
    : (nombre.trim() !== '' && email.trim() !== ''); // Ciudadano solo necesita nombre y email
  const isValidSelector = (val: string) => val.trim() !== '' && val !== 'Otro' && !(val.startsWith('Otro:') && val.substring(5).trim() === '');
  const isStep2Valid = location !== null && 
    distrito.trim() !== '' && 
    direccion.trim() !== '' && 
    isValidSelector(tipoUbicacion) && 
    (tipoUbicacion2 === '' || isValidSelector(tipoUbicacion2)) && 
    isValidSelector(sustratoPlanta);
  // isStep3Valid es ahora la validación de Botánica
  let isStep3Valid = false;
  if (datosBotanicos.habito && datosBotanicos.tipoVida) {
    switch (datosBotanicos.habito) {
      case 'Árbol': isStep3Valid = validateArbol(datosBotanicos); break;
      case 'Palmera': isStep3Valid = validatePalmera(datosBotanicos); break;
      case 'Arbusto': isStep3Valid = validateArbusto(datosBotanicos); break;
      case 'Liana': isStep3Valid = validateLiana(datosBotanicos); break;
      case 'Hierba': isStep3Valid = validateHierba(datosBotanicos); break;
      default: isStep3Valid = false;
    }
  }

  // isStep4Valid es ahora la validación de Fotografías
  const isStep4Valid = fotos.planta_completa && fotos.hoja && fotos.flor && fotos.fruto && fotos.semilla;

  const handleFinalSubmit = async () => {
    if (!process.env.EXPO_PUBLIC_SANITY_TOKEN) {
      alert("⚠️ Falta configurar EXPO_PUBLIC_SANITY_TOKEN en el archivo .env");
      return;
    }

    setIsSubmitting(true);

    try {
      const networkState = await Network.getNetworkStateAsync();
      const isOffline = !networkState.isConnected;

      const writeClient = client.withConfig({
        token: process.env.EXPO_PUBLIC_SANITY_TOKEN,
      });

      // Función auxiliar para subir imágenes a Sanity
      const uploadFoto = async (uri: string | null): Promise<any> => {
        if (!uri) return null;
        // Si la uri empieza con http, significa que es una imagen que ya estaba en Sanity (modo edición)
        // Por simplicidad, retornaremos null temporalmente o saltaremos la resubida. 
        // Lo ideal sería mantener el asset original, pero para el prototipo subiremos de nuevo si cambió,
        // o la omitiremos si es la misma URL (requeriría mantener el _ref original en el state, lo cual
        // simplificamos subiéndola como blob o ignorándola).
        if (uri.startsWith('http')) {
           // En este caso simplificado, si el usuario no cambia la foto, no la resubimos y esperamos
           // que Sanity preserve el array original si no lo modificamos por completo.
           // Pero Sanity requiere referencias completas. Para solucionarlo rápido, requerimos que el
           // usuario tome la foto de nuevo si la va a editar, o necesitamos extraer el _ref del URL.
           // Extraeremos el _id (esto es una aproximación, no ideal, pero funciona para URLs de Sanity):
           const match = uri.match(/images\/[^\/]+\/[^\/]+\/([a-z0-9]+-[0-9]+x[0-9]+-[a-z]+)/);
           if (match && match[1]) {
             return { _type: 'image', asset: { _type: 'reference', _ref: `image-${match[1]}` } };
           }
           return null;
        }

        const token = process.env.EXPO_PUBLIC_SANITY_TOKEN?.trim();
        const projectId = process.env.EXPO_PUBLIC_SANITY_PROJECT_ID || '9m09a5ng';
        const dataset = process.env.EXPO_PUBLIC_SANITY_DATASET || 'production';

        return new Promise(async (resolve, reject) => {
          try {
            // Convertir URI a Blob
            const fetchResponse = await fetch(uri);
            const blob = await fetchResponse.blob();

            // Subir blob a Sanity
            const uploadResponse = await fetch(`https://${projectId}.api.sanity.io/v2024-03-28/assets/images/${dataset}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'image/jpeg',
              },
              body: blob,
            });

            if (!uploadResponse.ok) {
              const text = await uploadResponse.text();
              throw new Error(`Upload failed (${uploadResponse.status}): ${text}`);
            }

            const data = await uploadResponse.json();
            const assetId = data.document?._id;
            
            if (!assetId) {
              throw new Error('No asset ID in response');
            }

            resolve({
              _key: Math.random().toString(36).substring(7),
              _type: 'image',
              asset: { _type: 'reference', _ref: assetId }
            });

          } catch (err: any) {
            reject(new Error(`Fetch error during upload: ${err.message}`));
          }
        });
      };

      // Omitir subir fotos de inmediato, las subiremos solo si es online


      // Parsear números
      const parseNumbers = (obj: any) => {
        if (!obj) return {};
        const result = { ...obj };
        for (let key in result) {
          if (['altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_copa', 'numero_troncos', 'longitud_peciolo', 'diametro_peciolo', 'longitud_visible', 'cobertura', 'flor_tamano_largo', 'flor_tamano_ancho', 'fruto_tamano_largo', 'fruto_tamano_ancho', 'semilla_numero', 'semilla_tamano_largo', 'semilla_tamano_ancho', 'altura_inicio_ramificacion', 'altura_maxima', 'diametro_tallo', 'hoja_largo', 'hoja_ancho', 'peciolo_largo'].includes(key)) {
            result[key] = Number(result[key]) || undefined;
          }
        }
        return result;
      };

      // Crear el documento de la planta
      const nuevoRegistro: any = {
        _type: 'planta',
        autor: effectiveUser?.id,
        nombre_cientifico: nombreCientifico || 'Por identificar',
        nombres_comunes: nombresComunes || '',
        familia: familia || '',
        estado_revision: 'En revisión',
        habito: datosBotanicos.habito,
        tipo_vida: datosBotanicos.tipoVida,
        
        // Datos Personales
        registrador_nombre: nombre,
        registrador_dni: dni,
        registrador_email: email,
        registrador_curso: curso,
        registrador_facultad: facultad,
        registrador_escuela: escuela,
        registrador_dia_clase: diaClase,

        // Ubicación
        latitud: location?.latitude,
        longitud: location?.longitude,
        distrito: distrito,
        direccion: direccion,
        tipo_ubicacion_1: tipoUbicacion.startsWith('Otro:') ? tipoUbicacion.substring(5).trim() : tipoUbicacion,
        tipo_ubicacion_2: tipoUbicacion2.startsWith('Otro:') ? tipoUbicacion2.substring(5).trim() : tipoUbicacion2,
        numero_casa: numeroCasa,
        ubicacion_planta: sustratoPlanta.startsWith('Otro:') ? sustratoPlanta.substring(5).trim() : sustratoPlanta,
        numero_planta: numeroPlantaAutogenerado.toString(),
        
        // Fotos principales en la galería (Se poblarán luego si es online)
        galeria: [],
        
        // Reproductivo
        reproductivo: parseNumbers(datosBotanicos.reproductivo || {}),

        // Compartidos adicionales (Arrays)
        estado_fenologico: datosBotanicos.compartido?.estado_fenologico || [],
        estado_individuo: datosBotanicos.compartido?.estado_individuo || [],
        valor_ornamental: datosBotanicos.compartido?.valor_ornamental || [],
        impacto_urbano: datosBotanicos.compartido?.impacto_urbano || [],
      };

      // Bloques Específicos según el hábito
      if (datosBotanicos.habito === 'Árbol') {
        nuevoRegistro.arbol_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          numero_troncos: datosBotanicos.tronco?.numero_troncos,
          forma_tronco: datosBotanicos.tronco?.forma,
          corteza_externa: datosBotanicos.tronco?.corteza_externa,
          lenticelas: datosBotanicos.tronco?.lenticelas,
          color_corteza: datosBotanicos.tronco?.color_corteza,
          olor_corteza: datosBotanicos.tronco?.olor_corteza,
          espinas_tronco: datosBotanicos.tronco?.espinas_tronco,
          exudado_presencia: datosBotanicos.exudado?.presencia,
          exudado_tipo:      datosBotanicos.exudado?.tipo,
          exudado_color:     datosBotanicos.exudado?.color,
          ...datosBotanicos.copa,
          tipo_hoja: datosBotanicos.hojas?.tipo,
          disposicion_hoja: datosBotanicos.hojas?.disposicion_hoja,
          forma_hoja: datosBotanicos.hojas?.forma_hoja,
          borde_hoja: datosBotanicos.hojas?.borde_hoja,
          textura_hoja: datosBotanicos.hojas?.textura_hoja,
          color_enves: datosBotanicos.hojas?.color_enves,
          pelos_hoja: datosBotanicos.hojas?.pelos_hoja,
          tipo_peciolo: datosBotanicos.hojas?.tipo_peciolo,
          longitud_peciolo: datosBotanicos.hojas?.longitud_peciolo,
          diametro_peciolo: datosBotanicos.hojas?.diametro_peciolo,
          peciolo_pulvino: datosBotanicos.hojas?.peciolo_pulvino,
        });
      }

      if (datosBotanicos.habito === 'Palmera') {
        nuevoRegistro.palmera_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          tipo_palmera:    datosBotanicos.general?.tipo,
          tallo:           datosBotanicos.tallo?.caracteristicas,
          tipo_hoja: datosBotanicos.hojas?.tipo,
          segmentos: datosBotanicos.hojas?.segmentos,
          hoja_largo: datosBotanicos.hojas?.hoja_largo,
          hoja_ancho: datosBotanicos.hojas?.hoja_ancho,
          peciolo_largo: datosBotanicos.hojas?.peciolo_largo,
          peciolo_diametro: datosBotanicos.hojas?.peciolo_diametro,
          color_hoja: datosBotanicos.hojas?.color_hoja,
          espinas_palmera: datosBotanicos.espinas?.presencia,
          inflorescencia_presencia: datosBotanicos.inflorescencia?.presencia,
          inflorescencia_posicion: datosBotanicos.inflorescencia?.posicion,
          inflorescencia_forma: datosBotanicos.inflorescencia?.forma,
          inflorescencia_espata: datosBotanicos.inflorescencia?.espata,
        });
      }

      if (datosBotanicos.habito === 'Arbusto') {
        nuevoRegistro.arbusto_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.tallo,
          tipo_hoja: datosBotanicos.hojas?.tipo,
          hoja_compuesta_tipo: datosBotanicos.hojas?.hoja_compuesta_tipo,
          forma_hoja: datosBotanicos.hojas?.forma_hoja,
          disposicion_hoja: datosBotanicos.hojas?.disposicion_hoja,
          borde_hoja: datosBotanicos.hojas?.borde_hoja,
          color_hoja: datosBotanicos.hojas?.color_hoja,
        });
      }

      if (datosBotanicos.habito === 'Liana') {
        nuevoRegistro.liana_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.crecimiento,
          tipo_hoja: datosBotanicos.hojas?.tipo,
          hoja_compuesta_tipo: datosBotanicos.hojas?.hoja_compuesta_tipo,
          forma_hoja: datosBotanicos.hojas?.forma_hoja,
          disposicion_hoja: datosBotanicos.hojas?.disposicion_hoja,
          borde_hoja: datosBotanicos.hojas?.borde_hoja,
          color_hoja: datosBotanicos.hojas?.color_hoja,
        });
      }

      if (datosBotanicos.habito === 'Hierba') {
        nuevoRegistro.hierba_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.crecimiento,
          tipo_hoja: datosBotanicos.hojas?.tipo,
          hoja_compuesta_tipo: datosBotanicos.hojas?.hoja_compuesta_tipo,
          forma_hoja: datosBotanicos.hojas?.forma_hoja,
          disposicion_hoja: datosBotanicos.hojas?.disposicion_hoja,
          borde_hoja: datosBotanicos.hojas?.borde_hoja,
          color_hoja: datosBotanicos.hojas?.color_hoja,
          olor_hoja: datosBotanicos.hojas?.olor_hoja,
          exudado_corte: datosBotanicos.hojas?.exudado_corte,
        });
      }
      if (isOffline) {
        const localPlanta = await persistImage(fotos.planta_completa || '');
        const localHoja = await persistImage(fotos.hoja || '');
        const localFlor = await persistImage(fotos.flor || '');
        const localFruto = await persistImage(fotos.fruto || '');
        const localSemilla = await persistImage(fotos.semilla || '');
        const localExtras = [];
        for (const extraUri of fotosExtra) {
          const localUri = await persistImage(extraUri);
          if (localUri) localExtras.push(localUri);
        }

        await saveRegistroOffline({
          id: Math.random().toString(36).substring(7) + Date.now().toString(),
          timestamp: Date.now(),
          data: nuevoRegistro,
          photos: {
            planta_completa: localPlanta,
            hoja: localHoja,
            flor: localFlor,
            fruto: localFruto,
            semilla: localSemilla,
            extras: localExtras
          },
          status: 'pending'
        });

        setIsOfflineSaved(true);
      } else {
        const plantaRef = await uploadFoto(fotos.planta_completa);
        const hojaRef = await uploadFoto(fotos.hoja);
        const florRef = await uploadFoto(fotos.flor);
        const frutoRef = await uploadFoto(fotos.fruto);
        const semillaRef = await uploadFoto(fotos.semilla);
        
        const extrasRefs = [];
        for (const extraUri of fotosExtra) {
          const ref = await uploadFoto(extraUri);
          if (ref) extrasRefs.push(ref);
        }

        nuevoRegistro.galeria = [plantaRef, hojaRef, florRef, frutoRef, semillaRef, ...extrasRefs].filter(Boolean);

        if (editId) {
          await writeClient.patch(editId as string).set(nuevoRegistro).commit();
        } else {
          await writeClient.create(nuevoRegistro);
        }
      }
      
      // Guardar el rol de forma permanente si es la primera vez que registra
      if (user && user.unsafeMetadata?.role !== rolRegistro) {
        try {
          await user.update({ unsafeMetadata: { ...user.unsafeMetadata, role: rolRegistro } });
        } catch (e) {
          console.error("Error al fijar rol:", e);
        }
      }

      setShowSuccess(true);
    } catch (error) {
      console.error("Error al enviar a Sanity:", error);
      alert("Hubo un error al enviar el registro. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setShowSuccess(false);
    setIsOfflineSaved(false);
    setStep(1);
    setEstadoRevision('');
    setMotivoObservacion('');
    setNombre(effectiveUser?.fullName || '');
    setDni((effectiveUser?.unsafeMetadata?.dni as string) || '');
    setCurso((effectiveUser?.unsafeMetadata?.curso as string) || '');
    setFacultad((effectiveUser?.unsafeMetadata?.facultad as string) || '');
    setEscuela((effectiveUser?.unsafeMetadata?.escuela as string) || '');
    setDiaClase((effectiveUser?.unsafeMetadata?.dia_clase as string) || '');
    setLocation(null);
    setTipoUbicacion('');
    setTipoUbicacion2('');
    setSustratoPlanta('');
    setFotos({ planta_completa: null, hoja: null, flor: null, fruto: null, semilla: null });
    setFotosExtra([]);
    setDatosBotanicos({ habito: '', tipoVida: '' });
  };

  const resetFormAndGoHome = () => {
    resetFormState();
    router.replace('/');
  };

  const cancelEdit = () => {
    router.setParams({ editId: undefined });
    resetFormState();
  };

  const isStudentByMetadata = !!(effectiveUser?.unsafeMetadata?.dni || effectiveUser?.unsafeMetadata?.facultad || effectiveUser?.unsafeMetadata?.escuela);
  const derivedRole = effectiveUser?.unsafeMetadata?.role || (isStudentByMetadata ? 'estudiante' : (numeroPlantaAutogenerado > 0 ? 'ciudadano' : null));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#08130D' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <YStack gap="$4">
            <H2 color="#ffffff">Registro de Planta</H2>

            {!editId && rolRegistro === 'estudiante' && numeroPlantaAutogenerado >= 20 ? (
              <Card padding="$4" backgroundColor="rgba(255, 68, 68, 0.1)" borderWidth={1} borderColor="#ff4444" mt="$4">
                <XStack gap="$2" style={{ alignItems: "center" }} mb="$2">
                  <MaterialCommunityIcons name="alert-circle" size={24} color="#ff4444" />
                  <H4 color="#ff4444">Límite alcanzado</H4>
                </XStack>
                <Paragraph color="white">
                  Has alcanzado el límite máximo de 20 registros como Estudiante. Ya no puedes registrar más plantas en esta categoría.
                </Paragraph>
                <Button mt="$4" bg="#333" color="white" onPress={() => router.replace('/')}>
                  Volver al inicio
                </Button>
              </Card>
            ) : (
              <>
                <Paragraph color="rgba(255,255,255,0.7)">
                  Paso {step} de 4
                </Paragraph>

            {estadoRevision === 'Observado' && motivoObservacion ? (
              <Card padding="$4" backgroundColor="rgba(255, 165, 0, 0.2)" borderWidth={1} borderColor="#FFA500" mb="$2">
                <XStack gap="$2" style={{ alignItems: "center" }} mb="$2">
                  <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FFA500" />
                  <H4 color="#FFA500">Registro Observado</H4>
                </XStack>
                <Paragraph color="white" mb="$3">{motivoObservacion}</Paragraph>
                <Button 
                  bg="rgba(255,255,255,0.1)" 
                  color="white" 
                  onPress={cancelEdit}
                  size="$3"
                  pressStyle={{ bg: "rgba(255,255,255,0.2)" }}
                  icon={<MaterialCommunityIcons name="close-circle-outline" size={18} color="white" />}
                >
                  Corregir luego y hacer nuevo registro
                </Button>
              </Card>
            ) : null}

            {step === 1 && (
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
            )}

            {step === 2 && (
              <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                <H4 color="#1FC451" mb="$2">Bloque 2: Ubicación GPS</H4>
                <YStack gap="$4">
                  {errorMsg && step === 2 ? (
                    <Paragraph color="#ff4444">{errorMsg}</Paragraph>
                  ) : location ? (
                    <View style={{ height: 300, borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                      <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                          latitude: location.latitude,
                          longitude: location.longitude,
                          latitudeDelta: 0.005,
                          longitudeDelta: 0.005,
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
            )}

            {step === 4 && (
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
                                  <Button size="$2" bg="transparent" onPress={() => setFotos(prev => ({...prev, [item.id]: null}))}>
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
                    
                    {fotosExtra.map((uri, idx) => (
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
            )}

            {step === 3 && (
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
            )}

            {/* -------------------- BLOQUE 5: RESUMEN -------------------- */}
            {step === 5 && (
              <YStack gap="$4">
                <YStack>
                  <Text color="#1FC451" fontSize={14} fontWeight="bold" textTransform="uppercase">Paso 5 de 5</Text>
                  <H2 color="white" mt="$1">Resumen del Registro</H2>
                  <Paragraph color="rgba(255,255,255,0.7)" mt="$2">
                    Verifica que todos los datos ingresados sean correctos antes de enviarlos.
                  </Paragraph>
                </YStack>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
                  <H4 color="white">1. Datos Personales</H4>
                  <Text color="rgba(255,255,255,0.7)">Nombre: <Text color="white" fontWeight="bold">{nombre}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Email: <Text color="white" fontWeight="bold">{email}</Text></Text>
                  {rolRegistro === 'estudiante' && (
                    <Text color="rgba(255,255,255,0.7)">DNI: <Text color="white" fontWeight="bold">{dni}</Text></Text>
                  )}
                </Card>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
                  <H4 color="white">2. Ubicación</H4>
                  <Text color="rgba(255,255,255,0.7)">Distrito: <Text color="white" fontWeight="bold">{distrito}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Dirección: <Text color="white" fontWeight="bold">{direccion}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Tipo 1: <Text color="white" fontWeight="bold">{tipoUbicacion}</Text></Text>
                  {tipoUbicacion2 ? <Text color="rgba(255,255,255,0.7)">Tipo 2: <Text color="white" fontWeight="bold">{tipoUbicacion2}</Text></Text> : null}
                  {numeroCasa ? <Text color="rgba(255,255,255,0.7)">N° Casa: <Text color="white" fontWeight="bold">{numeroCasa}</Text></Text> : null}
                  {sustratoPlanta ? <Text color="rgba(255,255,255,0.7)">Sustrato: <Text color="white" fontWeight="bold">{sustratoPlanta}</Text></Text> : null}
                  {location && (
                    <View style={{ height: 100, borderRadius: 8, overflow: 'hidden', marginTop: 8 }}>
                      <MapView
                        style={{ flex: 1 }}
                        initialRegion={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                      >
                        <Marker coordinate={location} />
                      </MapView>
                    </View>
                  )}
                </Card>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
                  <H4 color="white">3. Botánica y Características</H4>
                  <Text color="rgba(255,255,255,0.7)">Nombre Común: <Text color="white" fontWeight="bold">{nombresComunes || 'No especificado'}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Nombre Científico: <Text color="white" fontWeight="bold">{nombreCientifico || 'No especificado'}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Hábito: <Text color="white" fontWeight="bold">{datosBotanicos.habito}</Text></Text>
                  <Text color="rgba(255,255,255,0.7)">Tipo de vida: <Text color="white" fontWeight="bold">{datosBotanicos.tipoVida}</Text></Text>
                  
                  {/* Renderizar TODOS los datos marcados (Opción A) */}
                  <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 10 }}>
                    <Text color="#1FC451" fontWeight="bold" mb="$2">Detalle Completo (Bloques):</Text>
                    {/* 1. Dasometría */}
                    {datosBotanicos.dasometria && Object.keys(datosBotanicos.dasometria).length > 0 && (
                      <YStack mb="$2">
                        <Text color="#1FC451" fontWeight="bold" mt="$2">I. Datos dasométricos</Text>
                        {Object.entries(datosBotanicos.dasometria).map(([k, v]) => (
                          <Text key={`daso-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                            • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{String(v)}</Text>
                          </Text>
                        ))}
                      </YStack>
                    )}

                    {/* 2. Tallo / Tronco / Estipe */}
                    {(datosBotanicos.tallo || datosBotanicos.tronco || datosBotanicos.estipe) && Object.keys(datosBotanicos.tallo || datosBotanicos.tronco || datosBotanicos.estipe || {}).length > 0 && (
                      <YStack mb="$2">
                        <Text color="#1FC451" fontWeight="bold" mt="$2">II. Tronco y corteza / Tallo</Text>
                        {Object.entries(datosBotanicos.tallo || datosBotanicos.tronco || datosBotanicos.estipe || {}).map(([k, v]) => (
                          <Text key={`tronco-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                            • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                          </Text>
                        ))}
                      </YStack>
                    )}

                    {/* 3. Exudado */}
                    {datosBotanicos.exudado && Object.keys(datosBotanicos.exudado).length > 0 && (
                      <YStack mb="$2">
                        <Text color="#1FC451" fontWeight="bold" mt="$2">III. Exudado</Text>
                        {Object.entries(datosBotanicos.exudado).map(([k, v]) => (
                          <Text key={`exu-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                            • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{String(v)}</Text>
                          </Text>
                        ))}
                      </YStack>
                    )}

                    {/* 4. Copa / Ramificación / Crecimiento / Inflorescencia */}
                    {(datosBotanicos.copa || datosBotanicos.crecimiento || datosBotanicos.inflorescencia) && Object.keys(datosBotanicos.copa || datosBotanicos.crecimiento || datosBotanicos.inflorescencia || {}).length > 0 && (
                      <YStack mb="$2">
                        <Text color="#1FC451" fontWeight="bold" mt="$2">IV. Ramificación / Copa / Crecimiento</Text>
                        {Object.entries(datosBotanicos.copa || datosBotanicos.crecimiento || datosBotanicos.inflorescencia || {}).map(([k, v]) => (
                          <Text key={`copa-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                            • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{String(v)}</Text>
                          </Text>
                        ))}
                      </YStack>
                    )}

                    {/* 5. Hojas */}
                    {datosBotanicos.hojas && Object.keys(datosBotanicos.hojas).length > 0 && (
                      <YStack mb="$2">
                        <Text color="#1FC451" fontWeight="bold" mt="$2">V. Hojas</Text>
                        {Object.entries(datosBotanicos.hojas).map(([k, v]) => (
                          <Text key={`hoja-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                            • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                          </Text>
                        ))}
                      </YStack>
                    )}

                    {/* 6. Reproductivo (Flores, Frutos, Semillas) */}
                    {datosBotanicos.reproductivo && (
                      <YStack mb="$2">
                        {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('flor_')).length > 0 && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">VI. Flores</Text>
                            {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('flor_')).map(([k, v]) => (
                               v ? <Text key={`repro-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                                • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                              </Text> : null
                            ))}
                          </YStack>
                        )}
                        {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('fruto_')).length > 0 && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">VII. Frutos</Text>
                            {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('fruto_')).map(([k, v]) => (
                               v ? <Text key={`repro-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                                • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                              </Text> : null
                            ))}
                          </YStack>
                        )}
                        {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('semilla_')).length > 0 && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">VIII. Semillas</Text>
                            {Object.entries(datosBotanicos.reproductivo).filter(([k]) => k.startsWith('semilla_')).map(([k, v]) => (
                               v ? <Text key={`repro-${k}`} color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                                • {k.replace(/_/g, ' ')}: <Text color="white" textTransform="none">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                              </Text> : null
                            ))}
                          </YStack>
                        )}
                      </YStack>
                    )}

                    {/* 7. Compartido (Fenológico, Impacto, Valor) */}
                    {datosBotanicos.compartido && (
                      <YStack mb="$2">
                        {datosBotanicos.compartido.estado_fenologico && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">IX. Estado fenológico</Text>
                            <Text color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                              • estado fenologico: <Text color="white" textTransform="none">{Array.isArray(datosBotanicos.compartido.estado_fenologico) ? datosBotanicos.compartido.estado_fenologico.join(', ') : String(datosBotanicos.compartido.estado_fenologico)}</Text>
                            </Text>
                          </YStack>
                        )}
                        {datosBotanicos.compartido.estado_individuo && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">X. Estado del individuo</Text>
                            <Text color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                              • estado individuo: <Text color="white" textTransform="none">{Array.isArray(datosBotanicos.compartido.estado_individuo) ? datosBotanicos.compartido.estado_individuo.join(', ') : String(datosBotanicos.compartido.estado_individuo)}</Text>
                            </Text>
                          </YStack>
                        )}
                        {datosBotanicos.compartido.valor_ornamental && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">XI. Valor ornamental</Text>
                            <Text color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                              • valor ornamental: <Text color="white" textTransform="none">{Array.isArray(datosBotanicos.compartido.valor_ornamental) ? datosBotanicos.compartido.valor_ornamental.join(', ') : String(datosBotanicos.compartido.valor_ornamental)}</Text>
                            </Text>
                          </YStack>
                        )}
                        {datosBotanicos.compartido.impacto_urbano && (
                          <YStack mb="$2">
                            <Text color="#1FC451" fontWeight="bold" mt="$2">XII. Impacto urbano</Text>
                            <Text color="rgba(255,255,255,0.6)" fontSize={13} textTransform="capitalize" ml="$2">
                              • impacto urbano: <Text color="white" textTransform="none">{Array.isArray(datosBotanicos.compartido.impacto_urbano) ? datosBotanicos.compartido.impacto_urbano.join(', ') : String(datosBotanicos.compartido.impacto_urbano)}</Text>
                            </Text>
                          </YStack>
                        )}
                      </YStack>
                    )}
                  </View>
                </Card>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
                  <H4 color="white">4. Fotografías (5)</H4>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <XStack gap="$2">
                      {[fotos.planta_completa, fotos.hoja, fotos.flor, fotos.fruto, fotos.semilla].map((uri, idx) => (
                        uri ? (
                          <Pressable key={idx} onPress={() => setSelectedPhoto(uri)}>
                            <Image source={{ uri }} style={{ width: 64, height: 64, borderRadius: 8 }} />
                          </Pressable>
                        ) : null
                      ))}
                    </XStack>
                  </ScrollView>
                </Card>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                  <YStack gap="$2">
                    <Button 
                      bg="#1FC451" 
                      color="white" 
                      onPress={handleFinalSubmit}
                      disabled={isSubmitting} 
                      opacity={isSubmitting ? 0.5 : 1}
                      pressStyle={{ bg: '#15963c' }}
                    >
                      {isSubmitting ? "Enviando registro..." : (editId ? "Guardar Cambios" : "Confirmar y Enviar a Revisión")}
                    </Button>
                    <Button variant="outlined" borderColor="rgba(255,255,255,0.2)" color="white" onPress={prevStep} pressStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
                      Volver a editar
                    </Button>
                  </YStack>
                </Card>
              </YStack>
            )}
            </>
            )}

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
          <View style={{ backgroundColor: '#12221A', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: '#1FC451', maxHeight: '70%', paddingBottom: Math.max(64, insets.bottom + 24) }}>
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

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#12221A', borderWidth: 1, borderColor: '#1FC451', borderRadius: 20, padding: 32, width: '100%', alignItems: 'center', gap: 16 }}>
            <MaterialCommunityIcons name={isOfflineSaved ? "cloud-off-outline" : "check-circle"} size={90} color="#1FC451" />
            <H2 mt="$2" color="#1FC451" style={{ textAlign: 'center' }}>
              {isOfflineSaved ? 'Guardado Localmente' : `¡${editId ? 'Editado' : 'Registrado'} con Éxito!`}
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

      <Modal visible={!!selectedPhoto} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 1000 }}>
            <Button 
              circular bg="rgba(255,255,255,0.2)"
              icon={<MaterialCommunityIcons name="close" size={24} color="white" />}
              onPress={() => setSelectedPhoto(null)} 
              pressStyle={{ bg: 'rgba(255,255,255,0.4)' }}
            />
          </View>
          {selectedPhoto && <Image source={{ uri: selectedPhoto }} style={{ width: '95%', height: '85%', resizeMode: 'contain' }} />}
        </View>
      </Modal>

    </SafeAreaView>
  );
}
