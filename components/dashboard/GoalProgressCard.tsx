import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { MaterialIcon } from '@/components/ui/MaterialIcon'

export interface GoalProgressCardProps {
  goalTitle: string
  progressPercentage: number
  targetValue: string
  currentValue: string
  daysRemaining?: number
}

export function GoalProgressCard({
  goalTitle,
  progressPercentage,
  targetValue,
  currentValue,
  daysRemaining
}: GoalProgressCardProps) {
  const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100)

  return (
    <Card className="bg-white border-graphite-100">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <MaterialIcon icon="flag" className="text-primary-green text-xl" />
          <CardTitle className="text-base font-semibold text-graphite-900">
            {goalTitle}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-semibold text-graphite-900">
              {clampedProgress}%
            </span>
            {daysRemaining !== undefined && (
              <span className="text-sm text-graphite-700">
                {daysRemaining} days remaining
              </span>
            )}
          </div>
          <Progress value={clampedProgress} className="h-2 bg-graphite-100" />
        </div>
        <div className="flex justify-between text-sm text-graphite-700">
          <span>{currentValue}</span>
          <span>{targetValue}</span>
        </div>
      </CardContent>
    </Card>
  )
}
