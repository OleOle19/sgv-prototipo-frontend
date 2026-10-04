import { useMemo, useState } from 'react'
import {
  createColumnHelper, createPaginatedRowModel, rowPaginationFeature,
  tableFeatures, useTable,
} from '@tanstack/react-table'
import {
  Activity, ArrowLeft, ArrowRight, ChevronRight, Clock3, Inbox,
  LockKeyhole, ShieldCheck, UsersRound,
} from 'lucide-react'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { MemberFilters } from '../../components/volunteers/MemberFilters'
import { volunteers } from '../../mocks/volunteers'
import type { AuthPermissions, MemberFilters as MemberFiltersType, VolunteerSummary } from '../../types/volunteer'

const features = tableFeatures({
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})
type MemberTableFeatures = typeof features
const columnHelper = createColumnHelper<MemberTableFeatures, VolunteerSummary>()

interface MembersPageProps {
  permissions: AuthPermissions
  onViewVolunteer: (id: string) => void
}

const initialFilters: MemberFiltersType = {
  query: '', area: 'Todas', status: 'Todos', management: 'Todas', projectQuery: '', minParticipation: 0,
}

function SummaryItem({ icon: Icon, value, label }: { icon: typeof UsersRound; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/8 px-3.5 py-3 backdrop-blur-sm">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#ffd27b]"><Icon className="size-4.5" /></div>
      <div><div className="font-display text-lg font-bold leading-none text-white">{value}</div><div className="mt-1 text-[11px] text-sky-100/80">{label}</div></div>
    </div>
  )
}

export function MembersPage({ permissions, onViewVolunteer }: MembersPageProps) {
  const [filters, setFilters] = useState(initialFilters)
  const selectedArea = permissions.areaScope ?? filters.area

  const scopedVolunteers = useMemo(
    () => volunteers.filter((volunteer) => !permissions.areaScope || volunteer.area === permissions.areaScope),
    [permissions.areaScope],
  )
  const summary = useMemo(() => ({
    active: scopedVolunteers.filter((volunteer) => volunteer.status === 'Activo').length,
    hours: scopedVolunteers.reduce((sum, volunteer) => sum + volunteer.hours, 0),
    participation: scopedVolunteers.length
      ? Math.round(scopedVolunteers.reduce((sum, volunteer) => sum + volunteer.participation, 0) / scopedVolunteers.length)
      : 0,
  }), [scopedVolunteers])

  const data = useMemo(() => {
    const normalized = filters.query.trim().toLocaleLowerCase('es')
    const projectQuery = filters.projectQuery.trim().toLocaleLowerCase('es')
    return scopedVolunteers.filter((volunteer) => {
      const matchesQuery = !normalized
        || volunteer.name.toLocaleLowerCase('es').includes(normalized)
        || (permissions.canViewDni && volunteer.document === normalized)
      const matchesProject = !projectQuery || volunteer.projects.some((project) => (
        project.name.toLocaleLowerCase('es').includes(projectQuery)
        || project.responsibility.toLocaleLowerCase('es').includes(projectQuery)
      ))
      return matchesQuery
        && matchesProject
        && (selectedArea === 'Todas' || volunteer.area === selectedArea)
        && (filters.status === 'Todos' || volunteer.status === filters.status)
        && (filters.management === 'Todas' || volunteer.management === filters.management)
        && volunteer.participation >= filters.minParticipation
    })
  }, [filters, permissions.canViewDni, scopedVolunteers, selectedArea])

  const columns = useMemo(() => columnHelper.columns([
    columnHelper.accessor('name', {
      header: 'Miembro',
      cell: ({ row }) => (
        <div className="flex min-w-[230px] items-center gap-3">
          <Avatar initials={row.original.initials} />
          <div><div className="font-semibold text-[#263746]">{row.original.name}</div><div className="mt-0.5 text-xs text-[#7a8893]">{row.original.email}</div></div>
        </div>
      ),
    }),
    columnHelper.accessor('document', {
      header: 'DNI',
      cell: ({ row }) => <span className="font-mono text-xs text-[#536473]">{permissions.canViewDni ? row.original.document : '••••••••'}</span>,
    }),
    columnHelper.accessor('area', { header: 'Área', cell: ({ row }) => <span className="font-medium text-[#425463]">{row.original.area}</span> }),
    columnHelper.accessor('management', { header: 'Gestión' }),
    columnHelper.accessor('participation', {
      header: 'Participación',
      cell: ({ row }) => (
        <div className="flex min-w-24 items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e1e8ec]"><div className="h-full rounded-full bg-[#ffb025]" style={{ width: `${row.original.participation}%` }} /></div>
          <span className="text-xs font-semibold text-[#536473]">{row.original.participation}%</span>
        </div>
      ),
    }),
    columnHelper.accessor('status', { header: 'Estado', cell: ({ row }) => <StatusBadge status={row.original.status} /> }),
    columnHelper.display({ id: 'action', header: '', cell: ({ row }) => <ChevronRight className="ml-auto size-5 text-[#8c99a3]" aria-label={`Ver ficha de ${row.original.name}`} /> }),
  ]), [permissions.canViewDni])

  const table = useTable({
    features,
    data,
    columns,
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
            {permissions.areaScope && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-xs font-medium text-sky-50"><LockKeyhole className="size-4 text-[#ffd27b]" /> Vista limitada al área {permissions.areaScope}</div>
            )}
          </div>
          <div className="grid gap-2 sm:grid-cols-3 xl:min-w-[440px]">
            <SummaryItem icon={UsersRound} value={String(summary.active)} label="miembros activos" />
            <SummaryItem icon={Clock3} value={`${summary.hours} h`} label="horas acumuladas" />
            <SummaryItem icon={Activity} value={`${summary.participation}%`} label="participación media" />
          </div>
        </div>
      </section>

      <MemberFilters filters={{ ...filters, area: selectedArea }} onChange={setFilters} canSearchDni={permissions.canViewDni} resultCount={data.length} />

      <section className="overflow-hidden rounded-2xl border border-[#dfe6eb] bg-white shadow-[0_1px_2px_rgba(20,45,63,.03)]">
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[#f8fafb]">
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                  {group.headers.map((header) => <th key={header.id} className="border-b border-[#e4eaee] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[.08em] text-[#71808d]">{header.isPlaceholder ? null : <table.FlexRender header={header} />}</th>)}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-[#edf1f3]">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} tabIndex={0} role="button" aria-label={`Ver ficha de ${row.original.name}`} onClick={() => onViewVolunteer(row.original.id)} onKeyDown={(event) => event.key === 'Enter' && onViewVolunteer(row.original.id)} className="cursor-pointer outline-none transition hover:bg-[#f7fafc] focus:bg-[#eef7fb]">
                  {row.getAllCells().map((cell) => <td key={cell.id} className="px-5 py-4 text-[#536473]"><table.FlexRender cell={cell} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-[#edf1f3] md:hidden">
          {table.getRowModel().rows.map((row) => (
            <button key={row.id} type="button" onClick={() => onViewVolunteer(row.original.id)} className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 p-4 text-left transition hover:bg-[#f7fafc] min-[430px]:grid-cols-[auto_minmax(0,1fr)_auto]">
              <Avatar initials={row.original.initials} />
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#263746]">{row.original.name}</span><span className="mt-1 flex items-center gap-2 text-xs text-[#71808d]"><span>{row.original.area}</span><span>•</span><span>{row.original.management}</span><span>•</span><span>{row.original.participation}%</span></span></span>
              <span className="hidden min-[430px]:block"><StatusBadge status={row.original.status} /></span>
            </button>
          ))}
        </div>

        {table.getRowModel().rows.length === 0 ? (
          <div className="grid min-h-72 place-items-center px-4 text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#edf3f6] text-[#6f808d]"><Inbox className="size-5" /></div><h3 className="font-display font-semibold text-[#263746]">No encontramos miembros</h3><p className="mt-1 text-sm text-[#71808d]">Prueba modificando o limpiando los filtros.</p></div></div>
        ) : (
          <div className="flex flex-col gap-3 border-t border-[#e4eaee] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-5">
            <p className="text-xs text-[#71808d]">Página <span className="font-semibold text-[#334554]">{table.state.pagination.pageIndex + 1}</span> de <span className="font-semibold text-[#334554]">{Math.max(1, table.getPageCount())}</span></p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ArrowLeft className="size-4" /> Anterior</Button>
              <Button variant="secondary" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Siguiente <ArrowRight className="size-4" /></Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
