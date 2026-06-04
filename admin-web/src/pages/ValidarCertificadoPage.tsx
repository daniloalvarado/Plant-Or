import React, { useState } from 'react';
import { client } from '@/lib/sanity';
import { Search, CheckCircle, XCircle, Loader2, Award, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ValidarCertificadoPage() {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [buscado, setBuscado] = useState(false);

  const handleValidar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigo.trim()) return;

    setLoading(true);
    setBuscado(true);
    try {
      const data = await client.fetch(
        `*[_type == "certificado" && codigo == $codigo][0]`,
        { codigo: codigo.trim() }
      );
      setResultado(data || null);
    } catch (err) {
      console.error(err);
      setResultado(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#1FC451]/10 rounded-2xl flex items-center justify-center border border-[#1FC451]/20 mx-auto mb-6">
            <Award className="w-8 h-8 text-[#1FC451]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Validar Certificado</h1>
          <p className="text-slate-500">
            Ingresa el código único del certificado PLANT-OR para verificar su autenticidad.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleValidar} className="relative mb-8 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#1FC451] transition-colors" />
          </div>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
            placeholder="Ej: CERT-2026-ABC12"
            className="block w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:border-[#1FC451] focus:ring-1 focus:ring-[#1FC451] sm:text-lg transition-all text-slate-900 font-mono uppercase shadow-lg"
            required
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              disabled={loading || !codigo.trim()}
              className="px-6 py-2 bg-[#1FC451] hover:bg-[#19a343] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verificar'}
            </button>
          </div>
        </form>

        {/* Results */}
        {buscado && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {resultado ? (
              <div className="bg-white border border-[#1FC451]/30 rounded-2xl p-8 shadow-[0_0_40px_-15px_rgba(31,196,81,0.2)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1FC451]/5 rounded-bl-full -mr-16 -mt-16" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#1FC451]/10 p-3 rounded-full">
                    <CheckCircle className="w-8 h-8 text-[#1FC451]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Certificado Válido</h2>
                    <p className="text-sm text-[#1FC451] font-mono mt-1">{resultado.codigo}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Otorgado a</p>
                    <p className="text-xl font-semibold text-slate-900">{resultado.usuario_nombre}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Fecha de emisión</p>
                      <p className="text-slate-800">
                        {resultado.fecha_emision 
                          ? format(new Date(resultado.fecha_emision), "d 'de' MMMM, yyyy", { locale: es }) 
                          : 'Fecha desconocida'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-red-200 rounded-2xl p-8 shadow-[0_0_40px_-15px_rgba(239,68,68,0.1)] text-center">
                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Certificado No Encontrado</h2>
                <p className="text-slate-500">
                  El código <span className="font-mono text-slate-800">{codigo}</span> no corresponde a ningún certificado válido emitido por PLANT-OR. Verifica si hay errores tipográficos.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
