import React, { useState, useRef } from 'react';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  GripVertical,
  ArrowDownCircle,
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
  { id: 'intake', title: 'Tiếp nhận hồ sơ', color: 'bg-slate-100 text-slate-700', border: 'border-slate-300' },
  { id: 'pending_docs', title: 'Cần bổ sung chứng từ', color: 'bg-amber-50 text-amber-800 border border-amber-200/60', border: 'border-amber-300' },
  { id: 'underwriting', title: 'AIA Thẩm định', color: 'bg-rose-50 text-aia-red border border-rose-200/60', border: 'border-rose-300' },
  { id: 'approved', title: 'Đã duyệt chi trả', color: 'bg-emerald-50 text-emerald-800 border border-emerald-200/60', border: 'border-emerald-300' },
  { id: 'paid', title: 'Đã chuyển khoản', color: 'bg-slate-100 text-slate-700', border: 'border-slate-300' },
  { id: 'rejected', title: 'Từ chối chi trả', color: 'bg-slate-100 text-slate-500', border: 'border-slate-300' },
];

export const ClaimKanbanView: React.FC<ClaimKanbanViewProps> = ({
  claims,
  onSelectClaim,
  onUpdateStatus,
}) => {
  const draggedClaimIdRef = useRef<string | null>(null);
  const [draggedClaimId, setDraggedClaimId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<ClaimStatus | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-stretch">
      {KANBAN_COLUMNS.map((col) => {
        const columnClaims = claims.filter((c) => c.status === col.id);
        const isDragOver = dragOverColId === col.id;

        return (
          <div
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOverColId(col.id);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setDragOverColId((current) => (current === col.id ? null : current));
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              const claimId = e.dataTransfer.getData('text/plain') || draggedClaimIdRef.current || draggedClaimId;
              if (claimId) {
                const claim = claims.find((c) => c.id === claimId);
                if (claim && claim.status !== col.id) {
                  onUpdateStatus(claimId, col.id);
                }
              }
              draggedClaimIdRef.current = null;
              setDragOverColId(null);
              setDraggedClaimId(null);
            }}
            className={`border rounded-2xl p-3 flex flex-col h-[calc(100vh-275px)] min-h-[560px] transition-all duration-150 ${
              isDragOver
                ? 'bg-rose-50/80 border-aia-red ring-2 ring-rose-200/80 shadow-md'
                : 'bg-slate-50/70 border-slate-200/90'
            }`}
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
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 pb-1 kanban-column-scroll">
              {isDragOver && draggedClaimId && (
                <div className="border-2 border-dashed border-aia-red/60 bg-white/90 rounded-xl p-3 text-center text-xs font-semibold text-aia-red animate-pulse flex items-center justify-center gap-1.5 shadow-xs">
                  <ArrowDownCircle className="w-4 h-4 text-aia-red" />
                  <span>Thả vào {col.title}</span>
                </div>
              )}

              {columnClaims.length === 0 && !isDragOver ? (
                <div className="py-8 px-3 text-center border border-dashed border-slate-200/80 rounded-xl text-slate-400 text-xs my-3 bg-white/40">
                  Không có hồ sơ
                </div>
              ) : (
                columnClaims.map((claim) => {
                  const verifiedDocs = claim.documents.filter((d) => d.status === 'verified').length;
                  const totalDocs = claim.documents.length;
                  const hasMissing = claim.documents.some((d) => d.status === 'missing' || d.status === 'invalid');
                  const isBeingDragged = draggedClaimId === claim.id;

                  return (
                    <div
                      key={claim.id}
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', claim.id);
                        e.dataTransfer.effectAllowed = 'move';
                        draggedClaimIdRef.current = claim.id;
                        setDraggedClaimId(claim.id);
                      }}
                      onDragEnd={() => {
                        draggedClaimIdRef.current = null;
                        setDraggedClaimId(null);
                        setDragOverColId(null);
                      }}
                      onClick={() => onSelectClaim(claim.id)}
                      className={`bg-white p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing group select-none ${
                        isBeingDragged
                          ? 'opacity-40 border-dashed border-aia-red ring-2 ring-aia-red/50 scale-[0.98]'
                          : 'border-slate-200 shadow-2xs hover:shadow-md hover:border-rose-300'
                      }`}
                    >
                      {/* Top: ID & Type */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div className="flex items-center gap-1 shrink-0">
                          <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 shrink-0" />
                          <span className="font-bold text-xs font-numeric text-slate-900 group-hover:text-aia-red transition-colors whitespace-nowrap tracking-tight">
                            {claim.id}
                          </span>
                        </div>
                        <span
                          className="text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/90 shrink truncate max-w-[84px]"
                          title={CLAIM_TYPE_LABELS[claim.claimType]}
                        >
                          {CLAIM_TYPE_LABELS[claim.claimType]}
                        </span>
                      </div>
                      {/* Customer Name & Policy */}
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {claim.customerName}
                      </div>
                      <div className="text-xs text-slate-700 font-numeric flex items-center gap-1 mt-0.5">
                        <span className="text-aia-red font-bold">{claim.policyNumber}</span>
                        <span>•</span>
                        <span className="font-medium text-slate-600">{claim.relationship}</span>
                      </div>

                      {/* Hospital & Diagnosis */}
                      <div className="mt-2 text-xs text-slate-800 font-bold flex items-center gap-1 truncate" title={claim.hospitalName}>
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{claim.hospitalName}</span>
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate mt-0.5" title={claim.diagnosis}>
                        {claim.diagnosis}
                      </div>
                      {/* Amount */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-medium">Số tiền:</span>
                        <span className="text-xs sm:text-sm font-extrabold font-numeric text-slate-900">
                          {formatCurrencyVND(claim.claimedAmount)}
                        </span>
                      </div>

                      {/* Approved amount if applicable */}
                      {claim.approvedAmount > 0 && (
                        <div className="flex items-center justify-between text-xs text-emerald-800 font-numeric font-extrabold mt-1">
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
