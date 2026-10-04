import { useState, type ReactNode } from 'react'
import {
  Bell, ChevronDown, ClipboardCheck, FileBarChart, FolderKanban, Gauge,
  HeartHandshake, Menu, Search, Settings, ShieldCheck, UserRound, UsersRound, X,
} from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import type { AccessRole } from '../types/volunteer'

interface AppLayoutProps {
  children: ReactNode
  currentPage: 'members' | 'profile'
  onNavigateMembers: () => void
  role: AccessRole
  onRoleChange: (role: AccessRole) => void
}

const navigation = [
  { label: 'Resumen', icon: Gauge, disabled: true },
  { label: 'Miembros', icon: UsersRound, active: true },
  { label: 'Proyectos', icon: FolderKanban, disabled: true },
  { label: 'Actividades', icon: ClipboardCheck, disabled: true },
  { label: 'Asistencia', icon: HeartHandshake, disabled: true },
  { label: 'Reportes', icon: FileBarChart, disabled: true },
]

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/10 font-display text-xs font-extrabold tracking-[.08em] text-[#ffd27b] shadow-sm">
        SGV
      </div>
      <div>
        <div className="font-display text-[17px] font-bold tracking-[0.08em] text-white">INCUBUNT</div>
        <div className="text-[9px] font-medium tracking-[0.12em] text-sky-200">PROPUESTA FUNCIONAL</div>
      </div>
    </div>
  )
}

function SidebarContent({ onNavigateMembers }: { onNavigateMembers: () => void }) {
  return (
    <>
      <div className="px-5 pb-8 pt-6"><Brand /></div>
      <nav className="flex-1 px-3" aria-label="Navegación principal">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300/70">Gestión</p>
        <div className="space-y-1">
          {navigation.map(({ label, icon: Icon, active, disabled }) => (
            <button
              key={label}
              type="button"
              disabled={disabled}
              onClick={active ? onNavigateMembers : undefined}
              className={cn(
                'flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition',
                active ? 'bg-white/12 font-semibold text-white shadow-[inset_3px_0_0_#ffb025]' : 'text-sky-100/70 hover:bg-white/7 hover:text-white',
                disabled && 'cursor-default',
              )}
            >
              <Icon className="size-[18px]" />
              {label}
            </button>
          ))}
        </div>
      </nav>
      <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/7 p-3.5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-white"><ShieldCheck className="size-4 text-[#ffb025]" /> Entorno de propuesta</div>
        <p className="text-[11px] leading-5 text-sky-100/65">Los datos mostrados son ficticios y sirven para validar la experiencia.</p>
      </div>
      <button type="button" disabled className="mx-3 mb-5 flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-sky-100/60">
        <Settings className="size-[18px]" /> Configuración
      </button>
    </>
  )
}

export function AppLayout({ children, currentPage, onNavigateMembers, role, onRoleChange }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const title = currentPage === 'members' ? 'Miembros' : 'Ficha de voluntario'

  const goToMembers = () => {
    setMobileOpen(false)
    onNavigateMembers()
  }

  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col bg-[#004373] lg:flex">
        <SidebarContent onNavigateMembers={goToMembers} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Cerrar menú" className="absolute inset-0 bg-[#061c2c]/55 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex h-full w-[280px] flex-col bg-[#004373] shadow-2xl">
            <Button variant="ghost" size="icon" className="absolute right-3 top-3 text-white hover:bg-white/10 hover:text-white" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
              <X className="size-5" />
            </Button>
            <SidebarContent onNavigateMembers={goToMembers} />
          </aside>
        </div>
      )}

      <div className="min-w-0 lg:pl-[244px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-[#e1e8ed] bg-white/95 px-4 backdrop-blur md:px-7">
          <Button variant="ghost" size="icon" className="mr-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú"><Menu className="size-5" /></Button>
          <div className="min-w-0 flex-1">
            <p className="hidden text-xs font-medium text-[#7a8893] sm:block">Sistema de Gestión de Voluntariado</p>
            <h1 className="truncate font-display text-lg font-bold text-[#172432]">{title}</h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Buscar"><Search className="size-5" /></Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
              <Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-[#ffb025]" />
            </Button>
            <div className="mx-1 hidden h-8 w-px bg-[#e1e8ed] sm:block" />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="flex cursor-pointer items-center gap-2 rounded-xl p-1.5 text-left outline-none transition hover:bg-[#f3f6f8] focus:ring-3 focus:ring-[#004373]/10">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f2f8] text-[#004373]"><UserRound className="size-4.5" /></div>
                <div className="hidden min-w-0 sm:block">
                  <div className="max-w-32 truncate text-xs font-semibold text-[#263746]">Usuario demo</div>
                  <div className="max-w-32 truncate text-[10px] text-[#71808d]">{role}</div>
                </div>
                <ChevronDown className="hidden size-4 text-[#84919b] sm:block" />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" sideOffset={8} className="z-50 w-56 rounded-xl border border-[#dbe4e9] bg-white p-1.5 shadow-xl">
                  <DropdownMenu.Label className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#84919b]">Simular permisos de</DropdownMenu.Label>
                  {(['Presidencia', 'Dirección GTH', 'Dirección de área'] as AccessRole[]).map((item) => (
                    <DropdownMenu.Item key={item} onSelect={() => onRoleChange(item)} className={cn('cursor-pointer rounded-lg px-3 py-2.5 text-sm outline-none hover:bg-[#e8f2f8]', item === role && 'bg-[#e8f2f8] font-semibold text-[#004373]')}>{item}</DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </header>
        <main className="mx-auto min-w-0 max-w-[1440px] p-4 md:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
