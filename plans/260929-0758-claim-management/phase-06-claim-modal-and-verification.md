---
title: "Phase 6: Claim Modal & Verification"
status: done
---

# Phase 6: Claim Modal & Verification

## Overview
Xây dựng Modal tạo hồ sơ bồi thường mới với form nhập liệu trực quan, validation chặt chẽ; tích hợp tiện ích Export/Import dữ liệu và thực hiện kiểm thử khép kín toàn bộ hệ thống.

## Requirements
- [x] Modal Tiếp Nhận Hồ Sơ Mới (`New Claim Modal`):
  - Form nhập thông tin: Mã HĐ, Tên KH, CCCD, SĐT, Sản phẩm AIA, Loại quyền lợi, Bệnh viện, Ngày vào viện, Ngày ra viện, Số tiền yêu cầu bồi thường, Ghi chú sơ bộ.
  - Tự động sinh mã hồ sơ theo format `CLM-2026-XXXX`.
  - Tự động tạo checklist chứng từ ban đầu dựa trên loại quyền lợi.
- [x] Chức năng Export JSON & CSV: Xuất toàn bộ dữ liệu claim ra file để lưu trữ ngoại tuyến.
- [x] Chức năng Import JSON: Khôi phục dữ liệu từ file backup hoặc reset về dữ liệu mẫu ban đầu.
- [x] Verification & Build Smoke Test:
  - Chạy `npm run build` thành công trong 784ms, 0 lỗi TypeScript, 0 lỗi cú pháp.
  - Kiểm thử preview server trả về HTTP 200, tiêu đề `AIA Claim Hub | Tư vấn viên Dương Như Ý`, load đầy đủ bundle assets.
