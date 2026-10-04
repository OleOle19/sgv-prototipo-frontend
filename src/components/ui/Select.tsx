import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  label: string
  options: string[]
  className?: string
}

export function Select({ value, onValueChange, label, options, className }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        aria-label={label}
        className={cn('flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-[#d6e0e7] bg-white px-3.5 text-sm text-[#334554] outline-none transition hover:border-[#aebfca] focus:ring-3 focus:ring-[#004373]/10', className)}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon><ChevronDown className="size-4 text-[#71808d]" /></SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content position="popper" sideOffset={6} className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-[#d6e0e7] bg-white p-1.5 shadow-xl">
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item key={option} value={option} className="relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pr-8 pl-3 text-sm text-[#334554] outline-none data-[highlighted]:bg-[#e8f2f8] data-[highlighted]:text-[#004373]">
                <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2.5"><Check className="size-4" /></SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
