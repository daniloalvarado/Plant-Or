import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function EditorCertificadoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [editingCert, setEditingCert] = useState<any>(null);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [templateParts, setTemplateParts] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [certData, configData] = await Promise.all([
          client.fetch(`*[_type == "certificado" && _id == $id][0]`, { id }),
          client.fetch(`*[_type == "configuracion"][0]`)
        ]);
        
        if (!certData) {
          toast.error('Certificado no encontrado');
          navigate('/certificados');
          return;
        }

        setEditingCert(certData);
        setEditingConfig(configData);
        
        const textBase = configData?.texto_certificado || 'Por haber participado en el proyecto PLANT-OR en calidad de {tipo}, durante el periodo académico {periodo}. Aportando significativamente a la catalogación botánica con un total de {count} especies validadas.';
        const parts = textBase.split(/(\{tipo\}|\{periodo\}|\{count\})/g);
        setTemplateParts(parts);
      } catch (e) {
        console.error(e);
        toast.error('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) fetchData();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!editingCert || !editingConfig) return;
    setSaving(true);
    try {
      const newTextoCertificado = templateParts.join('');

      await Promise.all([
        client.patch(editingCert._id).set({
          usuario_nombre: editingCert.usuario_nombre,
          registros_validados: editingCert.registros_validados,
          tipo_participacion: editingCert.tipo_participacion,
          periodo: editingCert.periodo,
        }).commit(),
        client.patch(editingConfig._id).set({
          titulo_certificado: editingConfig.titulo_certificado,
          subtitulo_certificado: editingConfig.subtitulo_certificado,
          texto_certificado: newTextoCertificado,
        }).commit()
      ]);
      
      toast.success('Certificado y plantilla actualizados exitosamente');
    } catch (e) {
      console.error(e);
      toast.error('Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  if (!editingCert) return null;

  return (
    <div className="bg-card w-full min-h-[calc(100vh-4rem)] relative flex flex-col rounded-2xl border border-border shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/certificados')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-foreground">Editor Visual de Certificado</h2>
            <p className="text-sm text-muted-foreground mt-1">Código: {editingCert.codigo}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/certificados')}
            className="px-6 py-2.5 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
          >
            Volver
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold bg-[#1FC451] text-white hover:bg-[#19a343] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Guardar Cambios
          </button>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="p-6 overflow-y-auto bg-muted/10 flex-1">
        <div className="bg-white mx-auto shadow-lg relative p-8 md:p-12 pb-24 md:pb-32 my-8" style={{ maxWidth: '900px', minHeight: '500px', color: '#1a1a1a', border: '1px solid #e5e5e5' }}>
          {/* Decorative border */}
          <div className="absolute inset-4 border-2 border-[#1FC451] opacity-30 pointer-events-none" />
          <div className="absolute inset-5 border border-[#1FC451] opacity-20 pointer-events-none" />

          <div className="text-center space-y-6 relative z-10 h-full flex flex-col justify-center">
            <input 
              value={editingConfig?.titulo_certificado || ''}
              onChange={e => setEditingConfig({...editingConfig, titulo_certificado: e.target.value})}
              className="text-[#1FC451] font-bold text-lg tracking-[0.2em] uppercase bg-transparent text-center border-b border-transparent hover:border-[#1FC451]/30 focus:border-[#1FC451] focus:outline-none transition-colors w-full"
              placeholder="Título del Certificado"
            />
            
            <input
              value={editingConfig?.subtitulo_certificado || ''}
              onChange={e => setEditingConfig({...editingConfig, subtitulo_certificado: e.target.value})}
              className="text-sm text-gray-500 bg-transparent text-center border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none transition-colors w-full"
              placeholder="Subtítulo"
            />
            
            <input
              type="text"
              value={editingCert.usuario_nombre}
              onChange={e => setEditingCert({...editingCert, usuario_nombre: e.target.value})}
              className="text-3xl md:text-5xl font-bold text-center w-full bg-transparent border-b-2 border-dashed border-gray-300 hover:border-[#1FC451] focus:border-[#1FC451] focus:outline-none text-[#111] py-2 transition-colors font-serif"
              placeholder="Nombre Completo"
            />

            <div className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto flex flex-wrap justify-center items-center gap-x-1 gap-y-2">
              {templateParts.map((part, index) => {
                if (part === '{tipo}') {
                  return (
                    <select
                      key={index}
                      value={editingCert.tipo_participacion || 'Estudiante'}
                      onChange={e => setEditingCert({...editingCert, tipo_participacion: e.target.value})}
                      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#1FC451] cursor-pointer"
                    >
                      <option value="Estudiante">Estudiante</option>
                      <option value="Ciudadano">Ciudadano</option>
                    </select>
                  );
                }
                if (part === '{periodo}') {
                  return (
                    <input
                      key={index}
                      type="text"
                      value={editingCert.periodo || ''}
                      onChange={e => setEditingCert({...editingCert, periodo: e.target.value})}
                      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-bold text-gray-800 w-24 text-center focus:outline-none focus:ring-1 focus:ring-[#1FC451]"
                      placeholder="Periodo"
                    />
                  );
                }
                if (part === '{count}') {
                  return (
                    <input
                      key={index}
                      type="number"
                      value={editingCert.registros_validados || 0}
                      onChange={e => setEditingCert({...editingCert, registros_validados: parseInt(e.target.value) || 0})}
                      className="bg-[#1FC451]/10 border border-[#1FC451]/30 rounded px-2 py-1 text-base font-bold text-[#1FC451] w-16 text-center focus:outline-none focus:ring-1 focus:ring-[#1FC451]"
                    />
                  );
                }
                
                // Texto estático
                return (
                  <span
                    key={index}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                      const newParts = [...templateParts];
                      newParts[index] = e.currentTarget.textContent || '';
                      setTemplateParts(newParts);
                    }}
                    className="outline-none hover:bg-gray-100 focus:bg-gray-100 border-b border-transparent hover:border-gray-300 focus:border-gray-400 min-w-[20px] transition-colors whitespace-pre-wrap"
                  >
                    {part}
                  </span>
                );
              })}
            </div>

            {/* Firmas */}
            <div className="flex justify-center gap-12 mt-12 pt-8">
              {editingConfig?.responsable_1_firma && (
                <div className="text-center">
                  <img src={urlFor(editingConfig.responsable_1_firma)} alt="Firma 1" className="h-16 object-contain mx-auto mb-2" />
                  <div className="border-t border-gray-400 w-48 pt-2">
                    <p className="font-bold text-xs">{editingConfig.responsable_1_nombre}</p>
                    <p className="text-xs text-gray-500">{editingConfig.responsable_1_cargo}</p>
                  </div>
                </div>
              )}
              {editingConfig?.responsable_2_firma && (
                <div className="text-center">
                  <img src={urlFor(editingConfig.responsable_2_firma)} alt="Firma 2" className="h-16 object-contain mx-auto mb-2" />
                  <div className="border-t border-gray-400 w-48 pt-2">
                    <p className="font-bold text-xs">{editingConfig.responsable_2_nombre}</p>
                    <p className="text-xs text-gray-500">{editingConfig.responsable_2_cargo}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Validation Box (Footer) */}
          <div className="absolute bottom-8 right-12 text-right text-[10px] md:text-xs text-gray-500 z-10 hidden sm:block">
            <p>Emitido el: {new Date(editingCert.fecha_emision).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="mt-2">
              Verifique la autenticidad de este<br/>
              documento en: <strong className="text-gray-700">{editingConfig?.url_validacion || 'plant-or.com'}</strong>
            </div>
            <div className="mt-1">
              Código: <span className="font-mono font-bold text-gray-800">{editingCert.codigo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
