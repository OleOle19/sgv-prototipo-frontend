import { useState } from 'react'
import { ChevronDown, Filter, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import { cn } from '../../lib/cn'
import type { MemberFilters as MemberFiltersType, VolunteerArea, VolunteerStatus } from '../../types/volunteer'

interface MemberFiltersProps {
  filters: MemberFiltersType
  onChange: (filters: MemberFiltersType) => void
  canSearchDni: boolean
  resultCount: number
}

const emptyFilters: MemberFiltersType = {
  query: '', area: 'Todas', status: 'Todos', management: 'Todas', projectQuery: '', minParticipation: 0,
}

export function MemberFilters({ filters, onChange, canSearchDni, resultCount }: MemberFiltersProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const isDirty = Boolean(
    filters.query || filters.area !== 'Todas' || filters.status !== 'Todos'
    || filters.management !== 'Todas' || filters.projectQuery || filters.minParticipation,
  )

  return (
    <section className="rounded-2xl border border-[#dfe6eb] bg-white p-4 shadow-[0_1px_2px_rgba(20,45,63,.03)] md:p-5" aria-label="Filtros de miembros">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#263746]"><Filter className="size-4 text-[#004373]" /> Filtros</div>
        <span className="text-xs font-medium text-[#71808d]">{resultCount} resultado{resultCount === 1 ? '' : 's'}</span>
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1.7fr)_1fr_1fr_1fr_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar miembros</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#71808d]" />
          <input
            value={filters.query}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder={canSearchDni ? 'Buscar por nombre o DNI exacto' : 'Buscar por nombre'}
            className="h-11 w-full rounded-xl border border-[#d6e0e7] bg-white pl-10 pr-3 text-sm text-[#263746] outline-none transition placeholder:text-[#96a1aa] hover:border-[#aebfca] focus:border-[#004373] focus:ring-3 focus:ring-[#004373]/10"
          />
        </label>
        <Select value={filters.area} onValueChange={(area) => onChange({ ...filters, area: area as 'Todas' | VolunteerArea })} label="Filtrar por área" options={['Todas', 'TI', 'GTH', 'Marketing', 'PMO', 'Sostenibilidad']} />
        <Select value={filters.status} onValueChange={(status) => onChange({ ...filters, status: status as 'Todos' | VolunteerStatus })} label="Filtrar por estado" options={['Todos', 'Activo', 'Inactivo', 'Suspendido']} />
        <Select value={filters.management} onValueChange={(management) => onChange({ ...filters, management })} label="Filtrar por gestión" options={['Todas', '2026-I', '2025-II', '2025-I']} />
        <Button type="button" variant="secondary" onClick={() => setAdvancedOpen((open) => !open)} aria-expanded={advancedOpen} aria-controls="advanced-member-filters">
          <SlidersHorizontal className="size-4" /> Más
          <ChevronDown className={cn('size-4 transition-transform', advancedOpen && 'rotate-180')} />
        </Button>
        <Button type="button" variant="secondary" size="icon" onClick={() => onChange(emptyFilters)} disabled={!isDirty} aria-label="Limpiar filtros" title="Limpiar filtros"><RotateCcw className="size-4" /></Button>
      </div>

      {advancedOpen && (
        <div id="advanced-member-filters" className="mt-4 grid gap-4 border-t border-[#e7edf0] pt-4 md:grid-cols-[minmax(220px,1fr)_minmax(260px,1.2fr)]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#536473]">Proyecto</span>
            <input
              value={filters.projectQuery}
              onChange={(event) => onChange({ ...filters, projectQuery: event.target.value })}
              placeholder="Nombre o responsabilidad"
              className="h-11 w-full rounded-xl border border-[#d6e0e7] bg-white px-3 text-sm text-[#263746] outline-none transition placeholder:text-[#96a1aa] hover:border-[#aebfca] focus:border-[#004373] focus:ring-3 focus:ring-[#004373]/10"
            />
          </label>
          <label className="block rounded-xl bg-[#f7fafb] px-4 py-3">
            <span className="flex items-center justify-between gap-3 text-xs font-semibold text-[#536473]">
              Participación mínima <strong className="text-sm text-[#004373]">{filters.minParticipation}%</strong>
            </span>
            <input
              type="range" min="0" max="100" step="5" value={filters.minParticipation}
              onChange={(event) => onChange({ ...filters, minParticipation: Number(event.target.value) })}
              className="mt-3 w-full accent-[#004373]"
            />
          </label>
          <p className="text-xs leading-5 text-[#71808d] md:col-span-2">
            {canSearchDni ? 'La búsqueda por DNI requiere coincidencia exacta.' : 'Tu rol no permite buscar ni visualizar documentos de identidad.'}
          </p>
        </div>
      )}
    </section>
  )
}
