export type EstadoVoluntario = 'Activo' | 'Inactivo' | 'Suspendido'
export type AreaVoluntario = 'TI' | 'GTH' | 'Marketing' | 'PMO' | 'Sostenibilidad'

export interface ResumenVoluntario {
  id: string
  iniciales: string
  nombre: string
  documento: string
  email: string
  area: AreaVoluntario
  cargo: string
  gestion: string
  estado: EstadoVoluntario
  fechaIngreso: string
  participacion: number
}

export interface ParticipacionProyecto {
  id: string
  nombre: string
  responsabilidad: string
  estado: 'En curso' | 'Completado' | 'Planificado'
  progreso: number
  periodo: string
}

export interface RegistroSancion {
  id: string
  tipo: string
  fecha: string
  estado: 'Cerrada' | 'En revisión'
  resumen: string
}

export interface HorasMensuales {
  mes: string
  presencial: number
  virtual: number
}

export interface DetalleVoluntario extends ResumenVoluntario {
  telefono: string
  fechaNacimiento: string
  direccion: string
  contactoEmergencia: string
  telefonoEmergencia: string
  tipoSangre: string
  universidad: string
  carrera: string
  ciclo: string
  habilidades: string[]
  horas: number
  horasPresenciales: number
  horasVirtuales: number
  asistenciaReuniones: number
  horasMensuales: HorasMensuales[]
  actividades: number
  proyectos: ParticipacionProyecto[]
  sanciones: RegistroSancion[]
}

export interface FiltrosMiembros {
  busqueda: string
  area: 'Todas' | AreaVoluntario
  estado: 'Todos' | EstadoVoluntario
  gestion: string
  busquedaProyecto: string
  participacionMinima: number
}

export type RolAcceso = 'Presidencia' | 'Dirección GTH' | 'Dirección de área'

export interface PermisosAutorizacion {
  rol: RolAcceso
  puedeVerDni: boolean
  puedeVerDatosSensibles: boolean
  puedeVerSanciones: boolean
  alcanceArea?: AreaVoluntario
}
