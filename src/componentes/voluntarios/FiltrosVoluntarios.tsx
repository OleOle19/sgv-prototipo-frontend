import { useState, type ReactNode } from 'react'
import { ChevronDown, Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { Boton } from '../interfaz/Boton'
import { Selector } from '../interfaz/Selector'
import { combinarClases } from '../../utilidades/combinarClases'
import type {
  AreaVoluntario,
  EstadoVoluntario,
  FiltrosVoluntarios as DatosFiltrosVoluntarios,
} from '../../tipos/voluntario'

interface PropiedadesFiltrosVoluntarios {
  filtros: DatosFiltrosVoluntarios
  alCambiar: (filtros: DatosFiltrosVoluntarios) => void
  puedeBuscarDni: boolean
  cantidadResultados: number
  proyectosDisponibles: string[]
}

const filtrosVacios: DatosFiltrosVoluntarios = {
  busqueda: '',
  area: 'Todas',
  estado: 'Todos',
  periodoIngreso: 'Todos',
  proyecto: 'Todos los proyectos',
  participacionMinima: 0,
  mostrarRetirados: false,
}

function EtiquetaFiltro({ children }: { children: ReactNode }) {
  return <span className="mb-1.5 block text-xs font-semibold text-[#536473]">{children}</span>
}

export function FiltrosVoluntarios({
  filtros,
  alCambiar,
  puedeBuscarDni,
  cantidadResultados,
  proyectosDisponibles,
}: PropiedadesFiltrosVoluntarios) {
  const [filtrosAvanzadosAbiertos, establecerFiltrosAvanzadosAbiertos] = useState(false)
  const [participacionTemporal, establecerParticipacionTemporal] = useState(filtros.participacionMinima)

  const hayFiltrosActivos = Boolean(
    filtros.busqueda
    || filtros.area !== 'Todas'
    || filtros.estado !== 'Todos'
    || filtros.periodoIngreso !== 'Todos'
    || filtros.proyecto !== 'Todos los proyectos'
    || filtros.participacionMinima
    || filtros.mostrarRetirados,
  )
  const opcionesEstado = filtros.mostrarRetirados
    ? ['Todos', 'Activo', 'Suspendido', 'Retirado']
    : ['Todos', 'Activo', 'Suspendido']

  const cambiarVisibilidadRetirados = (mostrarRetirados: boolean) => {
    alCambiar({
      ...filtros,
      mostrarRetirados,
      estado: !mostrarRetirados && filtros.estado === 'Retirado' ? 'Todos' : filtros.estado,
    })
  }

  const confirmarParticipacion = () => {
    if (participacionTemporal !== filtros.participacionMinima) {
      alCambiar({ ...filtros, participacionMinima: participacionTemporal })
    }
  }

  return (
    <section className="rounded-2xl border border-[#dfe6eb] bg-white p-4 shadow-[0_1px_2px_rgba(20,45,63,.03)] md:p-5" aria-label="Filtros de voluntarios">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#263746]"><Filter className="size-4 text-[#004373]" /> Filtros</div>
        <span className="text-xs font-medium text-[#71808d]">{cantidadResultados} resultado{cantidadResultados === 1 ? '' : 's'}</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(230px,1.6fr)_minmax(130px,.8fr)_minmax(140px,.9fr)_minmax(160px,1fr)_auto]">
        <label className="block">
          <EtiquetaFiltro>Nombre</EtiquetaFiltro>
          <span className="relative block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#71808d]" />
            <input
              value={filtros.busqueda}
              onChange={(evento) => alCambiar({ ...filtros, busqueda: evento.target.value })}
              placeholder={puedeBuscarDni ? 'Nombre o DNI exacto' : 'Nombre del voluntario'}
              className="h-11 w-full rounded-xl border border-[#d6e0e7] bg-white pl-10 pr-3 text-sm text-[#263746] outline-none transition placeholder:text-[#96a1aa] hover:border-[#aebfca] focus:border-[#004373] focus:ring-3 focus:ring-[#004373]/10"
            />
          </span>
        </label>
        <div>
          <EtiquetaFiltro>Área</EtiquetaFiltro>
          <Selector valor={filtros.area} alCambiarValor={(area) => alCambiar({ ...filtros, area: area as 'Todas' | AreaVoluntario })} etiqueta="Área" opciones={['Todas', 'TI', 'MKT', 'LTK/FNZ', 'PMO', 'GTH']} />
        </div>
        <div>
          <EtiquetaFiltro>Estado</EtiquetaFiltro>
          <Selector valor={filtros.estado} alCambiarValor={(estado) => alCambiar({ ...filtros, estado: estado as 'Todos' | EstadoVoluntario })} etiqueta="Estado" opciones={opcionesEstado} />
        </div>
        <div>
          <EtiquetaFiltro>Período de ingreso</EtiquetaFiltro>
          <Selector valor={filtros.periodoIngreso} alCambiarValor={(periodoIngreso) => alCambiar({ ...filtros, periodoIngreso })} etiqueta="Período de ingreso" opciones={['Todos', '2026-I', '2025-II', '2025-I']} />
        </div>
        <div className="flex items-end justify-end gap-2">
          <Boton type="button" variante="secundaria" onClick={() => establecerFiltrosAvanzadosAbiertos((abiertos) => !abiertos)} aria-expanded={filtrosAvanzadosAbiertos} aria-controls="filtros-avanzados-voluntarios">
            <SlidersHorizontal className="size-4" /> Más
            <ChevronDown className={combinarClases('size-4 transition-transform', filtrosAvanzadosAbiertos && 'rotate-180')} />
          </Boton>
          <Boton
            type="button"
            variante="secundaria"
            tamaño="icono"
            onClick={() => { establecerParticipacionTemporal(0); alCambiar(filtrosVacios) }}
            disabled={!hayFiltrosActivos}
            aria-label="Restablecer filtros"
            title="Restablecer filtros"
          ><RotateCcw className="size-4" /></Boton>
        </div>
      </div>

      {filtrosAvanzadosAbiertos && (
        <div id="filtros-avanzados-voluntarios" className="mt-4 grid gap-4 border-t border-[#e7edf0] pt-4 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_minmax(260px,1.2fr)_minmax(220px,.8fr)]">
          <div>
            <EtiquetaFiltro>Proyecto</EtiquetaFiltro>
            <Selector
              valor={filtros.proyecto}
              alCambiarValor={(proyecto) => alCambiar({ ...filtros, proyecto })}
              etiqueta="Proyecto"
              opciones={['Todos los proyectos', ...proyectosDisponibles]}
            />
          </div>
          <label className="block rounded-xl bg-[#f7fafb] px-4 py-3">
            <span className="flex items-center justify-between gap-3 text-xs font-semibold text-[#536473]">
              Participación mínima <strong className="text-sm text-[#004373]">{participacionTemporal}%</strong>
            </span>
            <input
              type="range" min="0" max="100" step="5" value={participacionTemporal}
              onChange={(evento) => establecerParticipacionTemporal(Number(evento.target.value))}
              onPointerUp={confirmarParticipacion}
              onKeyUp={confirmarParticipacion}
              onBlur={confirmarParticipacion}
              className="mt-3 w-full accent-[#004373] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb025]"
            />
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#dfe6eb] px-4 py-3 text-sm font-medium text-[#425463]">
            <input
              type="checkbox"
              checked={filtros.mostrarRetirados}
              onChange={(evento) => cambiarVisibilidadRetirados(evento.target.checked)}
              className="size-4 accent-[#004373]"
            />
            Incluir voluntarios retirados
          </label>
          <p className="text-xs leading-5 text-[#71808d] md:col-span-2 xl:col-span-3">
            {puedeBuscarDni ? 'La búsqueda por DNI requiere una coincidencia exacta.' : 'Tu rol no permite buscar ni visualizar documentos de identidad.'}
          </p>
        </div>
      )}
    </section>
  )
}
