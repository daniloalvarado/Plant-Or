export const GROUPS_ARBOL: Record<string, string[]> = {
  'Datos Dasométricos': ['altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_copa', 'raices_visibles'],
  'Tronco y Corteza': ['numero_troncos', 'forma_tronco', 'corteza_externa', 'lenticelas', 'color_corteza', 'olor_corteza', 'espinas_tronco'],
  'Exudado': ['exudado_presencia', 'exudado_tipo', 'exudado_color'],
  'Ramificación y Copa': ['tipo_ramificacion', 'forma_copa', 'densidad_copa'],
  'Hojas': ['tipo_hoja', 'disposicion_hoja', 'forma_hoja', 'borde_hoja', 'textura_hoja', 'color_enves', 'pelos_hoja', 'tipo_peciolo', 'longitud_peciolo', 'diametro_peciolo', 'peciolo_pulvino']
};

export const GROUPS_PALMERA: Record<string, string[]> = {
  'Datos Dasométricos': ['altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_copa', 'numero_tallos', 'raices_visibles'],
  'Tipo de Palmera': ['tipo_palmera'],
  'Tallo (estípite)': ['tallo'],
  'Hojas': ['tipo_hoja', 'segmentos', 'hoja_largo', 'hoja_ancho', 'peciolo_largo', 'peciolo_diametro', 'color_hoja'],
  'Espinas': ['espinas_palmera'],
};

export const GROUPS_ARBUSTO: Record<string, string[]> = {
  'Datos Dasométricos': ['altura_total', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_ramificacion', 'numero_tallos', 'forma_general', 'densidad_follaje'],
  'Tallo y Ramificación': ['tipo_ramificacion', 'tipo_tallo', 'presencia_espinas'],
  'Hojas': ['tipo_hoja', 'hoja_compuesta_tipo', 'forma_hoja', 'disposicion_hoja', 'borde_hoja', 'color_hoja']
};

export const GROUPS_LIANA: Record<string, string[]> = {
  'Datos Dasométricos': ['longitud_visible', 'altura_maxima', 'diametro_tallo', 'numero_tallos'],
  'Tipo de Soporte': ['tipo_soporte'],
  'Forma de Crecimiento': ['forma_crecimiento'],
  'Mecanismo de Fijación': ['mecanismo_fijacion'],
  'Tallo y Exudado': ['tipo_tallo_liana', 'espinas_tallo', 'exudado_presencia', 'exudado_tipo', 'exudado_color'],
  'Hojas': ['tipo_hoja', 'forma_hoja', 'disposicion_hoja', 'textura_hoja']
};

export const GROUPS_HIERBA: Record<string, string[]> = {
  'Datos Dasométricos': ['altura_total', 'cobertura', 'numero_tallos'],
  'Tipo de Crecimiento': ['tipo_crecimiento'],
  'Tipo de Tallo': ['tipo_tallo'],
  'Hojas': ['tipo_hoja', 'disposicion_hoja', 'forma_hoja', 'color_hoja', 'textura_hoja']
};

export const HABIT_GROUP_DICTIONARY: Record<string, Record<string, string[]>> = {
  'Árbol': GROUPS_ARBOL,
  'Palmera': GROUPS_PALMERA,
  'Arbusto': GROUPS_ARBUSTO,
  'Liana': GROUPS_LIANA,
  'Hierba': GROUPS_HIERBA,
};

export const REPRODUCTIVO_GROUPS: Record<string, string[]> = {
  'Flores e Inflorescencia': [
    'flor_presencia', 'flor_color', 'flor_tamano', 'flor_tamano_largo',
    'flor_tamano_ancho', 'flor_forma', 'flor_agrupacion', 'flor_olor',
    'inflorescencia_presencia', 'inflorescencia_posicion', 'inflorescencia_forma',
    'inflorescencia_espata'
  ],
  'Frutos': [
    'fruto_presencia', 'fruto_textura', 'fruto_estado_madurar', 'fruto_tipo', 'fruto_forma',
    'fruto_superficie', 'fruto_tamano', 'fruto_tamano_largo', 'fruto_tamano_ancho', 'fruto_color_maduro'
  ],
  'Semillas': [
    'semilla_presencia', 'semilla_numero', 'semilla_tamano',
    'semilla_tamano_largo', 'semilla_tamano_ancho', 'semilla_color'
  ]
};

// Helper function to group data based on a group definition
export const groupData = (data: Record<string, any>, groupDef: Record<string, string[]>) => {
  const grouped: Record<string, Record<string, any>> = {};
  const usedKeys = new Set<string>();

  // Assign to defined groups
  Object.entries(groupDef).forEach(([groupName, keys]) => {
    keys.forEach(key => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        if (!grouped[groupName]) grouped[groupName] = {};
        grouped[groupName][key] = data[key];
        usedKeys.add(key);
      }
    });
  });

  // Put remaining keys in an "Otros" group
  Object.keys(data).forEach(key => {
    if (!usedKeys.has(key) && !key.startsWith('_')) {
      if (!grouped['Otros Detalles']) grouped['Otros Detalles'] = {};
      grouped['Otros Detalles'][key] = data[key];
    }
  });

  return grouped;
};
