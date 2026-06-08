const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configurar el cliente de Sanity
const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  useCdn: false,
  token: 'skj0NlMGYFoKnMN15KxRRk8gudv0HHc1SxLzIQ3ffHXuDgqi4XCAhYqJO8jDmuC7qTnkfSoDOjLeSpQyY1sujKOOs8UITOKfFJDD0AJXxqmvL9oBkCUEfcUwAGJ28sOBSr4HjvocX7wz1ZPtsS43FOc9M97h7kbnqnGeMcuqZlP23OILa17d',
  apiVersion: '2024-01-01',
});

// Helper para subir una imagen de Picsum
async function uploadMockImage(index) {
  try {
    const url = `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/800`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    
    console.log(`📸 Subiendo imagen ${index}...`);
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `mock_photo_${index}.jpg`
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }
}

async function uploadGallery() {
  const images = [];
  for (let i = 1; i <= 5; i++) {
    const img = await uploadMockImage(i);
    if (img) images.push(img);
  }
  return images;
}

const mockData = [
  // ==================== ÁRBOLES ====================
  {
    habito: 'Árbol',
    nombre_cientifico: 'Ficus benjamina',
    nombres_comunes: 'Ficus',
    familia: 'Moraceae',
    tipo_vida: 'Terrestre',
    arbol_datos: {
      altura_total: 12,
      cap: 120,
      diametro_copa_paralelo: 8,
      diametro_copa_perpendicular: 7,
      altura_inicio_copa: 3,
      raices_visibles: 'Superficiales',
      forma_tronco: 'Recto',
      corteza_externa: 'Lisa',
      lenticelas: 'Con lenticelas',
      color_corteza: ['Gris'],
      olor_corteza: 'Sin olor',
      tipo_hoja: 'Simple',
      forma_hoja: 'Ovalada'
    }
  },
  {
    habito: 'Árbol',
    nombre_cientifico: 'Tabebuia rosea',
    nombres_comunes: 'Apamate, Guayacán rosado',
    familia: 'Bignoniaceae',
    tipo_vida: 'Terrestre',
    arbol_datos: {
      altura_total: 15,
      cap: 150,
      diametro_copa_paralelo: 10,
      diametro_copa_perpendicular: 12,
      altura_inicio_copa: 4,
      raices_visibles: 'Sin raíces visibles',
      forma_tronco: 'Recto',
      corteza_externa: 'Agrietada',
      lenticelas: 'Sin lenticelas',
      color_corteza: ['Gris'],
      olor_corteza: 'Sin olor',
      tipo_hoja: 'Compuesta',
      forma_hoja: 'Ovalada'
    }
  },

  // ==================== PALMERAS ====================
  {
    habito: 'Palmera',
    nombre_cientifico: 'Roystonea regia',
    nombres_comunes: 'Palmera real',
    familia: 'Arecaceae',
    tipo_vida: 'Terrestre',
    palmera_datos: {
      altura_total: 20,
      cap: 180,
      numero_tallos: 'Un solo tallo',
      raices_visibles: 'Sin raíces',
      tipo_palmera: 'Arborescente',
      tallo: ['Liso', 'Anillos visibles'],
      tipo_hoja: 'Pluma (pinnada)',
      segmentos: ['Varios planos'],
      color_hoja: 'Verde oscuro'
    }
  },
  {
    habito: 'Palmera',
    nombre_cientifico: 'Cocos nucifera',
    nombres_comunes: 'Cocotero',
    familia: 'Arecaceae',
    tipo_vida: 'Terrestre',
    palmera_datos: {
      altura_total: 18,
      cap: 110,
      numero_tallos: 'Un solo tallo',
      raices_visibles: 'Adventicias',
      tipo_palmera: 'Arborescente',
      tallo: ['Anillos visibles'],
      tipo_hoja: 'Pluma (pinnada)',
      segmentos: ['Un plano'],
      color_hoja: 'Verde claro'
    }
  },

  // ==================== ARBUSTOS ====================
  {
    habito: 'Arbusto',
    nombre_cientifico: 'Bougainvillea glabra',
    nombres_comunes: 'Buganvilla',
    familia: 'Nyctaginaceae',
    tipo_vida: 'Terrestre',
    arbusto_datos: {
      altura_total: 3,
      numero_tallos: 'Varios tallos desde la base',
      forma_general: 'Irregular',
      densidad_follaje: 'Denso',
      tipo_tallo: 'Semileñoso',
      presencia_espinas: 'Con espinas',
      tipo_hoja: 'Simple',
      forma_hoja: 'Ovalada'
    }
  },
  {
    habito: 'Arbusto',
    nombre_cientifico: 'Hibiscus rosa-sinensis',
    nombres_comunes: 'Cucarda',
    familia: 'Malvaceae',
    tipo_vida: 'Terrestre',
    arbusto_datos: {
      altura_total: 2.5,
      numero_tallos: 'Varios tallos desde la base',
      forma_general: 'Redondeado',
      densidad_follaje: 'Medio',
      tipo_tallo: 'Leñoso',
      presencia_espinas: 'Sin espinas',
      tipo_hoja: 'Simple',
      forma_hoja: 'Ovalada'
    }
  },

  // ==================== LIANAS ====================
  {
    habito: 'Liana',
    nombre_cientifico: 'Allamanda cathartica',
    nombres_comunes: 'Campana amarilla',
    familia: 'Apocynaceae',
    tipo_vida: 'Terrestre',
    liana_datos: {
      longitud_visible: 6,
      tipo_soporte: 'Cerca',
      forma_crecimiento: 'Trepadora',
      mecanismo_fijacion: ['Enrollamiento'],
      tipo_hoja: 'Simple',
      forma_hoja: 'Alargada',
      presencia_espinas: 'Sin espinas'
    }
  },
  {
    habito: 'Liana',
    nombre_cientifico: 'Monstera deliciosa',
    nombres_comunes: 'Costilla de Adán',
    familia: 'Araceae',
    tipo_vida: 'Epífita',
    liana_datos: {
      longitud_visible: 4,
      tipo_soporte: 'Árbol',
      forma_crecimiento: 'Trepadora',
      mecanismo_fijacion: ['Raíces adherentes'],
      tipo_hoja: 'Simple',
      forma_hoja: 'Acorazonada',
      presencia_espinas: 'Sin espinas'
    }
  },

  // ==================== HIERBAS ====================
  {
    habito: 'Hierba',
    nombre_cientifico: 'Heliconia rostrata',
    nombres_comunes: 'Pico de loro',
    familia: 'Heliconiaceae',
    tipo_vida: 'Terrestre',
    hierba_datos: {
      altura_total: 180,
      cobertura: 150,
      numero_tallos: 'Varios',
      tipo_crecimiento: 'Formando mata',
      tipo_tallo: 'Herbáceo',
      tipo_hoja: 'Simple',
      forma_hoja: 'Alargada',
      olor_hoja: 'Sin olor',
      exudado_corte: 'No'
    }
  },
  {
    habito: 'Hierba',
    nombre_cientifico: 'Catharanthus roseus',
    nombres_comunes: 'Chabelita',
    familia: 'Apocynaceae',
    tipo_vida: 'Terrestre',
    hierba_datos: {
      altura_total: 40,
      cobertura: 30,
      numero_tallos: 'Varios',
      tipo_crecimiento: 'Erecta',
      tipo_tallo: 'Herbáceo',
      tipo_hoja: 'Simple',
      forma_hoja: 'Ovalada',
      olor_hoja: 'Sin olor',
      exudado_corte: 'Sí'
    }
  }
];

async function seed() {
  console.log("🌱 Iniciando seeder de plantas falsas...");
  
  for (let i = 0; i < mockData.length; i++) {
    const data = mockData[i];
    console.log(`\n===========================================`);
    console.log(`Creando registro ${i + 1}/10: ${data.nombre_cientifico} (${data.habito})`);
    
    // Subir 5 imágenes para la galería
    const galeria = await uploadGallery();

    const newDoc = {
      _type: 'planta',
      estado_revision: 'Validado',
      registrador_nombre: 'Usuario Seed',
      registrador_dni: '12345678',
      registrador_email: 'seed@ejemplo.com',
      latitud: -3.7491 + (Math.random() * 0.01),
      longitud: -73.2538 + (Math.random() * 0.01),
      distrito: 'Iquitos',
      direccion: `Calle Falsa ${Math.floor(Math.random() * 1000)}`,
      tipo_ubicacion_1: 'Calle',
      tipo_ubicacion_2: 'Vereda',
      numero_casa: `${Math.floor(Math.random() * 1000)}`,
      ubicacion_planta: 'Tierra',
      numero_planta: `${i + 1}`,
      ...data,
      galeria
    };

    try {
      const res = await client.create(newDoc);
      console.log(`✅ Registro creado exitosamente con ID: ${res._id}`);
    } catch (err) {
      console.error(`❌ Error creando registro:`, err.message);
    }
  }
  
  console.log("\n🎉 ¡Seeding completado!");
}

seed();
