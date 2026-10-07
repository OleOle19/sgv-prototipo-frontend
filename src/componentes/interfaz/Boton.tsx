import { Slot as Ranura } from '@radix-ui/react-slot'
import { cva, type VariantProps as PropiedadesVariantes } from 'class-variance-authority'
import type { ButtonHTMLAttributes as AtributosBotonHtml } from 'react'
import { combinarClases } from '../../utilidades/combinarClases'

const variantesBoton = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#ffb025]/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variante: {
        primaria: 'bg-[#004373] text-white shadow-sm hover:bg-[#063657]',
        secundaria: 'border border-[#d6e0e7] bg-white text-[#263746] hover:border-[#aebfca] hover:bg-[#f8fafb]',
        fantasma: 'text-[#566675] hover:bg-[#edf2f5] hover:text-[#004373]',
        amarilla: 'bg-[#ffb025] text-[#1b2b38] shadow-sm hover:bg-[#f4a514]',
      },
      tamano: {
        pequeno: 'h-9 px-3', medio: 'h-11 px-4', icono: 'size-10 p-0',
      },
    },
    defaultVariants: { variante: 'primaria', tamano: 'medio' },
  },
)

interface PropiedadesBoton extends AtributosBotonHtml<HTMLButtonElement>, PropiedadesVariantes<typeof variantesBoton> {
  comoHijo?: boolean
}

export function Boton({ className, variante, tamano, comoHijo, ...propiedades }: PropiedadesBoton) {
  const Componente = comoHijo ? Ranura : 'button'
  return <Componente className={combinarClases(variantesBoton({ variante, tamano }), className)} {...propiedades} />
}
