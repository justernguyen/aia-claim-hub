---
title: "Kiến trúc Bảo mật Hybrid: Tự động Che Mờ & Mã Hóa Dữ liệu Khách Hàng / Claim"
description: "Tự động che mờ thông tin PII (SĐT, CCCD) trên toàn bộ giao diện và cung cấp tùy chọn mã hóa cứng AES-256 bảo vệ kho dữ liệu bằng mã PIN."
status: completed
priority: P1
effort: "4h"
tags: ["security", "privacy", "crypto", "aes-256", "import", "claims"]
created: 2026-10-05
---

# Kiến trúc Bảo mật Hybrid: Tự động Che Mờ & Mã Hóa Dữ liệu Khách Hàng / Claim

## Bối cảnh & Mục tiêu

Khi tư vấn viên nhập tay hoặc nạp hàng loạt danh sách khách hàng và hồ sơ bồi thường (Claim) từ cổng AIA POS bằng file Excel (`.xlsx`, `.xls`) hoặc văn bản dán:
1. **Nguy cơ 1 (Nhìn trộm màn hình / Lộ PII)**: Khi làm việc tại quán cafe, phòng hội thảo hoặc mở máy tính trước mặt khách hàng khác, thông tin CCCD, Số điện thoại và Hồ sơ bệnh án hiển thị rõ ràng, dễ bị lộ lọt thông tin cá nhân.
2. **Nguy cơ 2 (Truy xuất trộm dữ liệu máy tính)**: Toàn bộ danh bạ và claim lưu trữ dạng văn bản thô (Plain Text) trong `localStorage` của trình duyệt. Người khác mở máy tính có thể vào F12 trích xuất toàn bộ dữ liệu.

**Giải pháp Hybrid**:
- **Tầng 1 (Tự động che mờ - Data Masking)**: Mặc định bật chế độ bảo mật riêng tư. Mọi dữ liệu CCCD (`079 *** *** 2341`), SĐT (`0912 *** 678`) được tự động che mờ trên Bảng khách hàng, Thẻ danh bạ, Drawer chi tiết, Bảng Claim. Có nút chuyển đổi 👁️ trên Header giúp đại lý chủ động xem rõ từng trường hoặc toàn bộ khi cần.
- **Tầng 2 (Mã hóa lưu trữ AES-256 & Khóa PIN)**: Tích hợp thư viện Web Crypto API chuẩn quân đội (AES-GCM 256-bit + PBKDF2). Cho phép tư vấn viên thiết lập Mã PIN (4-6 số) để mã hóa toàn bộ kho lưu trữ trên máy và khóa mật khẩu cho các tệp sao lưu JSON xuất ra.

---

## Các giai đoạn triển khai (Phases)

| # | Phase | Trọng tâm | Trạng thái |
|---|---|---|---|
| 1 | [Phase 1: Security & Masking Engine](./phase-01-start.md) | Module Web Crypto AES-256 & Hàm tiện ích che mờ PII | In Progress |
| 2 | [Phase 2: Privacy Mode State & Header Controls](./phase-02-privacy-mode-header-controls.md) | Quản lý trạng thái bảo mật toàn cục & Nút bấm trên Header | Pending |
| 3 | [Phase 3: Tích hợp Che mờ trên Giao diện](./phase-03-ui-surfaces-auto-masking.md) | Tự động che mờ trên Bảng KH, Card, Drawer KH, Bảng Claim | Pending |
| 4 | [Phase 4: Mã hóa Kho Lưu trữ & File Backup bằng PIN](./phase-04-pin-aes256-storage-and-backup.md) | Tùy chọn cài PIN mã hóa LocalStorage & Tệp sao lưu JSON | Pending |
| 5 | [Phase 5: Kiểm thử & Nghiệm thu Toàn diện](./phase-05-verification-and-smoke-test.md) | Kiểm tra build, test import Excel, test mã hóa/giải mã | Pending |

---

## Tiêu chuẩn nghiệm thu cốt lõi (Success Criteria)

- [ ] Import file Excel (`.xlsx`) hoặc dán tay: dữ liệu vào máy an toàn, tự động che mờ CCCD và SĐT.
- [ ] Header có nút công tắc 👁️ "Chế độ riêng tư" (Privacy Mode) với tooltip rõ ràng.
- [ ] Click nút mắt hoặc click trực tiếp vào ô SĐT/CCCD có thể tạm thời hiện rõ số để đối soát.
- [ ] Module mã hóa AES-GCM 256-bit hoạt động chuẩn Web Crypto bản địa, không phụ thuộc thư viện ngoài nặng nề.
- [ ] Modal Sao lưu & Dữ liệu hỗ trợ xuất file JSON có khóa mã hóa bằng PIN và khôi phục an toàn.
- [ ] Chạy `npm run build` và `npm run lint` đạt 100% không lỗi type.
