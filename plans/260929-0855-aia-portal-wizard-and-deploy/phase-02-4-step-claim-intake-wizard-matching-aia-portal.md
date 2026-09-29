---
title: "Phase 2: 4-Step Claim Intake Wizard Matching AIA Portal"
status: todo
priority: P1
effort: 2.5h
---

# Phase 2: 4-Step Claim Intake Wizard Matching AIA Portal

## Overview

Hiện thực hóa chi tiết 4 bước nhập liệu trong Wizard tiếp nhận hồ sơ mới, phản ánh chính xác các trường dữ liệu và giao diện thực tế từ các bức ảnh trong thư mục `D:\Desktop\claim`:

- **Bước 1 (Ảnh 1, 5, 6):** 11 quyền lợi bồi thường (Điều trị nội trú, Điều trị ngoại trú, Bệnh hiểm nghèo, Khám thai, Nha khoa, Tai nạn, Tử vong...). Khi chọn quyền lợi, tự động hiển thị danh mục giấy tờ cần nộp kèm nút "TẢI HỒ SƠ" và preview ảnh thumbnail như ảnh 6 (`IMG_8327.jpeg`).
- **Bước 2 (Ảnh 7, 8):** Nhập họ tên NĐBH, ngày sự kiện bảo hiểm, tổng tiền viện phí yêu cầu thanh toán (đồng), Tỉnh/Thành phố, Bệnh viện điều trị, Nguyên nhân xảy ra sự kiện, Mã chẩn đoán ICD-10 và Chẩn đoán chi tiết theo giấy ra viện.
- **Bước 3 (Ảnh 9):** Chọn phương thức thanh toán: Nhận tiền qua tài khoản ngân hàng (Ngân hàng, Số TK, Tên chủ TK) hoặc Tiền mặt tại ngân hàng.
- **Bước 4:** Bảng tóm tắt tổng thể toàn bộ hồ sơ, kiểm tra lại chứng từ và bấm "Nộp hồ sơ bồi thường".

---

## Related Files

### Files to Modify:
- `src/components/NewClaimModal.tsx`
- `src/types/claim.ts`
- `src/hooks/useCRMStore.ts`

---

## Todo List

- [x] Cài đặt Bước 1: Bộ chọn 11 quyền lợi AIA và danh mục đính kèm ảnh chứng từ
- [x] Cài đặt Bước 2: Form thông tin sự kiện bảo hiểm, bệnh viện, mã ICD-10 và tổng tiền viện phí
- [x] Cài đặt Bước 3: Phương thức nhận tiền bảo hiểm (Ngân hàng hoặc Tiền mặt)
- [x] Cài đặt Bước 4: Tóm tắt thông tin và tiếp nhận hồ sơ vào hệ thống
- [x] Tích hợp tính năng chọn nhanh khách hàng từ danh bạ sẵn có

---

## Success Criteria

- 100% trường dữ liệu từ 9 ảnh tham khảo của AIA được hỗ trợ trong wizard.
- Tải ảnh chứng từ hiển thị thumbnail xem trước ngay trong bước 1.
- Tạo claim thành công lưu vào `localStorage` kèm tài khoản ngân hàng và mã ICD-10.
