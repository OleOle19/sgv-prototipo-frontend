import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../lib/cn'

export function Avatar({ initials, size = 'md', className }: { initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <AvatarPrimitive.Root className={cn(
      'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e8f2f8] font-display font-bold text-[#004373]',
      size === 'sm' && 'size-9 text-xs', size === 'md' && 'size-11 text-sm', size === 'lg' && 'size-20 text-xl', className,
    )}>
      <AvatarPrimitive.Fallback>{initials}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
