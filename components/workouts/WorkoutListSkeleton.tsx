'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function WorkoutListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div 
          key={i} 
          className="bg-primary-green/10 rounded-xl p-6 shadow-md"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
