import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#ffb025]/40 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[#004373] text-white shadow-sm hover:bg-[#063657]',
        secondary: 'border border-[#d6e0e7] bg-white text-[#263746] hover:border-[#aebfca] hover:bg-[#f8fafb]',
        ghost: 'text-[#566675] hover:bg-[#edf2f5] hover:text-[#004373]',
        yellow: 'bg-[#ffb025] text-[#1b2b38] shadow-sm hover:bg-[#f4a514]',
      },
      size: {
        sm: 'h-9 px-3', md: 'h-11 px-4', icon: 'size-10 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
