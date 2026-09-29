---
phase: 2
title: "Native SVG Chart Suite (Interactive Area Chart, Donut Chart & MDRT Gauge)"
status: completed
priority: P1
effort: "1h"
dependencies: [1]
---

# Phase 2: Native SVG Chart Suite (Interactive Area Chart, Donut Chart & MDRT Gauge)

## Goal
Xây dựng bộ biểu đồ Native SVG tương tác cao, zero-dependency, đáp ứng hoàn hảo chuẩn hiển thị tài chính AIA và tương thích tối đa với React 19 mà không làm tăng dung lượng bundle.

## Files to Create / Modify
- Create: `src/components/analytics/charts/DynamicAreaChart.tsx`
- Create: `src/components/analytics/charts/DonutChart.tsx`
- Create: `src/components/analytics/charts/MdrtProgressGauge.tsx`

## Tasks & Steps

1. **Xây dựng `DynamicAreaChart.tsx` (Biểu đồ Vùng Xu Hướng Doanh Số & HĐ Mới)**:
   - Tự động quét `issueDate` của danh sách `policies` và `createdAt` của `customers` trong kỳ được chọn để nhóm dữ liệu theo từng tháng (hoặc quý).
   - Vẽ đường cong spline mềm mại với thẻ `<path d="..." />` và vùng chuyển màu gradient từ đỏ AIA (`#D31145` opacity 0.25 xuống 0.02) hoặc xanh emerald.
   - Thêm đường trục ngang mờ (gridlines) và các nhãn mốc tháng rõ ràng.
   - **Tương tác trực quan**:
     - Cho phép chuyển đổi qua lại giữa 2 chế độ hiển thị: *"Doanh Số Phí APE (VNĐ)"* và *"Số Hợp Đồng Mới"*.
     - Hover chuột hiển thị thanh dóng thẳng đứng (crosshair line), điểm tròn highlight (active point dot) và Card Tooltip nổi bật hiển thị: Tên tháng, Doanh số phát hành thực tế, Số HĐ mới, Số hồ sơ claim phát sinh.
   - Đảm bảo SVG có `viewBox` co giãn hoàn hảo 100% chiều rộng, không bị méo tỷ lệ trên mobile.

2. **Xây dựng `DonutChart.tsx` (Biểu đồ Vòng Cơ Cấu Danh Mục)**:
   - Sử dụng thuật toán tính toán góc SVG arcs hoặc `stroke-dasharray` với bán kính chuẩn xác.
   - Hiển thị tâm biểu đồ (Center Label): Tổng số hợp đồng và trạng thái chiếm tỷ trọng lớn nhất.
   - Bảng chú giải (Legend) tương tác: Hiển thị tên nhóm trạng thái, số lượng, tỷ lệ phần trăm (%), khi hover vào mục chú giải sẽ làm nổi bật phần tương ứng trên biểu đồ tròn.
   - Tông màu đồng bộ: Đang hiệu lực (`#1A1D20`), Chờ nộp phí (`#D31145`), Mất hiệu lực (`#94A3B8`).

3. **Xây dựng `MdrtProgressGauge.tsx` (Thước Đo Tiến Độ Danh Hiệu MDRT / COT / TOT)**:
   - Thiết kế thước đo đa tầng thể hiện lộ trình chinh phục danh hiệu tài chính danh giá của AIA:
     - Cấp 1: **MDRT** (Million Dollar Round Table) — Mốc 750,000,000 ₫
     - Cấp 2: **COT** (Court of the Table) — Mốc 2,250,000,000 ₫ (x3 MDRT)
     - Cấp 3: **TOT** (Top of the Table) — Mốc 4,500,000,000 ₫ (x6 MDRT)
   - Thanh tiến độ kép (Segmented Progress Track) với điểm chốt cờ mốc (milestone flags), hiển thị phần trăm hoàn thành, số tiền còn thiếu để thăng hạng và dự phóng nhịp độ doanh số mỗi tháng còn lại trong năm.

## Verification
- Kiểm tra tính toán SVG: Các tọa độ điểm vẽ nằm trong khung nhìn `viewBox`, không bị cắt méo cạnh.
- Thử nghiệm rê chuột trên biểu đồ vùng: Tooltip xuất hiện đúng tọa độ và hiển thị dữ liệu chính xác theo từng tháng.
- Build thử với `npm run build` đảm bảo không có cảnh báo SVG hay TypeScript.