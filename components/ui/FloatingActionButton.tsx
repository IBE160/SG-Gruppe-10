'use client'

import { MaterialIcon } from '@/components/ui/MaterialIcon'

interface FloatingActionButtonProps {
  icon?: string
  onClick: () => void
  ariaLabel: string
  className?: string
}

export function FloatingActionButton({ 
  icon = 'add', 
  onClick, 
  ariaLabel,
  className = '' 
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fixed bottom-20 right-6 w-14 h-14 bg-primary-green text-white rounded-full shadow-lg 
        hover:scale-110 active:scale-95 transition-transform z-50 
        flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-green focus:ring-offset-2 
        ${className}`}
    >
      <MaterialIcon icon={icon} className="text-2xl" />
    </button>
  )
}
