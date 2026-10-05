---
title: Auto Encrypt and Masking Security for Import
date: 2026-10-05
summary: "Triển khai kiến trúc bảo mật Hybrid: Tự động che mờ PII (SĐT, CCCD) trên giao diện với nút Privacy Mode và mã hóa Web Crypto AES-256 tệp sao lưu có mã PIN"
---

# Auto Encrypt and Masking Security for Import

## 1. Bối cảnh & Yêu cầu
Người dùng đặt câu hỏi về khả năng tự động mã hóa dữ liệu khi import danh bạ khách hàng và hồ sơ bồi thường (Claim) từ file Excel hoặc nhập tay.
Đại lý bảo hiểm AIA thường xuyên phải mở máy tính tư vấn tại quán cà phê, phòng họp hoặc trước mặt khách hàng khác, dẫn đến nguy cơ lộ lọt thông tin cá nhân (PII như CCCD, SĐT, Tiền sử bệnh).

## 2. Quyết định Kỹ thuật (Hybrid Security Architecture)
- **Tầng hiển thị (Visual Privacy / Data Masking)**:
  - Mặc định bật chế độ bảo mật `isPrivacyMode: true` (lưu trong `localStorage`, phím tắt `Alt+P`).
  - Toàn bộ SĐT (`0912 ••• 678`) và CCCD (`079 ••• ••• 341`) tự động che mờ trên Bảng khách hàng, Thẻ khách hàng, Drawer chi tiết khách hàng và Drawer chi tiết Claim.
  - Hỗ trợ xem nhanh (Click-to-Peek) bằng nút mắt cạnh từng trường và sao chép an toàn vào clipboard.
  - Bộ tìm kiếm và lọc trong danh bạ vẫn đối soát chính xác theo 4 số cuối điện thoại hoặc số CCCD thô mà không bị ảnh hưởng bởi việc che mờ.
- **Tầng lưu trữ & Sao lưu (Storage & Backup Web Crypto AES-256)**:
  - Xây dựng module `src/utils/crypto.ts` dựa trên chuẩn `window.crypto.subtle` bản địa (zero dependencies).
  - Thuật toán AES-GCM 256-bit kết hợp PBKDF2 (SHA-256, 100.000 iterations, 16-byte salt, 12-byte IV).
  - Tùy chọn khóa mật mã tệp sao lưu JSON xuất ra từ `DataBackupModal.tsx` bằng mã PIN (4-8 số).
  - Tự động nhận diện tệp sao lưu đã khóa khi import và yêu cầu nhập đúng PIN để giải mã; báo lỗi rõ ràng nếu nhập sai PIN.
  - Bổ sung huy hiệu bảo mật Zero-Cloud PII trong modal tiếp nhận file Excel AIA POS (`CustomerImportModal.tsx`).

## 3. Các file đã thay đổi / tạo mới
- `src/utils/crypto.ts` (Tạo mới): Engine mã hóa AES-GCM 256-bit & PBKDF2 bản địa.
- `src/utils/formatters.ts`: Mở rộng `formatPhone`, `formatCCCD` hỗ trợ tham số `isMasked`, bổ sung `maskText`.
- `src/hooks/usePrivacyMode.ts` (Tạo mới): Quản lý trạng thái Privacy Mode toàn cục và lắng nghe phím tắt `Alt+P`.
- `src/components/Header.tsx`: Nút bật/tắt Chế độ riêng tư (`Eye` / `EyeOff`) kèm tooltip.
- `src/App.tsx`: Kết nối `usePrivacyMode` và truyền cờ bảo mật xuống các component con.
- `src/components/CustomerManagementView.tsx`: Hiển thị badge bảo vệ PII trên thanh công cụ và truyền cờ bảo mật xuống bảng/thẻ/drawer.
- `src/components/CustomerTableView.tsx`: Che mờ CCCD và SĐT theo `isPrivacyMode`.
- `src/components/CustomerCard.tsx`: Che mờ SĐT theo `isPrivacyMode`.
- `src/components/CustomerDetailDrawer.tsx`: Che mờ CCCD và SĐT với nút mắt Toggle Peek riêng lẻ.
- `src/components/ClaimTableView.tsx` & `src/components/ClaimDetailDrawer.tsx`: Che mờ SĐT và CCCD khách hàng trong hồ sơ claim.
- `src/components/CustomerImportModal.tsx`: Badge thông báo bảo mật tự động Zero-Cloud PII khi nạp file Excel.
- `src/components/DataBackupModal.tsx` & `src/hooks/useCRMStore.ts`: Tính năng xuất file sao lưu JSON mã hóa bằng PIN và hộp thoại mở khóa khi khôi phục.

## 4. Kết quả nghiệm thu (Verification)
- `npm run lint`: 0 errors.
- `npm run build`: TypeScript compile 100% pass, Vite bundle tạo thành công.
- Smoke test Web Crypto: Mã hóa đúng định dạng `AIA_VAULT_AES256_V1`, giải mã đúng PIN khôi phục 100% dữ liệu, sai PIN bị từ chối chính xác với thông báo lỗi rõ ràng.
