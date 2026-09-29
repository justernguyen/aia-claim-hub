import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Search,
  Plus,
  Trash2,
  PhoneCall,
  Users,
  MessageSquare,
  Coffee,
  Gift,
  HeartPulse,
  Filter,
} from 'lucide-react';
import { CareActivity, CareChannel, CARE_CHANNEL_CONFIG } from '../types/crm';

interface CareScheduleSheetProps {
  activities: CareActivity[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onSelectCustomer?: (customerId: string) => void;
  onOpenNew: () => void;
}

export const CareScheduleSheet: React.FC<CareScheduleSheetProps> = ({
  activities,
  onToggleStatus,
  onDelete,
  onSelectCustomer,
  onOpenNew,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'planned' | 'completed'>('all');
  const [channelFilter, setChannelFilter] = useState<CareChannel | 'all'>('all');

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          act.customerName.toLowerCase().includes(q) ||
          act.title.toLowerCase().includes(q) ||
          act.content.toLowerCase().includes(q) ||
          (act.result && act.result.toLowerCase().includes(q)) ||
          (act.nextAction && act.nextAction.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // 2. Status filter
      if (statusFilter !== 'all' && act.status !== statusFilter) return false;

      // 3. Channel filter
      if (channelFilter !== 'all' && act.channel !== channelFilter) return false;

      return true;
    });
  }, [activities, searchQuery, statusFilter, channelFilter]);

  const getChannelIcon = (channel: CareChannel) => {
    switch (channel) {
      case 'meeting':
        return <Users className="w-3.5 h-3.5" />;
      case 'call':
        return <PhoneCall className="w-3.5 h-3.5" />;
      case 'zalo':
        return <MessageSquare className="w-3.5 h-3.5" />;
      case 'coffee':
        return <Coffee className="w-3.5 h-3.5" />;
      case 'gift':
        return <Gift className="w-3.5 h-3.5" />;
      case 'hospital_visit':
        return <HeartPulse className="w-3.5 h-3.5" />;
      default:
        return <Users className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 sm:p-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo Khách hàng, nội dung trao đổi, việc cần làm (next action)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-aia-red focus:bg-white transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'all' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Tất cả ({activities.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('planned')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'planned' ? 'bg-white shadow-xs text-amber-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Cần làm ({activities.filter((a) => a.status === 'planned').length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                statusFilter === 'completed' ? 'bg-white shadow-xs text-emerald-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Đã xong ({activities.filter((a) => a.status === 'completed').length})
            </button>
          </div>

          {/* Channel Filter */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-xl text-xs font-semibold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as CareChannel | 'all')}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả kênh</option>
              <option value="call">📞 Điện thoại</option>
              <option value="zalo">💬 Zalo</option>
              <option value="meeting">🤝 Gặp trực tiếp</option>
              <option value="coffee">☕ Cafe trao đổi</option>
              <option value="gift">🎁 Tặng quà</option>
              <option value="hospital_visit">🏥 Thăm viện</option>
            </select>
          </div>
          <button
            type="button"
            onClick={onOpenNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-aia-red hover:bg-aia-red-dark text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm tương tác</span>
          </button>
        </div>
      </div>

      {/* Spreadsheet Grid Table */}
      <div className="overflow-x-auto border-t border-slate-200">
        <table className="w-full min-w-[960px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-2 w-11 text-center whitespace-nowrap">Xong</th>
              <th className="py-3 px-2.5 w-24 whitespace-nowrap">Ngày</th>
              <th className="py-3 px-3 min-w-[135px] whitespace-nowrap">Khách hàng</th>
              <th className="py-3 px-2.5 min-w-[105px] whitespace-nowrap">Kênh</th>
              <th className="py-3 px-3 min-w-[200px]">Nội dung trao đổi / Tư vấn</th>
              <th className="py-3 px-3 min-w-[150px]">Kết quả</th>
              <th className="py-3 px-3 min-w-[160px]">Việc tiếp theo (Next Action)</th>
              <th className="py-3 px-2.5 w-24 whitespace-nowrap">Hẹn tiếp</th>
              <th className="py-3 px-2 w-10 text-center whitespace-nowrap">Xóa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  Không tìm thấy ghi chú chăm sóc nào phù hợp.
                </td>
              </tr>
            ) : (
              filteredActivities.map((act) => {
                const isCompleted = act.status === 'completed';
                return (
                  <tr
                    key={act.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isCompleted ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    {/* Toggle Done Button */}
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleStatus(act.id)}
                        className={`transition-colors cursor-pointer p-1 rounded-md ${
                          isCompleted
                            ? 'text-emerald-600 hover:text-slate-400'
                            : 'text-slate-300 hover:text-emerald-600'
                        }`}
                        title={isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu đã hoàn thành'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                    </td>

                    {/* Ngày */}
                    <td className="py-3 px-2.5 font-mono text-slate-500 whitespace-nowrap">
                      {act.date}
                    </td>

                    {/* Khách hàng */}
                    <td className="py-3 px-3">
                      <div
                        onClick={() => onSelectCustomer?.(act.customerId)}
                        className="font-bold text-slate-900 hover:text-aia-red cursor-pointer transition-colors"
                      >
                        {act.customerName}
                      </div>
                      {act.policyId && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          {act.policyId}
                        </div>
                      )}
                    </td>

                    {/* Kênh */}
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.8 rounded-md text-[10px] font-semibold border ${
                          CARE_CHANNEL_CONFIG[act.channel]?.badgeClass
                        }`}
                      >
                        {getChannelIcon(act.channel)}
                        <span>{CARE_CHANNEL_CONFIG[act.channel]?.label}</span>
                      </span>
                    </td>

                    {/* Tiêu đề & Nội dung */}
                    <td className="py-3 px-3">
                      <div className={`font-semibold ${isCompleted ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {act.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                        {act.content}
                      </div>
                    </td>

                    {/* Kết quả */}
                    <td className="py-3 px-3 text-slate-600 text-[11px]">
                      {act.result || <span className="text-slate-300 italic">Chưa có kết quả</span>}
                    </td>

                    {/* Việc cần làm tiếp theo */}
                    <td className="py-3 px-3">
                      {act.nextAction ? (
                        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-1 rounded-lg text-[11px] font-semibold">
                          {act.nextAction}
                        </div>
                      ) : (
                        <span className="text-slate-300 text-[11px] italic">Không có việc cần làm</span>
                      )}
                    </td>

                    {/* Ngày hẹn tiếp theo */}
                    <td className="py-3 px-2.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {act.nextFollowUpDate || '-'}
                    </td>
                    {/* Nút xóa */}
                    <td className="py-3 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Xác nhận xóa ghi chú tương tác này?`)) {
                            onDelete(act.id);
                          }
                        }}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        title="Xóa dòng này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
