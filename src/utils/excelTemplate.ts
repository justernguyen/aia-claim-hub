import XLSX from 'xlsx-js-style';

/**
 * AIA POS Excel Template & Parser Utility
 * Generates official AIA-styled Excel spreadsheets and parses binary Excel uploads.
 */

export interface ExcelAiaColumn {
  header: string;
  key: string;
  width: number;
}

export const AIA_EXCEL_COLUMNS: ExcelAiaColumn[] = [
  { header: 'Hợp đồng', key: 'policyId', width: 16 },
  { header: 'Tình trạng HĐ', key: 'status', width: 16 },
  { header: 'Sản phẩm chính', key: 'productName', width: 44 },
  { header: 'Bên mua bảo hiểm', key: 'buyerName', width: 25 },
  { header: 'Người được bảo hiểm', key: 'insuredName', width: 25 },
  { header: 'Phí BH định kỳ (VNĐ)', key: 'premium', width: 22 },
  { header: 'Định kỳ đóng phí', key: 'freq', width: 18 },
  { header: 'Phân khúc KH', key: 'segment', width: 16 },
  { header: 'Số điện thoại', key: 'phone', width: 16 },
  { header: 'CCCD / CMND', key: 'cccd', width: 18 },
  { header: 'Ghi chú', key: 'notes', width: 42 },
];

export const AIA_SAMPLE_DATA = [
  [
    'U926687581',
    'Tạm hoãn',
    'Bảo Hiểm Liên Kết Chung AIA - Khỏe Bình An',
    'Lê Thị Ngọc Sương',
    'Lê Thị Ngọc Sương',
    12522000,
    'Năm',
    'N/A',
    '0912345678',
    '079188001234',
    'Đang trong thời gian gia hạn đóng phí 60 ngày',
  ],
  [
    'U926599543',
    'Hiệu lực',
    'Bảo hiểm Liên Kết Chung AIA - Khỏe Trọn Vẹn - Kế hoạch toàn diện',
    'Đỗ Văn Dân',
    'Đỗ Văn Dân',
    26631000,
    'Năm',
    'Fansipan',
    '0987654321',
    '079085002345',
    'Khách hàng VIP Fansipan - Chăm sóc sinh nhật tháng 10',
  ],
  [
    'U926506400',
    'Hiệu lực',
    'Bảo Hiểm Liên Kết Chung AIA - Khỏe Bình An',
    'Thái Tấn Định',
    'Thái Tấn Định',
    26042000,
    'Năm',
    'Fansipan',
    '0903112233',
    '079190003456',
    'Khách hàng tiềm năng nâng cấp quyền lợi Thẻ Sức Khỏe',
  ],
  [
    'U926411239',
    'Hiệu lực',
    'Bảo hiểm Liên Kết Đơn vị AIA - Trọn Vẹn Cân Bằng',
    'Nguyễn Thị Mai Hương',
    'Nguyễn Gia Bảo',
    35150000,
    'Năm',
    'Everest',
    '0934567890',
    '079192004567',
    'HĐ cho con gái - Đã tích lũy quỹ đầu tư 3 năm',
  ],
  [
    'U926388912',
    'Hiệu lực',
    'Bảo Hiểm Bệnh Hiểm Nghèo Toàn Diện AIA',
    'Trần Quốc Bảo',
    'Trần Quốc Bảo',
    18900000,
    'Nửa năm',
    'N/A',
    '0945678901',
    '079184005678',
    'Kỳ đóng phí tiếp theo vào tháng 12/2026',
  ],
];

/**
 * Generates and triggers download of a polished AIA corporate Excel spreadsheet.
 */
export function downloadAiaExcelTemplate(fileName = 'mau_danh_sach_hop_dong_aia_pos.xlsx'): void {
  const wb = XLSX.utils.book_new();

  // Thin border styles
  const thinBorder = {
    top: { style: 'thin', color: { rgb: 'CBD5E1' } },
    bottom: { style: 'thin', color: { rgb: 'CBD5E1' } },
    left: { style: 'thin', color: { rgb: 'CBD5E1' } },
    right: { style: 'thin', color: { rgb: 'CBD5E1' } },
  };

  const headerBorder = {
    top: { style: 'medium', color: { rgb: 'B00E3A' } },
    bottom: { style: 'medium', color: { rgb: 'B00E3A' } },
    left: { style: 'thin', color: { rgb: 'B00E3A' } },
    right: { style: 'thin', color: { rgb: 'B00E3A' } },
  };

  // Styles
  const titleStyle = {
    fill: { fgColor: { rgb: 'D31145' } }, // AIA Brand Red
    font: { name: 'Calibri', sz: 14, bold: true, color: { rgb: 'FFFFFF' } },
    alignment: { horizontal: 'center', vertical: 'center' },
  };

  const subtitleStyle = {
    fill: { fgColor: { rgb: 'F1F5F9' } },
    font: { name: 'Calibri', sz: 9.5, italic: true, color: { rgb: '475569' } },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: thinBorder,
  };

  const tableHeaderStyle = {
    fill: { fgColor: { rgb: 'D31145' } }, // AIA Red Header
    font: { name: 'Calibri', sz: 10.5, bold: true, color: { rgb: 'FFFFFF' } },
    alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    border: headerBorder,
  };

  const dataBaseStyle = {
    font: { name: 'Calibri', sz: 10, color: { rgb: '1E293B' } },
    alignment: { vertical: 'center' },
    border: thinBorder,
  };

  const policyIdStyle = {
    ...dataBaseStyle,
    font: { name: 'Consolas', sz: 10, bold: true, color: { rgb: 'D31145' } },
    alignment: { horizontal: 'center', vertical: 'center' },
  };

  const centerStyle = {
    ...dataBaseStyle,
    alignment: { horizontal: 'center', vertical: 'center' },
  };

  const buyerNameStyle = {
    ...dataBaseStyle,
    font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '0F172A' } },
  };

  const currencyStyle = {
    ...dataBaseStyle,
    alignment: { horizontal: 'right', vertical: 'center' },
    numFmt: '#,##0',
  };

  // Build rows array:
  // Row 0: Title banner
  // Row 1: Subtitle info
  // Row 2: Blank spacer
  // Row 3: Headers
  // Row 4+: Data
  const titleRow = ['BÁO CÁO DANH SÁCH HỢP ĐỒNG ĐANG PHỤC VỤ (AIA POS SERVICES)'];
  const subtitleRow = [
    `Hệ thống hỗ trợ đại lý AIA Việt Nam • Mẫu chuẩn AIA Services • Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`,
  ];
  const emptyRow: string[] = [];
  const headerRow = AIA_EXCEL_COLUMNS.map((c) => c.header);

  const rawRows = [titleRow, subtitleRow, emptyRow, headerRow, ...AIA_SAMPLE_DATA];

  const ws = XLSX.utils.aoa_to_sheet(rawRows);

  // Set column widths
  ws['!cols'] = AIA_EXCEL_COLUMNS.map((c) => ({ wch: c.width }));

  // Set row heights
  ws['!rows'] = [
    { hpt: 30 }, // Row 0 Title
    { hpt: 20 }, // Row 1 Subtitle
    { hpt: 10 }, // Row 2 Blank
    { hpt: 28 }, // Row 3 Table Header
    { hpt: 22 }, // Data rows
    { hpt: 22 },
    { hpt: 22 },
    { hpt: 22 },
    { hpt: 22 },
  ];

  // Merge title and subtitle across all columns (A to K -> 0 to 10)
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: AIA_EXCEL_COLUMNS.length - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: AIA_EXCEL_COLUMNS.length - 1 } },
  ];

  // Style Title (A1) and Subtitle (A2)
  if (ws['A1']) ws['A1'].s = titleStyle;
  if (ws['A2']) ws['A2'].s = subtitleStyle;

  // Style Table Headers (Row 3, 0-indexed: index 3)
  for (let c = 0; c < AIA_EXCEL_COLUMNS.length; c++) {
    const cellRef = XLSX.utils.encode_cell({ r: 3, c });
    if (ws[cellRef]) {
      ws[cellRef].s = tableHeaderStyle;
    }
  }

  // Style Data Rows (Row 4 to 8)
  for (let r = 4; r < 4 + AIA_SAMPLE_DATA.length; r++) {
    const dataIdx = r - 4;
    const rowData = AIA_SAMPLE_DATA[dataIdx];

    for (let c = 0; c < AIA_EXCEL_COLUMNS.length; c++) {
      const cellRef = XLSX.utils.encode_cell({ r, c });
      if (!ws[cellRef]) continue;

      if (c === 0) {
        // Policy ID
        ws[cellRef].s = policyIdStyle;
      } else if (c === 1) {
        // Status
        const val = String(rowData[c]);
        const isPending = val.includes('Tạm hoãn') || val.includes('Chờ');
        ws[cellRef].s = {
          ...centerStyle,
          fill: isPending ? { fgColor: { rgb: 'FFF1F2' } } : undefined,
          font: {
            ...centerStyle.font,
            bold: true,
            color: isPending ? { rgb: 'E11D48' } : { rgb: '0F172A' },
          },
        };
      } else if (c === 3) {
        // Buyer name
        ws[cellRef].s = buyerNameStyle;
      } else if (c === 5) {
        // Premium
        ws[cellRef].s = currencyStyle;
      } else if (c === 6 || c === 7 || c === 8 || c === 9) {
        // Freq, Segment, Phone, CCCD
        ws[cellRef].s = centerStyle;
      } else {
        // Others
        ws[cellRef].s = dataBaseStyle;
      }
    }
  }

  // Append sheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Danh Sách Hợp Đồng AIA');

  // Trigger browser download
  XLSX.writeFile(wb, fileName);
}

/**
 * Reads binary .xlsx or .xls file and returns a 2D matrix of strings.
 */
export async function readExcelFileAsMatrix(file: File): Promise<string[][]> {
  const arrayBuffer = await file.arrayBuffer();
  const wb = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

  if (!wb.SheetNames || wb.SheetNames.length === 0) {
    throw new Error('File Excel không có sheet dữ liệu nào.');
  }

  const firstSheetName = wb.SheetNames[0];
  const ws = wb.Sheets[firstSheetName];

  // Convert to 2D array of rows
  const rawRows = XLSX.utils.sheet_to_json<unknown[]>(ws, {
    header: 1,
    defval: '',
    raw: false, // Ensures formatted values like formatted dates or numbers
  });

  // Normalize all cells to trimmed strings
  const cleanedRows: string[][] = rawRows.map((row) => {
    if (!Array.isArray(row)) return [];
    return row.map((cell) => (cell !== null && cell !== undefined ? String(cell).trim() : ''));
  });

  return cleanedRows;
}
