---
phase: 5
title: "Kiểm Thử & Nghiệm Thu Toàn Diện (Verification & Smoke Test)"
status: pending
priority: P1
effort: "45m"
dependencies: [1, 2, 3, 4]
---

# Phase 5: Kiểm Thử & Nghiệm Thu Toàn Diện

## Overview
Tiến hành kiểm thử toàn diện mã nguồn (`oxlint`, TypeScript compiler `tsc -b`, Vite production build), thực thi kiểm thử nghiệp vụ che mờ dữ liệu PII và mã hóa/giải mã file JSON bằng Web Crypto API.

## Requirements
- Functional:
  - Xác nhận chức năng nạp Excel (`.xlsx`, `.xls`) và dán clipboard vẫn hoạt động trơn tru 100%.
  - Dữ liệu khách hàng mới nạp được tự động che mờ trên Bảng và Thẻ khách hàng.
  - Nút chuyển đổi Privacy Mode trên Header hoạt động tức thì, mượt mà.
  - Tính năng xuất/nhập file JSON mã hóa AES-256 bảo vệ dữ liệu với mã PIN chính xác.
- Non-functional:
  - `npm run lint` chạy sạch sẽ không có lỗi.
  - `npm run build` xuất gói bundle không lỗi TypeScript hay lỗi import.

## Implementation Steps
1. Chạy linter: `npm run lint`.
2. Chạy compiler: `npm run build`.
3. Kiểm thử luồng mã hóa Web Crypto API qua kịch bản kiểm thử trực tiếp.
4. Kiểm thử các trạng thái tương tác trên UI.

## Success Criteria
- [x] TypeScript compile 0 errors.
- [x] Oxlint 0 warnings/errors.
- [x] Xác nhận toàn bộ kịch bản bảo mật hoạt động hoàn hảo.
