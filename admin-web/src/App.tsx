import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser, useAuth, UserProfile } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { XCircle } from 'lucide-react'
import { Toaster } from 'sonner'
import { esES } from '@clerk/localizations'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import DashboardPage from '@/pages/DashboardPage'
import ValidacionesPage from '@/pages/ValidacionesPage'
import PlantaDetailPage from '@/pages/PlantaDetailPage'
import MapaPage from '@/pages/MapaPage'
import FiltrosPage from '@/pages/FiltrosPage'
import ValidarCertificadoPage from '@/pages/ValidarCertificadoPage'
import CertificadosPage from '@/pages/CertificadosPage'
import '@/index.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function RoleCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const { signOut } = useAuth();
  
  if (!user) return null;
  
  const role = user.publicMetadata.role as string | undefined;
  
  if (role !== 'admin' && role !== 'profesor_validador') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Acceso Denegado</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Tu cuenta "{user.primaryEmailAddress?.emailAddress}" no tiene permisos de administrador o profesor validador para acceder a este panel.
        </p>
        <button
          onClick={() => signOut()}
          className="px-6 py-3 bg-[#1FC451] hover:bg-[#19a343] text-white font-bold rounded-lg transition-colors cursor-pointer"
        >
          Cerrar sesión y volver
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}

function MainContent() {
  return (
    <>
      <SignedOut>
        <div className="auth-container min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <SignIn routing="hash" />
        </div>
      </SignedOut>

      <SignedIn>
        <RoleCheck>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10">
              <div className="p-6 pt-20 md:p-8 md:pt-8 max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/validaciones" element={<ValidacionesPage key="pendientes" filtroEstado="En revisión" />} />
                  <Route path="/aprobados" element={<ValidacionesPage key="aprobados" filtroEstado="Validado" />} />
                  <Route path="/catalogo" element={<ValidacionesPage key="catalogo" />} />
                  <Route path="/mapa" element={<MapaPage />} />
                  <Route path="/filtros" element={<FiltrosPage />} />
                  <Route path="/certificados" element={<CertificadosPage />} />
                  <Route path="/planta/:id" element={<PlantaDetailPage />} />
                  <Route path="/perfil" element={<div className="flex justify-center"><UserProfile appearance={{ elements: { card: 'bg-card border-border' } }} /></div>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </RoleCheck>
      </SignedIn>
    </>
  );
}

function ClerkApp() {
  const { theme } = useTheme()
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      localization={{
        ...esES,
        signIn: {
          ...esES.signIn,
          start: {
            ...esES.signIn?.start,
            title: '🌿 PLANT-OR',
            subtitle: 'Inicia sesión con tu correo o cuenta de Google',
            actionText: '',
            actionLink: ''
          }
        }
      }}
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: '#1FC451',
          borderRadius: '0.75rem',
        },
        elements: {
          card: "shadow-2xl border border-border w-full max-w-[400px] p-8 bg-card",
          headerTitle: "text-2xl font-bold text-center text-[#1FC451]",
          headerSubtitle: "text-center text-muted-foreground",
          socialButtonsBlockButton: "border-2 border-border bg-transparent hover:bg-muted transition-colors py-2.5",
          socialButtonsBlockButtonText: "!text-foreground font-medium",
          formButtonPrimary: "bg-[#1FC451] hover:bg-[#19a343] text-black font-bold shadow-none py-2.5 transition-colors",
          formFieldLabel: "text-muted-foreground font-medium",
          formFieldInput: "bg-input border-border text-foreground focus:border-[#1FC451] py-2.5",
          footerAction: "hidden",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
          identityPreviewText: "text-foreground",
          identityPreviewEditButtonIcon: "text-[#1FC451]",
          formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground"
        }
      }}
    >
      <BrowserRouter>
        <Toaster richColors position="top-right" theme="dark" />
        <Routes>
          <Route path="/validar" element={<ValidarCertificadoPage />} />
          <Route path="*" element={<MainContent />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="plantor-ui-theme">
      <ClerkApp />
    </ThemeProvider>
  )
}
