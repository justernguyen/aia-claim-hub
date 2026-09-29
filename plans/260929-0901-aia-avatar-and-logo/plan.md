---
title: "Tích Hợp Avatar Tư Vấn Viên & Logo AIA Chính Thức"
description: "Chuyển đổi ảnh chân dung của tư vấn viên thành avatar chuẩn và tích hợp logo nhận diện thương hiệu AIA vào ứng dụng CRM."
status: pending
priority: P1
effort: 2h
tags: [frontend, ui, branding, aia]
created: 2026-09-29
---

# Kế Hoạch Triển Khai: Tích Hợp Avatar Tư Vấn Viên & Logo AIA Chính Thức

## Overview

Kế hoạch này thực hiện hai mục tiêu cốt lõi:
1. **Avatar Tư vấn viên**: Trích xuất từ ảnh chân dung thực tế của tư vấn viên, xử lý cắt cúp tỷ lệ 1:1 chuẩn (512x512, căn giữa khuôn mặt và phong thái chuyên nghiệp), tối ưu kích thước và tích hợp vào thanh điều hướng Header (`Header.tsx`), hồ sơ tư vấn viên (`CURRENT_CONSULTANT`), cùng các thành phần CRM liên quan.
2. **Logo AIA chính thức**: Thay thế khối div chữ nhật màu đỏ thô sơ bằng logo vector SVG chuẩn nhận diện thương hiệu của AIA (biểu tượng **Đỉnh núi AIA - Mountain Crest** kết hợp **AIA Wordmark** màu đỏ `#D31145`), đồng thời cập nhật Favicon trình duyệt cho ứng dụng.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Trích xuất, crop và tối ưu hóa ảnh chân dung thành avatar chuẩn `public/avatar-consultant.png` | P1 |
| 2 | Tạo component logo vector `src/components/AiaLogo.tsx` và cập nhật Favicon AIA | P1 |
| 3 | Tích hợp avatar và logo AIA vào `Header.tsx`, `mockClaims.ts` và các thành phần liên quan | P1 |
| 4 | Kiểm thử giao diện hiển thị trên Desktop, Tablet, Mobile và favicon trình duyệt | P1 |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Chuẩn Hóa Tài Nguyên Avatar & Logo AIA Vector](./phase-01-start.md) | Pending |
| 2 | [Phase 2: Tích Hợp Avatar & Logo Vào Giao Diện App](./phase-02-integrate-avatar-and-logo.md) | Pending |
| 3 | [Phase 3: Kiểm Thử Responsive & Đóng Gói Nghiệm Thu](./phase-03-verification-and-testing.md) | Pending |

## Success Criteria

- [ ] Avatar được lưu trữ tại `public/avatar-consultant.png`, hiển thị sắc nét ở các kích thước vòng tròn (36px, 48px, 64px) và có fallback mượt mà nếu ảnh không tải được.
- [ ] Component `<AiaLogo />` hiển thị sắc nét chuẩn vector với biểu tượng Đỉnh núi AIA (Mountain Crest) và chữ AIA đỏ thương hiệu `#D31145`.
- [ ] `Header.tsx` hiển thị logo AIA chính thức ở góc trái và ảnh đại diện tư vấn viên ở khung profile bên phải.
- [ ] `index.html` và `public/favicon.svg` được cập nhật đồng bộ sang biểu tượng Đỉnh núi AIA.
- [ ] Giao diện responsive không bị xô lệch, vỡ dòng trên màn hình điện thoại (mobile < 640px).

<!-- slug: aia-avatar-and-logo -->
