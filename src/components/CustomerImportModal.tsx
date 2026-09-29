import React, { useState, useRef } from 'react';
import {
  X,
  FileSpreadsheet,
  Upload,
  Check,
  AlertCircle,
  Download,
  Users,
  ShieldCheck,
  Tag,
  FileText,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Customer, Policy, PolicyStatus, BillingFrequency } from '../types/crm';
import { formatCurrencyVND } from '../utils/formatters';
import { downloadAiaExcelTemplate, readExcelFileAsMatrix } from '../utils/excelTemplate';

interface CustomerImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (importedCustomers: Omit<Customer, 'id' | 'createdAt'>[], importedPolicies: Policy[]) => void;
}

interface ParsedRow {
  policyId: string;
  status: PolicyStatus;
  statusRaw: string;
  productName: string;
  name: string; // Bên mua bảo hiểm
  insuredPersonName: string; // Người được bảo hiểm
  premiumAmount: number;
  billingFrequency: BillingFrequency;
  freqRaw: string;
  segment: string; // Phân khúc KH (Fansipan, Everest...)
  notes: string;
  phone?: string;
  cccd?: string;
  birthDate?: string;
  gender?: 'Nam' | 'Nữ';
  address?: string;
  occupation?: string;
}

export const CustomerImportModal: React.FC<CustomerImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [pasteData, setPasteData] = useState('');
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>([]);
  const [detectedReportInfo, setDetectedReportInfo] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [showPasteBox, setShowPasteBox] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Currency parser handling Vietnamese Excel formats: 12.522.000,0 or 26.631.000 or 12522000
  const parseVnCurrency = (val: string): number => {
    if (!val) return 25000000;
    const withoutDecimals = val.replace(/,\d+$/, '');
    const cleanDigits = withoutDecimals.replace(/\D/g, '');
    return cleanDigits ? Number(cleanDigits) : 25000000;
  };

  // Map policy status from Vietnamese text
  const mapPolicyStatus = (raw: string): PolicyStatus => {
    const s = (raw || '').toLowerCase().trim();
    if (s.includes('tạm hoãn') || s.includes('chờ nộp') || s.includes('gia hạn') || s.includes('chờ phí')) {
      return 'pending_payment';
    }
    if (s.includes('mất hiệu lực') || s.includes('hết hạn') || s.includes('lapsed')) {
      return 'lapsed';
    }
    if (s.includes('hủy') || s.includes('đáo hạn') || s.includes('chấm dứt') || s.includes('surrendered')) {
      return 'surrendered';
    }
    return 'in_force';
  };

  // Map billing frequency from Vietnamese text
  const mapBillingFreq = (raw: string): BillingFrequency => {
    const f = (raw || '').toLowerCase().trim();
    if (f.includes('nửa') || f.includes('bán') || f.includes('6 tháng')) {
      return 'semi_annual';
    }
    if (f.includes('quý') || f.includes('3 tháng')) {
      return 'quarterly';
    }
    return 'annual';
  };

  /**
   * Unified matrix parser supporting both Excel binary matrices and tab/comma split text.
   */
  const parseMatrix = (matrix: string[][], sourceLabel?: string) => {
    setErrorMsg(null);

    if (!matrix || matrix.length === 0) {
      setParsedRows([]);
      setErrorMsg('Tập tin hoặc dữ liệu không có dòng nội dung nào.');
      return;
    }

    // Detect metadata in the top rows (e.g. "Tên danh sách: DSHĐ đang được phục vụ bởi ĐL", "Mã số đại lý: 000850386")
    let reportTitle = '';
    let agentMeta = '';
    for (let i = 0; i < Math.min(matrix.length, 6); i++) {
      const rowText = (matrix[i] || []).join(' ').toLowerCase();
      if (rowText.includes('tên danh sách') || rowText.includes('dshđ') || rowText.includes('pos services')) {
        reportTitle = (matrix[i] || []).find((c) => c.trim().length > 3) || 'Báo cáo AIA POS';
      }
      if (rowText.includes('mã số đại lý') || rowText.includes('đại lý')) {
        agentMeta = (matrix[i] || []).find((c) => c.toLowerCase().includes('đại lý')) || '';
      }
    }

    if (sourceLabel || reportTitle || agentMeta) {
      setDetectedReportInfo(
        `${sourceLabel ? `📄 ${sourceLabel}` : ''} ${reportTitle ? `• 📋 ${reportTitle}` : '• 📋 Báo cáo AIA POS'} ${agentMeta ? `• ${agentMeta}` : ''}`.trim()
      );
    }

    // Find the header row
    let headerIdx = -1;
    for (let i = 0; i < Math.min(matrix.length, 12); i++) {
      const row = matrix[i] || [];
      const rowStr = row.join(' ').toLowerCase();

      // Skip report banner lines
      if (
        rowStr.startsWith('báo cáo danh sách') ||
        rowStr.startsWith('tên danh sách') ||
        rowStr.startsWith('mã số đại lý') ||
        rowStr.startsWith('văn phòng:')
      ) {
        continue;
      }

      if (
        rowStr.includes('hợp đồng') ||
        rowStr.includes('hop dong') ||
        (rowStr.includes('bên mua') && rowStr.includes('phí')) ||
        (rowStr.includes('tình trạng') && rowStr.includes('sản phẩm'))
      ) {
        headerIdx = i;
        break;
      }
      if (rowStr.includes('họ và tên') || rowStr.includes('tên kh')) {
        headerIdx = i;
        break;
      }
    }

    // Default column mapping for official AIA POS format
    // Col 0: Hợp đồng | Col 1: Tình trạng HĐ | Col 2: Sản phẩm chính | Col 3: Bên mua BH | Col 4: Người được BH | Col 5: Phí BH định kỳ | Col 6: Định kỳ đóng phí | Col 7: Phân khúc KH | Col 8: Ghi chú
    const colMap = {
      policyId: 0,
      status: 1,
      product: 2,
      buyer: 3,
      insured: 4,
      premium: 5,
      freq: 6,
      segment: 7,
      phone: -1,
      cccd: -1,
      notes: 8,
      address: -1,
      birthDate: -1,
    };

    if (headerIdx !== -1) {
      const headerRow = matrix[headerIdx];
      const cleanHeaderCols = headerRow.map((c) => c.toLowerCase().trim());

      cleanHeaderCols.forEach((col, idx) => {
        if (col.includes('hợp đồng') || col.includes('hop dong') || col.includes('số hđ') || col.includes('policy')) {
          colMap.policyId = idx;
        } else if (col.includes('tình trạng') || col.includes('tinh trang') || col.includes('trạng thái') || col.includes('status')) {
          colMap.status = idx;
        } else if (col.includes('sản phẩm') || col.includes('san pham') || col.includes('product')) {
          colMap.product = idx;
        } else if (col.includes('người được') || col.includes('nguoi duoc') || col.includes('insured')) {
          colMap.insured = idx;
        } else if (col.includes('bên mua') || col.includes('ben mua') || col.includes('chủ hđ') || col.includes('họ và tên') || col.includes('khách hàng') || col.includes('tên kh')) {
          colMap.buyer = idx;
        } else if (col.includes('định kỳ đóng') || col.includes('kỳ đóng') || (col.includes('định kỳ') && !col.includes('phí bh'))) {
          colMap.freq = idx;
        } else if (col.includes('phí bh') || col.includes('tiền phí') || col.includes('phí định kỳ') || (col.includes('phí') && !col.includes('đóng'))) {
          colMap.premium = idx;
        } else if (col.includes('phân khúc') || col.includes('phan khuc') || col.includes('segment') || col.includes('hạng')) {
          colMap.segment = idx;
        } else if (col.includes('điện thoại') || col.includes('sđt') || col.includes('phone') || col.includes('mobile')) {
          colMap.phone = idx;
        } else if (col.includes('cccd') || col.includes('cmnd') || col.includes('căn cước')) {
          colMap.cccd = idx;
        } else if (col.includes('ghi chú') || col.includes('ghi chu') || col.includes('notes') || col.includes('note')) {
          colMap.notes = idx;
        } else if (col.includes('địa chỉ') || col.includes('dia chi') || col.includes('address')) {
          colMap.address = idx;
        } else if (col.includes('ngày sinh') || col.includes('ngay sinh') || col.includes('birth')) {
          colMap.birthDate = idx;
        }
      });
    }

    const startRow = headerIdx !== -1 ? headerIdx + 1 : 0;
    const results: ParsedRow[] = [];

    for (let i = startRow; i < matrix.length; i++) {
      const cleanCols = (matrix[i] || []).map((c) => c.trim());
      if (cleanCols.length < 2) continue;

      const policyIdRaw = cleanCols[colMap.policyId] || '';
      const buyerNameRaw = cleanCols[colMap.buyer] || '';
      const insuredNameRaw = (colMap.insured !== -1 ? cleanCols[colMap.insured] : '') || buyerNameRaw;
      const statusRaw = (colMap.status !== -1 ? cleanCols[colMap.status] : '') || 'Hiệu lực';
      const productRaw = (colMap.product !== -1 ? cleanCols[colMap.product] : '') || 'Bảo Hiểm Liên Kết Chung AIA - Khỏe Trọn Vẹn';
      const premiumRaw = colMap.premium !== -1 ? cleanCols[colMap.premium] : '';
      const freqRaw = (colMap.freq !== -1 ? cleanCols[colMap.freq] : '') || 'Năm';
      const segmentRaw = (colMap.segment !== -1 ? cleanCols[colMap.segment] : '') || 'N/A';
      const notesRaw = colMap.notes !== -1 ? cleanCols[colMap.notes] : '';

      const phoneRaw = colMap.phone !== -1 ? cleanCols[colMap.phone] : '';
      const cccdRaw = colMap.cccd !== -1 ? cleanCols[colMap.cccd] : '';
      const addressRaw = colMap.address !== -1 ? cleanCols[colMap.address] : 'TP.HCM';
      const birthDateRaw = colMap.birthDate !== -1 ? cleanCols[colMap.birthDate] : '1988-01-01';

      // Skip header rows if repeated
      if (
        policyIdRaw.toLowerCase().includes('hợp đồng') ||
        policyIdRaw.toLowerCase().includes('hop dong') ||
        buyerNameRaw.toLowerCase().includes('bên mua') ||
        buyerNameRaw.toLowerCase().includes('họ và tên')
      ) {
        continue;
      }

      if (buyerNameRaw || policyIdRaw) {
        const policyId = policyIdRaw || `U${Math.floor(100000000 + Math.random() * 900000000)}`;
        const name = buyerNameRaw || `Khách hàng HĐ ${policyId}`;
        const status = mapPolicyStatus(statusRaw);
        const billingFrequency = mapBillingFreq(freqRaw);
        const premiumAmount = parseVnCurrency(premiumRaw);

        results.push({
          policyId,
          status,
          statusRaw: statusRaw || 'Hiệu lực',
          productName: productRaw,
          name,
          insuredPersonName: insuredNameRaw || name,
          premiumAmount,
          billingFrequency,
          freqRaw,
          segment: segmentRaw || 'N/A',
          notes: notesRaw,
          phone: phoneRaw,
          cccd: cccdRaw,
          birthDate: birthDateRaw,
          gender: 'Nữ',
          address: addressRaw,
          occupation: 'Khách hàng AIA',
        });
      }
    }

    if (results.length === 0) {
      setErrorMsg(
        'Không thể nhận diện dữ liệu hợp đồng. Vui lòng đảm bảo bảng tính có các cột: Hợp đồng, Tình trạng, Sản phẩm, Bên mua, Phí BH...'
      );
    } else {
      setParsedRows(results);
    }
  };

  /**
   * Parses raw text pasted via clipboard
   */
  const handleParseText = (text: string) => {
    if (!text.trim()) {
      setParsedRows([]);
      setErrorMsg(null);
      setDetectedReportInfo(null);
      return;
    }

    const lines = text.trim().split(/\r?\n/);
    const matrix: string[][] = lines.map((line) => {
      if (line.includes('\t')) {
        return line.split('\t').map((c) => c.replace(/^"|"$/g, '').trim());
      }
      return line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((c) => c.replace(/^"|"$/g, '').trim());
    });

    parseMatrix(matrix, 'Dán trực tiếp từ Clipboard');
  };

  /**
   * Processes uploaded file (either .xlsx, .xls binary or .csv, .tsv text)
   */
  const processUploadedFile = async (file: File) => {
    setIsLoadingFile(true);
    setErrorMsg(null);

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setUploadedFile({ name: file.name, size: sizeFormatted });

    try {
      const isExcelBinary = /\.(xlsx|xls)$/i.test(file.name);

      if (isExcelBinary) {
        const matrix = await readExcelFileAsMatrix(file);
        parseMatrix(matrix, file.name);
      } else {
        // Fallback for CSV / TXT / TSV
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            handleParseText(content);
          }
        };
        reader.onerror = () => {
          setErrorMsg('Không thể đọc file CSV. Vui lòng thử lại.');
        };
        reader.readAsText(file);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi xử lý file Excel';
      setErrorMsg(`Không thể phân tích file: ${message}`);
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleResetFile = () => {
    setUploadedFile(null);
    setParsedRows([]);
    setPasteData('');
    setErrorMsg(null);
    setDetectedReportInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExecuteImport = () => {
    if (parsedRows.length === 0) return;

    const customersToImport: Omit<Customer, 'id' | 'createdAt'>[] = [];
    const policiesToImport: Policy[] = [];
    const todayStr = new Date().toISOString().split('T')[0];
    const oneYearLater = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const urgentDue = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const graceEnd = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    parsedRows.forEach((row) => {
      // 1. Customer profile
      customersToImport.push({
        name: row.name,
        phone: row.phone || `09${Math.floor(10000000 + Math.random() * 90000000)}`,
        cccd: row.cccd || `079${Math.floor(100000000 + Math.random() * 900000000)}`,
        birthDate: row.birthDate || '1990-01-01',
        gender: row.gender || 'Nữ',
        address: row.address || 'TP.HCM',
        occupation: row.occupation || 'Khách hàng AIA',
        segment: row.segment !== 'N/A' ? row.segment : undefined,
        notes: row.notes || (row.segment && row.segment !== 'N/A' ? `Phân khúc AIA: ${row.segment}` : ''),
      });

      // 2. Policy record
      const isPending = row.status === 'pending_payment';

      policiesToImport.push({
        id: row.policyId,
        customerId: '', // Will be mapped by store
        customerName: row.name,
        insuredPersonName: row.insuredPersonName || row.name,
        productName: row.productName,
        mainCoverageAmount: Math.max(row.premiumAmount * 40, 500000000), // ~40x annual premium or min 500M
        issueDate: todayStr,
        status: row.status,
        billingFrequency: row.billingFrequency,
        premiumAmount: row.premiumAmount,
        nextDueDate: isPending ? urgentDue : oneYearLater,
        gracePeriodEnd: isPending ? graceEnd : undefined,
        segment: row.segment,
        notes: row.notes,
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
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold shadow-xs">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Nhập Danh Sách Khách Hàng Từ Excel Chuẩn AIA</h3>
                <span className="text-[10px] bg-aia-red text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  AIA POS (.xlsx)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tương thích mẫu "DSHĐ đang được phục vụ bởi ĐL" từ cổng AIA Services & bảng tính Excel
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Instructions & Template download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-2xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-aia-red" />
                <span>Mẫu Excel thương hiệu AIA chuẩn hóa:</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Tải file mẫu có sẵn màu nhận diện AIA, độ rộng cột chuẩn và dữ liệu mẫu thực tế. Bạn có thể kéo thả trực tiếp file <strong className="text-slate-700">.xlsx / .xls</strong> vào khung bên dưới.
              </p>
            </div>
            <button
              type="button"
              onClick={() => downloadAiaExcelTemplate()}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-emerald-50 border border-emerald-300 hover:border-emerald-400 rounded-xl text-emerald-800 font-bold shadow-xs transition-all shrink-0 cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform">
                <Download className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <span className="block text-[11px]">Tải file mẫu AIA</span>
                <span className="text-[10px] text-emerald-600 font-mono font-normal">.xlsx (Chuẩn màu)</span>
              </div>
            </button>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-2.5 ${
              isDragging
                ? 'border-aia-red bg-rose-50/60 ring-4 ring-aia-red/10 scale-[1.008]'
                : uploadedFile
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv,.txt,.tsv"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {isLoadingFile ? (
              <div className="py-3 flex flex-col items-center gap-2 text-slate-600">
                <RefreshCw className="w-6 h-6 text-aia-red animate-spin" />
                <span className="text-xs font-semibold">Đang bóc tách dữ liệu file Excel...</span>
              </div>
            ) : uploadedFile ? (
              <div className="flex items-center justify-between w-full max-w-lg bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-xs">{uploadedFile.name}</p>
                    <p className="text-[10px] text-slate-500">
                      Dung lượng: {uploadedFile.size} • <span className="text-emerald-700 font-semibold">{parsedRows.length} hợp đồng sẵn sàng</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleResetFile();
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Chọn file khác"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-aia-red group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6 text-aia-red" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Kéo thả file Excel <span className="text-aia-red">(.xlsx, .xls)</span> hoặc <span className="text-slate-600">.csv</span> vào đây
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    hoặc nhấp chuột để chọn file từ máy tính của bạn
                  </p>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-mono text-[10px] font-bold">
                    XLSX
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-mono text-[10px] font-bold">
                    XLS
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded font-mono text-[10px] font-bold">
                    CSV
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded font-mono text-[10px] font-bold">
                    TSV
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Toggle Clipboard Paste Area */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowPasteBox(!showPasteBox)}
              className="text-slate-500 hover:text-slate-800 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showPasteBox ? 'Ẩn ô dán phím tắt Ctrl+V' : 'Hoặc dán nhanh qua phím tắt (Ctrl+V từ bảng Excel)'}</span>
            </button>

            {showPasteBox && (
              <div className="mt-2 space-y-1 animate-in fade-in duration-150">
                <textarea
                  rows={4}
                  value={pasteData}
                  onChange={(e) => {
                    setPasteData(e.target.value);
                    handleParseText(e.target.value);
                  }}
                  placeholder={`Dán nguyên bảng từ Excel AIA vào đây, ví dụ:\nU926687581\tTạm hoãn\tBảo Hiểm Liên Kết Chung AIA - Khỏe Bình An\tLê Thị Ngọc Sương\tLê Thị Ngọc Sương\t12.522.000,0\tNăm\tN/A\nU926599543\tHiệu lực\tBảo hiểm Liên Kết Chung AIA - Khỏe Trọn Vẹn\tĐỗ Văn Dân\tĐỗ Văn Dân\t26.631.000,0\tNăm\tFansipan`}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-aia-red/20 focus:bg-white transition-all"
                />
              </div>
            )}
          </div>

          {/* Detected Report Info Banner */}
          {detectedReportInfo && (
            <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-800 text-[11px] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-aia-red shrink-0" />
              <span className="truncate">{detectedReportInfo}</span>
            </div>
          )}

          {/* Error Message */}
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
                  <span>Xem trước ({parsedRows.length} hợp đồng & khách hàng được nhận diện)</span>
                </span>
                <span className="text-[11px] text-slate-400">Kiểm tra thông tin trước khi nạp vào hệ thống</span>
              </div>

              <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl shadow-2xs">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                    <tr>
                      <th className="p-2">Số HĐ</th>
                      <th className="p-2">Tình trạng</th>
                      <th className="p-2">Bên mua bảo hiểm</th>
                      <th className="p-2">Người được BH</th>
                      <th className="p-2">Sản phẩm chính</th>
                      <th className="p-2">Phân khúc</th>
                      <th className="p-2 text-right">Phí định kỳ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {parsedRows.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 font-medium">
                        <td className="p-2 font-mono font-bold text-aia-red">{r.policyId}</td>
                        <td className="p-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              r.status === 'in_force'
                                ? 'bg-slate-100 text-slate-800 border-slate-200'
                                : r.status === 'pending_payment'
                                ? 'bg-rose-50 text-aia-red border-rose-200 font-semibold'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                r.status === 'in_force'
                                  ? 'bg-slate-700'
                                  : r.status === 'pending_payment'
                                  ? 'bg-aia-red'
                                  : 'bg-slate-400'
                              }`}
                            />
                            <span>{r.statusRaw}</span>
                          </span>
                        </td>
                        <td className="p-2 font-bold text-slate-900">{r.name}</td>
                        <td className="p-2 text-slate-600">{r.insuredPersonName}</td>
                        <td className="p-2 text-slate-700 truncate max-w-[200px]" title={r.productName}>
                          {r.productName}
                        </td>
                        <td className="p-2">
                          {r.segment && r.segment !== 'N/A' ? (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold">
                              <Tag className="w-2.5 h-2.5" />
                              <span>{r.segment}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">N/A</span>
                          )}
                        </td>
                        <td className="p-2 text-right font-mono font-bold text-slate-800">
                          {formatCurrencyVND(r.premiumAmount)}
                          <span className="text-[10px] text-slate-400 block font-normal font-sans">
                            {r.freqRaw || 'Năm'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {parsedRows.length > 0
                ? `Đã nhận diện ${parsedRows.length} hợp đồng hợp lệ`
                : 'Chưa có hợp đồng nào được chọn'}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleExecuteImport}
                disabled={parsedRows.length === 0}
                className={`px-5 py-2.5 rounded-xl font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
                  parsedRows.length > 0
                    ? 'bg-aia-red hover:bg-aia-red-dark text-white shadow-aia-red/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Nạp {parsedRows.length} hợp đồng & khách hàng vào hệ thống</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
