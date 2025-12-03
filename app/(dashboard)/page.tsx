import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/common/AppHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { GoalProgressCard } from "@/components/dashboard/GoalProgressCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import {
  getWeeklyStats,
  getGoalsWithProgress,
  getRecentWorkouts,
} from "@/lib/supabase/dashboard-queries";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/signup");
  }

  const [weeklyStats, goalsWithProgress, recentWorkouts] = await Promise.all([
    getWeeklyStats(user.id),
    getGoalsWithProgress(user.id),
    getRecentWorkouts(user.id, 5),
  ]);

  const hasNoData = weeklyStats.workoutCount === 0 && goalsWithProgress.length === 0;

  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="p-4 space-y-6">
        {hasNoData ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <MaterialIcon icon="fitness_center" className="text-6xl text-primary-green mb-4" />
            <h2 className="text-2xl font-semibold text-graphite-900 mb-2">
              Welcome to FitTrack!
            </h2>
            <p className="text-graphite-700 mb-8">Let&apos;s get started on your fitness journey.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link href="/workouts/new" className="flex-1">
                <Button className="w-full bg-primary-green hover:bg-primary-green/90 text-white">
                  Log Your First Workout
                </Button>
              </Link>
              <Link href="/goals" className="flex-1">
                <Button variant="outline" className="w-full border-primary-green text-primary-green hover:bg-primary-green/10">
                  Set Your First Goal
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <section aria-labelledby="weekly-snapshot">
              <h2 id="weekly-snapshot" className="text-xl font-semibold text-graphite-900 mb-4">
                Weekly Snapshot
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  icon="fitness_center"
                  label="Workouts"
                  value={weeklyStats.workoutCount}
                  variant="highlighted"
                />
                <StatCard
                  icon="schedule"
                  label="Total Time"
                  value={weeklyStats.totalMinutes}
                  unit="min"
                />
                <StatCard
                  icon="local_fire_department"
                  label="Calories"
                  value={weeklyStats.estimatedCalories}
                  unit="cal"
                />
              </div>
            </section>

            {goalsWithProgress.length > 0 && (
              <section aria-labelledby="your-goals">
                <h2 id="your-goals" className="text-xl font-semibold text-graphite-900 mb-4">
                  Your Goals
                </h2>
                <div className="space-y-4">
                  {goalsWithProgress.map((goal) => (
                    <GoalProgressCard
                      key={goal.id}
                      goalTitle={goal.title}
                      progressPercentage={goal.progressPercentage}
                      targetValue={goal.target}
                      currentValue={goal.currentValue}
                      daysRemaining={goal.daysRemaining}
                    />
                  ))}
                </div>
              </section>
            )}

            {recentWorkouts.length > 0 ? (
              <section aria-labelledby="recent-activity">
                <h2 id="recent-activity" className="text-xl font-semibold text-graphite-900 mb-4">
                  Recent Workouts
                </h2>
                <div className="space-y-3">
                  {recentWorkouts.map((workout) => (
                    <Link key={workout.id} href={`/workouts/${workout.id}`}>
                      <RecentActivityCard
                        workoutType={workout.workout_type}
                        date={workout.workout_date}
                        duration={workout.duration_minutes}
                        title={`${workout.workout_type} Workout`}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              weeklyStats.workoutCount === 0 && (
                <section className="text-center py-8">
                  <p className="text-graphite-700 mb-4">No workouts yet</p>
                  <Link href="/workouts/new">
                    <Button className="bg-primary-green hover:bg-primary-green/90 text-white">
                      Log Your First Workout
                    </Button>
                  </Link>
                </section>
              )
            )}
          </>
        )}
      </div>
    </>
  );
}
