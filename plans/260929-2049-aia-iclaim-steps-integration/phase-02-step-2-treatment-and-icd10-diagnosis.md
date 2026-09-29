---
title: "Phase 2: Step 2 Thông Tin NĐBH, Điều Trị Y Tế & Tra Cứu Mã Bệnh ICD-10"
status: pending
priority: P1
effort: 0.8h
---

# Phase 2: Step 2 Thông Tin NĐBH, Điều Trị Y Tế & Tra Cứu Mã Bệnh ICD-10

## 1. Mục tiêu (Objective)

Hiện thực hóa **Bước 2 của quy trình AIA iClaim**: *"NHẬP THÔNG TIN GIẢI QUYẾT QUYỀN LỢI BẢO HIỂM"* theo đúng thiết kế và cấu trúc từ ảnh 7 và ảnh 8 trong thư mục `D:\Desktop\claim`.

Bao gồm 2 nhóm thông tin rõ ràng:
- **I. Thông tin Người được bảo hiểm:**
  * Họ và tên * (Tự động điền nếu đã chọn từ CRM hoặc nhập tay)
  * Ngày xảy ra sự kiện bảo hiểm * (dd/mm/yyyy)
  * Tổng số tiền yêu cầu thanh toán (đồng) * (Ví dụ: `601.873`, có định dạng số tiền VND tự động và đọc tiền bằng chữ)
- **II. Thông tin về điều trị:**
  * Tỉnh/Thành phố * (Ô chọn/tìm kiếm tỉnh thành có icon kính lúp)
  * Bệnh viện * (Ô chọn/tìm kiếm bệnh viện theo tỉnh thành đã chọn)
  * Nguyên nhân xảy ra sự kiện bảo hiểm * (Bệnh tật / Tai nạn giao thông / Tai nạn sinh hoạt / Khám thai...)
  * Mã chẩn đoán bệnh / Chẩn đoán bệnh *:
    - Ô tra cứu theo Mã bệnh ICD-10 (Gợi ý tự động: `K29`, `J06`, `A09`, `I10`...)
    - Ô tra cứu theo Tên bệnh (Danh sách bệnh phổ biến)
  * Chẩn đoán theo Giấy ra viện * (Textarea nhập chẩn đoán y khoa chi tiết)

---

## 2. Danh sách file liên quan (Related Files)

### Files to Modify:
- `src/components/NewClaimModal.tsx`: Xây dựng layout và logic cho `currentStep === 2`.
- `src/utils/formatters.ts`: Bổ sung hàm parse/format ngày tháng định dạng `dd/mm/yyyy` theo đúng chuẩn AIA portal.

---

## 3. Các bước thực hiện chi tiết (Implementation Steps)

### Bước 1: Xây dựng nhóm I - Thông tin Người được bảo hiểm
1. Trường **Họ và tên NĐBH**:
   - Nếu tư vấn viên đã chọn khách hàng ở Bước 1, tự động điền sẵn tên khách hàng hoặc người phụ thuộc.
   - Hỗ trợ sửa đổi trực tiếp nếu bên mua làm thủ tục bồi thường cho người thân (vợ/chồng, con).
2. Trường **Ngày xảy ra sự kiện bảo hiểm**:
   - Date picker hoặc input date với giới hạn ngày không được vượt quá ngày hiện tại.
   - Format hiển thị dạng ngày Việt Nam `dd/mm/yyyy`.
3. Trường **Tổng số tiền yêu cầu thanh toán (đồng)**:
   - Input số tự động định dạng phân tách hàng nghìn (VD: `601.873` đ như trong ảnh thực tế).
   - Hiển thị badge đọc số tiền bằng chữ (VD: *"Sáu trăm lẻ một nghìn tám trăm bảy mươi ba đồng"*).

### Bước 2: Xây dựng nhóm II - Thông tin về điều trị
1. Trường **Tỉnh/Thành phố & Bệnh viện**:
   - Giao diện có icon kính lúp tìm kiếm như trong ảnh gốc của AIA.
   - Chọn tỉnh thành (VD: TP. Hồ Chí Minh) sẽ lọc danh sách bệnh viện tương ứng (BV Chợ Rẫy, Vinmec Central Park, BV Đại học Y Dược, FV...).
   - Cho phép nhập tên bệnh viện tùy chọn nếu bệnh nhân điều trị tại phòng khám chưa có trong danh mục.
2. Trường **Nguyên nhân xảy ra sự kiện bảo hiểm**:
   - Danh sách các nguyên nhân chuẩn: Bệnh tật, Tai nạn giao thông, Tai nạn sinh hoạt, Bệnh nghề nghiệp, Khám thai định kỳ...
3. Ô tra cứu kép **Mã chẩn đoán bệnh / Chẩn đoán bệnh**:
   - Input 1: "Tìm kiếm theo mã bệnh" (khi gõ mã như `K29`, gợi ý `K29 - Viêm dạ dày và tá tràng`).
   - Input 2: "Tìm kiếm theo tên bệnh" (khi chọn tên, tự động cập nhật mã ICD-10 tương ứng).
4. Ô **Chẩn đoán theo Giấy ra viện**:
   - Textarea nhập văn bản chẩn đoán chi tiết từ bác sĩ điều trị.

### Bước 3: Validation & Điều hướng Bước 2
1. Kiểm tra tính hợp lệ: Bắt buộc điền Tên NĐBH, Ngày sự kiện, Số tiền > 0, Bệnh viện, và Chẩn đoán.
2. Nút "QUAY LẠI" (về Bước 1) và nút "TIẾP TỤC" (sang Bước 3) với màu đỏ đặc trưng `#D31145` của AIA.

---

## 4. Danh sách công việc (Todo List)

- [ ] Thiết kế form giao diện Bước 2 gồm 2 khối card chuẩn như ảnh 7 & ảnh 8.
- [ ] Tích hợp bộ chọn Tỉnh/Thành phố và gợi ý Bệnh viện điều trị.
- [ ] Tích hợp tính năng tra cứu 2 chiều mã bệnh ICD-10 và tên bệnh.
- [ ] Tích hợp định dạng tiền tệ real-time và đọc tiền thành chữ.
- [ ] Thêm validation thông báo lỗi màu đỏ nếu bỏ trống các trường có dấu sao `*`.

---

## 5. Tiêu chí thành công & Nghiệm thu (Success Criteria)

1. Giao diện Bước 2 phản ánh trung thực cấu trúc I và II từ ảnh 7 và 8.
2. Gõ mã `K29` hoặc tên bệnh gợi ý chính xác chẩn đoán ICD-10.
3. Nhập số tiền `601873` tự động hiển thị `601.873 đ` kèm chuỗi đọc chữ.
4. Bấm "Quay lại" giữ nguyên toàn bộ dữ liệu đã nhập ở Bước 1 và Bước 2.
