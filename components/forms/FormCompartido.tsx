import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormCompartidoProps {
  data: any;
  updateData: (key: string, value: any) => void;
}

export function FormCompartido({ data, updateData }: FormCompartidoProps) {
  const setField = (section: string, field: string, value: any) => {
    updateData(section, field, value);
  };

  const getField = (section: string, field: string) => {
    return data[section]?.[field] || '';
  };

  return (
    <YStack gap="$4">
      
      {/* SECCIÓN REPRODUCTIVA: Flores */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">Datos Reproductivos: Flores</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
          <RadioSelect 
            options={['Con flores', 'Sin flores visibles']}
            value={getField('reproductivo', 'flor_presencia')}
            onChange={(val) => setField('reproductivo', 'flor_presencia', val)}
          />
        </YStack>

        {getField('reproductivo', 'flor_presencia') === 'Con flores' && (
          <>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de pétalos</Label>
              <RadioSelect 
                options={['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Crema', 'Otro']}
                value={getField('reproductivo', 'flor_color')}
                onChange={(val) => setField('reproductivo', 'flor_color', val)}
              />
            </YStack>

            <XStack gap="$3">
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo flor (cm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 5"
                  value={getField('reproductivo', 'flor_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'flor_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho flor (cm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 5"
                  value={getField('reproductivo', 'flor_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'flor_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>

            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Agrupación</Label>
              <RadioSelect 
                options={['Solitaria', 'En racimo', 'En manojo', 'En espiga', 'En cabezuela', 'Otro']}
                value={getField('reproductivo', 'flor_agrupacion')}
                onChange={(val) => setField('reproductivo', 'flor_agrupacion', val)}
              />
            </YStack>
            
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor</Label>
              <RadioSelect 
                options={['Sin olor', 'Aromático', 'Dulce', 'Desagradable', 'Otro']}
                value={getField('reproductivo', 'flor_olor')}
                onChange={(val) => setField('reproductivo', 'flor_olor', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* SECCIÓN REPRODUCTIVA: Frutos */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">Datos Reproductivos: Frutos</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
          <RadioSelect 
            options={['Con frutos', 'Sin frutos visibles']}
            value={getField('reproductivo', 'fruto_presencia')}
            onChange={(val) => setField('reproductivo', 'fruto_presencia', val)}
          />
        </YStack>

        {getField('reproductivo', 'fruto_presencia') === 'Con frutos' && (
          <>
            <XStack gap="$3">
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>
                <RadioSelect 
                  options={['Carnoso', 'Seco']}
                  value={getField('reproductivo', 'fruto_textura')}
                  onChange={(val) => setField('reproductivo', 'fruto_textura', val)}
                />
              </YStack>
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado al madurar</Label>
                <RadioSelect 
                  options={['Entero', 'Se abre (partido)']}
                  value={getField('reproductivo', 'fruto_estado_madurar')}
                  onChange={(val) => setField('reproductivo', 'fruto_estado_madurar', val)}
                />
              </YStack>
            </XStack>

            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>
              <RadioSelect 
                options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Curvo', 'Irregular', 'Otro']}
                value={getField('reproductivo', 'fruto_forma')}
                onChange={(val) => setField('reproductivo', 'fruto_forma', val)}
              />
            </YStack>

            <XStack gap="$3">
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo fruto (cm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 10"
                  value={getField('reproductivo', 'fruto_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'fruto_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho fruto (cm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 8"
                  value={getField('reproductivo', 'fruto_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'fruto_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>

            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color maduro</Label>
              <RadioSelect 
                options={['Verde', 'Amarillo', 'Rojo', 'Anaranjado', 'Morado', 'Negro', 'Marrón', 'Crema', 'Otro']}
                value={getField('reproductivo', 'fruto_color')}
                onChange={(val) => setField('reproductivo', 'fruto_color', val)}
              />
            </YStack>
            
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Superficie</Label>
              <RadioSelect 
                options={['Lisa', 'Brillante', 'Opaca', 'Rugosa', 'Con estrías', 'Con surcos', 'Escamosa', 'Fibrosa', 'Espinosa', 'Aguijonosa', 'Verrugosa', 'Con costillas', 'Otro']}
                value={getField('reproductivo', 'fruto_superficie')}
                onChange={(val) => setField('reproductivo', 'fruto_superficie', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* SECCIÓN REPRODUCTIVA: Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">Datos Reproductivos: Semillas</H4>
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia visible</Label>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('reproductivo', 'semilla_presencia')}
            onChange={(val) => setField('reproductivo', 'semilla_presencia', val)}
          />
        </YStack>
        
        {getField('reproductivo', 'semilla_presencia') === 'Sí' && (
          <>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas (Aprox)</Label>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 5"
                value={getField('reproductivo', 'semilla_numero')}
                onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
            <XStack gap="$3">
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo sem. (cm/mm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 1"
                  value={getField('reproductivo', 'semilla_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'semilla_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2">
                <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho sem. (cm/mm)</Label>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 0.5"
                  value={getField('reproductivo', 'semilla_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'semilla_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>
            <YStack gap="$2">
              <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color cáscara</Label>
              <RadioSelect 
                options={['Blanco', 'Crema', 'Marrón', 'Negro', 'Rojizo', 'Otro']}
                value={getField('reproductivo', 'semilla_color')}
                onChange={(val) => setField('reproductivo', 'semilla_color', val)}
              />
            </YStack>
          </>
        )}
      </Card>


      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">Estado e Impacto</H4>
        
        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado Fenológico (Múltiple)</Label>
          <MultiSelect 
            options={['Vegetativo (solo hojas)', 'Con flores', 'Con frutos', 'Sin hojas']} 
            value={getField('compartido', 'estado_fenologico')} 
            onChange={(val) => setField('compartido', 'estado_fenologico', val)} 
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado del individuo (Múltiple)</Label>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Podado', 'Enfermo', 'Con plagas', 'Daño mecánico']} 
            value={getField('compartido', 'estado_individuo')} 
            onChange={(val) => setField('compartido', 'estado_individuo', val)} 
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Valor Ornamental (Múltiple)</Label>
          <MultiSelect 
            options={['Da sombra', 'Flores vistosas', 'Frutos vistosos', 'Copa atractiva', 'Atrae fauna', 'Valor cultural', 'Valor medicinal', 'Otro']} 
            value={getField('compartido', 'valor_ornamental')} 
            onChange={(val) => setField('compartido', 'valor_ornamental', val)} 
          />
        </YStack>

        <YStack gap="$2">
          <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Impacto Urbano (Múltiple)</Label>
          <MultiSelect 
            options={['No genera daño', 'Ensucia la vía', 'Obstruye desagüe', 'Raíces rompen piso', 'Afecta cimientos', 'Interfiere cableado', 'Riesgo de caída', 'Otro']} 
            value={getField('compartido', 'impacto_urbano')} 
            onChange={(val) => setField('compartido', 'impacto_urbano', val)} 
          />
        </YStack>
      </Card>
    </YStack>
  );
}
