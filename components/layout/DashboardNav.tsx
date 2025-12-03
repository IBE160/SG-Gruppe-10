'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dumbbell, Target, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/workouts', label: 'Workouts', icon: Dumbbell },
    { href: '/goals', label: 'Goals', icon: Target },
  ]
  
  return (
    <nav className="bg-white border-b border-gray-200 mb-8">
      <div className="px-8 py-4">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-gray-900">FitTrack</h2>
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                              (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={isActive ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
