---
title: "Phase 3: Sync Customer Drawer, Claims & Analytics"
status: todo
---

# Phase 3: Sync Customer Drawer, Claims & Analytics

## Overview

Đảm bảo tất cả các màn hình hạ nguồn (Customer Detail Drawer, Customer Cards, Báo cáo Hạn mức Quyền lợi và Modal Tạo Claim) nhận diện và hiển thị trực quan các gói sản phẩm / quyền lợi bổ trợ vừa được thêm vào hợp đồng.

## Requirements

- [x] `CustomerDetailDrawer.tsx`: Hiển thị trọn vẹn danh sách tất cả các gói sản phẩm bổ trợ với icon, badge phân loại quyền lợi, tiến trình hạn mức và số dư còn lại
- [x] `CustomerCard.tsx` & `CustomerTableView.tsx`: Hiển thị thông minh thẻ sức khỏe chính kèm huy hiệu "+X quyền lợi bổ trợ" khi hợp đồng có nhiều riders
- [x] `BenefitUtilizationReport.tsx`: Thống kê tự động nhận diện cả các quyền lợi mới (Bệnh hiểm nghèo, Tai nạn...)
- [x] `NewClaimModal.tsx`: Luồng tạo hồ sơ bồi thường cho phép chọn đúng quyền lợi tương ứng với các gói bổ trợ khách hàng đang sở hữu
- [x] `useCRMStore.ts`: Kiểm tra cơ chế trừ tiền hạn mức bồi thường hoạt động chính xác với các loại quyền lợi mới

## Architecture & Integration Details

### 1. Phân loại hiển thị trong Customer Detail Drawer
Khi mở Drawer khách hàng -> Tab "Hợp đồng & Quyền lợi", danh sách `policy.benefits` cần có:
- Badge phân loại rõ: `Nội trú/CSSK`, `Bệnh hiểm nghèo`, `Tai nạn`, `Trợ cấp nằm viện`, `Miễn đóng phí` hoặc `Sản phẩm bổ sung`
- Thước đo hạn mức (Progress bar) tự động tính tỷ lệ phần trăm đã dùng và hạn mức còn lại
- Format tiền tệ chuẩn VND hoặc ngày nằm viện

### 2. Tương thích luồng Claim
- Khi khách hàng gặp sự cố tai nạn hoặc phát hiện bệnh lý:
  - Đại lý mở modal tạo Claim -> Chọn khách hàng -> Chọn HĐ
  - Hệ thống tự động đối chiếu `claimType` (vd: `critical_illness` hoặc `accident_injury`) với các quyền lợi có trong HĐ của khách để cảnh báo hạn mức khả dụng

## Related Code Files

- `src/components/CustomerDetailDrawer.tsx`: Render chi tiết các gói bổ trợ
- `src/components/CustomerCard.tsx`: Tóm tắt số lượng quyền lợi
- `src/components/CustomerTableView.tsx`: Cột quyền lợi & hạn mức
- `src/components/NewClaimModal.tsx`: Chọn quyền lợi bồi thường theo HĐ

## Implementation Steps

1. Nâng cấp component hiển thị `policy.benefits` trong `CustomerDetailDrawer.tsx` với icon và màu sắc tương ứng từng nhóm quyền lợi.
2. Cập nhật thẻ tóm tắt khách hàng `CustomerCard.tsx` để hiển thị số lượng gói bổ trợ đi kèm (vd: `Thẻ CSSK + 3 gói bổ trợ`).
3. Kiểm tra tính tương thích khi tạo hồ sơ bồi thường mới trong `NewClaimModal.tsx` với các loại quyền lợi vừa khởi tạo.

## Todo

- [x] Cải tiến giao diện hiển thị danh sách quyền lợi trong `CustomerDetailDrawer.tsx`
- [x] Cập nhật badge tóm tắt số lượng riders trong `CustomerCard.tsx` và `CustomerTableView.tsx`
- [x] Kiểm tra kết nối giữa các riders mới và modal tiếp nhận hồ sơ bồi thường `NewClaimModal.tsx`
- [x] Đảm bảo thống kê hạn mức `BenefitUtilizationReport.tsx` hiển thị mượt mà

## Success Criteria

- Drawer khách hàng hiển thị rõ ràng từng sản phẩm bổ trợ với tỷ lệ sử dụng và số tiền bảo hiểm.
- Khi tạo hồ sơ bồi thường cho khách hàng có gói Bệnh hiểm nghèo hoặc Tai nạn, hệ thống nhận diện đúng quyền lợi và hạn mức bảo hiểm tương ứng.
