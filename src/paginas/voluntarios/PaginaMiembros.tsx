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
  LockKeyhole, ShieldCheck, UsersRound,
} from 'lucide-react'
import { FotoPerfil } from '../../componentes/interfaz/FotoPerfil'
import { Boton } from '../../componentes/interfaz/Boton'
import { InsigniaEstado } from '../../componentes/interfaz/InsigniaEstado'
import { FiltrosMiembros } from '../../componentes/voluntarios/FiltrosMiembros'
import { voluntarios } from '../../datos/voluntarios'
import type { PermisosAutorizacion, FiltrosMiembros as DatosFiltrosMiembros, ResumenVoluntario } from '../../tipos/voluntario'

const funcionesTabla = crearFuncionesTabla({
  rowPaginationFeature: funcionPaginacionFilas,
  paginatedRowModel: crearModeloFilasPaginadas(),
})
type FuncionesTablaMiembros = typeof funcionesTabla
const ayudanteColumnas = crearAyudanteColumnas<FuncionesTablaMiembros, ResumenVoluntario>()

interface PropiedadesPaginaMiembros {
  permisos: PermisosAutorizacion
  alVerVoluntario: (id: string) => void
}

const filtrosIniciales: DatosFiltrosMiembros = {
  busqueda: '', area: 'Todas', estado: 'Todos', gestion: 'Todas', busquedaProyecto: '', participacionMinima: 0,
}

function ElementoResumen({ icono: Icono, valor, etiqueta }: { icono: typeof UsersRound; valor: string; etiqueta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-3.5 py-3 backdrop-blur-sm">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#ffd27b]"><Icono className="size-4.5" /></div>
      <div><div className="font-display text-lg font-bold leading-none text-white">{valor}</div><div className="mt-1 text-[11px] text-sky-100/80">{etiqueta}</div></div>
    </div>
  )
}

export function PaginaMiembros({ permisos, alVerVoluntario }: PropiedadesPaginaMiembros) {
  const [filtros, establecerFiltros] = useState(filtrosIniciales)
  const areaSeleccionada = permisos.alcanceArea ?? filtros.area

  const voluntariosEnAlcance = useMemo(
    () => voluntarios.filter((voluntario) => !permisos.alcanceArea || voluntario.area === permisos.alcanceArea),
    [permisos.alcanceArea],
  )
  const resumen = useMemo(() => ({
    activos: voluntariosEnAlcance.filter((voluntario) => voluntario.estado === 'Activo').length,
    horas: voluntariosEnAlcance.reduce((suma, voluntario) => suma + voluntario.horas, 0),
    participacion: voluntariosEnAlcance.length
      ? Math.round(voluntariosEnAlcance.reduce((suma, voluntario) => suma + voluntario.participacion, 0) / voluntariosEnAlcance.length)
      : 0,
  }), [voluntariosEnAlcance])

  const datos = useMemo(() => {
    const busquedaNormalizada = filtros.busqueda.trim().toLocaleLowerCase('es')
    const busquedaProyecto = filtros.busquedaProyecto.trim().toLocaleLowerCase('es')
    return voluntariosEnAlcance.filter((voluntario) => {
      const coincideBusqueda = !busquedaNormalizada
        || voluntario.nombre.toLocaleLowerCase('es').includes(busquedaNormalizada)
        || (permisos.puedeVerDni && voluntario.documento === busquedaNormalizada)
      const coincideProyecto = !busquedaProyecto || voluntario.proyectos.some((proyecto) => (
        proyecto.nombre.toLocaleLowerCase('es').includes(busquedaProyecto)
        || proyecto.responsabilidad.toLocaleLowerCase('es').includes(busquedaProyecto)
      ))
      return coincideBusqueda
        && coincideProyecto
        && (areaSeleccionada === 'Todas' || voluntario.area === areaSeleccionada)
        && (filtros.estado === 'Todos' || voluntario.estado === filtros.estado)
        && (filtros.gestion === 'Todas' || voluntario.gestion === filtros.gestion)
        && voluntario.participacion >= filtros.participacionMinima
    })
  }, [filtros, permisos.puedeVerDni, voluntariosEnAlcance, areaSeleccionada])

  const columnas = useMemo(() => ayudanteColumnas.columns([
    ayudanteColumnas.accessor('nombre', {
      header: 'Miembro',
      cell: ({ row: fila }) => (
        <div className="flex min-w-[230px] items-center gap-3">
          <FotoPerfil iniciales={fila.original.iniciales} />
          <div><div className="font-semibold text-[#263746]">{fila.original.nombre}</div><div className="mt-0.5 text-xs text-[#7a8893]">{fila.original.email}</div></div>
        </div>
      ),
    }),
    ayudanteColumnas.accessor('documento', {
      header: 'DNI',
      cell: ({ row: fila }) => <span className="font-mono text-xs text-[#536473]">{permisos.puedeVerDni ? fila.original.documento : '••••••••'}</span>,
    }),
    ayudanteColumnas.accessor('area', { header: 'Área', cell: ({ row: fila }) => <span className="font-medium text-[#425463]">{fila.original.area}</span> }),
    ayudanteColumnas.accessor('gestion', { header: 'Gestión' }),
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
    ayudanteColumnas.display({ id: 'accion', header: '', cell: ({ row: fila }) => <ChevronRight className="ml-auto size-5 text-[#8c99a3]" aria-label={`Ver ficha de ${fila.original.nombre}`} /> }),
  ]), [permisos.puedeVerDni])

  const tabla = usarTabla({
    features: funcionesTabla,
    data: datos,
    columns: columnas,
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  })

  return (
    <div className="min-w-0 animate-fade-up space-y-5">
      <section className="relative overflow-hidden rounded-2xl bg-[#004373] px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.14)] md:px-7 md:py-7">
        <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border-[46px] border-white/5" />
        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-50"><UsersRound className="size-3.5" /> Directorio institucional</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ffb025] px-3 py-1 text-[11px] font-bold text-[#473000]"><ShieldCheck className="size-3.5" /> Datos ficticios</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-[-.025em] md:text-[30px]">Buscar miembros</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100">Consulta la ficha integral, participación y proyectos de los voluntarios dentro del alcance permitido para tu rol.</p>
            {permisos.alcanceArea && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-sky-50"><LockKeyhole className="size-4 text-[#ffd27b]" /> Vista limitada al área {permisos.alcanceArea}</div>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[440px]">
            <ElementoResumen icono={UsersRound} valor={String(resumen.activos)} etiqueta="miembros activos" />
            <ElementoResumen icono={Clock3} valor={`${resumen.horas} h`} etiqueta="horas acumuladas" />
            <ElementoResumen icono={Activity} valor={`${resumen.participacion}%`} etiqueta="participación media" />
          </div>
        </div>
      </section>

      <FiltrosMiembros filtros={{ ...filtros, area: areaSeleccionada }} alCambiar={establecerFiltros} puedeBuscarDni={permisos.puedeVerDni} cantidadResultados={datos.length} />

      <section className="overflow-hidden rounded-2xl border border-[#dfe6eb] bg-white shadow-[0_1px_2px_rgba(20,45,63,.03)]">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[#f8fafb]">
              {tabla.getHeaderGroups().map((grupo) => (
                <tr key={grupo.id}>
                  {grupo.headers.map((encabezado) => <th key={encabezado.id} className="border-b border-[#e4eaee] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.08em] text-[#71808d]">{encabezado.isPlaceholder ? null : <tabla.FlexRender header={encabezado} />}</th>)}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[#edf1f3]">
              {tabla.getRowModel().rows.map((fila) => (
                <tr key={fila.id} tabIndex={0} role="button" aria-label={`Ver ficha de ${fila.original.nombre}`} onClick={() => alVerVoluntario(fila.original.id)} onKeyDown={(evento) => evento.key === 'Enter' && alVerVoluntario(fila.original.id)} className="cursor-pointer outline-none transition hover:bg-[#f7fafc] focus:bg-[#eef7fb]">
                  {fila.getAllCells().map((celda) => <td key={celda.id} className="px-5 py-4 text-[#536473]"><tabla.FlexRender cell={celda} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-[#edf1f3] md:hidden">
          {tabla.getRowModel().rows.map((fila) => (
            <button key={fila.id} type="button" onClick={() => alVerVoluntario(fila.original.id)} className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4 text-left transition hover:bg-[#f7fafc] min-[430px]:grid-cols-[auto_minmax(0,1fr)_auto]">
              <FotoPerfil iniciales={fila.original.iniciales} />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#263746]">{fila.original.nombre}</span><span className="mt-1 flex items-center gap-2 text-xs text-[#71808d]"><span>{fila.original.area}</span><span>•</span><span>{fila.original.gestion}</span><span>•</span><span>{fila.original.participacion}%</span></span></span>
              <span className="hidden min-[430px]:block"><InsigniaEstado estado={fila.original.estado} /></span>
            </button>
          ))}
        </div>

        {tabla.getRowModel().rows.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-4 text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#edf3f6] text-[#6f808d]"><Inbox className="size-5" /></div><h3 className="font-display font-semibold text-[#263746]">No encontramos miembros</h3><p className="mt-1 text-sm text-[#71808d]">Prueba modificando o limpiando los filtros.</p></div></div>
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
