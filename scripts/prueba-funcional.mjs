import assert from 'node:assert/strict'
import { abrirNavegador } from './utilidades/abrirNavegador.mjs'

const navegador = await abrirNavegador()
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 1000 } })

try {
  await pagina.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await pagina.getByRole('heading', { name: 'Buscar voluntarios' }).waitFor()
  await pagina.getByText('6 resultados', { exact: true }).waitFor()
  const efectosMetricas = await pagina.locator('main section').first().locator('div')
    .evaluateAll((elementos) => elementos.map((elemento) => getComputedStyle(elemento).backdropFilter))
  assert.ok(efectosMetricas.every((efecto) => efecto === 'none'), 'Las métricas no deben usar desenfoque de fondo')
  assert.equal(await pagina.getByRole('columnheader', { name: 'DNI' }).count(), 0)
  const indicador = pagina.locator('tbody tr').filter({ hasText: 'Diego García Núñez' }).getByRole('progressbar', { name: 'Participación', exact: true })
  assert.equal(await indicador.getAttribute('aria-valuenow'), '84')
  assert.equal(await indicador.locator('.participacion-segmentada__tramo').count(), 10)

  const nombresPrimeraPagina = await pagina.locator('tbody tr td:first-child .font-semibold').allTextContents()
  assert.deepEqual(nombresPrimeraPagina, [
    'Diego García Núñez',
    'Luis Mendoza Peña',
    'Camila Ríos Salazar',
    'Renato Torres Vega',
    'Andrea Valdivia Rojas',
  ])

  await pagina.getByRole('combobox', { name: 'Área', exact: true }).click()
  await pagina.getByRole('option', { name: 'TI', exact: true }).click()
  await pagina.getByRole('button', { name: 'Quitar filtro Área: TI', exact: true }).click()
  await pagina.getByText('6 resultados', { exact: true }).waitFor()

  const anchoRaizAntesDeInteractuar = await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width)
  await pagina.getByRole('button', { name: 'Más', exact: true }).click()
  await pagina.getByRole('combobox', { name: 'Área' }).click()
  const anchoRaizConSelectorAbierto = await pagina.locator('#root').evaluate((elemento) => elemento.getBoundingClientRect().width)
  assert.equal(anchoRaizConSelectorAbierto, anchoRaizAntesDeInteractuar)
  await pagina.keyboard.press('Escape')

  await pagina.getByRole('checkbox', { name: 'Incluir voluntarios retirados' }).check()
  await pagina.getByText('8 resultados', { exact: true }).waitFor()
  await pagina.getByRole('button', { name: 'Restablecer filtros' }).click()
  const controlParticipacion = pagina.locator('input[type="range"]')
  await controlParticipacion.fill('90')
  await pagina.getByText('6 resultados', { exact: true }).waitFor()
  await controlParticipacion.dispatchEvent('pointerup')
  await pagina.getByText('3 resultados', { exact: true }).waitFor()
  await pagina.getByRole('button', { name: 'Restablecer filtros' }).click()
  await pagina.getByRole('combobox', { name: 'Proyecto' }).click()
  await pagina.getByRole('option', { name: 'Programa de Onboarding' }).click()
  await pagina.getByText('1 resultado', { exact: true }).waitFor()
  assert.equal(await pagina.locator('tr').filter({ hasText: 'Luis Mendoza Peña' }).count(), 1)
  await pagina.getByRole('button', { name: 'Restablecer filtros' }).click()

  await pagina.getByPlaceholder('Nombre o DNI exacto').fill('Andrea')
  await pagina.getByText('1 resultado', { exact: true }).waitFor()
  const estabilidadTabla = await pagina.locator('table').evaluate((tabla) => ({
    bordeColapsado: getComputedStyle(tabla).borderCollapse,
    altoReserva: tabla.parentElement?.getBoundingClientRect().height ?? 0,
    filasEnfocadas: document.querySelectorAll('tbody tr:focus').length,
  }))
  assert.equal(estabilidadTabla.bordeColapsado, 'separate')
  assert.ok(estabilidadTabla.altoReserva >= 428)
  assert.equal(estabilidadTabla.filasEnfocadas, 0)
  await pagina.getByRole('button', { name: 'Ver más de Andrea Valdivia Rojas' }).click()

  await pagina.getByRole('heading', { name: 'Andrea Valdivia Rojas' }).waitFor()
  assert.ok(await pagina.getByText('Código universitario', { exact: true }).count() >= 1)
  await pagina.getByRole('tab', { name: 'Sensible' }).click()
  await pagina.getByRole('tabpanel', { name: 'Sensible' }).getByText('Grupo sanguíneo', { exact: true }).waitFor()
  await pagina.getByRole('tab', { name: 'Métricas' }).click()
  await pagina.getByRole('tabpanel', { name: 'Métricas' }).getByText('Distribución de los últimos seis meses.', { exact: true }).waitFor()
  await pagina.getByRole('button', { name: /^Sep: / }).click()
  await pagina.locator('[aria-live="polite"]').getByText('Sep', { exact: true }).waitFor()
  await pagina.getByRole('tab', { name: 'Proyectos' }).click()
  await pagina.getByRole('button', { name: /Sistema de Gestión de Voluntariado/ }).click()
  await pagina.getByRole('heading', { name: 'Sistema de Gestión de Voluntariado' }).waitFor()
  await pagina.getByRole('button', { name: 'Volver a la ficha' }).click()
  await pagina.getByRole('heading', { name: 'Andrea Valdivia Rojas' }).waitFor()

  await pagina.getByText('Usuario demo', { exact: true }).click()
  await pagina.getByRole('menuitem', { name: 'Dirección de área' }).click()
  await pagina.getByText('Vista con información restringida', { exact: true }).waitFor()
  await pagina.getByRole('button', { name: 'Volver a voluntarios' }).click()
  await pagina.getByText('Vista limitada al área TI', { exact: true }).waitFor()
  await pagina.getByText('2 resultados', { exact: true }).waitFor()

  await pagina.goto('http://127.0.0.1:5173/?voluntario=VOL-0184', { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await pagina.getByRole('heading', { name: 'José Paredes Luna' }).waitFor()
  await pagina.getByText('Período de retiro', { exact: true }).waitFor()

  const paginaMovil = await navegador.newPage({ viewport: { width: 390, height: 844 } })
  await paginaMovil.goto('http://127.0.0.1:5173/?voluntario=VOL-0248', { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await paginaMovil.getByRole('heading', { name: 'Andrea Valdivia Rojas' }).waitFor()
  assert.equal(await paginaMovil.locator('details').count(), 5)
  await paginaMovil.close()

  console.log('Prueba funcional completada: observaciones del Sprint 1 verificadas.')
} finally {
  await navegador.close()
}
