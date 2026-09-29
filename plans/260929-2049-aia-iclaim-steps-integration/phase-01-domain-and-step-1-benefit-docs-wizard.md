---
title: "Phase 1: Domain Foundations, Step 1 Authentication, 11 Quyền Lợi & Đính Kèm Chứng Từ"
status: pending
priority: P1
effort: 1.0h
---

# Phase 1: Domain Foundations, Step 1 Authentication, 11 Quyền Lợi & Đính Kèm Chứng Từ

## 1. Mục tiêu (Objective)

Thiết lập bộ dữ liệu tra cứu chuẩn AIA (ICD-10, ngân hàng Việt Nam, danh mục chứng từ theo quyền lợi) và hiện thực hóa **Bước 1 của quy trình AIA iClaim**:
- Thanh điều hướng tiến trình 4 bước: `(1) - (2) - (3) - (4)` với màu sắc chuẩn AIA (Đỏ `#D31145`, Xanh cyan `#00A3E0`, Xám Slate).
- Màn hình xác thực Đại lý ủy quyền (Mã số `000850386` của Dương Thị Như Ý) và CCCD/Hộ chiếu Bên mua bảo hiểm kèm Checkbox điều khoản AIA.
- Mô phỏng bước xác thực OTP gửi về điện thoại `XXXXXX7956`.
- Bộ chọn **11 Quyền Lợi Bảo Hiểm AIA** dạng lưới có icon và tooltip mô tả `(i)`.
- Bộ đính kèm hồ sơ chuyên biệt theo quyền lợi đã chọn:
  * Hóa đơn viện phí* (`[TẢI HỒ SƠ]`)
  * Sổ khám bệnh / Toa thuốc* (`[TẢI HỒ SƠ]`)
  * Bảng kê chi phí khám chữa bệnh / Ra viện (`[TẢI HỒ SƠ]`)
  * Giấy chứng nhận phẫu thuật / thủ thuật (`[TẢI HỒ SƠ]`)
  * Các chứng từ y tế khác (`[TẢI HỒ SƠ]`)
  * Hiển thị thumbnail xem trước, tên file (VD: `IMG_8327.jpeg`), nút chuyển ảnh `< >`, nút xóa `x` và trạng thái loading spinner như ảnh 6.

---

## 2. Danh sách file liên quan (Related Files)

### Files to Create:
- `src/data/claimPortalData.ts`: Danh mục 11 quyền lợi AIA, danh mục chứng từ theo từng quyền lợi, danh sách mã bệnh ICD-10 phổ biến, danh sách tỉnh thành và bệnh viện liên kết AIA, danh sách các ngân hàng tại Việt Nam.

### Files to Modify:
- `src/types/claim.ts`: Bổ sung các trường `claimReason`, `paymentMethod`, `bankAccount`, `hospitalCity`, `icd10Code`, `documentCategory` nếu cần hoàn thiện.
- `src/components/NewClaimModal.tsx`: Tái cấu trúc thành kiến trúc đa bước (Multi-step Wizard) với State quản lý `currentStep` (1, 2, 3, 4), `subStep` xác thực OTP, và bộ uploader chứng từ theo từng danh mục.

---

## 3. Các bước thực hiện chi tiết (Implementation Steps)

### Bước 1: Khởi tạo dữ liệu tham chiếu trong `src/data/claimPortalData.ts`
1. Danh sách 11 quyền lợi kèm tooltip mô tả chi tiết:
   - Điều trị nội trú (Chi trả chi phí tiền phòng, điều trị trong thời gian nằm viện)
   - Điều trị ngoại trú (Khám, xét nghiệm, thuốc điều trị không lưu viện)
   - Bệnh hiểm nghèo (Chi trả theo danh mục 68 bệnh hiểm nghèo AIA)
   - Điều trị trước nhập viện (Chi phí khám trước khi nằm viện trong vòng 30 ngày)
   - Điều trị trong ngày (Phẫu thuật hoặc thủ thuật không nằm lại qua đêm)
   - Khám thai (Chi phí chăm sóc thai sản theo quyền lợi đặc biệt)
   - Tàn tật toàn bộ và vĩnh viễn (Chi trả quyền lợi thương tật mất sức lao động)
   - Điều trị sau xuất viện (Tái khám, thuốc sau khi ra viện trong vòng 60 ngày)
   - Nha khoa (Khám, điều trị nha khoa theo quyền lợi bổ sung)
   - Thương tật do tai nạn (Chi phí và trợ cấp thương tật tai nạn)
   - Tử vong (Hồ sơ yêu cầu giải quyết quyền lợi tử vong)
2. Danh mục tài liệu yêu cầu tương ứng cho từng loại quyền lợi (ví dụ: Ngoại trú cần Hóa đơn + Toa thuốc; Nội trú cần Giấy ra viện + Bảng kê chi tiết + Hóa đơn VAT).
3. Danh mục 50+ bệnh viện và phòng khám phổ biến theo các tỉnh thành (Hà Nội, TP.HCM, Đà Nẵng, Bình Dương, Đồng Nai, Cần Thơ, Hải Phòng...).
4. Danh mục 30+ mã bệnh ICD-10 phổ biến thường gặp trong bồi thường bảo hiểm.

### Bước 2: Thiết kế Thanh tiến trình Wizard (Header & Step Indicator)
1. Hiển thị Header Modal với Logo AIA, nút Đóng `X`, và chỉ báo tư vấn viên Dương Thị Như Ý.
2. Thiết kế Step Bar chuẩn:
   - Vòng tròn số `1, 2, 3, 4` nối nhau bằng đường line xám/đỏ.
   - Bước đã hoàn thành: Vòng tròn xanh với icon Checkmark `✓`.
   - Bước hiện tại: Vòng tròn xanh AIA với số nổi bật.
   - Bước chưa tới: Vòng tròn viền xám mờ.

### Bước 3: Giao diện Bước 1 - Xác thực & Lựa chọn quyền lợi
1. Sub-step 1: Xác thực Đại lý & CCCD bên mua:
   - Ô Mã đại lý (mặc định `000850386`, không bắt buộc sửa nếu dùng nhanh).
   - Ô CCCD / Hộ chiếu bên mua (tự điền khi chọn nhanh khách CRM).
   - Checkbox Turnstile Captcha "Thành công!".
   - Checkbox đồng ý Điều khoản sử dụng & Cam kết bảo mật AIA.
   - Nút "TIẾP TỤC" (màu đỏ AIA) và "QUAY LẠI".
2. Sub-step 2: Xác thực mã OTP (chế độ mô phỏng tiện lợi):
   - Hiển thị số điện thoại nhận mã dạng `XXXXXX7956`.
   - Ô nhập OTP 6 số (gợi ý tự điền OTP hoặc bấm Tiếp tục để qua nhanh).
3. Sub-step 3: Lưới 11 Quyền Lợi AIA:
   - Checkbox hoặc Radio chọn quyền lợi chính.
   - Bấm vào biểu tượng `(i)` để xem giải thích quyền lợi.
4. Sub-step 4: Danh mục Đính kèm hồ sơ chuyên biệt:
   - Hiển thị các khối chứng từ theo đúng quyền lợi vừa chọn.
   - Mỗi mục có nút `[TẢI HỒ SƠ]`, chọn ảnh từ máy/camera.
   - Render preview thumbnail có điều hướng ảnh `< >`, hiển thị tên file và dung lượng, nút `x` xóa ảnh.
   - Trạng thái loading mô phỏng khi tải ảnh.

---

## 4. Danh sách công việc (Todo List)

- [ ] Tạo file `src/data/claimPortalData.ts` chứa dữ liệu tham chiếu chuẩn AIA.
- [ ] Cập nhật types trong `src/types/claim.ts` nếu cần hỗ trợ danh mục chứng từ chi tiết.
- [ ] Xây dựng thanh Step Indicator `(1) - (2) - (3) - (4)` cho `NewClaimModal.tsx`.
- [ ] Xây dựng màn hình xác thực Đại lý & OTP mô phỏng chuẩn Portal.
- [ ] Xây dựng Lưới 11 quyền lợi AIA với modal tooltip `(i)`.
- [ ] Xây dựng bộ uploader chứng từ theo từng danh mục có preview thumbnail và nút xóa.

---

## 5. Tiêu chí thành công & Nghiệm thu (Success Criteria)

1. Giao diện Bước 1 thể hiện đầy đủ các trường từ 6 ảnh đầu tiên trong thư mục `D:\Desktop\claim`.
2. Tư vấn viên có thể chọn nhanh khách từ CRM để bỏ qua bước nhập CCCD thủ công.
3. Người dùng chọn quyền lợi (ví dụ "Điều trị ngoại trú") thì danh mục hồ sơ hiển thị chính xác các chứng từ cần nộp kèm nút tải riêng.
4. Ảnh sau khi tải lên hiển thị thumbnail rõ nét, có thể xóa và thêm ảnh khác.
5. Chạy `npm run build` không phát sinh lỗi TypeScript.
