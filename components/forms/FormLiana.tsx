import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormLianaProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function FormLiana({ data, updateData }: FormLianaProps) {
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
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Longitud visible (m)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 5"
              value={getField('dasometria', 'longitud_visible')}
              onChangeText={(val) => setField('dasometria', 'longitud_visible', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura máxima (m)</Label>
            <Input 
              keyboardType="numeric" 
              placeholder="Ej. 10"
              value={getField('dasometria', 'altura_maxima')}
              onChangeText={(val) => setField('dasometria', 'altura_maxima', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro tallo principal (cm)</Label>
          <Input 
            keyboardType="numeric" 
            placeholder="Ej. 5"
            value={getField('dasometria', 'diametro_tallo')}
            onChangeText={(val) => setField('dasometria', 'diametro_tallo', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>
          <RadioSelect 
            options={['Un tallo principal', 'Varios tallos', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>
      </Card>

      {/* II. Tipo de soporte y forma de crecimiento */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Crecimiento y Soporte</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de soporte</Label>
          <RadioSelect 
            options={['Árbol', 'Arbusto', 'Cerca', 'Suelo', 'Múltiples', 'Otro']}
            value={getField('crecimiento', 'tipo_soporte')}
            onChange={(val) => setField('crecimiento', 'tipo_soporte', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma de crecimiento</Label>
          <RadioSelect 
            options={['Trepadora', 'Enredadera', 'Colgante', 'Rastrera', 'Escandente', 'Otro']}
            value={getField('crecimiento', 'forma_crecimiento')}
            onChange={(val) => setField('crecimiento', 'forma_crecimiento', val)}
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Mecanismo fijación (Múltiple)</Label>
          <MultiSelect 
            options={['Zarcillos', 'Raíces adherentes', 'Espinas/ganchos', 'Enrollamiento', 'No visible', 'Otro']}
            value={getField('crecimiento', 'mecanismo_fijacion') || []}
            onChange={(val) => setField('crecimiento', 'mecanismo_fijacion', val)}
          />
        </YStack>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de espinas</Label>
          <RadioSelect 
            options={['Con espinas', 'Sin espinas']}
            value={getField('crecimiento', 'presencia_espinas')}
            onChange={(val) => setField('crecimiento', 'presencia_espinas', val)}
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
