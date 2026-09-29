import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Download,
  RefreshCw,
  FileCode,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  Database,
  Users,
  ShieldAlert,
  FileCheck,
  Info,
} from 'lucide-react';
import { ConsultantProfile } from '../types/claim';

interface BackupPreviewData {
  fileName: string;
  fileSize: string;
  consultantName?: string;
  consultantCode?: string;
  exportedAt?: string;
  customersCount: number;
  policiesCount: number;
  claimsCount: number;
  careCount: number;
  rawJson: string;
}

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    customersCount: number;
    policiesCount: number;
    claimsCount: number;
    careCount: number;
  };
  consultant: ConsultantProfile;
  onExportJSON: () => void;
  onExportCSV: () => void;
  onImportJSON: (jsonStr: string) => {
    success: boolean;
    error?: string;
    count?: { customers: number; policies: number; claims: number; careActivities: number };
  };
  onResetDefault: () => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  stats,
  consultant,
  onExportJSON,
  onExportCSV,
  onImportJSON,
  onResetDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'reset'>('export');
  const [dragOver, setDragOver] = useState(false);
  const [previewData, setPreviewData] = useState<BackupPreviewData | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);
  const [isResetConfirming, setIsResetConfirming] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const parseAndPreviewFile = (file: File) => {
    setImportError(null);
    setImportSuccessMsg(null);
    setPreviewData(null);

    if (!file.name.endsWith('.json')) {
      setImportError('Vui lòng chọn tệp định dạng .json');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.customers || !Array.isArray(parsed.customers) || !parsed.policies || !parsed.claims) {
          setImportError('Tệp không đúng định dạng dữ liệu AIA CRM (thiếu bảng customers/policies/claims)');
          return;
        }

        const sizeKb = (file.size / 1024).toFixed(1) + ' KB';
        setPreviewData({
          fileName: file.name,
          fileSize: sizeKb,
          consultantName: parsed.consultant?.name || parsed.agent?.name,
          consultantCode: parsed.consultant?.code || parsed.agent?.code,
          exportedAt: parsed.exportedAt || 'Không xác định',
          customersCount: parsed.customers.length,
          policiesCount: parsed.policies.length,
          claimsCount: parsed.claims.length,
          careCount: Array.isArray(parsed.careActivities) ? parsed.careActivities.length : 0,
          rawJson: text,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Tệp JSON không hợp lệ';
        setImportError(msg);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseAndPreviewFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseAndPreviewFile(file);
  };

  const handleConfirmImport = () => {
    if (!previewData) return;
    const res = onImportJSON(previewData.rawJson);
    if (res.success) {
      setImportSuccessMsg(
        `Khôi phục thành công: ${res.count?.customers ?? previewData.customersCount} khách hàng, ${
          res.count?.policies ?? previewData.policiesCount
        } hợp đồng, ${res.count?.claims ?? previewData.claimsCount} hồ sơ claim!`
      );
      setPreviewData(null);
      setTimeout(() => {
        setImportSuccessMsg(null);
        onClose();
      }, 1200);
    } else {
      setImportError(res.error || 'Có lỗi xảy ra khi nhập dữ liệu');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-aia-red flex items-center justify-center text-white shadow-md font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Trung tâm Sao lưu & Khôi phục Dữ liệu
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Bảo vệ và đồng bộ dữ liệu giữa các máy tính của tư vấn viên
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Database Summary Ribbon */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-semibold text-slate-800">Dữ liệu hiện tại trên máy này:</span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded font-numeric font-medium text-slate-700">
              <Users className="w-3 h-3 text-slate-500" />
              {stats.customersCount} Khách hàng
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded font-numeric font-medium text-slate-700">
              <FileCheck className="w-3 h-3 text-slate-500" />
              {stats.policiesCount} Hợp đồng
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded font-numeric font-medium text-slate-700">
              <ShieldAlert className="w-3 h-3 text-aia-red" />
              {stats.claimsCount} Claims
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Tư vấn viên: <strong className="text-slate-800">{consultant.name}</strong> ({consultant.code})
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-5 sm:px-6 bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'border-aia-red text-aia-red'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>1. Sao lưu dữ liệu (Export)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'import'
                ? 'border-aia-red text-aia-red'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>2. Khôi phục từ file (Restore)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reset')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'reset'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-rose-600'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>3. Dữ liệu mặc định</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: EXPORT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dữ liệu của bạn được lưu an toàn 100% trên trình duyệt</span>
                </div>
                <p className="text-emerald-700 leading-relaxed pl-5.5">
                  Tải file sao lưu về máy để lưu trữ dự phòng định kỳ hoặc chuyển sang laptop khác để tiếp tục làm việc. File sao lưu chứa toàn bộ hồ sơ khách hàng, quyền lợi bảo hiểm và tiến độ các ca giải quyết quyền lợi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* JSON Full Backup */}
                <div className="bg-white border-2 border-slate-200 hover:border-aia-red rounded-xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-aia-red/10 text-aia-red flex items-center justify-center font-bold">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Bản sao lưu hoàn chỉnh (.JSON)</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Chứa 100% thông tin khách hàng, số HĐ, tiến độ bồi thường, ghi chú chăm sóc và thông tin tư vấn viên. Dùng để khôi phục nguyên vẹn.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onExportJSON}
                    className="mt-4 w-full py-2.5 px-3 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải về file Backup (.json)</span>
                  </button>
                </div>

                {/* Excel CSV Export */}
                <div className="bg-white border-2 border-slate-200 hover:border-slate-400 rounded-xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Xuất danh bạ Excel (.CSV)</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      File bảng tính mở được bằng Microsoft Excel/Google Sheets để xem danh bạ khách hàng, số điện thoại, ngày sinh và số tiền bảo hiểm.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onExportCSV}
                    className="mt-4 w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Download className="w-4 h-4" />
                    <span>Xuất bảng tính (.csv)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT / RESTORE */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />

              {importSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{importSuccessMsg}</span>
                </div>
              )}

              {importError && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs text-rose-800 font-semibold animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Upload Dropzone */}
              {!previewData ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-aia-red bg-rose-50/50 scale-[1.01]'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/60 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mx-auto text-slate-500 mb-3">
                    <Upload className="w-6 h-6 text-aia-red" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    Nhấp để chọn tệp sao lưu hoặc kéo thả file vào đây
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Chỉ hỗ trợ tệp <span className="font-mono font-semibold text-slate-700">.json</span> được xuất từ hệ thống AIA CRM này
                  </p>
                </div>
              ) : (
                /* Inspection / Confirmation Card */
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-aia-red" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{previewData.fileName}</h4>
                        <span className="text-[11px] text-slate-500">{previewData.fileSize}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewData(null)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Chọn file khác
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <span className="block text-lg font-bold font-numeric text-slate-800">{previewData.customersCount}</span>
                      <span className="text-[10.5px] text-slate-500">Khách hàng</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <span className="block text-lg font-bold font-numeric text-slate-800">{previewData.policiesCount}</span>
                      <span className="text-[10.5px] text-slate-500">Hợp đồng</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <span className="block text-lg font-bold font-numeric text-aia-red">{previewData.claimsCount}</span>
                      <span className="text-[10.5px] text-slate-500">Claims</span>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg p-2">
                      <span className="block text-lg font-bold font-numeric text-slate-800">{previewData.careCount}</span>
                      <span className="text-[10.5px] text-slate-500">Lịch chăm sóc</span>
                    </div>
                  </div>

                  {previewData.consultantName && (
                    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs flex items-center justify-between text-slate-700">
                      <span>Tư vấn viên trong file:</span>
                      <strong className="text-slate-900">{previewData.consultantName} ({previewData.consultantCode || 'AIA'})</strong>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Lưu ý:</strong> Dữ liệu hiện tại trên trình duyệt này sẽ được thay thế bằng dữ liệu từ file sao lưu trên.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="w-full py-2.5 px-4 bg-aia-red hover:bg-aia-red-dark text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Xác nhận Khôi phục Cơ sở Dữ liệu</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RESET TO DEFAULT */}
          {activeTab === 'reset' && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-900 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Khu vực Đặt lại Dữ liệu (Reset To Default)</span>
                </div>
                <p className="text-rose-700 leading-relaxed pl-5.5">
                  Thao tác này sẽ xóa toàn bộ các khách hàng, hợp đồng và hồ sơ bồi thường mà bạn đã nhập trên máy này, và khôi phục lại bộ dữ liệu mẫu ban đầu của hệ thống.
                </p>
              </div>

              {!isResetConfirming ? (
                <div className="bg-white border border-slate-200 rounded-xl p-5 text-center space-y-3">
                  <p className="text-xs text-slate-600">
                    Nếu bạn muốn làm mới dữ liệu để thử nghiệm từ đầu, hãy đảm bảo bạn đã bấm <strong>Sao lưu JSON</strong> ở mục 1 trước khi thực hiện.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsResetConfirming(true)}
                    className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Tôi muốn khôi phục về dữ liệu mẫu ban đầu
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900 text-white border border-slate-700 rounded-xl p-5 text-center space-y-3 animate-in zoom-in-95">
                  <p className="text-xs font-bold text-rose-400">
                    XÁC NHẬN LẦN CUỐI: Bạn có chắc chắn muốn xóa dữ liệu đã nhập?
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsResetConfirming(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onResetDefault();
                        setIsResetConfirming(false);
                        onClose();
                      }}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-md cursor-pointer"
                    >
                      Đồng ý Đặt lại Dữ liệu
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            Định dạng tệp chuẩn: AIA Agent CRM v2 JSON
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
