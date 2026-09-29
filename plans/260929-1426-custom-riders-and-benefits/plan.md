---
title: "Mở Rộng Gói Sản Phẩm & Thêm Sản Phẩm Phụ (Riders) Khi Tạo Hợp Đồng"
description: "Cho phép thêm sản phẩm chính tùy biến và các sản phẩm bổ trợ (Riders: Bệnh hiểm nghèo, Tai nạn, Nằm viện, Thẻ SK, Custom) khi tạo khách hàng & hợp đồng mới"
status: completed
priority: P1
effort: 3h
tags: [frontend, crm, policy, modal, riders]
created: 2026-09-29
---

# Mở Rộng Gói Sản Phẩm & Thêm Sản Phẩm Phụ (Riders) Khi Tạo Hợp Đồng

## Overview

Khai phóng khả năng cấu hình gói sản phẩm trong modal Khởi tạo Khách hàng & Hợp đồng mới (`NewCustomerModal.tsx`):
1. **Sản phẩm chính linh hoạt**: Cho phép chọn từ danh mục sản phẩm AIA có sẵn hoặc nhập tự do tên sản phẩm chính mới (Custom Main Product).
2. **Hệ thống Sản phẩm bổ trợ (Riders Checklist & Quota Config)**: Cho phép đại lý bật/tắt và cấu hình số tiền bảo hiểm (STBH) cho các quyền lợi quen thuộc:
   - Thẻ Chăm sóc Sức khỏe (CSSK) Toàn cầu / Khỏe Toàn Diện (Hạn mức 150tr - 1 tỷ)
   - Bảo hiểm Bệnh hiểm nghèo Toàn diện / Nâng cao (STBH tùy chọn: vd 200tr, 300tr, 500tr...)
   - Bảo hiểm Tử vong & Thương tật do Tai nạn Toàn diện (STBH tùy chọn: vd 200tr, 500tr, 1 tỷ...)
   - Trợ cấp Nằm viện & Phẫu thuật (Hạn mức năm hoặc mức hỗ trợ/ngày)
   - Bảo hiểm Miễn đóng phí khi mắc bệnh hiểm nghèo (Waiver of Premium)
3. **Nút "+ Thêm sản phẩm khác"**: Cho phép thêm một hoặc nhiều sản phẩm bổ trợ tùy biến bất kỳ với tên và hạn mức tự gõ.
4. **Đồng bộ toàn diện hệ sinh thái**: Dữ liệu lưu vào `policy.benefits`, tự động hiển thị trong Chi tiết hợp đồng (Drawer), Báo cáo quyền lợi (Benefit Utilization) và sẵn sàng cho luồng tạo Claim bồi thường.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | Mở rộng danh mục Preset Riders và kiểu dữ liệu Rider/Benefit trong CRM | P1 |
| 2 | Nâng cấp giao diện Section 2 của `NewCustomerModal.tsx` hỗ trợ Checklist Riders và Thêm sản phẩm tùy chọn | P1 |
| 3 | Đồng bộ hiển thị đa sản phẩm bổ trợ sang CustomerDetailDrawer, CustomerCard, CustomerTableView và NewClaimModal | P1 |
| 4 | Kiểm thử toàn diện TypeScript, build và luồng tạo khách hàng thực tế | P1 |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Domain & Preset Catalogs](./phase-01-start.md) | Pending |
| 2 | [Phase 2: Modal UI Riders & Custom Products](./phase-02-modal-ui-riders-and-custom-products.md) | Pending |
| 3 | [Phase 3: Sync Customer Drawer, Claims & Analytics](./phase-03-sync-customer-drawer-claims-analytics.md) | Pending |
| 4 | [Phase 4: Verification & Smoke Test](./phase-04-verification-and-smoke-test.md) | Pending |

## Success Criteria

- [x] Modal `NewCustomerModal` có khu vực chọn sản phẩm chính (dropdown + nhập tên khác)
- [x] Có checklist trực quan cho các gói bổ trợ AIA phổ biến kèm ô nhập hạn mức với format tiền tệ và đọc số tiền bằng chữ tiếng Việt
- [x] Bấm nút "+ Thêm sản phẩm khác" tạo được dòng sản phẩm mới với tên và hạn mức tùy biến, có nút xóa dòng
- [x] Tạo khách hàng thành công và hợp đồng lưu đầy đủ mảng `benefits`
- [x] Mở CustomerDetailDrawer hiển thị đầy đủ danh sách hạn mức và thanh tiến trình của tất cả các gói bổ trợ vừa tạo
- [x] Không có lỗi TypeScript (`tsc --noEmit`) và Vite build thành công

<!-- slug: custom-riders-and-benefits -->
