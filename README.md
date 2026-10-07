# SGV - Prototipo de ficha y directorio de voluntarios

Propuesta funcional y responsive para los entregables de Frontend del Sistema de Gestión de Voluntariado de INCUBUNT:

- búsqueda y filtros de miembros;
- resumen ejecutivo del directorio;
- ficha integral del voluntario;
- métricas presenciales/virtuales e histórico mensual;
- variación de visibilidad según permisos;
- adaptación para escritorio y móvil.

Todos los nombres, documentos y datos personales incluidos son ficticios.

## Ejecutar localmente

Requisitos: Node.js 20.19 o superior.

```bash
git clone https://github.com/OleOle19/sgv-prototipo-frontend.git
cd sgv-prototipo-frontend
npm ci
npm run dev
```

Vite mostrará una dirección local, normalmente `http://localhost:5173`.

El repositorio es público, así que cualquier persona puede clonarlo sin autenticarse. Para subir cambios sí necesita permiso de colaboración. Para descargar actualizaciones posteriores puede ejecutar `git pull` dentro de la carpeta.

## Flujo de colaboración sugerido

Cada integrante debe trabajar en una rama propia y proponer sus cambios mediante un pull request:

```bash
git switch -c feature/nombre-del-cambio
git add .
git commit -m "feat: describe brevemente el cambio"
git push -u origin feature/nombre-del-cambio
```

La rama `main` debe conservar siempre una versión compilable de la demo.

## Comandos

```bash
npm run dev
npm run verificar
npm run build
npm run lint
npm run prueba:funcional
npm run capturas:visuales
npm run preview
```

`prueba:funcional` y `capturas:visuales` esperan que `npm run dev` esté ejecutándose en otra terminal.
Los scripts buscan Edge o Chrome automáticamente. Si el navegador está instalado en otra ruta, puedes definir la variable `NAVEGADOR_EJECUTABLE`.

## Estructura del proyecto

```text
src/
├── componentes/   Piezas reutilizables de interfaz y voluntarios
├── datos/         Datos ficticios y matriz de permisos de la demo
├── estructuras/   Distribución general, barra lateral y cabecera
├── paginas/       Vistas completas del directorio y la ficha
├── tipos/         Contratos TypeScript del dominio
└── utilidades/    Funciones compartidas sin interfaz

docs/              Decisiones y guía de implementación
scripts/           Pruebas funcionales y capturas automatizadas
public/            Recursos estáticos públicos
```

## Recorrido sugerido para la demostración

1. Probar la búsqueda por nombre, los filtros combinables y los filtros avanzados por proyecto y participación.
2. Buscar el DNI ficticio exacto `10002481` con el rol Dirección GTH.
3. Abrir una ficha y recorrer Identificación, Métricas (incluido el histórico mensual), Proyectos y Sanciones.
4. Cambiar el rol desde el menú superior a Dirección de área.
5. Comprobar que el directorio se limita a TI y oculta DNI, datos sensibles y sanciones.
6. Reducir la ventana para revisar la versión móvil.

La ficha de Andrea también puede abrirse directamente con `?voluntario=VOL-0248`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Radix UI
- TanStack Table
- Lucide React
- Montserrat y Poppins empaquetadas localmente

El prototipo no incorpora Inertia todavía porque no existe el servidor Laravel. Las páginas reciben objetos tipados que posteriormente pueden convertirse en propiedades de Inertia sin cambiar su estructura visual.

Los identificadores propios del proyecto están escritos en español. Permanecen en inglés únicamente las APIs y atributos exigidos por React, TypeScript, HTML y las librerías externas, por ejemplo `useState`, `className`, `onClick` o `data` en la configuración de TanStack Table.

La marca del lateral es un identificador textual del prototipo, no un isologo oficial. Debe sustituirse por el recurso aprobado cuando el equipo entregue los archivos de marca definitivos.

Consulta [`docs/GUIA_DE_TIPEO.md`](docs/GUIA_DE_TIPEO.md) para reconstruirlo en un orden de implementación realista y [`docs/DECISIONES.md`](docs/DECISIONES.md) para los supuestos pendientes de validación.
