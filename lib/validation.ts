// src/lib/validation.ts (or app/lib/validation.ts)

const isFilled = (value: any) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
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
        !isFilled(reproductivo.fruto_color) ||
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
    if (!isFilled(exudado.tipo) || !isFilled(exudado.color)) return false;
  }

  // Copa
  if (!isFilled(copa.tipo_ramificacion) ||
      !isFilled(copa.forma_copa) ||
      !isFilled(copa.densidad_copa)) return false;

  // Hojas
  if (!isFilled(hojas.tipo) ||
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
  const general = datos.general || {};
  const tallo = datos.tallo || {};
  const hojas = datos.hojas || {};
  const espinas = datos.espinas || {};
  const inflorescencia = datos.inflorescencia || {};

  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.cap) ||
      !isFilled(dasometria.diametro_copa_paralelo) ||
      !isFilled(dasometria.diametro_copa_perpendicular) ||
      !isFilled(dasometria.altura_inicio_copa) ||
      !isFilled(dasometria.numero_tallos) ||
      !isFilled(dasometria.raices_visibles)) return false;

  if (!isFilled(general.tipo)) return false;
  
  if (!isFilled(tallo.caracteristicas)) return false;

  if (!isFilled(hojas.tipo) ||
      !isFilled(hojas.segmentos) ||
      !isFilled(hojas.hoja_largo) ||
      !isFilled(hojas.hoja_ancho) ||
      !isFilled(hojas.peciolo_largo) ||
      !isFilled(hojas.peciolo_diametro) ||
      !isFilled(hojas.color_hoja)) return false;

  if (!isFilled(espinas.espinas_palmera)) return false;

  if (!isFilled(inflorescencia.inflorescencia_presencia)) return false;
  if (inflorescencia.inflorescencia_presencia === 'Con inflorescencia') {
    if (!isFilled(inflorescencia.inflorescencia_posicion) ||
        !isFilled(inflorescencia.inflorescencia_forma) ||
        !isFilled(inflorescencia.inflorescencia_espata)) return false;
  }

  return validateCompartido(datos);
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

  return validateCompartido(datos);
};

export const validateLiana = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const crecimiento = datos.crecimiento || {};
  const hojas = datos.hojas || {};

  if (!isFilled(dasometria.longitud_visible) ||
      !isFilled(dasometria.altura_maxima) ||
      !isFilled(dasometria.diametro_tallo) ||
      !isFilled(dasometria.numero_tallos)) return false;

  if (!isFilled(crecimiento.tipo_soporte) ||
      !isFilled(crecimiento.forma_crecimiento) ||
      !isFilled(crecimiento.mecanismo_fijacion) ||
      !isFilled(crecimiento.presencia_espinas)) return false;

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.borde_hoja) ||
      !isFilled(hojas.color_hoja)) return false;

  if (hojas.tipo_hoja === 'Compuesta' && !isFilled(hojas.hoja_compuesta_tipo)) return false;

  return validateCompartido(datos);
};

export const validateHierba = (datos: any) => {
  const dasometria = datos.dasometria || {};
  const crecimiento = datos.crecimiento || {};
  const hojas = datos.hojas || {};

  if (!isFilled(dasometria.altura_total) ||
      !isFilled(dasometria.cobertura) ||
      !isFilled(dasometria.numero_tallos)) return false;

  if (!isFilled(crecimiento.tipo_crecimiento) ||
      !isFilled(crecimiento.tipo_tallo) ||
      !isFilled(crecimiento.exudado_corte)) return false;

  if (!isFilled(hojas.tipo_hoja) ||
      !isFilled(hojas.forma_hoja) ||
      !isFilled(hojas.disposicion_hoja) ||
      !isFilled(hojas.borde_hoja) ||
      !isFilled(hojas.color_hoja) ||
      !isFilled(hojas.olor_hoja)) return false;

  if (hojas.tipo_hoja === 'Compuesta' && !isFilled(hojas.hoja_compuesta_tipo)) return false;

  return validateCompartido(datos);
};
