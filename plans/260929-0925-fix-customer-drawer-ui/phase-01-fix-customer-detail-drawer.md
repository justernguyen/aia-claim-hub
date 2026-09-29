---
title: "Phase 1: Sửa UI CustomerDetailDrawer & ClaimDetailDrawer"
status: completed
---

# Phase 1: Sửa UI CustomerDetailDrawer & ClaimDetailDrawer

## Overview
- **Mục tiêu**: Xử lý triệt để lỗi tràn xén tab, nâng cấp giao diện `CustomerDetailDrawer.tsx` và tối ưu responsive cho `ClaimDetailDrawer.tsx`.

## Key Changes
1. **Container Width**:
   - Chuyển từ `max-w-2xl` sang `w-screen max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-3xl` để đảm bảo không gian hiển thị rộng rãi, không bị xén chữ trên laptop/desktop.
2. **Tab Order & Structure**:
   - Đưa Tab "Hồ sơ Cá nhân" lên làm Tab 1 (với icon `User`).
   - Tab 2: "Hợp đồng & Quyền lợi" (icon `ShieldCheck`).
   - Tab 3: "Lịch sử Bồi thường" (icon `Receipt`).
   - Tab 4: "Nhật ký Chăm sóc" (icon `Clock`).
   - Nhãn tab rút gọn thông minh hoặc tự co giãn linh hoạt, thanh cuộn mượt mà trên màn hình nhỏ.
3. **Header**:
   - Phân biệt rõ ràng Họ tên và Giới tính: badge `♂ Nam` hoặc `♀ Nữ`.
   - Bổ sung hiển thị phân khúc (nếu có `customer.segment`).
4. **Nội dung Tab Hồ sơ Cá nhân**:
   - Thiết kế dạng thẻ hiện đại:
     - Thẻ 1: Thông tin định danh (CCCD, Ngày sinh, Giới tính, Mã KH) kèm nút Copy CCCD.
     - Thẻ 2: Thông tin liên hệ (SĐT, Email, Địa chỉ) kèm nút gọi/zalo nhanh.
     - Thẻ 3: Thông tin nghề nghiệp & phân khúc.
     - Thẻ 4: Ghi chú tư vấn nổi bật.
5. **ClaimDetailDrawer**:
   - Cập nhật chiều rộng responsive tương đương.
