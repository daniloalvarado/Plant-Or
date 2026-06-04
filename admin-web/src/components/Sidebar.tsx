import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { client } from '@/lib/sanity'
import {
  Map, ChevronLeft, ChevronRight, LogOut, Menu, SlidersHorizontal, Settings, Award, Sun, Moon, LayoutDashboard, Leaf, ClipboardList, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useTheme } from '@/components/ThemeProvider'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/catalogo', icon: Leaf, label: 'Catálogo' },
  { href: '/validaciones', icon: ClipboardList, label: 'Pendientes' },
  { href: '/aprobados', icon: CheckCircle, label: 'Aprobados' },
  { href: '/mapa', icon: Map, label: 'Mapa' },
  { href: '/filtros', icon: SlidersHorizontal, label: 'Filtros' },
  { href: '/certificados', icon: Award, label: 'Certificados' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const location = useLocation()
  const { signOut } = useClerk()
  const { user } = useUser()
  const { theme, setTheme } = useTheme()
  const [pendingCount, setPendingCount] = useState<number | null>(null)

  useEffect(() => {
    // Fetch inicial
    client.fetch('count(*[_type == "planta" && estado_revision == "En revisión" && !(_id in path("drafts.**"))])')
      .then(count => setPendingCount(count))
      .catch(console.error)

    // Escuchar cambios en tiempo real
    const subscription = client.listen('*[_type == "planta" && !(_id in path("drafts.**"))]')
      .subscribe(() => {
        client.fetch('count(*[_type == "planta" && estado_revision == "En revisión" && !(_id in path("drafts.**"))])')
          .then(count => setPendingCount(count))
          .catch(console.error)
      })

    return () => subscription.unsubscribe()
  }, [])

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar-background border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
          <Leaf className="w-6 h-6 text-[#1FC451]" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">PLANT-OR</p>
            <p className="text-xs text-muted-foreground">Panel Admin</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex ml-auto items-center justify-center p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 mt-2 cascade-container">
        {navItems.map((item) => {
          const active = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'relative group/nav flex items-center rounded-lg text-sm font-medium cascade-item-right',
                active
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                collapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-3 py-2.5'
              )}
            >
              <div className="relative flex-shrink-0">
                <item.icon className="w-4.5 h-4.5" />
                {collapsed && item.label === 'Pendientes' && pendingCount !== null && pendingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {pendingCount > 99 ? '99+' : pendingCount}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className="flex-1 flex items-center justify-between">
                  {item.label}
                  {item.label === 'Pendientes' && pendingCount !== null && pendingCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      {pendingCount > 99 ? '99+' : pendingCount}
                    </span>
                  )}
                </span>
              )}
              {collapsed && (
                <span className="absolute left-14 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded border border-border opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User + Collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2 cascade-container">
        {user && (
          <Link to="/perfil" onClick={() => setMobileOpen(false)} className={cn("relative group/nav flex items-center rounded-lg cursor-pointer cascade-item-right", collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-2 px-2 py-1.5 hover:bg-sidebar-accent group")}>
            <img
              src={user.imageUrl}
              alt={user.fullName || ''}
              className={cn("rounded-full border border-sidebar-border", collapsed ? "w-8 h-8" : "w-7 h-7")}
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{user.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            )}
            {collapsed && (
              <span className="absolute left-14 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded border border-border opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
                Mi Perfil
              </span>
            )}
          </Link>
        )}
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "relative group/nav flex items-center rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground cursor-pointer cascade-item-right",
            collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-2 px-3 py-2 w-full"
          )}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
          {!collapsed && <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>}
          {collapsed && (
            <span className="absolute left-14 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded border border-border opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
              {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            </span>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={() => setLogoutConfirmOpen(true)}
          className={cn(
            "relative group/nav flex items-center rounded-lg text-sm font-medium text-muted-foreground border border-transparent hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500 hover:border-red-500/20 transition-all cursor-pointer cascade-item-right",
            collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2.5 w-full"
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
          {collapsed && (
            <span className="absolute left-14 px-2 py-1 bg-popover text-popover-foreground text-xs font-bold rounded border border-border opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999] shadow-lg">
              Cerrar sesión
            </span>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 z-[1050] isolation-auto',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-72 h-full bg-sidebar-background shadow-2xl border-r border-sidebar-border flex-shrink-0">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Logout Confirm Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm space-y-4 shadow-2xl text-center">
            <h3 className="text-xl font-bold text-foreground">¿Cerrar sesión?</h3>
            <p className="text-sm text-muted-foreground">
              Saldrás del panel administrativo de PLANT-OR.
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => signOut()}
                className="px-5 py-2 text-sm bg-red-500/80 hover:bg-red-500/90 text-white font-semibold rounded-lg transition-all cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
