import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormArbolProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function FormArbol({ data, updateData }: FormArbolProps) {
  const setField = (section: string, field: string, value: any) => {
    updateData(section, field, value);
  };

  const getField = (section: string, field: string) => {
    return data[section]?.[field] || '';
  };

  return (
    <YStack gap="$4">
      {/* I. Datos dasométricos */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">I. Datos dasométricos</H4>
        
        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total (m)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 15"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>CAP (cm)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 50"
              value={getField('dasometria', 'cap')}
              onChangeText={(val) => setField('dasometria', 'cap', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Paralelo (m)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 5"
              value={getField('dasometria', 'diametro_copa_paralelo')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Perpend. (m)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 6"
              value={getField('dasometria', 'diametro_copa_perpendicular')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura inicio copa (m)</Label>
          <Input 
            keyboardType="numeric" 
            placeholder="Ej. 2"
            value={getField('dasometria', 'altura_inicio_copa')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_copa', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Raíces visibles</Label>
          <RadioSelect 
            options={['Sin raíces visibles', 'Raíces tablares', 'Raíces zancudas', 'Raíces superficiales', 'Raíces adventicias', 'Otro']}
            value={getField('dasometria', 'raices_visibles')}
            onChange={(val) => setField('dasometria', 'raices_visibles', val)}
          />
        </YStack>
      </Card>

      {/* II. Tronco y corteza */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tronco y corteza</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de troncos desde la base</Label>
          <Input 
            keyboardType="numeric" 
            placeholder="Ej. 1"
            value={getField('tronco', 'numero_troncos')}
            onChangeText={(val) => setField('tronco', 'numero_troncos', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma del tronco</Label>
          <RadioSelect 
            options={['Recto', 'Inclinado (izq/der/calle/casa)', 'Torcido', 'Otro']}
            value={getField('tronco', 'forma')}
            onChange={(val) => setField('tronco', 'forma', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Corteza externa</Label>
          <RadioSelect 
            options={['Lisa', 'Rugosa', 'Áspera', 'Agrietada', 'Estriada', 'Escamosa', 'Con placas', 'Laminar', 'Otro']}
            value={getField('tronco', 'corteza_externa')}
            onChange={(val) => setField('tronco', 'corteza_externa', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de corteza (Múltiple)</Label>
          <MultiSelect 
            options={['Gris', 'Marrón', 'Verde', 'Rojiza', 'Negruzca', 'Otro']}
            value={getField('tronco', 'color_corteza') || []}
            onChange={(val) => setField('tronco', 'color_corteza', val)}
          />
        </YStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Lenticelas</Label>
            <RadioSelect 
              options={['Con lenticelas', 'Sin lenticelas']}
              value={getField('tronco', 'lenticelas')}
              onChange={(val) => setField('tronco', 'lenticelas', val)}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Espinas</Label>
            <RadioSelect 
              options={['Con espinas', 'Sin espinas']}
              value={getField('tronco', 'espinas_tronco')}
              onChange={(val) => setField('tronco', 'espinas_tronco', val)}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor de corteza</Label>
          <RadioSelect 
            options={['Sin olor', 'Aromático', 'Cítrico', 'Resinoso', 'Desagradable', 'Otro']}
            value={getField('tronco', 'olor_corteza')}
            onChange={(val) => setField('tronco', 'olor_corteza', val)}
          />
        </YStack>
      </Card>

      {/* III. Exudado */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Exudado</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('exudado', 'presencia')}
            onChange={(val) => setField('exudado', 'presencia', val)}
          />
        </YStack>
        
        {getField('exudado', 'presencia') === 'Sí' && (
          <>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo</Label>
              <RadioSelect 
                options={['Savia', 'Látex', 'Resina', 'Goma']}
                value={getField('exudado', 'tipo')}
                onChange={(val) => setField('exudado', 'tipo', val)}
              />
            </YStack>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color al corte</Label>
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
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Ramificación y copa</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ramificación</Label>
          <RadioSelect 
            options={['Hacia arriba', 'Hélice', 'Colgantes', 'Irregulares', 'Otro']}
            value={getField('copa', 'tipo_ramificacion')}
            onChange={(val) => setField('copa', 'tipo_ramificacion', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma de copa</Label>
          <RadioSelect 
            options={['Redondeada', 'Alargada', 'Extendida', 'Tipo paraguas', 'Irregular', 'Otro']}
            value={getField('copa', 'forma_copa')}
            onChange={(val) => setField('copa', 'forma_copa', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Densidad de copa</Label>
          <RadioSelect 
            options={['Densa', 'Media', 'Rala']}
            value={getField('copa', 'densidad_copa')}
            onChange={(val) => setField('copa', 'densidad_copa', val)}
          />
        </YStack>
      </Card>

      {/* V. Hojas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Hojas</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>
          <RadioSelect 
            options={['Simple', 'Compuesta']}
            horizontal
            value={getField('hojas', 'tipo')}
            onChange={(val) => setField('hojas', 'tipo', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Disposición (Múltiple)</Label>
          <MultiSelect 
            options={['Alternas-dísticas', 'Alternas-espiraladas', 'Opuestas-dísticas', 'Opuestas-decusadas', 'Agrupadas al final', 'No agrupadas']}
            value={getField('hojas', 'disposicion_hoja') || []}
            onChange={(val) => setField('hojas', 'disposicion_hoja', val)}
          />
        </YStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>
            <RadioSelect 
              options={['Ovalada', 'Alargada', 'Redonda', 'Acorazonada', 'Palmada', 'Otro']}
              value={getField('hojas', 'forma_hoja')}
              onChange={(val) => setField('hojas', 'forma_hoja', val)}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Borde</Label>
            <RadioSelect 
              options={['Entero', 'Dentado', 'Ondulado', 'Otro']}
              value={getField('hojas', 'borde_hoja')}
              onChange={(val) => setField('hojas', 'borde_hoja', val)}
            />
          </YStack>
        </XStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>
            <RadioSelect 
              options={['Papirácea', 'Cartácea', 'Coriácea']}
              value={getField('hojas', 'textura_hoja')}
              onChange={(val) => setField('hojas', 'textura_hoja', val)}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del envés</Label>
            <RadioSelect 
              options={['Verde claro', 'Verde oscuro', 'Grisáceo', 'Marrón', 'Blanquecino', 'Otro']}
              value={getField('hojas', 'color_enves')}
              onChange={(val) => setField('hojas', 'color_enves', val)}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de pelos (Múltiple)</Label>
          <MultiSelect 
            options={['Sin pelos (haz)', 'Con pelos (haz)', 'Sin pelos (envés)', 'Con pelos (envés)']}
            value={getField('hojas', 'pelos_hoja') || []}
            onChange={(val) => setField('hojas', 'pelos_hoja', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de peciolo</Label>
          <RadioSelect 
            options={['Circular', 'Plano', 'Sésil']}
            value={getField('hojas', 'tipo_peciolo')}
            onChange={(val) => setField('hojas', 'tipo_peciolo', val)}
          />
        </YStack>

        {getField('hojas', 'tipo_peciolo') !== 'Sésil' && (
          <XStack gap="$3">
            <YStack flex={1} gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Longitud peciolo (cm)</Label>
              <Input 
                keyboardType="numeric" 
                placeholder="Ej. 2"
                value={getField('hojas', 'longitud_peciolo')}
                onChangeText={(val) => setField('hojas', 'longitud_peciolo', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
            <YStack flex={1} gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø peciolo (mm)</Label>
              <Input 
                keyboardType="numeric" 
                placeholder="Ej. 5"
                value={getField('hojas', 'diametro_peciolo')}
                onChangeText={(val) => setField('hojas', 'diametro_peciolo', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
          </XStack>
        )}

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Peciolo con pulvino</Label>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('hojas', 'peciolo_pulvino')}
            onChange={(val) => setField('hojas', 'peciolo_pulvino', val)}
          />
        </YStack>
      </Card>

    </YStack>
  );
}
