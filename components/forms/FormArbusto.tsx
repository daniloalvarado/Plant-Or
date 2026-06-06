import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect } from './CustomSelectors';

interface FormArbustoProps {
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormArbusto({ data, updateData }: FormArbustoProps) {
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
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total aproximada (m)</Label>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 2"
            value={getField('dasometria', 'altura_total')}
            onChangeText={(val) => setField('dasometria', 'altura_total', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Paralelo (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 1.5"
              value={getField('dasometria', 'diametro_copa_paralelo')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø Copa Perpend. (m)</Label>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 1.5"
              value={getField('dasometria', 'diametro_copa_perpendicular')}
              onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura de inicio de ramificación (m)</Label>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 0.5"
            value={getField('dasometria', 'altura_inicio_ramificacion')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_ramificacion', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>
          <RadioSelect 
            options={['Un tallo principal', 'Varios tallos desde la base', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma general del arbusto</Label>
          <RadioSelect 
            options={['Redondeado', 'Compacto', 'Extendido', 'Irregular', 'Colgante', 'Otro']}
            value={getField('dasometria', 'forma_general')}
            onChange={(val) => setField('dasometria', 'forma_general', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Densidad del follaje</Label>
          <RadioSelect 
            options={['Denso', 'Medio', 'Ralo']}
            value={getField('dasometria', 'densidad_follaje')}
            onChange={(val) => setField('dasometria', 'densidad_follaje', val)}
          />
        </YStack>
      </Card>

      {/* II. Tallo y ramificación */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tallo y ramificación</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ramificación</Label>
          <RadioSelect 
            options={['Erecta', 'Abierta', 'Colgante', 'Irregular', 'Otro']}
            value={getField('tallo', 'tipo_ramificacion')}
            onChange={(val) => setField('tallo', 'tipo_ramificacion', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de tallo</Label>
          <RadioSelect 
            options={['Leñoso', 'Semileñoso', 'Flexible', 'Otro']}
            value={getField('tallo', 'tipo_tallo')}
            onChange={(val) => setField('tallo', 'tipo_tallo', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de espinas</Label>
          <RadioSelect 
            options={['Con espinas', 'Sin espinas']}
            value={getField('tallo', 'presencia_espinas')}
            onChange={(val) => setField('tallo', 'presencia_espinas', val)}
          />
        </YStack>
      </Card>

      {/* III. Hojas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Hojas</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>
          <RadioSelect 
            options={['Simple', 'Compuesta', 'Otro']}
            value={getField('hojas', 'tipo_hoja')}
            onChange={(val) => setField('hojas', 'tipo_hoja', val)}
          />
        </YStack>

        {getField('hojas', 'tipo_hoja') === 'Compuesta' && (
          <YStack gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Si es compuesta</Label>
            <RadioSelect 
              options={['Bifoliada', 'Trifoliada', 'Palmada', 'Pinnada', 'Bipinnada']}
              value={getField('hojas', 'hoja_compuesta_tipo')}
              onChange={(val) => setField('hojas', 'hoja_compuesta_tipo', val)}
            />
          </YStack>
        )}

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>
            <RadioSelect 
              options={['Ovalada', 'Alargada', 'Redonda', 'Lanceolada', 'Acorazonada', 'Otro']}
              value={getField('hojas', 'forma_hoja')}
              onChange={(val) => setField('hojas', 'forma_hoja', val)}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Disposición</Label>
            <RadioSelect 
              options={['Alternas', 'Opuestas', 'Otro']}
              value={getField('hojas', 'disposicion_hoja')}
              onChange={(val) => setField('hojas', 'disposicion_hoja', val)}
            />
          </YStack>
        </XStack>

        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Borde</Label>
            <RadioSelect 
              options={['Entero', 'Dentado', 'Ondulado', 'Otro']}
              value={getField('hojas', 'borde_hoja')}
              onChange={(val) => setField('hojas', 'borde_hoja', val)}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color</Label>
            <RadioSelect 
              options={['Verde claro', 'Verde oscuro', 'Variegado', 'Rojizo', 'Otro']}
              value={getField('hojas', 'color_hoja')}
              onChange={(val) => setField('hojas', 'color_hoja', val)}
            />
          </YStack>
        </XStack>
      </Card>

    </YStack>
  );
}
