---
title: Kế Hoạch Chuẩn Hóa Nhận Diện Thương Hiệu AIA - Tone Màu Đen & Đỏ Chủ Đạo
date: 2026-09-29
summary: Khởi tạo kế hoạch 3 phase loại bỏ sự phân mảnh màu sắc (xanh lá, vàng cam, xanh dương) và chuẩn hóa toàn bộ CRM theo bộ nhận diện Đen than, Đỏ AIA, Trắng và Xám trung tính.
---

# Kế Hoạch Chuẩn Hóa Nhận Diện Thương Hiệu AIA - Tone Màu Đen & Đỏ Chủ Đạo

Khởi tạo kế hoạch 3 phase loại bỏ sự phân mảnh màu sắc (xanh lá, vàng cam, xanh dương) và chuẩn hóa toàn bộ CRM theo bộ nhận diện Đen than, Đỏ AIA, Trắng và Xám trung tính.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Chi tiết kế hoạch
- **Plan directory**: `plans/260929-0933-aia-black-red-theme/`
- **Mục tiêu**:
  - Chuẩn hóa màu sắc Header, dải 4 thẻ KPI và thanh công cụ tìm kiếm / lọc trong `CustomerManagementView.tsx`.
  - Cập nhật cấu hình trạng thái `POLICY_STATUS_CONFIG`, thẻ khách hàng `CustomerCard.tsx`, bảng dữ liệu `CustomerTableView.tsx` và modal `CustomerImportModal.tsx`.
  - Rà soát các component bổ trợ (`MetricsOverview.tsx`, `ClaimKanbanView.tsx`, `CustomerDetailDrawer.tsx`), biên dịch không lỗi TypeScript và smoke test giao diện.
