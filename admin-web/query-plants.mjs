import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
});

async function main() {
  const plants = await client.fetch(`*[_type == "planta" && (!defined(registrador_nombre) || registrador_nombre == "")] { _id, nombre_cientifico, registrador_email, registrador_nombre }`);
  console.log('Plants without registrador_nombre:', plants.length);
  console.log(plants);
}

main().catch(console.error);
