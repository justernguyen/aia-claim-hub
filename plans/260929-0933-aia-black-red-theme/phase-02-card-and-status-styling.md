---
title: "Phase 2: Đồng Bộ Khung Thẻ Khách Hàng, Bảng & Modal Nhập Liệu"
status: todo
---

# Phase 2: Đồng Bộ Khung Thẻ Khách Hàng, Bảng & Modal Nhập Liệu

## Context Links
- **Cấu hình Trạng thái hợp đồng**: `src/types/crm.ts`
- **Thẻ hiển thị khách hàng**: `src/components/CustomerCard.tsx`
- **Bảng dữ liệu khách hàng**: `src/components/CustomerTableView.tsx`
- **Modal nhập dữ liệu POS**: `src/components/CustomerImportModal.tsx`

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Chuẩn hóa phong cách hiển thị của danh thiếp khách hàng (Customer Card), danh sách dạng bảng (Table View) và modal nhập Excel POS. Loại bỏ các thanh tiến độ đa sắc màu (xanh lá, vàng chanh) và badge xanh rực rỡ, thay bằng bảng màu tinh tế, cao cấp.

## Key Insights
1. **`POLICY_STATUS_CONFIG` trong `src/types/crm.ts`**:
   - Hiện tại: `in_force` đang dùng `bg-emerald-50 text-emerald-700 border-emerald-200` với dot `bg-emerald-500`. Trạng thái này chiếm đa số (80-90% khách hàng), dẫn tới màn hình bị bao phủ bởi đốm xanh lá.
   - Chuẩn hóa: Đổi `in_force` sang `bg-slate-100 text-slate-800 border-slate-200` với dot `bg-slate-700` hoặc viền đen than tinh tế. Trạng thái `pending_payment` đổi sang `bg-rose-50 text-aia-red border-rose-200` với dot `bg-aia-red` nhằm tạo điểm nhấn thị giác rõ ràng cho các hồ sơ cần nhắc phí.
2. **Thanh tiến độ quyền lợi Thẻ Sức Khỏe (`CustomerCard.tsx` & `CustomerTableView.tsx`)**:
   - Hiện tại: Sử dụng logic chuyển 3 màu xanh - vàng - đỏ (`bg-emerald-500` -> `bg-amber-500` -> `bg-rose-500`).
   - Chuẩn hóa: Mức sử dụng thông thường (< 80%) sử dụng màu đen than `bg-slate-800` (hoặc `bg-slate-700`), khi đạt mức nguy cơ cạn hạn mức (> 80%) mới chuyển sang cảnh báo đỏ AIA `bg-aia-red`.
   - Icon quyền lợi `HeartPulse`: chuyển sang `text-aia-red` hoặc `text-slate-600`.
   - Khung cảnh báo thời gian gia hạn nộp phí: Chuyển sang viền đỏ tinh tế `bg-rose-50/60 border border-rose-200 text-aia-red` thay vì vàng chói `bg-amber-50 border-amber-200 text-amber-800`.
3. **Modal `CustomerImportModal.tsx`**:
   - Khung icon đầu modal: Đổi từ `bg-emerald-600` sang `bg-slate-900`.
   - Chip nhận diện POS: Đổi từ xanh rêu đậm sang màu slate đen `bg-slate-800 text-slate-200 border-slate-700`.
   - Nút hành động xác nhận import: Đổi từ `bg-emerald-600 hover:bg-emerald-500` sang nút thương hiệu `bg-aia-red hover:bg-aia-red-dark text-white`.

## Related Code Files
- `src/types/crm.ts`
- `src/components/CustomerCard.tsx`
- `src/components/CustomerTableView.tsx`
- `src/components/CustomerImportModal.tsx`

## Implementation Steps
1. Mở `src/types/crm.ts`:
   - Cập nhật `POLICY_STATUS_CONFIG` cho các trạng thái `in_force`, `pending_payment`, `lapsed`.
2. Mở `src/components/CustomerCard.tsx`:
   - Cập nhật màu thanh tiến độ hạn mức bảo hiểm sang `bg-slate-800` / `bg-aia-red`.
   - Đổi màu khung cảnh báo gia hạn nộp phí (Grace Period).
   - Chuẩn hóa icon và các chi tiết phụ trợ.
3. Mở `src/components/CustomerTableView.tsx`:
   - Rà soát các cột trạng thái và thanh hạn mức tương tự như `CustomerCard`.
4. Mở `src/components/CustomerImportModal.tsx`:
   - Thay đổi icon box `FileSpreadsheet` từ màu xanh lá sang đen than.
   - Cập nhật nút bấm lưu dữ liệu khách hàng sang màu đỏ AIA.

## Todo List
- [x] Cập nhật `POLICY_STATUS_CONFIG` trong `src/types/crm.ts`.
- [x] Thay đổi màu sắc thanh tiến độ và hộp cảnh báo gia hạn trong `CustomerCard.tsx`.
- [x] Cập nhật định dạng màu sắc hiển thị trong `CustomerTableView.tsx`.
- [x] Chuẩn hóa icon box và nút Submit trong `CustomerImportModal.tsx`.

## Success Criteria
- Thẻ khách hàng hiển thị tối giản, sang trọng theo tông đen than và trắng, chỉ có điểm nhấn đỏ AIA ở các liên kết và cảnh báo.
- Bảng danh sách không còn các dải màu xanh lá và vàng cam gây phân tán thị giác.
- Trải nghiệm nhập file Excel POS đồng bộ với bộ nhận diện chung.
