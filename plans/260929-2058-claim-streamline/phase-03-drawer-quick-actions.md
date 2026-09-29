# Phase 3: Tinh Gọn Thao Tác Trong ClaimDetailDrawer & Quick Actions Bar

## Mục tiêu
Biến ngăn kéo chi tiết claim thành bàn điều khiển tác vụ siêu nhanh cho tư vấn viên, giúp chuyển trạng thái và hỗ trợ khách hàng chỉ bằng 1 cú click.

## File tác động
- `src/components/ClaimDetailDrawer.tsx`

## Chi tiết triển khai
1. **Sticky Quick Action Bar ở chân Drawer:**
   - Nút `Báo thiếu chứng từ qua Zalo`: Tự động quét các chứng từ có trạng thái `missing` hoặc `invalid` trong claim, mở modal copy tin nhắn mẫu kèm danh sách cụ thể gửi ngay cho khách hàng.
   - Nút `Nộp sang Thẩm định AIA`: Chuyển trạng thái claim sang `underwriting`, tự động thêm sự kiện vào timeline "Hồ sơ đã upload lên cổng AIA iClaim".
   - Nút `Cập nhật duyệt chi trả`: Chuyển sang `approved` với số tiền bồi thường.

2. **Tối ưu hiển thị danh sách chứng từ:**
   - Thao tác nhanh với từng chứng từ: 1 click đổi sang "Hợp lệ" hoặc "Bị mờ / Thiếu".
   - Gợi ý lý do từ chối/yêu cầu chụp lại nhanh không cần gõ chữ.
