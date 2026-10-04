import * as Tabs from '@radix-ui/react-tabs'
import {
  Activity, ArrowLeft, BriefcaseBusiness, CalendarDays, Clock3,
  FileText, GraduationCap, HeartPulse, LockKeyhole, Mail, MapPin, Phone,
  ShieldAlert, Sparkles, UserRound, UsersRound, Video,
} from 'lucide-react'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { cn } from '../../lib/cn'
import type { AuthPermissions, VolunteerDetails } from '../../types/volunteer'

interface ProfileProps {
  volunteer: VolunteerDetails
  permissions: AuthPermissions
  onBack: () => void
}

function InfoItem({ icon: Icon, label, value, protected: isProtected = false }: { icon: typeof Mail; label: string; value: string; protected?: boolean }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#e3e9ed] bg-[#fafcfd] p-3.5">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#004373] shadow-sm"><Icon className="size-4" /></div>
      <div className="min-w-0"><div className="flex items-center gap-1.5 text-[11px] font-medium text-[#71808d]">{label}{isProtected && <LockKeyhole className="size-3" />}</div><div className="mt-1 truncate text-sm font-semibold text-[#334554]">{value}</div></div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, hint }: { icon: typeof Clock3; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-[#dfe6eb] bg-white p-5 shadow-[0_1px_2px_rgba(20,45,63,.03)]">
      <div className="mb-4 grid size-10 place-items-center rounded-xl bg-[#e8f2f8] text-[#004373]"><Icon className="size-5" /></div>
      <div className="font-display text-2xl font-bold text-[#172432]">{value}</div>
      <div className="mt-1 text-sm font-medium text-[#536473]">{label}</div>
      <div className="mt-2 text-xs text-[#84919b]">{hint}</div>
    </div>
  )
}

function HoursChart({ volunteer }: { volunteer: VolunteerDetails }) {
  const maxHours = Math.max(...volunteer.monthlyHours.map((item) => item.inPerson + item.virtual), 1)

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
        {volunteer.monthlyHours.map((item) => (
          <div key={item.month} className="flex min-w-0 flex-col items-center justify-end gap-2">
            <div className="flex h-36 w-full max-w-12 items-end justify-center gap-1" aria-label={`${item.month}: ${item.inPerson} horas presenciales y ${item.virtual} horas virtuales`}>
              <div className="w-[42%] rounded-t bg-[#004373]" style={{ height: `${Math.max(8, (item.inPerson / maxHours) * 100)}%` }} title={`${item.inPerson} h presenciales`} />
              <div className="w-[42%] rounded-t bg-[#ffb025]" style={{ height: `${Math.max(8, (item.virtual / maxHours) * 100)}%` }} title={`${item.virtual} h virtuales`} />
            </div>
            <div className="text-center"><div className="text-xs font-semibold text-[#425463]">{item.month}</div><div className="mt-0.5 whitespace-nowrap text-[10px] text-[#84919b]">{item.inPerson + item.virtual} h</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabClass = 'relative flex min-w-max cursor-pointer items-center gap-2 px-1 pb-3 text-sm font-medium text-[#71808d] outline-none transition hover:text-[#004373] data-[state=active]:font-semibold data-[state=active]:text-[#004373] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-[#ffb025] after:opacity-0 data-[state=active]:after:opacity-100'

export function VolunteerProfilePage({ volunteer, permissions, onBack }: ProfileProps) {
  const privateValue = (value: string) => permissions.canViewSensitiveData ? value : 'Información protegida'

  return (
    <div className="animate-fade-up space-y-5">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={onBack}><ArrowLeft className="size-4" /> Volver a miembros</Button>

      <section className="relative overflow-hidden rounded-2xl bg-[#004373] px-5 py-6 text-white shadow-[0_14px_30px_rgba(0,67,115,.16)] md:px-7 md:py-7">
        <div className="pointer-events-none absolute -right-20 -top-28 size-72 rounded-full border-[42px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-16 right-24 size-36 rounded-full bg-[#ffb025]/10 blur-2xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar initials={volunteer.initials} size="lg" className="border-4 border-white/15 bg-white text-[#004373]" />
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2"><StatusBadge status={volunteer.status} /><span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-sky-50">{volunteer.id}</span></div>
            <h2 className="font-display text-2xl font-bold tracking-[-.025em] md:text-[30px]">{volunteer.name}</h2>
            <p className="mt-1 text-sm text-sky-100">{volunteer.role} · Área de {volunteer.area}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:w-auto">
            <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-sky-200">Gestión</div><div className="mt-1 text-sm font-semibold">{volunteer.management}</div></div>
            <div className="rounded-xl border border-white/10 bg-white/8 px-4 py-3"><div className="text-[10px] uppercase tracking-wider text-sky-200">Ingreso</div><div className="mt-1 text-sm font-semibold">{volunteer.joinedAt}</div></div>
          </div>
        </div>
      </section>

      {!permissions.canViewSensitiveData && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#f1d59e] bg-[#fff8e9] p-4 text-[#6d521c]">
          <LockKeyhole className="mt-0.5 size-5 shrink-0 text-[#a56d08]" />
          <div><div className="text-sm font-semibold">Vista con información restringida</div><p className="mt-1 text-xs leading-5">Tu rol puede consultar la ficha operativa, pero no datos personales sensibles ni antecedentes disciplinarios.</p></div>
        </div>
      )}

      <Tabs.Root defaultValue="identification" className="rounded-2xl border border-[#dfe6eb] bg-white shadow-[0_1px_2px_rgba(20,45,63,.03)]">
        <div className="overflow-x-auto border-b border-[#e4eaee] px-5 pt-4 scrollbar-thin md:px-6">
          <Tabs.List className="flex min-w-max gap-6" aria-label="Secciones de la ficha">
            <Tabs.Trigger value="identification" className={tabClass}><UserRound className="size-4" /> Identificación</Tabs.Trigger>
            <Tabs.Trigger value="metrics" className={tabClass}><Activity className="size-4" /> Métricas</Tabs.Trigger>
            <Tabs.Trigger value="projects" className={tabClass}><BriefcaseBusiness className="size-4" /> Proyectos</Tabs.Trigger>
            <Tabs.Trigger value="sanctions" className={tabClass}><ShieldAlert className="size-4" /> Sanciones</Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="identification" className="p-5 outline-none md:p-6">
          <div className="grid gap-7 xl:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-bold text-[#263746]">Información personal</h3>
              <p className="mt-1 text-xs text-[#7a8893]">Datos de identificación y contacto del voluntario.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <InfoItem icon={FileText} label="DNI" value={permissions.canViewDni ? volunteer.document : '••••••••'} protected={!permissions.canViewDni} />
                <InfoItem icon={CalendarDays} label="Fecha de nacimiento" value={privateValue(volunteer.birthDate)} protected={!permissions.canViewSensitiveData} />
                <InfoItem icon={Mail} label="Correo institucional" value={volunteer.email} />
                <InfoItem icon={Phone} label="Teléfono" value={privateValue(volunteer.phone)} protected={!permissions.canViewSensitiveData} />
                <InfoItem icon={MapPin} label="Ubicación" value={privateValue(volunteer.address)} protected={!permissions.canViewSensitiveData} />
                <InfoItem icon={HeartPulse} label="Grupo sanguíneo" value={privateValue(volunteer.bloodType)} protected={!permissions.canViewSensitiveData} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#263746]">Información académica</h3>
              <p className="mt-1 text-xs text-[#7a8893]">Formación declarada durante el registro.</p>
              <div className="mt-4 space-y-3">
                <InfoItem icon={GraduationCap} label="Institución" value={volunteer.university} />
                <InfoItem icon={FileText} label="Carrera" value={volunteer.career} />
                <InfoItem icon={Activity} label="Ciclo académico" value={volunteer.cycle} />
              </div>
              <h4 className="mt-5 text-xs font-semibold uppercase tracking-[.08em] text-[#71808d]">Habilidades</h4>
              <div className="mt-3 flex flex-wrap gap-2">{volunteer.skills.map((skill) => <span key={skill} className="rounded-full bg-[#e8f2f8] px-3 py-1.5 text-xs font-semibold text-[#155477]">{skill}</span>)}</div>
            </div>
          </div>
          {permissions.canViewSensitiveData && (
            <div className="mt-7 rounded-2xl border border-[#e2e8ec] bg-[#f8fafb] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#334554]"><UsersRound className="size-4 text-[#004373]" /> Contacto de emergencia</div>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-[#7a8893]">Nombre:</span> <span className="font-medium">{volunteer.emergencyContact}</span></p><p><span className="text-[#7a8893]">Teléfono:</span> <span className="font-medium">{volunteer.emergencyPhone}</span></p></div>
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content value="metrics" className="p-5 outline-none md:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={UsersRound} label="Horas presenciales" value={`${volunteer.inPersonHours} h`} hint="Con asistencia registrada" />
            <StatCard icon={Video} label="Horas virtuales" value={`${volunteer.virtualHours} h`} hint="Sesiones y trabajo remoto" />
            <StatCard icon={CalendarDays} label="Asistencia a reuniones" value={`${volunteer.meetingAttendance}%`} hint={`${volunteer.activities} actividades registradas`} />
            <StatCard icon={Activity} label="Participación" value={`${volunteer.participation}%`} hint="Indicador referencial" />
          </div>
          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)]">
            <HoursChart volunteer={volunteer} />
            <div className="rounded-2xl bg-[#004373] p-5 text-white">
              <div className="flex items-start justify-between gap-3"><div><h3 className="font-display font-bold">Cumplimiento general</h3><p className="mt-1 text-xs leading-5 text-sky-100">Cálculo referencial sujeto a las reglas que defina el backend.</p></div><span className="font-display text-xl font-bold text-[#ffd27b]">{volunteer.participation}%</span></div>
              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#ffb025]" style={{ width: `${volunteer.participation}%` }} /></div>
              <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <div><dt className="text-[10px] uppercase tracking-wider text-sky-200">Total</dt><dd className="mt-1 font-display text-xl font-bold">{volunteer.hours} h</dd></div>
                <div><dt className="text-[10px] uppercase tracking-wider text-sky-200">Proyectos</dt><dd className="mt-1 font-display text-xl font-bold">{volunteer.projects.length}</dd></div>
              </dl>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="projects" className="p-5 outline-none md:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><h3 className="font-display text-base font-bold text-[#263746]">Participación en proyectos</h3><p className="mt-1 text-xs text-[#7a8893]">Responsabilidades y avance durante las distintas gestiones.</p></div>
            <span className="self-start rounded-full bg-[#e8f2f8] px-3 py-1 text-xs font-semibold text-[#155477]">{volunteer.projects.length} proyecto{volunteer.projects.length === 1 ? '' : 's'}</span>
          </div>
          <div className="space-y-3">
          {volunteer.projects.map((project) => (
            <article key={project.id} className="rounded-2xl border border-[#e1e8ec] p-4 transition hover:border-[#b9cbd6] md:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-[11px] font-semibold uppercase tracking-wider text-[#71808d]">{project.id}</span><span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', project.status === 'Completado' ? 'bg-emerald-50 text-emerald-700' : project.status === 'En curso' ? 'bg-sky-50 text-sky-700' : 'bg-slate-100 text-slate-600')}>{project.status}</span></div><h3 className="mt-2 font-display font-bold text-[#263746]">{project.name}</h3><p className="mt-1 text-sm text-[#657381]">{project.responsibility} · {project.period}</p></div><span className="text-sm font-semibold text-[#004373]">{project.progress}%</span></div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7edf0]"><div className="h-full rounded-full bg-[#004373]" style={{ width: `${project.progress}%` }} /></div>
            </article>
          ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="sanctions" className="p-5 outline-none md:p-6">
          {!permissions.canViewSanctions ? (
            <div className="grid min-h-64 place-items-center text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#fff3dc] text-[#996205]"><LockKeyhole className="size-5" /></div><h3 className="font-display font-bold text-[#263746]">Sección restringida</h3><p className="mt-1 max-w-sm text-sm leading-6 text-[#71808d]">Los antecedentes disciplinarios solo están disponibles para roles autorizados.</p></div></div>
          ) : volunteer.sanctions.length === 0 ? (
            <div className="grid min-h-64 place-items-center text-center"><div><div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><Sparkles className="size-5" /></div><h3 className="font-display font-bold text-[#263746]">Sin sanciones registradas</h3><p className="mt-1 text-sm text-[#71808d]">No existen incidencias para este voluntario.</p></div></div>
          ) : (
            <div className="space-y-3">{volunteer.sanctions.map((sanction) => <article key={sanction.id} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-display font-bold text-[#563d0d]">{sanction.type}</h3><span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#7a5a1b]">{sanction.status}</span></div><p className="mt-2 text-sm leading-6 text-[#6d5a35]">{sanction.summary}</p><p className="mt-3 text-xs font-medium text-[#8b7040]">{sanction.date} · {sanction.id}</p></article>)}</div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
