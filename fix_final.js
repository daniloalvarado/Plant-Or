const fs = require('fs');
const path = 'c:/Users/Danilo/Desktop/Semestre 9/Taller de Software II/App de TS II/components/registro/useRegistroForm.ts';
let content = fs.readFileSync(path, 'utf8');

// The replacement deleted if (isOffline) {. Let's add it back right after Object.assign
content = content.replace(
  /Object\.assign\(nuevoRegistro, formattedSubmitData\.specificData\);\s+const localFruto/,
  "Object.assign(nuevoRegistro, formattedSubmitData.specificData);\n\n      if (isOffline) {\n        const localPlanta = await persistImage(fotos.planta_completa || '');\n        const localHoja = await persistImage(fotos.hoja || '');\n        const localFlor = await persistImage(fotos.flor || '');\n        const localFruto"
);

fs.writeFileSync(path, content);
console.log('Fixed useRegistroForm.ts if (isOffline) deletion');
