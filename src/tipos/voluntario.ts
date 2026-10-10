export type EstadoVoluntario = 'Activo' | 'Retirado' | 'Suspendido'
export type AreaVoluntario = 'TI' | 'MKT' | 'LTK/FNZ' | 'PMO' | 'GTH'

export interface ResumenVoluntario {
  id: string
  iniciales: string
  nombre: string
  apellidos: string
  documento: string
  email: string
  area: AreaVoluntario
  cargo: string
  carrera: string
  ciclo: string
  periodoIngreso: string
  periodoRetiro?: string
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
  codigoUniversitario: string
  telefono: string
  fechaNacimiento: string
  direccion: string
  contactoEmergencia: string
  telefonoEmergencia: string
  tipoSangre: string
  universidad: string
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

export interface FiltrosVoluntarios {
  busqueda: string
  area: 'Todas' | AreaVoluntario
  estado: 'Todos' | EstadoVoluntario
  periodoIngreso: string
  proyecto: string
  participacionMinima: number
  mostrarRetirados: boolean
}

export type RolAcceso = 'Presidencia' | 'Dirección GTH' | 'Dirección de área'

export interface PermisosAutorizacion {
  rol: RolAcceso
  puedeVerDni: boolean
  puedeVerDatosSensibles: boolean
  puedeVerSanciones: boolean
  alcanceArea?: AreaVoluntario
}
