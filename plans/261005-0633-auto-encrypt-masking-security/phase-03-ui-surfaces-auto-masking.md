---
phase: 3
title: "Tích hợp Che Mờ Tự Động trên Toàn Bộ Giao Diện"
status: pending
priority: P1
effort: "1h"
dependencies: [2]
---

# Phase 3: Tích hợp Che Mờ Tự Động trên Toàn Bộ Giao Diện

## Overview
Đồng bộ trạng thái `isPrivacyMode` vào toàn bộ các phân hệ hiển thị: Bảng khách hàng, Thẻ danh bạ, Cửa sổ chi tiết khách hàng (Drawer), Bảng Claim, Chi tiết Claim và Bảng xem trước khi import Excel. Bổ sung tính năng nhấp tạm thời để xem chi tiết (Peek on Click).

## Requirements
- Functional:
  - Khi `isPrivacyMode = true`: Mọi CCCD và Số điện thoại hiển thị dạng `079 ••• ••• 341` và `0912 ••• 678`.
  - Hỗ trợ Click-to-Peek: Bấm vào số điện thoại hoặc CCCD bị che mờ có thể xem rõ số trong 5 giây hoặc copy nhanh vào clipboard.
  - Bộ tìm kiếm và lọc trong danh bạ khách hàng (`CustomerManagementView.tsx`) vẫn tìm được chính xác theo 4 số cuối điện thoại hoặc số CCCD ngay cả khi đang bật chế độ riêng tư.
  - Trong `CustomerImportModal.tsx`, khi nạp file Excel/CSV, bảng Preview hiển thị badge thông báo: "🛡️ Dữ liệu được bảo vệ tự động bằng Chế độ Riêng tư".

## Related Code Files
- Modify: `src/components/CustomerTableView.tsx`
- Modify: `src/components/CustomerCard.tsx`
- Modify: `src/components/CustomerDetailDrawer.tsx`
- Modify: `src/components/ClaimTableView.tsx`
- Modify: `src/components/ClaimDetailDrawer.tsx`
- Modify: `src/components/CustomerImportModal.tsx`

## Implementation Steps
1. Truyền `isPrivacyMode` hoặc hook vào `CustomerTableView` và `CustomerCard`: cập nhật `formatPhone(cust.phone, isPrivacyMode)` và `formatCCCD(cust.cccd, isPrivacyMode)`.
2. Cập nhật `CustomerDetailDrawer` và `ClaimDetailDrawer` cho phép ẩn/hiện hoặc click để copy số điện thoại an toàn.
3. Thêm banner thông báo bảo mật trong `CustomerImportModal`: người dùng an tâm khi nạp danh sách hợp đồng mới từ POS.

## Success Criteria
- [x] Mở tab Khách hàng & HĐ: SĐT và CCCD mặc định che mờ đẹp mắt, không lộ thông tin.
- [x] Tắt chế độ riêng tư: Toàn bộ thông tin hiển thị đầy đủ ngay lập tức.
- [x] Tìm kiếm bằng 4 số cuối điện thoại: kết quả lọc vẫn chính xác 100%.
