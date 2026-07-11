const fs = require('fs');
const path = 'c:/Users/Danilo/Desktop/Semestre 9/Taller de Software II/App de TS II/components/registro/Step3Botany.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('getActiveBotanicData')) {
  content = content.replace(
    /import \{ FormCompartido \} from '@\/components\/forms\/FormCompartido';/,
    "import { FormCompartido } from '@/components/forms/FormCompartido';\nimport { getActiveBotanicData } from '@/lib/botanicState';"
  );
}

if (!content.includes('const activeData = getActiveBotanicData(datosBotanicos)')) {
  content = content.replace(
    /const \{([\s\S]*?)\} = form;/,
    "const {} = form;\n\n  const activeData = getActiveBotanicData(datosBotanicos);"
  );
}

content = content.replace(/<FormArbol data=\{datosBotanicos\}/g, '<FormArbol data={activeData}');
content = content.replace(/<FormPalmera data=\{datosBotanicos\}/g, '<FormPalmera data={activeData}');
content = content.replace(/<FormArbusto data=\{datosBotanicos\}/g, '<FormArbusto data={activeData}');
content = content.replace(/<FormLiana data=\{datosBotanicos\}/g, '<FormLiana data={activeData}');
content = content.replace(/<FormHierba data=\{datosBotanicos\}/g, '<FormHierba data={activeData}');
content = content.replace(/<FormCompartido data=\{datosBotanicos\}/g, '<FormCompartido data={activeData}');

fs.writeFileSync(path, content);
console.log('Step3Botany updated successfully');
