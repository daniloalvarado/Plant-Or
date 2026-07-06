import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormCompartidoProps {
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
  romanStartIndex?: number;
  registerRef?: (key: string, el: any) => void;
  missingFields?: { id: string; label: string }[];
}

export function FormCompartido({ data, updateData, romanStartIndex = 0, registerRef, missingFields }: FormCompartidoProps) {
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
        <H4 color="#1FC451">VI. Flores</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de flores</Label>
            {missingFields?.some(m => m.id === 'reproductivo.flor_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}
          </XStack>
          <RadioSelect 
            options={['Con flores', 'Sin flores visibles']}
            value={getField('reproductivo', 'flor_presencia')}
            onChange={(val) => setField('reproductivo', 'flor_presencia', val)}
          />
        </YStack>

        {getField('reproductivo', 'flor_presencia') === 'Con flores' && (
          <>
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de pétalos</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Crema', 'Otro']}
                value={getField('reproductivo', 'flor_color')}
                onChange={(val) => setField('reproductivo', 'flor_color', val)}
              />
            </YStack>

            <XStack gap="$3">
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo flor (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 5"
                  value={getField('reproductivo', 'flor_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'flor_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho flor (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 5"
                  value={getField('reproductivo', 'flor_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'flor_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_agrupacion', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Agrupación</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_agrupacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Solitaria', 'En racimo', 'En manojo', 'En espiga', 'En cabezuela', 'Otro']}
                value={getField('reproductivo', 'flor_agrupacion')}
                onChange={(val) => setField('reproductivo', 'flor_agrupacion', val)}
              />
            </YStack>
            
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_olor', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_olor') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
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
        <H4 color="#1FC451">VII. Frutos</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de frutos</Label>
            {missingFields?.some(m => m.id === 'reproductivo.fruto_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}
          </XStack>
          <RadioSelect 
            options={['Con frutos', 'Sin frutos visibles']}
            value={getField('reproductivo', 'fruto_presencia')}
            onChange={(val) => setField('reproductivo', 'fruto_presencia', val)}
          />
        </YStack>

        {getField('reproductivo', 'fruto_presencia') === 'Con frutos' && (
          <>
            <XStack gap="$3">
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_textura', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_textura') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <RadioSelect 
                  options={['Carnoso', 'Seco']}
                  value={getField('reproductivo', 'fruto_textura')}
                  onChange={(val) => setField('reproductivo', 'fruto_textura', val)}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_estado_madurar', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado al madurar</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_estado_madurar') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <RadioSelect 
                  options={['Entero', 'Se abre (partido)']}
                  value={getField('reproductivo', 'fruto_estado_madurar')}
                  onChange={(val) => setField('reproductivo', 'fruto_estado_madurar', val)}
                />
              </YStack>
            </XStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Irregular', 'Otro']}
                value={getField('reproductivo', 'fruto_forma')}
                onChange={(val) => setField('reproductivo', 'fruto_forma', val)}
              />
            </YStack>

            <XStack gap="$3">
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo fruto (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 10"
                  value={getField('reproductivo', 'fruto_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'fruto_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho fruto (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 8"
                  value={getField('reproductivo', 'fruto_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'fruto_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_color_maduro', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del fruto maduro</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_color_maduro') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Verde', 'Amarillo', 'Rojo', 'Morado', 'Negro', 'Marrón', 'Crema', 'Otro']}
                value={getField('reproductivo', 'fruto_color_maduro')}
                onChange={(val) => setField('reproductivo', 'fruto_color_maduro', val)}
              />
            </YStack>
            
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_superficie', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Superficie</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_superficie') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Lisa', 'Rugosa', 'Espinosa', 'Con costillas', 'Otro']}
                value={getField('reproductivo', 'fruto_superficie')}
                onChange={(val) => setField('reproductivo', 'fruto_superficie', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* SECCIÓN REPRODUCTIVA: Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VIII. Semillas</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia visible de semillas</Label>
            {missingFields?.some(m => m.id === 'reproductivo.semilla_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}
          </XStack>
          <RadioSelect 
            options={['Sí', 'No']}
            horizontal
            value={getField('reproductivo', 'semilla_presencia')}
            onChange={(val) => setField('reproductivo', 'semilla_presencia', val)}
          />
        </YStack>
        
        {getField('reproductivo', 'semilla_presencia') === 'Sí' && (
          <>
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_numero', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas (Aprox)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_numero') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 5"
                value={getField('reproductivo', 'semilla_numero')}
                onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
            <XStack gap="$3">
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo sem. (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 1"
                  value={getField('reproductivo', 'semilla_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'semilla_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho sem. (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  keyboardType="numeric" 
                  placeholder="Ej. 0.5"
                  value={getField('reproductivo', 'semilla_tamano_ancho')}
                  onChangeText={(val) => setField('reproductivo', 'semilla_tamano_ancho', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
            </XStack>
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color cáscara</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
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
        <H4 color="#1FC451">IX - XII. Estado e Impacto</H4>
        
        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_fenologico', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado Fenológico (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_fenologico') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Solo hojas', 'Con flores', 'Con frutos', 'Sin hojas']} 
            value={getField('compartido', 'estado_fenologico')} 
            onChange={(val) => setField('compartido', 'estado_fenologico', val)} 
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_individuo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Estado del individuo (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_individuo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Podado', 'Enfermo', 'Con plagas visibles', 'Con daño mecánico']} 
            value={getField('compartido', 'estado_individuo')} 
            onChange={(val) => setField('compartido', 'estado_individuo', val)} 
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.valor_ornamental', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Valor ornamental (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.valor_ornamental') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Da sombra', 'Tiene flores vistosas', 'Tiene frutos vistosos', 'Tiene copa atractiva', 'Atrae fauna', 'Valor cultural', 'Valor alimenticio', 'Valor medicinal', 'Mejora el microclima', 'Otro']} 
            value={getField('compartido', 'valor_ornamental')} 
            onChange={(val) => setField('compartido', 'valor_ornamental', val)} 
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.impacto_urbano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Impacto Urbano (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.impacto_urbano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces rompen el piso', 'Raíces afectan veredas', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de ramas', 'Tronco inclinado (riesgo)', 'Otro']} 
            value={getField('compartido', 'impacto_urbano')} 
            onChange={(val) => setField('compartido', 'impacto_urbano', val)} 
          />
        </YStack>
      </Card>
    </YStack>
  );
}
