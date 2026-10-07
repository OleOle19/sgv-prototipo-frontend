import * as SelectorPrimitivo from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { combinarClases } from '../../utilidades/combinarClases'

interface PropiedadesSelector {
  valor: string
  alCambiarValor: (valor: string) => void
  etiqueta: string
  opciones: string[]
  clases?: string
}

export function Selector({ valor, alCambiarValor, etiqueta, opciones, clases }: PropiedadesSelector) {
  return (
    <SelectorPrimitivo.Root value={valor} onValueChange={alCambiarValor}>
      <SelectorPrimitivo.Trigger
        aria-label={etiqueta}
        className={combinarClases('flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-[#d6e0e7] bg-white px-3.5 text-sm text-[#334554] outline-none transition hover:border-[#aebfca] focus:ring-3 focus:ring-[#004373]/10', clases)}
      >
        <SelectorPrimitivo.Value />
        <SelectorPrimitivo.Icon><ChevronDown className="size-4 text-[#71808d]" /></SelectorPrimitivo.Icon>
      </SelectorPrimitivo.Trigger>
      <SelectorPrimitivo.Portal>
        <SelectorPrimitivo.Content position="popper" sideOffset={6} className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#d6e0e7] bg-white p-1.5 shadow-xl">
          <SelectorPrimitivo.Viewport>
            {opciones.map((opcion) => (
              <SelectorPrimitivo.Item key={opcion} value={opcion} className="relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pr-8 pl-3 text-sm text-[#334554] outline-none data-[highlighted]:bg-[#e8f2f8] data-[highlighted]:text-[#004373]">
                <SelectorPrimitivo.ItemText>{opcion}</SelectorPrimitivo.ItemText>
                <SelectorPrimitivo.ItemIndicator className="absolute right-2.5"><Check className="size-4" /></SelectorPrimitivo.ItemIndicator>
              </SelectorPrimitivo.Item>
            ))}
          </SelectorPrimitivo.Viewport>
        </SelectorPrimitivo.Content>
      </SelectorPrimitivo.Portal>
    </SelectorPrimitivo.Root>
  )
}
