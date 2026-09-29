# Nhật ký thực hiện: Sửa lỗi tràn viền bảng tương tác chăm sóc khách hàng (Mất góc phải)

- **Ngày thực hiện**: 2026-09-29
- **Mục tiêu**: Xử lý triệt để lỗi mất góc phải bảng chăm sóc khách hàng (`CareScheduleSheet`), đảm bảo cột "Xóa" và toàn bộ 9 cột hiển thị nguyên vẹn trên mọi màn hình máy tính để bàn và laptop.
- **Tập tin can thiệp**: `src/components/CareScheduleSheet.tsx`

## 1. Nguyên nhân gốc rễ
1. Cấu trúc lồng 2 viền và padding: Thẻ card ngoài cùng mang padding `p-5` (40px) bao quanh cả bộ lọc và bảng dữ liệu. Bảng dữ liệu lại được bọc thêm một thẻ viền `border rounded-xl` riêng, làm mất 42px diện tích hiển thị chiều ngang.
2. Tổng `min-w` và `w` của 9 cột lên tới 1193px, trong khi khung hiển thị chỉ rộng 1172px (ở màn hình 1280px - 1920px do giới hạn `max-w-7xl`). Dẫn đến bảng luôn bị tràn viền 21px, làm cột ngoài cùng bên phải ("Xóa") bị cắt cụt.

## 2. Giải pháp đã triển khai
1. Chuyển cấu trúc Card sang chuẩn **Edge-to-Edge Grid**:
   - Vùng tìm kiếm & bộ lọc: Đặt padding chuẩn `p-4 sm:p-5`.
   - Vùng bảng dữ liệu: Bỏ lớp viền lồng thứ hai, trải dài sát viền Card và ngăn cách bằng `border-t border-slate-200`. Thu hồi ngay 42px chiều ngang.
2. Chuẩn hóa tỷ lệ phân bổ kích thước cột:
   - `Xong`: `w-11` (44px)
   - `Ngày`: `w-24` (90px)
   - `Khách hàng`: `min-w-[135px]`
   - `Kênh`: `min-w-[105px]`
   - `Nội dung trao đổi / Tư vấn`: `min-w-[200px]`
   - `Kết quả`: `min-w-[150px]`
   - `Việc tiếp theo`: `min-w-[160px]`
   - `Hẹn tiếp`: `w-24` (90px)
   - `Xóa`: `w-10` (40px)

## 3. Kết quả nghiệm thu
- TypeScript compiler & Vite build: Đạt (`0 errors`).
- Đo đạc thực tế qua Chromium:
  - 1200px: `overflow = 0px` (Khớp 100%)
  - 1280px: `overflow = 0px` (Khớp 100%)
  - 1366px: `overflow = 0px` (Khớp 100%)
  - 1440px: `overflow = 0px` (Khớp 100%)
  - 1920px: `overflow = 0px` (Khớp 100%)
- Không còn bất kỳ hiện tượng đứt chữ "XÓA" hay cắt biểu tượng thùng rác. Giao diện thoáng đãng, đồng bộ hoàn hảo với toàn bộ hệ thống.
