# Phase 03: Mobile Slide-over Drawers

## Objective
Đảm bảo `CustomerDetailDrawer.tsx` và `ClaimDetailDrawer.tsx` hiển thị vừa khít màn hình mobile (`375px`), không bị đẩy mất nút đóng `X` và hiển thị đầy đủ các tab con.

## Files Owned
- `src/components/CustomerDetailDrawer.tsx`
- `src/components/ClaimDetailDrawer.tsx`

## Changes
1. **`CustomerDetailDrawer.tsx`**:
   - Đổi `pl-4 sm:pl-10` thành `pl-0 sm:pl-10` để tận dụng 100% chiều rộng màn hình mobile.
   - Trong Header của Drawer: thêm `min-w-0 flex-1` cho khối thông tin khách hàng, cho phép dòng `1 Hợp đồng • Tổng phí: 36.500.000 đ/năm` tự động xuống dòng mềm mại (`flex-wrap`) thay vì `whitespace-nowrap` đẩy nút `X` ra khỏi màn hình.
   - Thanh Sub-tabs: bố trí lưới `grid grid-cols-2 sm:flex` trên mobile để cả 4 tab (`Hồ sơ Cá nhân`, `Hợp đồng & Quyền lợi`, `Bồi thường Claim`, `Nhật ký Chăm sóc`) hiển thị trọn vẹn, dễ bấm.
2. **`ClaimDetailDrawer.tsx`**:
   - Đổi `pl-10` thành `pl-0 sm:pl-10`, giảm padding trên mobile `p-4 sm:p-6` để nội dung chi tiết hồ sơ bồi thường hiển thị rộng rãi.
