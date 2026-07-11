export const updateNamespacedBotanic = (prev: any, sectionOrKey: string, fieldOrValue: any, nestedValue?: any, numericFields: string[] = []) => {
  let finalValue = nestedValue !== undefined ? nestedValue : fieldOrValue;
  const finalField = nestedValue !== undefined ? fieldOrValue : sectionOrKey;

  if (typeof finalValue === 'string' && numericFields.includes(finalField)) {
    finalValue = finalValue.replace(/[^0-9.]/g, '');
  }

  if (finalField === 'habito' || finalField === 'tipoVida') {
    return { ...prev, [finalField]: finalValue };
  }

  const activeHabit = prev.habito || '';
  if (!activeHabit) {
    return {
      ...prev,
      ...(nestedValue !== undefined 
        ? { [sectionOrKey]: { ...(prev[sectionOrKey] || {}), [finalField]: finalValue } }
        : { [finalField]: finalValue }
      )
    };
  }

  const habitKey = `data_${activeHabit}`;
  const habitData = prev[habitKey] || {};

  if (nestedValue !== undefined) {
    return {
      ...prev,
      [habitKey]: {
        ...habitData,
        [sectionOrKey]: {
          ...(habitData[sectionOrKey] || {}),
          [finalField]: finalValue
        }
      }
    };
  }

  return {
    ...prev,
    [habitKey]: {
      ...habitData,
      [finalField]: finalValue
    }
  };
};

export const getActiveBotanicData = (datosBotanicos: any) => {
  const activeHabit = datosBotanicos?.habito;
  if (!activeHabit) return datosBotanicos;

  const habitKey = `data_${activeHabit}`;
  return {
    ...(datosBotanicos[habitKey] || {}),
    habito: activeHabit,
    tipoVida: datosBotanicos.tipoVida
  };
};

export const parseNumbers = (obj: any) => {
  if (!obj) return {};
  const result = { ...obj };
  const numericKeys = ['altura_total', 'cap', 'diametro_copa_paralelo', 'diametro_copa_perpendicular', 'altura_inicio_copa', 'numero_troncos', 'longitud_peciolo', 'diametro_peciolo', 'longitud_visible', 'cobertura', 'semilla_numero', 'altura_inicio_ramificacion', 'altura_maxima', 'diametro_tallo', 'hoja_largo', 'hoja_ancho', 'peciolo_largo', 'peciolo_diametro'];
  for (let key in result) {
    if (numericKeys.includes(key)) {
      result[key] = Number(result[key]) || undefined;
    }
  }
  return result;
};

export const formatBotanicSubmitData = (datosBotanicos: any) => {
  const activeData = getActiveBotanicData(datosBotanicos) || {};
  const habito = activeData.habito;

  const reproductivo = parseNumbers(activeData.reproductivo || {});
  
  const compartido = {
    estado_fenologico: activeData.compartido?.estado_fenologico || [],
    estado_individuo: activeData.compartido?.estado_individuo || [],
    valor_ornamental: activeData.compartido?.valor_ornamental || [],
    impacto_urbano: activeData.compartido?.impacto_urbano || [],
  };

  let specificData: any = {};

  if (habito === 'Árbol') {
    specificData.arbol_datos = parseNumbers({
      ...activeData.dasometria,
      numero_troncos: activeData.tronco?.numero_troncos,
      forma_tronco: activeData.tronco?.forma,
      corteza_externa: activeData.tronco?.corteza_externa,
      lenticelas: activeData.tronco?.lenticelas,
      color_corteza: activeData.tronco?.color_corteza,
      olor_corteza: activeData.tronco?.olor_corteza,
      espinas_tronco: activeData.tronco?.espinas_tronco,
      exudado_presencia: activeData.exudado?.presencia,
      exudado_tipo: activeData.exudado?.tipo,
      exudado_color: activeData.exudado?.color,
      ...activeData.copa,
      tipo_hoja: activeData.hojas?.tipo,
      disposicion_hoja: activeData.hojas?.disposicion_hoja,
      forma_hoja: activeData.hojas?.forma_hoja,
      borde_hoja: activeData.hojas?.borde_hoja,
      textura_hoja: activeData.hojas?.textura_hoja,
      color_enves: activeData.hojas?.color_enves,
      pelos_hoja: activeData.hojas?.pelos_hoja,
      tipo_peciolo: activeData.hojas?.tipo_peciolo,
      longitud_peciolo: activeData.hojas?.longitud_peciolo,
      diametro_peciolo: activeData.hojas?.diametro_peciolo,
      peciolo_pulvino: activeData.hojas?.peciolo_pulvino,
    });
  } else if (habito === 'Palmera') {
    specificData.palmera_datos = parseNumbers({
      ...activeData.dasometria,
      tipo_palmera: activeData.general?.tipo,
      tallo: activeData.tallo?.caracteristicas,
      tipo_hoja: activeData.hojas?.tipo,
      segmentos: activeData.hojas?.segmentos,
      hoja_largo: activeData.hojas?.hoja_largo,
      hoja_ancho: activeData.hojas?.hoja_ancho,
      peciolo_largo: activeData.hojas?.peciolo_largo,
      peciolo_diametro: activeData.hojas?.peciolo_diametro,
      color_hoja: activeData.hojas?.color_hoja,
      espinas_palmera: activeData.espinas?.espinas_palmera,
      inflorescencia_presencia: activeData.inflorescencia?.inflorescencia_presencia,
      inflorescencia_posicion: activeData.inflorescencia?.inflorescencia_posicion,
      inflorescencia_forma: activeData.inflorescencia?.inflorescencia_forma,
      inflorescencia_espata: activeData.inflorescencia?.inflorescencia_espata,
    });
  } else if (habito === 'Arbusto') {
    specificData.arbusto_datos = parseNumbers({
      ...activeData.dasometria,
      ...activeData.tallo,
      tipo_hoja: activeData.hojas?.tipo_hoja,
      hoja_compuesta_tipo: activeData.hojas?.hoja_compuesta_tipo,
      forma_hoja: activeData.hojas?.forma_hoja,
      disposicion_hoja: activeData.hojas?.disposicion_hoja,
      borde_hoja: activeData.hojas?.borde_hoja,
      color_hoja: activeData.hojas?.color_hoja,
    });
  } else if (habito === 'Liana') {
    specificData.liana_datos = parseNumbers({
      ...activeData.dasometria,
      ...activeData.crecimiento,
      tipo_hoja: activeData.hojas?.tipo_hoja,
      hoja_compuesta_tipo: activeData.hojas?.hoja_compuesta_tipo,
      forma_hoja: activeData.hojas?.forma_hoja,
      disposicion_hoja: activeData.hojas?.disposicion_hoja,
      textura_hoja: activeData.hojas?.textura_hoja,
      borde_hoja: activeData.hojas?.borde_hoja,
      color_hoja: activeData.hojas?.color_hoja,
      tipo_tallo_liana: activeData.tallo?.tipo_tallo_liana,
      espinas_tallo: activeData.tallo?.espinas_tallo,
      exudado_presencia: activeData.exudado?.presencia,
      exudado_tipo: activeData.exudado?.tipo,
      exudado_color: activeData.exudado?.color,
    });
  } else if (habito === 'Hierba') {
    specificData.hierba_datos = parseNumbers({
      ...activeData.dasometria,
      ...activeData.crecimiento,
      tipo_hoja: activeData.hojas?.tipo_hoja,
      hoja_compuesta_tipo: activeData.hojas?.hoja_compuesta_tipo,
      forma_hoja: activeData.hojas?.forma_hoja,
      disposicion_hoja: activeData.hojas?.disposicion_hoja,
      borde_hoja: activeData.hojas?.borde_hoja,
      color_hoja: activeData.hojas?.color_hoja,
      textura_hoja: activeData.hojas?.textura_hoja,
      olor_hoja: activeData.hojas?.olor_hoja,
      exudado_corte: activeData.hojas?.exudado_corte,
    });
  }

  return { reproductivo, compartido, specificData };
};

export const hydrateBotanicData = (data: any) => {
  const h = data.habito;
  const source = data.arbol_datos || data.arbusto_datos || data.liana_datos || data.hierba_datos || data.palmera_datos || {};
  
  let rehydratedBotanic: any = {
    habito: h,
    tipoVida: data.tipo_vida,
  };

  const activeData: any = {
    reproductivo: {
      ...(data.reproductivo || {}),
      flor_tamano: data.reproductivo?.flor_tamano?.toString(),
      fruto_tamano: data.reproductivo?.fruto_tamano?.toString(),
      semilla_numero: data.reproductivo?.semilla_numero?.toString(),
      semilla_tamano: data.reproductivo?.semilla_tamano?.toString(),
      flor_tamano_largo: data.reproductivo?.flor_tamano_largo?.toString(),
      flor_tamano_ancho: data.reproductivo?.flor_tamano_ancho?.toString(),
      fruto_tamano_largo: data.reproductivo?.fruto_tamano_largo?.toString(),
      fruto_tamano_ancho: data.reproductivo?.fruto_tamano_ancho?.toString(),
      semilla_tamano_largo: data.reproductivo?.semilla_tamano_largo?.toString(),
      semilla_tamano_ancho: data.reproductivo?.semilla_tamano_ancho?.toString(),
    },
    compartido: {
      estado_fenologico: data.estado_fenologico || [],
      estado_individuo: data.estado_individuo || [],
      valor_ornamental: data.valor_ornamental || [],
      impacto_urbano: data.impacto_urbano || [],
    }
  };

  if (h === 'Árbol') {
    activeData.dasometria = { altura_total: source.altura_total?.toString(), cap: source.cap?.toString(), diametro_copa_paralelo: source.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: source.diametro_copa_perpendicular?.toString(), altura_inicio_copa: source.altura_inicio_copa?.toString(), raices_visibles: source.raices_visibles };
    activeData.tronco = { forma: source.forma_tronco, color_corteza: source.color_corteza, lenticelas: source.lenticelas, corteza_externa: source.corteza_externa, numero_troncos: source.numero_troncos?.toString(), espinas_tronco: source.espinas_tronco, olor_corteza: source.olor_corteza };
    activeData.exudado = { presencia: source.exudado_presencia, tipo: source.exudado_tipo, color: source.exudado_color };
    activeData.copa = { tipo_ramificacion: source.tipo_ramificacion, forma_copa: source.forma_copa, densidad_copa: source.densidad_copa };
    activeData.hojas = { tipo: source.tipo_hoja, disposicion_hoja: source.disposicion_hoja, forma_hoja: source.forma_hoja, borde_hoja: source.borde_hoja, textura_hoja: source.textura_hoja, color_enves: source.color_enves, pelos_hoja: source.pelos_hoja, tipo_peciolo: source.tipo_peciolo, longitud_peciolo: source.longitud_peciolo?.toString(), diametro_peciolo: source.diametro_peciolo?.toString(), peciolo_pulvino: source.peciolo_pulvino };
  } else if (h === 'Palmera') {
    activeData.dasometria = { altura_total: source.altura_total?.toString(), cap: source.cap?.toString(), diametro_copa_paralelo: source.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: source.diametro_copa_perpendicular?.toString(), altura_inicio_copa: source.altura_inicio_copa?.toString(), numero_tallos: source.numero_tallos, raices_visibles: source.raices_visibles };
    activeData.general = { tipo: source.tipo_palmera };
    activeData.tallo = { caracteristicas: source.tallo };
    activeData.hojas = { tipo: source.tipo_hoja, segmentos: source.segmentos, hoja_largo: source.hoja_largo?.toString(), hoja_ancho: source.hoja_ancho?.toString(), peciolo_largo: source.peciolo_largo?.toString(), peciolo_diametro: source.peciolo_diametro?.toString(), color_hoja: source.color_hoja };
    activeData.espinas = { espinas_palmera: source.espinas_palmera };
    activeData.inflorescencia = { inflorescencia_presencia: source.inflorescencia_presencia, inflorescencia_posicion: source.inflorescencia_posicion, inflorescencia_forma: source.inflorescencia_forma, inflorescencia_espata: source.inflorescencia_espata };
  } else if (h === 'Arbusto') {
    activeData.dasometria = { altura_total: source.altura_total?.toString(), diametro_copa_paralelo: source.diametro_copa_paralelo?.toString(), diametro_copa_perpendicular: source.diametro_copa_perpendicular?.toString(), altura_inicio_ramificacion: source.altura_inicio_ramificacion?.toString(), numero_tallos: source.numero_tallos, forma_general: source.forma_general, densidad_follaje: source.densidad_follaje };
    activeData.tallo = { tipo_ramificacion: source.tipo_ramificacion, tipo_tallo: source.tipo_tallo, presencia_espinas: source.presencia_espinas };
    activeData.hojas = { tipo_hoja: source.tipo_hoja, hoja_compuesta_tipo: source.hoja_compuesta_tipo, forma_hoja: source.forma_hoja, disposicion_hoja: source.disposicion_hoja, borde_hoja: source.borde_hoja, color_hoja: source.color_hoja };
  } else if (h === 'Liana') {
    activeData.dasometria = { longitud_visible: source.longitud_visible?.toString(), altura_maxima: source.altura_maxima?.toString(), diametro_tallo: source.diametro_tallo?.toString(), numero_tallos: source.numero_tallos };
    activeData.crecimiento = { tipo_soporte: source.tipo_soporte, forma_crecimiento: source.forma_crecimiento, mecanismo_fijacion: source.mecanismo_fijacion, presencia_espinas: source.presencia_espinas };
    activeData.tallo = { tipo_tallo_liana: source.tipo_tallo_liana, espinas_tallo: source.espinas_tallo };
    activeData.exudado = { presencia: source.exudado_presencia, tipo: source.exudado_tipo, color: source.exudado_color };
    activeData.hojas = { tipo_hoja: source.tipo_hoja, hoja_compuesta_tipo: source.hoja_compuesta_tipo, forma_hoja: source.forma_hoja, disposicion_hoja: source.disposicion_hoja, borde_hoja: source.borde_hoja, color_hoja: source.color_hoja, textura_hoja: source.textura_hoja };
  } else if (h === 'Hierba') {
    activeData.dasometria = { altura_total: source.altura_total?.toString(), cobertura: source.cobertura?.toString(), numero_tallos: source.numero_tallos };
    activeData.crecimiento = { tipo_crecimiento: source.tipo_crecimiento, tipo_tallo: source.tipo_tallo };
    activeData.hojas = { tipo_hoja: source.tipo_hoja, hoja_compuesta_tipo: source.hoja_compuesta_tipo, forma_hoja: source.forma_hoja, disposicion_hoja: source.disposicion_hoja, borde_hoja: source.borde_hoja, color_hoja: source.color_hoja, olor_hoja: source.olor_hoja, exudado_corte: source.exudado_corte, textura_hoja: source.textura_hoja };
  }

  rehydratedBotanic[`data_${h}`] = activeData;
  return rehydratedBotanic;
};
