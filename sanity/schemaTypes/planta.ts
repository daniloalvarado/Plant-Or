export const planta = {
  name: 'planta',
  title: 'Registro de Planta (PLANT-OR)',
  type: 'document',
  fieldsets: [
    { name: 'estado', title: 'Estado y Control', options: { collapsible: true, collapsed: false } },
    { name: 'datosPersonales', title: '1. Datos Personales', options: { collapsible: true, collapsed: true } },
    { name: 'ubicacion', title: '2. Ubicación y Georreferenciación', options: { collapsible: true, collapsed: true } },
    { name: 'identificacion', title: '3. Identificación', options: { collapsible: true, collapsed: true } },
    { name: 'habito', title: '4. Hábito y Tipo de Vida', options: { collapsible: true, collapsed: false } },
    { name: 'fotografias', title: '7. Fotografías', options: { collapsible: true, collapsed: false } },
    { name: 'impacto', title: 'Valor Ornamental e Impacto Urbano', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // ESTADO Y CONTROL
    {
      name: 'estado_revision',
      title: 'Estado del Registro',
      type: 'string',
      fieldset: 'estado',
      options: {
        list: ['En revisión', 'Validado', 'Observado', 'Rechazado']
      },
      initialValue: 'En revisión'
    },
    {
      name: 'motivo_observacion',
      title: 'Motivo de Observación / Rechazo',
      type: 'text',
      fieldset: 'estado',
      hidden: ({ document }: any) => !['Observado', 'Rechazado'].includes(document?.estado_revision),
      description: 'Escribe aquí qué debe corregir el estudiante, o por qué fue rechazado.'
    },
    {
      name: 'autor',
      title: 'ID del Autor (Clerk)',
      type: 'string',
      fieldset: 'estado',
      readOnly: true
    },
    { name: 'validador', title: 'Docente Validador', type: 'string', fieldset: 'estado' },
    { name: 'fecha_revision', title: 'Fecha de Revisión', type: 'datetime', fieldset: 'estado' },
    { name: 'fecha_registro', title: 'Fecha de Registro', type: 'datetime', fieldset: 'estado' },

    // 1. DATOS PERSONALES
    { name: 'registrador_nombre', title: 'Nombre completo', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_dni', title: 'DNI', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_email', title: 'Email', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_curso', title: 'Curso', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_facultad', title: 'Facultad', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_escuela', title: 'Escuela', type: 'string', fieldset: 'datosPersonales' },
    { name: 'registrador_dia_clase', title: 'Día de clase', type: 'string', fieldset: 'datosPersonales' },

    // 2. UBICACIÓN
    { name: 'latitud', title: 'Latitud', type: 'number', fieldset: 'ubicacion' },
    { name: 'longitud', title: 'Longitud', type: 'number', fieldset: 'ubicacion' },
    { name: 'distrito', title: 'Distrito', type: 'string', fieldset: 'ubicacion' },
    { name: 'direccion', title: 'Dirección referencial', type: 'string', fieldset: 'ubicacion' },
    { name: 'tipo_ubicacion_1', title: 'Tipo de ubicación 1', type: 'string', fieldset: 'ubicacion', options: { list: ['Jirón', 'Avenida', 'Calle', 'Pasaje', 'Parque'] } },
    { name: 'tipo_ubicacion_2', title: 'Tipo de ubicación 2', type: 'string', fieldset: 'ubicacion', options: { list: ['Vereda', 'Berma central'] } },
    { name: 'numero_casa', title: 'N° de casa', type: 'string', fieldset: 'ubicacion' },
    { name: 'ubicacion_planta', title: 'Ubicación de la planta', type: 'string', fieldset: 'ubicacion', options: { list: ['Tierra', 'Macetero'] } },

    // 3. IDENTIFICACIÓN
    { name: 'nombre_cientifico', title: 'Nombre Científico', type: 'string', fieldset: 'identificacion' },
    { name: 'origen', title: 'Origen', type: 'string', fieldset: 'identificacion', options: { list: ['Nativa', 'Introducida'] } },
    { name: 'pais_origen', title: 'País de origen', type: 'string', fieldset: 'identificacion', hidden: ({ document }: any) => document?.origen !== 'Introducida' },
    { name: 'nombres_comunes', title: 'Nombre Local / Común', type: 'string', fieldset: 'identificacion' },
    { name: 'familia', title: 'Familia', type: 'string', fieldset: 'identificacion' },
    { name: 'numero_planta', title: 'Número de planta', type: 'string', fieldset: 'identificacion' },

    // 4. HÁBITO Y TIPO DE VIDA
    {
      name: 'habito',
      title: 'Hábito de la Planta',
      type: 'string',
      fieldset: 'habito',
      options: { list: ['Árbol', 'Palmera', 'Arbusto', 'Liana', 'Hierba'] }
    },
    {
      name: 'tipo_vida',
      title: 'Tipo de Vida',
      type: 'string',
      fieldset: 'habito',
      options: { list: ['Terrestre', 'Epífita', 'Parásita'] }
    },

    // -------------------------------------------------------------
    // BLOQUE: ÁRBOL (Mostrado solo si habito === 'Árbol')
    // -------------------------------------------------------------
    {
      name: 'arbol_datos',
      title: '6.1 Datos de Árbol',
      type: 'object',
      hidden: ({ document }: any) => document?.habito !== 'Árbol',
      fields: [
        { name: 'altura_total', title: 'Altura total aproximada (m)', type: 'number' },
        { name: 'cap', title: 'CAP (cm)', type: 'number' },
        { name: 'diametro_copa_paralelo', title: 'Diámetro de copa paralelo (m)', type: 'number' },
        { name: 'diametro_copa_perpendicular', title: 'Diámetro de copa perpendicular (m)', type: 'number' },
        { name: 'altura_inicio_copa', title: 'Altura inicio copa (m)', type: 'number' },
        { name: 'raices_visibles', title: 'Raíces visibles', type: 'string', options: { list: ['Sin raíces visibles', 'Raíces tablares', 'Raíces zancudas', 'Raíces superficiales', 'Raíces adventicias', 'Otro'] } },
        { name: 'numero_troncos', title: 'Número de troncos desde la base', type: 'number' },
        { name: 'forma_tronco', title: 'Forma del tronco', type: 'string', options: { list: ['Recto', 'Inclinado a la izquierda', 'Inclinado a la derecha', 'Inclinado hacia la calle', 'Inclinado hacia la casa', 'Torcido', 'Otro'] } },
        { name: 'corteza_externa', title: 'Corteza externa', type: 'string', options: { list: ['Lisa', 'Rugosa', 'Áspera', 'Agrietada', 'Estriada', 'Escamosa', 'Con placas', 'Laminar', 'Otro'] } },
        { name: 'lenticelas', title: 'Lenticelas', type: 'string', options: { list: ['Con lenticelas', 'Sin lenticelas'] } },
        { name: 'color_corteza', title: 'Color de corteza', type: 'array', of: [{type: 'string'}], options: { list: ['Gris', 'Marrón', 'Verde', 'Rojiza', 'Negruzca', 'Otro'] } },
        { name: 'olor_corteza', title: 'Olor de corteza', type: 'string', options: { list: ['Sin olor', 'Aromático', 'Cítrico', 'Resinoso', 'Desagradable', 'Otro'] } },
        { name: 'espinas_tronco', title: 'Espinas en tronco', type: 'string', options: { list: ['Con espinas', 'Sin espinas'] } },
        { name: 'exudado_presencia', title: 'Exudado Presencia', type: 'string', options: { list: ['Sí', 'No'] } },
        { name: 'exudado_tipo', title: 'Tipo Exudado', type: 'string', options: { list: ['Savia', 'Látex', 'Resina', 'Goma'] } },
        { name: 'exudado_color', title: 'Color Exudado', type: 'string', options: { list: ['Incoloro', 'Blanco', 'Amarillo', 'Rojizo', 'Marrón', 'Otro'] } },
        { name: 'tipo_ramificacion', title: 'Tipo ramificación', type: 'string', options: { list: ['Ramas hacia arriba', 'Ramas como hélice de helicóptero', 'Ramas colgantes', 'Ramas irregulares', 'Otro'] } },
        { name: 'forma_copa', title: 'Forma copa', type: 'string', options: { list: ['Redondeada', 'Alargada', 'Extendida', 'Tipo paraguas', 'Irregular', 'Otro'] } },
        { name: 'densidad_copa', title: 'Densidad copa', type: 'string', options: { list: ['Densa', 'Media', 'Rala'] } },
        { name: 'tipo_hoja', title: 'Tipo hoja', type: 'string', options: { list: ['Simple', 'Compuesta'] } },
        { name: 'disposicion_hoja', title: 'Disposición', type: 'array', of: [{type: 'string'}], options: { list: ['Alternas – dísticas', 'Alternas - espiraladas', 'Opuestas – dísticas', 'Opuestas - decusadas', 'Agrupadas al final de las ramas', 'No agrupadas al final de las ramas'] } },
        { name: 'forma_hoja', title: 'Forma hoja', type: 'string', options: { list: ['Ovalada', 'Alargada', 'Redonda', 'Acorazonada', 'Palmada', 'Otro'] } },
        { name: 'borde_hoja', title: 'Borde hoja', type: 'string', options: { list: ['Entero', 'Dentado', 'Ondulado', 'Otro'] } },
        { name: 'textura_hoja', title: 'Textura hoja', type: 'string', options: { list: ['Papirácea', 'Cartácea', 'Coriácea'] } },
        { name: 'color_enves', title: 'Color envés', type: 'string', options: { list: ['Verde claro', 'Verde oscuro', 'Grisáceo', 'Marrón', 'Blanquecino', 'Otro'] } },
        { name: 'pelos_hoja', title: 'Presencia pelos', type: 'array', of: [{type: 'string'}], options: { list: ['Sin pelos (haz)', 'Con pelos (haz)', 'Sin pelos (envés)', 'Con pelos (envés)'] } },
        { name: 'tipo_peciolo', title: 'Tipo peciolo', type: 'string', options: { list: ['Circular', 'Plano', 'Sésil'] } },
        { name: 'longitud_peciolo', title: 'Longitud peciolo (cm)', type: 'number' },
        { name: 'diametro_peciolo', title: 'Diámetro peciolo (mm)', type: 'number' },
        { name: 'peciolo_pulvino', title: 'Peciolo con pulvino', type: 'string', options: { list: ['Sí', 'No'] } },
      ]
    },

    // -------------------------------------------------------------
    // BLOQUE: PALMERA (Mostrado solo si habito === 'Palmera')
    // -------------------------------------------------------------
    {
      name: 'palmera_datos',
      title: '6.2 Datos de Palmera',
      type: 'object',
      hidden: ({ document }: any) => document?.habito !== 'Palmera',
      fields: [
        { name: 'altura_total', title: 'Altura total (m)', type: 'number' },
        { name: 'cap', title: 'CAP a 1.30m (cm)', type: 'number' },
        { name: 'diametro_copa_paralelo', title: 'Diámetro de copa paralelo (m)', type: 'number' },
        { name: 'diametro_copa_perpendicular', title: 'Diámetro de copa perpendicular (m)', type: 'number' },
        { name: 'altura_inicio_copa', title: 'Altura de inicio de copa (m)', type: 'number' },
        { name: 'numero_tallos', title: 'Número de tallos', type: 'string', options: { list: ['Un solo tallo', 'Varios tallos', 'Otro'] } },
        { name: 'raices_visibles', title: 'Raíces visibles', type: 'string', options: { list: ['Sin raíces visibles', 'Raíces superficiales', 'Raíces zancudas', 'Raíces de soporte', 'Raíces adventicias', 'Otro'] } },
        { name: 'tipo_palmera', title: 'Tipo de palmera', type: 'string', options: { list: ['Arborescente', 'Arbustiva', 'Lianescente', 'Sin tallo visible', 'Otro'] } },
        { name: 'tallo', title: 'Tallo (estípite)', type: 'array', of: [{type:'string'}], options: { list: ['Liso', 'Con anillos visibles', 'Con fibras', 'Con restos de hojas', 'Con espinas', 'Sin espinas', 'Otro'] } },
        { name: 'tipo_hoja', title: 'Tipo hoja', type: 'string', options: { list: ['Pluma (pinnada)', 'Abanico (palmada)', 'Simple entera', 'Simple bífida', 'Otro'] } },
        { name: 'segmentos', title: 'Segmentos', type: 'array', of: [{type:'string'}], options: { list: ['En un solo plano', 'En varios planos', 'Rígidos', 'Colgantes', 'Otro'] } },
        { name: 'hoja_largo', title: 'Largo hoja (m)', type: 'number' },
        { name: 'hoja_ancho', title: 'Ancho hoja (m)', type: 'number' },
        { name: 'peciolo_largo', title: 'Largo peciolo (m)', type: 'number' },
        { name: 'peciolo_diametro', title: 'Diámetro peciolo (cm)', type: 'number' },
        { name: 'color_hoja', title: 'Color de hoja', type: 'string', options: { list: ['Verde claro', 'Verde oscuro', 'Verde azulado', 'Amarillento', 'Otro'] } },
        { name: 'espinas_palmera', title: 'Espinas', type: 'array', of: [{type:'string'}], options: { list: ['Ausentes', 'En tallo', 'En pecíolo', 'En vaina', 'Otro'] } },
        { name: 'inflorescencia_presencia', title: 'Presencia Inflorescencia', type: 'string', options: { list: ['Con inflorescencia', 'Sin inflorescencia visible'] } },
        { name: 'inflorescencia_posicion', title: 'Posición Inflorescencia', type: 'array', of: [{type:'string'}], options: { list: ['Interfoliar (entre hojas)', 'Infrafoliar (debajo de hojas)', 'Axilar', 'Apical', 'Otro'] } },
        { name: 'inflorescencia_forma', title: 'Forma Inflorescencia', type: 'string', options: { list: ['Erecta', 'Colgante', 'Otro'] } },
        { name: 'inflorescencia_espata', title: 'Presencia de espata', type: 'string', options: { list: ['Sí', 'No'] } },
      ]
    },

    // -------------------------------------------------------------
    // BLOQUE: ARBUSTO (Mostrado solo si habito === 'Arbusto')
    // -------------------------------------------------------------
    {
      name: 'arbusto_datos',
      title: '6.3 Datos de Arbusto',
      type: 'object',
      hidden: ({ document }: any) => document?.habito !== 'Arbusto',
      fields: [
        { name: 'altura_total', title: 'Altura total (m)', type: 'number' },
        { name: 'diametro_copa_paralelo', title: 'Diámetro de copa paralelo (m)', type: 'number' },
        { name: 'diametro_copa_perpendicular', title: 'Diámetro de copa perpendicular (m)', type: 'number' },
        { name: 'altura_inicio_ramificacion', title: 'Altura de inicio de ramificación (m)', type: 'number' },
        { name: 'numero_tallos', title: 'Número de tallos', type: 'string', options: { list: ['Un tallo principal', 'Varios tallos desde la base', 'Otro'] } },
        { name: 'forma_general', title: 'Forma general', type: 'string', options: { list: ['Redondeado', 'Compacto', 'Extendido', 'Irregular', 'Colgante', 'Otro'] } },
        { name: 'densidad_follaje', title: 'Densidad follaje', type: 'string', options: { list: ['Denso', 'Medio', 'Ralo'] } },
        { name: 'tipo_ramificacion', title: 'Tipo ramificación', type: 'string', options: { list: ['Erecta', 'Abierta', 'Colgante', 'Irregular', 'Otro'] } },
        { name: 'tipo_tallo', title: 'Tipo tallo', type: 'string', options: { list: ['Leñoso', 'Semileñoso', 'Flexible', 'Otro'] } },
        { name: 'presencia_espinas', title: 'Presencia de espinas', type: 'string', options: { list: ['Con espinas', 'Sin espinas'] } },
        { name: 'tipo_hoja', title: 'Tipo hoja', type: 'string', options: { list: ['Simple', 'Compuesta', 'Otro'] } },
        { name: 'hoja_compuesta_tipo', title: 'Si es compuesta', type: 'string', options: { list: ['Bifoliada', 'Trifoliada', 'Palmada', 'Pinnada', 'Bipinnada'] } },
        { name: 'forma_hoja', title: 'Forma de la hoja', type: 'string', options: { list: ['Ovalada', 'Alargada', 'Redonda', 'Lanceolada', 'Acorazonada', 'Otro'] } },
        { name: 'disposicion_hoja', title: 'Disposición', type: 'string', options: { list: ['Alternas', 'Opuestas', 'Otro'] } },
        { name: 'borde_hoja', title: 'Borde', type: 'string', options: { list: ['Entero', 'Dentado', 'Ondulado', 'Otro'] } },
        { name: 'color_hoja', title: 'Color', type: 'string', options: { list: ['Verde claro', 'Verde oscuro', 'Variegado', 'Rojizo', 'Otro'] } },
      ]
    },

    // -------------------------------------------------------------
    // BLOQUE: LIANA (Mostrado solo si habito === 'Liana')
    // -------------------------------------------------------------
    {
      name: 'liana_datos',
      title: '6.4 Datos de Liana',
      type: 'object',
      hidden: ({ document }: any) => document?.habito !== 'Liana',
      fields: [
        { name: 'longitud_visible', title: 'Longitud visible (m)', type: 'number' },
        { name: 'altura_maxima', title: 'Altura máxima alcanzada (m)', type: 'number' },
        { name: 'diametro_tallo', title: 'Diámetro del tallo principal (cm)', type: 'number' },
        { name: 'numero_tallos', title: 'Número de tallos', type: 'string', options: { list: ['Un tallo principal', 'Varios tallos', 'Otro'] } },
        { name: 'tipo_soporte', title: 'Tipo soporte', type: 'string', options: { list: ['Árbol', 'Arbusto', 'Cerca / estructura artificial', 'Suelo (rastrera)', 'Múltiples soportes', 'Otro'] } },
        { name: 'forma_crecimiento', title: 'Forma crecimiento', type: 'string', options: { list: ['Trepadora (sube activamente)', 'Enredadera (se enrolla)', 'Colgante', 'Rastrera', 'Escandente (se apoya sin enrollarse)', 'Otro'] } },
        { name: 'mecanismo_fijacion', title: 'Mecanismo fijación', type: 'array', of: [{type:'string'}], options: { list: ['Con zarcillos', 'Con raíces adherentes', 'Con espinas o ganchos', 'Por enrollamiento del tallo', 'No visible', 'Otro'] } },
        { name: 'tipo_hoja', title: 'Tipo hoja', type: 'string', options: { list: ['Simple', 'Compuesta', 'Otro'] } },
        { name: 'hoja_compuesta_tipo', title: 'Si es compuesta', type: 'string', options: { list: ['Bifoliada', 'Trifoliada', 'Palmada', 'Pinnada', 'Bipinnada'] } },
        { name: 'forma_hoja', title: 'Forma de la hoja', type: 'string', options: { list: ['Ovalada', 'Alargada', 'Acorazonada', 'Lobulada', 'Otro'] } },
        { name: 'disposicion_hoja', title: 'Disposición', type: 'string', options: { list: ['Alterna dística', 'Alterna espiralada', 'Opuesta dística', 'Opuesta decusada', 'Otro'] } },
        { name: 'textura_hoja', title: 'Textura', type: 'string', options: { list: ['Papirácea', 'Cartácea', 'Coriácea', 'Otro'] } },
        { name: 'borde_hoja', title: 'Borde', type: 'string', options: { list: ['Entero', 'Dentado', 'Ondulado', 'Otro'] } },
        { name: 'color_hoja', title: 'Color', type: 'string', options: { list: ['Verde claro', 'Verde oscuro', 'Variegado', 'Rojizo', 'Otro'] } },
        { name: 'tipo_tallo_liana', title: 'Tipo de tallo', type: 'string', options: { list: ['Leñoso', 'Semileñoso', 'Flexible', 'Otro'] } },
        { name: 'espinas_tallo', title: 'Espinas en tallo', type: 'string', options: { list: ['Con espinas', 'Sin espinas'] } },
        { name: 'exudado_presencia', title: 'Exudado', type: 'string', options: { list: ['Presente', 'Ausente'] } },
        { name: 'exudado_tipo', title: 'Tipo de exudado', type: 'string', options: { list: ['Látex', 'Savia', 'Goma', 'Resina'] } },
        { name: 'exudado_color', title: 'Color del exudado', type: 'string' },
      ]
    },

    // -------------------------------------------------------------
    // BLOQUE: HIERBA (Mostrado solo si habito === 'Hierba')
    // -------------------------------------------------------------
    {
      name: 'hierba_datos',
      title: '6.5 Datos de Hierba',
      type: 'object',
      hidden: ({ document }: any) => document?.habito !== 'Hierba',
      fields: [
        { name: 'altura_total', title: 'Altura total (cm)', type: 'number' },
        { name: 'cobertura', title: 'Cobertura (diámetro cm)', type: 'number' },
        { name: 'numero_tallos', title: 'Número de tallos', type: 'string', options: { list: ['Uno', 'Varios', 'Muchos', 'Sin tallo visible', 'Otro'] } },
        { name: 'tipo_crecimiento', title: 'Tipo crecimiento', type: 'string', options: { list: ['Erecta', 'Rastrera', 'Colgante', 'En roseta', 'Formando mata', 'Otro'] } },
        { name: 'tipo_tallo', title: 'Tipo tallo', type: 'string', options: { list: ['Herbáceo', 'Carnoso', 'Hueco', 'Rastrero', 'Trepador', 'Sin tallo visible', 'Otro'] } },
        { name: 'tipo_hoja', title: 'Tipo hoja', type: 'string', options: { list: ['Simple', 'Compuesta', 'Otro'] } },
        { name: 'hoja_compuesta_tipo', title: 'Si es compuesta', type: 'string', options: { list: ['Bifoliada', 'Trifoliada', 'Palmada', 'Pinnada', 'Bipinnada'] } },
        { name: 'forma_hoja', title: 'Forma de la hoja', type: 'string', options: { list: ['Ovalada', 'Alargada', 'Redonda', 'Lanceolada', 'Acorazonada', 'Otro'] } },
        { name: 'disposicion_hoja', title: 'Disposición', type: 'string', options: { list: ['Alternas dísticas', 'Alternas espiraladas', 'Opuestas dísticas', 'Opuestas decusadas', 'En roseta basal', 'Agrupadas', 'Otro'] } },
        { name: 'textura_hoja', title: 'Textura', type: 'string', options: { list: ['Delgada', 'Carnosa', 'Áspera', 'Suave', 'Otro'] } },
        { name: 'borde_hoja', title: 'Borde', type: 'string', options: { list: ['Entero', 'Dentado', 'Ondulado', 'Otro'] } },
        { name: 'color_hoja', title: 'Color', type: 'string', options: { list: ['Verde claro', 'Verde oscuro', 'Rojizo', 'Morado', 'Variegado', 'Otro'] } },
        { name: 'olor_hoja', title: 'Olor al estrujar', type: 'string', options: { list: ['Sin olor', 'Aromático', 'Cítrico', 'Desagradable', 'Otro'] } },
        { name: 'exudado_corte', title: 'Exudado al corte', type: 'string', options: { list: ['Sí', 'No'] } },
      ]
    },

    // -------------------------------------------------------------
    // BLOQUE COMÚN REPRODUCTIVO (Flores, Frutos, Semillas compartidos)
    // -------------------------------------------------------------
    {
      name: 'reproductivo',
      title: 'Datos Reproductivos (Flores, Frutos, Semillas)',
      type: 'object',
      fields: [
        { name: 'flor_presencia', title: 'Presencia Flores', type: 'string', options: { list: ['Con flores', 'Sin flores visibles'] } },
        { name: 'flor_color', title: 'Color pétalos', type: 'string', options: { list: ['Blanco', 'Amarillo', 'Rojo', 'Rosado', 'Morado', 'Anaranjado', 'Verde', 'Crema', 'Otro'] } },
        { name: 'flor_tamano', title: 'Tamaño flor (cm)', type: 'string' },
        { name: 'flor_tamano_largo', title: 'Largo flor (cm)', type: 'string' },
        { name: 'flor_tamano_ancho', title: 'Ancho flor (cm)', type: 'string' },
        { name: 'flor_agrupacion', title: 'Agrupación flores', type: 'string', options: { list: ['Solitaria', 'En racimo', 'En racimos', 'En manojo', 'En ramillete', 'En ramilletes', 'En espiga', 'En cabezuela', 'Otro'] } },
        { name: 'flor_forma', title: 'Forma flor', type: 'string', options: { list: ['Tubular', 'Abierta', 'Estrellada', 'Campanulada', 'Acampanada', 'Irregular', 'Otro'] } },
        { name: 'flor_olor', title: 'Olor de la flor', type: 'string', options: { list: ['Sin olor', 'Aromático', 'Dulce', 'Desagradable', 'Otro'] } },
        { name: 'fruto_presencia', title: 'Presencia Frutos', type: 'string', options: { list: ['Con frutos', 'Sin frutos visibles'] } },
        { name: 'fruto_textura', title: 'Textura fruto', type: 'string', options: { list: ['Carnoso', 'Seco', 'Otro'] } },
        { name: 'fruto_estado_madurar', title: 'Estado al madurar', type: 'string', options: { list: ['Entero', 'Se abre (partido)'] } },
        { name: 'fruto_tipo', title: 'Tipo fruto', type: 'string', options: { list: ['Baya', 'Drupa', 'Legumbre', 'Cápsula', 'Sámara', 'Folículo', 'Otro'] } },
        { name: 'fruto_forma', title: 'Forma fruto', type: 'string', options: { list: ['Redondo', 'Ovalado', 'Alargado', 'Aplanado', 'Curvo', 'Irregular', 'Otro'] } },
        { name: 'fruto_tamano', title: 'Tamaño fruto (cm)', type: 'string' },
        { name: 'fruto_tamano_largo', title: 'Largo fruto (cm)', type: 'string' },
        { name: 'fruto_tamano_ancho', title: 'Ancho fruto (cm)', type: 'string' },
        { name: 'fruto_color_maduro', title: 'Color fruto maduro', type: 'string', options: { list: ['Verde', 'Amarillo', 'Rojo', 'Anaranjado', 'Morado', 'Negro', 'Marrón', 'Crema', 'Otro'] } },
        { name: 'fruto_superficie', title: 'Superficie del fruto', type: 'string', options: { list: ['Lisa', 'Brillante', 'Opaca', 'Rugosa', 'Con estrías', 'Con surcos', 'Escamosa', 'Fibrosa', 'Espinosa', 'Aguijonosa', 'Verrugosa', 'Con costillas', 'Otro'] } },
        { name: 'semilla_presencia', title: 'Presencia semillas visible', type: 'string', options: { list: ['Sí', 'No'] } },
        { name: 'semilla_numero', title: 'Número de semillas', type: 'number' },
        { name: 'semilla_tamano', title: 'Tamaño semilla (mm/cm)', type: 'string' },
        { name: 'semilla_tamano_largo', title: 'Largo semilla (cm)', type: 'string' },
        { name: 'semilla_tamano_ancho', title: 'Ancho semilla (cm)', type: 'string' },
        { name: 'semilla_color', title: 'Color cáscara semilla', type: 'string', options: { list: ['Blanco', 'Crema', 'Marrón', 'Negro', 'Rojizo', 'Otro'] } },
      ]
    },

    // ESTADO DEL INDIVIDUO Y FENOLÓGICO
    {
      name: 'estado_fenologico',
      title: 'Estado fenológico',
      type: 'array',
      fieldset: 'impacto',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Solo hojas', value: 'Solo hojas' },
          { title: 'Con flores', value: 'Con flores' },
          { title: 'Con frutos', value: 'Con frutos' },
          { title: 'Sin hojas', value: 'Sin hojas' },
        ]
      }
    },
    {
      name: 'estado_individuo',
      title: 'Estado del individuo',
      type: 'array',
      fieldset: 'impacto',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bueno', value: 'Bueno' },
          { title: 'Regular', value: 'Regular' },
          { title: 'Malo', value: 'Malo' },
          { title: 'Podado', value: 'Podado' },
          { title: 'Enfermo', value: 'Enfermo' },
          { title: 'Con plagas visibles', value: 'Con plagas visibles' },
          { title: 'Con daño mecánico', value: 'Con daño mecánico' },
        ]
      }
    },

    // VALOR E IMPACTO (Bloque final obligatorio)
    {
      name: 'valor_ornamental',
      title: 'Valor ornamental',
      type: 'array',
      fieldset: 'impacto',
      of: [{ type: 'string' }]
    },
    {
      name: 'impacto_urbano',
      title: 'Impacto urbano',
      type: 'array',
      fieldset: 'impacto',
      of: [{ type: 'string' }]
    },

    // 7. FOTOGRAFÍAS
    {
      name: 'galeria',
      title: 'Galería Fotográfica (Mínimo 5)',
      type: 'array',
      fieldset: 'fotografias',
      of: [{ type: 'image' }],
      description: 'Planta completa, Hoja, Flor, Fruto, Semilla'
    },
  ]
}
