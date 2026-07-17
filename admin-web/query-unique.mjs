import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '9m09a5ng',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
});

async function main() {
  const plants = await client.fetch(`*[_type == "planta"] { registrador_email, registrador_nombre }`);
  
  const uniqueUsers = new Set();
  plants.forEach(p => {
    // Agrupamos como lo hace el exportador de Excel
    const key = p.registrador_email || p.registrador_nombre || 'Desconocido';
    uniqueUsers.add(key.toLowerCase().trim());
  });

  console.log(`\n======================================================`);
  console.log(`Total de plantas registradas en Sanity: ${plants.length}`);
  console.log(`Total de usuarios únicos que registraron plantas: ${uniqueUsers.size}`);
  console.log(`======================================================\n`);
}

main().catch(console.error);
