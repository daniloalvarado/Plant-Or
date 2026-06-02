import React, { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import { Award, Search, Edit2, X, Save, Loader2, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Editor State
  const [editingCert, setEditingCert] = useState<Certificado | null>(null);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState<any>(null);

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
      setConfig(configData);
    } catch (e) {
      console.error(e);
      toast.error('Error al cargar los certificados');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert: Certificado) => {
    setEditingCert({ ...cert });
  };

  const handleSave = async () => {
    if (!editingCert) return;
    setSaving(true);
    try {
      await client.patch(editingCert._id).set({
        usuario_nombre: editingCert.usuario_nombre,
        registros_validados: editingCert.registros_validados,
        tipo_participacion: editingCert.tipo_participacion,
        periodo: editingCert.periodo,
      }).commit();
      
      toast.success('Certificado actualizado exitosamente');
      setCertificados(certs => certs.map(c => c._id === editingCert._id ? editingCert : c));
      setEditingCert(null);
    } catch (e) {
      console.error(e);
      toast.error('Error al actualizar el certificado');
    } finally {
      setSaving(false);
    }
  };

  const filteredCerts = certificados.filter(c => 
    c.usuario_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Certificados Emitidos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Visualiza y corrige los datos de los certificados generados por los usuarios.
          </p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o código..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
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
                        <button 
                          onClick={() => handleEdit(cert)}
                          className="p-2 bg-primary/10 text-primary hover:bg-primary hover:text-black rounded-lg transition-colors inline-flex"
                          title="Editar Certificado"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Editor Visual Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setEditingCert(null)} />
          <div className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-4xl relative flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-bold text-foreground">Editor Visual de Certificado</h2>
                <p className="text-sm text-muted-foreground mt-1">Código: {editingCert.codigo}</p>
              </div>
              <button 
                onClick={() => setEditingCert(null)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Canvas */}
            <div className="p-6 overflow-y-auto bg-muted/20">
              <div className="bg-white mx-auto shadow-lg relative p-8 md:p-12" style={{ aspectRatio: '1.4/1', maxWidth: '800px', color: '#1a1a1a', border: '1px solid #e5e5e5' }}>
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-[#1FC451] opacity-30" pointerEvents="none" />
                <div className="absolute inset-5 border border-[#1FC451] opacity-20" pointerEvents="none" />

                <div className="text-center space-y-6 relative z-10 h-full flex flex-col justify-center">
                  <div className="text-[#1FC451] font-bold text-lg tracking-[0.2em] uppercase">Certificado de Reconocimiento</div>
                  
                  <div className="text-sm text-gray-500">Otorgado a:</div>
                  
                  {/* Editable Name */}
                  <input
                    type="text"
                    value={editingCert.usuario_nombre}
                    onChange={e => setEditingCert({...editingCert, usuario_nombre: e.target.value})}
                    className="text-3xl md:text-5xl font-bold text-center w-full bg-transparent border-b-2 border-dashed border-gray-300 hover:border-[#1FC451] focus:border-[#1FC451] focus:outline-none text-[#111] py-2 transition-colors font-serif"
                    placeholder="Nombre Completo"
                  />

                  {/* Editable Text Block */}
                  <div className="text-gray-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto flex flex-wrap justify-center items-center gap-x-1 gap-y-2">
                    <span>Por haber participado en el proyecto PLANT-OR en calidad de</span>
                    <select
                      value={editingCert.tipo_participacion || 'Estudiante'}
                      onChange={e => setEditingCert({...editingCert, tipo_participacion: e.target.value})}
                      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#1FC451]"
                    >
                      <option value="Estudiante">Estudiante</option>
                      <option value="Ciudadano">Ciudadano</option>
                    </select>
                    <span>, durante el periodo académico</span>
                    <input
                      type="text"
                      value={editingCert.periodo || ''}
                      onChange={e => setEditingCert({...editingCert, periodo: e.target.value})}
                      className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-sm font-semibold w-24 text-center focus:outline-none focus:ring-1 focus:ring-[#1FC451]"
                      placeholder="2026-I"
                    />
                    <span>. Aportando significativamente a la catalogación botánica con un total de</span>
                    <input
                      type="number"
                      value={editingCert.registros_validados || 0}
                      onChange={e => setEditingCert({...editingCert, registros_validados: parseInt(e.target.value) || 0})}
                      className="bg-[#1FC451]/10 border border-[#1FC451]/30 rounded px-2 py-1 text-base font-bold text-[#1FC451] w-20 text-center focus:outline-none focus:ring-1 focus:ring-[#1FC451]"
                    />
                    <span>especies validadas.</span>
                  </div>

                  <div className="text-xs text-gray-400 mt-8 italic">
                    (Nota: Las firmas y el diseño final se renderizarán en el PDF que descargue el usuario)
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex justify-end gap-3 bg-card rounded-b-2xl">
              <button 
                onClick={() => setEditingCert(null)}
                className="px-6 py-2.5 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold bg-[#1FC451] text-white hover:bg-[#19a343] transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Guardar Correcciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
