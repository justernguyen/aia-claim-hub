---
title: Kế Hoạch Tích Hợp Avatar Tư Vấn Viên & Logo AIA Chính Thức
date: 2026-09-29
summary: Khởi tạo kế hoạch 3 phase chuẩn hóa avatar chân dung tư vấn viên và tích hợp logo vector AIA cùng favicon cho ứng dụng CRM.
---

# Kế Hoạch Tích Hợp Avatar Tư Vấn Viên & Logo AIA Chính Thức

Khởi tạo kế hoạch 3 phase chuẩn hóa avatar chân dung tư vấn viên và tích hợp logo vector AIA cùng favicon cho ứng dụng CRM.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Chi tiết kế hoạch
- **Plan directory**: `plans/260929-0901-aia-avatar-and-logo/`
- **Mục tiêu**:
  - Trích xuất ảnh chân dung tư vấn viên thành avatar chuẩn tỷ lệ 1:1 (512x512) lưu tại `public/avatar-consultant.png`.
  - Xây dựng component React logo vector `src/components/AiaLogo.tsx` chứa Đỉnh núi AIA và AIA Wordmark.
  - Tích hợp vào `Header.tsx`, `CURRENT_CONSULTANT` trong `mockClaims.ts`, và cập nhật `favicon.svg`.
  - Kiểm thử responsive và tính đồng bộ trên các thiết bị.
