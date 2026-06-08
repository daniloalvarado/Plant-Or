const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  useCdn: false,
  token: 'skj0NlMGYFoKnMN15KxRRk8gudv0HHc1SxLzIQ3ffHXuDgqi4XCAhYqJO8jDmuC7qTnkfSoDOjLeSpQyY1sujKOOs8UITOKfFJDD0AJXxqmvL9oBkCUEfcUwAGJ28sOBSr4HjvocX7wz1ZPtsS43FOc9M97h7kbnqnGeMcuqZlP23OILa17d',
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
