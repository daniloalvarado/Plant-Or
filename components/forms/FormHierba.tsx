import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormHierbaProps {
  missingFields?: {id: string, label: string}[];
  registerRef?: (key: string, el: any) => void;
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormHierba({ data, updateData , registerRef, missingFields }: FormHierbaProps) {
  const setField = (section: string, field: string, value: any) => {
    updateData(section, field, value);
  };

  const getField = (section: string, field: string) => {
    return data[section]?.[field] || '';
  };

  return (
    <YStack gap="$4" ref={(el) => registerRef && registerRef('dasometria.altura_total', el)}>
      {/* I. Datos dasométricos */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">I. Datos dasométricos</H4>
        
        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total (cm)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_total') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 40"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('dasometria.cobertura', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Cobertura Ø (cm)</Label>{missingFields?.some(m => m.id === 'dasometria.cobertura') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 60"
              value={getField('dasometria', 'cobertura')}
              onChangeText={(val) => setField('dasometria', 'cobertura', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.numero_tallos', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos visibles</Label>{missingFields?.some(m => m.id === 'dasometria.numero_tallos') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Uno', 'Varios', 'Muchos', 'Sin tallo visible', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>
      </Card>

      {/* II. Tipo de crecimiento */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tipo de crecimiento</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('crecimiento.tipo_crecimiento', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo crecimiento</Label>{missingFields?.some(m => m.id === 'crecimiento.tipo_crecimiento') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Erecta', 'Rastrera', 'Colgante', 'En roseta', 'Formando mata', 'Otro']}
            value={getField('crecimiento', 'tipo_crecimiento')}
            onChange={(val) => setField('crecimiento', 'tipo_crecimiento', val)}
          />
        </YStack>
      </Card>

      {/* III. Tipo de tallo */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Tipo de tallo</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('crecimiento.tipo_tallo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo tallo</Label>{missingFields?.some(m => m.id === 'crecimiento.tipo_tallo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Herbáceo', 'Carnoso', 'Hueco', 'Rastrero', 'Trepador', 'Sin tallo visible', 'Otro']}
            value={getField('crecimiento', 'tipo_tallo')}
            onChange={(val) => setField('crecimiento', 'tipo_tallo', val)}
          />
        </YStack>
      </Card>

      {/* IV. Hojas */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Hojas</H4>
        
        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.tipo_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>{missingFields?.some(m => m.id === 'hojas.tipo_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Simple', 'Compuesta', 'Otro']}
            value={getField('hojas', 'tipo_hoja')}
            onChange={(val) => setField('hojas', 'tipo_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.disposicion_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Disposición</Label>{missingFields?.some(m => m.id === 'hojas.disposicion_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Alternas dísticas', 'Alternas espiraladas', 'Opuestas dísticas', 'Opuestas decusadas', 'En roseta basal', 'Agrupadas', 'Otro']}
            value={getField('hojas', 'disposicion_hoja')}
            onChange={(val) => setField('hojas', 'disposicion_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.forma_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'hojas.forma_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Ovalada', 'Alargada', 'Redonda', 'Acorazonada', 'Lanceolada', 'Otro']}
            value={getField('hojas', 'forma_hoja')}
            onChange={(val) => setField('hojas', 'forma_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.color_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color</Label>{missingFields?.some(m => m.id === 'hojas.color_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Verde claro', 'Verde oscuro', 'Rojizo', 'Morado', 'Variegado', 'Otro']}
            value={getField('hojas', 'color_hoja')}
            onChange={(val) => setField('hojas', 'color_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.textura_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'hojas.textura_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Delgada', 'Carnosa', 'Áspera', 'Suave', 'Otro']}
            value={getField('hojas', 'textura_hoja')}
            onChange={(val) => setField('hojas', 'textura_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.olor_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Olor al estrujar</Label>{missingFields?.some(m => m.id === 'hojas.olor_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sin olor', 'Aromático', 'Cítrico', 'Desagradable', 'Otro']}
            value={getField('hojas', 'olor_hoja')}
            onChange={(val) => setField('hojas', 'olor_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.exudado_corte', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Exudado al corte</Label>{missingFields?.some(m => m.id === 'hojas.exudado_corte') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sí', 'No']}
            value={getField('hojas', 'exudado_corte')}
            onChange={(val) => setField('hojas', 'exudado_corte', val)}
          />
        </YStack>
      </Card>

      {/* V. Flores */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Flores</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
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
                options={['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Otro']}
                value={getField('reproductivo', 'flor_color')}
                onChange={(val) => setField('reproductivo', 'flor_color', val)}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_tamano', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tamaño de flor (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 5"
                value={getField('reproductivo', 'flor_tamano')}
                onChangeText={(val) => setField('reproductivo', 'flor_tamano', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.flor_agrupacion', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Agrupación</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_agrupacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Solitaria', 'En racimo', 'En ramillete', 'En espiga', 'En cabezuela', 'Otro']}
                value={getField('reproductivo', 'flor_agrupacion')}
                onChange={(val) => setField('reproductivo', 'flor_agrupacion', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* VI. Frutos */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VI. Frutos</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1">
            <Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>
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
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_textura', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_textura') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Carnoso', 'Seco', 'Otro']}
                value={getField('reproductivo', 'fruto_textura')}
                onChange={(val) => setField('reproductivo', 'fruto_textura', val)}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Irregular', 'Otro']}
                value={getField('reproductivo', 'fruto_forma')}
                onChange={(val) => setField('reproductivo', 'fruto_forma', val)}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_color_maduro', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del fruto maduro</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_color_maduro') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Verde', 'Amarillo', 'Rojo', 'Morado', 'Negro', 'Marrón', 'Otro']}
                value={getField('reproductivo', 'fruto_color_maduro')}
                onChange={(val) => setField('reproductivo', 'fruto_color_maduro', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* VII. Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VII. Semillas</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Visibles</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
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
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_numero') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                keyboardType="numeric" 
                placeholder="Ej. 1"
                value={getField('reproductivo', 'semilla_numero')}
                onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tamaño de semilla (mm o cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                placeholder="Ej. 1 cm"
                value={getField('reproductivo', 'semilla_tamano')}
                onChangeText={(val) => setField('reproductivo', 'semilla_tamano', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* VIII - XI. Estado e Impacto */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VIII - XI. Estado e Impacto</H4>
        
        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_fenologico', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>VIII. Estado Fenológico (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_fenologico') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Solo hojas', 'Con flores', 'Con frutos', 'Con flores y frutos', 'Secándose']}
            value={getField('compartido', 'estado_fenologico') || []}
            onChange={(val) => setField('compartido', 'estado_fenologico', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_individuo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>IX. Estado del individuo (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_individuo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Con plagas', 'Con daño']}
            value={getField('compartido', 'estado_individuo') || []}
            onChange={(val) => setField('compartido', 'estado_individuo', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.valor_ornamental', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>X. Valor Ornamental (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.valor_ornamental') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Flores vistosas', 'Hojas vistosas', 'Frutos vistosos', 'Cubre suelo', 'Forma bordes o jardines', 'Atrae fauna', 'Valor cultural', 'Valor alimenticio', 'Valor medicinal', 'Mejora el microclima', 'Otro']} 
            value={getField('compartido', 'valor_ornamental')} 
            onChange={(val) => setField('compartido', 'valor_ornamental', val)} 
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.impacto_urbano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>XI. Impacto Urbano (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.impacto_urbano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['No genera daño', 'Invade jardines', 'Invade veredas', 'Cubre drenajes', 'Dificulta mantenimiento', 'Puede ser resbalosa', 'Puede atraer plagas', 'Otro']} 
            value={getField('compartido', 'impacto_urbano')} 
            onChange={(val) => setField('compartido', 'impacto_urbano', val)} 
          />
        </YStack>
      </Card>

    </YStack>
  );
}
