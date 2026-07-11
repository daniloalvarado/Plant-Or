const fs = require('fs');
const path = 'c:/Users/Danilo/Desktop/Semestre 9/Taller de Software II/App de TS II/components/registro/useRegistroForm.ts';
let content = fs.readFileSync(path, 'utf8');

// 1. Imports
if (!content.includes('import { getActiveBotanicData')) {
  content = content.replace(
    /import \{ checkIsOffline \} from '@\/lib\/network';/,
    "import { checkIsOffline } from '@/lib/network';\nimport { updateNamespacedBotanic, hydrateBotanicData, formatBotanicSubmitData, getActiveBotanicData } from '@/lib/botanicState';"
  );
}

// 2. checkStep3Valid
content = content.replace(
  /const botanicMissing = getMissingSections\(datosBotanicos\.habito, datosBotanicos\);/,
  "const activeData = getActiveBotanicData(datosBotanicos);\n    const botanicMissing = getMissingSections(activeData.habito, activeData);"
);

// 3. updateBotanic and cleanupBotanicData
const updateBotanicStart = content.indexOf('const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {');
const cleanupStart = content.indexOf('const cleanupBotanicData = (nuevoHabito: string) => {');
const nextFuncStart = content.indexOf('useFocusEffect(', cleanupStart);
if (updateBotanicStart !== -1 && cleanupStart !== -1 && nextFuncStart !== -1) {
  content = content.substring(0, updateBotanicStart) + 
  "const updateBotanic = (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => {\n" +
  "    setDatosBotanicos((prev: any) => updateNamespacedBotanic(prev, sectionOrKey, fieldOrValue, nestedValue, numericFields));\n" +
  "  };\n\n" +
  "  const cleanupBotanicData = (nuevoHabito: string) => {};\n\n  // Sync profile data on tab focus\n  " + 
  content.substring(nextFuncStart + 34);
}

// 4. formatBotanicSubmitData
const galeriaStart = content.indexOf('galeria: [],');
const isOfflineStart = content.indexOf('if (isOffline) {', galeriaStart);
if (galeriaStart !== -1 && isOfflineStart !== -1) {
  content = content.substring(0, galeriaStart + 12) + 
  "\n      };\n\n" +
  "      // Formateo centralizado usando el nuevo helper de Namespacing\n" +
  "      const formattedSubmitData = formatBotanicSubmitData(datosBotanicos);\n" +
  "      nuevoRegistro.reproductivo = formattedSubmitData.reproductivo;\n" +
  "      nuevoRegistro.estado_fenologico = formattedSubmitData.compartido.estado_fenologico;\n" +
  "      nuevoRegistro.estado_individuo = formattedSubmitData.compartido.estado_individuo;\n" +
  "      nuevoRegistro.valor_ornamental = formattedSubmitData.compartido.valor_ornamental;\n" +
  "      nuevoRegistro.impacto_urbano = formattedSubmitData.compartido.impacto_urbano;\n" +
  "      \n" +
  "      Object.assign(nuevoRegistro, formattedSubmitData.specificData);\n\n      " + 
  content.substring(isOfflineStart);
}

// 5. hydrateBotanicData (Edit Rehydration)
const editHydrateStart = content.indexOf('setDatosBotanicos({');
const editHydrateEnd = content.indexOf('});', editHydrateStart) + 3;
if (editHydrateStart !== -1 && editHydrateEnd !== -1) {
  content = content.substring(0, editHydrateStart) + 
  "setDatosBotanicos(hydrateBotanicData(doc));" + 
  content.substring(editHydrateEnd);
}

// 6. hydrateBotanicData (Offline Draft Rehydration)
const offlineHydrateStart = content.indexOf('let rehydratedBotanic: any = {');
const offlineHydrateEnd = content.indexOf('setDatosBotanicos(rehydratedBotanic);') + 37;
if (offlineHydrateStart !== -1 && offlineHydrateEnd !== -1) {
  content = content.substring(0, offlineHydrateStart) + 
  "setDatosBotanicos(hydrateBotanicData(data));\n          " + 
  content.substring(offlineHydrateEnd);
}

fs.writeFileSync(path, content);
console.log('useRegistroForm updated successfully via safe script');
