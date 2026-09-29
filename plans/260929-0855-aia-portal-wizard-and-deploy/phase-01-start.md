---
title: "Phase 1: Architecture & Stepper Design"
status: todo
priority: P1
effort: 1.5h
---

# Phase 1: Architecture & Stepper Design

## Overview

Thiết kế kiến trúc phân hệ tiếp nhận hồ sơ bồi thường (Claim Intake Wizard) chuẩn hóa theo mô hình 4 bước của cổng AIA Việt Nam (`aia.com.vn`), được trích xuất từ 9 ảnh tư liệu thực tế tại thư mục `D:\Desktop\claim`.

Xây dựng thanh tiến trình Stepper trực quan (1: Quyền lợi & Chứng từ ➔ 2: Thông tin viện phí ➔ 3: Phương thức nhận tiền ➔ 4: Xác nhận) kèm cơ chế lưu tạm bản nháp và chuyển bước có kiểm tra dữ liệu bắt buộc (Validation Gate).

---

## Key Insights & Requirements

- **Khung Stepper 4 Bước Chuẩn AIA:**
  - `Bước 1`: Lựa chọn quyền lợi (11 quyền lợi AIA) & Đính kèm hồ sơ y tế (Hóa đơn, Toa thuốc, Bảng kê, Giấy phẫu thuật...).
  - `Bước 2`: Nhập thông tin giải quyết quyền lợi bảo hiểm (Người được BH, Ngày sự kiện, Tổng tiền yêu cầu, Bệnh viện, Mã ICD-10, Chẩn đoán chi tiết).
  - `Bước 3`: Chọn phương thức thanh toán (Nhận tiền qua tài khoản ngân hàng hoặc Tiền mặt).
  - `Bước 4`: Xác nhận, xem lại toàn bộ thông tin và tạo hồ sơ bồi thường.
- **Tiêu chuẩn Giao diện AIA:**
  - Nút chuyển bước: "TIẾP TỤC" (AIA Crimson Red `#D31145`) và "QUAY LẠI" (Slate button).
  - Thanh số bước tròn: Bước hoàn thành có icon check xanh (`CheckCircle2`), bước đang làm nổi bật màu xanh AIA `#0090DA` / `#D31145`.

---

## Related Files

### Files to Modify:
- `src/components/NewClaimModal.tsx`: Chuyển đổi từ Form cuộn dọc đơn thuần thành Multi-step Wizard có Stepper header.
- `src/types/claim.ts`: Đảm bảo đầy đủ thuộc tính tài khoản ngân hàng và các trường thông tin chẩn đoán.

---

## Todo List

- [x] Thiết kế thanh tiến trình Stepper 4 bước chuẩn AIA
- [x] Phân rã cấu trúc state quản lý từng bước (`currentStep`: 1 | 2 | 3 | 4)
- [x] Cài đặt các nút điều hướng "Quay lại" và "Tiếp tục" với logic validate từng bước
- [x] Đảm bảo tính thân thiện trên màn hình di động (chụp ảnh trực tiếp từ camera điện thoại)

---

## Success Criteria

- Thanh Stepper 4 bước hiển thị đẹp mắt, rõ ràng từng giai đoạn.
- Không thể bấm chuyển bước nếu chưa điền các trường bắt buộc có dấu sao đỏ (`*`).
- Bấm "Quay lại" giữ nguyên toàn bộ dữ liệu đã nhập ở các bước trước đó.
