# Nhật Ký Thực Hiện: Khắc Phục Lỗi Kanban Bị Tràn Cắt Thẻ & Bổ Sung Kéo Thả (Drag & Drop)

- **Ngày:** 2026-09-29
- **Phạm vi:** `src/components/ClaimKanbanView.tsx`, `src/index.css`
- **Công nghệ:** React 19, Native HTML5 Drag and Drop API, Tailwind CSS

---

## 1. Vấn đề thực tế

- **Không kéo thả được:** Thẻ Kanban trước đây chỉ bắt sự kiện mở Drawer và menu `<select>` nhỏ, thiếu toàn bộ thuộc tính `draggable` và các sự kiện kéo thả (`onDragStart`, `onDragOver`, `onDrop`, `onDragLeave`).
- **Cắt thẻ và tràn cột:** Cột "AIA Thẩm định" có 7 hồ sơ nhưng các cột không bị giới hạn chiều cao (`items-start` với `min-h-[500px]`), khiến cột dài vô tận chìm xuống đáy màn hình, chỉ thấy được 2.5 thẻ, mất 4 thẻ bên dưới và không cuộn được nội bộ.
- **Vỡ chữ mã hồ sơ:** `CLM-2026-xxxx` bị ngắt dòng thành `CLM-` và `2026-xxxx` do chia sẻ flexbox hẹp với nhãn bồi thường mà thiếu `shrink-0 whitespace-nowrap`.

---

## 2. Giải pháp kỹ thuật

1. **Native HTML5 Drag and Drop API (0 dependency, tương thích 100% React 19):**
   - Bổ sung `useRef` và state quản lý ID hồ sơ đang kéo (`draggedClaimId`, `draggedClaimIdRef`) cùng cột mục tiêu (`dragOverColId`).
   - Thẻ hồ sơ: gắn `draggable={true}`, icon chỉ dẫn cầm kéo `GripVertical`, hiệu ứng mờ nhạt và viền nét đứt khi đang kéo.
   - Cột đích: bắt `onDragOver`, `onDragEnter`, `onDragLeave`, `onDrop` với hiệu ứng viền đỏ AIA `border-aia-red` và hộp hướng dẫn thả hồ sơ trực quan.
   - Giữ lại dropdown `<select>` nhanh để tương thích màn hình cảm ứng di động.

2. **Chuẩn hóa chiều cao cột & Cuộn nội bộ mượt mà:**
   - Đặt chiều cao cột đồng đều `h-[calc(100vh-275px)] min-h-[560px]` kết hợp `items-stretch`.
   - Danh sách thẻ bên trong dùng `flex-1 overflow-y-auto kanban-column-scroll` với thanh cuộn thanh mảnh 4px, cố định layout.

3. **Chống gãy rớt dòng mã hồ sơ:**
   - Mã hồ sơ được bọc `shrink-0 whitespace-nowrap tracking-tight font-numeric`.
   - Nhãn loại quyền lợi tự động cắt ngắn (`truncate max-w-[80px]`) và có tooltip đầy đủ.

---

## 3. Kết quả nghiệm thu

- Toàn bộ 6 cột có chiều cao 675px bằng nhau tuyệt đối.
- Cột "AIA Thẩm định" có `scrollHeight: 1651px > clientHeight: 604px` cuộn nội bộ mượt mà, hiển thị đầy đủ 7 hồ sơ không bị tràn màn hình.
- Thử nghiệm kéo thả thẻ `CLM-2026-0086` từ cột "Tiếp nhận hồ sơ" sang cột "AIA Thẩm định":
  - Số lượng cột Tiếp nhận giảm từ 1 về 0.
  - Số lượng cột Thẩm định tăng từ 7 lên 8.
  - Hiển thị toast: *"Đã chuyển trạng thái hồ sơ CLM-2026-0086"*.
- `npm run build` biên dịch sạch 100% với 0 lỗi TypeScript.
