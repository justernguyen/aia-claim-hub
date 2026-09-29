import React from 'react';
import { MetricCard } from './MetricCard';
import { formatShortCurrency } from '../../utils/formatters';

interface MetricStripProps {
  stats: {
    totalCases: number;
    totalClaimed: number;
    totalApproved: number;
    approvalRate: number;
    actionRequiredCount: number;
    pendingCount: number;
  };
}

export const MetricStrip: React.FC<MetricStripProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
      {/* 1. Tổng số case */}
      <MetricCard
        value={stats.totalCases}
        label="Tổng số case"
        subtext={`${stats.pendingCount} case đang xử lý`}
        valueColorClass="text-slate-900"
      />

      {/* 2. Tổng tiền yêu cầu (Đóng khung viền đỏ nổi bật như ảnh mẫu) */}
      <MetricCard
        value={formatShortCurrency(stats.totalClaimed)}
        label="Tổng tiền yêu cầu"
        subtext="Toàn bộ hồ sơ nộp lên hãng"
        valueColorClass="text-amber-600"
        isHighlighted={true}
      />

      {/* 3. Tổng tiền chi trả */}
      <MetricCard
        value={formatShortCurrency(stats.totalApproved)}
        label="Tổng tiền chi trả"
        subtext="Tiền đã về tài khoản khách"
        valueColorClass="text-emerald-600"
      />
    </div>
  );
};
