import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Upload,
  Check,
  AlertCircle,
  FileText,
  Download,
  Users,
} from 'lucide-react';
import { Customer, Policy } from '../types/crm';

interface CustomerImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (importedCustomers: Omit<Customer, 'id' | 'createdAt'>[], importedPolicies: Policy[]) => void;
}

interface ParsedRow {
  name: string;
  phone: string;
  cccd: string;
  birthDate: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  occupation: string;
  policyId: string;
  productName: string;
  premiumAmount: number;
}

export const CustomerImportModal: React.FC<CustomerImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [pasteData, setPasteData] = useState('');
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Parser for CSV or Tab-separated copied data from Excel
  const handleParse = (text: string) => {
    setErrorMsg(null);
    if (!text.trim()) {
      setParsedRows([]);
      return;
    }

    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 1) {
      setErrorMsg('Dữ liệu trống.');
      return;
    }

    const results: ParsedRow[] = [];
    const startIndex = lines[0].toLowerCase().includes('tên') || lines[0].toLowerCase().includes('name') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split by tab (Excel paste) or comma (CSV)
      const cols = line.includes('\t') ? line.split('\t') : line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const cleanCols = cols.map((c) => c.replace(/^"|"$/g, '').trim());

      const name = cleanCols[0] || '';
      const phone = cleanCols[1] || '';
      const cccd = cleanCols[2] || '';
      const policyId = cleanCols[3] || `AIA-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const productName = cleanCols[4] || 'AIA - Khỏe Trọn Vẹn';
      const premiumStr = cleanCols[5]?.replace(/\D/g, '') || '25000000';
      const address = cleanCols[6] || 'TP.HCM';
      const birthDate = cleanCols[7] || '1990-01-01';

      if (name) {
        results.push({
          name,
          phone,
          cccd,
          birthDate,
          gender: 'Nữ',
          address,
          occupation: 'Khách hàng AIA',
          policyId,
          productName,
          premiumAmount: Number(premiumStr) || 25000000,
        });
      }
    }

    if (results.length === 0) {
      setErrorMsg('Không thể phân tích dữ liệu. Vui lòng kiểm tra định dạng các cột.');
    } else {
      setParsedRows(results);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setPasteData(content);
        handleParse(content);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const sampleHeaders = 'Ho_Va_Ten,So_Dien_Thoai,So_CCCD,So_Hop_Dong,San_Pham_AIA,Phi_Dinh_Ky,Dia_Chi,Ngay_Sinh\n';
    const sampleRows =
      'Nguyễn Văn A,0912345678,079190001234,AIA-1109911,AIA - Khỏe Trọn Vẹn,32000000,Quận 1 TP.HCM,1988-05-12\n' +
      'Trần Thị B,0987654321,079195005678,AIA-1109922,AIA - Trọn Vẹn Cân Bằng,28000000,Quận 7 TP.HCM,1992-09-20\n';

    const blob = new Blob(['\uFEFF' + sampleHeaders + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mau_nhap_khach_hang_aia.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    if (parsedRows.length === 0) return;

    const customersToImport: Omit<Customer, 'id' | 'createdAt'>[] = [];
    const policiesToImport: Policy[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    const nextDueStr = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    parsedRows.forEach((row, idx) => {
      customersToImport.push({
        name: row.name,
        phone: row.phone,
        cccd: row.cccd,
        birthDate: row.birthDate,
        gender: row.gender,
        address: row.address,
        occupation: row.occupation,
      });

      policiesToImport.push({
        id: row.policyId,
        customerId: '', // Will be mapped by store
        customerName: row.name,
        productName: row.productName,
        mainCoverageAmount: 1000000000,
        issueDate: todayStr,
        status: 'in_force',
        billingFrequency: 'annual',
        premiumAmount: row.premiumAmount,
        nextDueDate: nextDueStr,
        benefits: [
          {
            type: 'inpatient',
            name: 'Thẻ Chăm sóc Sức khỏe (Nội trú)',
            maxLimit: 250000000,
            usedAmount: 0,
            remainingLimit: 250000000,
            unit: 'VND',
          },
          {
            type: 'outpatient',
            name: 'Thẻ Chăm sóc Ngoại trú Tiêu chuẩn',
            maxLimit: 20000000,
            usedAmount: 0,
            remainingLimit: 20000000,
            unit: 'VND',
          },
        ],
      });
    });

    onImport(customersToImport, policiesToImport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Nhập Danh Sách Khách Hàng Từ Excel / CSV</h3>
              <p className="text-xs text-slate-400">
                Tải hàng loạt khách hàng và số hợp đồng từ hệ thống công ty về app
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Instructions & Template download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <p className="font-semibold text-slate-800">Cách nhập nhanh nhất:</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mở bảng Excel trên máy tính, chọn và copy (Ctrl+C) các cột rồi dán thẳng (Ctrl+V) vào ô bên dưới, hoặc tải file CSV lên.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDownloadSample}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-slate-700 font-semibold shadow-2xs transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tải file mẫu (.csv)</span>
            </button>
          </div>

          {/* Paste area or File Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Dán dữ liệu từ bảng Excel / CSV vào đây:</label>
              <label className="cursor-pointer text-aia-red hover:underline font-semibold flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Hoặc chọn file .csv từ máy</span>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <textarea
              rows={4}
              value={pasteData}
              onChange={(e) => {
                setPasteData(e.target.value);
                handleParse(e.target.value);
              }}
              placeholder="Dán các cột theo thứ tự: Họ và tên | SĐT | CCCD | Số HĐ | Tên Sản phẩm | Phí BH | Địa chỉ | Ngày sinh..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-aia-red focus:bg-white"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Data Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Xem trước ({parsedRows.length} khách hàng được nhận diện)</span>
                </span>
                <span className="text-[11px] text-slate-400">Kiểm tra thông tin trước khi nạp</span>
              </div>

              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="p-2">Họ và tên</th>
                      <th className="p-2">SĐT</th>
                      <th className="p-2">Số HĐ</th>
                      <th className="p-2">Sản phẩm AIA</th>
                      <th className="p-2 text-right">Phí định kỳ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 font-medium">
                        <td className="p-2 font-bold text-slate-900">{r.name}</td>
                        <td className="p-2 font-mono text-slate-600">{r.phone}</td>
                        <td className="p-2 font-mono font-semibold text-aia-red">{r.policyId}</td>
                        <td className="p-2 text-slate-700">{r.productName}</td>
                        <td className="p-2 text-right font-mono font-bold text-slate-800">
                          {new Intl.NumberFormat('vi-VN').format(r.premiumAmount)}đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleExecuteImport}
              disabled={parsedRows.length === 0}
              className={`px-5 py-2.5 rounded-xl font-bold shadow-xs transition-colors flex items-center gap-1.5 ${
                parsedRows.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Nạp {parsedRows.length} khách hàng vào hệ thống</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
