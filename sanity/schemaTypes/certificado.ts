export const certificado = {
  name: 'certificado',
  title: 'Certificados Digitales',
  type: 'document',
  fields: [
    {
      name: 'codigo',
      title: 'Código Único',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'usuario_id',
      title: 'ID del Usuario (Clerk)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      readOnly: true,
    },
    {
      name: 'usuario_nombre',
      title: 'Nombre del Estudiante',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'registros_validados',
      title: 'Registros Validados',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tipo_participacion',
      title: 'Tipo de Participación',
      type: 'string',
      options: {
        list: ['Estudiante', 'Ciudadano']
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'periodo',
      title: 'Periodo de Participación',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fecha_emision',
      title: 'Fecha de Emisión',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    }
  ],
  preview: {
    select: {
      title: 'codigo',
      subtitle: 'usuario_nombre'
    }
  }
}
