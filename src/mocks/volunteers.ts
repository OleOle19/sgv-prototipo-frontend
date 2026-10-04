import type { AuthPermissions, VolunteerDetails } from '../types/volunteer'

const months = ['Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']

function distributeHours(total: number) {
  const weights = [0.12, 0.14, 0.16, 0.17, 0.19]
  const values = weights.map((weight) => Math.round(total * weight))
  values.push(total - values.reduce((sum, value) => sum + value, 0))
  return values
}

function buildMonthlyHours(inPerson: number, virtual: number) {
  const inPersonByMonth = distributeHours(inPerson)
  const virtualByMonth = distributeHours(virtual)
  return months.map((month, index) => ({
    month,
    inPerson: inPersonByMonth[index],
    virtual: virtualByMonth[index],
  }))
}

export const rolePermissions: Record<AuthPermissions['role'], AuthPermissions> = {
  Presidencia: { role: 'Presidencia', canViewDni: true, canViewSensitiveData: true, canViewSanctions: true },
  'Dirección GTH': { role: 'Dirección GTH', canViewDni: true, canViewSensitiveData: true, canViewSanctions: true },
  'Dirección de área': {
    role: 'Dirección de área', canViewDni: false, canViewSensitiveData: false,
    canViewSanctions: false, areaScope: 'TI',
  },
}

export const volunteers: VolunteerDetails[] = [
  {
    id: 'VOL-0248', initials: 'AV', name: 'Andrea Valdivia Rojas', document: '10002481',
    email: 'andrea.valdivia@demo.incubunt.org', phone: '+51 900 111 248', area: 'TI',
    role: 'Desarrolladora Frontend', management: '2026-I', status: 'Activo', joinedAt: '18 mar 2025',
    participation: 92, birthDate: '14 ago 2003', address: 'Lima, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 248', bloodType: 'O+',
    university: 'Universidad de demostración', career: 'Ingeniería de Sistemas', cycle: '8.º ciclo',
    skills: ['React', 'Diseño UI', 'Comunicación', 'TypeScript'], hours: 86,
    inPersonHours: 32, virtualHours: 54, meetingAttendance: 94, monthlyHours: buildMonthlyHours(32, 54), activities: 14,
    projects: [
      { id: 'PRY-01', name: 'Sistema de Gestión de Voluntariado', responsibility: 'Frontend y UX/UI', status: 'En curso', progress: 42, period: '2026-I' },
      { id: 'PRY-02', name: 'CINEEMPRENDETE', responsibility: 'Soporte digital', status: 'Completado', progress: 100, period: '2025-II' },
    ], sanctions: [],
  },
  {
    id: 'VOL-0211', initials: 'LM', name: 'Luis Mendoza Peña', document: '10002117',
    email: 'luis.mendoza@demo.incubunt.org', phone: '+51 900 111 211', area: 'GTH',
    role: 'Coordinador de bienestar', management: '2026-I', status: 'Activo', joinedAt: '04 feb 2025',
    participation: 88, birthDate: '09 ene 2002', address: 'Lima, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 211', bloodType: 'A+',
    university: 'Universidad de demostración', career: 'Psicología', cycle: '9.º ciclo',
    skills: ['Gestión de personas', 'Mediación', 'Excel'], hours: 102,
    inPersonHours: 58, virtualHours: 44, meetingAttendance: 91, monthlyHours: buildMonthlyHours(58, 44), activities: 18,
    projects: [{ id: 'PRY-03', name: 'Programa de Onboarding', responsibility: 'Responsable', status: 'En curso', progress: 70, period: '2026-I' }],
    sanctions: [],
  },
  {
    id: 'VOL-0196', initials: 'CR', name: 'Camila Ríos Salazar', document: '10001963',
    email: 'camila.rios@demo.incubunt.org', phone: '+51 900 111 196', area: 'Marketing',
    role: 'Diseñadora de contenidos', management: '2026-I', status: 'Activo', joinedAt: '12 nov 2024',
    participation: 95, birthDate: '22 may 2003', address: 'Arequipa, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 196', bloodType: 'B+',
    university: 'Universidad de demostración', career: 'Comunicación', cycle: '7.º ciclo',
    skills: ['Branding', 'Figma', 'Redacción'], hours: 124,
    inPersonHours: 46, virtualHours: 78, meetingAttendance: 97, monthlyHours: buildMonthlyHours(46, 78), activities: 21,
    projects: [{ id: 'PRY-04', name: 'Campaña Comunidad INCUBUNT', responsibility: 'Diseño visual', status: 'En curso', progress: 58, period: '2026-I' }],
    sanctions: [],
  },
  {
    id: 'VOL-0184', initials: 'JP', name: 'José Paredes Luna', document: '10001845',
    email: 'jose.paredes@demo.incubunt.org', phone: '+51 900 111 184', area: 'PMO',
    role: 'Analista de proyectos', management: '2025-II', status: 'Inactivo', joinedAt: '06 ago 2024',
    participation: 73, birthDate: '16 dic 2001', address: 'Cusco, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 184', bloodType: 'O-',
    university: 'Universidad de demostración', career: 'Administración', cycle: 'Egresado',
    skills: ['Scrum', 'Gestión de riesgos', 'Notion'], hours: 76,
    inPersonHours: 40, virtualHours: 36, meetingAttendance: 78, monthlyHours: buildMonthlyHours(40, 36), activities: 11,
    projects: [{ id: 'PRY-05', name: 'Estandarización de procesos', responsibility: 'Analista', status: 'Completado', progress: 100, period: '2025-II' }],
    sanctions: [],
  },
  {
    id: 'VOL-0172', initials: 'MS', name: 'María Soto Chávez', document: '10001729',
    email: 'maria.soto@demo.incubunt.org', phone: '+51 900 111 172', area: 'Sostenibilidad',
    role: 'Gestora de iniciativas', management: '2026-I', status: 'Suspendido', joinedAt: '21 jun 2024',
    participation: 61, birthDate: '03 abr 2002', address: 'Lima, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 172', bloodType: 'AB+',
    university: 'Universidad de demostración', career: 'Ingeniería Ambiental', cycle: '10.º ciclo',
    skills: ['Impacto social', 'Investigación', 'Facilitación'], hours: 54,
    inPersonHours: 30, virtualHours: 24, meetingAttendance: 66, monthlyHours: buildMonthlyHours(30, 24), activities: 9,
    projects: [{ id: 'PRY-06', name: 'Voluntariado Verde', responsibility: 'Facilitadora', status: 'Planificado', progress: 15, period: '2026-I' }],
    sanctions: [{ id: 'SAN-008', type: 'Amonestación', date: '12 sep 2025', status: 'Cerrada', summary: 'Registro ficticio utilizado únicamente para validar permisos de visualización.' }],
  },
  {
    id: 'VOL-0159', initials: 'DG', name: 'Diego García Núñez', document: '10001596',
    email: 'diego.garcia@demo.incubunt.org', phone: '+51 900 111 159', area: 'TI',
    role: 'Desarrollador Backend', management: '2025-II', status: 'Activo', joinedAt: '10 abr 2024',
    participation: 84, birthDate: '28 feb 2001', address: 'Trujillo, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 159', bloodType: 'A-',
    university: 'Universidad de demostración', career: 'Ingeniería Informática', cycle: 'Egresado',
    skills: ['Laravel', 'PostgreSQL', 'APIs'], hours: 112,
    inPersonHours: 28, virtualHours: 84, meetingAttendance: 89, monthlyHours: buildMonthlyHours(28, 84), activities: 16,
    projects: [{ id: 'PRY-01', name: 'Sistema de Gestión de Voluntariado', responsibility: 'Backend', status: 'En curso', progress: 48, period: '2026-I' }],
    sanctions: [],
  },
  {
    id: 'VOL-0137', initials: 'FR', name: 'Fernanda Ruiz Torres', document: '10001371',
    email: 'fernanda.ruiz@demo.incubunt.org', phone: '+51 900 111 137', area: 'GTH',
    role: 'Analista de selección', management: '2025-II', status: 'Inactivo', joinedAt: '19 ene 2024',
    participation: 79, birthDate: '11 jul 2002', address: 'Piura, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 137', bloodType: 'B-',
    university: 'Universidad de demostración', career: 'Administración', cycle: '9.º ciclo',
    skills: ['Selección', 'Entrevistas', 'People analytics'], hours: 90,
    inPersonHours: 52, virtualHours: 38, meetingAttendance: 86, monthlyHours: buildMonthlyHours(52, 38), activities: 13,
    projects: [{ id: 'PRY-07', name: 'Convocatoria 2025-II', responsibility: 'Entrevistadora', status: 'Completado', progress: 100, period: '2025-II' }],
    sanctions: [],
  },
  {
    id: 'VOL-0118', initials: 'RT', name: 'Renato Torres Vega', document: '10001182',
    email: 'renato.torres@demo.incubunt.org', phone: '+51 900 111 118', area: 'Marketing',
    role: 'Community manager', management: '2025-I', status: 'Activo', joinedAt: '02 oct 2023',
    participation: 90, birthDate: '25 oct 2000', address: 'Lima, Perú',
    emergencyContact: 'Contacto de demostración', emergencyPhone: '+51 900 000 118', bloodType: 'O+',
    university: 'Universidad de demostración', career: 'Marketing', cycle: 'Egresado',
    skills: ['Social media', 'Analítica', 'Fotografía'], hours: 138,
    inPersonHours: 64, virtualHours: 74, meetingAttendance: 96, monthlyHours: buildMonthlyHours(64, 74), activities: 24,
    projects: [{ id: 'PRY-08', name: 'Memoria anual INCUBUNT', responsibility: 'Contenido', status: 'En curso', progress: 64, period: '2026-I' }],
    sanctions: [],
  },
]
