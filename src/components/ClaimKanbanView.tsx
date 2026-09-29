import React from 'react';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ClaimItem,
  ClaimStatus,
  STATUS_CONFIG,
  CLAIM_TYPE_LABELS,
} from '../types/claim';
import { formatCurrencyVND } from '../utils/formatters';

interface ClaimKanbanViewProps {
  claims: ClaimItem[];
  onSelectClaim: (claimId: string) => void;
  onUpdateStatus: (claimId: string, status: ClaimStatus) => void;
}

const KANBAN_COLUMNS: Array<{ id: ClaimStatus; title: string; color: string; border: string }> = [
  { id: 'intake', title: 'Tiếp nhận hồ sơ', color: 'bg-slate-100 text-slate-800', border: 'border-slate-300' },
  { id: 'pending_docs', title: 'Cần bổ sung chứng từ', color: 'bg-amber-100 text-amber-900', border: 'border-amber-300' },
  { id: 'underwriting', title: 'AIA Thẩm định', color: 'bg-blue-100 text-blue-900', border: 'border-blue-300' },
  { id: 'approved', title: 'Đã duyệt chi trả', color: 'bg-emerald-100 text-emerald-900', border: 'border-emerald-300' },
  { id: 'paid', title: 'Đã chuyển khoản', color: 'bg-teal-100 text-teal-900', border: 'border-teal-300' },
  { id: 'rejected', title: 'Từ chối chi trả', color: 'bg-rose-100 text-rose-900', border: 'border-rose-300' },
];

export const ClaimKanbanView: React.FC<ClaimKanbanViewProps> = ({
  claims,
  onSelectClaim,
  onUpdateStatus,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
      {KANBAN_COLUMNS.map((col) => {
        const columnClaims = claims.filter((c) => c.status === col.id);

        return (
          <div
            key={col.id}
            className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-3 flex flex-col min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_CONFIG[col.id].dotColor }}
                />
                <h3 className="text-xs font-bold text-slate-800 tracking-tight">
                  {col.title}
                </h3>
              </div>
              <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${col.color}`}>
                {columnClaims.length}
              </span>
            </div>

            {/* Cards List */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {columnClaims.length === 0 ? (
                <div className="p-4 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs my-4">
                  Không có hồ sơ
                </div>
              ) : (
                columnClaims.map((claim) => {
                  const verifiedDocs = claim.documents.filter((d) => d.status === 'verified').length;
                  const totalDocs = claim.documents.length;
                  const hasMissing = claim.documents.some((d) => d.status === 'missing' || d.status === 'invalid');

                  return (
                    <div
                      key={claim.id}
                      onClick={() => onSelectClaim(claim.id)}
                      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer group"
                    >
                      {/* Top: ID & Type */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-aia-red transition-colors">
                          {claim.id}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {CLAIM_TYPE_LABELS[claim.claimType]}
                        </span>
                      </div>

                      {/* Customer Name & Policy */}
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {claim.customerName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-numeric flex items-center gap-1 mt-0.5">
                        <span className="text-aia-red font-semibold">{claim.policyNumber}</span>
                        <span>•</span>
                        <span>{claim.relationship}</span>
                      </div>

                      {/* Hospital & Diagnosis */}
                      <div className="mt-2 text-[11px] text-slate-600 flex items-center gap-1 truncate" title={claim.hospitalName}>
                        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{claim.hospitalName}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5" title={claim.diagnosis}>
                        {claim.diagnosis}
                      </div>

                      {/* Amount */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-medium">Số tiền:</span>
                        <span className="text-xs font-bold font-numeric text-slate-900">
                          {formatCurrencyVND(claim.claimedAmount)}
                        </span>
                      </div>

                      {/* Approved amount if applicable */}
                      {claim.approvedAmount > 0 && (
                        <div className="flex items-center justify-between text-[11px] text-emerald-600 font-numeric font-bold">
                          <span>Duyệt:</span>
                          <span>{formatCurrencyVND(claim.approvedAmount)}</span>
                        </div>
                      )}

                      {/* Document Status pill */}
                      <div className="mt-2.5 flex items-center justify-between gap-1 text-[10px]">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full border ${
                            hasMissing
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}
                        >
                          {hasMissing ? (
                            <AlertCircle className="w-2.5 h-2.5 text-amber-600" />
                          ) : (
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          )}
                          <span>
                            {verifiedDocs}/{totalDocs} CT
                          </span>
                        </span>

                        {/* Move Status Dropdown */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0"
                        >
                          <select
                            value={claim.status}
                            onChange={(e) => onUpdateStatus(claim.id, e.target.value as ClaimStatus)}
                            className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded px-1 py-0.5 text-slate-600 cursor-pointer focus:outline-none"
                            title="Chuyển trạng thái"
                          >
                            <option value="intake">Tiếp nhận</option>
                            <option value="pending_docs">Cần bổ sung</option>
                            <option value="underwriting">Thẩm định</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="paid">Đã chi trả</option>
                            <option value="rejected">Từ chối</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
