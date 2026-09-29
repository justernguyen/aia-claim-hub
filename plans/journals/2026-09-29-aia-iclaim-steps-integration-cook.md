---
title: Hoàn Tất Tích Hợp Quy Trình Claim Hồ Sơ Bảo Hiểm 4 Bước Chuẩn AIA iClaim
date: 2026-09-29
summary: Triển khai hoàn tất 4 phase tích hợp 9 ảnh chụp màn hình thực tế từ D:\Desktop\claim vào NewClaimModal.tsx và useCRMStore.ts, kiểm thử trực quan trên cả Desktop và iPhone Mobile Viewport.
---

# Hoàn Tất Tích Hợp Quy Trình Claim Hồ Sơ Bảo Hiểm 4 Bước Chuẩn AIA iClaim

Triển khai hoàn tất 4 phase tích hợp 9 ảnh chụp màn hình thực tế từ thư mục `D:\Desktop\claim` vào `NewClaimModal.tsx` và `useCRMStore.ts`.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Kết quả thực hiện
1. **Dữ liệu chuẩn hóa AIA (`src/data/claimPortalData.ts`):**
   - Định nghĩa chi tiết 11 quyền lợi bồi thường AIA kèm tooltip hướng dẫn.
   - Danh mục chứng từ chuyên biệt theo từng quyền lợi (Hóa đơn viện phí, Sổ khám bệnh/toa thuốc, Bảng kê chi phí ra viện, Giấy phẫu thuật...).
   - Danh sách 22 mã bệnh ICD-10 phổ biến, 16 tỉnh thành và bệnh viện liên kết, 16 ngân hàng Việt Nam.

2. **Giao diện Wizard 4 bước chuẩn AIA iClaim (`src/components/NewClaimModal.tsx`):**
   - **Thanh tiến trình 4 bước:** `(1) - (2) - (3) - (4)` với màu xanh cyan cho bước hoàn thành, đỏ AIA cho bước hiện tại.
   - **Bước 1 (Ảnh 1, 2, 3, 4, 5, 6):**
     * Xác thực đại lý ủy quyền `000850386` (Dương Thị Như Ý), CCCD bên mua, Cloudflare Turnstile và điều khoản AIA.
     * Modal mô phỏng OTP gửi về điện thoại `XXXXXX7956`.
     * Lưới 11 quyền lợi AIA dạng thẻ có icon, checkbox và nút tooltip `(i)`.
     * Bộ uploader chứng từ phân loại theo nhóm có preview thumbnail dạng carousel, tên file (`IMG_8327.jpeg`), điều hướng `< >` và nút xóa.
   - **Bước 2 (Ảnh 7, 8):**
     * Nhóm I: Họ tên NĐBH, Quan hệ với Bên mua, Ngày sự kiện, Tổng tiền yêu cầu thanh toán real-time format và đọc chữ VND.
     * Nhóm II: Tỉnh/thành, Bệnh viện điều trị (kèm gợi ý bệnh viện nhanh), Nguyên nhân sự kiện, Tra cứu kép mã bệnh ICD-10 và tên bệnh, Textarea chẩn đoán y khoa chi tiết.
   - **Bước 3 (Ảnh 9):**
     * Chọn 2 phương thức: *Nhận qua tài khoản ngân hàng* (Ngân hàng, STK, Tên chủ TK) hoặc *Nhận tiền mặt tại Ngân hàng*.
     * Cảnh báo đỏ in đậm: *"Lưu ý: Không áp dụng Ủy quyền nhận tiền cho các loại yêu cầu Giải quyết quyền lợi bảo hiểm!"*.
   - **Bước 4:**
     * Bảng tóm tắt toàn bộ hồ sơ (Review Summary Card) và gallery ảnh chứng từ đính kèm.
     * Checkbox cam kết tính trung thực của hồ sơ.
     * Nút "NỘP HỒ SƠ BỒI THƯỜNG" màu đỏ AIA.

3. **Lưu trữ & CRM Store (`src/hooks/useCRMStore.ts` & `src/types/claim.ts`):**
   - Mở rộng kiểu dữ liệu `ClaimItem` với `icd10Code`, `hospitalCity`, `claimReason`, `paymentMethod`, `bankAccount`, `totalBillAmount`.
   - Hàm `addClaim` lưu giữ trọn vẹn toàn bộ trường thông tin vào state và `localStorage`.

4. **Kiểm thử & Nghiệm thu:**
   - Biên dịch TypeScript và Vite: `npm run build` thành công trong 700ms.
   - Oxlint: 0 lỗi, 0 cảnh báo.
   - Smoke test thực tế bằng headless Chromium trên Desktop và Mobile (iPhone 14 Viewport `390x844`), xác nhận khớp 100% bố cục và hành vi từ 9 ảnh thực tế tại `D:\Desktop\claim`.
