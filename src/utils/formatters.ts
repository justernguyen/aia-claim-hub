/**
 * Định dạng tiền tệ VND với dấu chấm ngăn cách hàng nghìn
 * Ví dụ: 952445 -> "952.445 đ"
 */
export function formatCurrencyVND(amount: number): string {
  if (isNaN(amount) || amount === 0) return '0 đ';
  const formatted = new Intl.NumberFormat('vi-VN').format(amount);
  return `${formatted} đ`;
}

/**
 * Định dạng tiền tệ vắn tắt (triệu đồng / tỷ đồng) cho Metric Cards
 * Ví dụ: 154800000 -> "154.8 tr đ"
 */
export function formatShortCurrency(amount: number): string {
  if (isNaN(amount) || amount === 0) return '0 đ';
  if (amount >= 1_000_000_000) {
    const b = (amount / 1_000_000_000).toFixed(1).replace('.0', '');
    return `${b} tỷ đ`;
  }
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(1).replace('.0', '');
    return `${m} tr đ`;
  }
  return formatCurrencyVND(amount);
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
