import { useState, type ReactNode } from 'react'
import {
  Bell, ChevronDown, ClipboardCheck, FileBarChart, FolderKanban, Gauge,
  HeartHandshake, Menu, Search, Settings, UserRound, UsersRound, X,
} from 'lucide-react'
import * as MenuDesplegable from '@radix-ui/react-dropdown-menu'
import { combinarClases } from '../utilidades/combinarClases'
import { Boton } from '../componentes/interfaz/Boton'
import type { RolAcceso } from '../tipos/voluntario'

interface PropiedadesEstructuraAplicacion {
  children: ReactNode
  paginaActual: 'voluntarios' | 'ficha' | 'proyecto'
  alNavegarVoluntarios: () => void
  rol: RolAcceso
  alCambiarRol: (rol: RolAcceso) => void
}

const navegacion = [
  { etiqueta: 'Resumen', icono: Gauge, deshabilitado: true },
  { etiqueta: 'Voluntarios', icono: UsersRound, activo: true },
  { etiqueta: 'Proyectos', icono: FolderKanban, deshabilitado: true },
  { etiqueta: 'Actividades', icono: ClipboardCheck, deshabilitado: true },
  { etiqueta: 'Asistencia', icono: HeartHandshake, deshabilitado: true },
  { etiqueta: 'Reportes', icono: FileBarChart, deshabilitado: true },
]

function Marca() {
  return (
    <div className="rounded-xl bg-white p-6">
      <img src="/marca/isologo-incubunt.png" alt="INCUBUNT: Inspira, Innova, Emprende" className="mx-auto h-auto w-[140px]" />
    </div>
  )
}

function ContenidoBarraLateral({ alNavegarVoluntarios }: { alNavegarVoluntarios: () => void }) {
  return (
    <>
      <div className="px-5 pb-8 pt-6"><Marca /></div>
      <nav className="flex-1 px-3" aria-label="Navegación principal">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300/70">Gestión</p>
        <div className="space-y-1">
          {navegacion.map(({ etiqueta, icono: Icono, activo, deshabilitado }) => (
            <button
              key={etiqueta}
              type="button"
              disabled={deshabilitado}
              onClick={activo ? alNavegarVoluntarios : undefined}
              className={combinarClases(
                'flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition',
                activo ? 'bg-white/12 font-semibold text-white shadow-[inset_3px_0_0_#ffb025]' : 'text-sky-100/70 hover:bg-white/7 hover:text-white',
                deshabilitado && 'cursor-default',
              )}
            >
              <Icono className="size-[18px]" />
              {etiqueta}
            </button>
          ))}
        </div>
      </nav>
      <button type="button" disabled className="mx-3 mb-5 flex h-11 items-center gap-3 rounded-xl px-3 text-sm text-sky-100/60">
        <Settings className="size-[18px]" /> Configuración
      </button>
    </>
  )
}

export function EstructuraAplicacion({ children, paginaActual, alNavegarVoluntarios, rol, alCambiarRol }: PropiedadesEstructuraAplicacion) {
  const [menuMovilAbierto, establecerMenuMovilAbierto] = useState(false)
  const titulo = paginaActual === 'voluntarios' ? 'Voluntarios' : paginaActual === 'proyecto' ? 'Proyecto' : 'Ficha de voluntario'

  const irAVoluntarios = () => {
    establecerMenuMovilAbierto(false)
    alNavegarVoluntarios()
  }

  return (
    <div className="min-h-screen bg-[#f3f6f8]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col bg-[#004373] lg:flex">
        <ContenidoBarraLateral alNavegarVoluntarios={irAVoluntarios} />
      </aside>

      {menuMovilAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Cerrar menú" className="absolute inset-0 bg-[#061c2c]/55 backdrop-blur-sm" onClick={() => establecerMenuMovilAbierto(false)} />
          <aside className="relative flex h-full w-[280px] flex-col bg-[#004373] shadow-2xl">
            <Boton variante="fantasma" tamaño="icono" className="absolute right-3 top-3 text-white hover:bg-white/10 hover:text-white" onClick={() => establecerMenuMovilAbierto(false)} aria-label="Cerrar menú">
              <X className="size-5" />
            </Boton>
            <ContenidoBarraLateral alNavegarVoluntarios={irAVoluntarios} />
          </aside>
        </div>
      )}

      <div className="min-w-0 lg:pl-[244px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center border-b border-[#e1e8ed] bg-white px-4 md:px-7">
          <Boton variante="fantasma" tamaño="icono" className="mr-2 lg:hidden" onClick={() => establecerMenuMovilAbierto(true)} aria-label="Abrir menú"><Menu className="size-5" /></Boton>
          <div className="min-w-0 flex-1">
            <p className="hidden text-xs font-medium text-[#7a8893] sm:block">Sistema de Gestión de Voluntariado</p>
            <h1 className="truncate font-display text-lg font-bold text-[#172432]">{titulo}</h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <Boton variante="fantasma" tamaño="icono" className="hidden sm:inline-flex" aria-label="Buscar"><Search className="size-5" /></Boton>
            <Boton variante="fantasma" tamaño="icono" className="relative" aria-label="Notificaciones">
              <Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-[#ffb025]" />
            </Boton>
            <div className="mx-1 hidden h-8 w-px bg-[#e1e8ed] sm:block" />
            <MenuDesplegable.Root>
              <MenuDesplegable.Trigger className="flex cursor-pointer items-center gap-2 rounded-xl p-1.5 text-left outline-none transition hover:bg-[#f3f6f8] focus:ring-3 focus:ring-[#004373]/10">
                <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e8f2f8] text-[#004373]"><UserRound className="size-4.5" /></div>
                <div className="hidden min-w-0 sm:block">
                  <div className="max-w-32 truncate text-xs font-semibold text-[#263746]">Usuario demo</div>
                  <div className="max-w-32 truncate text-[10px] text-[#71808d]">{rol}</div>
                </div>
                <ChevronDown className="hidden size-4 text-[#84919b] sm:block" />
              </MenuDesplegable.Trigger>
              <MenuDesplegable.Portal>
                <MenuDesplegable.Content align="end" sideOffset={8} className="z-50 w-56 rounded-xl border border-[#dbe4e9] bg-white p-1.5 shadow-xl">
                  <MenuDesplegable.Label className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#84919b]">Simular permisos de</MenuDesplegable.Label>
                  {(['Presidencia', 'Dirección GTH', 'Dirección de área'] as RolAcceso[]).map((rolDisponible) => (
                    <MenuDesplegable.Item key={rolDisponible} onSelect={() => alCambiarRol(rolDisponible)} className={combinarClases('cursor-pointer rounded-lg px-3 py-2.5 text-sm outline-none hover:bg-[#e8f2f8]', rolDisponible === rol && 'bg-[#e8f2f8] font-semibold text-[#004373]')}>{rolDisponible}</MenuDesplegable.Item>
                  ))}
                </MenuDesplegable.Content>
              </MenuDesplegable.Portal>
            </MenuDesplegable.Root>
          </div>
        </header>
        <main className="mx-auto min-w-0 max-w-[1440px] p-4 md:p-7 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
