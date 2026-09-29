import { ClaimType } from '../types/claim';

export interface RequiredDocTemplate {
  id: string;
  name: string;
  required: boolean;
  category: string;
  description: string;
}

export const TOP_HOSPITALS = [
  'BV Vinmec Central Park',
  'BV Chợ Rẫy TP.HCM',
  'BV FV (Pháp Việt)',
  'BV Đại Học Y Dược TP.HCM',
  'BV Bạch Mai',
  'BV Nhi Đồng 1',
  'BV Nhân Dân 115',
  'BV Hoàn Mỹ Sài Gòn',
  'BV Đa Khoa Tâm Anh',
  'BV Huyết Học - Truyền Máu',
];

export const COMMON_DIAGNOSES = [
  'Viêm ruột thừa cấp (đã mổ)',
  'Sốt xuất huyết Dengue có dấu hiệu cảnh báo',
  'Viêm dạ dày - tá tràng cấp tính',
  'Viêm phế quản phổi cấp',
  'Chấn thương phần mềm do ngã',
  'Gãy kín xương cẳng tay do tai nạn',
  'Khám nội soi đại tràng và cắt polyp',
  'Nhiễm khuẩn đường tiêu hóa',
];

export const CLAIM_TYPE_DOC_TEMPLATES: Record<ClaimType, RequiredDocTemplate[]> = {
  inpatient: [
    {
      id: 'doc-inpatient-1',
      name: 'Giấy ra viện (Bản gốc / Mộc tròn BV)',
      required: true,
      category: 'Giấy tờ xuất viện',
      description: 'Ghi rõ ngày nhập viện, xuất viện và chẩn đoán ra viện có mộc đỏ',
    },
    {
      id: 'doc-inpatient-2',
      name: 'Bảng kê chi tiết viện phí (Mẫu 01/02)',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Bảng kê bóc tách chi tiết giường bệnh, thuốc, thủ thuật',
    },
    {
      id: 'doc-inpatient-3',
      name: 'Hóa đơn điện tử VAT / Biên lai thu tiền',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn GTGT hoặc biên nhận thu tiền có mã tra cứu hoá đơn',
    },
    {
      id: 'doc-inpatient-4',
      name: 'Giấy chứng nhận phẫu thuật (nếu có mổ)',
      required: false,
      category: 'Phẫu thuật',
      description: 'Nếu có phẫu thuật/thủ thuật gây tê hoặc gây mê',
    },
  ],
  hospital_cash: [
    {
      id: 'doc-hc-1',
      name: 'Giấy ra viện (Mộc đỏ bệnh viện)',
      required: true,
      category: 'Giấy tờ xuất viện',
      description: 'Căn cứ tính số ngày nằm viện thực tế để chi trả trợ cấp',
    },
    {
      id: 'doc-hc-2',
      name: 'Bảng kê chi phí điều trị',
      required: false,
      category: 'Tài chính viện phí',
      description: 'Chứng minh có nằm viện điều trị thực tế',
    },
  ],
  outpatient: [
    {
      id: 'doc-outpatient-1',
      name: 'Sổ khám bệnh / Toa thuốc bác sĩ',
      required: true,
      category: 'Khám bệnh',
      description: 'Có chữ ký bác sĩ điều trị và chẩn đoán bệnh',
    },
    {
      id: 'doc-outpatient-2',
      name: 'Hóa đơn tiền khám, tiền thuốc VAT',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn mua thuốc theo đơn và phiếu thu khám',
    },
    {
      id: 'doc-outpatient-3',
      name: 'Kết quả xét nghiệm / Chẩn đoán hình ảnh',
      required: false,
      category: 'Xét nghiệm',
      description: 'Phiếu siêu âm, xét nghiệm máu, chụp X-quang liên quan',
    },
  ],
  accident_injury: [
    {
      id: 'doc-accident-1',
      name: 'Bản tường trình tai nạn / Biên bản công an',
      required: true,
      category: 'Hồ sơ sự cố',
      description: 'Mô tả rõ thời gian, địa điểm, nguyên nhân diễn ra tai nạn',
    },
    {
      id: 'doc-accident-2',
      name: 'Toa thuốc / Bệnh án xử lý chấn thương ban đầu',
      required: true,
      category: 'Y tế chấn thương',
      description: 'Chứng từ xử lý cấp cứu, bó bột, khâu vết thương',
    },
    {
      id: 'doc-accident-3',
      name: 'Kết quả chụp X-Quang / CT chấn thương',
      required: true,
      category: 'Chẩn đoán hình ảnh',
      description: 'Phim hoặc kết quả đọc chẩn đoán tổn thương',
    },
    {
      id: 'doc-accident-4',
      name: 'Hóa đơn tài chính điều trị tai nạn',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn chi phí thuốc men, viện phí cấp cứu',
    },
  ],
  critical_illness: [
    {
      id: 'doc-ci-1',
      name: 'Tóm tắt hồ sơ bệnh án / Bệnh án trích sao',
      required: true,
      category: 'Bệnh án chuyên sâu',
      description: 'Bản trích sao hồ sơ bệnh án đóng dấu tròn bệnh viện',
    },
    {
      id: 'doc-ci-2',
      name: 'Kết quả giải phẫu bệnh lý / Sinh thiết mô',
      required: true,
      category: 'Xét nghiệm mô học',
      description: 'Kết quả sinh thiết tế bào học hoặc giải phẫu bệnh',
    },
    {
      id: 'doc-ci-3',
      name: 'Kết quả xét nghiệm chuyên sâu & Chẩn đoán hình ảnh',
      required: true,
      category: 'Xét nghiệm',
      description: 'MRI, CT-Scan, xét nghiệm chỉ số sinh hóa đặc hiệu',
    },
  ],
  day_treatment: [
    {
      id: 'doc-day-1',
      name: 'Giấy chứng nhận điều trị trong ngày',
      required: true,
      category: 'Chứng từ điều trị',
      description: 'Giấy ra viện hoặc phiếu điều trị nội trú ban ngày',
    },
    {
      id: 'doc-day-2',
      name: 'Bảng kê chi phí điều trị trong ngày',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Chi tiết các dịch vụ kỹ thuật đã sử dụng',
    },
    {
      id: 'doc-day-3',
      name: 'Hóa đơn GTGT viện phí',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn thanh toán chính thức',
    },
  ],
  dental: [
    {
      id: 'doc-dental-1',
      name: 'Sổ khám nha khoa & Phiếu chỉ định điều trị',
      required: true,
      category: 'Nha khoa',
      description: 'Ghi rõ vị trí răng và phác đồ điều trị',
    },
    {
      id: 'doc-dental-2',
      name: 'Hóa đơn GTGT điều trị nha khoa',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn thanh toán hợp lệ',
    },
  ],
  maternity: [
    {
      id: 'doc-mat-1',
      name: 'Giấy ra viện hoặc Giấy chứng sinh',
      required: true,
      category: 'Chứng từ xuất viện',
      description: 'Giấy ra viện sau sinh hoặc giấy chứng sinh có mộc BV',
    },
    {
      id: 'doc-mat-2',
      name: 'Bảng kê chi phí sinh & Hóa đơn viện phí',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Bảng kê chi phí sinh thường / sinh mổ',
    },
  ],
  total_permanent_disability: [
    {
      id: 'doc-tpd-1',
      name: 'Biên bản giám định y khoa tỷ lệ thương tật (≥ 81%)',
      required: true,
      category: 'Giám định y khoa',
      description: 'Kết luận từ Hội đồng giám định y khoa cấp tỉnh/thành',
    },
    {
      id: 'doc-tpd-2',
      name: 'Toàn bộ hồ sơ bệnh án điều trị tai nạn/bệnh tật',
      required: true,
      category: 'Bệnh án',
      description: 'Bản sao y có mộc bệnh viện',
    },
  ],
  pre_admission: [
    {
      id: 'doc-pre-1',
      name: 'Phiếu khám và xét nghiệm trước nhập viện',
      required: true,
      category: 'Khám bệnh',
      description: 'Các xét nghiệm thực hiện trong vòng 30 ngày trước nhập viện',
    },
    {
      id: 'doc-pre-2',
      name: 'Hóa đơn viện phí điều trị trước nhập viện',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn điện tử hợp lệ',
    },
  ],
  post_discharge: [
    {
      id: 'doc-post-1',
      name: 'Sổ tái khám / Toa thuốc sau xuất viện',
      required: true,
      category: 'Tái khám',
      description: 'Tái khám trong vòng 30 - 90 ngày sau khi ra viện',
    },
    {
      id: 'doc-post-2',
      name: 'Hóa đơn viện phí tái khám',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn thuốc và công khám',
    },
  ],
  death: [
    {
      id: 'doc-death-1',
      name: 'Trích lục khai tử (Bản sao chứng thực)',
      required: true,
      category: 'Pháp lý',
      description: 'Do UBND xã/phường nơi cư trú cấp',
    },
    {
      id: 'doc-death-2',
      name: 'Giấy báo tử của Bệnh viện hoặc Kết luận điều tra',
      required: true,
      category: 'Y tế / Pháp lý',
      description: 'Nêu rõ nguyên nhân tử vong',
    },
    {
      id: 'doc-death-3',
      name: 'Văn bản xác định người thừa kế hợp pháp',
      required: true,
      category: 'Pháp lý',
      description: 'Giấy tờ chứng minh quyền thụ hưởng bồi thường',
    },
  ],
  surgery: [
    {
      id: 'doc-surg-1',
      name: 'Giấy chứng nhận phẫu thuật / Trích sao bệnh án',
      required: true,
      category: 'Phẫu thuật',
      description: 'Mô tả chi tiết phương pháp mổ, chẩn đoán trước và sau mổ',
    },
    {
      id: 'doc-surg-2',
      name: 'Giấy ra viện & Bảng kê chi phí phẫu thuật',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Chi phí giường, thuốc gây mê và phẫu thuật viên',
    },
    {
      id: 'doc-surg-3',
      name: 'Hóa đơn VAT viện phí',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Hóa đơn điện tử có mã tra cứu',
    },
  ],
  medical_expense: [
    {
      id: 'doc-med-1',
      name: 'Hóa đơn viện phí / Biên lai thu phí',
      required: true,
      category: 'Tài chính viện phí',
      description: 'Biên lai viện phí hợp lệ',
    },
    {
      id: 'doc-med-2',
      name: 'Toa thuốc và Sổ khám bệnh',
      required: true,
      category: 'Y bạ',
      description: 'Chỉ định của bác sĩ',
    },
  ],
  accident: [
    {
      id: 'doc-acc-leg-1',
      name: 'Biên bản tai nạn & Toa thuốc điều trị',
      required: true,
      category: 'Tai nạn',
      description: 'Xác nhận sự việc tai nạn và điều trị ban đầu',
    },
    {
      id: 'doc-acc-leg-2',
      name: 'Hóa đơn viện phí & Phim chụp',
      required: true,
      category: 'Tài chính & Hình ảnh',
      description: 'Chi phí phục hồi chấn thương',
    },
  ],
};

export const getRequiredDocsForClaimType = (type: ClaimType): RequiredDocTemplate[] => {
  return CLAIM_TYPE_DOC_TEMPLATES[type] || CLAIM_TYPE_DOC_TEMPLATES.inpatient;
};

export const generateMissingDocZaloMessage = (params: {
  customerName: string;
  claimId: string;
  policyNumber: string;
  hospitalName: string;
  missingDocs: string[];
  consultantName?: string;
  consultantPhone?: string;
}): string => {
  const { customerName, claimId, policyNumber, hospitalName, missingDocs, consultantName = 'Dương Như Ý', consultantPhone = '0908 123 456' } = params;
  
  const docList = missingDocs.map((d, i) => `${i + 1}. ${d}`).join('\n');

  return `Kính gửi Anh/Chị ${customerName},

Em là ${consultantName} - Quản lý Hợp đồng AIA của Anh/Chị.

Hồ sơ yêu cầu quyền lợi bảo hiểm ${claimId} (HĐ: ${policyNumber}) điều trị tại ${hospitalName || 'Bệnh viện'} của Anh/Chị hiện đang được em hoàn tất để nộp sang Ban Thẩm định AIA iClaim.

Để hồ sơ được duyệt nhanh và chi trả sớm nhất, Anh/Chị vui lòng chụp bổ sung giúp em các chứng từ sau:
${docList}

📌 Lưu ý nhỏ:
- Anh/Chị chụp rõ 4 góc, đủ sáng, thấy rõ dấu mộc đỏ và chữ ký của Bác sĩ.
- Có thể gửi trực tiếp hình ảnh qua Zalo này cho em nhé.

Em cảm ơn Anh/Chị!
Hotline hỗ trợ: ${consultantPhone}`;
};

export const generateClaimSubmittedZaloMessage = (params: {
  customerName: string;
  claimId: string;
  policyNumber: string;
  claimedAmount: string;
  consultantName?: string;
}): string => {
  const { customerName, claimId, policyNumber, claimedAmount, consultantName = 'Dương Như Ý' } = params;

  return `Kính gửi Anh/Chị ${customerName},

Em là ${consultantName} (AIA). Em xin thông báo hồ sơ quyền lợi bảo hiểm ${claimId} (Hợp đồng: ${policyNumber}) với số tiền yêu cầu ${claimedAmount} đã được em nộp thành công lên Cổng thẩm định AIA iClaim!

⏱ Thời gian xử lý dự kiến: 2 - 3 ngày làm việc.
Khi có kết quả phê duyệt và chuyển khoản bồi thường, em sẽ nhắn tin và cập nhật ngay cho Anh/Chị.

Cần hỗ trợ bất kỳ thông tin nào, Anh/Chị cứ liên hệ em nhé!`;
};
