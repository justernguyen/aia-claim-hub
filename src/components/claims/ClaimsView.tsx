import React from 'react';
import { ClaimItem, ClaimStatus, ClaimType } from '../../types/claim';
import { SortOption, ViewMode } from '../../hooks/useClaims';
import { FilterToolbar } from './FilterToolbar';
import { ClaimCardGrid } from './ClaimCardGrid';
import { ClaimDataTable } from './ClaimDataTable';

interface ClaimsViewProps {
  claims: ClaimItem[];
  selectedClaimId: string | null;
  onSelectClaim: (claimId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: ClaimStatus | 'all';
  onStatusFilterChange: (status: ClaimStatus | 'all') => void;
  typeFilter: ClaimType | 'all';
  onTypeFilterChange: (type: ClaimType | 'all') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCreateModal: () => void;
  onRefresh: () => void;
}

export const ClaimsView: React.FC<ClaimsViewProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
  onRefresh,
}) => {
  return (
    <div>
      {/* 1. Filter & Search Toolbar */}
      <FilterToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        typeFilter={typeFilter}
        onTypeFilterChange={onTypeFilterChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onOpenCreateModal={onOpenCreateModal}
        onRefresh={onRefresh}
      />

      {/* 2. Main Content: Dual View Switcher */}
      {viewMode === 'grid' ? (
        <ClaimCardGrid
          claims={claims}
          selectedClaimId={selectedClaimId}
          onSelectClaim={onSelectClaim}
        />
      ) : (
        <ClaimDataTable
          claims={claims}
          selectedClaimId={selectedClaimId}
          onSelectClaim={onSelectClaim}
        />
      )}
    </div>
  );
};
