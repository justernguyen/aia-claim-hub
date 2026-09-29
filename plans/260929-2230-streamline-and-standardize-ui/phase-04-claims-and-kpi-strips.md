# Phase 4: Claims View & KPI Strips Harmonization

## Target Files
- `src/components/MetricsOverview.tsx`
- `src/components/FilterBar.tsx`
- `src/components/ClaimTableView.tsx`
- `src/components/AnalyticsDashboardView.tsx`

## Changes
1. **MetricsOverview (KPI Strip Tab 2)**:
   - Thống nhất kích thước, phông chữ và bố cục thẻ với Tab 1 và Tab 3.
   - Chuẩn hóa tiêu đề thẻ: `text-xs font-semibold uppercase text-slate-500`.
   - Con số chính: `text-2xl font-bold font-numeric text-slate-900`.
   - SLA Alert: Tinh tế, không che lấp tầm nhìn, nút lọc gọn gàng.
2. **FilterBar (Tab 2)**:
   - Chuẩn hóa các ô dropdown `select`: padding, bo góc `rounded-xl`, phông chữ `text-xs font-medium`.
   - Bộ nút chuyển Table/Kanban đồng bộ thiết kế với Tab 1.
3. **ClaimTableView**:
   - Tinh gọn bảng bồi thường: Tránh nhét quá nhiều icon và badge vào một hàng.
   - Thao tác: Giữ nút chuyển trạng thái nhanh hoặc nút xem chi tiết rõ ràng, không bị chồng chéo.
4. **AnalyticsDashboardView**:
   - Thống nhất màu sắc các subtabs từ màu đen `bg-slate-900` sang tone màu AIA nhận diện (`bg-slate-900/80` hoặc `bg-aia-red` cho điểm nhấn, phong cách executive tinh tế).
