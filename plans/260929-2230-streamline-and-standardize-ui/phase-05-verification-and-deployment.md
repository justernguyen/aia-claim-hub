# Phase 5: Verification, Visual Smoke Testing & Deployment

## Target Files
- `dist/` (build target)
- Git commits & remote push

## Steps
1. Chạy `npm run build` để đảm bảo 0 lỗi TypeScript và bundle thành công.
2. Dùng Chromium browser automation chụp ảnh kiểm chứng (screenshots) toàn bộ các màn hình:
   - Tab 1: Khách hàng (Grid view & Table view).
   - Tab 2: Hồ sơ bồi thường (Metrics, Filter, Bảng hồ sơ).
   - Tab 3: Lịch chăm sóc & Cảnh báo.
   - Tab 4: Thống kê & Báo cáo.
   - Header & Modals.
3. Commit Git với thông điệp chuẩn mực: `style(ui): streamline and standardize interface typography and declutter controls`.
4. Push lên GitHub `origin main` để kích hoạt Vercel tự động build & deploy.
5. Cung cấp báo cáo audit chi tiết, hình ảnh đối chiếu và link triển khai cho người dùng.
