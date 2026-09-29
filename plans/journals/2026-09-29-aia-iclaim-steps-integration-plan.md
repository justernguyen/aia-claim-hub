---
title: Kế Hoạch Tích Hợp Quy Trình Claim Hồ Sơ Bảo Hiểm 4 Bước Chuẩn AIA iClaim
date: 2026-09-29
summary: Khởi tạo kế hoạch 4 phase tích hợp 9 ảnh chụp màn hình thực tế từ D:\Desktop\claim vào NewClaimModal, chuyển đổi form đơn thành Wizard 4 bước tương tác chuẩn cổng AIA iClaim.
---

# Kế Hoạch Tích Hợp Quy Trình Claim Hồ Sơ Bảo Hiểm 4 Bước Chuẩn AIA iClaim

Khởi tạo kế hoạch 4 phase chi tiết tích hợp 9 ảnh chụp màn hình thực tế từ thư mục `D:\Desktop\claim` vào `NewClaimModal.tsx` và CRM Store.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Chi tiết kế hoạch
- **Plan directory**: `plans/260929-2049-aia-iclaim-steps-integration/`
- **Tài liệu tham chiếu**: 9 ảnh chụp màn hình giao diện cổng `aia.com.vn` trên iPhone tại `D:\Desktop\claim`.
- **4 Phase thực hiện**:
  1. `phase-01-domain-and-step-1-benefit-docs-wizard.md`: Dữ liệu chuẩn AIA, Step 1: Xác thực Đại lý (`000850386`) & CCCD, OTP modal, Lưới 11 quyền lợi, Đính kèm ảnh theo danh mục chứng từ với thumbnail carousel.
  2. `phase-02-step-2-treatment-and-icd10-diagnosis.md`: Step 2: Nhóm I (NĐBH, Ngày sự kiện, Tổng tiền yêu cầu) và Nhóm II (Tỉnh/thành, Bệnh viện, Tra cứu mã bệnh ICD-10 & Tên bệnh, Chẩn đoán chi tiết ra viện).
  3. `phase-03-step-3-payment-and-step-4-review-submission.md`: Step 3: Phương thức nhận tiền (Tài khoản ngân hàng / Tiền mặt) kèm cảnh báo ủy quyền, Step 4: Bảng tóm tắt hồ sơ & Nộp claim vào `useCRMStore`.
  4. `phase-04-responsive-verification-and-smoke-test.md`: Kiểm thử giao diện Mobile (375-430px) và Desktop, kiểm thử luồng tạo claim, chạy kiểm tra `npm run build` và `npm run lint`.
