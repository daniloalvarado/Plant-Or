import React, { useState, useEffect, useRef } from 'react';
import { client, urlFor } from '../lib/sanity';
import { Award, Search, Edit2, X, Save, Loader2, Calendar, ArrowLeft, Settings, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';

interface Certificado {
  _id: string;
  codigo: string;
  usuario_nombre: string;
  registros_validados: number;
  tipo_participacion: string;
  periodo: string;
  fecha_emision: string;
}

export default function CertificadosPage() {
  const { user } = useUser();
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mode state
  const [viewMode, setViewMode] = useState<'list' | 'edit_global' | 'edit_student'>('list');
  const [editingCert, setEditingCert] = useState<Certificado | null>(null);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [templateParts, setTemplateParts] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // File inputs for signatures
  const firma1Ref = useRef<HTMLInputElement>(null);
  const firma2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [certsData, configData] = await Promise.all([
        client.fetch(`*[_type == "certificado"] | order(fecha_emision desc)`),
        client.fetch(`*[_type == "configuracion"][0]`)
      ]);
      setCertificados(certsData);
      setEditingConfig(configData);
    } catch (e) {
      console.error(e);
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleEditGlobal = () => {
    // Generate template parts from current config
    const textBase = editingConfig?.texto_certificado || 'Por haber participado en el proyecto PLANT-OR en calidad de {tipo}, durante el periodo académico {periodo}. Aportando significativamente a la catalogación botánica con un total de {count} especies validadas.';
    setTemplateParts(textBase.split(/(\{tipo\}|\{periodo\}|\{count\})/g));
    
    // Set dummy data for the canvas
    setEditingCert({
      _id: 'dummy',
      codigo: 'CERT-EJEMPLO-123',
      usuario_nombre: user?.fullName || 'Profesor Validador',
      registros_validados: 100,
      tipo_participacion: 'Estudiante',
      periodo: 'del 14 de mayo del 2026 al 24 de agosto del 2026',
      fecha_emision: '2026-08-24T12:00:00.000Z'
    });
    
    setViewMode('edit_global');
  };

  const handleEditStudent = (cert: Certificado) => {
    // Generate template parts
    const textBase = editingConfig?.texto_certificado || 'Por haber participado en el proyecto PLANT-OR en calidad de {tipo}, durante el periodo académico {periodo}. Aportando significativamente a la catalogación botánica con un total de {count} especies validadas.';
    setTemplateParts(textBase.split(/(\{tipo\}|\{periodo\}|\{count\})/g));
    
    // Default fallback for old certs
    if (!cert.periodo) cert.periodo = '2026-I';
    
    setEditingCert({...cert});
    setViewMode('edit_student');
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingCert(null);
    fetchData(); // Reset unsaved local changes to editingConfig
  };

  const handleSave = async () => {
    if (!editingCert || !editingConfig) return;
    setSaving(true);
    try {
      if (viewMode === 'edit_global') {
        // Validation for signatures
        const f1Name = editingConfig.responsable_1_nombre?.trim();
        const f1Role = editingConfig.responsable_1_cargo?.trim();
        const f1Img = editingConfig.responsable_1_firma;
        const hasF1 = f1Name || f1Role || f1Img;
        if (hasF1 && (!f1Name || !f1Role || !f1Img)) {
          toast.error('Para la Firma 1, debes completar nombre, cargo y subir la firma (o dejar los tres vacíos).');
          setSaving(false);
          return;
        }

        const f2Name = editingConfig.responsable_2_nombre?.trim();
        const f2Role = editingConfig.responsable_2_cargo?.trim();
        const f2Img = editingConfig.responsable_2_firma;
        const hasF2 = f2Name || f2Role || f2Img;
        if (hasF2 && (!f2Name || !f2Role || !f2Img)) {
          toast.error('Para la Firma 2, debes completar nombre, cargo y subir la firma (o dejar los tres vacíos).');
          setSaving(false);
          return;
        }

        const newTextoCertificado = templateParts.join('');
        await client.patch(editingConfig._id).set({
          titulo_certificado: editingConfig.titulo_certificado,
          subtitulo_certificado: editingConfig.subtitulo_certificado,
          texto_certificado: newTextoCertificado,
          nombre_proyecto: editingConfig.nombre_proyecto,
          responsable_1_nombre: editingConfig.responsable_1_nombre,
          responsable_1_cargo: editingConfig.responsable_1_cargo,
          responsable_2_nombre: editingConfig.responsable_2_nombre,
          responsable_2_cargo: editingConfig.responsable_2_cargo,
          url_validacion: editingConfig.url_validacion,
        }).commit();
        
        toast.success('Plantilla global actualizada exitosamente');
      } else if (viewMode === 'edit_student') {
        await client.patch(editingCert._id).set({
          usuario_nombre: editingCert.usuario_nombre,
        }).commit();
        
        toast.success('Nombre del estudiante actualizado exitosamente');
        
        // Update local state list
        setCertificados(certs => certs.map(c => c._id === editingCert._id ? {...c, usuario_nombre: editingCert.usuario_nombre} : c));
      }
      
      setViewMode('list');
      setEditingCert(null);
      fetchData(); // Reload to be perfectly in sync
    } catch (e) {
      console.error(e);
      toast.error('Error al actualizar');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'responsable_1_firma' | 'responsable_2_firma') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/png')) {
      toast.error('Por favor sube una imagen PNG con fondo transparente');
      return;
    }

    const toastId = toast.loading('Subiendo firma...');
    try {
      const writeClient = client.withConfig({
        token: import.meta.env.VITE_SANITY_TOKEN,
      });

      const asset = await writeClient.assets.upload('image', file, {
        filename: file.name,
      });

      await writeClient.patch(editingConfig._id).set({
        [fieldName]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        }
      }).commit();

      // Update local state to reflect the new image immediately
      setEditingConfig({
        ...editingConfig,
        [fieldName]: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        }
      });

      toast.success('Firma actualizada correctamente', { id: toastId });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen', { id: toastId });
    }
  };

  const filteredCerts = certificados.filter(c => 
    c.usuario_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (viewMode !== 'list' && editingCert && editingConfig) {
    const isGlobal = viewMode === 'edit_global';
    
    return (
      <div className="bg-card w-full min-h-[calc(100vh-4rem)] relative flex flex-col rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCancel}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {isGlobal ? 'Editor de Plantilla Global' : 'Corregir Nombre del Estudiante'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isGlobal ? 'Estos cambios afectarán a todos los certificados' : `Código: ${editingCert.codigo}`}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-lg font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold bg-[#1FC451] text-white hover:bg-[#19a343] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Visual Canvas */}
        <div className="p-6 overflow-y-auto bg-muted/10 flex-1 relative">

          <div className="bg-white mx-auto shadow-2xl relative p-8 md:p-12 my-8 transition-all overflow-hidden flex flex-col justify-between" style={{ 
            maxWidth: '900px', 
            minHeight: '600px', 
            color: '#1a1a1a', 
            border: '15px solid #1FC451',
            backgroundImage: `repeating-linear-gradient(45deg, rgba(31,196,81,0.03) 0, rgba(31,196,81,0.03) 1px, transparent 1px, transparent 15px),
            repeating-linear-gradient(-45deg, rgba(31,196,81,0.03) 0, rgba(31,196,81,0.03) 1px, transparent 1px, transparent 15px),
            repeating-radial-gradient(circle at 50% 50%, rgba(31,196,81,0.02) 0, rgba(31,196,81,0.02) 2px, transparent 2px, transparent 30px)`
          }}>
            {/* Watermark Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-[300px] md:text-[400px] pointer-events-none z-0 select-none">
              🌿
            </div>

            {/* Main Text Content */}
            <div className="text-center space-y-6 relative z-10 w-full flex-1 flex flex-col justify-center items-center pb-8 pt-4">
              
              {isGlobal ? (
                <input 
                  value={editingConfig?.nombre_proyecto || '🌿 PLANT-OR'}
                  onChange={e => setEditingConfig({...editingConfig, nombre_proyecto: e.target.value})}
                  className="text-[#1FC451] font-bold text-xl md:text-2xl mb-2 bg-transparent text-center border-b border-transparent hover:border-[#1FC451]/30 focus:border-[#1FC451] focus:outline-none transition-colors w-full"
                  placeholder="Nombre del Proyecto"
                />
              ) : (
                <div className="text-[#1FC451] font-bold text-xl md:text-2xl mb-2">{editingConfig?.nombre_proyecto || '🌿 PLANT-OR'}</div>
              )}
              
              {/* Título */}
              {isGlobal ? (
                <input 
                  value={editingConfig?.titulo_certificado || ''}
                  onChange={e => setEditingConfig({...editingConfig, titulo_certificado: e.target.value})}
                  className="text-black font-bold text-xl md:text-3xl tracking-widest uppercase bg-transparent text-center focus:outline-none transition-colors w-full"
                  placeholder="Título del Certificado"
                />
              ) : (
                <div className="text-black font-bold text-xl md:text-3xl tracking-widest uppercase">{editingConfig?.titulo_certificado}</div>
              )}
              
              {/* Subtítulo */}
              {isGlobal ? (
                <input
                  value={editingConfig?.subtitulo_certificado || ''}
                  onChange={e => setEditingConfig({...editingConfig, subtitulo_certificado: e.target.value})}
                  className="text-sm text-gray-500 bg-transparent text-center border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none transition-colors w-full"
                  placeholder="Subtítulo"
                />
              ) : (
                <div className="text-sm text-gray-500">{editingConfig?.subtitulo_certificado}</div>
              )}
              
              {/* Nombre Alumno */}
              {isGlobal ? (
                <div className="text-center w-full my-4">
                  <div className="text-2xl md:text-4xl font-bold inline-block text-[#15963c] border-b-2 border-[#1FC451] px-10 pb-2 font-serif opacity-70" title="Nombre de Ejemplo">
                    {editingCert.usuario_nombre}
                  </div>
                </div>
              ) : (
                <div className="text-center w-full my-4">
                  <input
                    type="text"
                    value={editingCert.usuario_nombre}
                    onChange={e => setEditingCert({...editingCert, usuario_nombre: e.target.value})}
                    className="text-2xl md:text-4xl font-bold text-center inline-block bg-transparent border-b-2 border-[#1FC451] hover:border-[#15963c] focus:border-[#15963c] focus:outline-none text-[#15963c] px-10 pb-2 transition-colors font-serif min-w-[300px]"
                    placeholder="Nombre Completo"
                  />
                </div>
              )}

              {/* Párrafo */}
              <div className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto flex flex-wrap justify-center items-center gap-x-1 gap-y-2">
                {templateParts.map((part, index) => {
                  if (part === '{tipo}') {
                    return <strong key={index} className="text-gray-800">{editingCert.tipo_participacion || 'Estudiante'}</strong>;
                  }
                  if (part === '{periodo}') {
                    return <strong key={index} className="text-gray-800">{editingCert.periodo}</strong>;
                  }
                  if (part === '{count}') {
                    return <strong key={index} className="text-gray-800">{editingCert.registros_validados}</strong>;
                  }
                  
                  if (isGlobal) {
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
                  }
                  
                  return <span key={index}>{part}</span>;
                })}
              </div>
            </div>

            {/* Footer Container (Signatures & Validation) */}
            <div className="w-full flex justify-between items-end relative z-10 pt-4">
              
              {/* Firmas */}
              <div className="flex gap-12 md:gap-24">
                {/* Firma 1 */}
                {(isGlobal || editingConfig?.responsable_1_nombre) && (
                <div className="text-center relative group">
                  <div 
                    className={`h-20 mb-2 relative flex flex-col items-center justify-center border-2 border-dashed ${isGlobal ? 'border-transparent group-hover:border-[#1FC451] cursor-pointer bg-transparent group-hover:bg-gray-50' : 'border-transparent'} transition-all`}
                    onClick={() => isGlobal && firma1Ref.current?.click()}
                  >
                    {editingConfig?.responsable_1_firma ? (
                      <img src={urlFor(editingConfig.responsable_1_firma)} alt="Firma 1" className="h-16 object-contain" />
                    ) : (
                      isGlobal && <div className="text-xs text-gray-400 flex flex-col items-center"><Upload className="w-4 h-4 mb-1" /> Sin Firma 1</div>
                    )}
                    {isGlobal && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold rounded">
                        <Upload className="w-4 h-4 mr-1" /> Subir
                      </div>
                    )}
                    <input type="file" ref={firma1Ref} onChange={(e) => handleFileUpload(e, 'responsable_1_firma')} className="hidden" accept="image/png" />
                  </div>
                  
                  <div className={`w-48 pt-2 ${isGlobal || editingConfig?.responsable_1_nombre ? 'border-t border-gray-400' : ''}`}>
                    {isGlobal ? (
                      <>
                        <input value={editingConfig.responsable_1_nombre || ''} onChange={e => setEditingConfig({...editingConfig, responsable_1_nombre: e.target.value})} className="font-bold text-xs text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Nombre Resposable 1" />
                        <input value={editingConfig.responsable_1_cargo || ''} onChange={e => setEditingConfig({...editingConfig, responsable_1_cargo: e.target.value})} className="text-xs text-gray-500 text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none mt-1" placeholder="Cargo Responsable 1" />
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-xs">{editingConfig?.responsable_1_nombre}</p>
                        <p className="text-xs text-gray-500">{editingConfig?.responsable_1_cargo}</p>
                      </>
                    )}
                  </div>
                </div>
                )}

                {/* Firma 2 */}
                {(isGlobal || editingConfig?.responsable_2_nombre) && (
                <div className="text-center relative group">
                  <div 
                    className={`h-20 mb-2 relative flex flex-col items-center justify-center border-2 border-dashed ${isGlobal ? 'border-transparent group-hover:border-[#1FC451] cursor-pointer bg-transparent group-hover:bg-gray-50' : 'border-transparent'} transition-all`}
                    onClick={() => isGlobal && firma2Ref.current?.click()}
                  >
                    {editingConfig?.responsable_2_firma ? (
                      <img src={urlFor(editingConfig.responsable_2_firma)} alt="Firma 2" className="h-16 object-contain" />
                    ) : (
                      isGlobal && <div className="text-xs text-gray-400 flex flex-col items-center"><Upload className="w-4 h-4 mb-1" /> Sin Firma 2</div>
                    )}
                    {isGlobal && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold rounded">
                        <Upload className="w-4 h-4 mr-1" /> Subir
                      </div>
                    )}
                    <input type="file" ref={firma2Ref} onChange={(e) => handleFileUpload(e, 'responsable_2_firma')} className="hidden" accept="image/png" />
                  </div>
                  
                  <div className={`w-48 pt-2 ${isGlobal || editingConfig?.responsable_2_nombre ? 'border-t border-gray-400' : ''}`}>
                    {isGlobal ? (
                      <>
                        <input value={editingConfig.responsable_2_nombre || ''} onChange={e => setEditingConfig({...editingConfig, responsable_2_nombre: e.target.value})} className="font-bold text-xs text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Nombre Resposable 2" />
                        <input value={editingConfig.responsable_2_cargo || ''} onChange={e => setEditingConfig({...editingConfig, responsable_2_cargo: e.target.value})} className="text-xs text-gray-500 text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none mt-1" placeholder="Cargo Responsable 2" />
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-xs">{editingConfig?.responsable_2_nombre}</p>
                        <p className="text-xs text-gray-500">{editingConfig?.responsable_2_cargo}</p>
                      </>
                    )}
                  </div>
                </div>
                )}
              </div>

              {/* Validation Box */}
              <div className="text-right text-[10px] md:text-xs text-gray-500 hidden sm:block pb-2">
                <p>Emitido el: {new Date(editingCert.fecha_emision).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="mt-2">
                  Verifique la autenticidad de este<br/>
                  documento en: {isGlobal ? (
                    <input value={editingConfig.url_validacion || ''} onChange={e => setEditingConfig({...editingConfig, url_validacion: e.target.value})} className="text-gray-700 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none text-right font-bold w-32" placeholder="URL" />
                  ) : (
                  <strong className="text-gray-700">{editingConfig?.url_validacion || 'plant-or.com'}</strong>
                )}
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

  // --- LIST VIEW ---
  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Certificados Emitidos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visualiza y corrige los nombres de los certificados generados por los usuarios.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-end w-full sm:w-auto">
          <button 
            onClick={handleEditGlobal}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-md shadow-primary/20 w-full sm:w-auto justify-center cursor-pointer"
          >
            <Settings className="w-5 h-5" />
            Editar Plantilla Global
          </button>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar por nombre o código..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estudiante / Ciudadano</th>
                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plantas</th>
                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fecha de Emisión</th>
                <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No se encontraron certificados
                  </td>
                </tr>
              ) : (
                filteredCerts.map(cert => (
                  <tr key={cert._id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-medium text-primary">{cert.codigo}</td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-foreground">{cert.usuario_nombre}</div>
                      <div className="text-xs text-muted-foreground">{cert.tipo_participacion || 'No especificado'} • Periodo: {cert.periodo || 'N/A'}</div>
                    </td>
                    <td className="p-4 text-sm text-foreground">{cert.registros_validados || 0}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(cert.fecha_emision).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                        <div className="relative group inline-block">
                          <button 
                            onClick={() => handleEditStudent(cert)}
                            className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors inline-flex cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-black text-white text-xs font-bold rounded border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                            Corregir Nombre
                          </span>
                        </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
