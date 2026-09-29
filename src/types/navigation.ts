export type AppTab = 'customers' | 'claims' | 'care' | 'analytics';

export interface TabConfig {
  id: AppTab;
  label: string;
  shortLabel: string;
  badgeCount?: number;
  badgeColor?: string;
  description: string;
}
