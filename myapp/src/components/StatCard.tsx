import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isIncr: boolean;
  };
  icon: ReactNode;
  iconBgColor: string;
  trendLabel?: string;
}

export function StatCard({ title, value, trend, icon, iconBgColor, trendLabel }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight mb-2">{value}</h3>
          
          {trend ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className={trend.isIncr ? "text-emerald-600" : "text-amber-600"}>
                {trend.isIncr ? '↑' : '='} {trend.value}
              </span>
              <span className="text-gray-400 font-normal">{trendLabel || 'change'}</span>
            </div>
          ) : (
            <div className="h-4"></div> 
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${iconBgColor} text-white shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
