'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import type { Workout } from '@/lib/types/workout'

async function fetchWorkouts(): Promise<Workout[]> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('Not authenticated')
  }
  
  // Fetch workouts for this user
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', user.id)
    .order('workout_date', { ascending: false })
  
  if (error) {
    console.error('Error fetching workouts:', error)
    throw new Error('Failed to fetch workouts')
  }
  
  return data || []
}

export function useWorkouts() {
  return useQuery({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    staleTime: 30000, // 30 seconds
  })
}
