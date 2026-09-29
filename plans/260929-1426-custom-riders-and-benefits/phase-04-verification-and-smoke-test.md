---
title: "Phase 4: Verification & Smoke Test"
status: todo
---

# Phase 4: Verification & Smoke Test

## Overview

Thực hiện kiểm thử toàn diện mã nguồn, xác thực kiểu dữ liệu TypeScript, kiểm tra build và chạy smoke test thực tế trên giao diện để chứng minh tính đúng đắn của toàn bộ luồng thêm sản phẩm chính và sản phẩm bổ trợ (Riders).

## Requirements

- [x] Kiểm tra lỗi kiểu dữ liệu với TypeScript compiler (`npm run build` / `tsc --noEmit`)
- [x] Kiểm tra linting và cấu trúc mã nguồn
- [x] Thực hiện smoke test thực tế trên giao diện web:
  - Mở modal "Thêm Khách Hàng & Hợp Đồng Mới"
  - Tùy chỉnh tên sản phẩm chính
  - Bật/tắt và điều chỉnh hạn mức các gói AIA chuẩn (Bệnh hiểm nghèo, Tai nạn, Viện phí...)
  - Thêm một sản phẩm bổ trợ tự do mới (vd: Chăm sóc Nha khoa Quốc tế)
  - Lưu và kiểm tra dữ liệu trong store
  - Mở Drawer chi tiết khách hàng và xác minh hiển thị đầy đủ các gói
  - Mở modal Claim bồi thường xác minh liên kết quyền lợi
- [x] Đảm bảo giao diện phản hồi mượt mà trên cả desktop và màn hình di động

## Verification Steps & Commands

### 1. Kiểm tra biên dịch mã nguồn
```bash
npm run build
```
Kỳ vọng: Không có lỗi TypeScript, bundle build thành công.

### 2. Kịch bản Smoke Test E2E
1. Truy cập ứng dụng tại `http://localhost:5173`.
2. Bấm nút **"+ Thêm khách hàng"** trên Header hoặc trang Quản lý khách hàng.
3. Điền thông tin cá nhân:
   - Họ tên: *Trần Hoàng Nam*
   - Số điện thoại: *0918 888 999*
   - CCCD: *079198009999*
   - Địa chỉ: *Landmark 81, Bình Thạnh, TP.HCM*
4. Tại phần **2. Khởi tạo hợp đồng bảo hiểm AIA**:
   - Chọn Sản phẩm chính: Chọn "+ Nhập sản phẩm khác..." -> Gõ: *AIA - Khỏe Trọn Vẹn Plus*
   - Phí bảo hiểm: *32.000.000đ*
   - Bật gói **Bệnh hiểm nghèo**: STBH *300.000.000đ*
   - Bật gói **Tai nạn toàn diện**: STBH *500.000.000đ*
   - Bật gói **Trợ cấp nằm viện**: Hạn mức *30.000.000đ*
   - Bấm **"+ Thêm sản phẩm bổ trợ khác"**:
     - Tên: *Bảo hiểm Nha khoa Gia đình*
     - Loại quyền lợi: *Nha khoa (dental)*
     - Hạn mức: *15.000.000đ*
5. Bấm **"Hoàn tất thêm khách hàng"**.
6. Xác minh:
   - Thông báo Toast hiển thị thành công.
   - Khách hàng mới xuất hiện trên bảng và thẻ khách hàng.
   - Bấm vào khách hàng để mở **CustomerDetailDrawer**:
     - Kiểm tra tab "Hợp đồng & Quyền lợi".
     - Xác nhận hiển thị đủ 5 quyền lợi với thanh hạn mức tương ứng: Thẻ CSSK, Bệnh hiểm nghèo, Tai nạn, Trợ cấp nằm viện, Nha khoa.

## Related Code Files

- `src/components/NewCustomerModal.tsx`
- `src/components/CustomerDetailDrawer.tsx`
- `src/types/crm.ts`
- `src/hooks/useCRMStore.ts`

## Todo

- [x] Chạy lệnh build TypeScript xác thực toàn bộ codebase
- [x] Thực hiện kịch bản tạo khách hàng với đầy đủ sản phẩm chính + riders
- [x] Xác minh hiển thị trong CustomerDetailDrawer
- [x] Xác minh trong NewClaimModal
- [x] Ghi lại kết quả nghiệm thu

## Success Criteria

- Toàn bộ các bước kiểm thử trong kịch bản chạy trơn tru, không có runtime error.
- Hợp đồng mới được tạo lưu trữ trọn vẹn tất cả các sản phẩm bổ trợ mong muốn.
