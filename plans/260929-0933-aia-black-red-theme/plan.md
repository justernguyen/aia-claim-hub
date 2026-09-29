---
title: "Chuẩn Hóa Nhận Diện Thương Hiệu AIA: Tone Màu Đen & Đỏ Chủ Đạo"
description: "Tối giản bảng màu toàn diện, loại bỏ sự phân mảnh màu sắc (xanh lá, vàng cam, xanh dương) và chuẩn hóa giao diện CRM theo bộ nhận diện Đen than, Đỏ AIA, Trắng và Xám trung tính."
status: completed
priority: P1
effort: 2h
tags: [frontend, ui, aia-brand, color-refactor, tailwind]
created: 2026-09-29
---

# Kế Hoạch Triển Khai: Chuẩn Hóa Nhận Diện Thương Hiệu AIA: Tone Màu Đen & Đỏ Chủ Đạo

## Overview

Giao diện hiện tại của **AIA Agent CRM & Claim Hub** đang gặp tình trạng "lạm dụng màu sắc" (color clutter): cùng một màn hình xuất hiện đồng thời màu xanh lá (`emerald-600` trên nút Nhập Excel, nút lọc, tiến độ), màu vàng cam (`amber` trên KPI, badge MDRT, cảnh báo gia hạn), màu xanh dương (`blue` trên icon KPI) xen lẫn với màu đỏ thương hiệu AIA (`#D31145`). Điều này làm rối mắt người dùng, giảm tính chuyên nghiệp và làm loãng nhận diện thương hiệu AIA.

Kế hoạch này tiến hành chuẩn hóa toàn diện bảng màu về phong cách **AIA Brand Core (Đen Than & Đỏ AIA)**:
- **Đỏ AIA (`#D31145`)**: Dành riêng cho nhận diện thương hiệu, nút hành động chính (Primary CTA như `+ Thêm KH`, `+ Thêm mới`), tab đang chọn, và các cảnh báo quan trọng (Chờ nộp phí, vi phạm SLA).
- **Đen Than (`#1A1D20` / `slate-900`)**: Dành cho typography tiêu đề, số liệu KPI quan trọng, avatar mặc định, nút điều hướng phụ và thanh trạng thái an toàn.
- **Trắng & Xám trung tính (`#FFFFFF`, `slate-50`, `slate-100`, `slate-200`)**: Dành cho background, đường viền card, bảng biểu và badge trạng thái phân cấp nhẹ nhàng.
- **Loại bỏ**: Các khối màu nền rực rỡ xanh lá cây (`emerald-600`), xanh cyan, vàng cam (`amber-500`) trên các nút thao tác và card thống kê.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Chuẩn hóa màu sắc Header, dải 4 thẻ KPI và thanh công cụ tìm kiếm / lọc trong `CustomerManagementView.tsx` | P1 |
| 2 | Cập nhật cấu hình trạng thái `POLICY_STATUS_CONFIG`, thẻ khách hàng `CustomerCard.tsx`, bảng dữ liệu `CustomerTableView.tsx` và modal `CustomerImportModal.tsx` | P1 |
| 3 | Rà soát các component bổ trợ (`MetricsOverview.tsx`, `ClaimKanbanView.tsx`), biên dịch không lỗi TypeScript và smoke test giao diện | P1 |

## Phases
| 1 | [Phase 1: Chuẩn Hóa Màu Sắc Header, KPI Strip & Bộ Lọc CRM](./phase-01-start.md) | Done |
| 2 | [Phase 2: Đồng Bộ Khung Thẻ Khách Hàng, Bảng & Modal Nhập Liệu](./phase-02-card-and-status-styling.md) | Done |
| 3 | [Phase 3: Kiểm Thử Toàn Diện, Build & Smoke Test Giao Diện](./phase-03-verification-and-smoke-test.md) | Done |

- [x] Nút `Nhập Excel` được chuyển đổi sang kiểu dáng monochrome cao cấp (`bg-slate-900 text-white`), loại bỏ hoàn toàn màu xanh lá `emerald-600`.
- [x] Dải 4 Card KPI trên đầu màn hình đồng nhất font chữ số liệu màu đen than (`text-slate-900`), bỏ các khối màu nền xanh lá / vàng / lam tại các icon.
- [x] Các nút lọc (`Tất cả`, `Đang hiệu lực`, `Chờ nộp phí`) theo tông Đen & Đỏ AIA, không còn đốm màu xanh lá / cam chói mắt.
- [x] Badge trạng thái hợp đồng và thanh tiến độ hạn mức quyền lợi trong `CustomerCard` và `CustomerTableView` hiển thị thanh lịch, tối giản.
- [x] `CustomerImportModal` đồng bộ icon và nút bấm theo màu Đỏ AIA và Đen than.
- [x] Ứng dụng vượt qua kiểm tra biên dịch (`npm run build`), không có lỗi hồi quy hiển thị.

<!-- slug: aia-black-red-theme -->
