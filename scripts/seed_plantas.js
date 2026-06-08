const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  useCdn: false,
  token: 'skj0NlMGYFoKnMN15KxRRk8gudv0HHc1SxLzIQ3ffHXuDgqi4XCAhYqJO8jDmuC7qTnkfSoDOjLeSpQyY1sujKOOs8UITOKfFJDD0AJXxqmvL9oBkCUEfcUwAGJ28sOBSr4HjvocX7wz1ZPtsS43FOc9M97h7kbnqnGeMcuqZlP23OILa17d',
  apiVersion: '2024-01-01',
});

// Unsplash plant photo IDs (real plant photos)
const plantPhotoIds = [
  'eXRTNo3gMlI', 'IFxjDdqK_0U', 'ybFBKFMArSo', 'c9OCWLka764', '2gYsZUmockw',
  'YnF5E5tQ6sM', 'WlYMXWysuE8', 'Z_wBN8lBkZI', 'RFP4D5hGTB0', '3yGzHSS5ZTs',
  'l3N9Q27zULw', 'oAr_fBvMqo8', 'vGgn0xLdy8s', '7TGVEgcTKlY', 'JuFcQxgCXwA',
  'KMn4VEeEPR8', 'q-motCAvPBM', 'Skv2MdoHQzc', 'NrDRFJFnMgs', 'uyfohHiTxho',
  'p7tai9P7TeI', '5Nbo3WbE_Yw', 'H9mFzA_8e38', 'JGX5szIW1bM', 'xEFoEPFfcr0',
  'c2TiSIrHTZs', '6_j5N9jxZ0E', 'GJ8ZQV7eGmU', 'N_Y88TWmGwA', 'mG28olYFgHI',
  '3nEl0HCFO04', 'bJjsKbRT_9I', 'UcOVn_dr6T4', 'zAhAUsR3YLY', '0pIC5pFnlUI',
  'TZCl81KVhBE', 'b5V3dZSaX2I', 'iPHm6BpOVSQ', 'vqDAUejnwKw', 'V4MBq8kue3U',
  'mDinBvAe1MU', 'vHnimCHnS1Y', 'pFqrjlKPZOE', 'tEMU4lzAL0w', 'e8Hl5VAlkBY',
  'YtHxAuX4lMI', 'NLSXFjl_nhc', 'nO7iU7csB_I', 'R0pnmbcszlE', 'wbm1CbQcO6g',
];

let photoIndex = 1;
function getNextPhotoId() {
  return photoIndex++;
}

async function uploadPlantImage(label) {
  try {
    const photoId = getNextPhotoId();
    const url = `https://loremflickr.com/800/800/plant,leaf?lock=${photoId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    console.log(`  📸 Subiendo foto de planta...`);
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `plant_${label}_${Date.now()}.jpg`,
      contentType: 'image/jpeg',
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error('  ⚠️  Error subiendo imagen:', err.message);
    return null;
  }
}

async function uploadGallery(label) {
  const images = [];
  for (let i = 0; i < 5; i++) {
    const img = await uploadPlantImage(`${label}_${i + 1}`);
    if (img) images.push(img);
  }
  return images;
}

// ── Campos compartidos de estado/impacto ──────────────────────────────────────
const SHARED = {
  estado_fenologico: ['Solo hojas', 'Con flores'],
  estado_individuo: ['Bueno'],
  valor_ornamental: ['Genera sombra', 'Tiene flores vistosas', 'Atrae fauna'],
  impacto_urbano: ['No genera daño'],
};

// ── 10 registros completos (2 por hábito) ────────────────────────────────────
const mockData = [

  // ── ÁRBOL 1 ──
  {
    habito: 'Árbol',
    nombre_cientifico: 'Swietenia macrophylla',
    nombres_comunes: 'Caoba',
    familia: 'Meliaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7430, longitud: -73.2480,
    distrito: 'Iquitos', direccion: 'Av. La Marina 320',
    tipo_ubicacion_1: 'Avenida', tipo_ubicacion_2: 'Vereda',
    numero_casa: '320', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '18', cap: '185', diametro_copa_paralelo: '10', diametro_copa_perpendicular: '11', altura_inicio_copa: '4', raices_visibles: 'Raíces tablares' },
    tronco: { numero_troncos: '1', forma: 'Recto', corteza_externa: 'Agrietada', color_corteza: ['Marrón', 'Gris'], lenticelas: 'Sin lenticelas', espinas_tronco: 'Sin espinas', olor_corteza: 'Sin olor' },
    exudado: { presencia: 'No' },
    copa: { tipo_ramificacion: 'Ramas hacia arriba', forma_copa: 'Redondeada', densidad_copa: 'Densa' },
    hojas: { tipo: 'Compuesta', disposicion_hoja: ['Alternas – dísticas'], forma_hoja: 'Ovalada', borde_hoja: 'Entero', textura_hoja: 'Coriácea', color_enves: 'Verde claro', pelos_hoja: ['Sin pelos (haz)', 'Sin pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '3', diametro_peciolo: '4', peciolo_pulvino: 'No' },
    reproductivo: { fruto_presencia: 'Con frutos', fruto_tipo: 'Cápsula', fruto_forma: 'Ovalado', fruto_superficie: 'Rugosa', fruto_tamano_largo: '12', fruto_tamano_ancho: '6', fruto_color_maduro: 'Marrón', semilla_numero: '6', semilla_tamano_largo: '5 cm', semilla_tamano_ancho: '1 cm' },
    ...SHARED,
  },

  // ── ÁRBOL 2 ──
  {
    habito: 'Árbol',
    nombre_cientifico: 'Cedrela odorata',
    nombres_comunes: 'Cedro rojo, Cedro colorado',
    familia: 'Meliaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7455, longitud: -73.2510,
    distrito: 'Iquitos', direccion: 'Jr. Próspero 210',
    tipo_ubicacion_1: 'Jirón', tipo_ubicacion_2: 'Vereda',
    numero_casa: '210', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '22', cap: '230', diametro_copa_paralelo: '14', diametro_copa_perpendicular: '13', altura_inicio_copa: '5', raices_visibles: 'Raíces tablares' },
    tronco: { numero_troncos: '1', forma: 'Recto', corteza_externa: 'Escamosa', color_corteza: ['Marrón'], lenticelas: 'Con lenticelas', espinas_tronco: 'Sin espinas', olor_corteza: 'Aromático' },
    exudado: { presencia: 'Sí', tipo: 'Resina', color: 'Marrón' },
    copa: { tipo_ramificacion: 'Ramas hacia arriba', forma_copa: 'Alargada', densidad_copa: 'Media' },
    hojas: { tipo: 'Compuesta', disposicion_hoja: ['Alternas – dísticas'], forma_hoja: 'Ovalada', borde_hoja: 'Entero', textura_hoja: 'Papirácea', color_enves: 'Verde claro', pelos_hoja: ['Sin pelos (haz)', 'Con pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '2', diametro_peciolo: '3', peciolo_pulvino: 'No' },
    reproductivo: { fruto_presencia: 'Con frutos', fruto_tipo: 'Cápsula', fruto_forma: 'Ovalado', fruto_superficie: 'Lisa', fruto_tamano_largo: '4', fruto_tamano_ancho: '3', fruto_color_maduro: 'Marrón', semilla_numero: '8', semilla_tamano_largo: '2 cm', semilla_tamano_ancho: '0.5 cm' },
    ...SHARED,
  },

  // ── PALMERA 1 ──
  {
    habito: 'Palmera',
    nombre_cientifico: 'Mauritia flexuosa',
    nombres_comunes: 'Aguaje, Moriche',
    familia: 'Arecaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7501, longitud: -73.2555,
    distrito: 'Iquitos', direccion: 'Calle Loreto 450',
    tipo_ubicacion_1: 'Calle', tipo_ubicacion_2: 'Vereda',
    numero_casa: '450', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '25', cap: '190', diametro_copa_paralelo: '8', diametro_copa_perpendicular: '8', altura_inicio_copa: '18', numero_tallos: 'Un solo tallo', raices_visibles: 'Raíces superficiales' },
    general: { tipo: 'Arborescente' },
    tallo: { caracteristicas: ['Con anillos visibles', 'Con fibras'] },
    hojas: { tipo: 'Tipo abanico (palmada)', segmentos: ['En varios planos', 'Rígidos'], hoja_largo: '3', hoja_ancho: '2', peciolo_largo: '1.5', peciolo_diametro: '4', color_hoja: 'Verde oscuro' },
    espinas: { espinas_palmera: ['En pecíolo'] },
    inflorescencia: { inflorescencia_presencia: 'Con inflorescencia', inflorescencia_posicion: ['Interfoliar (entre hojas)'], inflorescencia_forma: 'Colgante', inflorescencia_espata: 'Sí' },
    reproductivo: { fruto_presencia: 'Con frutos', fruto_tipo: 'Drupa', fruto_forma: 'Ovalado', fruto_superficie: 'Escamosa', fruto_tamano_largo: '5', fruto_tamano_ancho: '4', fruto_color_maduro: 'Rojo', semilla_numero: '1', semilla_tamano_largo: '3 cm', semilla_tamano_ancho: '3 cm' },
    ...SHARED,
  },

  // ── PALMERA 2 ──
  {
    habito: 'Palmera',
    nombre_cientifico: 'Euterpe precatoria',
    nombres_comunes: 'Huasaí, Açaí',
    familia: 'Arecaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7478, longitud: -73.2530,
    distrito: 'Iquitos', direccion: 'Av. Abelardo Quiñones 890',
    tipo_ubicacion_1: 'Avenida', tipo_ubicacion_2: 'Vereda',
    numero_casa: '890', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '15', cap: '80', diametro_copa_paralelo: '4', diametro_copa_perpendicular: '4', altura_inicio_copa: '10', numero_tallos: 'Un solo tallo', raices_visibles: 'Raíces zancudas' },
    general: { tipo: 'Arborescente' },
    tallo: { caracteristicas: ['Liso', 'Con anillos visibles'] },
    hojas: { tipo: 'Tipo pluma (pinnada)', segmentos: ['En un plano', 'Colgantes'], hoja_largo: '2.5', hoja_ancho: '1.2', peciolo_largo: '0.8', peciolo_diametro: '3', color_hoja: 'Verde oscuro' },
    espinas: { espinas_palmera: ['Ausentes'] },
    inflorescencia: { inflorescencia_presencia: 'Con inflorescencia', inflorescencia_posicion: ['Infrafoliar (debajo de hojas)'], inflorescencia_forma: 'Colgante', inflorescencia_espata: 'Sí' },
    reproductivo: { fruto_presencia: 'Con frutos', fruto_tipo: 'Drupa', fruto_forma: 'Redondo', fruto_superficie: 'Lisa', fruto_tamano_largo: '1', fruto_tamano_ancho: '1', fruto_color_maduro: 'Morado', semilla_numero: '1', semilla_tamano_largo: '8 mm', semilla_tamano_ancho: '8 mm' },
    ...SHARED,
  },

  // ── ARBUSTO 1 ──
  {
    habito: 'Arbusto',
    nombre_cientifico: 'Ixora coccinea',
    nombres_comunes: 'Ixora, Cruz de malta',
    familia: 'Rubiaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7462, longitud: -73.2495,
    distrito: 'Iquitos', direccion: 'Jr. Nauta 120',
    tipo_ubicacion_1: 'Jirón', tipo_ubicacion_2: 'Vereda',
    numero_casa: '120', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '1.5', numero_tallos: 'Varios tallos desde la base', raices_visibles: 'Sin raíces visibles' },
    tallo: { forma_general: 'Redondeado', densidad_follaje: 'Denso', tipo_tallo: 'Leñoso', presencia_espinas: 'Sin espinas' },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Opuestas – dísticas'], forma_hoja: 'Ovalada', borde_hoja: 'Entero', textura_hoja: 'Coriácea', color_enves: 'Verde claro', pelos_hoja: ['Sin pelos (haz)', 'Sin pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '0.5', diametro_peciolo: '2', peciolo_pulvino: 'No' },
    exudado: { presencia: 'No' },
    reproductivo: { flor_presencia: 'Con flores', flor_color: ['Rojo'], flor_forma: 'Tubular', fruto_presencia: 'Con frutos', fruto_tipo: 'Baya', fruto_forma: 'Redondo', fruto_superficie: 'Lisa', fruto_tamano_largo: '0.8', fruto_tamano_ancho: '0.8', fruto_color_maduro: 'Negro' },
    ...SHARED,
  },

  // ── ARBUSTO 2 ──
  {
    habito: 'Arbusto',
    nombre_cientifico: 'Acalypha wilkesiana',
    nombres_comunes: 'Acalifa, Coléus de jardín',
    familia: 'Euphorbiaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7488, longitud: -73.2518,
    distrito: 'Iquitos', direccion: 'Calle Condamine 55',
    tipo_ubicacion_1: 'Calle', tipo_ubicacion_2: 'Vereda',
    numero_casa: '55', ubicacion_planta: 'En macetero',
    dasometria: { altura_total: '2', numero_tallos: 'Varios tallos desde la base', raices_visibles: 'Sin raíces visibles' },
    tallo: { forma_general: 'Irregular', densidad_follaje: 'Denso', tipo_tallo: 'Semileñoso', presencia_espinas: 'Sin espinas' },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Alternas – dísticas'], forma_hoja: 'Ovalada', borde_hoja: 'Dentado', textura_hoja: 'Papirácea', color_enves: 'Marrón', pelos_hoja: ['Con pelos (haz)', 'Con pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '1', diametro_peciolo: '2', peciolo_pulvino: 'No' },
    exudado: { presencia: 'Sí', tipo: 'Látex', color: 'Incoloro' },
    reproductivo: { flor_presencia: 'Sin flores visibles', fruto_presencia: 'Sin frutos visibles' },
    ...SHARED,
  },

  // ── LIANA 1 ──
  {
    habito: 'Liana',
    nombre_cientifico: 'Passiflora edulis',
    nombres_comunes: 'Maracuyá, Granadilla',
    familia: 'Passifloraceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7510, longitud: -73.2570,
    distrito: 'Iquitos', direccion: 'Av. Grau 760',
    tipo_ubicacion_1: 'Avenida', tipo_ubicacion_2: 'Dentro del domicilio',
    numero_casa: '760', ubicacion_planta: 'En tierra',
    dasometria: { longitud_visible: '8', diametro_tallo: '2' },
    soporte: { tipo_soporte: 'Cerca', material_soporte: 'Metal' },
    tallo: { forma_crecimiento: 'Trepadora', tipo_tallo_liana: 'Herbáceo', presencia_espinas: 'Sin espinas', mecanismo_fijacion: ['Zarcillos'] },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Alternas – dísticas'], forma_hoja: 'Palmada', borde_hoja: 'Dentado', textura_hoja: 'Papirácea', color_enves: 'Verde claro', pelos_hoja: ['Sin pelos (haz)', 'Sin pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '3', diametro_peciolo: '2', peciolo_pulvino: 'Sí' },
    exudado: { presencia: 'No' },
    reproductivo: { flor_presencia: 'Con flores', flor_color: ['Blanco', 'Morado'], flor_forma: 'Estrellada', fruto_presencia: 'Con frutos', fruto_tipo: 'Baya', fruto_forma: 'Redondo', fruto_superficie: 'Lisa', fruto_tamano_largo: '8', fruto_tamano_ancho: '7', fruto_color_maduro: 'Amarillo' },
    ...SHARED,
  },

  // ── LIANA 2 ──
  {
    habito: 'Liana',
    nombre_cientifico: 'Petrea volubilis',
    nombres_comunes: 'Guirnalda azul, Corona de reina',
    familia: 'Verbenaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7440, longitud: -73.2465,
    distrito: 'Iquitos', direccion: 'Jr. Sargento Lores 340',
    tipo_ubicacion_1: 'Jirón', tipo_ubicacion_2: 'Vereda',
    numero_casa: '340', ubicacion_planta: 'En tierra',
    dasometria: { longitud_visible: '12', diametro_tallo: '4' },
    soporte: { tipo_soporte: 'Árbol', material_soporte: 'Madera' },
    tallo: { forma_crecimiento: 'Trepadora', tipo_tallo_liana: 'Leñoso', presencia_espinas: 'Sin espinas', mecanismo_fijacion: ['Enrollamiento'] },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Opuestas – dísticas'], forma_hoja: 'Ovalada', borde_hoja: 'Entero', textura_hoja: 'Cartácea', color_enves: 'Verde claro', pelos_hoja: ['Con pelos (haz)', 'Con pelos (envés)'], tipo_peciolo: 'Circular', longitud_peciolo: '1', diametro_peciolo: '2', peciolo_pulvino: 'No' },
    exudado: { presencia: 'No' },
    reproductivo: { flor_presencia: 'Con flores', flor_color: ['Morado'], flor_forma: 'En racimo', fruto_presencia: 'Sin frutos visibles' },
    ...SHARED,
  },

  // ── HIERBA 1 ──
  {
    habito: 'Hierba',
    nombre_cientifico: 'Strelitzia reginae',
    nombres_comunes: 'Ave del paraíso, Flor del pájaro',
    familia: 'Strelitziaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7468, longitud: -73.2503,
    distrito: 'Iquitos', direccion: 'Pasaje Los Jardines 15',
    tipo_ubicacion_1: 'Pasaje', tipo_ubicacion_2: 'Dentro del domicilio',
    numero_casa: '15', ubicacion_planta: 'En macetero',
    dasometria: { altura_total: '120', cobertura: '80', numero_tallos: 'Varios', tipo_crecimiento: 'Formando mata', tipo_tallo: 'Herbáceo' },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Alternas – dísticas'], forma_hoja: 'Alargada', borde_hoja: 'Entero', textura_hoja: 'Coriácea', color_enves: 'Verde oscuro', pelos_hoja: ['Sin pelos (haz)', 'Sin pelos (envés)'], olor_hoja: 'Sin olor', exudado_corte: 'No' },
    reproductivo: { flor_presencia: 'Con flores', flor_color: ['Anaranjado', 'Morado'], flor_forma: 'Irregular', fruto_presencia: 'Sin frutos visibles' },
    ...SHARED,
  },

  // ── HIERBA 2 ──
  {
    habito: 'Hierba',
    nombre_cientifico: 'Canna indica',
    nombres_comunes: 'Achira, Capacho',
    familia: 'Cannaceae',
    tipo_vida: 'Terrestre',
    latitud: -3.7422, longitud: -73.2450,
    distrito: 'Iquitos', direccion: 'Av. Coronel Portillo 1100',
    tipo_ubicacion_1: 'Avenida', tipo_ubicacion_2: 'Berma central',
    numero_casa: '1100', ubicacion_planta: 'En tierra',
    dasometria: { altura_total: '150', cobertura: '120', numero_tallos: 'Varios', tipo_crecimiento: 'Formando mata', tipo_tallo: 'Herbáceo' },
    hojas: { tipo: 'Simple', disposicion_hoja: ['Alternas – espiraladas'], forma_hoja: 'Ovalada', borde_hoja: 'Entero', textura_hoja: 'Papirácea', color_enves: 'Verde oscuro', pelos_hoja: ['Sin pelos (haz)', 'Sin pelos (envés)'], olor_hoja: 'Sin olor', exudado_corte: 'No' },
    reproductivo: { flor_presencia: 'Con flores', flor_color: ['Rojo', 'Amarillo'], flor_forma: 'Irregular', fruto_presencia: 'Con frutos', fruto_tipo: 'Cápsula', fruto_forma: 'Redondo', fruto_superficie: 'Rugosa', fruto_tamano_largo: '3', fruto_tamano_ancho: '3', fruto_color_maduro: 'Verde' },
    ...SHARED,
  },
];

async function deleteUserRecords() {
  console.log('\n🗑️  Buscando registros de Danilo Alvarado para eliminar...');
  try {
    const query = `*[_type == "planta" && (
      registrador_nombre match "Danilo*" ||
      registrador_email match "*danilo*" ||
      autor == "user_2xr" 
    )]._id`;
    const ids = await client.fetch(query);
    console.log(`   Encontrados ${ids.length} registros.`);
    for (const id of ids) {
      await client.delete(id);
      console.log(`   ✅ Eliminado: ${id}`);
    }
    console.log('   ✔ Limpieza completada.');
  } catch (err) {
    console.error('   ❌ Error eliminando:', err.message);
  }
}

async function seed() {
  console.log('🌱 Iniciando script de datos...\n');

  await deleteUserRecords();

  console.log('\n🌿 Creando 10 registros nuevos completos...');

  for (let i = 0; i < mockData.length; i++) {
    const data = mockData[i];
    console.log(`\n[${i + 1}/10] ${data.nombre_cientifico} (${data.habito})`);

    const galeria = await uploadGallery(data.nombre_cientifico.replace(/ /g, '_'));

    const { latitud, longitud, distrito, direccion, tipo_ubicacion_1, tipo_ubicacion_2, numero_casa, ubicacion_planta, ...botanicData } = data;

    const newDoc = {
      _type: 'planta',
      estado_revision: 'Validado',
      registrador_nombre: 'Usuario Seed',
      registrador_dni: '00000000',
      registrador_email: 'seed@plantorapp.com',
      numero_planta: `${i + 100}`,
      latitud, longitud, distrito, direccion,
      tipo_ubicacion_1, tipo_ubicacion_2,
      numero_casa, ubicacion_planta,
      ...botanicData,
      galeria,
    };

    try {
      const res = await client.create(newDoc);
      console.log(`   ✅ Creado con ID: ${res._id}`);
    } catch (err) {
      console.error(`   ❌ Error:`, err.message);
    }
  }

  console.log('\n🎉 ¡Seeding completado!');
}

seed();
