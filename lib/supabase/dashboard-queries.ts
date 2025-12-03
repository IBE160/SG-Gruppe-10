import { createClient } from './server'
import type { Workout } from '@/lib/types/workout'
import type { Goal } from '@/lib/types/goal'

export interface WeeklyStats {
  workoutCount: number
  totalMinutes: number
  estimatedCalories: number
}

export interface GoalWithProgress extends Goal {
  progressPercentage: number
  currentValue: string
  daysRemaining?: number
}

export async function getWeeklyStats(userId: string): Promise<WeeklyStats> {
  try {
    const supabase = await createClient()
    
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0]
    
    const { data: workouts, error } = await supabase
      .from('workouts')
      .select('duration_minutes')
      .eq('user_id', userId)
      .gte('workout_date', sevenDaysAgoStr)
    
    if (error) {
      console.error('Error fetching weekly stats:', error)
      return { workoutCount: 0, totalMinutes: 0, estimatedCalories: 0 }
    }
    
    const workoutCount = workouts?.length || 0
    const totalMinutes = workouts?.reduce((sum, w) => sum + (w.duration_minutes || 0), 0) || 0
    const estimatedCalories = totalMinutes * 7
    
    return { workoutCount, totalMinutes, estimatedCalories }
  } catch (error) {
    console.error('Error in getWeeklyStats:', error)
    return { workoutCount: 0, totalMinutes: 0, estimatedCalories: 0 }
  }
}

export async function getGoalsWithProgress(userId: string): Promise<GoalWithProgress[]> {
  try {
    const supabase = await createClient()
    
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching goals:', error)
      return []
    }
    
    const { data: workouts } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
    
    const workoutCount = workouts?.length || 0
    
    return (goals || []).map(goal => {
      const targetMatch = goal.target.match(/\d+/)
      const targetNumber = targetMatch ? parseInt(targetMatch[0], 10) : 10
      
      const progressPercentage = targetNumber > 0 
        ? Math.min(Math.round((workoutCount / targetNumber) * 100), 100)
        : 0
      
      const createdDate = new Date(goal.created_at)
      const now = new Date()
      const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24))
      const daysRemaining = Math.max(30 - daysSinceCreated, 0)
      
      return {
        ...goal,
        progressPercentage,
        currentValue: `${workoutCount} workouts`,
        daysRemaining: daysRemaining > 0 ? daysRemaining : undefined
      }
    })
  } catch (error) {
    console.error('Error in getGoalsWithProgress:', error)
    return []
  }
}

export async function getRecentWorkouts(userId: string, limit: number = 5): Promise<Workout[]> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('workout_date', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching recent workouts:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getRecentWorkouts:', error)
    return []
  }
}
