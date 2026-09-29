import { ClaimItem, CLAIM_TYPE_LABELS } from '../types/claim';
import { formatCurrencyVND, formatDate } from './formatters';

/**
 * Sinh mẫu thông báo trang trọng, chuẩn mực gửi khách hàng qua Zalo hoặc SMS.
 * Tuyệt đối không dùng emoji kiểu AI hoặc câu từ sến sẩm.
 */
export function generateCustomerMessage(claim: ClaimItem): string {
  const customerName = claim.insuredPersonName || claim.customerName;
  const benefitLabel = CLAIM_TYPE_LABELS[claim.claimType] || claim.claimType;
  const formattedAmount = formatCurrencyVND(claim.approvedAmount > 0 ? claim.approvedAmount : claim.claimedAmount);
  const formattedClaimed = formatCurrencyVND(claim.claimedAmount);
  const bankInfo = claim.bankAccount
    ? `${claim.bankAccount.bankName} (STK: ${claim.bankAccount.accountNumber})`
    : 'tài khoản ngân hàng của Quý khách';

  switch (claim.status) {
    case 'paid':
      return [
        `Kính gửi Quý khách ${customerName},`,
        ``,
        `Công ty Bảo hiểm đã hoàn tất phê duyệt và chi trả quyền lợi ${benefitLabel} cho hợp đồng bảo hiểm số ${claim.policyNumber}.`,
        `- Số tiền chi trả: ${formattedAmount}`,
        `- Hình thức nhận: Chuyển khoản trực tiếp vào ${bankInfo}`,
        `- Bệnh viện tiếp nhận: ${claim.hospitalName}`,
        claim.deductedAmount && claim.deductedAmount > 0
          ? `- Số tiền giảm trừ: ${formatCurrencyVND(claim.deductedAmount)} (${claim.deductionReason || 'Theo điều khoản đồng chi trả/hạn mức hợp đồng'})`
          : '',
        ``,
        `Kính chúc Quý khách và gia đình luôn dồi dào sức khỏe và bình an.`,
        `Đại lý phục vụ: ${claim.agentName} (Mã số: ${claim.agentCode})`
      ].filter(Boolean).join('\n');

    case 'approved':
      return [
        `Kính gửi Quý khách ${customerName},`,
        ``,
        `Hồ sơ yêu cầu bồi thường quyền lợi ${benefitLabel} của hợp đồng số ${claim.policyNumber} đã được phê duyệt chi trả ${formattedAmount}.`,
        `Lệnh chuyển tiền đang được xử lý và dự kiến sẽ về ${bankInfo} trong vòng 24 giờ làm việc.`,
        ``,
        `Trân trọng thông báo.`,
        `Đại lý phục vụ: ${claim.agentName}`
      ].join('\n');

    case 'pending_docs':
      return [
        `Kính gửi Quý khách ${customerName},`,
        ``,
        `Liên quan đến hồ sơ bồi thường quyền lợi ${benefitLabel} tại ${claim.hospitalName} (HĐ số ${claim.policyNumber}):`,
        `Phòng thẩm định bồi thường đề nghị bổ sung thêm chứng từ y tế:`,
        `-> ${claim.deductionReason || claim.notes || 'Hóa đơn VAT gốc / Bảng kê chi tiết viện phí có mộc tròn đỏ'}`,
        `- Thời hạn bổ sung trước ngày: ${formatDate(claim.slaDeadline)}`,
        ``,
        `Kính nhờ Quý khách hỗ trợ gửi lại sớm để tránh gián đoạn tiến độ chi trả.`,
        `Trân trọng cảm ơn Quý khách.`
      ].join('\n');

    case 'rejected':
      return [
        `Kính gửi Quý khách ${customerName},`,
        ``,
        `Công ty Bảo hiểm đã có thông báo kết quả thẩm định quyền lợi ${benefitLabel} của hợp đồng số ${claim.policyNumber} khám tại ${claim.hospitalName} ngày ${formatDate(claim.admissionDate)}.`,
        `Theo điều khoản quy tắc hợp đồng, hồ sơ này chưa đủ điều kiện chi trả với lý do:`,
        `-> ${claim.deductionReason || 'Thuộc phạm vi điều khoản loại trừ hoặc không thuộc phạm vi quyền lợi hợp đồng'}`,
        ``,
        `Đại lý sẽ liên hệ trực tiếp để chuyển bản công văn giải thích chi tiết và hỗ trợ Quý khách làm rõ các quyền lợi liên quan.`,
        `Trân trọng kính báo.`
      ].join('\n');

    case 'underwriting':
    default:
      return [
        `Kính gửi Quý khách ${customerName},`,
        ``,
        `Hồ sơ yêu cầu bồi thường quyền lợi ${benefitLabel} của Quý khách (HĐ số ${claim.policyNumber}) với số tiền yêu cầu ${formattedClaimed} đã được tiếp nhận và chuyển sang ban giám định y khoa.`,
        `- Cơ sở y tế: ${claim.hospitalName}`,
        `- Ngày khám/vào viện: ${formatDate(claim.admissionDate)}`,
        `- Thời gian thẩm định tiêu chuẩn: 3 - 5 ngày làm việc`,
        ``,
        `Đại lý sẽ chủ động theo dõi và cập nhật ngay khi có kết quả chi trả.`,
        `Trân trọng cảm ơn Quý khách.`
      ].join('\n');
  }
}
