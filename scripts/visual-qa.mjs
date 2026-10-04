import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright-core'

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
})
console.log('Browser iniciado')

await mkdir('tmp/screens', { recursive: true })

const captures = [
  { name: 'members-desktop-qa.png', url: 'http://127.0.0.1:5173/', viewport: { width: 1440, height: 1000 } },
  { name: 'members-mobile-qa.png', url: 'http://127.0.0.1:5173/', viewport: { width: 390, height: 844 } },
  { name: 'profile-desktop-qa.png', url: 'http://127.0.0.1:5173/?volunteer=VOL-0248', viewport: { width: 1440, height: 1100 } },
  { name: 'profile-mobile-qa.png', url: 'http://127.0.0.1:5173/?volunteer=VOL-0248', viewport: { width: 390, height: 844 } },
  { name: 'metrics-desktop-qa.png', url: 'http://127.0.0.1:5173/?volunteer=VOL-0248', viewport: { width: 1440, height: 1100 }, tab: 'Métricas' },
  { name: 'metrics-mobile-qa.png', url: 'http://127.0.0.1:5173/?volunteer=VOL-0248', viewport: { width: 390, height: 844 }, tab: 'Métricas' },
]

for (const capture of captures) {
  console.log(`Capturando ${capture.name}`)
  const page = await browser.newPage({ viewport: capture.viewport })
  await page.goto(capture.url, { waitUntil: 'domcontentloaded', timeout: 10_000 })
  await page.evaluate(() => document.fonts.ready)
  if (capture.tab) await page.getByRole('tab', { name: capture.tab }).click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: `tmp/screens/${capture.name}`, fullPage: false })
  await page.close()
}

await browser.close()
console.log('QA visual completado')
