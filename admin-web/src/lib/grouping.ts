export const HABITO_GROUPS: Record<string, string[]> = {
  'Datos Dasométricos': [
    'altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular',
    'altura_inicio_copa', 'altura_inicio_ramificacion', 'longitud_visible',
    'altura_maxima', 'diametro_tallo', 'cobertura'
  ],
  'Raíces': [
    'raices_visibles'
  ],
  'Crecimiento y Soporte': [
    'tipo_crecimiento', 'tipo_soporte', 'forma_crecimiento', 'mecanismo_fijacion'
  ],
  'Tallo, Tronco y Ramificación': [
    'numero_tallos', 'numero_troncos', 'forma_tronco', 'corteza_externa',
    'lenticelas', 'color_corteza', 'olor_corteza', 'espinas_tronco',
    'tipo_ramificacion', 'tipo_tallo', 'tipo_tallo_liana', 'presencia_espinas',
    'forma_general', 'densidad_follaje', 'tipo_palmera', 'tallo', 'espinas_palmera',
    'forma_copa', 'densidad_copa'
  ],
  'Exudado': [
    'exudado_presencia', 'exudado_tipo', 'exudado_color'
  ],
  'Hojas': [
    'tipo_hoja', 'hoja_compuesta_tipo', 'disposicion_hoja', 'forma_hoja',
    'borde_hoja', 'textura_hoja', 'color_enves', 'pelos_hoja', 'tipo_peciolo',
    'longitud_peciolo', 'diametro_peciolo', 'peciolo_pulvino', 'segmentos',
    'hoja_largo', 'hoja_ancho', 'color_hoja'
  ]
};

export const REPRODUCTIVO_GROUPS: Record<string, string[]> = {
  'Flores e Inflorescencia': [
    'flor_presencia', 'flor_color', 'flor_tamano', 'flor_tamano_largo',
    'flor_tamano_ancho', 'flor_forma', 'flor_agrupacion', 'flor_olor',
    'inflorescencia_presencia', 'inflorescencia_posicion', 'inflorescencia_forma',
    'inflorescencia_espata'
  ],
  'Frutos': [
    'fruto_presencia', 'fruto_textura', 'fruto_estado_madurar', 'fruto_forma',
    'fruto_tamano', 'fruto_tamano_largo', 'fruto_tamano_ancho', 'fruto_color_maduro',
    'fruto_superficie', 'fruto_tipo'
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
