import React from 'react';
import { ClaimItem, ClaimStatus } from '../../types/claim';
import { ViewMode } from '../../hooks/useClaims';
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
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onOpenCreateModal: () => void;
}

export const ClaimsView: React.FC<ClaimsViewProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
  onOpenCreateModal,
}) => {
  return (
    <div>
      {/* 1. Filter & Search Toolbar */}
      <FilterToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onOpenCreateModal={onOpenCreateModal}
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
