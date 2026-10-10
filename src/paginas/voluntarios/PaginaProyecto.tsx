import { ArrowLeft, CalendarDays, CheckCircle2, Gauge, UsersRound } from 'lucide-react'
import { Boton } from '../../componentes/interfaz/Boton'
import { FotoPerfil } from '../../componentes/interfaz/FotoPerfil'
import type { DetalleVoluntario, ParticipacionProyecto } from '../../tipos/voluntario'

interface PropiedadesPaginaProyecto {
  proyecto: ParticipacionProyecto
  participantes: DetalleVoluntario[]
  alVolver: () => void
}

export function PaginaProyecto({ proyecto, participantes, alVolver }: PropiedadesPaginaProyecto) {
  return (
    <div className="min-w-0 animate-fade-up space-y-5">
      <Boton variante="fantasma" tamaño="pequeño" className="-ml-2" onClick={alVolver}><ArrowLeft className="size-4" /> Volver a la ficha</Boton>

      <section className="relative overflow-hidden rounded-2xl bg-[#004373] px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.16)] md:px-7 md:py-7">
        <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full border-[42px] border-white/5" />
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-[.12em] text-[#ffd27b]">{proyecto.id}</div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-[-.025em] md:text-[30px]">{proyecto.nombre}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-100">Vista resumida del proyecto seleccionado desde la ficha integral del voluntario.</p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#dfe6eb] bg-white p-5"><CalendarDays className="size-5 text-[#004373]" /><div className="mt-4 text-xs text-[#71808d]">Período</div><div className="mt-1 font-display font-bold text-[#263746]">{proyecto.periodo}</div></div>
        <div className="rounded-2xl border border-[#dfe6eb] bg-white p-5"><CheckCircle2 className="size-5 text-[#004373]" /><div className="mt-4 text-xs text-[#71808d]">Estado</div><div className="mt-1 font-display font-bold text-[#263746]">{proyecto.estado}</div></div>
        <div className="rounded-2xl border border-[#dfe6eb] bg-white p-5"><Gauge className="size-5 text-[#004373]" /><div className="mt-4 text-xs text-[#71808d]">Avance</div><div className="mt-1 font-display font-bold text-[#263746]">{proyecto.progreso}%</div></div>
      </div>

      <section className="rounded-2xl border border-[#dfe6eb] bg-white p-5 md:p-6">
        <div className="flex items-center gap-2"><UsersRound className="size-5 text-[#004373]" /><h3 className="font-display font-bold text-[#263746]">Voluntarios vinculados</h3></div>
        <div className="mt-4 divide-y divide-[#edf1f3]">
          {participantes.map((voluntario) => {
            const participacion = voluntario.proyectos.find((elemento) => elemento.id === proyecto.id)
            return (
              <div key={voluntario.id} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                <FotoPerfil iniciales={voluntario.iniciales} />
                <div className="min-w-0 flex-1"><div className="font-semibold text-[#263746]">{voluntario.nombre}</div><div className="mt-0.5 text-xs text-[#71808d]">{participacion?.responsabilidad} · {voluntario.area}</div></div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
