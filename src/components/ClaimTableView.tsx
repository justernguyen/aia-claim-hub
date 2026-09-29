import React from 'react';
import {
  FileText,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Eye,
  Clock,
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
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <table className="w-full min-w-[980px] text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3 w-[125px] whitespace-nowrap">Mã / Ngày nộp</th>
              <th className="py-3 px-3 w-[165px] whitespace-nowrap">Khách hàng & HĐBH</th>
              <th className="py-3 px-3 w-[150px] whitespace-nowrap">Sản phẩm & Quyền lợi</th>
              <th className="py-3 px-3 min-w-[160px]">Bệnh viện & Chẩn đoán</th>
              <th className="py-3 px-3 w-[140px] text-right whitespace-nowrap">Số tiền / Duyệt</th>
              <th className="py-3 px-2 w-[110px] text-center whitespace-nowrap">Chứng từ</th>
              <th className="py-3 px-2 w-[125px] text-center whitespace-nowrap">Trạng thái</th>
              <th className="py-3 px-2 w-[100px] text-center whitespace-nowrap">Thao tác</th>
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
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-900 group-hover:text-aia-red transition-colors flex items-center gap-1 font-numeric">
                      <span className="whitespace-nowrap">{claim.id}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-numeric flex items-center gap-1 mt-0.5 whitespace-nowrap">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{formatDate(claim.intakeDate)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-900 text-sm whitespace-nowrap">{claim.customerName}</div>
                    <div className="text-[11px] text-slate-500 font-numeric flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
                      <span className="text-aia-red font-semibold whitespace-nowrap tracking-tight">{claim.policyNumber}</span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-block px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[11px] font-medium whitespace-nowrap">{claim.relationship}</span>
                    </div>
                    {claim.insuredPersonName !== claim.customerName && (
                      <div className="text-[11px] text-slate-500 font-normal whitespace-nowrap mt-0.5 bg-slate-100/70 px-1.5 py-0.2 rounded border border-slate-200/70 inline-block">
                        NĐBH: <strong className="text-slate-700 font-medium">{claim.insuredPersonName}</strong>
                      </div>
                    )}
                  </td>
                  {/* Sản phẩm & Quyền lợi */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-800 truncate max-w-[150px]" title={claim.productName}>
                      {claim.productName}
                    </div>
                    <span className="inline-block mt-0.5 text-[10.5px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 whitespace-nowrap">
                      {CLAIM_TYPE_LABELS[claim.claimType]}
                    </span>
                  </td>
                  {/* Bệnh viện & Chẩn đoán */}
                  <td className="py-3 px-3 max-w-[200px]">
                    <div className="font-semibold text-slate-900 text-xs flex items-center gap-1.5 truncate" title={claim.hospitalName}>
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{claim.hospitalName}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium truncate mt-0.5" title={claim.diagnosis}>
                      {claim.diagnosis}
                    </div>
                  </td>
                  {/* Số tiền Yêu cầu / Duyệt */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="font-semibold text-slate-900 text-sm font-numeric whitespace-nowrap">
                      {formatCurrencyVND(claim.claimedAmount)}
                    </div>
                    {claim.approvedAmount > 0 ? (
                      <div className="text-xs text-emerald-700 font-semibold font-numeric mt-0.5 whitespace-nowrap">
                        Duyệt: {formatCurrencyVND(claim.approvedAmount)}
                      </div>
                    ) : claim.status === 'rejected' ? (
                      <div className="text-[11px] text-rose-600 font-medium mt-0.5 whitespace-nowrap">
                        Từ chối chi trả
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5 whitespace-nowrap">
                        Đang thẩm định
                      </div>
                    )}
                  </td>

                  {/* Trạng thái chứng từ */}
                  <td className="py-3 px-2 text-center whitespace-nowrap">
                    {verifiedDocs === totalDocs && totalDocs > 0 ? (
                      <div className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap bg-emerald-50 text-emerald-800 border-emerald-200 shadow-2xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="whitespace-nowrap">{verifiedDocs}/{totalDocs} hợp lệ</span>
                      </div>
                    ) : hasMissing ? (
                      <div className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap bg-amber-50 text-amber-800 border-amber-200 shadow-2xs">
                        <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="whitespace-nowrap">{verifiedDocs}/{totalDocs} hợp lệ</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap bg-blue-50 text-blue-800 border-blue-200 shadow-2xs">
                        <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="whitespace-nowrap">{verifiedDocs}/{totalDocs} đã nộp</span>
                      </div>
                    )}
                  </td>
                  {/* Trạng thái xử lý */}
                  <td className="py-3 px-2 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap shadow-2xs shrink-0 ${statusCfg.badgeClass}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: statusCfg.dotColor }}
                      />
                      <span className="whitespace-nowrap">{statusCfg.label}</span>
                    </span>
                  </td>

                  {/* Nút hành động */}
                  <td
                    className="py-3 px-2 text-center whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectClaim(claim.id)}
                        className="p-1.5 text-slate-500 hover:text-aia-red hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                        title="Xem chi tiết hồ sơ"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <select
                        value={claim.status}
                        onChange={(e) => onUpdateStatus(claim.id, e.target.value as ClaimStatus)}
                        className="text-[10.5px] font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-1 py-0.5 text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-aia-red whitespace-nowrap"
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
      <div className="bg-slate-50/80 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Hiển thị <strong>{claims.length}</strong> hồ sơ bồi thường</span>
        <span className="text-[11px] text-slate-500">
          Nhấp vào bất kỳ dòng nào để xem chi tiết hồ sơ bồi thường
        </span>
      </div>
    </div>
  );
};
