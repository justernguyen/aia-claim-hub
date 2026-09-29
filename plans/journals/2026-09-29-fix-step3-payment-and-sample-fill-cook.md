---
title: Khắc Phục Lỗi Giao Diện Bước 3 Thanh Toán & Thêm Tính Năng Điền Hồ Sơ Mẫu iClaim
date: 2026-09-29
summary: Tái cấu trúc cụm chọn Phương thức thanh toán Bước 3 trong NewClaimModal.tsx khớp chuẩn AIA Mobile Portal và tích hợp bộ nút Điền mẫu theo các bước Claim bảo hiểm.
---

# Khắc Phục Lỗi Giao Diện Bước 3 Thanh Toán & Thêm Tính Năng Điền Hồ Sơ Mẫu iClaim

## Vấn đề được giải quyết
1. **Lỗi UI Bước 3:** Trước đó, thẻ radio chọn phương thức thanh toán bị bọc viền đỏ cồng kềnh, nhét toàn bộ form nhập STK vào bên trong một card riêng khiến option "Nhận tiền mặt" bị đẩy xuống trơ trọi.
2. **Thiếu tính năng Điền mẫu:** Chưa có cách điền nhanh toàn bộ quy trình 4 bước (Quyền lợi, chứng từ y tế, ICD-10, tài khoản ngân hàng) để test nhanh.

## Các thay đổi chính
- **`src/components/NewClaimModal.tsx`**:
  - Gom 2 phương thức nhận tiền (*Nhận qua tài khoản ngân hàng* & *Nhận tiền mặt tại Ngân hàng*) vào chung một card bo góc nền trắng viền xám nhẹ `divide-y divide-slate-100`, khớp 100% với giao diện gốc AIA Mobile.
  - Khu vực nhập thông tin tài khoản ngân hàng thụ hưởng được tách riêng thành một card độc lập, nền xám thanh lịch, label rõ ràng, font mono đậm nét, có icon `Building2` và hướng dẫn minh bạch.
  - Bổ sung cụm nút **⚡ Mẫu:** `[Ngoại trú]` `[Nội trú]` `[Nha khoa]` ngay cạnh dropdown chọn khách hàng. Bấm vào sẽ tự động điền đầy đủ từ Bước 1 đến Bước 4 (gồm cả hóa đơn VAT, toa thuốc, giấy ra viện dạng SVG đính kèm, mã bệnh ICD-10 và STK ngân hàng thụ hưởng).
  - Khôi phục file lỗi cú pháp do conflict `CustomerTableView.tsx` và `ClaimTableView.tsx`.

## Nghiệm thu & Kiểm thử
- `npm run build` biên dịch Vite và TypeScript thành công 100%.
- Kiểm thử trực tiếp bằng Headless Chromium:
  - Ảnh chụp thực tế `verify-step3-fixed-clean.png`: Bước 3 hiển thị chuẩn mực, thoáng đãng, sang trọng.
  - Ảnh chụp `verify-step4-fixed-clean.png`: Tóm tắt đầy đủ thông tin bồi thường và chứng từ mẫu.
