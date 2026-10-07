# Guía de tipeo - orden real de implementación

Esta guía no sigue el orden alfabético de los archivos. Sigue el orden en el que conviene construir y comprobar la funcionalidad.

## 1. Crear la base

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install lucide-react @tanstack/react-table @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-slot class-variance-authority clsx tailwind-merge @fontsource/montserrat @fontsource/poppins
npm install -D tailwindcss @tailwindcss/vite
```

Después agrega el plugin de Tailwind en `vite.config.ts` y el `@import "tailwindcss"` en `src/estilos.css`.

## 2. Definir el dominio antes de diseñar

Tipea primero `src/tipos/voluntario.ts`.

Orden interno recomendado:

1. `EstadoVoluntario` y `AreaVoluntario`.
2. `ResumenVoluntario` para las filas del listado.
3. `ParticipacionProyecto`, `RegistroSancion` y `HorasMensuales`.
4. `DetalleVoluntario` extendiendo el resumen, incluida la separación de horas por modalidad.
5. `FiltrosMiembros`.
6. `RolAcceso` y `PermisosAutorizacion`.

La razón es sencilla: los componentes deben adaptarse al contrato de datos, no inventar el contrato mientras se dibuja la pantalla.

## 3. Crear datos de demostración

Tipea `src/datos/voluntarios.ts`:

1. matriz `permisosPorRol`;
2. dos voluntarios para arrancar;
3. proyectos y sanciones;
4. el resto de registros para probar filtros y paginación.

Prueba que los objetos satisfagan `DetalleVoluntario[]` antes de continuar.

## 4. Preparar utilidades y estilos base

Continúa con:

1. `src/utilidades/combinarClases.ts`;
2. fuentes en `src/principal.tsx`;
3. colores, tipografía y estilos globales en `src/estilos.css`.

En esta etapa ya puedes comprobar que Tailwind se está procesando correctamente.

## 5. Construir los componentes primitivos

Tipea en este orden:

1. `src/componentes/interfaz/Boton.tsx`;
2. `src/componentes/interfaz/FotoPerfil.tsx`;
3. `src/componentes/interfaz/InsigniaEstado.tsx`;
4. `src/componentes/interfaz/Selector.tsx`.

Comprueba cada componente aislado temporalmente desde `Aplicacion.tsx` antes de seguir.

## 6. Construir el cascarón del sistema

Tipea `src/estructuras/EstructuraAplicacion.tsx` por bloques:

1. marca SGV;
2. navegación lateral;
3. barra superior;
4. selector de rol;
5. menú móvil;
6. contenedor `<main>`.

Verifica escritorio y móvil antes de incorporar las páginas.

## 7. Implementar el directorio

Primero crea `src/componentes/voluntarios/FiltrosMiembros.tsx` y conecta solamente un campo a la vez:

1. búsqueda por nombre;
2. DNI exacto condicionado por permiso;
3. área;
4. estado;
5. gestión;
6. panel avanzado por proyecto y participación mínima;
7. limpiar filtros.

Luego crea `src/paginas/voluntarios/PaginaMiembros.tsx`:

1. alcance del rol y resumen ejecutivo;
2. filtrado;
3. columnas tipadas;
4. TanStack Table;
5. tabla de escritorio;
6. tarjetas móviles;
7. paginación;
8. estado vacío.

## 8. Implementar la ficha

En `src/paginas/voluntarios/PaginaFichaVoluntario.tsx` construye:

1. cabecera e identidad;
2. aviso de información restringida;
3. pestaña Identificación;
4. pestaña Métricas, tarjetas por modalidad y gráfico mensual;
5. pestaña Proyectos;
6. pestaña Sanciones;
7. estados sin información;
8. sustitución de valores sensibles según permisos.

## 9. Conectar el flujo

Finalmente tipeas `src/Aplicacion.tsx` para manejar:

1. rol activo;
2. voluntario seleccionado;
3. navegación listado-ficha;
4. enlace directo mediante `?voluntario=...`;
5. retorno seguro al listado al perder alcance.

## 10. Verificación final

```bash
npm run lint
npm run build
```

Revisa manualmente al menos estos anchos:

- 390 px;
- 768 px;
- 1440 px.

Cuando llegue Laravel, conserva los componentes visuales y reemplaza los datos ficticios por propiedades de Inertia. La paginación y los filtros deberán pasar a modo servidor sin cambiar la composición de la interfaz.
