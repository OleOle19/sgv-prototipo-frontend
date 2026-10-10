import { useState } from 'react'
import { EstructuraAplicacion } from './estructuras/EstructuraAplicacion'
import { permisosPorRol, voluntarios } from './datos/voluntarios'
import { PaginaVoluntarios } from './paginas/voluntarios/PaginaVoluntarios'
import { PaginaFichaVoluntario } from './paginas/voluntarios/PaginaFichaVoluntario'
import { PaginaProyecto } from './paginas/voluntarios/PaginaProyecto'
import type { RolAcceso } from './tipos/voluntario'

function Aplicacion() {
  const [rol, establecerRol] = useState<RolAcceso>('Dirección GTH')
  const [idVoluntarioSeleccionado, establecerIdVoluntarioSeleccionado] = useState<string | null>(() => new URLSearchParams(window.location.search).get('voluntario'))
  const [idProyectoSeleccionado, establecerIdProyectoSeleccionado] = useState<string | null>(() => new URLSearchParams(window.location.search).get('proyecto'))
  const permisos = permisosPorRol[rol]
  const voluntarioSeleccionado = voluntarios.find(({ id }) => id === idVoluntarioSeleccionado)
  const proyectoSeleccionado = voluntarioSeleccionado?.proyectos.find(({ id }) => id === idProyectoSeleccionado)
  const participantesProyecto = proyectoSeleccionado
    ? voluntarios.filter((voluntario) => voluntario.proyectos.some(({ id }) => id === proyectoSeleccionado.id))
    : []

  const abrirVoluntario = (id: string) => {
    establecerIdVoluntarioSeleccionado(id)
    establecerIdProyectoSeleccionado(null)
    window.history.replaceState(null, '', `?voluntario=${encodeURIComponent(id)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const mostrarVoluntarios = () => {
    establecerIdVoluntarioSeleccionado(null)
    establecerIdProyectoSeleccionado(null)
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const abrirProyecto = (id: string) => {
    if (!voluntarioSeleccionado) return
    establecerIdProyectoSeleccionado(id)
    window.history.replaceState(null, '', `?voluntario=${encodeURIComponent(voluntarioSeleccionado.id)}&proyecto=${encodeURIComponent(id)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const volverAFicha = () => {
    establecerIdProyectoSeleccionado(null)
    if (voluntarioSeleccionado) {
      window.history.replaceState(null, '', `?voluntario=${encodeURIComponent(voluntarioSeleccionado.id)}`)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cambiarRol = (rolSiguiente: RolAcceso) => {
    establecerRol(rolSiguiente)
    const permisosSiguientes = permisosPorRol[rolSiguiente]
    if (voluntarioSeleccionado && permisosSiguientes.alcanceArea && voluntarioSeleccionado.area !== permisosSiguientes.alcanceArea) {
      establecerIdVoluntarioSeleccionado(null)
      establecerIdProyectoSeleccionado(null)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <EstructuraAplicacion
      paginaActual={proyectoSeleccionado ? 'proyecto' : voluntarioSeleccionado ? 'ficha' : 'voluntarios'}
      alNavegarVoluntarios={mostrarVoluntarios}
      rol={rol}
      alCambiarRol={cambiarRol}
    >
      {proyectoSeleccionado ? (
        <PaginaProyecto proyecto={proyectoSeleccionado} participantes={participantesProyecto} alVolver={volverAFicha} />
      ) : voluntarioSeleccionado ? (
        <PaginaFichaVoluntario voluntario={voluntarioSeleccionado} permisos={permisos} alVolver={mostrarVoluntarios} alVerProyecto={abrirProyecto} />
      ) : (
        <PaginaVoluntarios permisos={permisos} alVerVoluntario={abrirVoluntario} />
      )}
    </EstructuraAplicacion>
  )
}

export default Aplicacion
