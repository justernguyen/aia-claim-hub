# Phase 2: Nâng Cấp `CustomerImportModal` Hỗ Trợ Kéo Thả & Nạp `.xlsx` / `.xls`

## Mục tiêu
Nâng cấp giao diện và logic tiếp nhận file trong `CustomerImportModal.tsx` để người dùng có thể:
1. Nạp trực tiếp file Excel (`.xlsx`, `.xls`) hoặc `.csv` thông qua hộp thoại chọn file hoặc kéo thả (Drag & Drop) trực quan.
2. Tải file mẫu Excel AIA `.xlsx` đẹp mắt chỉ với 1 click.
3. Xem trước (Preview) chi tiết thông tin hợp đồng được bóc tách từ file Excel và thực hiện nạp vào CRM.

---

## File tác động
- `src/components/CustomerImportModal.tsx`:
  - Mở rộng xử lý file nhị phân và kéo thả.
  - Cập nhật giao diện tải mẫu `.xlsx`.
  - Giữ vững tính năng dán nhanh (`Ctrl+V`).

---

## Các bước thực hiện chi tiết

### 1. Nâng cấp xử lý nạp file (File Upload & Drag-and-Drop)
- Khai báo state quản lý kéo thả: `isDragging: boolean`.
- Thêm các handlers:
  - `handleDragOver(e: React.DragEvent)`: `e.preventDefault()`, `setIsDragging(true)`.
  - `handleDragLeave()`: `setIsDragging(false)`.
  - `handleDrop(e: React.DragEvent)`: `e.preventDefault()`, `setIsDragging(false)`, lấy `e.dataTransfer.files?.[0]` và chuyển vào bộ xử lý.
- Xây dựng hàm tiếp nhận file đa định dạng `processUploadedFile(file: File)`:
  - Kiểm tra đuôi file:
    - Nếu là `.xlsx` hoặc `.xls`: Gọi `readExcelFileAsMatrix(file)` từ `excelTemplate.ts`, chuyển ma trận 2D thành danh sách dòng và gọi hàm phân tích dữ liệu.
    - Nếu là `.csv`, `.tsv`, `.txt`: Đọc bằng `FileReader.readAsText(file)` và phân tích theo logic dòng/tab/phẩy.
  - Lưu tên file và số dòng nhận diện được để hiển thị thông báo phản hồi (Ví dụ: `📄 Đã nạp từ file: danh_sach_hop_dong_thang_9.xlsx (15 hợp đồng)`).

### 2. Thiết kế lại khu vực tiếp nhận file trong Modal (UI/UX)
- **Vùng Kéo - Thả file trực quan (Dropzone)**:
  - Khung viền nét đứt (`border-dashed border-2`), đổi màu sang đỏ AIA nhạt (`border-aia-red bg-rose-50/50`) khi người dùng kéo file vào.
  - Icon `FileSpreadsheet` hoặc `Upload` cùng dòng hướng dẫn rõ ràng:
    - *"Kéo thả file Excel (.xlsx, .xls) hoặc .csv vào đây, hoặc click để chọn file từ máy"*
    - Tag badge hỗ trợ: `XLSX`, `XLS`, `CSV`, `TSV`.
- **Nút "Tải file mẫu AIA (.xlsx)"**:
  - Đổi nhãn từ `Tải file mẫu AIA (.csv)` $\rightarrow$ `Tải file mẫu AIA (.xlsx)`.
  - Gắn sự kiện `onClick={downloadAiaExcelTemplate}`.
  - Bổ sung icon Excel xanh lá đặc trưng hoặc icon sang trọng đồng bộ với nhận diện thương hiệu.
- **Khu vực dán nhanh văn bản (Clipboard Paste Area)**:
  - Vẫn duy trì ô nhập liệu văn bản với gợi ý dán trực tiếp `Ctrl+V` từ bảng tính Excel dành cho người dùng thích thao tác phím tắt nhanh.

### 3. Tinh chỉnh bảng xem trước (Preview Table)
- Đảm bảo hiển thị đầy đủ các trường:
  - Số HĐ (highlight font mono đỏ AIA).
  - Tình trạng hợp đồng (badge màu trạng thái).
  - Tên Bên mua bảo hiểm & Người được bảo hiểm.
  - Tên Sản phẩm chính.
  - Phân khúc KH (Fansipan, Everest...).
  - Phí bảo hiểm định kỳ (format VNĐ đẹp mắt kèm định kỳ đóng: Năm / Quý).
- Nút bấm xác nhận: *"Nạp X hợp đồng & khách hàng vào hệ thống"*.

---

## Tiêu chuẩn nghiệm thu Phase 2
- Kéo thả file `.xlsx` thật vào vùng dropzone: file được đọc và hiển thị danh sách dòng xem trước ngay lập tức.
- Chọn file qua nút *"Chọn file"* hỗ trợ lọc cả `.xlsx`, `.xls` và `.csv`.
- Nhấn nút tải mẫu tải về đúng file `.xlsx` định dạng đẹp.
- Dán nhanh `Ctrl+V` văn bản vẫn hoạt động trơn tru 100%.
