import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormArbustoProps {
  missingFields?: {id: string, label: string}[];
  registerRef?: (key: string, el: any) => void;
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormArbusto({ data, updateData , registerRef, missingFields }: FormArbustoProps) {
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
        
        <YStack gap="$2">
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total aproximada (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_total') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 2"
            value={getField('dasometria', 'altura_total')}
            onChangeText={(val) => setField('dasometria', 'altura_total', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.diametro_copa_paralelo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa paralelo (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_paralelo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 5"
            value={getField('dasometria', 'diametro_copa_paralelo')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.diametro_copa_perpendicular', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa perpendicular (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_perpendicular') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 6"
            value={getField('dasometria', 'diametro_copa_perpendicular')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.altura_inicio_ramificacion', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura de inicio de ramificación (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_inicio_ramificacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 0.5"
            value={getField('dasometria', 'altura_inicio_ramificacion')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_ramificacion', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.numero_tallos', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>{missingFields?.some(m => m.id === 'dasometria.numero_tallos') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Un tallo principal', 'Varios tallos desde la base', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.forma_general', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma general del arbusto</Label>{missingFields?.some(m => m.id === 'dasometria.forma_general') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Redondeado', 'Compacto', 'Extendido', 'Irregular', 'Colgante', 'Otro']}
            value={getField('dasometria', 'forma_general')}
            onChange={(val) => setField('dasometria', 'forma_general', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('dasometria.densidad_follaje', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Densidad del follaje</Label>{missingFields?.some(m => m.id === 'dasometria.densidad_follaje') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Denso', 'Medio', 'Ralo']}
            value={getField('dasometria', 'densidad_follaje')}
            onChange={(val) => setField('dasometria', 'densidad_follaje', val)}
          />
        </YStack>
      </Card>

      {/* II. Tallo y ramificación */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tallo y ramificación</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tallo.tipo_ramificacion', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de ramificación</Label>{missingFields?.some(m => m.id === 'tallo.tipo_ramificacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Erecta', 'Abierta', 'Colgante', 'Irregular', 'Otro']}
            value={getField('tallo', 'tipo_ramificacion')}
            onChange={(val) => setField('tallo', 'tipo_ramificacion', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tallo.tipo_tallo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de tallo</Label>{missingFields?.some(m => m.id === 'tallo.tipo_tallo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Leñoso', 'Semileñoso', 'Flexible', 'Otro']}
            value={getField('tallo', 'tipo_tallo')}
            onChange={(val) => setField('tallo', 'tipo_tallo', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('tallo.presencia_espinas', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de espinas</Label>{missingFields?.some(m => m.id === 'tallo.presencia_espinas') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Con espinas', 'Sin espinas']}
            value={getField('tallo', 'presencia_espinas')}
            onChange={(val) => setField('tallo', 'presencia_espinas', val)}
          />
        </YStack>
      </Card>

      {/* III. Hojas */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Hojas</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.tipo_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>{missingFields?.some(m => m.id === 'hojas.tipo_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Simple', 'Compuesta', 'Otro']}
            value={getField('hojas', 'tipo_hoja')}
            onChange={(val) => setField('hojas', 'tipo_hoja', val)}
          />
        </YStack>

        {getField('hojas', 'tipo_hoja') === 'Compuesta' && (
          <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.hoja_compuesta_tipo', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Si es compuesta</Label>{missingFields?.some(m => m.id === 'hojas.hoja_compuesta_tipo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <RadioSelect 
              options={['Bifoliada', 'Trifoliada', 'Palmada', 'Pinnada', 'Bipinnada']}
              value={getField('hojas', 'hoja_compuesta_tipo')}
              onChange={(val) => setField('hojas', 'hoja_compuesta_tipo', val)}
            />
          </YStack>
        )}

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.forma_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'hojas.forma_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Ovalada', 'Alargada', 'Redonda', 'Lanceolada', 'Acorazonada', 'Otro']}
            value={getField('hojas', 'forma_hoja')}
            onChange={(val) => setField('hojas', 'forma_hoja', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.disposicion_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Disposición</Label>{missingFields?.some(m => m.id === 'hojas.disposicion_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Alternas', 'Opuestas', 'Otro']}
            value={getField('hojas', 'disposicion_hoja')}
            onChange={(val) => setField('hojas', 'disposicion_hoja', val)}
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

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('hojas.color_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color</Label>{missingFields?.some(m => m.id === 'hojas.color_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Verde claro', 'Verde oscuro', 'Variegado', 'Rojizo', 'Otro']}
            value={getField('hojas', 'color_hoja')}
            onChange={(val) => setField('hojas', 'color_hoja', val)}
          />
        </YStack>
      </Card>

      {/* IV. Flores (clave ornamental) */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Flores (clave ornamental)</H4>
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
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_color', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color de pétalos</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_color') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Otro']}
                value={getField('reproductivo', 'flor_color')}
                onChange={(val) => setField('reproductivo', 'flor_color', val)}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_tamano', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tamaño de flor (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_tamano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                placeholder="Ej. 5"
                value={getField('reproductivo', 'flor_tamano')}
                onChangeText={(val) => setField('reproductivo', 'flor_tamano', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Tubular', 'Abierta', 'Estrellada', 'Campanulada', 'Otro']}
                value={getField('reproductivo', 'flor_forma')}
                onChange={(val) => setField('reproductivo', 'flor_forma', val)}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.flor_agrupacion', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Agrupación</Label>{missingFields?.some(m => m.id === 'reproductivo.flor_agrupacion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Solitaria', 'En racimo', 'En racimos', 'En manojo', 'En ramillete', 'En ramilletes', 'En espiga', 'En cabezuela', 'Otro']}
                value={getField('reproductivo', 'flor_agrupacion')}
                onChange={(val) => setField('reproductivo', 'flor_agrupacion', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* V. Frutos */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Frutos</H4>
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
            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_textura', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Textura</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_textura') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Carnoso', 'Seco', 'Otro']}
                value={getField('reproductivo', 'fruto_textura')}
                onChange={(val) => setField('reproductivo', 'fruto_textura', val)}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Otro']}
                value={getField('reproductivo', 'fruto_forma')}
                onChange={(val) => setField('reproductivo', 'fruto_forma', val)}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tamaño del fruto (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                placeholder="Ej. 10"
                value={getField('reproductivo', 'fruto_tamano')}
                onChangeText={(val) => setField('reproductivo', 'fruto_tamano', val)}
                borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
              />
            </YStack>

            <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.fruto_color_maduro', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color del fruto maduro</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_color_maduro') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Verde', 'Amarillo', 'Rojo', 'Morado', 'Negro', 'Otro']}
                value={getField('reproductivo', 'fruto_color_maduro')}
                onChange={(val) => setField('reproductivo', 'fruto_color_maduro', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* VI. Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VI. Semillas</H4>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_numero', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_numero') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 1"
            value={getField('reproductivo', 'semilla_numero')}
            onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tamaño de semilla (mm o cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            placeholder="Ej. 5 mm"
            value={getField('reproductivo', 'semilla_tamano')}
            onChangeText={(val) => setField('reproductivo', 'semilla_tamano', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>
      </Card>

      {/* VII - X. Estado e Impacto */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VII - X. Estado e Impacto</H4>
        
        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.estado_fenologico', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>VII. Estado Fenológico (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_fenologico') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Vegetativo', 'Con flores', 'Con frutos']}
            value={getField('compartido', 'estado_fenologico') || []}
            onChange={(val) => setField('compartido', 'estado_fenologico', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.estado_individuo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>VIII. Estado del individuo (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_individuo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Podado', 'Con plagas', 'Con daño']}
            value={getField('compartido', 'estado_individuo') || []}
            onChange={(val) => setField('compartido', 'estado_individuo', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.valor_ornamental', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>IX. Valor ornamental (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.valor_ornamental') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Genera sombra', 'Tiene flores vistosas', 'Tiene frutos vistosos', 'Tiene hojas vistosas', 'Forma atractiva', 'Mejora el microclima', 'Atrae fauna', 'Valor cultural', 'Valor alimenticio', 'Valor medicinal', 'Otro']}
            value={getField('compartido', 'valor_ornamental') || []}
            onChange={(val) => setField('compartido', 'valor_ornamental', val)}
          />
        </YStack>

        <YStack gap="$2" collapsable={false} ref={(el) => registerRef && registerRef('compartido.impacto_urbano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>X. Impacto urbano (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.impacto_urbano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Raíces afectan vereda', 'Interfiere con infraestructura', 'Dificulta mantenimiento', 'Otro']}
            value={getField('compartido', 'impacto_urbano') || []}
            onChange={(val) => setField('compartido', 'impacto_urbano', val)}
          />
        </YStack>
      </Card>

    </YStack>
  );
}

