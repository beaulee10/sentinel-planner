import { CalendarDays } from 'lucide-react';

export function DateWidget() {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const year = today.getFullYear();

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 h-full flex flex-col justify-between">
      <CalendarDays className="w-8 h-8 text-white/80" />
      
      <div>
        <p className="text-white/80 text-sm mb-2">{dayName}</p>
        <h2 className="text-3xl font-semibold mb-1">{monthDay}</h2>
        <p className="text-white/80 text-lg">{year}</p>
      </div>
    </div>
  );
}
