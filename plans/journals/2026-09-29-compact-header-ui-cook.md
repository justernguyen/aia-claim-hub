---
title: "Tinh gọn UI Header - Brand & Thẻ Tư vấn viên"
date: "2026-09-29"
summary: "Loại bỏ trùng lặp thương hiệu và thẻ MDRT, bỏ phụ đề dài tránh lỗi cắt chữ ba chấm, tối ưu chiều cao header chuẩn Fintech Single-line"
---

# Tinh gọn UI Header - Brand & Thẻ Tư vấn viên

## 1. Vấn đề giải quyết
- Tiêu đề hệ thống lặp lại chữ "AIA" dù ngay bên trái đã có logo AIA chính thức.
- Xuất hiện 2 huy hiệu MDRT sát nhau ("MDRT PORTAL" cạnh tiêu đề và "MDRT" trong thẻ tư vấn viên).
- Dòng phụ đề mô tả tính năng quá dài bị ép hẹp và cắt cụt bằng dấu ba chấm (`...`) trên màn hình laptop/chia đôi.
- Chiều cao header cũ (`h-18`) tốn diện tích, tạo cảm giác chật chội.

## 2. Các thay đổi thực hiện
- `src/components/Header.tsx`:
  - Rút gọn tiêu đề thành 1 dòng thanh thoát: `Agent CRM` (mobile) / `Agent CRM & Claim Hub` (desktop).
  - Bỏ badge `MDRT PORTAL` phụ, chỉ giữ lại duy nhất 1 huy hiệu `MDRT` vàng nổi bật trên thẻ Tư vấn viên.
  - Xóa bỏ dòng phụ đề dài lặp lại chức năng của 4 tab điều hướng.
  - Tối ưu chiều cao thanh header xuống `h-14 sm:h-16` với đường kẻ phân cách tinh tế `h-5 sm:h-6 w-px bg-slate-200`.
  - Chuẩn hóa padding thẻ Tư vấn viên (`px-3 py-1.5`) và badge (`px-1.5 py-0.5`).

## 3. Xác minh thực tế (Verification)
- Build TypeScript / Vite thành công không lỗi type.
- Chụp kiểm thử trên trình duyệt Chromium thực tế ở các độ phân giải:
  - 1568px: Tiêu đề và thẻ tư vấn viên rộng rãi, thoáng mắt, 0% bị tràn hay cắt chữ.
  - 1280px: Tự động co gọn công cụ phụ, giữ trọn vẹn cụm thương hiệu và thẻ tư vấn viên.
  - 375px (Mobile): Hiển thị gọn gàng `AIA | Agent CRM` cùng avatar và nút `+ Thêm mới`.
