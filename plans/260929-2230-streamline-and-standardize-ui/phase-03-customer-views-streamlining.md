# Phase 3: Customer Management View & Card Streamlining

## Target Files
- `src/components/CustomerManagementView.tsx`
- `src/components/CustomerCard.tsx`
- `src/components/CustomerTableView.tsx`

## Changes
1. **CustomerManagementView**:
   - Tinh gọn thanh tìm kiếm & bộ lọc: Đặt nút `Thêm khách hàng` và `Nhập Excel` vào vị trí hợp lý, tránh lặp lại hành động thừa.
   - Thống nhất các pill lọc trạng thái (`Tất cả`, `Đang hiệu lực`, `Chờ nộp phí`): chữ `text-xs font-semibold`, số đếm tròn nhẹ nhàng.
2. **CustomerCard (Grid View)**:
   - Giảm độ dày đặc thông tin: Thay vì cố nhồi nhét cả 8 loại thông tin vào một card nhỏ, ưu tiên: Họ tên, Giới tính, SĐT, Số hợp đồng, Tổng phí năm, Trạng thái HĐ.
   - Hạn mức thẻ sức khỏe: Hiển thị thanh tiến độ thanh thoát, số phần trăm ngắn gọn, không dùng các chữ in đậm lòe loẹt.
   - Nút hành động ở chân card: Một nút `Chi tiết` thanh lịch duy nhất (bấm vào card hoặc nút đều mở Drawer đầy đủ).
3. **CustomerTableView (Table View)**:
   - Tối ưu các cột: Không để cột quá dày đặc thông tin.
   - Giảm số lượng badge màu sắc cạnh tranh nhau trong một ô bảng.
   - Phông số tiền định dạng rõ ràng, căn phải chuẩn kế toán.
