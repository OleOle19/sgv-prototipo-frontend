import type { EstadoVoluntario } from '../../tipos/voluntario'
import { combinarClases } from '../../utilidades/combinarClases'

export function InsigniaEstado({ estado }: { estado: EstadoVoluntario }) {
  return (
    <span className={combinarClases(
      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
      estado === 'Activo' && 'bg-emerald-50 text-emerald-700',
      estado === 'Inactivo' && 'bg-slate-100 text-slate-600',
      estado === 'Suspendido' && 'bg-amber-50 text-amber-700',
    )}>
      <span className={combinarClases(
        'size-1.5 rounded-full',
        estado === 'Activo' && 'bg-emerald-500',
        estado === 'Inactivo' && 'bg-slate-400',
        estado === 'Suspendido' && 'bg-amber-500',
      )} />
      {estado}
    </span>
  )
}
