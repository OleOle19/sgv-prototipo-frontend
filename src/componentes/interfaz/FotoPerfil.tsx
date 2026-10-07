import * as FotoPerfilPrimitiva from '@radix-ui/react-avatar'
import { combinarClases } from '../../utilidades/combinarClases'

export function FotoPerfil({ iniciales, tamaño = 'medio', clases }: { iniciales: string; tamaño?: 'pequeño' | 'medio' | 'grande'; clases?: string }) {
  return (
    <FotoPerfilPrimitiva.Root className={combinarClases(
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f2f8] font-display font-bold text-[#004373]',
      tamaño === 'pequeño' && 'size-9 text-xs', tamaño === 'medio' && 'size-11 text-sm', tamaño === 'grande' && 'size-20 text-xl', clases,
    )}>
      <FotoPerfilPrimitiva.Fallback>{iniciales}</FotoPerfilPrimitiva.Fallback>
    </FotoPerfilPrimitiva.Root>
  )
}
