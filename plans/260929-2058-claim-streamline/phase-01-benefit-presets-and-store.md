# Phase 1: Domain & Preset Chứng Từ Theo Quyền Lợi AIA

## Mục tiêu
Thiết lập danh mục chứng từ mẫu tương ứng với từng loại quyền lợi (inpatient, outpatient, accident_injury, critical_illness, v.v.) để phục vụ việc hiển thị các slot upload thông minh ở Step 3 và kiểm tra thiếu/đủ giấy tờ.

## File tác động
- `src/types/claim.ts` hoặc `src/utils/claimPresets.ts` (tạo mới helper chuyên biệt cho presets)

## Các bước thực hiện
1. Tạo helper `src/utils/claimPresets.ts`:
   - Danh sách bệnh viện phổ biến gợi ý nhanh (`TOP_HOSPITALS`): BV Vinmec, BV Chợ Rẫy, BV FV, BV Đại Học Y Dược TP.HCM, BV Bạch Mai, BV Nhi Đồng 1, BV 115, BV Hoàn Mỹ.
   - Mapping `CLAIM_TYPE_REQUIRED_DOCS`:
     - `inpatient` (Nội trú): Giấy ra viện (bắt buộc), Bảng kê chi tiết viện phí (bắt buộc), Hóa đơn điện tử VAT (bắt buộc), Giấy chứng nhận phẫu thuật (nếu có mổ).
     - `outpatient` (Ngoại trú): Sổ khám bệnh / Toa thuốc (bắt buộc), Hóa đơn tiền thuốc / viện phí (bắt buộc), Kết quả xét nghiệm / chẩn đoán hình ảnh.
     - `accident_injury` (Tai nạn): Biên bản tai nạn / Bản tường trình tai nạn (bắt buộc), Toa thuốc & X-Quang (bắt buộc), Hóa đơn điều trị.
     - `critical_illness` (Bệnh hiểm nghèo): Kết quả giải phẫu bệnh lý / sinh thiết (bắt buộc), Tóm tắt bệnh án (bắt buộc).
     - Các quyền lợi khác: Giấy tờ viện phí + Bệnh án.
2. Viết hàm sinh tin nhắn nhanh gửi Zalo cho khách hàng khi thiếu chứng từ hoặc khi nộp thành công cổng iClaim.
3. Xuất các helper và kiểm tra build sạch.
