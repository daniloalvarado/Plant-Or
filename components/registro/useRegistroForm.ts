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
import { useModal } from '@/contexts/ModalContext';
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
import { saveRegistroOffline, persistImage, updateRegistroOffline, getRegistrosOffline, removeRegistroOffline } from '@/lib/offline-storage';
import { checkIsOffline } from '@/lib/network';
import { updateNamespacedBotanic, hydrateBotanicData, formatBotanicSubmitData, getActiveBotanicData } from '@/lib/botanicState';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LABEL_MAP: Record<string, string> = {
  'cap': 'CAP (cm)',
  'diametro_copa_paralelo': 'Diámetro de copa paralelo',
  'diametro_copa_perpendicular': 'Diámetro de copa perpendicular',
  'numero_tallos': 'Número de tallos',
  'numero_troncos': 'Número de troncos',
  'hoja_ancho': 'Ancho de hoja',
  'hoja_largo': 'Largo de hoja',
  'peciolo_largo': 'Largo de pecíolo',
  'peciolo_diametro': 'Diámetro de pecíolo',
  'longitud_peciolo': 'Longitud de pecíolo',
  'diametro_peciolo': 'Diámetro de pecíolo',
  'tipo_peciolo': 'Tipo de pecíolo',
  'peciolo_pulvino': 'Pecíolo con pulvino',
  'fruto_tamano_ancho': 'Ancho de fruto',
  'fruto_tamano_largo': 'Largo de fruto',
  'semilla_tamano_ancho': 'Ancho de semilla',
  'semilla_tamano_largo': 'Largo de semilla',
  'semilla_numero': 'Número de semillas',
  'altura_total': 'Altura total',
  'altura_inicio_copa': 'Altura inicio de copa',
  'raices_visibles': 'Raíces visibles',
  'espinas_palmera': 'Espinas de palmera',
  'inflorescencia_forma': 'Forma de inflorescencia',
  'inflorescencia_espata': 'Espata de inflorescencia',
  'inflorescencia_presencia': 'Presencia de inflorescencia',
  'inflorescencia_posicion': 'Posición de inflorescencia',
  'fruto_color_maduro': 'Color de fruto maduro',
  'fruto_presencia': 'Presencia de frutos',
  'fruto_forma': 'Forma de fruto',
  'fruto_superficie': 'Superficie de fruto',
  'fruto_tipo': 'Tipo de fruto',
  'tipo_hoja': 'Tipo de hoja',
  'forma_tronco': 'Forma de tronco',
  'corteza_externa': 'Corteza externa',
  'color_corteza': 'Color de corteza',
  'olor_corteza': 'Olor de corteza',
  'espinas_tronco': 'Espinas en tronco',
  'exudado_presencia': 'Presencia de exudado',
  'exudado_tipo': 'Tipo de exudado',
  'exudado_color': 'Color de exudado',
  'tipo_ramificacion': 'Tipo de ramificación',
  'forma_copa': 'Forma de copa',
  'densidad_copa': 'Densidad de copa',
  'disposicion_hoja': 'Disposición de hoja',
  'forma_hoja': 'Forma de hoja',
  'borde_hoja': 'Borde de hoja',
  'textura_hoja': 'Textura de hoja',
  'color_enves': 'Color del envés',
  'pelos_hoja': 'Presencia de pelos',
  'altura_inicio_ramificacion': 'Altura inicio de ramificación',
  'densidad_follaje': 'Densidad de follaje',
  'tipo_tallo': 'Tipo de tallo',
  'presencia_espinas': 'Presencia de espinas',
  'hoja_compuesta_tipo': 'Tipo de hoja compuesta',
  'longitud_visible': 'Longitud visible',
  'altura_maxima': 'Altura máxima',
  'diametro_tallo': 'Diámetro del tallo',
  'habito_crecimiento': 'Hábito de crecimiento',
  'mecanismo_trepador': 'Mecanismo trepador',
  'flor_presencia': 'Presencia de flores',
  'flor_color': 'Color de pétalos',
  'flor_tamano': 'Tamaño de flor',
  'flor_tamano_largo': 'Largo de flor',
  'flor_tamano_ancho': 'Ancho de flor',
  'flor_agrupacion': 'Agrupación de flores',
  'flor_forma': 'Forma de flor',
  'flor_olor': 'Olor de flor',
  'fruto_textura': 'Textura de fruto',
  'fruto_estado_madurar': 'Estado al madurar',
  'fruto_tamano': 'Tamaño de fruto',
  'semilla_presencia': 'Presencia de semillas',
  'semilla_tamano': 'Tamaño de semilla',
  'semilla_color': 'Color de cáscara',
  'estado_fenologico': 'Estado fenológico',
  'estado_individuo': 'Estado del individuo',
  'valor_ornamental': 'Valor ornamental',
  'impacto_urbano': 'Impacto urbano'
};

const formatLabel = (key: string) => {
  if (LABEL_MAP[key]) return LABEL_MAP[key];
  return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};


export function useRegistroForm() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const router = useRouter();
  const params = useLocalSearchParams();
  const editId = params.editId;
  const localEditId = params.localEditId as string | undefined;
  const { showModal } = useModal();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasPausedDraft, setHasPausedDraft] = useState(false);

  useEffect(() => {
    if (params.step) {
      setStep(parseInt(params.step as string));
    }
  }, [params.step]);

  const restoreDraftFromStorage = async () => {
    try {
      const draftStr = await AsyncStorage.getItem('registro_borrador');
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.step) setStep(draft.step);
        if (draft.nombre) setNombre(draft.nombre);
        if (draft.dni) setDni(draft.dni);
        if (draft.email) setEmail(draft.email);
        if (draft.curso) setCurso(draft.curso);
        if (draft.facultad) setFacultad(draft.facultad);
        if (draft.escuela) setEscuela(draft.escuela);
        if (draft.diaClase) setDiaClase(draft.diaClase);
        if (draft.rolRegistro) setRolRegistro(draft.rolRegistro);
        if (draft.nombreCientifico) setNombreCientifico(draft.nombreCientifico);
        if (draft.nombresComunes) setNombresComunes(draft.nombresComunes);
        if (draft.familia) setFamilia(draft.familia);
        if (draft.location) setLocation(draft.location);
        if (draft.distrito) setDistrito(draft.distrito);
        if (draft.direccion) setDireccion(draft.direccion);
        if (draft.tipoUbicacion) setTipoUbicacion(draft.tipoUbicacion);
        if (draft.tipoUbicacion2) setTipoUbicacion2(draft.tipoUbicacion2);
        if (draft.numeroCasa) setNumeroCasa(draft.numeroCasa);
        if (draft.sustratoPlanta) setSustratoPlanta(draft.sustratoPlanta);
        if (draft.datosBotanicos) setDatosBotanicos(draft.datosBotanicos);
      }
    } catch (e) {
      console.log('Error loading draft', e);
    }
  };

  useEffect(() => {
    if (editId || localEditId) return;
    restoreDraftFromStorage();
  }, []);

  useEffect(() => {
    if (localEditId) {
      setIsLoadingEdit(true);
      getRegistrosOffline().then(registros => {
        const reg = registros.find(r => r.id === localEditId);
        if (reg) {
          const { data, photos } = reg;
          setNombre(data.registrador_nombre || '');
          setDni(data.registrador_dni || '');
          setEmail(data.registrador_email || '');
          setCurso(data.registrador_curso || '');
          setFacultad(data.registrador_facultad || '');
          setEscuela(data.registrador_escuela || '');
          setDiaClase(data.registrador_dia_clase || '');

          setNombreCientifico(data.nombre_cientifico || '');
          setNombresComunes(data.nombres_comunes || '');
          setOrigen(data.origen || '');
          setPaisOrigen(data.pais_origen || '');
          setFamilia(data.familia || '');
          setEstadoRevision(data.estado_revision || '');

          if (data.latitud && data.longitud) setLocation({ latitude: data.latitud, longitude: data.longitud });
          setDistrito(data.distrito || '');
          setDireccion(data.direccion || '');
          setTipoUbicacion(data.tipo_ubicacion_1 || '');
          setTipoUbicacion2(data.tipo_ubicacion_2 || '');
          setNumeroCasa(data.numero_casa || '');
          setSustratoPlanta(data.ubicacion_planta || '');

          const h = data.habito;
          const source = data.arbol_datos || data.arbusto_datos || data.liana_datos || data.hierba_datos || data.palmera_datos || {};

          setDatosBotanicos(hydrateBotanicData(data));


          setFotos({
            planta_completa: photos.planta_completa || null,
            hoja: photos.hoja || null,
            flor: photos.flor || null,
            fruto: photos.fruto || null,
            semilla: photos.semilla || null,
          });
          if (photos.extras) setFotosExtra(photos.extras);
        }
        setIsLoadingEdit(false);
      });
    }
  }, [localEditId]);
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
  const [origen, setOrigen] = useState('');
  const [paisOrigen, setPaisOrigen] = useState('');
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

  const scrollToField = (id: string) => {
    const el = fieldRefs.current[id];
    if (el && scrollViewRef.current) {
      const sv = scrollViewRef.current;
      const scrollNode = (sv as any).getInnerViewNode ? (sv as any).getInnerViewNode() : findNodeHandle(sv);
      const elNode = findNodeHandle(el);

      if (elNode && scrollNode) {
        UIManager.measureLayout(
          elNode,
          scrollNode,
          () => console.log('Failed to measure layout'),
          (x: number, y: number) => {
            sv.scrollTo({ y: Math.max(0, y - 80), animated: true });
          }
        );
      }
    }
    setShowMissingModal(false);
  };

  const checkStep3Valid = () => {
    // Primero: campos de identificación botánica (inicio del bloque 3)
    const identMissing: { id: string; label: string }[] = [];
    if (!nombresComunes.trim()) identMissing.push({ id: 'nombresComunes', label: 'Nombre local / común' });
    if (!nombreCientifico.trim()) identMissing.push({ id: 'nombreCientifico', label: 'Nombre científico' });
    if (!origen.trim()) identMissing.push({ id: 'origen', label: 'Origen' });
    if (origen === 'Introducida' && !paisOrigen.trim()) identMissing.push({ id: 'paisOrigen', label: 'País de origen' });
    if (!familia.trim()) identMissing.push({ id: 'familia', label: 'Familia botánica' });
    if (!datosBotanicos.habito) identMissing.push({ id: 'habito', label: 'Hábito de la planta' });
    if (!datosBotanicos.tipoVida) identMissing.push({ id: 'tipoVida', label: 'Tipo de vida' });

    // Luego: campos dasométricos, tronco, hojas, reproductivos, estado e impacto
    const activeData = getActiveBotanicData(datosBotanicos);
    const botanicMissing = getMissingSections(activeData.habito, activeData);

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
    'semilla_numero',
    'hoja_largo', 'hoja_ancho', 'peciolo_largo', 'peciolo_diametro',
    'altura_inicio_ramificacion', 'longitud_visible', 'altura_maxima', 'diametro_tallo',
    'cobertura'
  ];

  const updateBotanic = useCallback((sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {
    setDatosBotanicos((prev: any) => updateNamespacedBotanic(prev, sectionOrKey, fieldOrValue, nestedValue, numericFields));
  }, []);

  const cleanupBotanicData = () => {
    setDatosBotanicos((prev: any) => {
      const allowedSections: Record<string, string[]> = {
        'Árbol': ['habito', 'tipoVida', 'dasometria', 'tronco', 'exudado', 'copa', 'hojas', 'reproductivo', 'compartido'],
        'Palmera': ['habito', 'tipoVida', 'dasometria', 'general', 'tallo', 'hojas', 'espinas', 'inflorescencia', 'reproductivo', 'compartido'],
        'Arbusto': ['habito', 'tipoVida', 'dasometria', 'tallo', 'hojas', 'reproductivo', 'compartido'],
        'Liana': ['habito', 'tipoVida', 'dasometria', 'crecimiento', 'hojas', 'reproductivo', 'compartido'],
        'Hierba': ['habito', 'tipoVida', 'dasometria', 'hojas', 'reproductivo', 'compartido']
      };

      const allowed = allowedSections[prev.habito] || ['habito', 'tipoVida'];
      const cleaned: any = {};

      for (const key of Object.keys(prev)) {
        if (allowed.includes(key)) {
          cleaned[key] = prev[key];
        }
      }
      return cleaned;
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
    const checkDraftAndLoad = async () => {
      if (editId) {
        try {
          const draftStr = await AsyncStorage.getItem('registro_borrador');
          if (draftStr) {
            const draft = JSON.parse(draftStr);
            if (draft.step > 1 || draft.nombresComunes || (draft.datosBotanicos && draft.datosBotanicos.habito)) {
              setHasPausedDraft(true);
            } else {
              setHasPausedDraft(false);
            }
          } else {
            setHasPausedDraft(false);
          }
        } catch (e) {
          setHasPausedDraft(false);
        }
        loadExistingData(editId as string);
      } else {
        setHasPausedDraft(false);
      }
    };
    checkDraftAndLoad();
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

        setDatosBotanicos(hydrateBotanicData(doc));

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

  const saveDraft = async (targetStep?: number) => {
    if (editId || localEditId) return;
    try {
      const draft = {
        step: targetStep !== undefined ? targetStep : step,
        nombre, dni, email, curso, facultad, escuela, diaClase, rolRegistro,
        nombreCientifico, nombresComunes, familia,
        location, distrito, direccion, tipoUbicacion, tipoUbicacion2, numeroCasa, sustratoPlanta,
        datosBotanicos
      };
      await AsyncStorage.setItem('registro_borrador', JSON.stringify(draft));
    } catch (e) {
      console.log('Error saving draft', e);
    }
  };

  useEffect(() => {
    if (editId || localEditId) return;
    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [
    step, nombre, dni, email, curso, facultad, escuela, diaClase, rolRegistro,
    nombreCientifico, nombresComunes, familia, location, distrito, direccion,
    tipoUbicacion, tipoUbicacion2, numeroCasa, sustratoPlanta, datosBotanicos
  ]);

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
      await saveDraft(4);
      setStep(4);
    } else {
      await saveDraft(step + 1);
      setStep(step + 1);
    }
  };

  const prevStep = async () => {
    if (step === 4 && rolRegistro === 'ciudadano') {
      await saveDraft(2);
      setStep(2);
    } else {
      await saveDraft(step - 1);
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
      showModal({
        type: "dialog",
        title: "Atención",
        description: "Falta configurar EXPO_PUBLIC_SANITY_TOKEN en el archivo .env"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const isOffline = await checkIsOffline();

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
          if (['altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_copa', 'numero_troncos', 'longitud_peciolo', 'diametro_peciolo', 'longitud_visible', 'cobertura', 'semilla_numero', 'altura_inicio_ramificacion', 'altura_maxima', 'diametro_tallo', 'hoja_largo', 'hoja_ancho', 'peciolo_largo', 'peciolo_diametro'].includes(key)) {
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
        origen: origen || '',
        pais_origen: origen === 'Introducida' ? paisOrigen : '',
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
      };

      // Formateo centralizado usando el nuevo helper de Namespacing
      const formattedSubmitData = formatBotanicSubmitData(datosBotanicos);
      nuevoRegistro.reproductivo = formattedSubmitData.reproductivo;
      nuevoRegistro.estado_fenologico = formattedSubmitData.compartido.estado_fenologico;
      nuevoRegistro.estado_individuo = formattedSubmitData.compartido.estado_individuo;
      nuevoRegistro.valor_ornamental = formattedSubmitData.compartido.valor_ornamental;
      nuevoRegistro.impacto_urbano = formattedSubmitData.compartido.impacto_urbano;

      Object.assign(nuevoRegistro, formattedSubmitData.specificData);

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

        const offlineReg = {
          id: localEditId || (Math.random().toString(36).substring(7) + Date.now().toString()),
          timestamp: Date.now(),
          data: nuevoRegistro,
          photos: {
            planta_completa: localPlanta || (localEditId ? fotos.planta_completa : null),
            hoja: localHoja || (localEditId ? fotos.hoja : null),
            flor: localFlor || (localEditId ? fotos.flor : null),
            fruto: localFruto || (localEditId ? fotos.fruto : null),
            semilla: localSemilla || (localEditId ? fotos.semilla : null),
            extras: localExtras.length > 0 ? localExtras : (localEditId ? fotosExtra : [])
          },
          status: 'pending' as const
        };

        if (localEditId) {
          await updateRegistroOffline(offlineReg);
        } else {
          await saveRegistroOffline(offlineReg);
        }

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

        if (localEditId) {
          await removeRegistroOffline(localEditId);
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
      showModal({
        type: "dialog",
        title: "Error",
        description: "Hubo un error al enviar el registro. Intenta de nuevo."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = (keepDraft: boolean = false) => {
    if (!keepDraft) {
      AsyncStorage.removeItem('registro_borrador');
    }
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
    setDistrito('');
    setDireccion('');
    setNumeroCasa('');
    setTipoUbicacion('');
    setTipoUbicacion2('');
    setSustratoPlanta('');
    setNombresComunes('');
    setNombreCientifico('');
    setOrigen('');
    setPaisOrigen('');
    setFamilia('');
    setFotos({ planta_completa: null, hoja: null, flor: null, fruto: null, semilla: null });
    setFotosExtra([]);
    setDatosBotanicos({ habito: '', tipoVida: '' });

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, 100);
  };

  const resetFormAndGoHome = () => {
    const wasOffline = isOfflineSaved;
    resetFormState();
    if (wasOffline) {
      router.navigate('/sync');
    } else {
      router.navigate('/');
    }
  };

  const cancelEdit = () => {
    router.setParams({ editId: undefined });
    resetFormState();
  };

  const resumeDraft = async () => {
    router.setParams({ editId: undefined });
    resetFormState(true); // Clear UI but keep the draft in memory
    await restoreDraftFromStorage(); // Load the draft into UI
    setHasPausedDraft(false);
  };

  const isStudentByMetadata = !!(effectiveUser?.unsafeMetadata?.dni || effectiveUser?.unsafeMetadata?.facultad || effectiveUser?.unsafeMetadata?.escuela);
  const derivedRole = effectiveUser?.unsafeMetadata?.role || (isStudentByMetadata ? 'estudiante' : (numeroPlantaAutogenerado > 0 ? 'ciudadano' : null));


  return {
    formatLabel,
    step,
    setStep,
    showSuccess,
    setShowSuccess,
    hasPausedDraft,
    setHasPausedDraft,
    isOfflineSaved,
    setIsOfflineSaved,
    isSubmitting,
    setIsSubmitting,
    isLoadingEdit,
    setIsLoadingEdit,
    rolRegistro,
    setRolRegistro,
    offlineUserCache,
    setOfflineUserCache,
    nombre,
    setNombre,
    dni,
    setDni,
    email,
    setEmail,
    curso,
    setCurso,
    facultad,
    setFacultad,
    escuela,
    setEscuela,
    diaClase,
    setDiaClase,
    nombreCientifico,
    setNombreCientifico,
    nombresComunes,
    setNombresComunes,
    familia,
    setFamilia,
    origen,
    setOrigen,
    paisOrigen,
    setPaisOrigen,
    estadoRevision,
    setEstadoRevision,
    motivoObservacion,
    setMotivoObservacion,
    location,
    setLocation,
    distrito,
    setDistrito,
    direccion,
    setDireccion,
    tipoUbicacion,
    setTipoUbicacion,
    tipoUbicacion2,
    setTipoUbicacion2,
    numeroCasa,
    setNumeroCasa,
    sustratoPlanta,
    setSustratoPlanta,
    errorMsg,
    setErrorMsg,
    numeroPlantaAutogenerado,
    setNumeroPlantaAutogenerado,
    fotos,
    setFotos,
    fotosExtra,
    setFotosExtra,
    datosBotanicos,
    setDatosBotanicos,
    missingSections,
    setMissingSections,
    showHelperButton,
    setShowHelperButton,
    showMissingModal,
    setShowMissingModal,
    showStep3Error,
    setShowStep3Error,
    selectedPhoto,
    setSelectedPhoto,
    restoreDraftFromStorage,
    scrollToField,
    checkStep3Valid,
    handleContinuarBloque3,
    updateBotanic,
    cleanupBotanicData,
    fetchLocation,
    loadExistingData,
    takePhoto,
    pickFromGallery,
    takeExtraPhoto,
    pickExtraFromGallery,
    removeExtraPhoto,
    saveDraft,
    nextStep,
    prevStep,
    isValidSelector,
    handleFinalSubmit,
    resetFormState,
    resetFormAndGoHome,
    cancelEdit,
    resumeDraft,
    insets,
    user,
    router,
    params,
    editId,
    localEditId,
    showModal,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    isStep4Valid,
    effectiveUser,
    derivedRole,
    isStudentByMetadata,
    fieldRefs,
    scrollViewRef,
    registerFieldRef
  };
}
