import React from 'react';
import { View, Image, Pressable, ScrollView } from 'react-native';
import { Text, YStack, XStack, H4, Card, Button, Paragraph, H2 } from 'tamagui';
import MapView, { Marker } from 'react-native-maps';
import { getActiveBotanicData } from '@/lib/botanicState';

const ARBOL_SCHEMA = [
  { title: 'I. Datos dasométricos', dataObj: 'dasometria', keys: [ { key: 'altura_total', label: 'Altura total aproximada', unit: 'm' }, { key: 'cap', label: 'Circunferencia a la altura del pecho (CAP)', unit: 'cm' }, { key: 'diametro_copa_paralelo', label: 'Diámetro de copa paralelo a la calle', unit: 'm' }, { key: 'diametro_copa_perpendicular', label: 'Diámetro de copa perpendicular a la calle', unit: 'm' }, { key: 'altura_inicio_copa', label: 'Altura de inicio de copa', unit: 'm' }, { key: 'raices_visibles', label: 'Raíces visibles' } ] },
  { title: 'II. Tronco y corteza', dataObj: 'tronco', keys: [ { key: 'numero_troncos', label: 'Número de troncos desde la base' }, { key: 'forma', label: 'Forma del tronco' }, { key: 'corteza_externa', label: 'Corteza externa' }, { key: 'lenticelas', label: 'Lenticelas' }, { key: 'color_corteza', label: 'Color de corteza' }, { key: 'olor_corteza', label: 'Olor de corteza' }, { key: 'espinas_tronco', label: 'Espinas' } ] },
  { title: 'III. Exudado', dataObj: 'exudado', keys: [ { key: 'presencia', label: 'Presencia' }, { key: 'tipo', label: 'Tipo' }, { key: 'color', label: 'Color al corte' } ] },
  { title: 'IV. Ramificación y copa', dataObj: 'copa', keys: [ { key: 'tipo_ramificacion', label: 'Tipo de ramificación' }, { key: 'forma_copa', label: 'Forma de copa' }, { key: 'densidad_copa', label: 'Densidad de copa' } ] },
  { title: 'V. Hojas', dataObj: 'hojas', keys: [ { key: 'tipo_hoja', label: 'Tipo de hoja' }, { key: 'disposicion_hoja', label: 'Disposición' }, { key: 'forma_hoja', label: 'Forma' }, { key: 'borde_hoja', label: 'Borde' }, { key: 'textura_hoja', label: 'Textura' }, { key: 'color_enves', label: 'Color del envés' }, { key: 'pelos_hoja', label: 'Presencia de pelos' }, { key: 'tipo_peciolo', label: 'Tipo de peciolo' }, { key: 'longitud_peciolo', label: 'Longitud del peciolo', unit: 'cm' }, { key: 'diametro_peciolo', label: 'Diámetro del peciolo', unit: 'mm' }, { key: 'peciolo_pulvino', label: 'Peciolo con pulvino' } ] },
  { title: 'VI. Flores', dataObj: 'reproductivo', keys: [ { key: 'flor_presencia', label: 'Presencia' }, { key: 'flor_color_petalos', label: 'Color de pétalos' }, { key: 'flor_tamano_largo', label: 'Tamaño de flor (Largo)', unit: 'cm' }, { key: 'flor_tamano_ancho', label: 'Tamaño de flor (Ancho)', unit: 'cm' }, { key: 'flor_agrupacion', label: 'Agrupación' }, { key: 'flor_olor', label: 'Olor' } ] },
  { title: 'VII. Frutos', dataObj: 'reproductivo', keys: [ { key: 'fruto_presencia', label: 'Presencia' }, { key: 'fruto_textura', label: 'Textura' }, { key: 'fruto_estado_madurar', label: 'Estado al madurar' }, { key: 'fruto_forma', label: 'Forma' }, { key: 'fruto_tamano_largo', label: 'Tamaño del fruto (Largo)', unit: 'cm' }, { key: 'fruto_tamano_ancho', label: 'Tamaño del fruto (Ancho)', unit: 'cm' }, { key: 'fruto_color_maduro', label: 'Color del fruto maduro' }, { key: 'fruto_superficie', label: 'Superficie' } ] },
  { title: 'VIII. Semillas', dataObj: 'reproductivo', keys: [ { key: 'semilla_presencia', label: 'Presencia visible' }, { key: 'semilla_numero', label: 'Número de semillas' }, { key: 'semilla_tamano_largo', label: 'Tamaño de semilla (Largo)', unit: 'cm' }, { key: 'semilla_tamano_ancho', label: 'Tamaño de semilla (Ancho)', unit: 'cm' }, { key: 'semilla_color_cascara', label: 'Color de cáscara' } ] },
  { title: 'IX. Estado fenológico', dataObj: 'compartido', keys: [ { key: 'estado_fenologico', label: 'Estado fenológico' } ] },
  { title: 'X. Estado del individuo', dataObj: 'compartido', keys: [ { key: 'estado_individuo', label: 'Estado del individuo' } ] },
  { title: 'XI. Valor ornamental', dataObj: 'compartido', keys: [ { key: 'valor_ornamental', label: 'Valor ornamental' } ] },
  { title: 'XII. Impacto urbano', dataObj: 'compartido', keys: [ { key: 'impacto_urbano', label: 'Impacto urbano' } ] }
];

const PALMERA_SCHEMA = [
  { title: 'I. Datos dasométricos', dataObj: 'dasometria', keys: [ { key: 'altura_total', label: 'Altura total aproximada', unit: 'm' }, { key: 'cap', label: 'Circunferencia del tallo a 1.30 m (CAP)', unit: 'cm' }, { key: 'diametro_copa_paralelo', label: 'Diámetro de copa paralelo', unit: 'm' }, { key: 'diametro_copa_perpendicular', label: 'Diámetro de copa perpendicular', unit: 'm' }, { key: 'altura_inicio_copa', label: 'Altura de inicio de copa', unit: 'm' }, { key: 'numero_tallos', label: 'Número de tallos' }, { key: 'raices_visibles', label: 'Raíces visibles' } ] },
  { title: 'II. Tipo de palmera', dataObj: 'general', keys: [ { key: 'tipo', label: 'Tipo de palmera' } ] },
  { title: 'III. Tallo (estípite)', dataObj: 'tallo', keys: [ { key: 'caracteristicas', label: 'Tallo (estípite)' } ] },
  { title: 'IV. Hojas', dataObj: 'hojas', keys: [ { key: 'tipo', label: 'Tipo de hoja' }, { key: 'segmentos', label: 'Segmentos' }, { key: 'hoja_largo', label: 'Tamaño de hoja (Largo)', unit: 'm' }, { key: 'hoja_ancho', label: 'Tamaño de hoja (Ancho)', unit: 'm' }, { key: 'peciolo_largo', label: 'Tamaño de peciolo (Largo)', unit: 'm' }, { key: 'peciolo_diametro', label: 'Tamaño de peciolo (Diámetro)', unit: 'cm' }, { key: 'color_hoja', label: 'Color' } ] },
  { title: 'V. Espinas', dataObj: 'espinas', keys: [ { key: 'espinas_palmera', label: 'Espinas' } ] },
  { title: 'VI. Inflorescencia', dataObj: 'inflorescencia', keys: [ { key: 'inflorescencia_presencia', label: 'Presencia' }, { key: 'inflorescencia_posicion', label: 'Posición' }, { key: 'inflorescencia_forma', label: 'Forma' }, { key: 'inflorescencia_espata', label: 'Presencia de espata' } ] },
  { title: 'VII. Frutos', dataObj: 'reproductivo', keys: [ { key: 'fruto_presencia', label: 'Presencia' }, { key: 'fruto_tipo', label: 'Tipo' }, { key: 'fruto_forma', label: 'Forma' }, { key: 'fruto_superficie', label: 'Superficie' }, { key: 'fruto_tamano_largo', label: 'Tamaño del fruto (Largo)', unit: 'cm' }, { key: 'fruto_tamano_ancho', label: 'Tamaño del fruto (Ancho)', unit: 'cm' }, { key: 'fruto_color_maduro', label: 'Color del fruto maduro' } ] },
  { title: 'VIII. Semillas', dataObj: 'reproductivo', keys: [ { key: 'semilla_numero', label: 'Número de semillas por fruto' }, { key: 'semilla_tamano_largo', label: 'Tamaño de semilla (Largo)', unit: 'cm' }, { key: 'semilla_tamano_ancho', label: 'Tamaño de semilla (Ancho)', unit: 'cm' } ] },
  { title: 'IX. Estado fenológico', dataObj: 'compartido', keys: [ { key: 'estado_fenologico', label: 'Estado fenológico' } ] },
  { title: 'X. Estado del individuo', dataObj: 'compartido', keys: [ { key: 'estado_individuo', label: 'Estado del individuo' } ] },
  { title: 'XI. Valor ornamental', dataObj: 'compartido', keys: [ { key: 'valor_ornamental', label: 'Valor ornamental' } ] },
  { title: 'XII. Impacto urbano', dataObj: 'compartido', keys: [ { key: 'impacto_urbano', label: 'Impacto urbano' } ] }
];

const ARBUSTO_SCHEMA = [
  { title: 'I. Datos dasométricos', dataObj: 'dasometria', keys: [ { key: 'altura_total', label: 'Altura total aproximada', unit: 'm' }, { key: 'diametro_copa_paralelo', label: 'Diámetro de copa paralelo', unit: 'm' }, { key: 'diametro_copa_perpendicular', label: 'Diámetro de copa perpendicular', unit: 'm' }, { key: 'altura_inicio_copa', label: 'Altura de inicio de ramificación', unit: 'm' }, { key: 'numero_tallos', label: 'Número de tallos' }, { key: 'forma_general', label: 'Forma general del arbusto' }, { key: 'densidad_follaje', label: 'Densidad del follaje' } ] },
  { title: 'II. Tallo y ramificación', dataObj: 'tallo', keys: [ { key: 'tipo_ramificacion', label: 'Tipo de ramificación' }, { key: 'tipo_tallo', label: 'Tipo de tallo' }, { key: 'presencia_espinas', label: 'Presencia de espinas' } ] },
  { title: 'III. Hojas', dataObj: 'hojas', keys: [ { key: 'tipo_hoja', label: 'Tipo de hoja' }, { key: 'hoja_compuesta_tipo', label: 'Si es compuesta' }, { key: 'forma_hoja', label: 'Forma' }, { key: 'disposicion_hoja', label: 'Disposición' }, { key: 'borde_hoja', label: 'Borde' }, { key: 'color_hoja', label: 'Color' } ] },
  { title: 'IV. Flores', dataObj: 'reproductivo', keys: [ { key: 'flor_presencia', label: 'Presencia' }, { key: 'flor_color', label: 'Color de pétalos' }, { key: 'flor_tamano', label: 'Tamaño de flor', unit: 'cm' }, { key: 'flor_forma', label: 'Forma' }, { key: 'flor_agrupacion', label: 'Agrupación' } ] },
  { title: 'V. Frutos', dataObj: 'reproductivo', keys: [ { key: 'fruto_presencia', label: 'Presencia' }, { key: 'fruto_textura', label: 'Textura' }, { key: 'fruto_forma', label: 'Forma' }, { key: 'fruto_tamano', label: 'Tamaño del fruto', unit: 'cm' }, { key: 'fruto_color_maduro', label: 'Color del fruto maduro' } ] },
  { title: 'VI. Semillas', dataObj: 'reproductivo', keys: [ { key: 'semilla_numero', label: 'Número de semillas' }, { key: 'semilla_tamano', label: 'Tamaño de semilla', unit: 'cm' } ] },
  { title: 'VII. Estado fenológico', dataObj: 'compartido', keys: [ { key: 'estado_fenologico', label: 'Estado fenológico' } ] },
  { title: 'VIII. Estado del individuo', dataObj: 'compartido', keys: [ { key: 'estado_individuo', label: 'Estado del individuo' } ] },
  { title: 'IX. Valor ornamental', dataObj: 'compartido', keys: [ { key: 'valor_ornamental', label: 'Valor ornamental' } ] },
  { title: 'X. Impacto urbano', dataObj: 'compartido', keys: [ { key: 'impacto_urbano', label: 'Impacto urbano' } ] }
];

const LIANA_SCHEMA = [
  { title: 'I. Datos dasométricos', dataObj: 'dasometria', keys: [ { key: 'longitud_visible', label: 'Longitud visible aproximada', unit: 'm' }, { key: 'altura_maxima', label: 'Altura máxima alcanzada', unit: 'm' }, { key: 'diametro_tallo', label: 'Diámetro del tallo principal', unit: 'cm' }, { key: 'numero_tallos', label: 'Número de tallos' } ] },
  { title: 'II. Tipo de soporte', dataObj: 'crecimiento', keys: [ { key: 'tipo_soporte', label: 'Tipo de soporte' } ] },
  { title: 'III. Forma de crecimiento', dataObj: 'crecimiento', keys: [ { key: 'forma_crecimiento', label: 'Forma de crecimiento' } ] },
  { title: 'IV. Mecanismo de fijación', dataObj: 'crecimiento', keys: [ { key: 'mecanismo_fijacion', label: 'Mecanismo de fijación' } ] },
  { title: 'V. Tallo', dataObj: 'tallo', keys: [ { key: 'tipo_tallo_liana', label: 'Tipo de tallo' }, { key: 'espinas_tallo', label: 'Espinas' } ] },
  { title: 'VI. Exudado', dataObj: 'exudado', keys: [ { key: 'presencia', label: 'Presencia' }, { key: 'tipo', label: 'Tipo' }, { key: 'color', label: 'Color' } ] },
  { title: 'VII. Hojas', dataObj: 'hojas', keys: [ { key: 'tipo_hoja', label: 'Tipo de hoja' }, { key: 'forma_hoja', label: 'Forma' }, { key: 'disposicion_hoja', label: 'Disposición' }, { key: 'textura_hoja', label: 'Textura' } ] },
  { title: 'VIII. Flores', dataObj: 'reproductivo', keys: [ { key: 'flor_presencia', label: 'Presencia' }, { key: 'flor_color', label: 'Color de pétalos' }, { key: 'flor_tamano', label: 'Tamaño de flor', unit: 'cm' }, { key: 'flor_agrupacion', label: 'Tipo de agrupación' } ] },
  { title: 'IX. Frutos', dataObj: 'reproductivo', keys: [ { key: 'fruto_presencia', label: 'Presencia' }, { key: 'fruto_textura', label: 'Textura' }, { key: 'fruto_forma', label: 'Forma' }, { key: 'fruto_tamano', label: 'Tamaño del fruto', unit: 'cm' }, { key: 'fruto_color_maduro', label: 'Color del fruto maduro' } ] },
  { title: 'X. Semillas', dataObj: 'reproductivo', keys: [ { key: 'semilla_numero', label: 'Número de semillas' }, { key: 'semilla_tamano', label: 'Tamaño de semilla', unit: 'cm' } ] },
  { title: 'XI. Estado fenológico', dataObj: 'compartido', keys: [ { key: 'estado_fenologico', label: 'Estado fenológico' } ] },
  { title: 'XII. Estado del individuo', dataObj: 'compartido', keys: [ { key: 'estado_individuo', label: 'Estado del individuo' } ] },
  { title: 'XIII. Valor ornamental', dataObj: 'compartido', keys: [ { key: 'valor_ornamental', label: 'Valor ornamental' } ] },
  { title: 'XIV. Impacto urbano', dataObj: 'compartido', keys: [ { key: 'impacto_urbano', label: 'Impacto urbano' } ] }
];

const HIERBA_SCHEMA = [
  { title: 'I. Datos dasométricos', dataObj: 'dasometria', keys: [ { key: 'altura_total', label: 'Altura total aproximada', unit: 'cm' }, { key: 'cobertura', label: 'Cobertura aproximada de la planta', unit: 'cm' }, { key: 'numero_tallos', label: 'Número de tallos' } ] },
  { title: 'II. Forma de crecimiento', dataObj: 'crecimiento', keys: [ { key: 'tipo_crecimiento', label: 'Forma de crecimiento' } ] },
  { title: 'III. Tipo de tallo', dataObj: 'tallo', keys: [ { key: 'tipo_tallo', label: 'Tipo de tallo' } ] },
  { title: 'IV. Hojas', dataObj: 'hojas', keys: [ { key: 'tipo_hoja', label: 'Tipo de hoja' }, { key: 'hoja_compuesta_tipo', label: 'Si es compuesta' }, { key: 'forma_hoja', label: 'Forma' }, { key: 'disposicion_hoja', label: 'Disposición' }, { key: 'borde_hoja', label: 'Borde' }, { key: 'color_hoja', label: 'Color' }, { key: 'textura_hoja', label: 'Textura' }, { key: 'olor_hoja', label: 'Olor al estrujar' }, { key: 'exudado_corte', label: 'Exudado al corte' } ] },
  { title: 'V. Flores', dataObj: 'reproductivo', keys: [ { key: 'flor_presencia', label: 'Presencia' }, { key: 'flor_color', label: 'Color de pétalos' }, { key: 'flor_tamano', label: 'Tamaño de flor', unit: 'cm' }, { key: 'flor_agrupacion', label: 'Tipo de agrupación' } ] },
  { title: 'VI. Frutos', dataObj: 'reproductivo', keys: [ { key: 'fruto_presencia', label: 'Presencia' }, { key: 'fruto_textura', label: 'Textura' }, { key: 'fruto_forma', label: 'Forma' }, { key: 'fruto_tamano', label: 'Tamaño del fruto', unit: 'cm' }, { key: 'fruto_color_maduro', label: 'Color del fruto maduro' } ] },
  { title: 'VII. Semillas', dataObj: 'reproductivo', keys: [ { key: 'semilla_presencia', label: 'Visibles' }, { key: 'semilla_tamano', label: 'Tamaño de semilla', unit: 'cm' } ] },
  { title: 'VIII. Estado fenológico', dataObj: 'compartido', keys: [ { key: 'estado_fenologico', label: 'Estado fenológico' } ] },
  { title: 'IX. Estado del individuo', dataObj: 'compartido', keys: [ { key: 'estado_individuo', label: 'Estado del individuo' } ] },
  { title: 'X. Valor ornamental', dataObj: 'compartido', keys: [ { key: 'valor_ornamental', label: 'Valor ornamental' } ] },
  { title: 'XI. Impacto urbano', dataObj: 'compartido', keys: [ { key: 'impacto_urbano', label: 'Impacto urbano' } ] }
];

export function Step5Summary({ form }: { form: any }) {
  const getFilteredImpacto = (impactos: any, habito: string) => {
    let arr = [];
    if (Array.isArray(impactos)) {
      arr = impactos;
    } else if (typeof impactos === 'string') {
      arr = impactos.split(',').map(s => s.trim());
    } else {
      return '';
    }
    
    // We strictly define what Árbol can have. If it's not Palmera, it uses this list:
    const isPalmera = habito === 'Palmera';
    const validImpactos = isPalmera
      ? ['No genera daño', 'Hojas o ramas secas pueden caer', 'Frutos ensucian la vía', 'Raíces levantan el piso', 'Tronco inclinado (riesgo)', 'Puede atraer plagas', 'Interfiere con cableado', 'Otro']
      : ['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces rompen el piso', 'Raíces afectan veredas', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de ramas', 'Tronco inclinado (riesgo)', 'Otro'];
      
    // Because sometimes UTF-8 chars get mangled (e.g. 'dao' vs 'daño'), we also do a loose match or just strip accents.
    // However, 'Puede atraer plagas' is purely ascii and easy to filter out for Árbol.
    return arr.filter((opt: string) => {
      if (opt.startsWith('Otro:') || opt === 'Otro') return true;
      if (!isPalmera && opt === 'Puede atraer plagas') return false; // Force filter it out
      
      // Check if it exists in validImpactos (with loose match for mangled characters)
      return validImpactos.some(v => v === opt || v.replace(/[^a-zA-Z ]/g, '') === opt.replace(/[^a-zA-Z ]/g, ''));
    }).join(', ');
  };
  const {
    datosBotanicos,
    nombre,
    email,
    rolRegistro,
    dni,
    curso,
    facultad,
    escuela,
    diaClase,
    distrito,
    direccion,
    numeroCasa,
    tipoUbicacion,
    tipoUbicacion2,
    sustratoPlanta,
    location,
    nombresComunes,
    nombreCientifico,
    fotos,
    setSelectedPhoto,
    handleFinalSubmit,
    isSubmitting,
    editId,
    prevStep,
  } = form;

  const activeData = getActiveBotanicData(datosBotanicos);

  const renderSchemaSection = (section: any, idx: number) => {
    const parentObj = datosBotanicos?.[section.dataObj];
    if (!parentObj) return null;
    
    const activeKeys = section.keys.filter((k: any) => parentObj[k.key] !== undefined && parentObj[k.key] !== null && parentObj[k.key] !== '');
    if (activeKeys.length === 0) return null;
    
    return (
      <YStack mb="$2" key={'sec_' + idx}>
        <Text color="#1FC451" fontWeight="bold" mt="$2">{section.title}</Text>
        {activeKeys.map((k: any, k_idx: number) => {
          const v = parentObj[k.key];
          const stringVal = Array.isArray(v) ? v.join(', ') : String(v);
          
          // Lógica especial para limpiar Impacto Urbano
          let finalVal = stringVal;
          if (k.key === 'impacto_urbano') {
            finalVal = getFilteredImpacto(v, activeData?.habito);
          }

          return (
            <Text key={'key_' + k_idx} color="rgba(255,255,255,0.6)" fontSize={13} ml="$2">
              • {k.label}: <Text color="white" textTransform="none">{finalVal} {k.unit || ''}</Text>
            </Text>
          );
        })}
      </YStack>
    );
  };

  return (
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
          <>
            <Text color="rgba(255,255,255,0.7)">DNI: <Text color="white" fontWeight="bold">{dni}</Text></Text>
            {curso ? <Text color="rgba(255,255,255,0.7)">Curso: <Text color="white" fontWeight="bold">{curso}</Text></Text> : null}
            {facultad ? <Text color="rgba(255,255,255,0.7)">Facultad: <Text color="white" fontWeight="bold">{facultad}</Text></Text> : null}
            {escuela ? <Text color="rgba(255,255,255,0.7)">Escuela: <Text color="white" fontWeight="bold">{escuela}</Text></Text> : null}
            {diaClase ? <Text color="rgba(255,255,255,0.7)">Día de Clase: <Text color="white" fontWeight="bold">{diaClase}</Text></Text> : null}
          </>
        )}
      </Card>

      <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
        <H4 color="white">2. Ubicación</H4>
        {distrito ? <Text color="rgba(255,255,255,0.7)">Distrito: <Text color="white" fontWeight="bold">{distrito}</Text></Text> : null}
        {direccion ? <Text color="rgba(255,255,255,0.7)">Dirección: <Text color="white" fontWeight="bold">{direccion}</Text></Text> : null}
        {numeroCasa ? <Text color="rgba(255,255,255,0.7)">Número / Lote: <Text color="white" fontWeight="bold">{numeroCasa}</Text></Text> : null}
        {tipoUbicacion ? <Text color="rgba(255,255,255,0.7)">Tipo de Ubicación: <Text color="white" fontWeight="bold">{tipoUbicacion.startsWith('Otro:') ? tipoUbicacion.substring(5).trim() : tipoUbicacion}</Text></Text> : null}
        {tipoUbicacion2 ? <Text color="rgba(255,255,255,0.7)">Detalle Ubicación: <Text color="white" fontWeight="bold">{tipoUbicacion2.startsWith('Otro:') ? tipoUbicacion2.substring(5).trim() : tipoUbicacion2}</Text></Text> : null}
        {sustratoPlanta ? <Text color="rgba(255,255,255,0.7)">Sustrato: <Text color="white" fontWeight="bold">{sustratoPlanta.startsWith('Otro:') ? sustratoPlanta.substring(5).trim() : sustratoPlanta}</Text></Text> : null}

        {location && (
          <View style={{ height: 150, borderRadius: 8, overflow: 'hidden', marginTop: 8 }}>
            <MapView
              style={{ flex: 1 }}
              region={{ latitude: location.latitude, longitude: location.longitude, latitudeDelta: 0.00245, longitudeDelta: 0.00145 }}
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
        <Text color="rgba(255,255,255,0.7)">Hábito: <Text color="white" fontWeight="bold">{activeData?.habito}</Text></Text>
        {activeData?.tipoVida ? <Text color="rgba(255,255,255,0.7)">Tipo de Vida: <Text color="white" fontWeight="bold">{activeData?.tipoVida}</Text></Text> : null}
        
        <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 10 }}>
          <Text color="#1FC451" fontWeight="bold" mb="$2">Detalle Completo (Bloques):</Text>
          
          {activeData?.habito === 'Árbol' && ARBOL_SCHEMA.map(renderSchemaSection)}
          {activeData?.habito === 'Palmera' && PALMERA_SCHEMA.map(renderSchemaSection)}
          {activeData?.habito === 'Arbusto' && ARBUSTO_SCHEMA.map(renderSchemaSection)}
          {activeData?.habito === 'Liana' && LIANA_SCHEMA.map(renderSchemaSection)}
          {activeData?.habito === 'Hierba' && HIERBA_SCHEMA.map(renderSchemaSection)}
        </View>
      </Card>


      <Card padding="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0} gap="$3">
        <H4 color="white">4. Fotografías (5)</H4>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$2">
            {[fotos?.planta_completa, fotos?.hoja, fotos?.flor, fotos?.fruto, fotos?.semilla].map((uri, idx) => (
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
  );
}
