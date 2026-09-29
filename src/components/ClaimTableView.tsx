import React from 'react';
import {
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import {
  ClaimItem,
  ClaimStatus,
  STATUS_CONFIG,
  CLAIM_TYPE_LABELS,
} from '../types/claim';
import { formatCurrencyVND, formatDate } from '../utils/formatters';

interface ClaimTableViewProps {
  claims: ClaimItem[];
  onSelectClaim: (claimId: string) => void;
  onUpdateStatus: (claimId: string, status: ClaimStatus) => void;
}

export const ClaimTableView: React.FC<ClaimTableViewProps> = ({
  claims,
  onSelectClaim,
  onUpdateStatus,
}) => {
  if (claims.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">Không tìm thấy hồ sơ phù hợp</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc trạng thái và loại quyền lợi.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3.5 px-4">Mã Claim / Ngày nộp</th>
              <th className="py-3.5 px-4">Khách hàng & HĐBH</th>
              <th className="py-3.5 px-4">Sản phẩm & Quyền lợi</th>
              <th className="py-3.5 px-4">Bệnh viện & Chẩn đoán</th>
              <th className="py-3.5 px-4 text-right">Số tiền yêu cầu / Duyệt</th>
              <th className="py-3.5 px-4 text-center">Chứng từ</th>
              <th className="py-3.5 px-4 text-center">Trạng thái</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {claims.map((claim) => {
              const statusCfg = STATUS_CONFIG[claim.status];
              const verifiedDocs = claim.documents.filter((d) => d.status === 'verified').length;
              const totalDocs = claim.documents.length;
              const hasMissing = claim.documents.some((d) => d.status === 'missing' || d.status === 'invalid');

              return (
                <tr
                  key={claim.id}
                  onClick={() => onSelectClaim(claim.id)}
                  className="hover:bg-rose-50/30 transition-colors cursor-pointer group"
                >
                  {/* Mã Claim & Ngày nộp */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 group-hover:text-aia-red transition-colors flex items-center gap-1.5">
                      <span>{claim.id}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(claim.intakeDate)}</span>
                    </div>
                  </td>

                  {/* Khách hàng & Số HĐ */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{claim.customerName}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                      <span className="text-aia-red font-semibold">{claim.policyNumber}</span>
                      <span>•</span>
                      <span>{claim.relationship}</span>
                    </div>
                    {claim.insuredPersonName !== claim.customerName && (
                      <div className="text-[10px] text-slate-400 italic">
                        NĐBH: {claim.insuredPersonName}
                      </div>
                    )}
                  </td>

                  {/* Sản phẩm & Quyền lợi */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 truncate max-w-[180px]" title={claim.productName}>
                      {claim.productName}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      {CLAIM_TYPE_LABELS[claim.claimType]}
                    </span>
                  </td>

                  {/* Bệnh viện & Chẩn đoán */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-900 flex items-center gap-1 truncate max-w-[220px]" title={claim.hospitalName}>
                      <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{claim.hospitalName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[220px] mt-0.5" title={claim.diagnosis}>
                      {claim.diagnosis}
                    </div>
                  </td>

                  {/* Số tiền Yêu cầu / Duyệt */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-bold text-slate-900 font-mono">
                      {formatCurrencyVND(claim.claimedAmount)}
                    </div>
                    {claim.approvedAmount > 0 ? (
                      <div className="text-[11px] text-emerald-600 font-semibold font-mono mt-0.5">
                        Duyệt: {formatCurrencyVND(claim.approvedAmount)}
                      </div>
                    ) : claim.status === 'rejected' ? (
                      <div className="text-[11px] text-rose-600 font-semibold mt-0.5">
                        Từ chối chi trả
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Đang thẩm định
                      </div>
                    )}
                  </td>

                  {/* Trạng thái chứng từ */}
                  <td className="py-3.5 px-4 text-center">
                    <div
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        hasMissing
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {hasMissing ? (
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      )}
                      <span>
                        {verifiedDocs}/{totalDocs} hợp lệ
                      </span>
                    </div>
                  </td>

                  {/* Trạng thái xử lý */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusCfg.badgeClass}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: statusCfg.dotColor }}
                      />
                      <span>{statusCfg.label}</span>
                    </span>
                  </td>

                  {/* Nút hành động */}
                  <td
                    className="py-3.5 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => onSelectClaim(claim.id)}
                        className="p-1.5 text-slate-500 hover:text-aia-red hover:bg-rose-50 rounded-lg transition-colors"
                        title="Xem chi tiết hồ sơ"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <select
                        value={claim.status}
                        onChange={(e) => onUpdateStatus(claim.id, e.target.value as ClaimStatus)}
                        className="text-[11px] font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-1.5 py-1 text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-aia-red"
                        title="Chuyển trạng thái nhanh"
                      >
                        <option value="intake">Tiếp nhận</option>
                        <option value="pending_docs">Cần bổ sung</option>
                        <option value="underwriting">Thẩm định</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="paid">Đã chi trả</option>
                        <option value="rejected">Từ chối</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>Hiển thị <strong>{claims.length}</strong> hồ sơ bồi thường</span>
        <span className="text-[11px]">Nhấp vào bất kỳ dòng nào để mở hồ sơ chi tiết</span>
      </div>
    </div>
  );
};
