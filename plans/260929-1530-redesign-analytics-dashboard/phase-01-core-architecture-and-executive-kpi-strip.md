---
phase: 1
status: completed
priority: P1
effort: "1h"
dependencies: []
---

# Phase 1: Core Architecture, Time Filter State Engine & Executive Command Strip

## Goal
Xây dựng kiến trúc phân hệ Thống Kê mới gồm module định nghĩa kiểu dữ liệu (`types.ts`), bộ điều khiển trung tâm (`ExecutiveToolbar.tsx`) với bộ lọc khung thời gian động, và thanh chỉ huy 4 chỉ số tài chính cốt lõi (`ExecutiveCommandStrip.tsx`).

## Files to Create / Modify
- Create: `src/components/analytics/types.ts`
- Create: `src/components/analytics/ExecutiveToolbar.tsx`
- Create: `src/components/analytics/ExecutiveCommandStrip.tsx`
- Modify: `src/components/AnalyticsDashboardView.tsx`

## Tasks & Steps

1. **Tạo module kiểu dữ liệu (`src/components/analytics/types.ts`)**:
   - Định nghĩa `AnalyticsPeriod`: `'all' | '2026' | 'last_6_months' | 'q3_2026'`.
   - Định nghĩa `AnalyticsSubTab`: `'overview' | 'portfolio' | 'claims' | 'quotas'`.
   - Định nghĩa các interface tính toán: `AggregatedKPIs`, `MonthlyTrendPoint`, `PolicyBreakdown`, `ClaimSummary`.
   - Cung cấp hàm helper `filterDataByPeriod()` để lọc danh sách `policies`, `claims`, `customers` theo khung thời gian đã chọn dựa trên `issueDate`, `createdAt`, `intakeDate`.

2. **Xây dựng `ExecutiveToolbar.tsx`**:
   - Thanh tiêu đề chuẩn nhận diện AIA: icon `BarChart3` nền đỏ dịu, tiêu đề *"Trung Tâm Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ"*, kèm badge vai trò *"MDRT Executive"*.
   - Bộ chọn khung thời gian dạng pill switch mượt mà:
     - `Tất cả`: Toàn bộ thời gian hoạt động.
     - `Năm 2026`: Toàn bộ năm hiện tại (2026-01-01 đến 2026-12-31).
     - `6 Tháng Gần Nhất`: 6 tháng gần nhất từ 2026-04 đến 2026-09.
     - `Quý 3/2026`: Quý hiện tại (2026-07 đến 2026-09).
   - Nút hành động chính: *"Xuất Báo Cáo Excel (CSV)"* nổi bật với icon `FileSpreadsheet`.

3. **Xây dựng `ExecutiveCommandStrip.tsx`**:
   - Thiết kế 4 thẻ KPI tài chính cao cấp với font chữ `font-numeric`, viền mảnh tinh tế, micro-badges trạng thái:
     - **Thẻ 1: Tổng Doanh Số Phí APE** (Annual Premium Equivalent) — Hiển thị số rút gọn (ví dụ `648.5 Tr ₫`), phí thường niên quản lý, tooltip VND đầy đủ.
     - **Thẻ 2: Tiến Độ Chỉ Tiêu MDRT 2026** — Hiển thị % đạt được trên mốc chuẩn 750,000,000 VND (ví dụ `86.4%`), micro progress bar mini, số tiền cần bổ sung để về đích.
     - **Thẻ 3: Quyền Lợi AIA Đã Chi Trả** — Số tiền thực duyệt bồi thường cho khách hàng, tỷ lệ duyệt (%) và tổng số ca đã thanh toán.
     - **Thẻ 4: Tỷ Lệ Duy Trì Hợp Đồng K1** — Tỷ lệ duy trì năm 1 (In-force / Total policies, mục tiêu >90% chuẩn AIA Premier Agent), hiển thị tổng số hợp đồng quản lý.

4. **Tích hợp vào `AnalyticsDashboardView.tsx`**:
   - Đặt state quản lý `activePeriod` (mặc định `'2026'`) và `activeSubTab` (mặc định `'overview'`).
   - Kết nối `ExecutiveToolbar` và `ExecutiveCommandStrip` với dữ liệu được lọc theo kỳ.

## Verification
- Chạy `npm run build` không phát sinh lỗi kiểu dữ liệu TypeScript.
- Kiểm tra render: Toolbar và 4 thẻ KPI hiển thị chuẩn xác, thay đổi bộ lọc thời gian làm thay đổi số liệu tức thì.