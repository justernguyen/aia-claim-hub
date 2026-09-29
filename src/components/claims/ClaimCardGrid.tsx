import React from 'react';
import { ClaimItem } from '../../types/claim';
import { ClaimCard } from './ClaimCard';
import { FileSearch } from 'lucide-react';

interface ClaimCardGridProps {
  claims: ClaimItem[];
  selectedClaimId: string | null;
  onSelectClaim: (claimId: string) => void;
}

export const ClaimCardGrid: React.FC<ClaimCardGridProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
}) => {
  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center my-6">
        <FileSearch className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">Không tìm thấy hồ sơ phù hợp</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Vui lòng thử điều chỉnh lại từ khóa tìm kiếm hoặc các bộ lọc trạng thái và loại quyền lợi.
        </p>
      </div>
    );
  }

  return (
    <div className="my-4">
      {/* Section Subheader */}
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 px-1">
        <span>Hiển thị {claims.length} hồ sơ bồi thường</span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {claims.map((claim) => (
          <ClaimCard
            key={claim.id}
            claim={claim}
            isSelected={selectedClaimId === claim.id}
            onClick={() => onSelectClaim(claim.id)}
          />
        ))}
      </div>
    </div>
  );
};
