const fs = require('fs');
const path = 'c:/Users/Danilo/Desktop/Semestre 9/Taller de Software II/App de TS II/components/registro/useRegistroForm.ts';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('botanicState')) {
  content = content.replace(
    /import \{ checkIsOffline \} from '@\/lib\/network';/,
    "import { checkIsOffline } from '@/lib/network';\nimport { updateNamespacedBotanic, hydrateBotanicData, formatBotanicSubmitData, getActiveBotanicData } from '@/lib/botanicState';"
  );
}

const checkStep3Regex = /const botanicMissing = getMissingSections\(datosBotanicos\.habito, datosBotanicos\);/;
content = content.replace(checkStep3Regex, "const activeData = getActiveBotanicData(datosBotanicos);\n    const botanicMissing = getMissingSections(activeData.habito, activeData);");

const updateBotanicStart = content.indexOf('const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {');
const cleanupEnd = content.indexOf('};', content.indexOf('const cleanupBotanicData')) + 2;

if (updateBotanicStart !== -1 && cleanupEnd !== -1) {
  content = content.substring(0, updateBotanicStart) + 
  "const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {\n" +
  "    setDatosBotanicos((prev: any) => updateNamespacedBotanic(prev, sectionOrKey, fieldOrValue, nestedValue, numericFields));\n" +
  "  };\n" + 
  "  \n" +
  "  const cleanupBotanicData = (nuevoHabito: string) => {};\n" + 
  content.substring(cleanupEnd);
}

const submitDataStart = content.indexOf('// Reproductivo');
const submitDataEnd = content.indexOf('if (isOffline) {', submitDataStart);

if (submitDataStart !== -1 && submitDataEnd !== -1) {
  content = content.substring(0, submitDataStart) + 
  "// Formateo centralizado usando el nuevo helper de Namespacing\n" +
  "        const formattedSubmitData = formatBotanicSubmitData(datosBotanicos);\n" +
  "        nuevoRegistro.reproductivo = formattedSubmitData.reproductivo;\n" +
  "        nuevoRegistro.estado_fenologico = formattedSubmitData.compartido.estado_fenologico;\n" +
  "        nuevoRegistro.estado_individuo = formattedSubmitData.compartido.estado_individuo;\n" +
  "        nuevoRegistro.valor_ornamental = formattedSubmitData.compartido.valor_ornamental;\n" +
  "        nuevoRegistro.impacto_urbano = formattedSubmitData.compartido.impacto_urbano;\n" +
  "        \n" +
  "        Object.assign(nuevoRegistro, formattedSubmitData.specificData);\n" +
  "        \n" +
  "      " + content.substring(submitDataEnd);
}

const hydrateLoadStart = content.indexOf('setDatosBotanicos({');
const hydrateLoadEnd = content.indexOf('});', hydrateLoadStart) + 3;

if (hydrateLoadStart !== -1 && hydrateLoadEnd !== -1) {
  content = content.substring(0, hydrateLoadStart) + 
  "setDatosBotanicos(hydrateBotanicData(doc));" + 
  content.substring(hydrateLoadEnd);
}

const hydrateOfflineStart = content.indexOf('let rehydratedBotanic: any = {');
const hydrateOfflineEnd = content.indexOf('setDatosBotanicos(rehydratedBotanic);');

if (hydrateOfflineStart !== -1 && hydrateOfflineEnd !== -1) {
  content = content.substring(0, hydrateOfflineStart) + 
  "const rehydratedBotanic = hydrateBotanicData(data);\n          " + 
  content.substring(hydrateOfflineEnd);
}

fs.writeFileSync(path, content);
console.log('useRegistroForm updated successfully');
