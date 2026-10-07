import { useState } from 'react'
import { ChevronDown, Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { Boton } from '../interfaz/Boton'
import { Selector } from '../interfaz/Selector'
import { combinarClases } from '../../utilidades/combinarClases'
import type { FiltrosMiembros as DatosFiltrosMiembros, AreaVoluntario, EstadoVoluntario } from '../../tipos/voluntario'

interface PropiedadesFiltrosMiembros {
  filtros: DatosFiltrosMiembros
  alCambiar: (filtros: DatosFiltrosMiembros) => void
  puedeBuscarDni: boolean
  cantidadResultados: number
}

const filtrosVacios: DatosFiltrosMiembros = {
  busqueda: '', area: 'Todas', estado: 'Todos', gestion: 'Todas', busquedaProyecto: '', participacionMinima: 0,
}

export function FiltrosMiembros({ filtros, alCambiar, puedeBuscarDni, cantidadResultados }: PropiedadesFiltrosMiembros) {
  const [filtrosAvanzadosAbiertos, establecerFiltrosAvanzadosAbiertos] = useState(false)
  const hayFiltrosActivos = Boolean(
    filtros.busqueda || filtros.area !== 'Todas' || filtros.estado !== 'Todos'
    || filtros.gestion !== 'Todas' || filtros.busquedaProyecto || filtros.participacionMinima,
  )

  return (
    <section className="rounded-2xl border border-[#dfe6eb] bg-white p-4 shadow-[0_1px_2px_rgba(20,45,63,.03)] md:p-5" aria-label="Filtros de miembros">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#263746]"><Filter className="size-4 text-[#004373]" /> Filtros</div>
        <span className="text-xs font-medium text-[#71808d]">{cantidadResultados} resultado{cantidadResultados === 1 ? '' : 's'}</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1.7fr)_1fr_1fr_1fr_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar miembros</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#71808d]" />
          <input
            value={filtros.busqueda}
            onChange={(evento) => alCambiar({ ...filtros, busqueda: evento.target.value })}
            placeholder={puedeBuscarDni ? 'Buscar por nombre o DNI exacto' : 'Buscar por nombre'}
            className="h-11 w-full rounded-xl border border-[#d6e0e7] bg-white pl-10 pr-3 text-sm text-[#263746] outline-none transition placeholder:text-[#96a1aa] hover:border-[#aebfca] focus:border-[#004373] focus:ring-3 focus:ring-[#004373]/10"
          />
        </label>
        <Selector valor={filtros.area} alCambiarValor={(area) => alCambiar({ ...filtros, area: area as 'Todas' | AreaVoluntario })} etiqueta="Filtrar por área" opciones={['Todas', 'TI', 'GTH', 'Marketing', 'PMO', 'Sostenibilidad']} />
        <Selector valor={filtros.estado} alCambiarValor={(estado) => alCambiar({ ...filtros, estado: estado as 'Todos' | EstadoVoluntario })} etiqueta="Filtrar por estado" opciones={['Todos', 'Activo', 'Inactivo', 'Suspendido']} />
        <Selector valor={filtros.gestion} alCambiarValor={(gestion) => alCambiar({ ...filtros, gestion })} etiqueta="Filtrar por gestión" opciones={['Todas', '2026-I', '2025-II', '2025-I']} />
        <Boton type="button" variante="secundaria" onClick={() => establecerFiltrosAvanzadosAbiertos((abiertos) => !abiertos)} aria-expanded={filtrosAvanzadosAbiertos} aria-controls="filtros-avanzados-miembros">
          <SlidersHorizontal className="size-4" /> Más
          <ChevronDown className={combinarClases('size-4 transition-transform', filtrosAvanzadosAbiertos && 'rotate-180')} />
        </Boton>
        <Boton type="button" variante="secundaria" tamano="icono" onClick={() => alCambiar(filtrosVacios)} disabled={!hayFiltrosActivos} aria-label="Limpiar filtros" title="Limpiar filtros"><RotateCcw className="size-4" /></Boton>
      </div>

      {filtrosAvanzadosAbiertos && (
        <div id="filtros-avanzados-miembros" className="mt-4 grid gap-4 border-t border-[#e7edf0] pt-4 md:grid-cols-[minmax(220px,1fr)_minmax(260px,1.2fr)]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#536473]">Proyecto</span>
            <input
              value={filtros.busquedaProyecto}
              onChange={(evento) => alCambiar({ ...filtros, busquedaProyecto: evento.target.value })}
              placeholder="Nombre o responsabilidad"
              className="h-11 w-full rounded-xl border border-[#d6e0e7] bg-white px-3 text-sm text-[#263746] outline-none transition placeholder:text-[#96a1aa] hover:border-[#aebfca] focus:border-[#004373] focus:ring-3 focus:ring-[#004373]/10"
            />
          </label>
          <label className="block rounded-xl bg-[#f7fafb] px-4 py-3">
            <span className="flex items-center justify-between gap-3 text-xs font-semibold text-[#536473]">
              Participación mínima <strong className="text-sm text-[#004373]">{filtros.participacionMinima}%</strong>
            </span>
            <input
              type="range" min="0" max="100" step="5" value={filtros.participacionMinima}
              onChange={(evento) => alCambiar({ ...filtros, participacionMinima: Number(evento.target.value) })}
              className="mt-3 w-full accent-[#004373]"
            />
          </label>
          <p className="text-xs leading-5 text-[#71808d] md:col-span-2">
            {puedeBuscarDni ? 'La búsqueda por DNI requiere coincidencia exacta.' : 'Tu rol no permite buscar ni visualizar documentos de identidad.'}
          </p>
        </div>
      )}
    </section>
  )
}
