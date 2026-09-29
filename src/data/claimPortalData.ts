import { ClaimType } from '../types/claim';

export interface BenefitDefinition {
  id: ClaimType;
  title: string;
  description: string;
  tooltip: string;
  recommendedDocs: string[];
}

export interface DocumentCategoryDefinition {
  id: string;
  label: string;
  required: boolean;
  tooltip?: string;
}

export const AIA_11_BENEFITS: BenefitDefinition[] = [
  {
    id: 'inpatient',
    title: 'Điều trị nội trú',
    description: 'Nằm viện điều trị qua đêm tại bệnh viện',
    tooltip: 'Chi trả chi phí tiền phòng, phẫu thuật và chăm sóc y tế trong thời gian lưu viện.',
    recommendedDocs: ['Giấy ra viện', 'Hóa đơn viện phí / Bảng kê', 'Bảng kê thanh toán ra viện'],
  },
  {
    id: 'outpatient',
    title: 'Điều trị ngoại trú',
    description: 'Khám và điều trị trong ngày không nhập viện',
    tooltip: 'Chi phí khám bệnh, xét nghiệm cận lâm sàng và thuốc theo toa của bác sĩ.',
    recommendedDocs: ['Hóa đơn viện phí', 'Sổ khám bệnh/Toa thuốc', 'Bảng kê thanh toán ra viện'],
  },
  {
    id: 'critical_illness',
    title: 'Bệnh hiểm nghèo',
    description: 'Quyền lợi chẩn đoán mắc bệnh hiểm nghèo',
    tooltip: 'Chi trả theo danh mục 68 bệnh hiểm nghèo AIA (Ung thư, Đột quỵ, Nhồi máu cơ tim...).',
    recommendedDocs: ['Kết quả giải phẫu bệnh', 'Hồ sơ bệnh án chi tiết', 'Giấy xác nhận chẩn đoán'],
  },
  {
    id: 'pre_admission',
    title: 'Điều trị trước nhập viện',
    description: 'Chi phí khám trước khi nhập viện trong 30 ngày',
    tooltip: 'Chi phí khám, xét nghiệm liên quan trực tiếp đến đợt nằm viện phát sinh trong 30 ngày trước đó.',
    recommendedDocs: ['Hóa đơn viện phí', 'Toa thuốc / Chỉ định xét nghiệm'],
  },
  {
    id: 'day_treatment',
    title: 'Điều trị trong ngày',
    description: 'Phẫu thuật / thủ thuật không lưu trú qua đêm',
    tooltip: 'Thủ thuật y khoa hoặc tiểu phẫu tại bệnh viện/phòng khám được chỉ định điều trị trong ngày.',
    recommendedDocs: ['Giấy chứng nhận thủ thuật/phẫu thuật', 'Hóa đơn viện phí'],
  },
  {
    id: 'maternity',
    title: 'Khám thai',
    description: 'Quyền lợi chăm sóc thai sản định kỳ & sinh con',
    tooltip: 'Chi phí khám thai định kỳ, sinh thường, sinh mổ hoặc biến chứng thai sản.',
    recommendedDocs: ['Sổ khám thai', 'Giấy chứng sinh / Giấy ra viện', 'Hóa đơn viện phí'],
  },
  {
    id: 'total_permanent_disability',
    title: 'Tàn tật toàn bộ và vĩnh viễn',
    description: 'Thương tật mất sức lao động vĩnh viễn',
    tooltip: 'Chi trả quyền lợi mất sức lao động từ 81% trở lên hoặc mất hai chi/thị lực.',
    recommendedDocs: ['Biên bản giám định y khoa', 'Hồ sơ bệnh án giám định thương tật'],
  },
  {
    id: 'post_discharge',
    title: 'Điều trị sau xuất viện',
    description: 'Tái khám & thuốc trong vòng 60 ngày sau ra viện',
    tooltip: 'Chi phí tái khám, xét nghiệm và thuốc theo chỉ định trực tiếp từ giấy ra viện.',
    recommendedDocs: ['Giấy hẹn tái khám', 'Toa thuốc tái khám', 'Hóa đơn viện phí'],
  },
  {
    id: 'dental',
    title: 'Nha khoa',
    description: 'Khám, trám răng, nhổ răng và bệnh lý răng miệng',
    tooltip: 'Chi phí điều trị nha khoa bệnh lý theo danh mục bảo hiểm bổ sung.',
    recommendedDocs: ['Phiếu khám nha khoa', 'Phim X-quang răng', 'Hóa đơn dịch vụ'],
  },
  {
    id: 'accident_injury',
    title: 'Thương tật do tai nạn',
    description: 'Chấn thương phát sinh do tai nạn',
    tooltip: 'Chi phí y tế điều trị vết thương, gãy xương và thương tật do tai nạn sinh hoạt/giao thông.',
    recommendedDocs: ['Biên bản tai nạn (nếu có)', 'Giấy chứng nhận thương tích', 'Hóa đơn điều trị'],
  },
  {
    id: 'death',
    title: 'Tử vong',
    description: 'Giải quyết quyền lợi bảo hiểm tử vong',
    tooltip: 'Hồ sơ yêu cầu bồi thường tử vong cho Người thụ hưởng hợp đồng bảo hiểm AIA.',
    recommendedDocs: ['Trích lục khai tử', 'Biên bản giám định tử thi (nếu có)', 'Hồ sơ chứng minh thừa kế'],
  },
];

export const DOCUMENT_CATEGORIES_BY_BENEFIT: Record<ClaimType, DocumentCategoryDefinition[]> = {
  outpatient: [
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'prescription', label: 'Sổ khám bệnh/Toa thuốc', required: true },
    { id: 'settlement', label: 'Bảng kê thanh toán ra viện', required: false, tooltip: 'Bảng kê chi tiết các khoản mục thuốc và dịch vụ' },
    { id: 'other', label: 'Các chứng từ khác', required: false },
    { id: 'surgery_cert', label: 'Giấy chứng nhận phẫu thuật/thủ thuật', required: false },
  ],
  inpatient: [
    { id: 'discharge_cert', label: 'Giấy ra viện', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí / VAT', required: true },
    { id: 'settlement', label: 'Bảng kê thanh toán ra viện', required: true, tooltip: 'Bảng kê viện phí chi tiết theo đợt nằm viện' },
    { id: 'surgery_cert', label: 'Giấy chứng nhận phẫu thuật/thủ thuật', required: false },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  critical_illness: [
    { id: 'biopsy', label: 'Kết quả giải phẫu bệnh / Sinh thiết', required: true },
    { id: 'discharge_cert', label: 'Tóm tắt bệnh án / Giấy ra viện', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí', required: false },
    { id: 'other', label: 'Các xét nghiệm chuyên sâu khác', required: false },
  ],
  pre_admission: [
    { id: 'invoice', label: 'Hóa đơn viện phí khám trước nhập viện', required: true },
    { id: 'prescription', label: 'Toa thuốc / Chỉ định xét nghiệm', required: true },
    { id: 'discharge_ref', label: 'Giấy ra viện đợt kế tiếp để đối chiếu', required: false },
  ],
  day_treatment: [
    { id: 'surgery_cert', label: 'Giấy chứng nhận phẫu thuật/thủ thuật trong ngày', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'settlement', label: 'Bảng kê chi tiết thủ thuật', required: false },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  maternity: [
    { id: 'discharge_cert', label: 'Giấy ra viện / Giấy chứng sinh', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'settlement', label: 'Bảng kê thanh toán chi tiết', required: true },
    { id: 'pregnancy_book', label: 'Sổ theo dõi khám thai', required: false },
  ],
  total_permanent_disability: [
    { id: 'disability_board', label: 'Biên bản giám định y khoa thương tật', required: true },
    { id: 'medical_record', label: 'Hồ sơ bệnh án điều trị ban đầu', required: true },
    { id: 'other', label: 'Hình ảnh thương tật / Tài liệu liên quan', required: false },
  ],
  post_discharge: [
    { id: 'follow_up_note', label: 'Giấy hẹn tái khám / Đơn thuốc tái khám', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí tái khám', required: true },
    { id: 'discharge_ref', label: 'Giấy ra viện của đợt nằm viện trước', required: false },
  ],
  dental: [
    { id: 'dental_exam', label: 'Phiếu khám nha khoa / Sơ đồ răng', required: true },
    { id: 'invoice', label: 'Hóa đơn tài chính nha khoa', required: true },
    { id: 'xray', label: 'Phim X-quang răng (nếu nhổ răng/tiểu phẫu)', required: false },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  accident_injury: [
    { id: 'accident_report', label: 'Biên bản tai nạn / Bản tường trình tai nạn', required: true },
    { id: 'injury_cert', label: 'Giấy chứng nhận thương tích / Phiếu cấp cứu', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'xray_scan', label: 'Kết quả X-quang, CT, MRI chấn thương', required: false },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  death: [
    { id: 'death_cert', label: 'Trích lục khai tử (bản sao y công chứng)', required: true },
    { id: 'id_claimant', label: 'CCCD người thụ hưởng / Người yêu cầu', required: true },
    { id: 'inheritance_proof', label: 'Văn bản chứng minh quyền thừa kế hợp pháp', required: true },
    { id: 'medical_record', label: 'Hồ sơ bệnh án đợt điều trị cuối cùng', required: false },
  ],
  // Fallback aliases
  hospital_cash: [
    { id: 'discharge_cert', label: 'Giấy ra viện', required: true },
    { id: 'settlement', label: 'Bảng kê thanh toán ra viện', required: true },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  surgery: [
    { id: 'surgery_cert', label: 'Giấy chứng nhận phẫu thuật', required: true },
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'discharge_cert', label: 'Giấy ra viện', required: true },
  ],
  medical_expense: [
    { id: 'invoice', label: 'Hóa đơn viện phí', required: true },
    { id: 'prescription', label: 'Sổ khám bệnh/Toa thuốc', required: true },
    { id: 'settlement', label: 'Bảng kê thanh toán ra viện', required: false },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
  accident: [
    { id: 'accident_report', label: 'Tường trình tai nạn', required: true },
    { id: 'invoice', label: 'Hóa đơn điều trị', required: true },
    { id: 'other', label: 'Các chứng từ khác', required: false },
  ],
};

export interface ICD10Item {
  code: string;
  name: string;
  category: string;
}

export const COMMON_ICD10_CODES: ICD10Item[] = [
  { code: 'K29', name: 'Viêm dạ dày và tá tràng', category: 'Tiêu hóa' },
  { code: 'A09', name: 'Tiêu chảy và viêm dạ dày - ruột truyền nhiễm', category: 'Nhiễm khuẩn' },
  { code: 'J06', name: 'Nhiễm khuẩn đường hô hấp trên cấp tính', category: 'Hô hấp' },
  { code: 'J18', name: 'Viêm phổi, tác nhân không xác định', category: 'Hô hấp' },
  { code: 'J20', name: 'Viêm phế quản cấp', category: 'Hô hấp' },
  { code: 'I10', name: 'Tăng huyết áp vô căn (nguyên phát)', category: 'Tim mạch' },
  { code: 'E11', name: 'Đái tháo đường không phụ thuộc insulin (Type 2)', category: 'Nội tiết' },
  { code: 'S06', name: 'Chấn thương nội sọ / Chấn thương đầu', category: 'Chấn thương' },
  { code: 'S82', name: 'Gãy xương cẳng chân, bao gồm mắt cá', category: 'Chấn thương' },
  { code: 'K35', name: 'Viêm ruột thừa cấp', category: 'Tiêu hóa' },
  { code: 'N20', name: 'Sỏi thận và sỏi niệu quản', category: 'Tiết niệu' },
  { code: 'C34', name: 'Khối u ác tính của phế quản và phổi', category: 'Ung bướu' },
  { code: 'M51', name: 'Thoát vị đĩa đệm cột sống khác', category: 'Cơ xương khớp' },
  { code: 'O80', name: 'Sinh thường một thai đơn', category: 'Sản khoa' },
  { code: 'O82', name: 'Sinh mổ lấy thai', category: 'Sản khoa' },
  { code: 'K02', name: 'Sâu răng', category: 'Nha khoa' },
  { code: 'K05', name: 'Viêm nướu và bệnh nha chu', category: 'Nha khoa' },
  { code: 'B34', name: 'Nhiễm virus không xác định / Sốt siêu vi', category: 'Nhiễm khuẩn' },
  { code: 'A90', name: 'Sốt xuất huyết Dengue', category: 'Nhiễm khuẩn' },
  { code: 'H10', name: 'Viêm kết mạc', category: 'Mắt' },
  { code: 'L20', name: 'Viêm da cơ địa / Eczema dị ứng', category: 'Da liễu' },
  { code: 'R10', name: 'Đau bụng và đau vùng chậu', category: 'Triệu chứng chung' },
];

export const VIETNAM_PROVINCES: string[] = [
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Bình Dương',
  'Đồng Nai',
  'Cần Thơ',
  'Hải Phòng',
  'Khánh Hòa',
  'Bà Rịa - Vũng Tàu',
  'Thừa Thiên Huế',
  'Quảng Ninh',
  'Nghệ An',
  'Lâm Đồng',
  'Bình Định',
  'Kiên Giang',
  'Thanh Hóa',
];

export const POPULAR_HOSPITALS: Record<string, string[]> = {
  'TP. Hồ Chí Minh': [
    'Bệnh viện Đa khoa Quốc tế Vinmec Central Park',
    'Bệnh viện Chợ Rẫy',
    'Bệnh viện Đại học Y Dược TP.HCM',
    'Bệnh viện FV (Pháp - Việt)',
    'Bệnh viện Nhân Dân 115',
    'Bệnh viện Từ Dũ',
    'Bệnh viện Nhi Đồng 1',
    'Bệnh viện Tai Mũi Họng TP.HCM',
    'Bệnh viện Răng Hàm Mặt Trung Ương TP.HCM',
    'Bệnh viện Đa khoa Tâm Anh TP.HCM',
    'Bệnh viện Gia An 115',
  ],
  'Hà Nội': [
    'Bệnh viện Đa khoa Quốc tế Vinmec Times City',
    'Bệnh viện Bạch Mai',
    'Bệnh viện Hữu nghị Việt Đức',
    'Bệnh viện Đại học Y Hà Nội',
    'Bệnh viện Hồng Ngọc',
    'Bệnh viện Đa khoa Quốc tế Thu Cúc',
    'Bệnh viện Phụ sản Trung Ương',
    'Bệnh viện Nhi Trung Ương',
    'Bệnh viện K Trung Ương',
  ],
  'Đà Nẵng': [
    'Bệnh viện Đa khoa Quốc tế Vinmec Đà Nẵng',
    'Bệnh viện Đà Nẵng',
    'Bệnh viện Hoàn Mỹ Đà Nẵng',
    'Bệnh viện Phụ sản - Nhi Đà Nẵng',
  ],
  'Bình Dương': [
    'Bệnh viện Đa khoa Quốc tế Becamex',
    'Bệnh viện Đa khoa Tỉnh Bình Dương',
    'Bệnh viện Quốc tế Columbia Asia Bình Dương',
  ],
  'Đồng Nai': [
    'Bệnh viện Quốc tế Hoàn Mỹ Đồng Nai',
    'Bệnh viện Đa khoa Thống Nhất Đồng Nai',
    'Bệnh viện Đa khoa Đồng Nai',
  ],
};

export const VIETNAM_BANKS: { code: string; name: string; shortName: string }[] = [
  { code: 'VCB', name: 'Ngân hàng TMCP Ngoại Thương Việt Nam', shortName: 'Vietcombank' },
  { code: 'TCB', name: 'Ngân hàng TMCP Kỹ Thương Việt Nam', shortName: 'Techcombank' },
  { code: 'BIDV', name: 'Ngân hàng TMCP Đầu Tư và Phát Triển Việt Nam', shortName: 'BIDV' },
  { code: 'CTG', name: 'Ngân hàng TMCP Công Thương Việt Nam', shortName: 'VietinBank' },
  { code: 'MB', name: 'Ngân hàng TMCP Quân Đội', shortName: 'MB Bank' },
  { code: 'ACB', name: 'Ngân hàng TMCP Á Châu', shortName: 'ACB' },
  { code: 'VPB', name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng', shortName: 'VPBank' },
  { code: 'STB', name: 'Ngân hàng TMCP Sài Gòn Thương Tín', shortName: 'Sacombank' },
  { code: 'TPB', name: 'Ngân hàng TMCP Tiên Phong', shortName: 'TPBank' },
  { code: 'VIB', name: 'Ngân hàng TMCP Quốc Tế Việt Nam', shortName: 'VIB' },
  { code: 'HDB', name: 'Ngân hàng TMCP Phát Triển TP.HCM', shortName: 'HDBank' },
  { code: 'SHB', name: 'Ngân hàng TMCP Sài Gòn - Hà Nội', shortName: 'SHB' },
  { code: 'LPB', name: 'Ngân hàng TMCP Lộc Phát Việt Nam', shortName: 'LPBank' },
  { code: 'MSB', name: 'Ngân hàng TMCP Hàng Hải Việt Nam', shortName: 'MSB' },
  { code: 'OCB', name: 'Ngân hàng TMCP Phương Đông', shortName: 'OCB' },
  { code: 'VBA', name: 'Ngân hàng Nông nghiệp & Phát triển Nông thôn Việt Nam', shortName: 'Agribank' },
];

export const CLAIM_REASONS = [
  'Bệnh tật / Bệnh nội khoa',
  'Tai nạn sinh hoạt',
  'Tai nạn giao thông',
  'Tai nạn lao động',
  'Khám thai / Sinh sản',
  'Nha khoa bệnh lý',
  'Kiểm tra định kỳ / Điều trị chuyên sâu',
];
