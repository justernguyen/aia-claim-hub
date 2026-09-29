---
title: custom-riders-and-benefits-cook
date: 2026-09-29
summary: Hoàn tất triển khai gói sản phẩm tùy biến và các sản phẩm bổ trợ Riders khi tạo hợp đồng mới
---

# custom-riders-and-benefits-cook

Hoàn tất triển khai gói sản phẩm tùy biến và các sản phẩm bổ trợ Riders khi tạo hợp đồng mới

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Tóm tắt Thay đổi
1. **Kiểu dữ liệu & Preset Riders (`src/types/crm.ts`)**:
   - Thêm `RiderPreset`, `ConfiguredRiderItem`, `AIA_RIDER_PRESETS`.
   - Hàm `convertRidersToBenefits` chuẩn hóa mảng riders sang `BenefitQuota[]`.
2. **Giao diện Modal Khởi tạo (`src/components/NewCustomerModal.tsx`)**:
   - Cho phép chọn Sản phẩm chính AIA hoặc chuyển sang gõ tự do tên sản phẩm khác (+ Nhập tên khác).
   - Danh sách Checklist các gói bổ trợ chuẩn AIA (CSSK, Bệnh hiểm nghèo, Tai nạn, Viện phí, Miễn đóng phí) với gợi ý hạn mức nhanh và format tiền tệ.
   - Thêm sản phẩm con tự do (`+ Thêm sản phẩm bổ trợ khác`) với tên, loại quyền lợi và hạn mức tùy biến.
3. **Đồng bộ hiển thị hệ sinh thái**:
   - `CustomerDetailDrawer.tsx`: Badge phân loại màu sắc cho từng quyền lợi, thanh tiến trình tỷ lệ đã sử dụng.
   - `CustomerCard.tsx` & `CustomerTableView.tsx`: Hiển thị badge `+X bổ trợ`.
   - `NewClaimModal.tsx`: Hiển thị chip `Có trong HĐ` cho các quyền lợi đã đăng ký trong hợp đồng.
4. **Loại bỏ trùng lặp**:
   - Gỡ bỏ component modal trùng lặp trong `CustomerManagementView.tsx`.
5. **Code simplification & Build**:
   - `code-simplifier` tinh gọn luồng parsing số và mapping subtabs.
   - `tsc -b && vite build` thông qua 100% với 0 lỗi.
