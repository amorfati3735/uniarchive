import React from 'react';

interface Props {
  data?: number[];
}

export const ContributionGrid: React.FC<Props> = ({ data = [] }) => {
  // Generate 52 weeks x 7 days grid
  // Using dummy data if not provided, or mapping 0-4 intensity
  const weeks = 52;
  const days = 7;
  
  const getIntensityClass = (level: number) => {
    switch(level) {
      case 0: return 'bg-uni-border/30';
      case 1: return 'bg-uni-neon/20';
      case 2: return 'bg-uni-neon/40';
      case 3: return 'bg-uni-neon/70';
      case 4: return 'bg-uni-neon';
      default: return 'bg-uni-border/30';
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, dayIndex) => {
              const dataIndex = weekIndex * 7 + dayIndex;
              const intensity = data[dataIndex] || 0;
              return (
                <div 
                  key={dayIndex} 
                  className={`w-2.5 h-2.5 rounded-[1px] ${getIntensityClass(intensity)} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
                  title={`Activity Level: ${intensity}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-uni-muted justify-end">
        <span>Less</span>
        <div className="flex gap-1">
           <div className="w-2.5 h-2.5 bg-uni-border/30 rounded-[1px]"></div>
           <div className="w-2.5 h-2.5 bg-uni-neon/20 rounded-[1px]"></div>
           <div className="w-2.5 h-2.5 bg-uni-neon/40 rounded-[1px]"></div>
           <div className="w-2.5 h-2.5 bg-uni-neon/70 rounded-[1px]"></div>
           <div className="w-2.5 h-2.5 bg-uni-neon rounded-[1px]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
