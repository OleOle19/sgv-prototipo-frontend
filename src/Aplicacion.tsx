import { useState } from 'react'
import { EstructuraAplicacion } from './estructuras/EstructuraAplicacion'
import { permisosPorRol, voluntarios } from './datos/voluntarios'
import { PaginaMiembros } from './paginas/voluntarios/PaginaMiembros'
import { PaginaFichaVoluntario } from './paginas/voluntarios/PaginaFichaVoluntario'
import type { RolAcceso } from './tipos/voluntario'

function Aplicacion() {
  const [rol, establecerRol] = useState<RolAcceso>('Dirección GTH')
  const [idVoluntarioSeleccionado, establecerIdVoluntarioSeleccionado] = useState<string | null>(() => new URLSearchParams(window.location.search).get('voluntario'))
  const permisos = permisosPorRol[rol]
  const voluntarioSeleccionado = voluntarios.find(({ id }) => id === idVoluntarioSeleccionado)

  const abrirVoluntario = (id: string) => {
    establecerIdVoluntarioSeleccionado(id)
    window.history.replaceState(null, '', `?voluntario=${encodeURIComponent(id)}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const mostrarMiembros = () => {
    establecerIdVoluntarioSeleccionado(null)
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cambiarRol = (rolSiguiente: RolAcceso) => {
    establecerRol(rolSiguiente)
    const permisosSiguientes = permisosPorRol[rolSiguiente]
    if (voluntarioSeleccionado && permisosSiguientes.alcanceArea && voluntarioSeleccionado.area !== permisosSiguientes.alcanceArea) {
      establecerIdVoluntarioSeleccionado(null)
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  return (
    <EstructuraAplicacion
      paginaActual={voluntarioSeleccionado ? 'ficha' : 'miembros'}
      alNavegarMiembros={mostrarMiembros}
      rol={rol}
      alCambiarRol={cambiarRol}
    >
      {voluntarioSeleccionado ? (
        <PaginaFichaVoluntario voluntario={voluntarioSeleccionado} permisos={permisos} alVolver={mostrarMiembros} />
      ) : (
        <PaginaMiembros permisos={permisos} alVerVoluntario={abrirVoluntario} />
      )}
    </EstructuraAplicacion>
  )
}

export default Aplicacion
