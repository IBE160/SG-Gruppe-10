'use client'

import { useRouter } from 'next/navigation'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { Button } from '@/components/ui/button'

export interface AppHeaderProps {
  title: string
  showBackButton?: boolean
  actionButton?: {
    icon: string
    onClick: () => void
    label: string
  }
}

export function AppHeader({ title, showBackButton = false, actionButton }: AppHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-[640px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section: Back button */}
          <div className="flex items-center w-12">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                aria-label="Go back"
                className="h-9 w-9"
              >
                <MaterialIcon icon="arrow_back" className="text-xl" />
              </Button>
            )}
          </div>

          {/* Center section: Title */}
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-900 truncate px-2">
            {title}
          </h1>

          {/* Right section: Action button */}
          <div className="flex items-center w-12">
            {actionButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={actionButton.onClick}
                aria-label={actionButton.label}
                className="h-9 w-9"
              >
                <MaterialIcon icon={actionButton.icon} className="text-xl" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
