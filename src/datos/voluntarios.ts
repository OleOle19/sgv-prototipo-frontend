import type { PermisosAutorizacion, DetalleVoluntario } from '../tipos/voluntario'

const meses = ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']

function distribuirHoras(total: number) {
  const pesos = [0.12, 0.14, 0.16, 0.17, 0.19]
  const valores = pesos.map((peso) => Math.round(total * peso))
  valores.push(total - valores.reduce((suma, valor) => suma + valor, 0))
  return valores
}

function construirHorasMensuales(presencial: number, virtual: number) {
  const presencialesPorMes = distribuirHoras(presencial)
  const virtualesPorMes = distribuirHoras(virtual)
  return meses.map((mes, indice) => ({
    mes,
    presencial: presencialesPorMes[indice],
    virtual: virtualesPorMes[indice],
  }))
}

export const permisosPorRol: Record<PermisosAutorizacion['rol'], PermisosAutorizacion> = {
  Presidencia: { rol: 'Presidencia', puedeVerDni: true, puedeVerDatosSensibles: true, puedeVerSanciones: true },
  'Dirección GTH': { rol: 'Dirección GTH', puedeVerDni: true, puedeVerDatosSensibles: true, puedeVerSanciones: true },
  'Dirección de área': {
    rol: 'Dirección de área', puedeVerDni: false, puedeVerDatosSensibles: false,
    puedeVerSanciones: false, alcanceArea: 'TI',
  },
}

export const voluntarios: DetalleVoluntario[] = [
  {
    id: 'VOL-0248', iniciales: 'AV', nombre: 'Andrea Valdivia Rojas', documento: '10002481',
    email: 'andrea.valdivia@demo.incubunt.org', telefono: '+51 900 111 248', area: 'TI',
    cargo: 'Desarrolladora Frontend', gestion: '2026-I', estado: 'Activo', fechaIngreso: '18 mar 2025',
    participacion: 92, fechaNacimiento: '14 ago 2003', direccion: 'Lima, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 248', tipoSangre: 'O+',
    universidad: 'Universidad de demostración', carrera: 'Ingeniería de Sistemas', ciclo: '8.º ciclo',
    habilidades: ['React', 'Diseño UI', 'Comunicación', 'TypeScript'], horas: 86,
    horasPresenciales: 32, horasVirtuales: 54, asistenciaReuniones: 94, horasMensuales: construirHorasMensuales(32, 54), actividades: 14,
    proyectos: [
      { id: 'PRY-01', nombre: 'Sistema de Gestión de Voluntariado', responsabilidad: 'Frontend y UX/UI', estado: 'En curso', progreso: 42, periodo: '2026-I' },
      { id: 'PRY-02', nombre: 'CINEEMPRENDETE', responsabilidad: 'Soporte digital', estado: 'Completado', progreso: 100, periodo: '2025-II' },
    ], sanciones: [],
  },
  {
    id: 'VOL-0211', iniciales: 'LM', nombre: 'Luis Mendoza Peña', documento: '10002117',
    email: 'luis.mendoza@demo.incubunt.org', telefono: '+51 900 111 211', area: 'GTH',
    cargo: 'Coordinador de bienestar', gestion: '2026-I', estado: 'Activo', fechaIngreso: '04 feb 2025',
    participacion: 88, fechaNacimiento: '09 ene 2002', direccion: 'Lima, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 211', tipoSangre: 'A+',
    universidad: 'Universidad de demostración', carrera: 'Psicología', ciclo: '9.º ciclo',
    habilidades: ['Gestión de personas', 'Mediación', 'Excel'], horas: 102,
    horasPresenciales: 58, horasVirtuales: 44, asistenciaReuniones: 91, horasMensuales: construirHorasMensuales(58, 44), actividades: 18,
    proyectos: [{ id: 'PRY-03', nombre: 'Programa de Onboarding', responsabilidad: 'Responsable', estado: 'En curso', progreso: 70, periodo: '2026-I' }],
    sanciones: [],
  },
  {
    id: 'VOL-0196', iniciales: 'CR', nombre: 'Camila Ríos Salazar', documento: '10001963',
    email: 'camila.rios@demo.incubunt.org', telefono: '+51 900 111 196', area: 'Marketing',
    cargo: 'Diseñadora de contenidos', gestion: '2026-I', estado: 'Activo', fechaIngreso: '12 nov 2024',
    participacion: 95, fechaNacimiento: '22 may 2003', direccion: 'Arequipa, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 196', tipoSangre: 'B+',
    universidad: 'Universidad de demostración', carrera: 'Comunicación', ciclo: '7.º ciclo',
    habilidades: ['Branding', 'Figma', 'Redacción'], horas: 124,
    horasPresenciales: 46, horasVirtuales: 78, asistenciaReuniones: 97, horasMensuales: construirHorasMensuales(46, 78), actividades: 21,
    proyectos: [{ id: 'PRY-04', nombre: 'Campaña Comunidad INCUBUNT', responsabilidad: 'Diseño visual', estado: 'En curso', progreso: 58, periodo: '2026-I' }],
    sanciones: [],
  },
  {
    id: 'VOL-0184', iniciales: 'JP', nombre: 'José Paredes Luna', documento: '10001845',
    email: 'jose.paredes@demo.incubunt.org', telefono: '+51 900 111 184', area: 'PMO',
    cargo: 'Analista de proyectos', gestion: '2025-II', estado: 'Inactivo', fechaIngreso: '06 ago 2024',
    participacion: 73, fechaNacimiento: '16 dic 2001', direccion: 'Cusco, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 184', tipoSangre: 'O-',
    universidad: 'Universidad de demostración', carrera: 'Administración', ciclo: 'Egresado',
    habilidades: ['Scrum', 'Gestión de riesgos', 'Notion'], horas: 76,
    horasPresenciales: 40, horasVirtuales: 36, asistenciaReuniones: 78, horasMensuales: construirHorasMensuales(40, 36), actividades: 11,
    proyectos: [{ id: 'PRY-05', nombre: 'Estandarización de procesos', responsabilidad: 'Analista', estado: 'Completado', progreso: 100, periodo: '2025-II' }],
    sanciones: [],
  },
  {
    id: 'VOL-0172', iniciales: 'MS', nombre: 'María Soto Chávez', documento: '10001729',
    email: 'maria.soto@demo.incubunt.org', telefono: '+51 900 111 172', area: 'Sostenibilidad',
    cargo: 'Gestora de iniciativas', gestion: '2026-I', estado: 'Suspendido', fechaIngreso: '21 jun 2024',
    participacion: 61, fechaNacimiento: '03 abr 2002', direccion: 'Lima, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 172', tipoSangre: 'AB+',
    universidad: 'Universidad de demostración', carrera: 'Ingeniería Ambiental', ciclo: '10.º ciclo',
    habilidades: ['Impacto social', 'Investigación', 'Facilitación'], horas: 54,
    horasPresenciales: 30, horasVirtuales: 24, asistenciaReuniones: 66, horasMensuales: construirHorasMensuales(30, 24), actividades: 9,
    proyectos: [{ id: 'PRY-06', nombre: 'Voluntariado Verde', responsabilidad: 'Facilitadora', estado: 'Planificado', progreso: 15, periodo: '2026-I' }],
    sanciones: [{ id: 'SAN-008', tipo: 'Amonestación', fecha: '12 sep 2025', estado: 'Cerrada', resumen: 'Registro ficticio utilizado únicamente para validar permisos de visualización.' }],
  },
  {
    id: 'VOL-0159', iniciales: 'DG', nombre: 'Diego García Núñez', documento: '10001596',
    email: 'diego.garcia@demo.incubunt.org', telefono: '+51 900 111 159', area: 'TI',
    cargo: 'Desarrollador Backend', gestion: '2025-II', estado: 'Activo', fechaIngreso: '10 abr 2024',
    participacion: 84, fechaNacimiento: '28 feb 2001', direccion: 'Trujillo, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 159', tipoSangre: 'A-',
    universidad: 'Universidad de demostración', carrera: 'Ingeniería Informática', ciclo: 'Egresado',
    habilidades: ['Laravel', 'PostgreSQL', 'APIs'], horas: 112,
    horasPresenciales: 28, horasVirtuales: 84, asistenciaReuniones: 89, horasMensuales: construirHorasMensuales(28, 84), actividades: 16,
    proyectos: [{ id: 'PRY-01', nombre: 'Sistema de Gestión de Voluntariado', responsabilidad: 'Backend', estado: 'En curso', progreso: 48, periodo: '2026-I' }],
    sanciones: [],
  },
  {
    id: 'VOL-0137', iniciales: 'FR', nombre: 'Fernanda Ruiz Torres', documento: '10001371',
    email: 'fernanda.ruiz@demo.incubunt.org', telefono: '+51 900 111 137', area: 'GTH',
    cargo: 'Analista de selección', gestion: '2025-II', estado: 'Inactivo', fechaIngreso: '19 ene 2024',
    participacion: 79, fechaNacimiento: '11 jul 2002', direccion: 'Piura, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 137', tipoSangre: 'B-',
    universidad: 'Universidad de demostración', carrera: 'Administración', ciclo: '9.º ciclo',
    habilidades: ['Selección', 'Entrevistas', 'People analytics'], horas: 90,
    horasPresenciales: 52, horasVirtuales: 38, asistenciaReuniones: 86, horasMensuales: construirHorasMensuales(52, 38), actividades: 13,
    proyectos: [{ id: 'PRY-07', nombre: 'Convocatoria 2025-II', responsabilidad: 'Entrevistadora', estado: 'Completado', progreso: 100, periodo: '2025-II' }],
    sanciones: [],
  },
  {
    id: 'VOL-0118', iniciales: 'RT', nombre: 'Renato Torres Vega', documento: '10001182',
    email: 'renato.torres@demo.incubunt.org', telefono: '+51 900 111 118', area: 'Marketing',
    cargo: 'Community manager', gestion: '2025-I', estado: 'Activo', fechaIngreso: '02 oct 2023',
    participacion: 90, fechaNacimiento: '25 oct 2000', direccion: 'Lima, Perú',
    contactoEmergencia: 'Contacto de demostración', telefonoEmergencia: '+51 900 000 118', tipoSangre: 'O+',
    universidad: 'Universidad de demostración', carrera: 'Marketing', ciclo: 'Egresado',
    habilidades: ['Social media', 'Analítica', 'Fotografía'], horas: 138,
    horasPresenciales: 64, horasVirtuales: 74, asistenciaReuniones: 96, horasMensuales: construirHorasMensuales(64, 74), actividades: 24,
    proyectos: [{ id: 'PRY-08', nombre: 'Memoria anual INCUBUNT', responsabilidad: 'Contenido', estado: 'En curso', progreso: 64, periodo: '2026-I' }],
    sanciones: [],
  },
]
