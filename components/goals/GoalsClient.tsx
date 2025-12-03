'use client'

import { useState } from 'react'
import { useGoals } from '@/hooks/useGoals'
import { GoalsList } from '@/components/goals/GoalsList'
import { GoalForm } from '@/components/goals/GoalForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function GoalsClient() {
  const [showForm, setShowForm] = useState(false)
  const { data: goals, isLoading, isError, error } = useGoals()
  
  const handleSuccess = () => {
    setShowForm(false)
  }
  
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Goals</h1>
          <Button disabled>Create Goal</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
  if (isError) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold">Goals</h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load goals'}
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Goals</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Goal'}
        </Button>
      </div>
      
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
      
      <GoalsList goals={goals || []} />
    </div>
  )
}
