import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignIn, useUser, useAuth, UserProfile } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { esES } from '@clerk/localizations'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useTheme } from '@/components/ThemeProvider'

const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'))
const ValidacionesPage = React.lazy(() => import('@/pages/ValidacionesPage'))
const PlantaDetailPage = React.lazy(() => import('@/pages/PlantaDetailPage'))
const MapaPage = React.lazy(() => import('@/pages/MapaPage'))
const FiltrosPage = React.lazy(() => import('@/pages/FiltrosPage'))
const CertificadosPage = React.lazy(() => import('@/pages/CertificadosPage'))

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ProfileWithLoading() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center w-full pt-10">
      {loading && (
        <div className="flex items-start justify-center w-full h-[40vh] pt-10 z-50">
          <LoadingSpinner text="Cargando configuración de cuenta..." />
        </div>
      )}
      <div className={loading ? 'hidden' : 'cascade-item w-full flex justify-center'}>
        <UserProfile appearance={{ elements: { card: 'bg-card border-border', headerTitle: 'hidden', headerSubtitle: 'hidden' } }} />
      </div>
    </div>
  );
}

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
          onClick={async () => {
            await signOut();
            window.location.href = '/admin';
          }}
          className="px-6 py-3 bg-[#1FC451] hover:bg-[#19a343] text-white font-bold rounded-lg transition-colors cursor-pointer"
        >
          Cerrar sesión y volver
        </button>
      </div>
    );
  }
  
  return <>{children}</>;
}

export default function AdminApp() {
  const { theme } = useTheme()

  React.useEffect(() => {
    document.title = 'Plant-Or Admin';
    return () => { document.title = 'Plant-Or'; };
  }, []);

  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      signInFallbackRedirectUrl="/admin"
      signUpFallbackRedirectUrl="/admin"
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
      <SignedOut>
        <div className="auth-container min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <SignIn routing="hash" fallbackRedirectUrl="/admin" />
        </div>
      </SignedOut>

      <SignedIn>
        <RoleCheck>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative z-10">
              <div className="p-6 pt-20 md:p-8 md:pt-8 max-w-7xl mx-auto">
                <React.Suspense fallback={<div className="flex justify-center items-center h-[50vh]"><LoadingSpinner text="Cargando página..." /></div>}>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/validaciones" element={<ValidacionesPage key="pendientes" filtroEstado="En revisión" />} />
                    <Route path="/aprobados" element={<ValidacionesPage key="aprobados" filtroEstado="Validado" />} />
                    <Route path="/catalogo" element={<ValidacionesPage key="catalogo" />} />
                    <Route path="/mapa" element={<MapaPage />} />
                    <Route path="/filtros" element={<FiltrosPage />} />
                    <Route path="/certificados" element={<CertificadosPage />} />
                    <Route path="/planta/:id" element={<PlantaDetailPage />} />
                    <Route path="/perfil" element={<ProfileWithLoading />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </React.Suspense>
              </div>
            </main>
          </div>
        </RoleCheck>
      </SignedIn>
    </ClerkProvider>
  )
}
