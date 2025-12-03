import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-6">
      <section>
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-xl p-6 space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-7 w-40 mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
