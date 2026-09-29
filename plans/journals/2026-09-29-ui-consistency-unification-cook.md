# Nhật ký kỹ thuật: Chuẩn hóa đồng nhất giao diện AIA Luxury Minimalist

**Thời gian:** 2026-09-29  
**Mục tiêu:** Khắc phục triệt để tình trạng UI không đồng nhất, màu sắc rời rạc, thiết kế lệch chuẩn giữa Tab 1 (Khách hàng & HĐ) và Tab 2 (Hồ sơ Bồi thường).

## 1. Các vấn đề cốt lõi đã xử lý

1. **Dải thẻ KPI (Metrics Strip) ở Tab Bồi thường (`MetricsOverview.tsx`):**
   - Trước: 4 thẻ với 4 kiểu dáng khác nhau, thẻ thẩm định có viền xanh dương chói (`ring-blue-500`), chữ vàng/xanh lục kích thước bất đối xứng, phá vỡ nhận diện AIA.
   - Sau: Chuẩn hóa 1:1 theo khuôn mẫu thẻ cao cấp của Tab 1 (`bg-white rounded-2xl border border-slate-200/90 shadow-xs`), icon góc phải đặt trong khung bo tròn 10x10 có màu nền tint nhẹ, số hiển thị chuẩn `font-numeric`, trạng thái active chọn lọc theo viền đỏ AIA thanh lịch (`border-aia-red ring-aia-red/10`).

2. **Banner Cảnh báo SLA (`MetricsOverview.tsx`):**
   - Trước: Chiếm khối nền vàng đất lớn, nút bấm màu cam đất thô ráp xung đột với màu đỏ thương hiệu AIA.
   - Sau: Tái thiết kế thành alert bar phong cách Luxury White & Rose Tint, badge "Ưu tiên xử lý" đỏ AIA và nút action "Lọc ca đang thẩm định" đúng tone đỏ thương hiệu.

3. **Thanh công cụ lọc (Toolbar & FilterBar):**
   - Đồng bộ trạng thái active của cụm chuyển đổi chế độ xem (Bảng / Kanban / Grid / Table) với màu đỏ AIA trên nền trắng nổi (`bg-white shadow-xs text-aia-red`).
   - Bổ sung nút xóa nhanh 'X' và đồng bộ padding, bo góc (`rounded-xl`), font size giữa ô tìm kiếm của cả 2 tab.

4. **Thẻ Khách hàng (`CustomerCard.tsx`):**
   - Sửa dứt điểm lỗi tràn chữ làm tên khách hàng bị cắt cụt (ví dụ: `Nguyễn Thị Mai A...`).
   - Bố cục lại huy hiệu giới tính và nghề nghiệp xuống hàng dưới, nhường trọn vẹn bề ngang cho họ tên khách hàng hiển thị trang trọng, chuyên nghiệp.

5. **Luồng Kanban Bồi thường (`ClaimKanbanView.tsx`):**
   - Làm mềm ô trống "Không có hồ sơ" ở các cột không có ca, loại bỏ viền nét đứt dày thô.
   - Tinh chỉnh màu sắc badge số lượng và chấm trạng thái ở header cột sang các tone màu nhẹ nhàng, đồng nhất.

## 2. Kết quả kiểm thử (Verification)
- `npm run build`: Hoàn tất không có lỗi TypeScript hay Vite chunking syntax (`tsc -b && vite build` thành công).
- Visual Smoke Test: Đã kiểm tra trực tiếp qua Chromium headless trên cả 2 màn hình Tab 1 và Tab 2 (chế độ Bảng & Kanban). Giao diện đạt độ đồng bộ cao cấp và thanh lịch đúng chuẩn AIA.
