# Nhật ký kỹ thuật: Chuẩn hóa phân cấp thị giác và Typography thẻ Sự kiện (Tab Lịch chăm sóc & Sự kiện)

**Thời gian:** 2026-09-29  
**Mục tiêu:** Nâng cấp độ to rõ, phân cấp thị giác và diện tích tương tác cho các thẻ cảnh báo & sự kiện trong tab "Lịch chăm sóc & Sự kiện" (`UpcomingEventsWidget.tsx` và `CareScheduleSheet.tsx`).

## 1. Vấn đề đã nhận diện & giải quyết
- **Hiện trạng trước sửa:**
  - Tên khách hàng đặt `text-xs sm:text-sm` (12-14px) khá nhỏ trên màn hình desktop.
  - Tiêu đề sự kiện (`alert.title`) chỉ dùng `text-xs` (12px), cùng cỡ với văn bản mô tả dẫn đến khó quét mắt phân loại công việc cần làm.
  - Badge hạn đếm ngược (`daysRemaining`) chỉ đạt `text-[10px]` với padding chật chội.
  - Mã HĐ & Hạn ngày (`policyId`, `dueDate`) chỉ `text-[10.5px]` và `text-[11px]`.
  - Các nút gọi điện & Zalo nhỏ (`p-1.5`, icon `14px`), khó click nhanh.
  - Diện tích thẻ rộng (~400-480px trong 3 cột) nhưng chữ nhỏ làm thẻ có cảm giác lọt thỏm và mất cân đối.

- **Giải pháp triển khai (`UpcomingEventsWidget.tsx`):**
  1. **Tên khách hàng (`alert.customerName`):** Nâng lên `text-sm sm:text-base font-bold text-slate-900 leading-snug`, chữ đậm nét sang trọng.
  2. **Tiêu đề cảnh báo (`alert.title`):** Nâng lên `text-sm sm:text-[14.5px] font-bold text-slate-900 mt-3 leading-snug`, trở thành điểm nhấn thị giác chính của thẻ.
  3. **Nội dung diễn giải (`alert.description`):** Tăng lên `text-[13px] text-slate-600 mt-1.5 leading-relaxed font-normal`.
  4. **Icon danh mục sự kiện:** Nâng từ `w-8 h-8` lên `w-10 h-10 rounded-xl`, icon bên trong từ `w-4 h-4` lên `w-5 h-5` với nền tint dịu mắt (Sinh nhật: rose-50; Gia hạn nộp phí: amber-50; Sau claim: emerald-50).
  5. **Mã hợp đồng (`policyId`):** Đạt chuẩn `text-xs text-slate-500 font-mono font-medium flex items-center gap-1.5`.
  6. **Huy hiệu đếm ngược ("Còn X ngày / Hôm nay!"):** Tăng lên `text-xs font-bold px-2.5 py-1 rounded-full`.
  7. **Hạn chót (`dueDate`):** Hiển thị rõ ràng với `text-xs text-slate-500 font-mono`.
  8. **Nút thao tác gọi & Zalo:** Mở rộng hit target lên `p-2 rounded-xl`, icon `w-4 h-4` (16px), phản hồi hover mượt mà.
  9. **Header & Bộ lọc:** Nâng cỡ tiêu đề widget lên `text-base font-bold text-slate-900`, subtitle `text-xs sm:text-[13px]`, các nút filter pill đạt `px-3 py-1.5`.

- **Cải thiện kèm theo (`CareScheduleSheet.tsx`):**
  - Đồng bộ kích thước font chữ bảng tương tác từ 10-11px lên 11-12px cho các cột Kênh, Nội dung trao đổi, Kết quả và Việc cần làm tiếp theo.

## 2. Kết quả kiểm thử & xác thực (Verification)
- **Build & Typecheck:** `tsc -b && vite build` thành công trong 813ms, không phát sinh lỗi hoặc cảnh báo TypeScript mới.
- **Linting:** `oxlint` chạy hoàn tất sạch sẽ trên các file thay đổi.
- **Smoke Test Trực quan:** Đã mở ứng dụng trên Chromium headless qua `browser` tool và chụp ảnh màn hình kiểm chứng (`verify-care-cards-typography.png`). Các thẻ hiển thị cân đối, chữ to rõ ràng, phân cấp thị giác nổi bật ngay lập tức.
