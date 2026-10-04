export type VolunteerStatus = 'Activo' | 'Inactivo' | 'Suspendido'
export type VolunteerArea = 'TI' | 'GTH' | 'Marketing' | 'PMO' | 'Sostenibilidad'

export interface VolunteerSummary {
  id: string
  initials: string
  name: string
  document: string
  email: string
  area: VolunteerArea
  role: string
  management: string
  status: VolunteerStatus
  joinedAt: string
  participation: number
}

export interface ProjectParticipation {
  id: string
  name: string
  responsibility: string
  status: 'En curso' | 'Completado' | 'Planificado'
  progress: number
  period: string
}

export interface SanctionRecord {
  id: string
  type: string
  date: string
  status: 'Cerrada' | 'En revisión'
  summary: string
}

export interface MonthlyHours {
  month: string
  inPerson: number
  virtual: number
}

export interface VolunteerDetails extends VolunteerSummary {
  phone: string
  birthDate: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodType: string
  university: string
  career: string
  cycle: string
  skills: string[]
  hours: number
  inPersonHours: number
  virtualHours: number
  meetingAttendance: number
  monthlyHours: MonthlyHours[]
  activities: number
  projects: ProjectParticipation[]
  sanctions: SanctionRecord[]
}

export interface MemberFilters {
  query: string
  area: 'Todas' | VolunteerArea
  status: 'Todos' | VolunteerStatus
  management: string
  projectQuery: string
  minParticipation: number
}

export type AccessRole = 'Presidencia' | 'Dirección GTH' | 'Dirección de área'

export interface AuthPermissions {
  role: AccessRole
  canViewDni: boolean
  canViewSensitiveData: boolean
  canViewSanctions: boolean
  areaScope?: VolunteerArea
}
