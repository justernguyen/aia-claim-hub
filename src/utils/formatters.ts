/**
 * Định dạng tiền tệ VND với dấu chấm ngăn cách hàng nghìn
 * Ví dụ: 952445 -> "952.445 đ"
 */
export function formatCurrencyVND(amount: number): string {
  if (isNaN(amount) || amount === 0) return '0\u00A0₫';
  const formatted = new Intl.NumberFormat('vi-VN').format(amount);
  return `${formatted}\u00A0₫`;
}

/**
 * Định dạng tiền tệ vắn tắt (triệu / tỷ đồng) cho Metric Cards
 * Chuẩn tiếng Việt: dấu phẩy phân cách thập phân và đơn vị rõ ràng
 * Ví dụ: 154800000 -> "154,8 triệu", 1200000000 -> "1,2 tỷ"
 */
export function formatShortCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) return '0\u00A0₫';
  if (amount >= 1_000_000_000) {
    const b = (amount / 1_000_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `${b}\u00A0tỷ`;
  }
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `${m}\u00A0triệu`;
  }
  return formatCurrencyVND(amount);
}

/**
 * Định dạng tiền tệ dạng ngắn gọn trực quan (26 tr, 224 tr, 250 tr, 0 đ)
 */
export function formatCompactVND(amount: number): string {
  if (isNaN(amount) || amount === 0) return '0\u00A0₫';
  if (amount >= 1_000_000_000) {
    const b = (amount / 1_000_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `${b}\u00A0tỷ`;
  }
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',');
    return `${m}\u00A0tr`;
  }
  if (amount >= 1_000) {
    const k = (amount / 1_000).toFixed(0);
    return `${k}\u00A0k`;
  }
  return `${amount}\u00A0₫`;
}

/**
 * Định dạng số Căn cước công dân (CCCD) thành từng cụm 3 số dễ đọc:
 * Ví dụ: "079198002341" -> "079 198 002 341"
 */
export function formatCCCD(cccd?: string | null, isMasked = false): string {
  if (!cccd) return '--';
  const clean = cccd.replace(/\s+/g, '');
  if (clean.length === 12) {
    if (isMasked) {
      return `${clean.slice(0, 3)} ••• ••• ${clean.slice(9, 12)}`;
    }
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)} ${clean.slice(9, 12)}`;
  }
  if (clean.length === 9) {
    if (isMasked) {
      return `${clean.slice(0, 3)} ••• ${clean.slice(6, 9)}`;
    }
    return `${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6, 9)}`;
  }
  if (isMasked && clean.length > 4) {
    return `${clean.slice(0, 2)}••••${clean.slice(-2)}`;
  }
  return cccd;
}

/**
 * Định dạng số điện thoại theo chuẩn 4-3-3:
 * Ví dụ: "0912345678" -> "0912 345 678"
 * Chế độ che mờ: "0912 ••• 678"
 */
export function formatPhone(phone?: string | null, isMasked = false): string {
  if (!phone) return '--';
  const clean = phone.replace(/\s+/g, '');
  if (clean.length === 10) {
    if (isMasked) {
      return `${clean.slice(0, 4)} ••• ${clean.slice(7, 10)}`;
    }
    return `${clean.slice(0, 4)} ${clean.slice(4, 7)} ${clean.slice(7, 10)}`;
  }
  if (isMasked && clean.length > 4) {
    return `${clean.slice(0, 3)}•••${clean.slice(-2)}`;
  }
  return phone;
}

/**
 * Che mờ chuỗi văn bản bất kỳ (ví dụ số tài khoản hoặc thông tin nhạy cảm)
 */
export function maskText(text?: string | null, startChars = 3, endChars = 3): string {
  if (!text) return '--';
  const clean = text.trim();
  if (clean.length <= startChars + endChars) return clean;
  return `${clean.slice(0, startChars)}••••${clean.slice(-endChars)}`;
}

/**
 * Định dạng ngày tháng hiển thị DD/MM/YYYY
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '--';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
}

/**
 * Tính số ngày còn lại theo hạn chót SLA
 */
export function getRemainingDays(deadlineStr?: string): number | null {
  if (!deadlineStr) return null;
  const deadline = new Date(deadlineStr);
  const now = new Date('2026-09-29'); // Reference current system date
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Định dạng số nhập liệu thời gian thực có dấu chấm phân cách hàng nghìn (chuẩn vi-VN)
 * Ví dụ: 25000000 hoặc "25000000" -> "25.000.000"
 */
export function formatNumberInput(value: string | number | undefined | null): string {
  if (value === undefined || value === null || value === '') return '';
  const str = typeof value === 'number' ? Math.round(value).toString() : String(value);
  const digits = str.replace(/\D/g, '');
  if (!digits) return '';
  return new Intl.NumberFormat('vi-VN').format(Number(digits));
}

/**
 * Chuyển chuỗi đã định dạng dấu chấm về số nguyên
 * Ví dụ: "25.000.000" -> 25000000
 */
export function parseNumberInput(value: string | number | undefined | null): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (!value) return 0;
  return Number(String(value).replace(/\D/g, '')) || 0;
}

/**
 * Diễn giải số tiền thành chữ ngắn gọn (triệu / tỷ đồng) giúp đối soát nhầm lẫn số 0
 * Ví dụ: 25000000 -> "25 triệu đồng", 1000000000 -> "1 tỷ đồng"
 */
export function formatWordsVND(amount: number): string {
  if (!amount || isNaN(amount) || amount <= 0) return '';
  if (amount >= 1_000_000_000) {
    const val = amount / 1_000_000_000;
    return `${val.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} tỷ đồng`;
  }
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000;
    return `${val.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} triệu đồng`;
  }
  if (amount >= 1_000) {
    const val = amount / 1_000;
    return `${val.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} nghìn đồng`;
  }
  return `${new Intl.NumberFormat('vi-VN').format(amount)} đồng`;
}
