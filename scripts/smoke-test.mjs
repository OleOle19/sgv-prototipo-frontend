import assert from 'node:assert/strict'
import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
})

const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

try {
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await page.getByRole('button', { name: 'Más' }).click()
  await page.getByPlaceholder('Nombre o responsabilidad').fill('Backend')
  await page.getByText('1 resultado', { exact: true }).waitFor()
  assert.equal(await page.locator('tr').filter({ hasText: 'Diego García Núñez' }).count(), 1)
  await page.getByRole('button', { name: 'Limpiar filtros' }).click()

  await page.getByPlaceholder('Buscar por nombre o DNI exacto').fill('Andrea')
  await page.getByText('1 resultado', { exact: true }).waitFor()
  const andreaRow = page.locator('tr').filter({ hasText: 'Andrea Valdivia Rojas' })
  assert.equal(await andreaRow.count(), 1)

  await andreaRow.click()
  await page.getByRole('heading', { name: 'Andrea Valdivia Rojas' }).waitFor()
  await page.getByRole('tab', { name: 'Métricas' }).click()
  await page.getByText('Horas por modalidad', { exact: true }).waitFor()
  assert.equal(await page.getByText('Horas presenciales', { exact: true }).count(), 1)
  await page.getByRole('tab', { name: 'Identificación' }).click()
  await page.getByText('Usuario demo', { exact: true }).click()
  await page.getByRole('menuitem', { name: 'Dirección de área' }).click()
  await page.getByText('Vista con información restringida', { exact: true }).waitFor()
  assert.equal(await page.getByText('••••••••', { exact: true }).count(), 1)

  await page.getByRole('button', { name: 'Volver a miembros' }).click()
  await page.getByText('Vista limitada al área TI', { exact: true }).waitFor()
  await page.getByText('2 resultados', { exact: true }).waitFor()
  console.log('Smoke test completado: filtros avanzados, ficha, métricas y permisos funcionan.')
} finally {
  await browser.close()
}
