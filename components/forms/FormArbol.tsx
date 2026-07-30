import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormArbolProps {
  missingFields?: {id: string, label: string}[];
  registerRef?: (key: string, el: any) => void;
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormArbol({ data, updateData , registerRef, missingFields }: FormArbolProps) {
  const setField = (section: string, field: string, value: any) => {
    updateData(section, field, value);
  };

  const getField = (section: string, field: string) => {
    const val = data[section]?.[field];
    if (typeof val === 'number') return String(val);
    return val || '';
  };

  return (
    <YStack gap="$4" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.altura_total', el)}>
      {/* I. Datos dasométricos */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">I. Datos dasométricos</H4>
        
        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_total') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 15"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.cap', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>CAP (cm)</Label>{missingFields?.some(m => m.id === 'dasometria.cap') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 50"
              value={getField('dasometria', 'cap')}
              onChangeText={(val) => setField('dasometria', 'cap', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.diametro_copa_paralelo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa paralelo a la calle (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_paralelo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 5"
            value={getField('dasometria', 'diametro_copa_paralelo')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.diametro_copa_perpendicular', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa perpendicular a la calle (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_perpendicular') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 6"
            value={getField('dasometria', 'diametro_copa_perpendicular')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.altura_inicio_copa', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura de inicio de copa (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_inicio_copa') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 2"
            value={getField('dasometria', 'altura_inicio_copa')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_copa', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.raices_visibles', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Raíces visibles</Label>{missingFields?.some(m => m.id === 'dasometria.raices_visibles') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sin raíces visibles', 'Raíces tablares', 'Raíces zancudas', 'Raíces superficiales', 'Raíces adventicias', 'Otro']}
            value={getField('dasometria', 'raices_visibles')}
            onChange={(val) => setField('dasometria', 'raices_visibles', val)}
          />
        </YStack>
      </Card>

      {/* II. Tronco y corteza */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tronco y corteza</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.numero_troncos', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de troncos desde la base</Label>{missingFields?.some(m => m.id === 'tronco.numero_troncos') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 1"
            value={getField('tronco', 'numero_troncos')}
            onChangeText={(val) => setField('tronco', 'numero_troncos', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.forma', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma del tronco</Label>{missingFields?.some(m => m.id === 'tronco.forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Recto', 'Inclinado a la izquierda', 'Inclinado a la derecha', 'Inclinado hacia la calle', 'Inclinado hacia la casa', 'Torcido', 'Otro']}
            value={getField('tronco', 'forma')}
            onChange={(val) => setField('tronco', 'forma', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.corteza_externa', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Corteza externa</Label>{missingFields?.some(m => m.id === 'tronco.corteza_externa') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Lisa', 'Rugosa', 'Áspera', 'Agrietada', 'Estriada', 'Escamosa', 'Con placas', 'Laminar', 'Otro']}
            value={getField('tronco', 'corteza_externa')}
            onChange={(val) => setField('tronco', 'corteza_externa', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.color_corteza', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de corteza (Múltiple)</Label>{missingFields?.some(m => m.id === 'tronco.color_corteza') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Gris', 'Marrón', 'Verde', 'Rojiza', 'Negruzca', 'Otro']}
            value={getField('tronco', 'color_corteza') || []}
            onChange={(val) => setField('tronco', 'color_corteza', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.lenticelas', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Lenticelas</Label>{missingFields?.some(m => m.id === 'tronco.lenticelas') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Con lenticelas', 'Sin lenticelas']}
            value={getField('tronco', 'lenticelas')}
            onChange={(val) => setField('tronco', 'lenticelas', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.espinas_tronco', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Espinas</Label>{missingFields?.some(m => m.id === 'tronco.espinas_tronco') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Con espinas', 'Sin espinas']}
            value={getField('tronco', 'espinas_tronco')}
            onChange={(val) => setField('tronco', 'espinas_tronco', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tronco.olor_corteza', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor de corteza</Label>{missingFields?.some(m => m.id === 'tronco.olor_corteza') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sin olor', 'Aromático', 'Cítrico', 'Resinoso', 'Desagradable', 'Otro']}
            value={getField('tronco', 'olor_corteza')}
            onChange={(val) => setField('tronco', 'olor_corteza', val)}
          />
        </YStack>
      </Card>

      {/* III. Exudado */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Exudado</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('exudado.presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>{missingFields?.some(m => m.id === 'exudado.presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('exudado', 'presencia')}
            onChange={(val) => setField('exudado', 'presencia', val)}
          />
        </YStack>
        
        {getField('exudado', 'presencia') === 'Sí' && (
          <>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('exudado.tipo', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo</Label>{missingFields?.some(m => m.id === 'exudado.tipo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Savia', 'Látex', 'Resina', 'Goma']}
                value={getField('exudado', 'tipo')}
                onChange={(val) => setField('exudado', 'tipo', val)}
              />
            </YStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('exudado.color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color al corte</Label>{missingFields?.some(m => m.id === 'exudado.color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Incoloro', 'Blanco', 'Amarillo', 'Rojizo', 'Marrón', 'Otro']}
                value={getField('exudado', 'color')}
                onChange={(val) => setField('exudado', 'color', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* IV. Ramificación y copa */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Ramificación y copa</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('copa.tipo_ramificacion', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ramificación</Label>{missingFields?.some(m => m.id === 'copa.tipo_ramificacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Ramas hacia arriba', 'Ramas como hélice de helicóptero', 'Ramas colgantes', 'Ramas irregulares', 'Otro']}
            value={getField('copa', 'tipo_ramificacion')}
            onChange={(val) => setField('copa', 'tipo_ramificacion', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('copa.forma_copa', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma de copa</Label>{missingFields?.some(m => m.id === 'copa.forma_copa') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Redondeada', 'Alargada', 'Extendida', 'Tipo paraguas', 'Irregular', 'Otro']}
            value={getField('copa', 'forma_copa')}
            onChange={(val) => setField('copa', 'forma_copa', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('copa.densidad_copa', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Densidad de copa</Label>{missingFields?.some(m => m.id === 'copa.densidad_copa') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Densa', 'Media', 'Rala']}
            value={getField('copa', 'densidad_copa')}
            onChange={(val) => setField('copa', 'densidad_copa', val)}
          />
        </YStack>
      </Card>

      {/* V. Hojas */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Hojas</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.tipo_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>{missingFields?.some(m => m.id === 'hojas.tipo_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Simple', 'Compuesta']}
            horizontal
            value={getField('hojas', 'tipo_hoja')}
            onChange={(val) => setField('hojas', 'tipo_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.disposicion_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Disposición (Múltiple)</Label>{missingFields?.some(m => m.id === 'hojas.disposicion_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Alternas – dísticas', 'Alternas - espiraladas', 'Opuestas – dísticas', 'Opuestas - decusadas', 'Agrupadas al final de las ramas', 'No agrupadas al final de las ramas']}
            value={getField('hojas', 'disposicion_hoja') || []}
            onChange={(val) => setField('hojas', 'disposicion_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.forma_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'hojas.forma_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Ovalada', 'Alargada', 'Redonda', 'Acorazonada', 'Palmada', 'Otro']}
            value={getField('hojas', 'forma_hoja')}
            onChange={(val) => setField('hojas', 'forma_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.borde_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Borde</Label>{missingFields?.some(m => m.id === 'hojas.borde_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Entero', 'Dentado', 'Ondulado', 'Otro']}
            value={getField('hojas', 'borde_hoja')}
            onChange={(val) => setField('hojas', 'borde_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.color_enves', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del envés</Label>{missingFields?.some(m => m.id === 'hojas.color_enves') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Verde claro', 'Verde oscuro', 'Grisáceo', 'Marrón', 'Blanquecino', 'Otro']}
            value={getField('hojas', 'color_enves')}
            onChange={(val) => setField('hojas', 'color_enves', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.textura_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'hojas.textura_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Papirácea', 'Cartácea', 'Coriácea']}
            value={getField('hojas', 'textura_hoja')}
            onChange={(val) => setField('hojas', 'textura_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.pelos_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de pelos (Múltiple)</Label>{missingFields?.some(m => m.id === 'hojas.pelos_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Sin pelos (haz)', 'Con pelos (haz)', 'Sin pelos (envés)', 'Con pelos (envés)']}
            value={getField('hojas', 'pelos_hoja') || []}
            onChange={(val) => setField('hojas', 'pelos_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.tipo_peciolo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de peciolo</Label>{missingFields?.some(m => m.id === 'hojas.tipo_peciolo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Circular', 'Plano', 'Sésil']}
            value={getField('hojas', 'tipo_peciolo')}
            onChange={(val) => setField('hojas', 'tipo_peciolo', val)}
          />
        </YStack>

        {getField('hojas', 'tipo_peciolo') !== 'Sésil' && (
          <XStack gap="$3">
            <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('hojas.longitud_peciolo', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Longitud peciolo (cm)</Label>{missingFields?.some(m => m.id === 'hojas.longitud_peciolo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 2"
                value={getField('hojas', 'longitud_peciolo')}
                onChangeText={(val) => setField('hojas', 'longitud_peciolo', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
            <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('hojas.diametro_peciolo', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø peciolo (mm)</Label>{missingFields?.some(m => m.id === 'hojas.diametro_peciolo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 5"
                value={getField('hojas', 'diametro_peciolo')}
                onChangeText={(val) => setField('hojas', 'diametro_peciolo', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
          </XStack>
        )}

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.peciolo_pulvino', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Peciolo con pulvino</Label>{missingFields?.some(m => m.id === 'hojas.peciolo_pulvino') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('hojas', 'peciolo_pulvino')}
            onChange={(val) => setField('hojas', 'peciolo_pulvino', val)}
          />
        </YStack>
      </Card>

      {/* VI. Flores */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VI. Flores</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect options={['Con flores', 'Sin flores visibles']} horizontal value={getField('reproductivo', 'flor_presencia')} onChange={(val) => setField('reproductivo', 'flor_presencia', val)} />
        </YStack>
        {getField('reproductivo', 'flor_presencia') === 'Con flores' && (
          <YStack gap="$3">
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de pétalos</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Crema', 'Otro']} value={getField('reproductivo', 'flor_color')} onChange={(val) => setField('reproductivo', 'flor_color', val)} />
            </YStack>
            
            <XStack gap="$3">
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 2" value={getField('reproductivo', 'flor_tamano_largo')} onChangeText={(val) => setField('reproductivo', 'flor_tamano_largo', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 1" value={getField('reproductivo', 'flor_tamano_ancho')} onChangeText={(val) => setField('reproductivo', 'flor_tamano_ancho', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
            </XStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_agrupacion', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Agrupación</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_agrupacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Solitaria', 'En racimo', 'En manojo', 'En espiga', 'En cabezuela', 'Otro']} value={getField('reproductivo', 'flor_agrupacion')} onChange={(val) => setField('reproductivo', 'flor_agrupacion', val)} />
            </YStack>
            
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_olor', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_olor') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Sin olor', 'Aromático', 'Dulce', 'Desagradable', 'Otro']} value={getField('reproductivo', 'flor_olor')} onChange={(val) => setField('reproductivo', 'flor_olor', val)} />
            </YStack>
            
          </YStack>
        )}
      </Card>

      {/* VII. Frutos */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VII. Frutos</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect options={['Con frutos', 'Sin frutos visibles']} horizontal value={getField('reproductivo', 'fruto_presencia')} onChange={(val) => setField('reproductivo', 'fruto_presencia', val)} />
        </YStack>
        {getField('reproductivo', 'fruto_presencia') === 'Con frutos' && (
          <YStack gap="$3">
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_textura', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_textura') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Carnoso', 'Seco']} horizontal value={getField('reproductivo', 'fruto_textura')} onChange={(val) => setField('reproductivo', 'fruto_textura', val)} />
            </YStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_estado_madurar', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado al madurar</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_estado_madurar') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Entero', 'Se abre (partido)']} value={getField('reproductivo', 'fruto_estado_madurar')} onChange={(val) => setField('reproductivo', 'fruto_estado_madurar', val)} />
            </YStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Irregular', 'Otro']} value={getField('reproductivo', 'fruto_forma')} onChange={(val) => setField('reproductivo', 'fruto_forma', val)} />
            </YStack>
            
            <XStack gap="$3">
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 5" value={getField('reproductivo', 'fruto_tamano_largo')} onChangeText={(val) => setField('reproductivo', 'fruto_tamano_largo', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 4" value={getField('reproductivo', 'fruto_tamano_ancho')} onChangeText={(val) => setField('reproductivo', 'fruto_tamano_ancho', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
            </XStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_color_maduro', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del fruto maduro</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_color_maduro') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Verde', 'Amarillo', 'Rojo', 'Morado', 'Negro', 'Marrón', 'Crema', 'Otro']} value={getField('reproductivo', 'fruto_color_maduro')} onChange={(val) => setField('reproductivo', 'fruto_color_maduro', val)} />
            </YStack>
            
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_superficie', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Superficie</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_superficie') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Lisa', 'Rugosa', 'Espinosa', 'Con costillas', 'Otro']} value={getField('reproductivo', 'fruto_superficie')} onChange={(val) => setField('reproductivo', 'fruto_superficie', val)} />
            </YStack>
            
          </YStack>
        )}
      </Card>

      {/* VIII. Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VIII. Semillas</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia visible</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect options={['Sí', 'No']} horizontal value={getField('reproductivo', 'semilla_presencia')} onChange={(val) => setField('reproductivo', 'semilla_presencia', val)} />
        </YStack>
        {getField('reproductivo', 'semilla_presencia') === 'Sí' && (
          <YStack gap="$3">
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_numero', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas por fruto</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_numero') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 10" value={getField('reproductivo', 'semilla_numero')} onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
            </YStack>
            <XStack gap="$3">
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 1" value={getField('reproductivo', 'semilla_tamano_largo')} onChangeText={(val) => setField('reproductivo', 'semilla_tamano_largo', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
              <YStack gap="$2" flex={1} collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" keyboardType="numeric" placeholder="Ej. 0.5" value={getField('reproductivo', 'semilla_tamano_ancho')} onChangeText={(val) => setField('reproductivo', 'semilla_tamano_ancho', val)} borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }} />
              </YStack>
            </XStack>
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de cáscara</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect options={['Blanco', 'Crema', 'Marrón', 'Negro', 'Rojizo', 'Otro']} value={getField('reproductivo', 'semilla_color')} onChange={(val) => setField('reproductivo', 'semilla_color', val)} />
            </YStack>
            
          </YStack>
        )}
      </Card>

      {/* IX - XII. Estado e Impacto */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IX - XII. Estado e Impacto</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.estado_fenologico', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado Fenológico (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_fenologico') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Solo hojas', 'Con flores', 'Con frutos', 'Sin hojas']} 
            value={getField('compartido', 'estado_fenologico') || []} 
            onChange={(val) => setField('compartido', 'estado_fenologico', val)} 
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.estado_individuo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado del individuo (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_individuo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Podado', 'Enfermo', 'Con plagas visibles', 'Con daño mecánico']} 
            value={getField('compartido', 'estado_individuo') || []} 
            onChange={(val) => setField('compartido', 'estado_individuo', val)} 
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.valor_ornamental', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Valor ornamental (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.valor_ornamental') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Da sombra', 'Tiene flores vistosas', 'Tiene frutos vistosos', 'Tiene copa atractiva', 'Atrae fauna', 'Valor cultural', 'Valor alimenticio', 'Valor medicinal', 'Mejora el microclima', 'Otro']} 
            value={getField('compartido', 'valor_ornamental') || []} 
            onChange={(val) => setField('compartido', 'valor_ornamental', val)} 
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.impacto_urbano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Impacto Urbano (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.impacto_urbano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces rompen el piso', 'Raíces afectan veredas', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de ramas', 'Tronco inclinado (riesgo)', 'Otro']} 
            value={getField('compartido', 'impacto_urbano') || []} 
            onChange={(val) => setField('compartido', 'impacto_urbano', val)} 
          />
        </YStack>
      </Card>
    </YStack>
  );
}