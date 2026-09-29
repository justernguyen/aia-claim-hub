# Phase 01: Header & Mobile Navigation Bar

## Objective
Loại bỏ hoàn toàn lỗi tràn ngang (`scrollWidth: 543px` trên màn hình `375px`) tại `Header.tsx` và hiển thị đầy đủ cả 4 phân hệ điều hướng trên màn hình điện thoại mà không bị cắt khuất.

## Files Owned
- `src/components/Header.tsx`

## Changes
1. **Top Bar Brand & Actions**:
   - Thêm `min-w-0 flex-1` cho cụm thương hiệu bên trái.
   - Rút gọn linh hoạt tên ứng dụng trên mobile: hiển thị `AIA CRM & Claim` trên màn hình `< 400px` (`sm:hidden`) và `AIA Agent CRM & Claim Hub` từ `sm:` trở lên.
   - Thu gọn nút `+ Thêm mới` trên mobile (`px-2.5 py-2 text-xs`).
2. **4-Tab Navigation Bar**:
   - Trên mobile (`< 640px`), sử dụng lưới `grid grid-cols-2 gap-1.5 py-2` để cả 4 phân hệ (`Khách hàng & HĐ`, `Hồ sơ Bồi thường`, `Lịch chăm sóc`, `Thống kê & Báo cáo`) hiện diện trực quan cùng lúc.
   - Từ `sm:` trở lên, giữ nguyên thanh `sm:flex items-center gap-1.5 py-2`.
