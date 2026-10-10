import { mkdir } from 'node:fs/promises'
import { abrirNavegador } from './utilidades/abrirNavegador.mjs'

const navegador = await abrirNavegador()
console.log('Navegador iniciado')

await mkdir('tmp/screens', { recursive: true })

const capturas = [
  { nombre: 'voluntarios-escritorio.png', direccion: 'http://127.0.0.1:5173/', vista: { width: 1440, height: 1000 } },
  { nombre: 'voluntarios-tableta.png', direccion: 'http://127.0.0.1:5173/', vista: { width: 900, height: 1000 } },
  { nombre: 'voluntarios-movil.png', direccion: 'http://127.0.0.1:5173/', vista: { width: 390, height: 844 }, paginaCompleta: true },
  { nombre: 'ficha-escritorio.png', direccion: 'http://127.0.0.1:5173/?voluntario=VOL-0248', vista: { width: 1440, height: 1100 } },
  { nombre: 'ficha-movil.png', direccion: 'http://127.0.0.1:5173/?voluntario=VOL-0248', vista: { width: 390, height: 844 } },
  { nombre: 'metricas-escritorio.png', direccion: 'http://127.0.0.1:5173/?voluntario=VOL-0248', vista: { width: 1440, height: 1100 }, pestaña: 'Métricas' },
  { nombre: 'metricas-movil.png', direccion: 'http://127.0.0.1:5173/?voluntario=VOL-0248', vista: { width: 390, height: 844 }, seccionMovil: 'Métricas' },
]

for (const captura of capturas) {
  console.log(`Capturando ${captura.nombre}`)
  const pagina = await navegador.newPage({ viewport: captura.vista })
  await pagina.goto(captura.direccion, { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await pagina.evaluate(() => document.fonts.ready)
  if (captura.pestaña) await pagina.getByRole('tab', { name: captura.pestaña }).click()
  if (captura.seccionMovil) {
    await pagina.locator('details').filter({ hasText: captura.seccionMovil }).locator('summary').click()
    await pagina.locator('details').filter({ hasText: captura.seccionMovil }).scrollIntoViewIfNeeded()
  }
  await pagina.waitForTimeout(400)
  await pagina.screenshot({ path: `tmp/screens/${captura.nombre}`, fullPage: captura.paginaCompleta ?? false })
  await pagina.close()
}

await navegador.close()
console.log('Revisión visual completada')
