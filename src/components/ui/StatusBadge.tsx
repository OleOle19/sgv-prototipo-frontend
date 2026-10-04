import type { VolunteerStatus } from '../../types/volunteer'
import { cn } from '../../lib/cn'

export function StatusBadge({ status }: { status: VolunteerStatus }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
      status === 'Activo' && 'bg-emerald-50 text-emerald-700',
      status === 'Inactivo' && 'bg-slate-100 text-slate-600',
      status === 'Suspendido' && 'bg-amber-50 text-amber-700',
    )}>
      <span className={cn(
        'size-1.5 rounded-full',
        status === 'Activo' && 'bg-emerald-500',
        status === 'Inactivo' && 'bg-slate-400',
        status === 'Suspendido' && 'bg-amber-500',
      )} />
      {status}
    </span>
  )
}
