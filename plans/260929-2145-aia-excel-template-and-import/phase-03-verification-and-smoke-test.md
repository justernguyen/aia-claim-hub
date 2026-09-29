# Phase 3: Kiểm Thử Toàn Diện, Verify & Smoke Test

## Mục tiêu
Đảm bảo toàn bộ tính năng sinh mẫu Excel AIA `.xlsx`, nạp file nhị phân `.xlsx` / `.xls` / `.csv`, và cập nhật dữ liệu khách hàng vào hệ thống CRM hoạt động chính xác 100%, không phát sinh lỗi type hay vỡ giao diện.

---

## File tác động
- Kiểm thử tích hợp toàn bộ luồng:
  - `src/utils/excelTemplate.ts`
  - `src/components/CustomerImportModal.tsx`
  - `src/components/CustomerManagementView.tsx`

---

## Các kịch bản kiểm thử chi tiết

### Kịch bản 1: Kiểm tra biên dịch & mã nguồn (Type Safety & Lint)
- Lệnh thực thi:
  ```bash
  npm run build
  npx oxlint
  ```
- **Kỳ vọng**:
  - Không có lỗi type liên quan đến `xlsx-js-style` hay `CustomerImportModal`.
  - Không có cảnh báo unused variables hoặc cú pháp sai.

### Kịch bản 2: Kiểm thử tính năng tải file mẫu Excel AIA `.xlsx`
- Thực hiện:
  - Mở modal nhập khách hàng trên giao diện web.
  - Bấm nút *"Tải file mẫu AIA (.xlsx)"*.
- **Kỳ vọng**:
  - Trình duyệt tải về file `mau_danh_sach_hop_dong_aia_pos.xlsx`.
  - Mở file trên Microsoft Excel:
    - Hàng tiêu đề có nền đỏ AIA `#D31145`, chữ in hoa màu trắng nổi bật, font Calibri 11pt, căn giữa.
    - Toàn bộ 11 cột có độ rộng vừa vặn với nội dung, không bị `###` hoặc che khuất văn bản.
    - Cột "Phí BH định kỳ" có định dạng số tiền phân tách hàng nghìn (`12,522,000` / `26,631,000`).
    - Có 4 dòng hợp đồng mẫu thực tế chuẩn AIA POS.

### Kịch bản 3: Kiểm thử nạp file `.xlsx` và `.csv`
- **Case 3.1: Nạp chính file `.xlsx` vừa tải về từ máy**:
  - Chọn hoặc kéo thả file `mau_danh_sach_hop_dong_aia_pos.xlsx` vào vùng dropzone.
  - **Kỳ vọng**: Hệ thống nhận diện lập tức 4 hợp đồng, bảng Preview hiển thị đúng:
    - `U926687581`: Tạm hoãn, Khỏe Bình An, Lê Thị Ngọc Sương, 12.522.000 đ.
    - `U926599543`: Hiệu lực, Khỏe Trọn Vẹn, Đỗ Văn Dân, 26.631.000 đ, Fansipan.
    - `U926506400`: Hiệu lực, Khỏe Bình An, Thái Tấn Định, 26.042.000 đ, Fansipan.
    - `U926411239`: Hiệu lực, Trọn Vẹn Cân Bằng, Nguyễn Thị Mai Hương, 35.150.000 đ.
- **Case 3.2: Nạp file `.csv` truyền thống**:
  - Chọn file `.csv` có sẵn để kiểm tra tính tương thích ngược (Backward Compatibility).
  - **Kỳ vọng**: Đọc và bóc tách dữ liệu bình thường như trước đây.
- **Case 3.3: Dán trực tiếp từ bảng tính Excel (`Ctrl+V`)**:
  - Copy một vùng bảng từ Excel và dán vào ô văn bản.
  - **Kỳ vọng**: Hệ thống nhận diện các cột theo tab delimiter và render bảng Preview.

### Kịch bản 4: Kiểm thử nạp vào hệ thống CRM thực tế
- Nhấn *"Nạp 4 hợp đồng & khách hàng vào hệ thống"*:
  - Modal đóng lại mượt mà.
  - Danh sách khách hàng ngoài màn hình chính được cập nhật thêm các khách hàng mới.
  - Bấm vào một khách hàng vừa nạp để mở `CustomerDetailDrawer`: Kiểm tra thấy thông tin hợp đồng, phân khúc, phí bảo hiểm và các gói quyền lợi đi kèm đầy đủ.

---

## Tiêu chuẩn nghiệm thu cuối cùng
- [x] Không còn nút download file `.csv` thô sơ; thay thế hoàn toàn bằng `.xlsx` chuẩn nhận diện AIA.
- [x] Cho phép chọn hoặc kéo thả file `.xlsx`, `.xls`, `.csv` mượt mà.
- [x] Toàn bộ kịch bản kiểm thử trên đều đạt kết quả PASSED.
