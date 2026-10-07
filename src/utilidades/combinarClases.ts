import { clsx as construirClases, type ClassValue as ValorClase } from 'clsx'
import { twMerge as unirClasesTailwind } from 'tailwind-merge'

export function combinarClases(...valores: ValorClase[]) {
  return unirClasesTailwind(construirClases(valores))
}
