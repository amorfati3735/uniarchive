import React from 'react';
import { CourseStats } from '../types';

interface Props {
  stats: CourseStats;
}

export const Heatmap: React.FC<Props> = ({ stats }) => {
  return (
    <div className="p-5 bg-uni-panel border border-uni-border h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-uni-neon opacity-20" />
      
      <div className="flex justify-between items-end mb-5">
        <div>
           <h3 className="text-base font-display font-bold text-white uppercase tracking-wide">
             {stats.courseCode}
           </h3>
           <span className="text-xs text-uni-neon font-mono mt-0.5 block opacity-70">TOPIC MATRIX</span>
        </div>
        <div className="font-mono text-[10px] text-right text-uni-muted">
          RESOURCES<br/>
          <span className="text-lg text-white font-bold">{stats.totalResources}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {stats.topicCoverage.map((item, idx) => (
          <div key={idx} className="group cursor-default">
            <div className="flex justify-between text-xs font-mono text-uni-muted mb-1.5">
              <span>{item.topic}</span>
              <span className="group-hover:text-uni-neon transition-colors">{item.coverage}%</span>
            </div>
            <div className="h-2 bg-uni-black w-full overflow-hidden border border-uni-border relative">
               {/* Pattern Background */}
              <div 
                className="absolute inset-0 opacity-20" 
                style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '2px 2px'}} 
              />
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  item.coverage > 80 ? 'bg-uni-neon' : 
                  item.coverage > 50 ? 'bg-uni-cyan' : 'bg-uni-alert'
                }`}
                style={{ width: `${item.coverage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
