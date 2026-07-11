// src/lib/validation.ts (or app/lib/validation.ts)

export const isFilled = (value: any) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return true;
  if (typeof value === 'string') {
    if (value.trim() === '') return false;
    if (value === 'Otro') return false;
    if (value.startsWith('Otro:') && value.substring(5).trim() === '') return false;
    return true;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return false;
    let hasValidItem = false;
    for (const v of value) {
      if (v === undefined || v === null) continue;
      if (typeof v === 'string') {
        if (v.trim() === '') continue;
        if (v === 'Otro') continue;
        if (v.startsWith('Otro:') && v.substring(5).trim() === '') continue;
        hasValidItem = true;
      } else if (typeof v === 'number' || typeof v === 'boolean') {
        hasValidItem = true;
      }
    }
    return hasValidItem;
  };
  return false;
};

export const validateCompartido = (datos: any) => {
  const reproductivo = datos.reproductivo || {};
  const compartido = datos.compartido || {};

  // Flores
  if (!isFilled(reproductivo.flor_presencia)) return false;
  if (reproductivo.flor_presencia === 'Con flores') {
    if (!isFilled(reproductivo.flor_color) ||
        !isFilled(reproductivo.flor_tamano_largo) ||
        !isFilled(reproductivo.flor_tamano_ancho) ||
        !isFilled(reproductivo.flor_agrupacion) ||
        !isFilled(reproductivo.flor_olor)) return false;
  }

  // Frutos
  if (!isFilled(reproductivo.fruto_presencia)) return false;
  if (reproductivo.fruto_presencia === 'Con frutos') {
    if (!isFilled(reproductivo.fruto_textura) ||
        !isFilled(reproductivo.fruto_estado_madurar) ||
        !isFilled(reproductivo.fruto_forma) ||
        !isFilled(reproductivo.fruto_tamano_largo) ||
        !isFilled(reproductivo.fruto_tamano_ancho) ||
        !isFilled(reproductivo.fruto_color_maduro) ||
        !isFilled(reproductivo.fruto_superficie)) return false;
  }

  // Semillas
  if (!isFilled(reproductivo.semilla_presencia)) return false;
  if (reproductivo.semilla_presencia === 'Sí') {
    if (!isFilled(reproductivo.semilla_numero) ||
        !isFilled(reproductivo.semilla_tamano_largo) ||
        !isFilled(reproductivo.semilla_tamano_ancho) ||
        !isFilled(reproductivo.semilla_color)) return false;
  }

  // Compartidos
  if (!isFilled(compartido.estado_fenologico) ||
      !isFilled(compartido.estado_individuo) ||
      !isFilled(compartido.valor_ornamental) ||
      !isFilled(compartido.impacto_urbano)) return false;

  return true;
};

export const validateArbol = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const tronco = datos.tronco || {};
  const exudado = datos.exudado || {};
  const copa = datos.copa || {};
  const hojas = datos.hojas || {};

  // Dasometría
  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.cap) ||
      !isFilled(dasometria.diametro_copa_paralelo) ||
      !isFilled(dasometria.diametro_copa_perpendicular) ||
      !isFilled(dasometria.altura_inicio_copa) ||
      !isFilled(dasometria.raices_visibles)) return false;

  // Tronco
  if (!isFilled(tronco.numero_troncos) ||
      !isFilled(tronco.forma) ||
      !isFilled(tronco.corteza_externa) ||
      !isFilled(tronco.color_corteza) ||
      !isFilled(tronco.lenticelas) ||
      !isFilled(tronco.espinas_tronco) ||
      !isFilled(tronco.olor_corteza)) return false;

  // Exudado
  if (!isFilled(exudado.presencia)) return false;
  if (exudado.presencia === 'Sí') {
    if (!isFilled(exudado.color)) return false;
  }

  // Copa
  if (!isFilled(copa.tipo_ramificacion) ||
      !isFilled(copa.forma_copa) ||
      !isFilled(copa.densidad_copa)) return false;

  // Hojas
  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.borde_hoja) ||
      !isFilled(hojas.textura_hoja) ||
      !isFilled(hojas.color_enves) ||
      !isFilled(hojas.pelos_hoja) ||
      !isFilled(hojas.tipo_peciolo) ||
      !isFilled(hojas.peciolo_pulvino)) return false;

  if (hojas.tipo_peciolo !== 'Sésil') {
    if (!isFilled(hojas.longitud_peciolo) || !isFilled(hojas.diametro_peciolo)) return false;
  }

  return validateCompartido(datos);
};

export const validatePalmera = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const tallo = datos.tallo || {};
  const hojas = datos.hojas || {};
  const inflorescencia = datos.inflorescencia || {};

  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.cap) ||
      !isFilled(dasometria.diametro_copa_paralelo) ||
      !isFilled(dasometria.diametro_copa_perpendicular) ||
      !isFilled(dasometria.altura_inicio_copa) ||
      !isFilled(dasometria.numero_tallos) ||
      !isFilled(dasometria.raices_visibles)) return false;

  const general = datos.general || {};
  if (!isFilled(general.tipo)) return false;

  if (!isFilled(tallo.caracteristicas)) return false;

  const espinas = datos.espinas || {};
  if (!isFilled(espinas.espinas_palmera)) return false;

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.hoja_largo) ||
      !isFilled(hojas.hoja_ancho) ||
      !isFilled(hojas.peciolo_largo) ||
      !isFilled(hojas.peciolo_diametro) ||
      !isFilled(hojas.color_hoja)) return false;

  if ((hojas.tipo_hoja === 'Pinnada' || hojas.tipo_hoja === 'Bipinnada') && !isFilled(hojas.segmentos)) return false;

  if (!isFilled(inflorescencia.inflorescencia_presencia)) return false;
  if (inflorescencia.inflorescencia_presencia === 'Con inflorescencia') {
    if (!isFilled(inflorescencia.inflorescencia_posicion) ||
        !isFilled(inflorescencia.inflorescencia_forma) ||
        !isFilled(inflorescencia.inflorescencia_espata)) return false;
  }

  const reproductivo = datos.reproductivo || {};
  const compartido = datos.compartido || {};

  // Frutos Palmera
  if (!isFilled(reproductivo.fruto_presencia)) return false;
  if (reproductivo.fruto_presencia === 'Con frutos') {
    if (!isFilled(reproductivo.fruto_tipo) ||
        !isFilled(reproductivo.fruto_forma) ||
        !isFilled(reproductivo.fruto_superficie) ||
        !isFilled(reproductivo.fruto_tamano_largo) ||
        !isFilled(reproductivo.fruto_tamano_ancho) ||
        !isFilled(reproductivo.fruto_color_maduro)) return false;
  }

  // Semillas Palmera
  if (!isFilled(reproductivo.semilla_numero) ||
      !isFilled(reproductivo.semilla_tamano_largo) ||
      !isFilled(reproductivo.semilla_tamano_ancho)) return false;

  // Compartidos Palmera
  if (!isFilled(compartido.estado_fenologico) ||
      !isFilled(compartido.estado_individuo) ||
      !isFilled(compartido.valor_ornamental) ||
      !isFilled(compartido.impacto_urbano)) return false;

  return true;
};

export const validateArbusto = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const tallo = datos.tallo || {};
  const hojas = datos.hojas || {};

  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.diametro_copa_paralelo) ||
      !isFilled(dasometria.diametro_copa_perpendicular) ||
      !isFilled(dasometria.altura_inicio_ramificacion) ||
      !isFilled(dasometria.numero_tallos) ||
      !isFilled(dasometria.forma_general) ||
      !isFilled(dasometria.densidad_follaje)) return false;

  if (!isFilled(tallo.tipo_ramificacion) ||
      !isFilled(tallo.tipo_tallo) ||
      !isFilled(tallo.presencia_espinas)) return false;

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.borde_hoja) ||
      !isFilled(hojas.color_hoja)) return false;

  if (hojas.tipo_hoja === 'Compuesta' && !isFilled(hojas.hoja_compuesta_tipo)) return false;

  const reproductivo = datos.reproductivo || {};
  const compartido = datos.compartido || {};

  // Flores Arbusto
  if (!isFilled(reproductivo.flor_presencia)) return false;
  if (reproductivo.flor_presencia === 'Con flores') {
    if (!isFilled(reproductivo.flor_color) ||
        !isFilled(reproductivo.flor_tamano) ||
        !isFilled(reproductivo.flor_forma) ||
        !isFilled(reproductivo.flor_agrupacion)) return false;
  }

  // Frutos Arbusto
  if (!isFilled(reproductivo.fruto_presencia)) return false;
  if (reproductivo.fruto_presencia === 'Con frutos') {
    if (!isFilled(reproductivo.fruto_textura) ||
        !isFilled(reproductivo.fruto_forma) ||
        !isFilled(reproductivo.fruto_tamano) ||
        !isFilled(reproductivo.fruto_color_maduro)) return false;
  }

  // Semillas Arbusto
  if (!isFilled(reproductivo.semilla_numero) ||
      !isFilled(reproductivo.semilla_tamano)) return false;

  // Compartidos Arbusto
  if (!isFilled(compartido.estado_fenologico) ||
      !isFilled(compartido.estado_individuo) ||
      !isFilled(compartido.valor_ornamental) ||
      !isFilled(compartido.impacto_urbano)) return false;

  return true;
};

export const validateLiana = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const crecimiento = datos.crecimiento || {};
  const tallo = datos.tallo || {};
  const exudado = datos.exudado || {};
  const hojas = datos.hojas || {};

  if (!isFilled(dasometria.longitud_visible) ||
      !isFilled(dasometria.altura_maxima) ||
      !isFilled(dasometria.diametro_tallo) ||
      !isFilled(dasometria.numero_tallos)) return false;

  if (!isFilled(crecimiento.tipo_soporte) ||
      !isFilled(crecimiento.forma_crecimiento) ||
      !isFilled(crecimiento.mecanismo_fijacion)) return false;

  if (!isFilled(tallo.tipo_tallo_liana) ||
      !isFilled(tallo.espinas_tallo)) return false;

  if (!isFilled(exudado.presencia)) return false;
  if (exudado.presencia === 'Presente') {
    if (!isFilled(exudado.color)) return false;
  }

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.textura_hoja)) return false;

  if (hojas.tipo_hoja === 'Compuesta' && !isFilled(hojas.hoja_compuesta_tipo)) return false;

  const reproductivo = datos.reproductivo || {};
  const compartido = datos.compartido || {};

  // Flores Liana
  if (!isFilled(reproductivo.flor_presencia)) return false;
  if (reproductivo.flor_presencia === 'Con flores') {
    if (!isFilled(reproductivo.flor_color) ||
        !isFilled(reproductivo.flor_tamano) ||
        !isFilled(reproductivo.flor_agrupacion)) return false;
  }

  // Frutos Liana
  if (!isFilled(reproductivo.fruto_presencia)) return false;
  if (reproductivo.fruto_presencia === 'Con frutos') {
    if (!isFilled(reproductivo.fruto_textura) ||
        !isFilled(reproductivo.fruto_forma) ||
        !isFilled(reproductivo.fruto_tamano) ||
        !isFilled(reproductivo.fruto_color_maduro)) return false;
  }

  // Semillas Liana
  if (!isFilled(reproductivo.semilla_numero) ||
      !isFilled(reproductivo.semilla_tamano)) return false;

  // Compartidos Liana
  if (!isFilled(compartido.estado_fenologico) ||
      !isFilled(compartido.estado_individuo) ||
      !isFilled(compartido.valor_ornamental) ||
      !isFilled(compartido.impacto_urbano)) return false;

  return true;
};

export const validateHierba = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const crecimiento = datos.crecimiento || {};
  const hojas = datos.hojas || {};

  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.cobertura) ||
      !isFilled(dasometria.numero_tallos)) return false;

  if (!isFilled(crecimiento.tipo_crecimiento) ||
      !isFilled(crecimiento.tipo_tallo)) return false;

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.color_hoja) ||
      !isFilled(hojas.textura_hoja) ||
      !isFilled(hojas.olor_hoja) ||
      !isFilled(hojas.exudado_corte)) return false;

  const reproductivo = datos.reproductivo || {};
  const compartido = datos.compartido || {};

  // Flores Hierba
  if (!isFilled(reproductivo.flor_presencia)) return false;
  if (reproductivo.flor_presencia === 'Con flores') {
    if (!isFilled(reproductivo.flor_color) ||
        !isFilled(reproductivo.flor_tamano) ||
        !isFilled(reproductivo.flor_agrupacion)) return false;
  }

  // Frutos Hierba
  if (!isFilled(reproductivo.fruto_presencia)) return false;
  if (reproductivo.fruto_presencia === 'Con frutos') {
    if (!isFilled(reproductivo.fruto_textura) ||
        !isFilled(reproductivo.fruto_forma) ||
        !isFilled(reproductivo.fruto_color_maduro)) return false;
  }

  // Semillas Hierba
  if (!isFilled(reproductivo.semilla_presencia)) return false;
  if (reproductivo.semilla_presencia === 'Sí') {
     if (!isFilled(reproductivo.semilla_numero) ||
         !isFilled(reproductivo.semilla_tamano)) return false;
  }

  // Compartidos Hierba
  if (!isFilled(compartido.estado_fenologico) ||
      !isFilled(compartido.estado_individuo) ||
      !isFilled(compartido.valor_ornamental) ||
      !isFilled(compartido.impacto_urbano)) return false;

  return true;
};

// --------------------------------------------------------------------------------------
// Advanced Validation for UI: Returns array of missing section keys instead of boolean
// --------------------------------------------------------------------------------------

const labelsMap: Record<string, string> = {
  "dasometria.altura_total": "Altura total aproximada (m)",
  "dasometria.cap": "Circunferencia a la altura del pecho (CAP) (cm)",
  "dasometria.diametro_copa_paralelo": "Diámetro de copa paralelo a la calle (m)",
  "dasometria.diametro_copa_perpendicular": "Diámetro de copa perpendicular a la calle (m)",
  "dasometria.altura_inicio_copa": "Altura de inicio de copa (m)",
  "dasometria.raices_visibles": "Raíces visibles",
  "tronco.numero_troncos": "Número de troncos desde la base",
  "tronco.forma": "Forma del tronco",
  "tronco.corteza_externa": "Corteza externa",
  "tronco.color_corteza": "Color de corteza (Múltiple)",
  "tronco.lenticelas": "Lenticelas",
  "tronco.espinas_tronco": "Espinas",
  "tronco.olor_corteza": "Olor de corteza",
  "exudado.presencia": "Presencia de exudado",
  "exudado.tipo": "Tipo de exudado",
  "exudado.color": "Color al corte",
  "copa.tipo_ramificacion": "Tipo de ramificación",
  "copa.forma_copa": "Forma de copa",
  "copa.densidad_copa": "Densidad de copa",
  "hojas.tipo_hoja": "Tipo de hoja",
  "hojas.disposicion_hoja": "Disposición",
  "hojas.forma_hoja": "Forma",
  "hojas.borde_hoja": "Borde",
  "hojas.textura_hoja": "Textura",
  "hojas.color_enves": "Color del envés",
  "hojas.pelos_hoja": "Presencia de pelos (Múltiple)",
  "hojas.tipo_peciolo": "Tipo de peciolo",
  "hojas.longitud_peciolo": "Longitud peciolo (cm)",
  "hojas.diametro_peciolo": "Ø peciolo (mm)",
  "hojas.peciolo_pulvino": "Peciolo con pulvino",
  "dasometria.numero_tallos": "Número de tallos",
  "tallo.caracteristicas": "Características (Múltiple)",
  "hojas.segmentos": "Segmentos (Múltiple)",
  "hojas.hoja_largo": "Largo hoja (m)",
  "hojas.hoja_ancho": "Ancho hoja (m)",
  "hojas.peciolo_largo": "Largo peciolo (m)",
  "hojas.peciolo_diametro": "Ø peciolo (cm)",
  "hojas.color_hoja": "Color",
  "inflorescencia.inflorescencia_presencia": "Presencia de inflorescencia",
  "inflorescencia.inflorescencia_posicion": "Posición (Múltiple)",
  "inflorescencia.inflorescencia_forma": "Forma",
  "inflorescencia.inflorescencia_espata": "Presencia de espata",
  "dasometria.altura_inicio_ramificacion": "Altura de inicio de ramificación (m)",
  "dasometria.forma_general": "Forma general del arbusto",
  "dasometria.densidad_follaje": "Densidad del follaje",
  "tallo.tipo_ramificacion": "Tipo de ramificación",
  "tallo.tipo_tallo": "Tipo de tallo",
  "tallo.presencia_espinas": "Presencia de espinas",
  "hojas.hoja_compuesta_tipo": "Si es compuesta",
  "dasometria.longitud_visible": "Longitud visible (m)",
  "dasometria.altura_maxima": "Altura máxima (m)",
  "dasometria.diametro_tallo": "Diámetro tallo principal (cm)",
  "crecimiento.tipo_soporte": "Tipo de soporte",
  "crecimiento.forma_crecimiento": "Forma de crecimiento",
  "crecimiento.mecanismo_fijacion": "Mecanismo fijación (Múltiple)",
  "crecimiento.presencia_espinas": "Presencia de espinas",
  "dasometria.cobertura": "Cobertura Ø (cm)",
  "crecimiento.tipo_crecimiento": "Tipo crecimiento",
  "crecimiento.tipo_tallo": "Tipo tallo",
  "hojas.exudado_corte": "Exudado al corte",
  "hojas.olor_hoja": "Olor al estrujar",
  "reproductivo.flor_presencia": "Presencia de flores",
  "reproductivo.flor_color": "Color de pétalos",
  "reproductivo.flor_tamano": "Tamaño de flor (cm)",
  "reproductivo.flor_tamano_largo": "Largo flor (cm)",
  "reproductivo.flor_tamano_ancho": "Ancho flor (cm)",
  "reproductivo.flor_agrupacion": "Agrupación",
  "reproductivo.flor_olor": "Olor",
  "reproductivo.fruto_presencia": "Presencia de frutos",
  "reproductivo.fruto_textura": "Textura",
  "reproductivo.fruto_estado_madurar": "Estado al madurar",
  "reproductivo.fruto_forma": "Forma",
  "reproductivo.fruto_tamano_largo": "Largo fruto (cm)",
  "reproductivo.fruto_tamano_ancho": "Ancho fruto (cm)",
  "reproductivo.fruto_superficie": "Superficie",
  "reproductivo.semilla_presencia": "Presencia visible de semillas",
  "reproductivo.semilla_numero": "Número de semillas",
  "reproductivo.semilla_tamano_largo": "Largo semilla (cm)",
  "reproductivo.semilla_tamano_ancho": "Ancho semilla (cm)",
  "reproductivo.semilla_color": "Color de cáscara",
  "compartido.estado_fenologico": "Estado Fenológico (Múltiple)",
  "compartido.estado_individuo": "Estado del individuo (Múltiple)",
  "compartido.valor_ornamental": "Valor Ornamental (Múltiple)",
  "compartido.impacto_urbano": "Impacto Urbano (Múltiple)",

  "reproductivo.flor_forma": "Forma de flor",
  "reproductivo.fruto_tamano": "Tamaño del fruto (cm)",
  "reproductivo.fruto_color_maduro": "Color del fruto maduro",
  "reproductivo.semilla_tamano": "Tamaño de semilla (mm o cm)",
  "reproductivo.fruto_tipo": "Tipo de fruto",

  "tallo.tipo_tallo_liana": "Tipo de tallo",
  "tallo.espinas_tallo": "Espinas",
  "general.tipo": "Tipo de palmera",
  "espinas.espinas_palmera": "Espinas (Múltiple)"
};

export const getMissingSections = (habito: string, datos: any): { id: string, label: string }[] => {
  const missing: { id: string, label: string }[] = [];

  // Opciones válidas de estado_individuo por hábito
  const estadoIndividuoOptions: Record<string, string[]> = {
    'Árbol': ['Bueno', 'Regular', 'Malo', 'Podado', 'Enfermo', 'Con plagas visibles', 'Con daño mecánico'],
    'Palmera': ['Bueno', 'Regular', 'Malo', 'Con plagas', 'Con daño', 'Hojas secas abundantes'],
    'Arbusto': ['Bueno', 'Regular', 'Malo', 'Podado', 'Con plagas', 'Con daño'],
    'Liana': ['Bueno', 'Regular', 'Malo', 'Con plagas', 'Con daño'],
    'Hierba': ['Bueno', 'Regular', 'Malo', 'Con plagas', 'Con daño'],
  };

  // Opciones válidas de impacto_urbano por hábito
  const impactoUrbanoOptions: Record<string, string[]> = {
    'Árbol': ['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces rompen el piso', 'Raíces afectan veredas', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de ramas', 'Tronco inclinado (riesgo)', 'Otro'],
    'Palmera': ['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Frutos resbalosos', 'Raíces levantan vereda', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de hojas', 'Tronco inclinado (riesgo)', 'Otro'],
    'Arbusto': ['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces afectan vereda', 'Interfiere con infraestructura', 'Dificulta mantenimiento', 'Otro'],
    'Liana': ['No genera daño', 'Cubre infraestructura', 'Interfiere con cableado', 'Invade estructuras', 'Dificulta mantenimiento', 'Genera humedad en paredes', 'Otro'],
    'Hierba': ['No genera daño', 'Invade jardines', 'Invade veredas', 'Cubre drenajes', 'Dificulta mantenimiento', 'Puede ser resbalosa', 'Puede atraer plagas', 'Otro'],
  };

  // Verifica que un array tenga al menos un valor que sea una opción válida del hábito actual
  const isFilledWithValidOptions = (value: any, validOptions: string[]): boolean => {
    if (!Array.isArray(value) || value.length === 0) return false;
    for (const v of value) {
      if (typeof v !== 'string' || v.trim() === '') continue;
      if (v.startsWith('Otro')) return true; // "Otro" o "Otro: texto" siempre es válido
      if (validOptions.includes(v)) return true;
    }
    return false;
  };
  
  const checkField = (sectionName: string, sectionObj: any, fieldName: string) => {
    const val = sectionObj?.[fieldName];

    // Para estado_individuo e impacto_urbano, verificar contra opciones válidas del hábito
    if (fieldName === 'estado_individuo') {
      const validOpts = estadoIndividuoOptions[habito] || [];
      if (!isFilledWithValidOptions(val, validOpts)) {
        const id = `${sectionName}.${fieldName}`;
        missing.push({ id, label: labelsMap[id] || fieldName });
        return true;
      }
      return false;
    }
    if (fieldName === 'impacto_urbano') {
      const validOpts = impactoUrbanoOptions[habito] || [];
      if (!isFilledWithValidOptions(val, validOpts)) {
        const id = `${sectionName}.${fieldName}`;
        missing.push({ id, label: labelsMap[id] || fieldName });
        return true;
      }
      return false;
    }

    const filled = isFilled(val);
    if (!filled) {
      const id = `${sectionName}.${fieldName}`;
      missing.push({ id, label: labelsMap[id] || fieldName });
      return true;
    }
    return false;
  };

  const checkSection = (sectionName: string, sectionObj: any, fields: string[]) => {
    let hasMissing = false;
    fields.forEach(f => {
      if (checkField(sectionName, sectionObj, f)) hasMissing = true;
    });
    return hasMissing;
  };

  const checkCompartido = () => {
    const r = datos.reproductivo || {};
    const c = datos.compartido || {};
    
    if (!isFilled(r.flor_presencia)) {
      missing.push({ id: 'reproductivo.flor_presencia', label: labelsMap['reproductivo.flor_presencia'] || 'Presencia de flores' });
    } else if (r.flor_presencia === 'Con flores') {
      checkSection('reproductivo', r, ['flor_color','flor_tamano_largo','flor_tamano_ancho','flor_agrupacion','flor_olor']);
    }
    
    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_textura','fruto_estado_madurar','fruto_forma','fruto_tamano_largo','fruto_tamano_ancho','fruto_color_maduro','fruto_superficie']);
    }
    
    if (!isFilled(r.semilla_presencia)) {
       missing.push({ id: 'reproductivo.semilla_presencia', label: labelsMap['reproductivo.semilla_presencia'] || 'Presencia visible de semillas' });
    } else if (r.semilla_presencia === 'Sí') {
       checkSection('reproductivo', r, ['semilla_numero','semilla_tamano_largo','semilla_tamano_ancho','semilla_color']);
    }
    
    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  };

  if (habito === 'Árbol') {
    checkSection('dasometria', datos.dasometria, ['altura_total','cap','diametro_copa_paralelo','diametro_copa_perpendicular','altura_inicio_copa','raices_visibles']);
    checkSection('tronco', datos.tronco, ['numero_troncos','forma','corteza_externa','color_corteza','lenticelas','espinas_tronco','olor_corteza']);
    
    if (!isFilled(datos.exudado?.presencia)) {
      missing.push({ id: 'exudado.presencia', label: labelsMap['exudado.presencia'] || 'Presencia de exudado' });
    } else if (datos.exudado?.presencia === 'Sí') {
      checkSection('exudado', datos.exudado, ['color']);
    }
    
    checkSection('copa', datos.copa, ['tipo_ramificacion','forma_copa','densidad_copa']);
    
    const h = datos.hojas || {};
    checkSection('hojas', h, ['tipo_hoja','disposicion_hoja','forma_hoja','borde_hoja','color_enves','textura_hoja','pelos_hoja','tipo_peciolo']);
    if (h.tipo_peciolo !== 'Sésil') {
      checkSection('hojas', h, ['longitud_peciolo','diametro_peciolo']);
    }
    checkSection('hojas', h, ['peciolo_pulvino']);
    
    checkCompartido();
  }
  
  if (habito === 'Palmera') {
    checkSection('dasometria', datos.dasometria, ['altura_total','cap','diametro_copa_paralelo','diametro_copa_perpendicular','altura_inicio_copa','numero_tallos','raices_visibles']);
    checkSection('general', datos.general, ['tipo']);
    checkSection('tallo', datos.tallo, ['caracteristicas']);
    checkSection('hojas', datos.hojas, ['tipo_hoja','segmentos','hoja_largo','hoja_ancho','peciolo_largo','peciolo_diametro','color_hoja']);
    checkSection('espinas', datos.espinas, ['espinas_palmera']);
    
    if (!isFilled(datos.inflorescencia?.inflorescencia_presencia)) {
       missing.push({ id: 'inflorescencia.inflorescencia_presencia', label: labelsMap['inflorescencia.inflorescencia_presencia'] || 'Presencia de inflorescencia' });
    } else if (datos.inflorescencia?.inflorescencia_presencia === 'Con inflorescencia') {
       checkSection('inflorescencia', datos.inflorescencia, ['inflorescencia_posicion','inflorescencia_forma','inflorescencia_espata']);
    }

    const r = datos.reproductivo || {};
    const c = datos.compartido || {};

    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_tipo', 'fruto_forma','fruto_superficie','fruto_tamano_largo','fruto_tamano_ancho','fruto_color_maduro']);
    }

    checkSection('reproductivo', r, ['semilla_numero','semilla_tamano_largo','semilla_tamano_ancho']);
    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  }
  
  if (habito === 'Arbusto') {
    checkSection('dasometria', datos.dasometria, ['altura_total','diametro_copa_paralelo','diametro_copa_perpendicular','altura_inicio_ramificacion','numero_tallos','forma_general','densidad_follaje']);
    checkSection('tallo', datos.tallo, ['tipo_ramificacion','tipo_tallo','presencia_espinas']);
    checkSection('hojas', datos.hojas, ['tipo_hoja']);
    if (datos.hojas?.tipo_hoja === 'Compuesta') {
       if (!isFilled(datos.hojas?.hoja_compuesta_tipo)) missing.push({ id: 'hojas.hoja_compuesta_tipo', label: labelsMap['hojas.hoja_compuesta_tipo'] || 'Tipo si es compuesta' });
    }
    checkSection('hojas', datos.hojas, ['forma_hoja','disposicion_hoja','borde_hoja','color_hoja']);

    const r = datos.reproductivo || {};
    const c = datos.compartido || {};

    // Flores Arbusto
    if (!isFilled(r.flor_presencia)) {
      missing.push({ id: 'reproductivo.flor_presencia', label: labelsMap['reproductivo.flor_presencia'] || 'Presencia de flores' });
    } else if (r.flor_presencia === 'Con flores') {
      checkSection('reproductivo', r, ['flor_color','flor_tamano','flor_forma','flor_agrupacion']);
    }

    // Frutos Arbusto
    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_textura','fruto_forma','fruto_tamano','fruto_color_maduro']);
    }

    // Semillas Arbusto
    checkSection('reproductivo', r, ['semilla_numero','semilla_tamano']);

    // Compartidos Arbusto
    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  }
  
  if (habito === 'Hierba') {
    checkSection('dasometria', datos.dasometria, ['altura_total','cobertura','numero_tallos']);
    checkSection('crecimiento', datos.crecimiento, ['tipo_crecimiento','tipo_tallo']);
    checkSection('hojas', datos.hojas, ['tipo_hoja','disposicion_hoja','forma_hoja','color_hoja','textura_hoja','olor_hoja','exudado_corte']);
    
    const r = datos.reproductivo || {};
    const c = datos.compartido || {};

    if (!isFilled(r.flor_presencia)) {
      missing.push({ id: 'reproductivo.flor_presencia', label: labelsMap['reproductivo.flor_presencia'] || 'Presencia de flores' });
    } else if (r.flor_presencia === 'Con flores') {
      checkSection('reproductivo', r, ['flor_color','flor_tamano','flor_agrupacion']);
    }

    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_textura','fruto_forma','fruto_color_maduro']);
    }

    if (!isFilled(r.semilla_presencia)) {
       missing.push({ id: 'reproductivo.semilla_presencia', label: labelsMap['reproductivo.semilla_presencia'] || 'Visibles' });
    } else if (r.semilla_presencia === 'Sí') {
       checkSection('reproductivo', r, ['semilla_numero','semilla_tamano']);
    }

    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  }
  
  if (habito === 'Liana') {
    checkSection('dasometria', datos.dasometria, ['longitud_visible','altura_maxima','diametro_tallo','numero_tallos']);
    checkSection('crecimiento', datos.crecimiento, ['tipo_soporte','forma_crecimiento','mecanismo_fijacion']);
    checkSection('tallo', datos.tallo, ['tipo_tallo_liana','espinas_tallo']);
    
    if (!isFilled(datos.exudado?.presencia)) {
      missing.push({ id: 'exudado.presencia', label: labelsMap['exudado.presencia'] || 'Presencia de exudado' });
    } else if (datos.exudado?.presencia === 'Presente') {
      checkSection('exudado', datos.exudado, ['color']);
    }

    checkSection('hojas', datos.hojas, ['tipo_hoja','forma_hoja','disposicion_hoja','textura_hoja']);

    const r = datos.reproductivo || {};
    const c = datos.compartido || {};

    if (!isFilled(r.flor_presencia)) {
      missing.push({ id: 'reproductivo.flor_presencia', label: labelsMap['reproductivo.flor_presencia'] || 'Presencia de flores' });
    } else if (r.flor_presencia === 'Con flores') {
      checkSection('reproductivo', r, ['flor_color','flor_tamano','flor_agrupacion']);
    }

    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_textura','fruto_forma','fruto_tamano','fruto_color_maduro']);
    }

    checkSection('reproductivo', r, ['semilla_numero','semilla_tamano']);

    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  }
  
  if (!['Árbol', 'Palmera', 'Arbusto', 'Hierba', 'Liana'].includes(habito) && habito !== '') {
    const r = datos.reproductivo || {};
    const c = datos.compartido || {};
    
    if (!isFilled(r.flor_presencia)) {
      missing.push({ id: 'reproductivo.flor_presencia', label: labelsMap['reproductivo.flor_presencia'] || 'Presencia de flores' });
    } else if (r.flor_presencia === 'Con flores') {
      checkSection('reproductivo', r, ['flor_color','flor_tamano_largo','flor_tamano_ancho','flor_agrupacion','flor_olor']);
    }
    
    if (!isFilled(r.fruto_presencia)) {
      missing.push({ id: 'reproductivo.fruto_presencia', label: labelsMap['reproductivo.fruto_presencia'] || 'Presencia de frutos' });
    } else if (r.fruto_presencia === 'Con frutos') {
      checkSection('reproductivo', r, ['fruto_textura','fruto_estado_madurar','fruto_forma','fruto_tamano_largo','fruto_tamano_ancho','fruto_color_maduro','fruto_superficie']);
    }
    
    if (!isFilled(r.semilla_presencia)) {
       missing.push({ id: 'reproductivo.semilla_presencia', label: labelsMap['reproductivo.semilla_presencia'] || 'Visibles' });
    } else if (r.semilla_presencia === 'Sí') {
       checkSection('reproductivo', r, ['semilla_numero','semilla_tamano_largo','semilla_tamano_ancho','semilla_color']);
    }
    
    checkSection('compartido', c, ['estado_fenologico','estado_individuo','valor_ornamental','impacto_urbano']);
  }

  return missing;
};
