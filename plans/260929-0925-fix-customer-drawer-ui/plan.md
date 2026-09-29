---
title: "Khắc phục Lỗi Vỡ Giao diện Drawer Chi tiết Khách hàng & Điều hướng Tabs"
description: "Sửa triệt để hiện tượng tràn xén tab, tối ưu kích thước slide-over drawer và nâng cấp giao diện tab Hồ sơ Cá nhân chuẩn Enterprise AIA CRM."
status: completed
priority: P1
effort: 1.5h
tags: [frontend, ui, responsive, crm, drawer]
created: 2026-09-29
---

# Kế Hoạch Triển Khai: Khắc phục Lỗi Vỡ Giao diện Drawer Chi tiết Khách hàng

## 1. Overview & Root Cause Analysis

Hiện tượng người dùng gặp phải:
- Khi xem chi tiết khách hàng trong `CustomerDetailDrawer.tsx`, tab thứ 4 bị xén đứt chữ thành *"Hồ sơ Cá nh..."* do chiều rộng drawer bị bóp nghẹt ở `max-w-2xl` ($672\text{px}$) trong khi tổng chiều rộng 4 tab nhãn dài chiếm trên $780\text{px}$.
- Tab "Hồ sơ Cá nhân" bị đặt ở cuối cùng và dùng sai icon (`Calendar` thay vì `User`).
- Header hiển thị trùng lặp từ `Trần Hoàng Nam Nam` do chưa có định danh icon/nhãn giới tính riêng.
- Nội dung tab Hồ sơ Cá nhân thiếu phân nhóm trực quan, chưa tối ưu thao tác sao chép thông tin nhanh.

## 2. Goals & Success Criteria

| # | Goal | Priority |
|---|------|----------|
| 1 | Mở rộng Drawer kích thước linh hoạt responsive: `w-screen max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-3xl` | P1 |
| 2 | Sắp xếp lại thứ tự Tabs chuẩn CRM: Tab 1: Hồ sơ Cá nhân, Tab 2: Hợp đồng & Quyền lợi, Tab 3: Lịch sử Bồi thường, Tab 4: Nhật ký Chăm sóc | P1 |
| 3 | Tối ưu hóa Tab Navigation: không còn xén đứt chữ, icon chuẩn `User` cho hồ sơ, badge số lượng trực quan | P1 |
| 4 | Cải thiện Header: phân biệt rõ ràng tên khách hàng và giới tính (`♂ Nam` / `♀ Nữ`) | P1 |
| 5 | Nâng cấp Card Hồ sơ Cá nhân: bố cục phân nhóm thẻ định danh CCCD, liên hệ nhanh, thông tin nghề nghiệp và phân khúc | P1 |
| 6 | Đồng bộ hóa `ClaimDetailDrawer.tsx` sang kích thước responsive tương đương | P2 |

## 3. Phases

| 1 | [Phase 1: Sửa UI CustomerDetailDrawer & ClaimDetailDrawer](./phase-01-fix-customer-detail-drawer.md) | Done |
| 2 | [Phase 2: Kiểm Thử Responsive, Build & Nghiệm Thu UI](./phase-02-verification-and-test.md) | Done |
<!-- slug: fix-customer-drawer-ui -->
