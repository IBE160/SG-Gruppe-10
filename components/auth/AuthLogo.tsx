import { MaterialIcon } from '@/components/ui/MaterialIcon';

export function AuthLogo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center shadow-lg mb-4">
        <MaterialIcon icon="fitness_center" className="text-white text-4xl" filled />
      </div>
      <h1 className="text-3xl font-bold text-graphite-900">FitTrack</h1>
      <p className="text-sm text-graphite-700">Track Your Fitness Journey</p>
    </div>
  );
}
