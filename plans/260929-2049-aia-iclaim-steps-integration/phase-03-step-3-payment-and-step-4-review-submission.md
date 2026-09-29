---
title: "Phase 3: Step 3 Phương Thức Thanh Toán & Step 4 Tóm Tắt Xác Nhận Nộp Hồ Sơ"
status: pending
priority: P1
effort: 0.9h
---

# Phase 3: Step 3 Phương Thức Thanh Toán & Step 4 Tóm Tắt Xác Nhận Nộp Hồ Sơ

## 1. Mục tiêu (Objective)

Hiện thực hóa **Bước 3: Chọn phương thức thanh toán** (theo đúng ảnh 9 trong `D:\Desktop\claim`) và **Bước 4: Xác nhận nộp hồ sơ bồi thường**:
- Giao diện Bước 3 chuẩn xác với 2 hình thức:
  * Nhận tiền qua tài khoản ngân hàng (có form chọn Ngân hàng, Số TK, Tên chủ TK)
  * Nhận tiền mặt tại Ngân hàng
  * Dòng cảnh báo màu đỏ in đậm: *"Lưu ý: Không áp dụng Ủy quyền nhận tiền cho các loại yêu cầu Giải quyết quyền lợi bảo hiểm!"*
- Bước 4: Tóm tắt toàn bộ hồ sơ trực quan (Summary Review Card), xem lại các ảnh chứng từ đã tải, checkbox cam kết xác thực thông tin.
- Khi bấm "Nộp hồ sơ bồi thường":
  * Lưu trữ đầy đủ dữ liệu vào `useCRMStore`
  * Tạo mã hồ sơ chuẩn định dạng AIA (`CLM-2026-XXXX`)
  * Tự động thêm sự kiện Timeline: *"Tiếp nhận hồ sơ trực tuyến qua cổng AIA iClaim"*
  * Hiển thị thông báo Toast xác nhận thành công.

---

## 2. Danh sách file liên quan (Related Files)

### Files to Modify:
- `src/components/NewClaimModal.tsx`: Hoàn thiện view cho `currentStep === 3` và `currentStep === 4`.
- `src/hooks/useCRMStore.ts`: Đảm bảo hàm `addClaim` nhận đầy đủ các trường mở rộng (tài khoản ngân hàng, mã ICD-10, thành phố, danh sách ảnh chứng từ phân loại theo nhóm).

---

## 3. Các bước thực hiện chi tiết (Implementation Steps)

### Bước 1: Giao diện Bước 3 - Chọn phương thức thanh toán (Ảnh 9)
1. Radio chọn hình thức:
   - Option 1: `Nhận tiền qua tài khoản ngân hàng` (kèm radio button tròn xám/đỏ).
   - Option 2: `Nhận tiền mặt tại Ngân hàng`.
2. Khi chọn Option 1 (Tài khoản ngân hàng):
   - Dropdown chọn Ngân hàng (Vietcombank, BIDV, Techcombank, MB Bank, ACB, VPBank, VietinBank...).
   - Input Số tài khoản (chỉ cho phép nhập ký tự hợp lệ).
   - Input Tên chủ tài khoản (tự động chuyển thành chữ HOA in hoa không dấu/có dấu, khớp tên NĐBH/Bên mua).
3. Hiển thị dòng lưu ý màu đỏ nổi bật:
   - `<p className="text-xs text-rose-600 font-medium">Lưu ý: Không áp dụng Ủy quyền nhận tiền cho các loại yêu cầu Giải quyết quyền lợi bảo hiểm!</p>`
4. Nút "QUAY LẠI" (xám đen) và "TIẾP TỤC" (đỏ AIA).

### Bước 2: Giao diện Bước 4 - Xác nhận & Kiểm tra hồ sơ
1. Header bước 4: "KIỂM TRA & XÁC NHẬN HỒ SƠ YÊU CẦU BỒI THƯỜNG".
2. Bảng tóm tắt thông tin (Review Summary Card):
   - Khối thông tin hợp đồng: Số HĐ, Tên NĐBH, CCCD, Mã đại lý `000850386`.
   - Khối quyền lợi & Y tế: Loại quyền lợi AIA, Bệnh viện điều trị, Ngày xảy ra sự kiện, Mã ICD-10, Chẩn đoán chi tiết.
   - Khối tài chính: Tổng số tiền yêu cầu bồi thường (hiển thị số to đậm kèm đọc chữ VND).
   - Khối thanh toán: Ngân hàng thụ hưởng & Số tài khoản.
   - Khối chứng từ đính kèm: Hiển thị gallery các ảnh chứng từ đã tải lên cùng nhãn loại giấy tờ (Hóa đơn, Toa thuốc, Giấy ra viện...).
3. Checkbox cam kết pháp lý:
   - *"Tôi cam kết các thông tin và chứng từ y tế cung cấp là trung thực và chính xác..."*
4. Nút điều hướng:
   - Nút "QUAY LẠI" (cho phép quay lại bất kỳ bước nào để chỉnh sửa).
   - Nút "NỘP HỒ SƠ BỒI THƯỜNG" (Nút đỏ AIA lớn có hiệu ứng hover).

### Bước 3: Tích hợp State & Dispatch vào CRM Store
1. Hàm `handleSubmit`:
   - Đóng gói toàn bộ payload hồ sơ theo interface `ClaimItem`.
   - Gọi prop `onSubmit(newClaimData)`.
   - Đặt lại form về trạng thái ban đầu (`currentStep = 1`).
   - Đóng modal và hiển thị Toast chúc mừng.

---

## 4. Danh sách công việc (Todo List)

- [ ] Xây dựng giao diện Bước 3 chuẩn ảnh 9 với 2 radio options và form thông tin ngân hàng.
- [ ] Thêm dòng lưu ý cảnh báo màu đỏ về ủy quyền nhận tiền.
- [ ] Xây dựng giao diện Bước 4 với bảng tóm tắt hồ sơ toàn diện và gallery chứng từ thu nhỏ.
- [ ] Bổ sung checkbox cam kết tính trung thực trước khi cho phép nộp.
- [ ] Kết nối hàm nộp hồ sơ với `useCRMStore`, kiểm tra việc lưu vào `localStorage`.

---

## 5. Tiêu chí thành công & Nghiệm thu (Success Criteria)

1. Giao diện Bước 3 thể hiện chính xác 100% bố cục và nội dung từ ảnh 9 của `D:\Desktop\claim`.
2. Bước 4 hiển thị đầy đủ tóm tắt không bị sót bất kỳ trường nào đã nhập ở 3 bước trước.
3. Khi nộp hồ sơ, claim mới lập tức xuất hiện trên cả chế độ Bảng (Table view) và Kanban của ứng dụng.
4. Thông tin tài khoản ngân hàng và mã ICD-10 được lưu trữ chính xác trong chi tiết claim.
