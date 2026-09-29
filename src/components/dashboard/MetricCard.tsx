import React from 'react';

interface MetricCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  valueColorClass?: string;
  isHighlighted?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  subtext,
  valueColorClass = 'text-slate-900',
  isHighlighted = false,
}) => {
  return (
    <div
      className={`bg-white rounded-lg p-5 transition-all text-center flex flex-col justify-center items-center ${
        isHighlighted
          ? 'border-2 border-rose-500 shadow-xs'
          : 'border border-slate-200'
      }`}
    >
      <div className={`text-3xl sm:text-4xl font-bold tracking-tight tabular-nums ${valueColorClass}`}>
        {value}
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1.5">{label}</div>
      {subtext && (
        <div className="text-[11px] text-slate-400 mt-0.5 tracking-tight font-normal">
          {subtext}
        </div>
      )}
    </div>
  );
};
