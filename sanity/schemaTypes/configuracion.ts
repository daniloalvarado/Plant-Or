export const configuracion = {
  name: 'configuracion',
  title: 'Configuración General',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Solo para identificar el documento (Ej. Configuración PLANT-OR)',
      initialValue: 'Configuración PLANT-OR'
    },
    {
      name: 'nombre_proyecto',
      title: 'Nombre del Proyecto (Logotipo)',
      type: 'string',
      initialValue: '🌿 PLANT-OR'
    },
    {
      name: 'cierre_estudiantes',
      title: 'Fecha de Cierre para Estudiantes',
      type: 'datetime',
      description: 'Fecha y hora a partir de la cual los Estudiantes ya no podrán registrar nuevas plantas.'
    },
    {
      name: 'cierre_ciudadanos',
      title: 'Fecha de Cierre para Ciudadanos',
      type: 'datetime',
      description: 'Fecha y hora a partir de la cual los Ciudadanos ya no podrán registrar nuevas plantas.'
    },
    {
      name: 'responsable_1_nombre',
      title: 'Nombre del Responsable 1',
      type: 'string',
    },
    {
      name: 'responsable_1_cargo',
      title: 'Cargo del Responsable 1',
      type: 'string',
    },
    {
      name: 'responsable_1_firma',
      title: 'Firma del Responsable 1 (Fondo transparente PNG)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'responsable_2_nombre',
      title: 'Nombre del Responsable 2',
      type: 'string',
    },
    {
      name: 'responsable_2_cargo',
      title: 'Cargo del Responsable 2',
      type: 'string',
    },
    {
      name: 'responsable_2_firma',
      title: 'Firma del Responsable 2 (Fondo transparente PNG)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'url_validacion',
      title: 'URL del Portal de Validación',
      type: 'string',
      description: 'El enlace que aparecerá en el certificado para validar su autenticidad (Ej. plant-or.com/validar)'
    },
    {
      name: 'titulo_certificado',
      title: 'Título del Certificado',
      type: 'string',
      initialValue: 'Certificado de Reconocimiento'
    },
    {
      name: 'subtitulo_certificado',
      title: 'Subtítulo',
      type: 'string',
      initialValue: 'Otorgado a:'
    },
    {
      name: 'texto_certificado',
      title: 'Texto Central del Certificado',
      type: 'text',
      description: 'Plantilla del texto central. Usa {tipo}, {periodo} y {count} para inyectar datos automáticamente.',
      initialValue: 'Por haber participado en el proyecto PLANT-OR en calidad de {tipo}, durante el periodo académico {periodo}. Aportando significativamente a la catalogación botánica con un total de {count} especies validadas.'
    }
  ]
}
