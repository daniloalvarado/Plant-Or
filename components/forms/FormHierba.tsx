import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect } from './CustomSelectors';

interface FormHierbaProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function FormHierba({ data, updateData }: FormHierbaProps) {
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
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total (cm)</Label>
            <Input cursorColor="#ffffff" selectionColor="#1FC451" 
              keyboardType="numeric" 
              placeholder="Ej. 40"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Cobertura Ø (cm)</Label>
            <Input cursorColor="#ffffff" selectionColor="#1FC451" 
              keyboardType="numeric" 
              placeholder="Ej. 60"
              value={getField('dasometria', 'cobertura')}
              onChangeText={(val) => setField('dasometria', 'cobertura', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>
          <RadioSelect 
            options={['Uno', 'Varios', 'Muchos', 'Sin tallo visible', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>
      </Card>

      {/* II. Crecimiento y tallo */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Crecimiento y tallo</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo crecimiento</Label>
          <RadioSelect 
            options={['Erecta', 'Rastrera', 'Colgante', 'En roseta', 'Formando mata', 'Otro']}
            value={getField('crecimiento', 'tipo_crecimiento')}
            onChange={(val) => setField('crecimiento', 'tipo_crecimiento', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo tallo</Label>
          <RadioSelect 
            options={['Herbáceo', 'Carnoso', 'Hueco', 'Rastrero', 'Trepador', 'Sin tallo', 'Otro']}
            value={getField('crecimiento', 'tipo_tallo')}
            onChange={(val) => setField('crecimiento', 'tipo_tallo', val)}
          />
        </YStack>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Exudado al corte</Label>
          <RadioSelect 
            options={['Sí', 'No']}
            value={getField('crecimiento', 'exudado_corte')}
            onChange={(val) => setField('crecimiento', 'exudado_corte', val)}
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
              options={['Alternas', 'Opuestas', 'En roseta', 'Otro']}
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
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor al estrujar</Label>
          <RadioSelect 
            options={['Sin olor', 'Aromático', 'Cítrico', 'Desagradable', 'Otro']}
            value={getField('hojas', 'olor_hoja')}
            onChange={(val) => setField('hojas', 'olor_hoja', val)}
          />
        </YStack>
      </Card>
    </YStack>
  );
}
