---
phase: 1
title: "Security & Masking Engine"
status: in-progress
priority: P1
effort: "45m"
dependencies: []
---

# Phase 1: Security & Masking Engine

## Overview
Xây dựng engine mã hóa nhị phân chuẩn Web Crypto API (AES-GCM 256-bit, PBKDF2 100.000 rounds) trong `src/utils/crypto.ts` và mở rộng bộ tiện ích `src/utils/formatters.ts` để hỗ trợ che mờ thông tin định danh (Masking CCCD, Số điện thoại) mượt mà.

## Requirements
- Functional:
  - Cung cấp hàm `encryptData(data: string, pin: string): Promise<string>` và `decryptData(cipherText: string, pin: string): Promise<string>`.
  - Cung cấp hàm `maskPhone(phone?: string | null): string` chuyển `0912345678` thành `0912 ••• 678`.
  - Cung cấp hàm `maskCCCD(cccd?: string | null): string` chuyển `079198002341` thành `079 ••• ••• 341`.
  - Cập nhật `formatPhone` và `formatCCCD` nhận cờ `isMasked?: boolean` tùy chọn.
- Non-functional:
  - Sử dụng 100% Web Crypto API bản địa (`window.crypto.subtle`), không cài đặt thư viện bên ngoài để đảm bảo bundle nhẹ và an toàn tối đa.
  - Xử lý lỗi giải mã chuẩn (sai PIN, dữ liệu hỏng) mà không làm crash ứng dụng.

## Related Code Files
- Create: `src/utils/crypto.ts`
- Modify: `src/utils/formatters.ts`

## Implementation Steps
1. Tạo file `src/utils/crypto.ts` với các thuật toán:
   - Derive key từ mã PIN qua PBKDF2 (SHA-256, 100.000 iterations, Salt 16 bytes).
   - Mã hóa nội dung bằng AES-GCM (IV 12 bytes ngẫu nhiên).
   - Đóng gói định dạng Base64 hoặc JSON bọc Salt + IV + Ciphertext.
2. Cập nhật `src/utils/formatters.ts`:
   - Thêm `maskPhone` và `maskCCCD`.
   - Cung cấp hàm kiểm tra và hiển thị an toàn.

## Success Criteria
- [x] Hàm mã hóa và giải mã AES-256 test chạy trơn tru: giải mã đúng trả về dữ liệu gốc, sai PIN trả về lỗi xác thực rõ ràng.
- [x] `maskPhone` và `maskCCCD` hiển thị chuẩn đẹp, bảo vệ thông tin nhận diện.
