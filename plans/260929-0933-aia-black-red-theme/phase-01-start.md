---
title: "Phase 1: Chuẩn Hóa Màu Sắc Header, KPI Strip & Bộ Lọc CRM"
status: todo
---

# Phase 1: Chuẩn Hóa Màu Sắc Header, KPI Strip & Bộ Lọc CRM

## Context Links
- **Component điều hướng**: `src/components/Header.tsx`
- **Màn hình chính CRM**: `src/components/CustomerManagementView.tsx`
- **Tailwind Config**: `tailwind.config.js` (Mã màu `aia.red: #D31145`, `aia.charcoal: #1A1D20`)

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Tinh giản khu vực "mặt tiền" của ứng dụng bao gồm thanh tiêu đề Header, dải 4 Card KPI tổng quan và thanh công cụ tìm kiếm / lọc / thao tác. Chuyển đổi các nút và chỉ báo từ đa màu (xanh lá, vàng, lam) về phong cách Đen & Đỏ AIA thanh lịch.

## Key Insights
1. **Dải 4 Card KPI**:
   - Hiện tại: Card 2 dùng xanh lá `text-emerald-600 bg-emerald-50`, Card 3 dùng vàng cam `text-amber-600 bg-amber-50`, Card 4 dùng lam `bg-blue-50 text-blue-600`.
   - Chuẩn hóa: Toàn bộ số liệu hiển thị bằng màu đen than `text-slate-900 font-mono font-extrabold`. Các icon box sử dụng nền trung tính `bg-slate-100 text-slate-700` hoặc điểm nhấn nhẹ `bg-rose-50 text-aia-red` cho chỉ báo có tính cảnh báo (như Chờ nộp phí).
2. **Bộ lọc trạng thái & Thao tác**:
   - Nút `Nhập Excel`: Đang là `bg-emerald-600 hover:bg-emerald-500 text-white`. Cần chuyển sang `bg-slate-900 hover:bg-slate-800 text-white` (hoặc `border border-slate-300 text-slate-700 hover:bg-slate-100`) nhằm để nút `+ Thêm KH` là nút đỏ duy nhất mang tính hành động cao nhất (Primary CTA).
   - Nút lọc `Đang hiệu lực`: Đang là `bg-emerald-600 text-white`, đổi sang `bg-slate-900 text-white`.
   - Nút lọc `Chờ nộp phí`: Đang là `bg-amber-600 text-white`, đổi sang `bg-aia-red text-white` (màu đỏ AIA thể hiện trạng thái cần hành động/chú ý).
3. **Header**:
   - Huy hiệu `MDRT`: Đổi từ nền vàng `bg-amber-100 text-amber-900` sang `bg-slate-100 text-slate-800 border border-slate-200 font-bold`.
   - Huy hiệu đếm số lượng trên các tab: Đồng bộ về gam màu đỏ AIA hoặc slate tối giản.

## Related Code Files
- `src/components/CustomerManagementView.tsx`
- `src/components/Header.tsx`

## Implementation Steps
1. Mở `src/components/CustomerManagementView.tsx`:
   - Thay thế class màu sắc ở 4 thẻ KPI hàng trên (dòng 106-156).
   - Cập nhật styling các nút lọc (`all`, `in_force`, `pending_payment`) từ dòng 173-207.
   - Cập nhật nút `Nhập Excel` tại dòng 235-243 từ `bg-emerald-600` sang `bg-slate-900 text-white shadow-xs hover:bg-slate-800`.
2. Mở `src/components/Header.tsx`:
   - Chuẩn hóa badge `MDRT` và badge thông báo tab điều hướng (`Hồ sơ bồi thường`, `Lịch chăm sóc`).
3. Kiểm tra preview trực quan để đảm bảo độ tương phản cao, dễ đọc và sang trọng.

## Todo List
- [x] Cập nhật màu số liệu và icon box của 4 thẻ KPI trong `CustomerManagementView.tsx`.
- [x] Chuyển đổi nút `Nhập Excel` sang gam màu đen than / monochrome.
- [x] Cập nhật 3 nút lọc (`Tất cả`, `Đang hiệu lực`, `Chờ nộp phí`) theo chuẩn Đen & Đỏ AIA.
- [x] Tinh giản badge MDRT và các chấm/badge trên `Header.tsx`.

## Success Criteria
- Dải KPI không còn màu xanh lá cây hoặc vàng cam chói mắt.
- Nút `Nhập Excel` hài hòa với tổng thể giao diện, không còn màu xanh lá.
- Bộ lọc hiển thị rõ ràng trạng thái kích hoạt với gam màu đen than và đỏ AIA.
