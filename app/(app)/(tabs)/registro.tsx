import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { Modal } from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { client, urlFor } from '@/lib/sanity';
import * as Network from 'expo-network';
import { saveRegistroOffline, persistImage } from '@/lib/offline-storage';

export default function RegistroScreen() {
  const { user } = useUser();
  const router = useRouter();
  const { editId } = useLocalSearchParams();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [rolRegistro, setRolRegistro] = useState<'estudiante' | 'ciudadano'>('estudiante');

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

  const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {
    setDatosBotanicos((prev: any) => {
      if (nestedValue !== undefined) {
        // Es una actualización anidada: section, field, value
        return {
          ...prev,
          [sectionOrKey]: {
            ...(prev[sectionOrKey] || {}),
            [fieldOrValue]: nestedValue
          }
        };
      }
      // Actualización directa: key, value
      return { ...prev, [sectionOrKey]: fieldOrValue };
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
        setTipoUbicacion(doc.tipo_ubicacion_1 || '');
        setTipoUbicacion2(doc.tipo_ubicacion_2 || '');
        setNumeroCasa(doc.numero_casa || '');
        setSustratoPlanta(doc.ubicacion_planta || '');
        if (doc.numero_planta) setNumeroPlantaAutogenerado(Number(doc.numero_planta));

        setDatosBotanicos({
          habito: doc.habito || '',
          tipoVida: doc.tipo_vida || '',
          compartido: {
            estado_fenologico: doc.estado_fenologico,
            estado_individuo: doc.estado_individuo,
            valor_ornamental: doc.valor_ornamental,
            impacto_urbano: doc.impacto_urbano,
            ...doc.reproductivo
          },
          // Map back the flattened data based on habit
          ...(doc.habito === 'Árbol' && {
            dasometria: { altura_total: doc.arbol_datos?.altura_total, cap: doc.arbol_datos?.cap, raices_visibles: doc.arbol_datos?.raices_visibles },
            tronco: { forma: doc.arbol_datos?.forma_tronco, color_corteza: doc.arbol_datos?.color_corteza, lenticelas: doc.arbol_datos?.lenticelas, corteza_externa: doc.arbol_datos?.corteza_externa },
            exudado: { presencia: doc.arbol_datos?.exudado_presencia, tipo: doc.arbol_datos?.exudado_tipo, color: doc.arbol_datos?.exudado_color },
            hojas: { tipo: doc.arbol_datos?.tipo_hoja }
          }),
          ...(doc.habito === 'Palmera' && {
            dasometria: { altura_total: doc.palmera_datos?.altura_total, cap: doc.palmera_datos?.cap, numero_tallos: doc.palmera_datos?.numero_tallos, raices_visibles: doc.palmera_datos?.raices_visibles },
            general: { tipo: doc.palmera_datos?.tipo_palmera },
            tallo: { caracteristicas: doc.palmera_datos?.tallo },
            hojas: { tipo: doc.palmera_datos?.tipo_hoja, segmentos: doc.palmera_datos?.segmentos_hoja }
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
    setStep(step + 1);
  };
  
  const prevStep = () => setStep(step - 1);

  // Validaciones estrictas
  const isStep1Valid = rolRegistro === 'estudiante' 
    ? (nombre.trim() !== '' && dni.length === 8 && email.trim() !== '' && facultad.trim() !== '' && escuela.trim() !== '')
    : (nombre.trim() !== '' && email.trim() !== ''); // Ciudadano solo necesita nombre y email
  const isStep2Valid = location !== null && distrito.trim() !== '' && direccion.trim() !== '' && tipoUbicacion.trim() !== '' && sustratoPlanta.trim() !== '';
  const isStep3Valid = fotos.planta_completa && fotos.hoja && fotos.flor && fotos.fruto && fotos.semilla;

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
        autor: user?.id,
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
        tipo_ubicacion_1: tipoUbicacion,
        tipo_ubicacion_2: tipoUbicacion2,
        numero_casa: numeroCasa,
        ubicacion_planta: sustratoPlanta,
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
          ...datosBotanicos.tronco,
          exudado_presencia: datosBotanicos.exudado?.presencia,
          exudado_tipo:      datosBotanicos.exudado?.tipo,
          exudado_color:     datosBotanicos.exudado?.color,
          ...datosBotanicos.copa,
          ...datosBotanicos.hojas,
        });
      }

      if (datosBotanicos.habito === 'Palmera') {
        nuevoRegistro.palmera_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          tipo_palmera:    datosBotanicos.general?.tipo,
          tallo:           datosBotanicos.tallo?.caracteristicas,
          ...datosBotanicos.hojas,
          ...datosBotanicos.espinas,
          ...datosBotanicos.inflorescencia,
        });
      }

      if (datosBotanicos.habito === 'Arbusto') {
        nuevoRegistro.arbusto_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.tallo,
          ...datosBotanicos.hojas,
        });
      }

      if (datosBotanicos.habito === 'Liana') {
        nuevoRegistro.liana_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.crecimiento,
          ...datosBotanicos.hojas,
        });
      }

      if (datosBotanicos.habito === 'Hierba') {
        nuevoRegistro.hierba_datos = parseNumbers({
          ...datosBotanicos.dasometria,
          ...datosBotanicos.crecimiento,
          ...datosBotanicos.hojas,
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

  const resetFormAndGoHome = () => {
    setShowSuccess(false);
    setIsOfflineSaved(false);
    setStep(1);
    setEstadoRevision('');
    setMotivoObservacion('');
    setNombre(user?.fullName || '');
    setDni((user?.unsafeMetadata?.dni as string) || '');
    setCurso((user?.unsafeMetadata?.curso as string) || '');
    setFacultad((user?.unsafeMetadata?.facultad as string) || '');
    setEscuela((user?.unsafeMetadata?.escuela as string) || '');
    setDiaClase((user?.unsafeMetadata?.dia_clase as string) || '');
    setLocation(null);
    setFotos({ planta_completa: null, hoja: null, flor: null, fruto: null, semilla: null });
    setFotosExtra([]);
    setDatosBotanicos({ habito: '', tipoVida: '' });
    router.replace('/');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#08130D' }} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
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
                <Paragraph color="white">{motivoObservacion}</Paragraph>
              </Card>
            ) : null}

            {step === 1 && (
              <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                <H4 color="#1FC451" mb="$2">Bloque 1: Datos Personales</H4>
                <YStack gap="$4">
                  <YStack gap="$2" mb="$4">
                    <Label color="#ffffff">¿Cómo estás registrando esta planta?</Label>
                    {user?.unsafeMetadata?.role ? (
                      <Card backgroundColor="rgba(31, 196, 81, 0.1)" borderColor="rgba(31, 196, 81, 0.3)" borderWidth={1} padding="$3">
                        <XStack gap="$2" style={{ alignItems: "center" }}>
                          <MaterialCommunityIcons name="check-circle" size={20} color="#1FC451" />
                          <Text color="#ffffff" fontWeight="bold">Rol fijado: {user.unsafeMetadata.role === 'estudiante' ? 'Estudiante' : 'Ciudadano'}</Text>
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
                    {!editId && !user?.unsafeMetadata?.role && (
                      <Paragraph color="#FFA500" size="$2" mt="$1">
                        ⚠️ Al enviar tu primera planta, tu rol quedará fijado de forma permanente.
                      </Paragraph>
                    )}
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">Nombre completo *</Label>
                    {/* Email is always required */}
                    <Input
                      value={nombre}
                      onChangeText={setNombre}
                      placeholder="Ej. Juan Pérez"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">Email *</Label>
                    <Input
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Ej. juan@gmail.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                  </YStack>

                  {rolRegistro === 'estudiante' && (
                    <>
                      <YStack gap="$2">
                        <Label color="#ffffff">DNI *</Label>
                        <Input
                          value={dni}
                          onChangeText={(text) => setDni(text.replace(/[^0-9]/g, ''))} // Solo permite números
                          maxLength={8}
                          keyboardType="numeric"
                          placeholder="Ej: 71234567"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff">Facultad *</Label>
                        <Input
                          value={facultad}
                          onChangeText={setFacultad}
                          placeholder="Ej. Ciencias Forestales"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff">Escuela *</Label>
                        <Input
                          value={escuela}
                          onChangeText={setEscuela}
                          placeholder="Ej. Ingeniería Forestal"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff">Curso</Label>
                        <Input
                          value={curso}
                          onChangeText={setCurso}
                          placeholder="Ej. Botánica"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                      </YStack>

                      <YStack gap="$2">
                        <Label color="#ffffff">Día de clase</Label>
                        <Input
                          value={diaClase}
                          onChangeText={setDiaClase}
                          placeholder="Ej. Lunes"
                          borderWidth={0}
                          bg="rgba(255,255,255,0.05)"
                          color="#ffffff"
                          placeholderTextColor="rgba(255,255,255,0.3)"
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
                    <Label color="#ffffff">Distrito</Label>
                    <Input
                      size="$3"
                      value={distrito}
                      onChangeText={setDistrito}
                      placeholder="Ej. Iquitos, San Juan Bautista, Punchana..."
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">Dirección / Referencia</Label>
                    <Input
                      size="$3"
                      value={direccion}
                      onChangeText={setDireccion}
                      placeholder="Ej. Malecón Tarapacá, Calle Próspero..."
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                  </YStack>

                  <XStack gap="$3">
                    <YStack flex={1} gap="$2">
                      <Label color="#ffffff">Tipo de ubicación 1</Label>
                      <RadioSelect 
                        options={['Jirón', 'Avenida', 'Calle', 'Pasaje', 'Parque']}
                        value={tipoUbicacion}
                        onChange={setTipoUbicacion}
                      />
                    </YStack>
                    <YStack flex={1} gap="$2">
                      <Label color="#ffffff">Tipo de ubicación 2</Label>
                      <RadioSelect 
                        options={['Vereda', 'Berma central']}
                        value={tipoUbicacion2}
                        onChange={setTipoUbicacion2}
                      />
                    </YStack>
                  </XStack>

                  <XStack gap="$3">
                    <YStack flex={1} gap="$2">
                      <Label color="#ffffff">N° de Casa</Label>
                      <Input
                        size="$3"
                        value={numeroCasa}
                        onChangeText={setNumeroCasa}
                        placeholder="Ej. 123 o S/N"
                        borderWidth={0}
                        bg="rgba(255,255,255,0.05)"
                        color="#ffffff"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                      />
                    </YStack>
                    <YStack flex={1} gap="$2">
                      <Label color="#ffffff">Sustrato / Ubicación</Label>
                      <RadioSelect 
                        options={['Tierra', 'Macetero']}
                        value={sustratoPlanta}
                        onChange={setSustratoPlanta}
                      />
                    </YStack>
                  </XStack>

                  <Spacer size="$2" />
                  
                  <YStack gap="$2">
                    <Button bg="#1FC451" color="white" onPress={nextStep} disabled={!isStep2Valid} opacity={!isStep2Valid ? 0.5 : 1} pressStyle={{ bg: '#15963c' }}>
                      Confirmar y Continuar
                    </Button>
                    <Button variant="outlined" borderColor="rgba(255,255,255,0.2)" color="white" onPress={prevStep} pressStyle={{ bg: 'rgba(255,255,255,0.05)' }}>
                      Volver
                    </Button>
                  </YStack>
                </YStack>
              </Card>
            )}

            {step === 3 && (
              <Card padding="$4" gap="$2" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                <H4 color="#1FC451" mb="$2">Bloque 3: Fotografías</H4>
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
                            <Image source={{ uri }} style={{ width: 56, height: 56, borderRadius: 8 }} />
                          ) : (
                            <View style={{ width: 56, height: 56, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
                              <MaterialCommunityIcons name="image-outline" size={28} color="rgba(255,255,255,0.3)" />
                            </View>
                          )}
                          <YStack flex={1}>
                            <Label color="#ffffff">{item.label}</Label>
                            {uri
                              ? <Paragraph color="#1FC451" size="$1">✓ Capturada</Paragraph>
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
                          <Image source={{ uri }} style={{ width: 56, height: 56, borderRadius: 8 }} />
                          <YStack flex={1}>
                            <Label color="#ffffff">Foto Extra {idx + 1}</Label>
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
                       <Button flex={1} size="$3" bg="rgba(255,255,255,0.08)" color="white" icon={<MaterialCommunityIcons name="camera-plus" size={16} color="white" />} onPress={takeExtraPhoto}>
                         Cámara Extra
                       </Button>
                       <Button flex={1} size="$3" bg="rgba(255,255,255,0.08)" color="white" icon={<MaterialCommunityIcons name="image-plus" size={16} color="white" />} onPress={pickExtraFromGallery}>
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
                        onPress={handleFinalSubmit} 
                        disabled={!isStep3Valid || isSubmitting}
                        opacity={(!isStep3Valid || isSubmitting) ? 0.5 : 1}
                        pressStyle={{ bg: '#15963c' }}
                      >
                        {isSubmitting ? "Enviando fotos..." : (editId ? "Guardar Cambios" : "Finalizar (Ciudadano)")}
                      </Button>
                    ) : (
                      <Button 
                        bg="#1FC451" 
                        color="white" 
                        onPress={nextStep} 
                        disabled={!isStep3Valid}
                        opacity={!isStep3Valid ? 0.5 : 1}
                        pressStyle={{ bg: '#15963c' }}
                      >
                        Siguiente: Clasificación
                      </Button>
                    )}
                    
                    {!isStep3Valid && (
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

            {step === 4 && (
              <YStack gap="$4">
                <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                  <H4 color="#1FC451">Bloque 4: Identificación y Hábito</H4>
                  
                  <YStack gap="$2" style={{ backgroundColor: "rgba(31, 196, 81, 0.1)", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#1FC451" }}>
                    <Label color="#1FC451">Número de planta del estudiante</Label>
                    <Text color="#ffffff" fontSize={16} fontWeight="bold">Planta N° {numeroPlantaAutogenerado + 1} de 20</Text>
                  </YStack>

                  {/* Identificación botánica */}
                  <YStack gap="$2">
                    <Label color="#ffffff">Nombre local / común</Label>
                    <Input
                      value={nombresComunes}
                      onChangeText={setNombresComunes}
                      placeholder="Ej. Platanillo, Bijao rojo"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">Nombre científico</Label>
                    <Input
                      value={nombreCientifico}
                      onChangeText={setNombreCientifico}
                      placeholder="Ej. Heliconia rostrata"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      autoCapitalize="words"
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">Familia botánica</Label>
                    <Input
                      value={familia}
                      onChangeText={setFamilia}
                      placeholder="Ej. Heliconiaceae"
                      borderWidth={0}
                      bg="rgba(255,255,255,0.05)"
                      color="#ffffff"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      autoCapitalize="words"
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">1. Hábito de la planta *</Label>
                    <RadioSelect 
                      options={['Árbol', 'Palmera', 'Arbusto', 'Liana', 'Hierba']}
                      value={datosBotanicos.habito}
                      onChange={(val) => updateBotanic('habito', val)}
                    />
                  </YStack>

                  <YStack gap="$2">
                    <Label color="#ffffff">2. Tipo de vida *</Label>
                    <RadioSelect 
                      options={['Terrestre', 'Epífita', 'Parásita']}
                      value={datosBotanicos.tipoVida}
                      onChange={(val) => updateBotanic('tipoVida', val)}
                    />
                  </YStack>
                </Card>

                {datosBotanicos.habito === 'Árbol' && (
                  <FormArbol data={datosBotanicos} updateData={updateBotanic} />
                )}
                {datosBotanicos.habito === 'Palmera' && (
                  <FormPalmera data={datosBotanicos} updateData={updateBotanic} />
                )}
                {datosBotanicos.habito === 'Arbusto' && (
                  <FormArbusto data={datosBotanicos} updateData={updateBotanic} />
                )}
                {datosBotanicos.habito === 'Liana' && (
                  <FormLiana data={datosBotanicos} updateData={updateBotanic} />
                )}
                {datosBotanicos.habito === 'Hierba' && (
                  <FormHierba data={datosBotanicos} updateData={updateBotanic} />
                )}

                {/* Variables compartidas por todas las plantas (solo se muestra si se eligió un hábito) */}
                {datosBotanicos.habito !== '' && (
                  <FormCompartido data={datosBotanicos} updateData={updateBotanic} />
                )}
                
                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
                  <YStack gap="$2">
                    <Button 
                      bg="#1FC451" 
                      color="white" 
                      onPress={nextStep}
                      disabled={!datosBotanicos.habito || !datosBotanicos.tipoVida} 
                      opacity={(!datosBotanicos.habito || !datosBotanicos.tipoVida) ? 0.5 : 1}
                      pressStyle={{ bg: '#15963c' }}
                    >
                      Continuar al Resumen
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
                    
                    {/* Dasometría (si existe) */}
                    {datosBotanicos.dasometria && Object.entries(datosBotanicos.dasometria).map(([k, v]) => (
                      <Text key={`daso-${k}`} color="rgba(255,255,255,0.6)" fontSize={13}>
                        • {k.replace(/_/g, ' ')}: <Text color="white">{String(v)}</Text>
                      </Text>
                    ))}
                    
                    {/* Compartido (Fenológico, Impacto, Valor, Reproductivo) */}
                    {datosBotanicos.compartido && Object.entries(datosBotanicos.compartido).map(([k, v]) => {
                      if (!v || (Array.isArray(v) && v.length === 0)) return null;
                      return (
                        <Text key={`comp-${k}`} color="rgba(255,255,255,0.6)" fontSize={13}>
                          • {k.replace(/_/g, ' ')}: <Text color="white">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                        </Text>
                      );
                    })}

                    {/* Hojas */}
                    {datosBotanicos.hojas && Object.entries(datosBotanicos.hojas).map(([k, v]) => (
                      <Text key={`hoja-${k}`} color="rgba(255,255,255,0.6)" fontSize={13}>
                        • hojas ({k.replace(/_/g, ' ')}): <Text color="white">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                      </Text>
                    ))}
                    
                    {/* Tallo / Tronco */}
                    {(datosBotanicos.tallo || datosBotanicos.tronco) && Object.entries(datosBotanicos.tallo || datosBotanicos.tronco).map(([k, v]) => (
                      <Text key={`tronco-${k}`} color="rgba(255,255,255,0.6)" fontSize={13}>
                        • tronco/tallo ({k.replace(/_/g, ' ')}): <Text color="white">{Array.isArray(v) ? v.join(', ') : String(v)}</Text>
                      </Text>
                    ))}

                    {/* Exudado */}
                    {datosBotanicos.exudado && Object.entries(datosBotanicos.exudado).map(([k, v]) => (
                      <Text key={`exu-${k}`} color="rgba(255,255,255,0.6)" fontSize={13}>
                        • exudado ({k.replace(/_/g, ' ')}): <Text color="white">{String(v)}</Text>
                      </Text>
                    ))}
                  </View>
                </Card>

                <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
                  <H4 color="white">4. Fotografías (5)</H4>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <XStack gap="$2">
                      {[fotos.planta_completa, fotos.hoja, fotos.flor, fotos.fruto, fotos.semilla].map((uri, idx) => (
                        uri ? <Image key={idx} source={{ uri }} style={{ width: 64, height: 64, borderRadius: 8 }} /> : null
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

      {/* Modal de Éxito */}
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

    </SafeAreaView>
  );
}
