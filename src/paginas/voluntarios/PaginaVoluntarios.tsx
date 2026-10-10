import { useMemo, useState } from 'react'
import {
  createColumnHelper as crearAyudanteColumnas,
  createPaginatedRowModel as crearModeloFilasPaginadas,
  rowPaginationFeature as funcionPaginacionFilas,
  tableFeatures as crearFuncionesTabla,
  useTable as usarTabla,
} from '@tanstack/react-table'
import {
  Activity, ArrowLeft, ArrowRight, ChevronRight, Clock3, Inbox,
  LockKeyhole, UsersRound,
} from 'lucide-react'
import { FotoPerfil } from '../../componentes/interfaz/FotoPerfil'
import { Boton } from '../../componentes/interfaz/Boton'
import { InsigniaEstado } from '../../componentes/interfaz/InsigniaEstado'
import { FiltrosVoluntarios } from '../../componentes/voluntarios/FiltrosVoluntarios'
import { voluntarios } from '../../datos/voluntarios'
import type {
  FiltrosVoluntarios as DatosFiltrosVoluntarios,
  PermisosAutorizacion,
  ResumenVoluntario,
} from '../../tipos/voluntario'

const funcionesTabla = crearFuncionesTabla({
  rowPaginationFeature: funcionPaginacionFilas,
  paginatedRowModel: crearModeloFilasPaginadas(),
})
type FuncionesTablaVoluntarios = typeof funcionesTabla
const ayudanteColumnas = crearAyudanteColumnas<FuncionesTablaVoluntarios, ResumenVoluntario>()

interface PropiedadesPaginaVoluntarios {
  permisos: PermisosAutorizacion
  alVerVoluntario: (id: string) => void
}

const ordenEstado = { Activo: 0, Suspendido: 1, Retirado: 2 } as const
const columnasSoloEscritorio = new Set(['carrera', 'ciclo', 'periodoIngreso', 'estado'])
const filtrosIniciales: DatosFiltrosVoluntarios = {
  busqueda: '',
  area: 'Todas',
  estado: 'Todos',
  periodoIngreso: 'Todos',
  proyecto: 'Todos los proyectos',
  participacionMinima: 0,
  mostrarRetirados: false,
}

function claseResponsivaColumna(id: string) {
  return columnasSoloEscritorio.has(id) ? 'hidden xl:table-cell' : ''
}

function ElementoResumen({ icono: Icono, valor, etiqueta }: { icono: typeof UsersRound; valor: string; etiqueta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#14527e] px-3.5 py-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#2c638b] text-[#ffd27b]"><Icono className="size-4.5" /></div>
      <div><div className="font-display text-lg font-bold leading-none text-white">{valor}</div><div className="mt-1 text-[11px] text-sky-100/80">{etiqueta}</div></div>
    </div>
  )
}

export function PaginaVoluntarios({ permisos, alVerVoluntario }: PropiedadesPaginaVoluntarios) {
  const [filtros, establecerFiltros] = useState<DatosFiltrosVoluntarios>({ ...filtrosIniciales })
  const areaSeleccionada = permisos.alcanceArea ?? filtros.area

  const voluntariosEnAlcance = useMemo(
    () => voluntarios.filter((voluntario) => !permisos.alcanceArea || voluntario.area === permisos.alcanceArea),
    [permisos.alcanceArea],
  )
  const voluntariosVigentes = useMemo(
    () => voluntariosEnAlcance.filter((voluntario) => voluntario.estado !== 'Retirado'),
    [voluntariosEnAlcance],
  )
  const proyectosDisponibles = useMemo(
    () => [...new Set(voluntariosEnAlcance.flatMap((voluntario) => voluntario.proyectos.map((proyecto) => proyecto.nombre)))]
      .sort((a, b) => a.localeCompare(b, 'es')),
    [voluntariosEnAlcance],
  )
  const resumen = useMemo(() => ({
    activos: voluntariosVigentes.filter((voluntario) => voluntario.estado === 'Activo').length,
    horas: voluntariosVigentes.reduce((suma, voluntario) => suma + voluntario.horas, 0),
    participacion: voluntariosVigentes.length
      ? Math.round(voluntariosVigentes.reduce((suma, voluntario) => suma + voluntario.participacion, 0) / voluntariosVigentes.length)
      : 0,
  }), [voluntariosVigentes])

  const datos = useMemo(() => {
    const busquedaNormalizada = filtros.busqueda.trim().toLocaleLowerCase('es')
    return voluntariosEnAlcance
      .filter((voluntario) => {
        const coincideBusqueda = !busquedaNormalizada
          || voluntario.nombre.toLocaleLowerCase('es').includes(busquedaNormalizada)
          || (permisos.puedeVerDni && voluntario.documento === busquedaNormalizada)
        const coincideProyecto = filtros.proyecto === 'Todos los proyectos'
          || voluntario.proyectos.some((proyecto) => proyecto.nombre === filtros.proyecto)
        const estadoVisible = voluntario.estado !== 'Retirado' || filtros.mostrarRetirados
        return coincideBusqueda
          && coincideProyecto
          && estadoVisible
          && (areaSeleccionada === 'Todas' || voluntario.area === areaSeleccionada)
          && (filtros.estado === 'Todos' || voluntario.estado === filtros.estado)
          && (filtros.periodoIngreso === 'Todos' || voluntario.periodoIngreso === filtros.periodoIngreso)
          && voluntario.participacion >= filtros.participacionMinima
      })
      .sort((a, b) => ordenEstado[a.estado] - ordenEstado[b.estado]
        || a.apellidos.localeCompare(b.apellidos, 'es', { sensitivity: 'base' }))
  }, [filtros, permisos.puedeVerDni, voluntariosEnAlcance, areaSeleccionada])

  const columnas = useMemo(() => ayudanteColumnas.columns([
    ayudanteColumnas.accessor('nombre', {
      header: 'Voluntario',
      cell: ({ row: fila }) => (
        <div className="flex min-w-[230px] items-center gap-3">
          <FotoPerfil iniciales={fila.original.iniciales} />
          <div><div className="font-semibold text-[#263746]">{fila.original.nombre}</div><div className="mt-0.5 text-xs text-[#7a8893]">{fila.original.email}</div></div>
        </div>
      ),
    }),
    ayudanteColumnas.accessor('area', { header: 'Área', cell: ({ row: fila }) => <span className="font-medium text-[#425463]">{fila.original.area}</span> }),
    ayudanteColumnas.accessor('carrera', { header: 'Carrera' }),
    ayudanteColumnas.accessor('ciclo', { header: 'Ciclo' }),
    ayudanteColumnas.accessor('periodoIngreso', { header: 'Período de ingreso' }),
    ayudanteColumnas.accessor('participacion', {
      header: 'Participación',
      cell: ({ row: fila }) => (
        <div className="flex min-w-24 items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e1e8ec]"><div className="h-full rounded-full bg-[#ffb025]" style={{ width: `${fila.original.participacion}%` }} /></div>
          <span className="text-xs font-semibold text-[#536473]">{fila.original.participacion}%</span>
        </div>
      ),
    }),
    ayudanteColumnas.accessor('estado', { header: 'Estado', cell: ({ row: fila }) => <InsigniaEstado estado={fila.original.estado} /> }),
    ayudanteColumnas.display({
      id: 'accion',
      header: '',
      cell: ({ row: fila }) => (
        <Boton
          variante="fantasma"
          tamaño="pequeño"
          className="whitespace-nowrap"
          onClick={() => alVerVoluntario(fila.original.id)}
          aria-label={`Ver más de ${fila.original.nombre}`}
        >
          Ver más <ChevronRight className="size-4" />
        </Boton>
      ),
    }),
  ]), [alVerVoluntario])

  const tabla = usarTabla({
    features: funcionesTabla,
    data: datos,
    columns: columnas,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  })

  return (
    <div className="min-w-0 animate-fade-up space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-[#004373] px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.14)] md:px-7 md:py-7">
        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-.025em] md:text-[30px]">Buscar voluntarios</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100">Consulta la ficha integral, participación y proyectos de los voluntarios.</p>
            {permisos.alcanceArea && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-sky-50"><LockKeyhole className="size-4 text-[#ffd27b]" /> Vista limitada al área {permisos.alcanceArea}</div>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[440px]">
            <ElementoResumen icono={UsersRound} valor={String(resumen.activos)} etiqueta="voluntarios activos" />
            <ElementoResumen icono={Clock3} valor={`${resumen.horas} h`} etiqueta="horas acumuladas" />
            <ElementoResumen icono={Activity} valor={`${resumen.participacion}%`} etiqueta="participación media" />
          </div>
        </div>
      </section>

      <FiltrosVoluntarios
        filtros={{ ...filtros, area: areaSeleccionada }}
        alCambiar={establecerFiltros}
        puedeBuscarDni={permisos.puedeVerDni}
        cantidadResultados={datos.length}
        proyectosDisponibles={proyectosDisponibles}
      />

      <section className="overflow-hidden rounded-2xl border border-[#dfe6eb] bg-white shadow-[0_1px_2px_rgba(20,45,63,.03)]">
        <div className="hidden min-h-[428px] md:block">
          <table className="w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-[#f8fafb]">
              {tabla.getHeaderGroups().map((grupo) => (
                <tr key={grupo.id}>
                  {grupo.headers.map((encabezado) => <th key={encabezado.id} className={`${claseResponsivaColumna(encabezado.id)} border-b border-[#e4eaee] px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[.08em] text-[#71808d]`}>{encabezado.isPlaceholder ? null : <tabla.FlexRender header={encabezado} />}</th>)}
                </tr>
              ))}
            </thead>
            <tbody>
              {tabla.getRowModel().rows.map((fila) => (
                <tr key={fila.original.id} className="transition-colors hover:bg-[#f7fafc]">
                  {fila.getAllCells().map((celda) => <td key={celda.id} className={`${claseResponsivaColumna(celda.column.id)} border-b border-[#edf1f3] px-4 py-4 text-[#536473]`}><tabla.FlexRender cell={celda} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-[#edf1f3] md:hidden">
          {tabla.getRowModel().rows.map((fila) => (
            <article key={fila.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-4 min-[430px]:grid-cols-[auto_minmax(0,1fr)_auto] min-[430px]:items-center">
              <FotoPerfil iniciales={fila.original.iniciales} />
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-[#263746]">{fila.original.nombre}</h3>
                <p className="truncate text-xs text-[#71808d]">{fila.original.email}</p>
                <p className="mt-1 text-xs text-[#71808d]">{fila.original.area} · {fila.original.participacion}%</p>
              </div>
              <Boton variante="secundaria" tamaño="pequeño" className="col-span-2 justify-center min-[430px]:col-span-1" onClick={() => alVerVoluntario(fila.original.id)}>
                Ver más <ChevronRight className="size-4" />
              </Boton>
            </article>
          ))}
        </div>

        {tabla.getRowModel().rows.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-4 text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#edf3f6] text-[#6f808d]"><Inbox className="size-5" /></div><h3 className="font-display font-semibold text-[#263746]">No encontramos voluntarios</h3><p className="mt-1 text-sm text-[#71808d]">Prueba modificando o restableciendo los filtros.</p></div></div>
        ) : (
          <div className="flex flex-col gap-3 border-t border-[#e4eaee] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-5">
            <p className="text-xs text-[#71808d]">Página <span className="font-semibold text-[#334554]">{tabla.state.pagination.pageIndex + 1}</span> de <span className="font-semibold text-[#334554]">{Math.max(1, tabla.getPageCount())}</span></p>
            <div className="flex gap-2">
              <Boton variante="secundaria" tamaño="pequeño" onClick={() => tabla.previousPage()} disabled={!tabla.getCanPreviousPage()}><ArrowLeft className="size-4" /> Anterior</Boton>
              <Boton variante="secundaria" tamaño="pequeño" onClick={() => tabla.nextPage()} disabled={!tabla.getCanNextPage()}>Siguiente <ArrowRight className="size-4" /></Boton>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
