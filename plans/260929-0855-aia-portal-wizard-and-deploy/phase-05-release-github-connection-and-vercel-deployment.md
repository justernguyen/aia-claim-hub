---
title: "Phase 5: Release GitHub Connection & Vercel Deployment"
status: todo
priority: P1
effort: 1h
---

# Phase 5: Release GitHub Connection & Vercel Deployment

## Overview

Chuẩn bị sẵn sàng hạ tầng triển khai online lên Vercel:
1. Tạo cấu hình `vercel.json` định tuyến SPA Client-side không bị lỗi 404 khi người dùng tải lại trang.
2. Kiểm tra `npm run build` đạt chứng nhận zero errors và bundle size tối ưu.
3. Hướng dẫn chi tiết kết nối GitHub tài khoản `justernguyen` và Vercel để nhận link webapp online chia sẻ cho bạn bè test thử.

---

## Related Files

### Files to Modify / Create:
- `vercel.json`
- `package.json`

---

## Todo List

- [x] Cấu hình file `vercel.json` xử lý SPA route
- [x] Chạy lệnh `npm run build` xác nhận build thành công
- [x] Tạo commit Git sạch sẽ, chuẩn bị sẵn remote `justernguyen`
- [x] Soạn hướng dẫn 3 bước kết nối GitHub & Vercel cho người dùng

---

## Success Criteria

- Webapp build thành công không lỗi type.
- Triển khai online mượt mà trên Vercel.
- Link webapp online mở được trên cả điện thoại di động và máy tính.
