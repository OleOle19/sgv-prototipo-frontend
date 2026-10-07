import * as FotoPerfilPrimitiva from '@radix-ui/react-avatar'
import { combinarClases } from '../../utilidades/combinarClases'

export function FotoPerfil({ iniciales, tamano = 'medio', clases }: { iniciales: string; tamano?: 'pequeno' | 'medio' | 'grande'; clases?: string }) {
  return (
    <FotoPerfilPrimitiva.Root className={combinarClases(
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f2f8] font-display font-bold text-[#004373]',
      tamano === 'pequeno' && 'size-9 text-xs', tamano === 'medio' && 'size-11 text-sm', tamano === 'grande' && 'size-20 text-xl', clases,
    )}>
      <FotoPerfilPrimitiva.Fallback>{iniciales}</FotoPerfilPrimitiva.Fallback>
    </FotoPerfilPrimitiva.Root>
  )
}
