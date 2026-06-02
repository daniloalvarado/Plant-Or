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
    }
  ]
}
