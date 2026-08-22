const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  useCdn: false,
  token: process.env.EXPO_PUBLIC_SANITY_TOKEN || process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
});

async function cleanup() {
  console.log('Buscando registros sin imágenes (galeria vacía)...');
  try {
    const query = `*[_type == "planta" && registrador_nombre == "Usuario Seed" && (!defined(galeria) || length(galeria) == 0)]._id`;
    const ids = await client.fetch(query);
    console.log(`Encontrados ${ids.length} registros sin imágenes.`);

    for (const id of ids) {
      await client.delete(id);
      console.log(`✅ Eliminado: ${id}`);
    }
    console.log('Limpieza completada.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

cleanup();
