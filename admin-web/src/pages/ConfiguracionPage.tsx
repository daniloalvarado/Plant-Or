import React, { useState, useEffect } from 'react'
import { client, urlFor } from '@/lib/sanity'
import { Settings, Save, Upload, Loader2, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ConfiguracionPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [configId, setConfigId] = useState<string | null>(null)

  const [form, setForm] = useState({
    responsable_1_nombre: '',
    responsable_1_cargo: '',
    responsable_2_nombre: '',
    responsable_2_cargo: '',
  })
  
  const [firma1Url, setFirma1Url] = useState<string>('')
  const [firma2Url, setFirma2Url] = useState<string>('')

  // Ref fields for file uploads
  const firma1Ref = React.useRef<HTMLInputElement>(null)
  const firma2Ref = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const result = await client.fetch(`*[_type == "configuracion"][0]`)
      if (result) {
        setConfigId(result._id)
        setForm({
          responsable_1_nombre: result.responsable_1_nombre || '',
          responsable_1_cargo: result.responsable_1_cargo || '',
          responsable_2_nombre: result.responsable_2_nombre || '',
          responsable_2_cargo: result.responsable_2_cargo || '',
        })
        if (result.responsable_1_firma) setFirma1Url(urlFor(result.responsable_1_firma))
        if (result.responsable_2_firma) setFirma2Url(urlFor(result.responsable_2_firma))
      }
    } catch (e) {
      console.error(e)
      toast.error('Error al cargar la configuración')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (configId) {
        await client.patch(configId).set(form).commit()
      } else {
        const newDoc = await client.create({
          _type: 'configuracion',
          titulo: 'Configuración PLANT-OR',
          ...form
        })
        setConfigId(newDoc._id)
      }
      toast.success('Configuración guardada correctamente')
    } catch (e) {
      console.error(e)
      toast.error('Error al guardar la configuración')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'responsable_1_firma' | 'responsable_2_firma') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/png')) {
      toast.error('Por favor sube una imagen PNG con fondo transparente')
      return
    }

    const toastId = toast.loading('Subiendo firma...')
    try {
      // 1. Create config document if it doesn't exist
      let currentId = configId
      if (!currentId) {
        const newDoc = await client.create({
          _type: 'configuracion',
          titulo: 'Configuración PLANT-OR',
          ...form
        })
        currentId = newDoc._id
        setConfigId(currentId)
      }

      // 2. Upload asset
      const asset = await client.assets.upload('image', file, {
        filename: file.name
      })

      // 3. Link asset to document
      await client.patch(currentId).set({
        [fieldName]: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      }).commit()

      // 4. Update local state visually
      if (fieldName === 'responsable_1_firma') {
        setFirma1Url(asset.url)
      } else {
        setFirma2Url(asset.url)
      }
      
      toast.success('Firma subida y guardada', { id: toastId })
    } catch (err) {
      console.error(err)
      toast.error('Error al subir la imagen', { id: toastId })
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Configuración Global
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las firmas digitales que aparecerán en los certificados emitidos por la plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Responsable 1 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="font-bold text-lg text-primary flex items-center gap-2">
            Responsable 1 (Firma Principal)
          </h2>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nombre Completo</label>
            <input
              type="text"
              value={form.responsable_1_nombre}
              onChange={(e) => setForm({ ...form, responsable_1_nombre: e.target.value })}
              placeholder="Ej. Ing. Fredy Ramírez"
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cargo</label>
            <input
              type="text"
              value={form.responsable_1_cargo}
              onChange={(e) => setForm({ ...form, responsable_1_cargo: e.target.value })}
              placeholder="Ej. Coordinador del Proyecto RSU"
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Imagen de Firma (Fondo Transparente)
            </label>
            <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 bg-black/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
              {firma1Url ? (
                <>
                  <div className="bg-white/90 p-4 rounded-lg w-full flex justify-center">
                    <img src={firma1Url} alt="Firma 1" className="h-20 object-contain" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => firma1Ref.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1FC451] text-white font-bold rounded-lg shadow-xl cursor-pointer hover:bg-[#19a343] transition-colors"
                    >
                      <Upload className="w-4 h-4" /> Reemplazar
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => firma1Ref.current?.click()}
                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors py-8"
                >
                  <Upload className="w-8 h-8 opacity-50" />
                  <span className="text-sm font-medium">Clic para subir imagen (PNG)</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              accept="image/png" 
              className="hidden" 
              ref={firma1Ref}
              onChange={(e) => handleFileUpload(e, 'responsable_1_firma')}
            />
          </div>
        </div>

        {/* Responsable 2 */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <h2 className="font-bold text-lg text-primary flex items-center gap-2">
            Responsable 2 (Opcional)
          </h2>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nombre Completo</label>
            <input
              type="text"
              value={form.responsable_2_nombre}
              onChange={(e) => setForm({ ...form, responsable_2_nombre: e.target.value })}
              placeholder="Ej. Ing. Rafael Vilca"
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cargo</label>
            <input
              type="text"
              value={form.responsable_2_cargo}
              onChange={(e) => setForm({ ...form, responsable_2_cargo: e.target.value })}
              placeholder="Ej. Docente Asesor"
              className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Imagen de Firma (Fondo Transparente)
            </label>
            <div className="mt-2 border-2 border-dashed border-border rounded-xl p-6 bg-black/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
              {firma2Url ? (
                <>
                  <div className="bg-white/90 p-4 rounded-lg w-full flex justify-center">
                    <img src={firma2Url} alt="Firma 2" className="h-20 object-contain" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => firma2Ref.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1FC451] text-white font-bold rounded-lg shadow-xl cursor-pointer hover:bg-[#19a343] transition-colors"
                    >
                      <Upload className="w-4 h-4" /> Reemplazar
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={() => firma2Ref.current?.click()}
                  className="flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors py-8"
                >
                  <Upload className="w-8 h-8 opacity-50" />
                  <span className="text-sm font-medium">Clic para subir imagen (PNG)</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              accept="image/png" 
              className="hidden" 
              ref={firma2Ref}
              onChange={(e) => handleFileUpload(e, 'responsable_2_firma')}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 pb-12 border-t border-border mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#1FC451] text-white font-bold rounded-lg hover:bg-[#19a343] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#1FC451]/20"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Guardar
        </button>
      </div>
    </div>
  )
}
