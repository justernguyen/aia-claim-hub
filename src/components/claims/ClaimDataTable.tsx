import React from 'react';
import { ClaimItem, STATUS_CONFIG, CLAIM_TYPE_LABELS } from '../../types/claim';
import { formatCurrencyVND, formatDate } from '../../utils/formatters';
import { ChevronRight, FileSearch } from 'lucide-react';

interface ClaimDataTableProps {
  claims: ClaimItem[];
  selectedClaimId: string | null;
  onSelectClaim: (claimId: string) => void;
}

export const ClaimDataTable: React.FC<ClaimDataTableProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
}) => {
  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center my-6">
        <FileSearch className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">Không có dữ liệu</h3>
        <p className="text-xs text-slate-500 mt-1">Không tìm thấy hồ sơ nào khớp với bộ lọc.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs my-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50/75 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="py-3 px-4">Mã hồ sơ</th>
              <th scope="col" className="py-3 px-4">Ngày khám</th>
              <th scope="col" className="py-3 px-4">Người ĐCBH</th>
              <th scope="col" className="py-3 px-4">Quyền lợi</th>
              <th scope="col" className="py-3 px-4">Cơ sở y tế</th>
              <th scope="col" className="py-3 px-4 text-right">Tiền yêu cầu</th>
              <th scope="col" className="py-3 px-4 text-right">Tiền chi trả</th>
              <th scope="col" className="py-3 px-4 text-center">Trạng thái</th>
              <th scope="col" className="py-3 px-3 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {claims.map((claim) => {
              const statusMeta = STATUS_CONFIG[claim.status] || STATUS_CONFIG.intake;
              const benefitLabel = CLAIM_TYPE_LABELS[claim.claimType] || claim.claimType;
              const isSelected = selectedClaimId === claim.id;

              return (
                <tr
                  key={claim.id}
                  onClick={() => onSelectClaim(claim.id)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-rose-50/20' : ''
                  }`}
                >
                  {/* Mã Claim */}
                  <td className="py-3 px-4 font-number font-semibold text-slate-800 whitespace-nowrap">
                    {claim.id}
                  </td>

                  {/* Ngày khám */}
                  <td className="py-3 px-4 text-slate-600 font-number whitespace-nowrap">
                    {formatDate(claim.admissionDate)}
                  </td>

                  {/* Người ĐCBH & HĐ */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      {claim.insuredPersonName || claim.customerName}
                    </div>
                    <div className="font-number text-[11px] text-slate-400">
                      HĐ: {claim.policyNumber}
                    </div>
                  </td>

                  {/* Quyền lợi */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-700">{benefitLabel}</span>
                  </td>

                  {/* Cơ sở y tế */}
                  <td className="py-3 px-4 text-slate-600 max-w-[200px] truncate" title={claim.hospitalName}>
                    {claim.hospitalName}
                  </td>

                  {/* Tiền yêu cầu */}
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-number text-[13px] whitespace-nowrap">
                    {formatCurrencyVND(claim.claimedAmount)}
                  </td>

                  {/* Tiền chi trả */}
                  <td className="py-3 px-4 text-right font-bold font-number text-[13px] whitespace-nowrap">
                    {claim.approvedAmount > 0 ? (
                       <span className="text-emerald-700">{formatCurrencyVND(claim.approvedAmount)}</span>
                     ) : (
                       <span className="text-slate-300">--</span>
                     )}
                   </td>

                  {/* Trạng thái */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${statusMeta.badgeClass}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-1.5"
                        style={{ backgroundColor: statusMeta.dotColor }}
                      />
                      <span>{statusMeta.label}</span>
                    </span>
                  </td>

                  {/* Action link */}
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
