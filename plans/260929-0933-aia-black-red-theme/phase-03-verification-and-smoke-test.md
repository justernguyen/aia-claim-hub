---
title: "Phase 3: Kiểm Thử Toàn Diện, Build & Smoke Test Giao Diện"
status: todo
---

# Phase 3: Kiểm Thử Toàn Diện, Build & Smoke Test Giao Diện

## Context Links
- **Build tool**: `npm run build` (Vite + TypeScript)
- **Preview UI**: Chụp ảnh hoặc preview trên browser / dev server.

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Kiểm tra biên dịch toàn diện TypeScript và Vite, rà soát lại các màn hình và component thứ cấp (như Drawer chi tiết khách hàng `CustomerDetailDrawer.tsx`, widget sự kiện `UpcomingEventsWidget.tsx`, phân bố trạng thái `PolicyStatusDistribution.tsx`) để đảm bảo không còn vết tích màu xanh lá / vàng cam lạc lõng, đồng thời xác nhận giao diện mới sắc nét và thanh lịch.

## Key Insights
1. **Kiểm tra biên dịch tĩnh**:
   - Chạy lệnh `npm run build` để đảm bảo không phát sinh lỗi gõ kiểu TypeScript hoặc sai sót cú pháp class Tailwind.
2. **Rà soát tính nhất quán thứ cấp**:
   - `CustomerDetailDrawer.tsx`: Nút gọi điện (`bg-emerald-600`), nút Zalo (`bg-cyan-600`), icon thông tin liên hệ. Điều chỉnh nút gọi điện sang `bg-slate-900 hover:bg-slate-800` hoặc phong cách AIA thanh lịch để không làm vỡ tông màu chung.
   - `PolicyStatusDistribution.tsx`: Thanh phân bố tỷ lệ hợp đồng chuyển sang tone Slate và Red thay vì dải xanh lá và vàng cam.
3. **Smoke Test Thực Tế**:
   - Chạy smoke test, kiểm tra giao diện trực quan bằng browser hoặc chụp ảnh màn hình để so sánh với ảnh ban đầu của người dùng, xác nhận sự thay đổi rõ rệt: đỡ rối mắt, tôn vinh thương hiệu AIA Đen - Đỏ.

## Related Code Files
- `src/components/CustomerDetailDrawer.tsx`
- `src/components/PolicyStatusDistribution.tsx`
- `src/components/UpcomingEventsWidget.tsx`

## Implementation Steps
1. Rà soát và tinh chỉnh các chi tiết màu phụ trong `CustomerDetailDrawer.tsx`.
2. Kiểm tra `PolicyStatusDistribution.tsx` để đồng bộ dải màu biểu đồ phân bố hợp đồng.
3. Chạy lệnh `npm run build` để kiểm tra độ tin cậy của mã nguồn.
4. Chạy smoke test giao diện thực tế và ghi lại kết quả nghiệm thu trực quan.

## Todo List
- [x] Rà soát và đồng bộ các nút trong `CustomerDetailDrawer.tsx`.
- [x] Cập nhật bảng màu biểu đồ tỷ lệ trong `PolicyStatusDistribution.tsx`.
- [x] Thực hiện kiểm tra biên dịch dự án (`npm run build`).
- [x] Xác nhận giao diện trực quan với người dùng.

## Success Criteria
- Lệnh `npm run build` hoàn thành không có cảnh báo hoặc lỗi.
- Toàn bộ giao diện từ màn hình chính tới Drawer chi tiết đều tuân thủ nhất quán bộ nhận diện Đen Than & Đỏ AIA.
- Người dùng nhận thấy giao diện sạch sẽ, chuyên nghiệp, không còn cảm giác "hơi nhiều màu".
