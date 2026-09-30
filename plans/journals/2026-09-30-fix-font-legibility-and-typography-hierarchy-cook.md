# Ký sự kỹ thuật: Chuẩn hóa Font Inter & Phân cấp Typography Dễ xem cho Modal Bồi thường

- **Ngày thực hiện:** 2026-09-30
- **Mục tiêu:** Khắc phục tình trạng chữ bị đen kịt, nét quá dày (`font-black`, `font-extrabold`), thiếu phân tầng thị giác và lỗi fallback về phông Windows Segoe UI trên modal Chi tiết hồ sơ bồi thường (`ClaimDetailDrawer`).

---

## 1. Nguyên nhân gốc rễ (Root Cause)

1. **Lỗi biến phông trong Tailwind CSS v4 (`src/index.css` & `App.tsx`):**
   - Khối cấu hình `@theme` trong `src/index.css` thiếu khai báo biến `--font-sans`.
   - `App.tsx` đặt class `font-sans` ở container gốc. Trên Tailwind v4, điều này khiến trình duyệt phân giải `font-sans` thành `var(--font-sans)` rơi về `system-ui` (trên Windows là `Segoe UI`), đè lên khai báo `body { font-family: 'Inter', ... }`.
   - Phông Segoe UI trên Windows khi gánh weight đậm khiến các dấu thanh tiếng Việt (huyền, sắc, hỏi, ngã, nặng, nón, râu) bị bẹt, dính nét và lem nhem.

2. **Lạm dụng trọng số cực đại trong `ClaimDetailDrawer.tsx`:**
   - Hầu hết các nhãn trường (`label`), giá trị (`value`) và tiêu đề đều bị gán `font-black` (900) hoặc `font-extrabold` (800) kèm màu mực `text-slate-950`.
   - Không có khoảng nghỉ và phân cấp thị giác (nhãn cũng đen đậm, số liệu cũng đen kịt), gây cảm giác chật chội và nhức mắt cho tư vấn viên khi tra cứu hồ sơ claim.

---

## 2. Giải pháp thực thi

1. **Thiết lập chuẩn font hệ thống (`src/index.css`):**
   - Bổ sung `--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;` vào `@theme`.
   - Đảm bảo toàn bộ ứng dụng sử dụng đúng Google Font `Inter` đồng bộ và mượt mà trên mọi trình duyệt.

2. **Chuẩn hóa phân tầng thị giác 3 cấp (`src/components/ClaimDetailDrawer.tsx`):**
   - **Cấp 1 - Nhãn trường & Dẫn hướng:** Chuyển về `text-xs font-medium text-slate-500 mb-1` thanh lịch, rõ ràng mà không tranh chấp độ chú ý với dữ liệu.
   - **Cấp 2 - Dữ liệu chính:** Chuyển về `text-sm font-semibold text-slate-900` sắc nét, dễ quét mắt.
   - **Cấp 3 - Con số tài chính & Nhận diện AIA:**
     - Số hợp đồng AIA: `text-base font-bold font-numeric text-aia-red`.
     - Số tiền yêu cầu & phê duyệt: `text-xl sm:text-2xl font-bold font-numeric` với màu chuẩn Slate / Emerald.
     - Khối chẩn đoán bệnh: `bg-white border-slate-200 text-slate-800 font-medium text-xs sm:text-sm` kèm badge mã ICD-10 `bg-slate-800 text-white font-semibold`.
     - Tiêu đề mục: `text-xs font-semibold text-slate-600 uppercase tracking-wider`.

---

## 3. Xác thực & Nghiệm thu

- `npm run build`: Hoàn thành biên dịch TypeScript và đóng gói Vite thành công (921ms), không lỗi type/style.
- Headless Chromium Smoke Test: Đã mở modal chi tiết hồ sơ `CLM-2026-0086`, chụp lại hình ảnh thực tế tại `plans/verify-font-fixed-modal.png`. Chữ tiếng Việt rõ nét, phân tầng nhãn - giá trị rành mạch, thanh thoát và đạt tiêu chuẩn SaaS hiện đại.
