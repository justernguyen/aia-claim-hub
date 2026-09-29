# Phase 04: Verification, Build & Vercel Deployment

## Objective
Kiểm tra trực quan toàn bộ 4 tab và Drawer trên trình duyệt ở độ phân giải Mobile (`375x812`) và Desktop (`1280x800`), xác nhận `npm run build` 0 lỗi và đẩy lên nhánh `main` để Vercel tự động triển khai.

## Verification Checklist
- [ ] `document.documentElement.scrollWidth === 375` trên viewport `375x812`.
- [ ] Chụp ảnh xác nhận 4 tab trên mobile không còn lỗi tràn viền hay đè chữ.
- [ ] Chụp ảnh xác nhận `CustomerCard` và `CustomerDetailDrawer` hiển thị chuẩn mực trên mobile.
- [ ] Chạy `npm run build` đạt 0 lỗi TypeScript & Vite bundle.
- [ ] Commit và `git push origin main` để kích hoạt Vercel deployment.
