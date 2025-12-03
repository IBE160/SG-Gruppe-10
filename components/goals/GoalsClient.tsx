'use client'

import { useState } from 'react'
import { useGoals } from '@/hooks/useGoals'
import { GoalCard } from '@/components/goals/GoalCard'
import { GoalForm } from '@/components/goals/GoalForm'
import { AchievementBadge } from '@/components/goals/AchievementBadge'
import { FloatingActionButton } from '@/components/ui/FloatingActionButton'
import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AppHeader } from '@/components/common/AppHeader'
import type { Goal } from '@/lib/types/goal'

// Sample achievements (client-side logic for now)
const sampleAchievements = [
  { id: '1', title: 'First Goal', icon: 'flag', earned: false },
  { id: '2', title: 'Week Warrior', icon: 'fitness_center', earned: false },
  { id: '3', title: 'Goal Crusher', icon: 'emoji_events', earned: false },
  { id: '4', title: 'Consistent', icon: 'star', earned: false },
  { id: '5', title: 'Marathon', icon: 'directions_run', earned: false },
  { id: '6', title: 'Dedication', icon: 'workspace_premium', earned: false },
  { id: '7', title: 'Strength', icon: 'sports_gymnastics', earned: false },
  { id: '8', title: 'Endurance', icon: 'timer', earned: false },
]

function calculateAchievements(goals: Goal[]) {
  return sampleAchievements.map(achievement => {
    if (achievement.id === '1' && goals.length > 0) {
      return { ...achievement, earned: true }
    }
    return achievement
  })
}

export function GoalsClient() {
  const [showForm, setShowForm] = useState(false)
  const { data: goals, isLoading, isError, error } = useGoals()
  
  const achievements = calculateAchievements(goals || [])
  
  const handleSuccess = () => {
    setShowForm(false)
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-graphite-50">
        <AppHeader title="Goals" />
        <main className="max-w-3xl mx-auto px-4 py-6 pb-32">
          <div className="space-y-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }
  
  if (isError) {
    return (
      <div className="min-h-screen bg-graphite-50">
        <AppHeader title="Goals" />
        <main className="max-w-3xl mx-auto px-4 py-6 pb-32">
          <div className="text-center py-12">
            <MaterialIcon icon="error" className="text-6xl text-graphite-300 mb-4" />
            <p className="text-red-600 mb-4">
              {error instanceof Error ? error.message : 'Failed to load goals'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </main>
      </div>
    )
  }
  
  const hasGoals = goals && goals.length > 0
  
  return (
    <div className="min-h-screen bg-graphite-50">
      <AppHeader title="Goals" />
      
      <main className="max-w-3xl mx-auto px-4 py-6 pb-32">
        {/* Goal Form (inline when showForm = true) */}
        {showForm && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <GoalForm 
                onSuccess={handleSuccess}
                onCancel={() => setShowForm(false)}
              />
            </CardContent>
          </Card>
        )}
        
        {/* Goals Section */}
        <section className="mb-8">
          {!hasGoals ? (
            <div className="text-center py-12">
              <MaterialIcon icon="emoji_events" className="text-6xl text-graphite-300 mb-4" />
              <h2 className="text-xl font-semibold text-graphite-900 mb-2">
                No goals yet. Set your first fitness goal!
              </h2>
              <p className="text-sm text-graphite-600 mb-6">
                Track your progress and stay motivated
              </p>
              <Button 
                size="lg"
                onClick={() => setShowForm(true)}
                className="bg-primary-green hover:bg-primary-green/90"
              >
                Create Your First Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {goals.map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal}
                  progress={Math.floor(Math.random() * 100)}
                  daysRemaining={Math.floor(Math.random() * 30)}
                />
              ))}
            </div>
          )}
        </section>
        
        {/* Achievements Section */}
        <section>
          <h2 className="text-2xl font-bold text-graphite-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>
      </main>
      
      <FloatingActionButton 
        onClick={() => setShowForm(true)}
        ariaLabel="Add new goal"
      />
    </div>
  )
}
