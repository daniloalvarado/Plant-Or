import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Card, H4, Input, Label, YStack, XStack } from 'tamagui';
import { RadioSelect, MultiSelect } from './CustomSelectors';

interface FormPalmeraProps {
  missingFields?: {id: string, label: string}[];
  registerRef?: (key: string, el: any) => void;
  data: any;
  updateData: (sectionOrKey: string, fieldOrValue: any, nestedValue?: any) => void;
}

export function FormPalmera({ data, updateData , registerRef, missingFields }: FormPalmeraProps) {
  const setField = (section: string, field: string, value: any) => {
    updateData(section, field, value);
  };

  const getField = (section: string, field: string) => {
    const val = data[section]?.[field];
    if (typeof val === 'number') return String(val);
    return val || '';
  };

  return (
    <YStack gap="$4" ref={(el) => registerRef && registerRef('dasometria.altura_total', el)}>
      {/* I. Datos dasométricos */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">I. Datos dasométricos</H4>
        
        <XStack gap="$3">
          <YStack flex={1} gap="$2">
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura total (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_total') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 10"
              value={getField('dasometria', 'altura_total')}
              onChangeText={(val) => setField('dasometria', 'altura_total', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('dasometria.cap', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>CAP a 1.30m (cm)</Label>{missingFields?.some(m => m.id === 'dasometria.cap') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 30"
              value={getField('dasometria', 'cap')}
              onChangeText={(val) => setField('dasometria', 'cap', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.diametro_copa_paralelo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa paralelo (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_paralelo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 5"
            value={getField('dasometria', 'diametro_copa_paralelo')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_paralelo', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.diametro_copa_perpendicular', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Diámetro de copa perpendicular (m)</Label>{missingFields?.some(m => m.id === 'dasometria.diametro_copa_perpendicular') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 6"
            value={getField('dasometria', 'diametro_copa_perpendicular')}
            onChangeText={(val) => setField('dasometria', 'diametro_copa_perpendicular', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.altura_inicio_copa', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Altura de inicio de copa (m)</Label>{missingFields?.some(m => m.id === 'dasometria.altura_inicio_copa') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 6"
            value={getField('dasometria', 'altura_inicio_copa')}
            onChangeText={(val) => setField('dasometria', 'altura_inicio_copa', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.numero_tallos', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de tallos</Label>{missingFields?.some(m => m.id === 'dasometria.numero_tallos') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Un solo tallo', 'Varios tallos', 'Otro']}
            value={getField('dasometria', 'numero_tallos')}
            onChange={(val) => setField('dasometria', 'numero_tallos', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('dasometria.raices_visibles', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Raíces visibles</Label>{missingFields?.some(m => m.id === 'dasometria.raices_visibles') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Sin raíces visibles', 'Raíces superficiales', 'Raíces zancudas', 'Raíces de soporte', 'Raíces adventicias', 'Otro']}
            value={getField('dasometria', 'raices_visibles')}
            onChange={(val) => setField('dasometria', 'raices_visibles', val)}
          />
        </YStack>
      </Card>

      {/* II. Tipo de palmera */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">II. Tipo de palmera</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('general.tipo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de palmera</Label>{missingFields?.some(m => m.id === 'general.tipo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Arborescente', 'Arbustiva', 'Lianescente', 'Sin tallo visible', 'Otro']}
            value={getField('general', 'tipo')}
            onChange={(val) => setField('general', 'tipo', val)}
          />
        </YStack>
      </Card>

      {/* III. Tallo (estípite) */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">III. Tallo (estípite)</H4>
        <YStack gap="$2">
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Características (Múltiple)</Label>{missingFields?.some(m => m.id === 'tallo.caracteristicas') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Liso', 'Con anillos visibles', 'Con fibras', 'Con restos de hojas', 'Con espinas', 'Sin espinas', 'Otro']}
            value={getField('tallo', 'caracteristicas') || []}
            onChange={(val) => setField('tallo', 'caracteristicas', val)}
          />
        </YStack>
      </Card>

      {/* IV. Hojas (carácter principal) */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IV. Hojas (carácter principal)</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.tipo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo de hoja</Label>{missingFields?.some(m => m.id === 'hojas.tipo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Pluma (pinnada)', 'Abanico (palmada)', 'Simple entera', 'Simple bífida', 'Otro']}
            value={getField('hojas', 'tipo')}
            onChange={(val) => setField('hojas', 'tipo', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.segmentos', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Segmentos (Múltiple)</Label>{missingFields?.some(m => m.id === 'hojas.segmentos') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['En un solo plano', 'En varios planos', 'Rígidos', 'Colgantes', 'Otro']}
            value={getField('hojas', 'segmentos') || []}
            onChange={(val) => setField('hojas', 'segmentos', val)}
          />
        </YStack>

        <XStack gap="$3" ref={(el) => registerRef && registerRef('hojas.hoja_largo', el)}>
          <YStack flex={1} gap="$2">
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo hoja (m)</Label>{missingFields?.some(m => m.id === 'hojas.hoja_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 2"
              value={getField('hojas', 'hoja_largo')}
              onChangeText={(val) => setField('hojas', 'hoja_largo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('hojas.hoja_ancho', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho hoja (m)</Label>{missingFields?.some(m => m.id === 'hojas.hoja_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 1"
              value={getField('hojas', 'hoja_ancho')}
              onChangeText={(val) => setField('hojas', 'hoja_ancho', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <XStack gap="$3" ref={(el) => registerRef && registerRef('hojas.peciolo_largo', el)}>
          <YStack flex={1} gap="$2">
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo peciolo (m)</Label>{missingFields?.some(m => m.id === 'hojas.peciolo_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 0.5"
              value={getField('hojas', 'peciolo_largo')}
              onChangeText={(val) => setField('hojas', 'peciolo_largo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('hojas.peciolo_diametro', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ø peciolo (cm)</Label>{missingFields?.some(m => m.id === 'hojas.peciolo_diametro') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              keyboardType="numeric" 
              placeholder="Ej. 5"
              value={getField('hojas', 'peciolo_diametro')}
              onChangeText={(val) => setField('hojas', 'peciolo_diametro', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('hojas.color_hoja', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Color</Label>{missingFields?.some(m => m.id === 'hojas.color_hoja') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Verde claro', 'Verde oscuro', 'Verde azulado', 'Amarillento', 'Otro']}
            value={getField('hojas', 'color_hoja')}
            onChange={(val) => setField('hojas', 'color_hoja', val)}
          />
        </YStack>
      </Card>

      {/* V. Espinas */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">V. Espinas</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('espinas.espinas_palmera', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Espinas (Múltiple)</Label>{missingFields?.some(m => m.id === 'espinas.espinas_palmera') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Ausentes', 'En tallo', 'En pecíolo', 'En vaina', 'Otro']}
            value={getField('espinas', 'espinas_palmera') || []}
            onChange={(val) => setField('espinas', 'espinas_palmera', val)}
          />
        </YStack>
      </Card>

      {/* VI. Inflorescencia */}
      <Card  padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VI. Inflorescencia</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('inflorescencia.inflorescencia_presencia', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia</Label>{missingFields?.some(m => m.id === 'inflorescencia.inflorescencia_presencia') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <RadioSelect 
            options={['Con inflorescencia', 'Sin inflorescencia visible']}
            value={getField('inflorescencia', 'inflorescencia_presencia')}
            onChange={(val) => setField('inflorescencia', 'inflorescencia_presencia', val)}
          />
        </YStack>

        {getField('inflorescencia', 'inflorescencia_presencia') === 'Con inflorescencia' && (
          <>
            <YStack gap="$2" ref={(el) => registerRef && registerRef('inflorescencia.inflorescencia_posicion', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Posición (Múltiple)</Label>{missingFields?.some(m => m.id === 'inflorescencia.inflorescencia_posicion') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <MultiSelect 
                options={['Interfoliar (entre hojas)', 'Infrafoliar (debajo de hojas)', 'Axilar', 'Apical', 'Otro']}
                value={getField('inflorescencia', 'inflorescencia_posicion') || []}
                onChange={(val) => setField('inflorescencia', 'inflorescencia_posicion', val)}
              />
            </YStack>
            
            <XStack gap="$3" ref={(el) => registerRef && registerRef('inflorescencia.inflorescencia_forma', el)}>
              <YStack flex={1} gap="$2">
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'inflorescencia.inflorescencia_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <RadioSelect 
                  options={['Erecta', 'Colgante', 'Otro']}
                  value={getField('inflorescencia', 'inflorescencia_forma')}
                  onChange={(val) => setField('inflorescencia', 'inflorescencia_forma', val)}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('inflorescencia.inflorescencia_espata', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Presencia de espata</Label>{missingFields?.some(m => m.id === 'inflorescencia.inflorescencia_espata') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
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
      {/* VII. Frutos */}
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
            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_tipo', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Tipo</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tipo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Baya', 'Drupa', 'Otro']}
                value={getField('reproductivo', 'fruto_tipo')}
                onChange={(val) => setField('reproductivo', 'fruto_tipo', val)}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_forma', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Forma</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_forma') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Curvo', 'Irregular', 'Otro']}
                value={getField('reproductivo', 'fruto_forma')}
                onChange={(val) => setField('reproductivo', 'fruto_forma', val)}
              />
            </YStack>

            <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_superficie', el)}>
              <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Superficie</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_superficie') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
              <RadioSelect 
                options={['Lisa', 'Brillante', 'Opaca', 'Rugosa', 'Con estrías', 'Con surcos', 'Escamosa', 'Fibrosa', 'Espinosa', 'Aguijonosa', 'Verrugosa', 'Otro']}
                value={getField('reproductivo', 'fruto_superficie')}
                onChange={(val) => setField('reproductivo', 'fruto_superficie', val)}
              />
            </YStack>

            <XStack gap="$3">
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_largo', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo: (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
                  placeholder="Ej. 10"
                  value={getField('reproductivo', 'fruto_tamano_largo')}
                  onChangeText={(val) => setField('reproductivo', 'fruto_tamano_largo', val)}
                  borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
                />
              </YStack>
              <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.fruto_tamano_ancho', el)}>
                <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho: (cm)</Label>{missingFields?.some(m => m.id === 'reproductivo.fruto_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
                <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
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
                options={['Verde', 'Amarillo', 'Rojo', 'Anaranjado', 'Morado', 'Negro', 'Marrón', 'Otro']}
                value={getField('reproductivo', 'fruto_color_maduro')}
                onChange={(val) => setField('reproductivo', 'fruto_color_maduro', val)}
              />
            </YStack>
          </>
        )}
      </Card>

      {/* VIII. Semillas */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">VIII. Semillas</H4>
        <YStack gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_numero', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Número de semillas por fruto</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_numero') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
            keyboardType="numeric" 
            placeholder="Ej. 1"
            value={getField('reproductivo', 'semilla_numero')}
            onChangeText={(val) => setField('reproductivo', 'semilla_numero', val)}
            borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
          />
        </YStack>
        <XStack gap="$3">
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_largo', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Largo: (cm o mm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_largo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              placeholder="Ej. 1 cm"
              value={getField('reproductivo', 'semilla_tamano_largo')}
              onChangeText={(val) => setField('reproductivo', 'semilla_tamano_largo', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
          <YStack flex={1} gap="$2" ref={(el) => registerRef && registerRef('reproductivo.semilla_tamano_ancho', el)}>
            <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>Ancho: (cm o mm)</Label>{missingFields?.some(m => m.id === 'reproductivo.semilla_tamano_ancho') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
            <Input cursorColor="#ffffff" selectionColor="#0D5E26" 
              placeholder="Ej. 5 mm"
              value={getField('reproductivo', 'semilla_tamano_ancho')}
              onChangeText={(val) => setField('reproductivo', 'semilla_tamano_ancho', val)}
              borderWidth={0} bg="rgba(255,255,255,0.05)" color="#ffffff" focusStyle={{ color: "#ffffff", bg: "rgba(255,255,255,0.08)" }}
            />
          </YStack>
        </XStack>
      </Card>

      {/* IX - XII. Estado e Impacto */}
      <Card padding="$4" gap="$4" backgroundColor="rgba(255,255,255,0.05)" borderWidth={0}>
        <H4 color="#1FC451">IX - XII. Estado e Impacto</H4>
        
        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_fenologico', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>IX. Estado Fenológico (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_fenologico') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Solo hojas', 'Con flores', 'Con frutos']}
            value={getField('compartido', 'estado_fenologico') || []}
            onChange={(val) => setField('compartido', 'estado_fenologico', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.estado_individuo', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>X. Estado del individuo (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.estado_individuo') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Bueno', 'Regular', 'Malo', 'Con plagas', 'Con daño', 'Hojas secas abundantes']}
            value={getField('compartido', 'estado_individuo') || []}
            onChange={(val) => setField('compartido', 'estado_individuo', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.valor_ornamental', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>XI. Valor Ornamental (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.valor_ornamental') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['Genera sombra', 'Tiene flores vistosas', 'Tiene frutos vistosos', 'Tiene hojas vistosas', 'Forma de copa atractiva', 'Mejora el microclima', 'Atrae fauna', 'Valor cultural', 'Valor alimenticio', 'Valor medicinal', 'Otro']}
            value={getField('compartido', 'valor_ornamental') || []}
            onChange={(val) => setField('compartido', 'valor_ornamental', val)}
          />
        </YStack>

        <YStack gap="$2" ref={(el) => registerRef && registerRef('compartido.impacto_urbano', el)}>
          <XStack style={{ alignItems: "center" }} gap="$1"><Label color="#ffffff" pressStyle={{ color: "#ffffff" }}>XII. Impacto Urbano (Múltiple)</Label>{missingFields?.some(m => m.id === 'compartido.impacto_urbano') && <MaterialCommunityIcons name="alert-circle" size={14} color="#ff4444" />}</XStack>
          <MultiSelect 
            options={['No genera daño', 'Frutos ensucian la vía', 'Frutos obstruyen desagüe', 'Frutos resbalosos', 'Raíces levantan vereda', 'Raíces afectan cimientos', 'Levanta pavimento', 'Interfiere con cableado', 'Interfiere con luminarias', 'Riesgo de caída de hojas', 'Tronco inclinado (riesgo)', 'Otro']}
            value={getField('compartido', 'impacto_urbano') || []}
            onChange={(val) => setField('compartido', 'impacto_urbano', val)}
          />
        </YStack>
      </Card>

    </YStack>
  );
}
