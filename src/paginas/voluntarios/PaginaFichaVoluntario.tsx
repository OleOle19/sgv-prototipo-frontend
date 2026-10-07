import * as Pestañas from '@radix-ui/react-tabs'
import {
  Activity, ArrowLeft, BriefcaseBusiness, CalendarDays, Clock3,
  FileText, GraduationCap, HeartPulse, LockKeyhole, Mail, MapPin, Phone,
  ShieldAlert, Sparkles, UserRound, UsersRound, Video,
} from 'lucide-react'
import { FotoPerfil } from '../../componentes/interfaz/FotoPerfil'
import { Boton } from '../../componentes/interfaz/Boton'
import { InsigniaEstado } from '../../componentes/interfaz/InsigniaEstado'
import { combinarClases } from '../../utilidades/combinarClases'
import type { PermisosAutorizacion, DetalleVoluntario } from '../../tipos/voluntario'

interface PropiedadesFicha {
  voluntario: DetalleVoluntario
  permisos: PermisosAutorizacion
  alVolver: () => void
}

function ElementoInformacion({ icono: Icono, etiqueta, valor, protegido: estaProtegido = false }: { icono: typeof Mail; etiqueta: string; valor: string; protegido?: boolean }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#e3e9ed] bg-[#fafcfd] p-3.5">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#004373] shadow-sm"><Icono className="size-4" /></div>
      <div className="min-w-0"><div className="flex items-center gap-1.5 text-[11px] font-medium text-[#71808d]">{etiqueta}{estaProtegido && <LockKeyhole className="size-3" />}</div><div className="mt-1 truncate text-sm font-semibold text-[#334554]">{valor}</div></div>
    </div>
  )
}

function TarjetaEstadistica({ icono: Icono, etiqueta, valor, aclaracion }: { icono: typeof Clock3; etiqueta: string; valor: string; aclaracion: string }) {
  return (
    <div className="rounded-2xl border border-[#dfe6eb] bg-white p-5 shadow-[0_1px_2px_rgba(20,45,63,.03)]">
      <div className="mb-4 grid size-10 place-items-center rounded-xl bg-[#e8f2f8] text-[#004373]"><Icono className="size-5" /></div>
      <div className="font-display text-2xl font-bold text-[#172432]">{valor}</div>
      <div className="mt-1 text-sm font-medium text-[#536473]">{etiqueta}</div>
      <div className="mt-2 text-xs text-[#84919b]">{aclaracion}</div>
    </div>
  )
}

function GraficoHoras({ voluntario }: { voluntario: DetalleVoluntario }) {
  const maximoHoras = Math.max(...voluntario.horasMensuales.map((registro) => registro.presencial + registro.virtual), 1)

  return (
    <div className="rounded-2xl border border-[#e1e8ec] bg-[#f8fafb] p-4 md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display font-bold text-[#263746]">Horas por modalidad</h3>
          <p className="mt-1 text-xs text-[#7a8893]">Distribución ilustrativa de los últimos seis meses.</p>
        </div>
        <div className="flex gap-4 text-[11px] font-medium text-[#657381]">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-[#004373]" /> Presencial</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-[#ffb025]" /> Virtual</span>
        </div>
      </div>
      <div className="mt-6 grid h-52 grid-cols-6 gap-2 sm:gap-4" role="img" aria-label="Gráfico de horas presenciales y virtuales por mes">
        {voluntario.horasMensuales.map((registro) => (
          <div key={registro.mes} className="flex min-w-0 flex-col items-center justify-end gap-2">
            <div className="flex h-36 w-full max-w-12 items-end justify-center gap-1" aria-label={`${registro.mes}: ${registro.presencial} horas presenciales y ${registro.virtual} horas virtuales`}>
              <div className="w-[42%] rounded-t bg-[#004373]" style={{ height: `${Math.max(8, (registro.presencial / maximoHoras) * 100)}%` }} title={`${registro.presencial} h presenciales`} />
              <div className="w-[42%] rounded-t bg-[#ffb025]" style={{ height: `${Math.max(8, (registro.virtual / maximoHoras) * 100)}%` }} title={`${registro.virtual} h virtuales`} />
            </div>
            <div className="text-center"><div className="text-xs font-semibold text-[#425463]">{registro.mes}</div><div className="mt-0.5 whitespace-nowrap text-[10px] text-[#84919b]">{registro.presencial + registro.virtual} h</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const clasesPestaña = 'relative flex min-w-max cursor-pointer items-center gap-2 px-1 pb-3 text-sm font-medium text-[#71808d] outline-none transition hover:text-[#004373] data-[state=active]:font-semibold data-[state=active]:text-[#004373] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-[#ffb025] after:opacity-0 data-[state=active]:after:opacity-100'

export function PaginaFichaVoluntario({ voluntario, permisos, alVolver }: PropiedadesFicha) {
  const valorPrivado = (valor: string) => permisos.puedeVerDatosSensibles ? valor : 'Información protegida'

  return (
    <div className="animate-fade-up space-y-5">
      <Boton variante="fantasma" tamaño="pequeño" className="-ml-2" onClick={alVolver}><ArrowLeft className="size-4" /> Volver a miembros</Boton>

      <section className="relative overflow-hidden rounded-2xl bg-[#004373] px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.16)] md:px-7 md:py-7">
        <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full border-[42px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-16 right-24 size-36 rounded-full bg-[#ffb025]/10 blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <FotoPerfil iniciales={voluntario.iniciales} tamaño="grande" clases="border-4 border-white/15 bg-white text-[#004373]" />
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2"><InsigniaEstado estado={voluntario.estado} /><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-sky-50">{voluntario.id}</span></div>
            <h2 className="font-display text-2xl font-bold tracking-[-.025em] md:text-[30px]">{voluntario.nombre}</h2>
            <p className="mt-1 text-sm text-sky-100">{voluntario.cargo} · Área de {voluntario.area}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:w-auto">
            <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-sky-200">Gestión</div><div className="mt-1 text-sm font-semibold">{voluntario.gestion}</div></div>
            <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-sky-200">Ingreso</div><div className="mt-1 text-sm font-semibold">{voluntario.fechaIngreso}</div></div>
          </div>
        </div>
      </section>

      {!permisos.puedeVerDatosSensibles && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#f1d59e] bg-[#fff8e9] p-4 text-[#6d521c]">
          <LockKeyhole className="mt-0.5 size-5 shrink-0 text-[#a56d08]" />
          <div><div className="text-sm font-semibold">Vista con información restringida</div><p className="mt-1 text-xs leading-5">Tu rol puede consultar la ficha operativa, pero no datos personales sensibles ni antecedentes disciplinarios.</p></div>
        </div>
      )}

      <Pestañas.Root defaultValue="identificacion" className="rounded-2xl border border-[#dfe6eb] bg-white shadow-[0_1px_2px_rgba(20,45,63,.03)]">
        <div className="overflow-x-auto border-b border-[#e4eaee] px-5 pt-4 scrollbar-thin md:px-6">
          <Pestañas.List className="flex min-w-max gap-6" aria-label="Secciones de la ficha">
            <Pestañas.Trigger value="identificacion" className={clasesPestaña}><UserRound className="size-4" /> Identificación</Pestañas.Trigger>
            <Pestañas.Trigger value="metricas" className={clasesPestaña}><Activity className="size-4" /> Métricas</Pestañas.Trigger>
            <Pestañas.Trigger value="proyectos" className={clasesPestaña}><BriefcaseBusiness className="size-4" /> Proyectos</Pestañas.Trigger>
            <Pestañas.Trigger value="sanciones" className={clasesPestaña}><ShieldAlert className="size-4" /> Sanciones</Pestañas.Trigger>
          </Pestañas.List>
        </div>

        <Pestañas.Content value="identificacion" className="p-5 outline-none md:p-6">
          <div className="grid gap-7 xl:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-bold text-[#263746]">Información personal</h3>
              <p className="mt-1 text-xs text-[#7a8893]">Datos de identificación y contacto del voluntario.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ElementoInformacion icono={FileText} etiqueta="DNI" valor={permisos.puedeVerDni ? voluntario.documento : '••••••••'} protegido={!permisos.puedeVerDni} />
                <ElementoInformacion icono={CalendarDays} etiqueta="Fecha de nacimiento" valor={valorPrivado(voluntario.fechaNacimiento)} protegido={!permisos.puedeVerDatosSensibles} />
                <ElementoInformacion icono={Mail} etiqueta="Correo institucional" valor={voluntario.email} />
                <ElementoInformacion icono={Phone} etiqueta="Teléfono" valor={valorPrivado(voluntario.telefono)} protegido={!permisos.puedeVerDatosSensibles} />
                <ElementoInformacion icono={MapPin} etiqueta="Ubicación" valor={valorPrivado(voluntario.direccion)} protegido={!permisos.puedeVerDatosSensibles} />
                <ElementoInformacion icono={HeartPulse} etiqueta="Grupo sanguíneo" valor={valorPrivado(voluntario.tipoSangre)} protegido={!permisos.puedeVerDatosSensibles} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#263746]">Información académica</h3>
              <p className="mt-1 text-xs text-[#7a8893]">Formación declarada durante el registro.</p>
              <div className="mt-4 space-y-3">
                <ElementoInformacion icono={GraduationCap} etiqueta="Institución" valor={voluntario.universidad} />
                <ElementoInformacion icono={FileText} etiqueta="Carrera" valor={voluntario.carrera} />
                <ElementoInformacion icono={Activity} etiqueta="Ciclo académico" valor={voluntario.ciclo} />
              </div>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-[.08em] text-[#71808d]">Habilidades</h4>
              <div className="mt-3 flex flex-wrap gap-2">{voluntario.habilidades.map((habilidad) => <span key={habilidad} className="rounded-full bg-[#e8f2f8] px-3 py-1.5 text-xs font-semibold text-[#155477]">{habilidad}</span>)}</div>
            </div>
          </div>
          {permisos.puedeVerDatosSensibles && (
            <div className="mt-7 rounded-2xl border border-[#e2e8ec] bg-[#f8fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#334554]"><UsersRound className="size-4 text-[#004373]" /> Contacto de emergencia</div>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-[#7a8893]">Nombre:</span> <span className="font-medium">{voluntario.contactoEmergencia}</span></p><p><span className="text-[#7a8893]">Teléfono:</span> <span className="font-medium">{voluntario.telefonoEmergencia}</span></p></div>
            </div>
          )}
        </Pestañas.Content>

        <Pestañas.Content value="metricas" className="p-5 outline-none md:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <TarjetaEstadistica icono={UsersRound} etiqueta="Horas presenciales" valor={`${voluntario.horasPresenciales} h`} aclaracion="Con asistencia registrada" />
            <TarjetaEstadistica icono={Video} etiqueta="Horas virtuales" valor={`${voluntario.horasVirtuales} h`} aclaracion="Sesiones y trabajo remoto" />
            <TarjetaEstadistica icono={CalendarDays} etiqueta="Asistencia a reuniones" valor={`${voluntario.asistenciaReuniones}%`} aclaracion={`${voluntario.actividades} actividades registradas`} />
            <TarjetaEstadistica icono={Activity} etiqueta="Participación" valor={`${voluntario.participacion}%`} aclaracion="Indicador referencial" />
          </div>
          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)]">
            <GraficoHoras voluntario={voluntario} />
            <div className="rounded-2xl bg-[#004373] p-5 text-white">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-display font-bold">Cumplimiento general</h3><p className="mt-1 text-xs leading-5 text-sky-100">Cálculo referencial sujeto a las reglas que defina el backend.</p></div><span className="font-display text-xl font-bold text-[#ffd27b]">{voluntario.participacion}%</span></div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#ffb025]" style={{ width: `${voluntario.participacion}%` }} /></div>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <div><dt className="text-[10px] uppercase tracking-wider text-sky-200">Total</dt><dd className="mt-1 font-display text-xl font-bold">{voluntario.horas} h</dd></div>
                <div><dt className="text-[10px] uppercase tracking-wider text-sky-200">Proyectos</dt><dd className="mt-1 font-display text-xl font-bold">{voluntario.proyectos.length}</dd></div>
              </dl>
            </div>
          </div>
        </Pestañas.Content>

        <Pestañas.Content value="proyectos" className="p-5 outline-none md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><h3 className="font-display text-base font-bold text-[#263746]">Participación en proyectos</h3><p className="mt-1 text-xs text-[#7a8893]">Responsabilidades y avance durante las distintas gestiones.</p></div>
            <span className="self-start rounded-full bg-[#e8f2f8] px-3 py-1 text-xs font-semibold text-[#155477]">{voluntario.proyectos.length} proyecto{voluntario.proyectos.length === 1 ? '' : 's'}</span>
          </div>
          <div className="space-y-3">
          {voluntario.proyectos.map((proyecto) => (
            <article key={proyecto.id} className="rounded-2xl border border-[#e1e8ec] p-4 transition hover:border-[#b9cbd6] md:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-semibold uppercase tracking-wider text-[#71808d]">{proyecto.id}</span><span className={combinarClases('rounded-full px-2.5 py-1 text-[11px] font-semibold', proyecto.estado === 'Completado' ? 'bg-emerald-50 text-emerald-700' : proyecto.estado === 'En curso' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-slate-600')}>{proyecto.estado}</span></div><h3 className="mt-2 font-display font-bold text-[#263746]">{proyecto.nombre}</h3><p className="mt-1 text-sm text-[#657381]">{proyecto.responsabilidad} · {proyecto.periodo}</p></div><span className="text-sm font-semibold text-[#004373]">{proyecto.progreso}%</span></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7edf0]"><div className="h-full rounded-full bg-[#004373]" style={{ width: `${proyecto.progreso}%` }} /></div>
            </article>
          ))}
          </div>
        </Pestañas.Content>

        <Pestañas.Content value="sanciones" className="p-5 outline-none md:p-6">
          {!permisos.puedeVerSanciones ? (
            <div className="grid min-h-64 place-items-center text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#fff3dc] text-[#996205]"><LockKeyhole className="size-5" /></div><h3 className="font-display font-bold text-[#263746]">Sección restringida</h3><p className="mt-1 max-w-sm text-sm leading-6 text-[#71808d]">Los antecedentes disciplinarios solo están disponibles para roles autorizados.</p></div></div>
          ) : voluntario.sanciones.length === 0 ? (
            <div className="grid min-h-64 place-items-center text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><Sparkles className="size-5" /></div><h3 className="font-display font-bold text-[#263746]">Sin sanciones registradas</h3><p className="mt-1 text-sm text-[#71808d]">No existen incidencias para este voluntario.</p></div></div>
          ) : (
            <div className="space-y-3">{voluntario.sanciones.map((sancion) => <article key={sancion.id} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-display font-bold text-[#563d0d]">{sancion.tipo}</h3><span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#7a5a1b]">{sancion.estado}</span></div><p className="mt-2 text-sm leading-6 text-[#6d5a35]">{sancion.resumen}</p><p className="mt-3 text-xs font-medium text-[#8b7040]">{sancion.fecha} · {sancion.id}</p></article>)}</div>
          )}
        </Pestañas.Content>
      </Pestañas.Root>
    </div>
  )
}
