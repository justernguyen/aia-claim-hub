---
title: "AIA Claim Management - Tư vấn viên Dương Như Ý"
description: "Công cụ chuyên biệt quản lý hồ sơ bồi thường và giải quyết quyền lợi bảo hiểm AIA cho chuyên viên tư vấn Dương Như Ý"
status: complete
priority: P1
effort: "Medium"
tags: ["aia", "insurance", "claim-management", "react", "vite", "tailwind"]
created: 2026-09-29
completed: 2026-09-29
---

# AIA Claim Management - Tư vấn viên Dương Như Ý

## Overview
Hệ thống Single Page Application chuyên biệt quản lý hồ sơ bồi thường bảo hiểm nhân thọ AIA, được thiết kế riêng cho Chuyên viên tư vấn Dương Như Ý (AIA Việt Nam). Ứng dụng cung cấp Dashboard KPI, quản lý tiến độ bồi thường theo Pipeline/Kanban và Table, kiểm tra chứng từ y tế, slide-over chi tiết hồ sơ, tiếp nhận hồ sơ bồi thường mới và sao lưu/phục hồi dữ liệu ngoại tuyến.

## Goals

| # | Goal | Priority | Status |
|---|------|----------|--------|
| 1 | Xây dựng giao diện chuẩn nhận diện AIA Red (`#D31145`) gắn danh tính tư vấn viên Dương Như Ý | P1 | Completed |
| 2 | Cung cấp Dashboard KPI đo lường hồ sơ bồi thường, cảnh báo trễ hạn SLA thẩm định | P1 | Completed |
| 3 | Chế độ xem kép Dual Views (Bảng danh sách chi tiết + Bảng Kanban tiến độ) | P1 | Completed |
| 4 | Slide-over Drawer xem chi tiết hồ sơ bệnh án, chứng từ y tế và nhật ký xử lý | P1 | Completed |
| 5 | Modal tạo hồ sơ bồi thường mới với validation chặt chẽ và checklist chứng từ | P1 | Completed |
| 6 | Quản lý state bền vững qua LocalStorage, hỗ trợ Xuất/Nhập dữ liệu JSON và CSV | P1 | Completed |

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Phase 1: Project Setup](./phase-01-start.md) | Completed |
| 2 | [Phase 2: Domain Schema & State Management](./phase-02-domain-schema-and-state.md) | Completed |
| 3 | [Phase 3: Dashboard Layout & Metrics](./phase-03-dashboard-layout-and-metrics.md) | Completed |
| 4 | [Phase 4: Filter & Dual Data Views](./phase-04-filter-and-dual-data-views.md) | Completed |
| 5 | [Phase 5: Slide-over Detail Drawer](./phase-05-slide-over-detail-drawer.md) | Completed |
| 6 | [Phase 6: Claim Modal & Verification](./phase-06-claim-modal-and-verification.md) | Completed |

## Success Criteria

- [x] Định danh tư vấn viên Dương Như Ý hiển thị rõ ràng trên thanh tiêu đề AIA (MDRT, Mã: AIA-VN-8869, AIA Exchange Bitexco)
- [x] Dashboard hiển thị chính xác các chỉ số KPI: Tổng số ca, Chờ bổ sung, Đang thẩm định, Đã duyệt, Tổng tiền chi trả
- [x] Tìm kiếm tức thời theo Tên khách hàng, Số HĐ, Mã claim, Bệnh viện; Lọc theo trạng thái và loại quyền lợi
- [x] Chuyển đổi mượt mà giữa Table View và Kanban Board View
- [x] Slide-over Drawer cho phép xem chi tiết, tích chọn bổ sung chứng từ và thêm ghi chú nhật ký
- [x] Tạo hồ sơ claim mới thành công và cập nhật tức thì vào danh sách
- [x] Export dữ liệu ra file JSON/CSV và Import phục hồi dữ liệu thành công
- [x] Build dự án thành công không lỗi type và chạy mượt mà trên trình duyệt
