import React, { useState, useEffect, useRef } from 'react';
import { client, urlFor } from '../lib/sanity';
import { Award, Search, Edit2, X, Save, Loader2, Calendar, ArrowLeft, Settings, Upload, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/clerk-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Mode state
  const [viewMode, setViewMode] = useState<'list' | 'edit_global' | 'edit_student'>('list');
  const [editingCert, setEditingCert] = useState<Certificado | null>(null);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [templateParts, setTemplateParts] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // File inputs for signatures
  const firma1Ref = useRef<HTMLInputElement>(null);
  const firma2Ref = useRef<HTMLInputElement>(null);

  // Certificate scale for mobile responsiveness
  const canvasRef = useRef<HTMLDivElement>(null);
  const [certScale, setCertScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (canvasRef.current) {
        const containerWidth = canvasRef.current.clientWidth - 32; // padding
        setCertScale(Math.min(1, containerWidth / 900));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [viewMode]);

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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCerts.length / itemsPerPage);
  const paginatedCerts = filteredCerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (viewMode !== 'list' && editingCert && editingConfig) {
    const isGlobal = viewMode === 'edit_global';
    
    return (
      <div className="bg-card w-full min-h-[calc(100vh-4rem)] relative flex flex-col rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 border-b border-border bg-muted/30 gap-4">
          <div className="flex flex-col items-start gap-2">
            <button 
              onClick={handleCancel}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer pr-3"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Volver</span>
            </button>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {isGlobal ? 'Editor de Plantilla Global' : 'Corregir Nombre del Estudiante'}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isGlobal ? 'Estos cambios afectarán a todos los certificados' : `Código: ${editingCert.codigo}`}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button 
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium text-foreground border border-border hover:bg-muted transition-colors cursor-pointer order-2 sm:order-1"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold bg-[#1FC451] text-white hover:bg-[#19a343] transition-colors disabled:opacity-50 cursor-pointer order-1 sm:order-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Visual Canvas */}
        <div 
          ref={canvasRef}
          className="p-4 md:p-6 overflow-y-auto overflow-x-hidden bg-muted/10 flex-1 relative flex justify-center items-start pt-4 md:pt-8"
        >
          
          <div className="relative shrink-0" style={{ width: 900 * certScale, height: 600 * certScale }}>
            <div className="bg-white shadow-2xl absolute top-0 left-0 p-12 overflow-hidden flex flex-col justify-between origin-top-left" style={{ 
              width: 900, 
              height: 600, 
              transform: `scale(${certScale})`,
              color: '#1a1a1a', 
              border: '15px solid #1FC451',
              backgroundImage: `repeating-linear-gradient(45deg, rgba(31,196,81,0.03) 0, rgba(31,196,81,0.03) 1px, transparent 1px, transparent 15px),
              repeating-linear-gradient(-45deg, rgba(31,196,81,0.03) 0, rgba(31,196,81,0.03) 1px, transparent 1px, transparent 15px),
              repeating-radial-gradient(circle at 50% 50%, rgba(31,196,81,0.02) 0, rgba(31,196,81,0.02) 2px, transparent 2px, transparent 30px)`
            }}>
            {/* Watermark Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-[400px] pointer-events-none z-0 select-none">
              🌿
            </div>

            {/* Logo at the top */}
            <div className="w-full text-center relative z-10 mb-4">
              {isGlobal ? (
                <input 
                  value={editingConfig?.nombre_proyecto || '🌿 PLANT-OR'}
                  onChange={e => setEditingConfig({...editingConfig, nombre_proyecto: e.target.value})}
                  className="text-[#1FC451] font-bold text-xl md:text-2xl bg-transparent text-center border-b border-transparent hover:border-[#1FC451]/30 focus:border-[#1FC451] focus:outline-none transition-colors w-full"
                  placeholder="Nombre del Proyecto"
                />
              ) : (
                <div className="text-[#1FC451] font-bold text-xl md:text-2xl">{editingConfig?.nombre_proyecto || '🌿 PLANT-OR'}</div>
              )}
            </div>

            {/* Main Text Content */}
            <div className="text-center space-y-6 relative z-10 w-full flex-1 flex flex-col justify-center items-center pb-8">
              
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
              <div className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto text-center" style={{ display: 'inline-block' }}>
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
                        className="outline-none hover:bg-gray-100 focus:bg-gray-100 border-b border-transparent hover:border-gray-300 focus:border-gray-400 min-w-[20px] transition-colors whitespace-pre-wrap inline"
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
              <div className="flex gap-12 md:gap-24 items-end">
                {/* Firma 1 */}
                {(isGlobal || editingConfig?.responsable_1_nombre) && (
                <div className="w-48 text-center relative group">
                  <div 
                    className={`h-24 mb-2 relative flex flex-col items-center justify-end border-2 border-dashed ${isGlobal ? 'border-transparent group-hover:border-[#1FC451] cursor-pointer bg-transparent group-hover:bg-gray-50' : 'border-transparent'} transition-all`}
                    onClick={() => isGlobal && firma1Ref.current?.click()}
                  >
                    {editingConfig?.responsable_1_firma ? (
                      <img src={urlFor(editingConfig.responsable_1_firma)} alt="Firma 1" className="max-h-20 object-contain" />
                    ) : (
                      isGlobal && <div className="text-xs text-gray-400 flex flex-col items-center pb-2"><Upload className="w-4 h-4 mb-1" /> Sin Firma 1</div>
                    )}
                    {isGlobal && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold rounded">
                        <Upload className="w-4 h-4 mr-1" /> Subir
                      </div>
                    )}
                    <input type="file" ref={firma1Ref} onChange={(e) => handleFileUpload(e, 'responsable_1_firma')} className="hidden" accept="image/png" />
                  </div>
                  
                  <div className={`w-full pt-2 min-h-[4rem] ${isGlobal || editingConfig?.responsable_1_nombre ? 'border-t border-gray-400' : ''}`}>
                    {isGlobal ? (
                      <div className="flex flex-col gap-1">
                        <input value={editingConfig.responsable_1_nombre || ''} onChange={e => setEditingConfig({...editingConfig, responsable_1_nombre: e.target.value})} className="font-bold text-[11px] md:text-xs text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Nombre Resposable 1" />
                        <input value={editingConfig.responsable_1_cargo || ''} onChange={e => setEditingConfig({...editingConfig, responsable_1_cargo: e.target.value})} className="text-[10px] md:text-[11px] text-gray-500 text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Cargo Responsable 1" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[11px] md:text-xs">{editingConfig?.responsable_1_nombre}</p>
                        <p className="text-[10px] md:text-[11px] text-gray-500 leading-tight">{editingConfig?.responsable_1_cargo}</p>
                      </div>
                    )}
                  </div>
                </div>
                )}

                {/* Firma 2 */}
                {(isGlobal || editingConfig?.responsable_2_nombre) && (
                <div className="w-48 text-center relative group">
                  <div 
                    className={`h-24 mb-2 relative flex flex-col items-center justify-end border-2 border-dashed ${isGlobal ? 'border-transparent group-hover:border-[#1FC451] cursor-pointer bg-transparent group-hover:bg-gray-50' : 'border-transparent'} transition-all`}
                    onClick={() => isGlobal && firma2Ref.current?.click()}
                  >
                    {editingConfig?.responsable_2_firma ? (
                      <img src={urlFor(editingConfig.responsable_2_firma)} alt="Firma 2" className="max-h-20 object-contain" />
                    ) : (
                      isGlobal && <div className="text-xs text-gray-400 flex flex-col items-center pb-2"><Upload className="w-4 h-4 mb-1" /> Sin Firma 2</div>
                    )}
                    {isGlobal && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold rounded">
                        <Upload className="w-4 h-4 mr-1" /> Subir
                      </div>
                    )}
                    <input type="file" ref={firma2Ref} onChange={(e) => handleFileUpload(e, 'responsable_2_firma')} className="hidden" accept="image/png" />
                  </div>
                  
                  <div className={`w-full pt-2 min-h-[4rem] ${isGlobal || editingConfig?.responsable_2_nombre ? 'border-t border-gray-400' : ''}`}>
                    {isGlobal ? (
                      <div className="flex flex-col gap-1">
                        <input value={editingConfig.responsable_2_nombre || ''} onChange={e => setEditingConfig({...editingConfig, responsable_2_nombre: e.target.value})} className="font-bold text-[11px] md:text-xs text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Nombre Resposable 2" />
                        <input value={editingConfig.responsable_2_cargo || ''} onChange={e => setEditingConfig({...editingConfig, responsable_2_cargo: e.target.value})} className="text-[10px] md:text-[11px] text-gray-500 text-center w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none" placeholder="Cargo Responsable 2" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-[11px] md:text-xs">{editingConfig?.responsable_2_nombre}</p>
                        <p className="text-[10px] md:text-[11px] text-gray-500 leading-tight">{editingConfig?.responsable_2_cargo}</p>
                      </div>
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
    </div>
  </div>
  );
}

  // --- LIST VIEW ---
  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 cascade-container">
        <div className="cascade-container">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 cascade-item">
            <Award className="w-6 h-6 text-primary" />
            Certificados Emitidos
          </h1>
          <p className="text-sm text-muted-foreground mt-1 cascade-item delay-1">
            Visualiza y corrige los nombres de los certificados generados por los usuarios.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-end w-full sm:w-auto cascade-container">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button 
              onClick={() => window.open('/validar', '_blank')}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 w-full sm:w-auto justify-center cursor-pointer cascade-item delay-2"
            >
              <ExternalLink className="w-5 h-5" />
              Validar Certificado
            </button>
            <button 
              onClick={handleEditGlobal}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-md shadow-primary/20 w-full sm:w-auto justify-center cursor-pointer cascade-item delay-3"
            >
              <Settings className="w-5 h-5" />
              Editar Plantilla
            </button>
          </div>
          
          <div className="relative w-full sm:w-64 cascade-item delay-4">
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
            <tbody className="divide-y divide-border cascade-container">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No se encontraron certificados
                  </td>
                </tr>
              ) : (
                paginatedCerts.map(cert => (
                  <tr key={cert._id} className="hover:bg-muted/30 transition-colors cascade-item">
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
                          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-secondary/5">
            <span className="text-sm text-muted-foreground">
              Página <span className="font-medium text-foreground">{currentPage}</span> de <span className="font-medium text-foreground">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-secondary text-foreground text-sm rounded-md hover:bg-accent disabled:opacity-50 transition-colors cursor-pointer"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-secondary text-foreground text-sm rounded-md hover:bg-accent disabled:opacity-50 transition-colors cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
