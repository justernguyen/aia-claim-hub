---
title: expand-policy-riders-and-benefits-plan
date: 2026-09-29
summary: Kế hoạch mở rộng cấu hình sản phẩm chính và sản phẩm bổ trợ Riders khi tạo hợp đồng mới
---

# expand-policy-riders-and-benefits-plan

Kế hoạch mở rộng cấu hình sản phẩm chính và sản phẩm bổ trợ Riders khi tạo hợp đồng mới

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Bối cảnh & Mục tiêu
- Khi đại lý khởi tạo khách hàng và hợp đồng bảo hiểm AIA (`NewCustomerModal.tsx`), hiện tại form chỉ cho phép chọn 1 trong 5 sản phẩm chính cố định và 1 mức Thẻ sức khỏe (150tr - 1 tỷ).
- Người dùng yêu cầu bổ sung khả năng thêm các sản phẩm khác ngoài sản phẩm chính và Thẻ SK (như Bệnh hiểm nghèo, Tai nạn toàn diện, Trợ cấp nằm viện, Miễn đóng phí) và tự do thêm sản phẩm tùy chọn.

## Quyết định Kỹ thuật
- Lựa chọn giải pháp Checklist Riders chuẩn AIA (1-click toggle kèm hạn mức mặc định & gợi ý mốc) kết hợp nút "+ Thêm sản phẩm khác" để thêm các dòng sản phẩm con tùy biến.
- Giữ vững cấu trúc data contract `BenefitQuota[]` trong `src/types/crm.ts` để đồng bộ hoàn toàn với `useCRMStore.ts`, `CustomerDetailDrawer.tsx` và `NewClaimModal.tsx`.
- Chia thành 4 phase rõ ràng:
  1. `phase-01-start.md`: Domain & Preset Catalogs
  2. `phase-02-modal-ui-riders-and-custom-products.md`: Modal UI Riders & Custom Products
  3. `phase-03-sync-customer-drawer-claims-analytics.md`: Sync Customer Drawer, Claims & Analytics
  4. `phase-04-verification-and-smoke-test.md`: Verification & Smoke Test
