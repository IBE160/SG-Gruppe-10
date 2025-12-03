'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { cn } from '@/lib/utils'

export interface BottomNavProps {
  activeTab?: 'home' | 'workouts' | 'goals' | 'profile'
}

const navItems = [
  { href: '/', label: 'Home', icon: 'home', tab: 'home' as const },
  { href: '/workouts', label: 'Workouts', icon: 'fitness_center', tab: 'workouts' as const },
  { href: '/goals', label: 'Goals', icon: 'flag', tab: 'goals' as const },
  { href: '/profile', label: 'Profile', icon: 'person', tab: 'profile' as const },
]

export function BottomNav({ activeTab }: BottomNavProps) {
  const pathname = usePathname()

  const getIsActive = (itemHref: string, itemTab: string) => {
    if (activeTab) {
      return activeTab === itemTab
    }
    if (itemHref === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(itemHref)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[640px] mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = getIsActive(item.href, item.tab)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-colors',
                  'hover:bg-gray-50',
                  isActive ? 'text-[#22c55e]' : 'text-[#9ca3af]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <MaterialIcon
                  icon={item.icon}
                  className={cn('text-2xl', isActive && 'text-[#22c55e]')}
                />
                <span className={cn('text-xs', isActive && 'font-semibold')}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
