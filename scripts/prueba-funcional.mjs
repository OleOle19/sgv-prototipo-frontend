import assert from 'node:assert/strict'
import { abrirNavegador } from './utilidades/abrirNavegador.mjs'

const navegador = await abrirNavegador()

const pagina = await navegador.newPage({ viewport: { width: 1440, height: 1000 } })

try {
  await pagina.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await pagina.getByRole('button', { name: 'Más' }).click()
  await pagina.getByPlaceholder('Nombre o responsabilidad').fill('Backend')
  await pagina.getByText('1 resultado', { exact: true }).waitFor()
  assert.equal(await pagina.locator('tr').filter({ hasText: 'Diego García Núñez' }).count(), 1)
  await pagina.getByRole('button', { name: 'Limpiar filtros' }).click()

  await pagina.getByPlaceholder('Buscar por nombre o DNI exacto').fill('Andrea')
  await pagina.getByText('1 resultado', { exact: true }).waitFor()
  const filaAndrea = pagina.locator('tr').filter({ hasText: 'Andrea Valdivia Rojas' })
  assert.equal(await filaAndrea.count(), 1)

  await filaAndrea.click()
  await pagina.getByRole('heading', { name: 'Andrea Valdivia Rojas' }).waitFor()
  await pagina.getByRole('tab', { name: 'Métricas' }).click()
  await pagina.getByText('Horas por modalidad', { exact: true }).waitFor()
  assert.equal(await pagina.getByText('Horas presenciales', { exact: true }).count(), 1)
  await pagina.getByRole('tab', { name: 'Identificación' }).click()
  await pagina.getByText('Usuario demo', { exact: true }).click()
  await pagina.getByRole('menuitem', { name: 'Dirección de área' }).click()
  await pagina.getByText('Vista con información restringida', { exact: true }).waitFor()
  assert.equal(await pagina.getByText('••••••••', { exact: true }).count(), 1)

  await pagina.getByRole('button', { name: 'Volver a miembros' }).click()
  await pagina.getByText('Vista limitada al área TI', { exact: true }).waitFor()
  await pagina.getByText('2 resultados', { exact: true }).waitFor()
  console.log('Prueba funcional completada: filtros avanzados, ficha, métricas y permisos funcionan.')
} finally {
  await navegador.close()
}
