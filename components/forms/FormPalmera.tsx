import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormPalmeraProps {
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormPalmera({ data, updateData }: FormPalmeraProps) {
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
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 10"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>CAP a 1.30m (cm)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 30"
              value={getField('dasometria', 'cap')}
              onChangeText={(val) => setField('dasometria', 'cap', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Paralelo (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 4"
              value={getField('dasometria', 'diametro_copa_paralelo')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Perpend. (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 4"
              value={getField('dasometria', 'diametro_copa_perpendicular')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura de inicio de copa (m)</Label>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 6"
            value={getField('dasometria', 'altura_inicio_copa')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_copa', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>
          <RadioSelect 
            options={['Un solo tallo', 'Varios tallos', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Raíces visibles</Label>
          <RadioSelect 
            options={['Sin raíces visibles', 'Superficiales', 'Zancudas', 'Soporte', 'Adventicias', 'Otro']}
            value={getField('dasometria', 'raices_visibles')}
            onChange={(val) => setField('dasometria', 'raices_visibles', val)}
          />
        </YStack>
      </Card>

      {/* II. Tipo de Palmera */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tipo de Palmera</H4>
        <YStack gap="$2">
          <RadioSelect 
            options={['Arborescente', 'Arbustiva', 'Lianescente', 'Sin tallo visible', 'Otro']}
            value={getField('general', 'tipo')}
            onChange={(val) => setField('general', 'tipo', val)}
          />
        </YStack>
      </Card>

      {/* III. Tallo (estípite) */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Tallo (estípite)</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Características (Múltiple)</Label>
          <MultiSelect 
            options={['Liso', 'Anillos visibles', 'Con fibras', 'Restos de hojas', 'Con espinas', 'Sin espinas', 'Otro']}
            value={getField('tallo', 'caracteristicas') || []}
            onChange={(val) => setField('tallo', 'caracteristicas', val)}
          />
        </YStack>
      </Card>

      {/* IV. Hojas (Carácter principal) */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Hojas</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>
          <RadioSelect 
            options={['Pluma (pinnada)', 'Abanico (palmada)', 'Simple entera', 'Simple bífida', 'Otro']}
            value={getField('hojas', 'tipo')}
            onChange={(val) => setField('hojas', 'tipo', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Segmentos (Múltiple)</Label>
          <MultiSelect 
            options={['Un plano', 'Varios planos', 'Rígidos', 'Colgantes', 'Otro']}
            value={getField('hojas', 'segmentos') || []}
            onChange={(val) => setField('hojas', 'segmentos', val)}
          />
        </YStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo hoja (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 2"
              value={getField('hojas', 'hoja_largo')}
              onChangeText={(val) => setField('hojas', 'hoja_largo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho hoja (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 1"
              value={getField('hojas', 'hoja_ancho')}
              onChangeText={(val) => setField('hojas', 'hoja_ancho', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo peciolo (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 0.5"
              value={getField('hojas', 'peciolo_largo')}
              onChangeText={(val) => setField('hojas', 'peciolo_largo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø peciolo (cm)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 5"
              value={getField('hojas', 'peciolo_diametro')}
              onChangeText={(val) => setField('hojas', 'peciolo_diametro', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color</Label>
          <RadioSelect 
            options={['Verde claro', 'Verde oscuro', 'Verde azulado', 'Amarillento', 'Otro']}
            value={getField('hojas', 'color_hoja')}
            onChange={(val) => setField('hojas', 'color_hoja', val)}
          />
        </YStack>
      </Card>

      {/* V. Espinas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Espinas (Múltiple)</H4>
        <MultiSelect 
          options={['Ausentes', 'En tallo', 'En pecíolo', 'En vaina', 'Otro']}
          value={getField('espinas', 'espinas_palmera') || []}
          onChange={(val) => setField('espinas', 'espinas_palmera', val)}
        />
      </Card>

      {/* VI. Inflorescencia */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VI. Inflorescencia</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
          <RadioSelect 
            options={['Con inflorescencia', 'Sin inflorescencia visible']}
            value={getField('inflorescencia', 'inflorescencia_presencia')}
            onChange={(val) => setField('inflorescencia', 'inflorescencia_presencia', val)}
          />
        </YStack>

        {getField('inflorescencia', 'inflorescencia_presencia') === 'Con inflorescencia' && (
          <>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Posición (Múltiple)</Label>
              <MultiSelect 
                options={['Interfoliar (entre hojas)', 'Infrafoliar (debajo de hojas)', 'Axilar', 'Apical', 'Otro']}
                value={getField('inflorescencia', 'inflorescencia_posicion') || []}
                onChange={(val) => setField('inflorescencia', 'inflorescencia_posicion', val)}
              />
            </YStack>
            
            <XStack gap="$3">
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>
                <RadioSelect 
                  options={['Erecta', 'Colgante', 'Otro']}
                  value={getField('inflorescencia', 'inflorescencia_forma')}
                  onChange={(val) => setField('inflorescencia', 'inflorescencia_forma', val)}
                />
              </YStack>
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de espata</Label>
                <RadioSelect 
                  options={['Sí', 'No']}
                  value={getField('inflorescencia', 'inflorescencia_espata')}
                  onChange={(val) => setField('inflorescencia', 'inflorescencia_espata', val)}
                />
              </YStack>
            </XStack>
          </>
        )}
      </Card>

    </YStack>
  );
}
