import React from 'react';
import { FileText, Users, Calendar, FileEdit, BarChart3 } from 'lucide-react';

export type TabId = 'contracts' | 'customer' | 'events' | 'claims' | 'analytics';

interface NavigationTabsProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
  claimCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab = 'claims',
  onTabChange,
  claimCount = 41,
}) => {
  const tabs = [
    { id: 'contracts' as TabId, label: 'Hợp đồng', icon: FileText },
    { id: 'customer' as TabId, label: 'Khách hàng', icon: Users },
    { id: 'events' as TabId, label: 'Sự kiện', icon: Calendar },
    { id: 'claims' as TabId, label: 'Lịch sử claim', icon: FileEdit, badge: claimCount },
    { id: 'analytics' as TabId, label: 'Thống kê', icon: BarChart3 },
  ];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange && onTabChange(tab.id)}
                className={`group inline-flex items-center py-3.5 px-1 border-b-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-rose-600 text-rose-700 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon
                  className={`w-4 h-4 mr-2 transition-colors ${
                    isActive ? 'text-rose-600' : 'text-slate-400 group-hover:text-slate-500'
                  }`}
                />
                <span>{tab.label}</span>

                {tab.badge !== undefined && (
                  <span
                    className={`ml-2 py-0.5 px-2 rounded-full text-xs font-semibold tabular-nums ${
                      isActive
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
