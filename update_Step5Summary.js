const fs = require('fs');
const path = 'c:/Users/Danilo/Desktop/Semestre 9/Taller de Software II/App de TS II/components/registro/Step5Summary.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('getActiveBotanicData')) {
  content = content.replace(
    /import MapView, \{ Marker \} from 'react-native-maps';/,
    "import MapView, { Marker } from 'react-native-maps';\nimport { getActiveBotanicData } from '@/lib/botanicState';"
  );
}

if (!content.includes('const activeData = getActiveBotanicData(datosBotanicos)')) {
  content = content.replace(
    /const \{([\s\S]*?)\} = form;/,
    "const {} = form;\n\n  const activeData = getActiveBotanicData(datosBotanicos);"
  );
}

content = content.replace(/const val = \(datosBotanicos\[dataObj\] as any\)\?\.\[key\];/g, "const val = (activeData[dataObj] as any)?.[key];");
content = content.replace(/datosBotanicos\?\.habito/g, "activeData?.habito");
content = content.replace(/datosBotanicos\?\.tipoVida/g, "activeData?.tipoVida");
// FilteredImpacto uses datosBotanicos
content = content.replace(/const val = \(\(datosBotanicos\[dataObj\] as any\)\?\.\[key\] as string\[\]\) \|\| \[\];/g, "const val = ((activeData[dataObj] as any)?.[key] as string[]) || [];");

fs.writeFileSync(path, content);
console.log('Step5Summary updated successfully');
