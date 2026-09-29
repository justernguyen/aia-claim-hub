# Phase 2: Thiết Kế Lại NewClaimModal Thành Express 3-Step Wizard

## Mục tiêu
Thay thế form 1 trang dài nhiều input hiện tại bằng Wizard 3 bước cực kỳ trực quan, tập trung và giảm tối đa gánh nặng thao tác nhập liệu cho tư vấn viên.

## File tác động
- `src/components/NewClaimModal.tsx`

## Chi tiết các bước Wizard
1. **Header & Progress Stepper:**
   - Hiển thị 3 bước: `1. Khách hàng & HĐ` -> `2. Viện phí & Chẩn đoán` -> `3. Chứng từ y tế`.
   - Có thanh tiến trình (progress bar), badge bước đang thực hiện rõ ràng.

2. **Step 1: Khách hàng & Hợp đồng (Auto-fill 80%):**
   - Combobox / Select chọn khách hàng có avatar và thông tin nhanh.
   - Khi chọn khách hàng:
     - Tự động điền Hợp đồng của họ, Tên gói SP AIA, CCCD, Số điện thoại, Tên người được BH.
   - Chọn loại quyền lợi (11 quyền lợi chuẩn AIA hiển thị dạng card hoặc select trực quan).
   - Nút "Tiếp tục" sang Step 2.

3. **Step 2: Sự kiện điều trị & Tài chính:**
   - Cơ sở y tế / Bệnh viện: Input kết hợp 1 hàng Chips gợi ý bệnh viện phổ biến (bấm 1 cái là điền ngay).
   - Ngày nhập viện & Ngày xuất viện (mặc định lấy hôm nay / hôm qua).
   - Chẩn đoán sơ bộ (gợi ý nhanh: Viêm ruột thừa, Sốt xuất huyết, Viêm phổi, Tai nạn ngã...).
   - Số tiền yêu cầu bồi thường (format số tự động và hiển thị chữ tiếng Việt).
   - Nút "Quay lại" và "Tiếp tục" sang Step 3.

4. **Step 3: Đính kèm chứng từ theo slot thông minh:**
   - Hiển thị danh sách các ô (slot) theo đúng checklist quyền lợi đã chọn ở Step 1 (Ví dụ: [Giấy ra viện *], [Bảng kê chi phí *], [Hóa đơn VAT *], [Khác]).
   - Mỗi slot có nút bấm chọn file hoặc chụp ảnh, có badge trạng thái "Đã tải lên" hoặc "Chưa có".
   - Tóm tắt nhanh hồ sơ trước khi nộp.
   - Nút "Nộp hồ sơ Claim" (Tiếp nhận ngay).
