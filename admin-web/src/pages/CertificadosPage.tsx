import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import { Award, Search, Edit2, X, Save, Loader2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

import { Link } from 'react-router-dom';

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const certsData = await client.fetch(`*[_type == "certificado"] | order(fecha_emision desc)`);
      setCertificados(certsData);
    } catch (e) {
      console.error(e);
      toast.error('Error al cargar los certificados');
    } finally {
      setLoading(false);
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
                          <Link 
                          to={`/certificados/editar/${cert._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors inline-flex cursor-pointer"
                          title="Editar Certificado"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
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
