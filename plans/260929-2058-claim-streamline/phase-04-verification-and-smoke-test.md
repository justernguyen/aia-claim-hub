# Phase 4: Kiểm Thử, Responsive & Hoàn Thiện

## Mục tiêu
Đảm bảo toàn bộ luồng tạo và xử lý claim hoạt động trơn tru, không có lỗi runtime, responsive mượt mà trên cả điện thoại di động và máy tính bảng / desktop.

## Checklist kiểm thử
1. **Kiểm tra biên dịch & Types:**
   - Chạy `npm run build` để kiểm tra TypeScript và bundle output.
2. **Kiểm tra luồng tạo Claim (Express 3-Step Wizard):**
   - Bước 1: Chọn khách hàng -> kiểm tra thông tin CCCD, SĐT, HĐ có tự fill chính xác.
   - Bước 2: Bấm chọn chip bệnh viện (ví dụ Chợ Rẫy, Vinmec) -> kiểm tra input tự điền. Nhập số tiền -> kiểm tra format VNĐ và chữ tiếng Việt.
   - Bước 3: Tải ảnh vào từng slot chứng từ -> kiểm tra hiển thị preview và nhãn chứng từ. Bấm "Nộp hồ sơ" -> kiểm tra claim mới xuất hiện ngay trên Kanban/Table.
3. **Kiểm tra Quick Actions trong Drawer:**
   - Mở claim vừa tạo -> Bấm "Báo thiếu chứng từ qua Zalo" hoặc "Nộp thẩm định" -> kiểm tra cập nhật trạng thái và timeline.
4. **Kiểm tra Responsive:**
   - Đảm bảo các modal và drawer không bị tràn màn hình ở viewport 375px/412px và 1280px.
