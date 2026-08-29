import React from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import '@/index.css'

const CatalogPage = React.lazy(() => import('@/pages/public/CatalogPage'))
const ValidarCertificadoPage = React.lazy(() => import('@/pages/ValidarCertificadoPage'))
const AdminApp = React.lazy(() => import('@/AdminApp'))

function RouterApp() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" theme="dark" />
      <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background"><LoadingSpinner text="Cargando..." /></div>}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<CatalogPage />} />
          <Route path="/validar" element={<ValidarCertificadoPage />} />
          
          {/* Rutas Protegidas de Admin (aislado con Clerk) */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="plantor-ui-theme">
      <RouterApp />
    </ThemeProvider>
  )
}
