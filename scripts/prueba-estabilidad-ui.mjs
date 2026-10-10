import assert from 'node:assert/strict'
import { abrirNavegador } from './utilidades/abrirNavegador.mjs'

const navegador = await abrirNavegador()
try {
  for (const ancho of [1440, 1220, 900, 390]) {
    const pagina = await navegador.newPage({ viewport: { width: ancho, height: 900 } })
    await pagina.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
    await pagina.getByRole('button', { name: 'Más', exact: true }).click()
    // Headless no siempre reporta la barra clásica de Windows. Reproducimos
    // su medición para que Radix añada los 17 px que causaban el salto.
    await pagina.evaluate(() => {
      const anchoDocumento = document.documentElement.clientWidth
      Object.defineProperty(document.documentElement, 'clientWidth', {
        configurable: true,
        get: () => anchoDocumento - 17,
      })
    })
    const medir = () => pagina.evaluate(() => {
      const selectores = ['#root', 'header', 'main', 'main > div > section']
      return selectores.map((selector) => {
        const elemento = document.querySelector(selector)
        if (!elemento) return null
        const rectangulo = elemento.getBoundingClientRect()
        return [rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height]
      })
    })
    for (const etiqueta of ['Área', 'Estado', 'Período de ingreso', 'Proyecto']) {
      const control = pagina.getByRole('combobox', { name: etiqueta, exact: true })
      await control.scrollIntoViewIfNeeded()
      const antes = await medir()
      await control.click()
      assert.deepEqual(await medir(), antes, `El selector ${etiqueta} altera la pantalla a ${ancho}px`)
      assert.equal(await pagina.locator('body').evaluate((elemento) => getComputedStyle(elemento).marginRight), '0px')
      await pagina.keyboard.press('Escape')
      assert.deepEqual(await medir(), antes)
    }
    if (ancho >= 900) {
      const antes = await medir()
      await pagina.getByRole('button', { name: /Usuario demo/ }).click()
      assert.deepEqual(await medir(), antes, 'El menú de roles altera la pantalla')
      await pagina.keyboard.press('Escape')
    }
    await pagina.close()
  }
  console.log('Estabilidad verificada en 1440, 1220, 900 y 390 px, con compensación clásica de Windows.')
} finally {
  await navegador.close()
}
