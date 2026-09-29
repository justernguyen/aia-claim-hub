# Nhật Ký Thực Hiện: Mẫu Excel Chuẩn Nhận Diện AIA & Nạp Trực Tiếp File .xlsx/.xls

**Thời gian**: 2026-09-29  
**Người thực hiện**: omp  
**Yêu cầu gốc**: *"mẫu excel csv xấu quá, cho phép nhập mẫu excel đi"*

---

## 1. Vấn đề giải quyết & Thay đổi kiến trúc
- **Khắc phục file mẫu CSV đơn điệu**:
  - Tích hợp engine `xlsx-js-style` v1.2.0 (thư viện mở rộng từ SheetJS có hỗ trợ styling ô tính mà không cần cài đặt thêm dependency nặng).
  - Xây dựng module `src/utils/excelTemplate.ts`:
    - Tạo file mẫu `mau_danh_sach_hop_dong_aia_pos.xlsx` thực thụ: Title & Header mang màu đỏ nhận diện AIA Crimson Red (`#D31145`), chữ trắng đậm, font Calibri 11pt, căn giữa, có viền bảng (borders) tinh tế.
    - Cấu hình tự động căn chỉnh độ rộng cột (`!cols`) cho toàn bộ 11 cột chuẩn POS.
    - Định dạng số tiền phí bảo hiểm phân tách hàng nghìn (`#,##0`).
    - Dữ liệu mẫu chuẩn xác theo các gói bảo hiểm thực tế của AIA (Khỏe Bình An, Khỏe Trọn Vẹn, Trọn Vẹn Cân Bằng...) kèm phân khúc VIP Fansipan, Everest.
- **Hỗ trợ nạp trực tiếp file Excel binary (`.xlsx`, `.xls`) và `.csv`**:
  - Nâng cấp `CustomerImportModal.tsx`:
    - Thêm vùng Kéo - Thả file trực quan (Drag & Drop Zone) với hiệu ứng visual cue khi hover/drop.
    - Bộ chọn file mở rộng: `accept=".xlsx, .xls, .csv, .txt, .tsv"`.
    - Đọc file nhị phân qua `FileReader.readAsArrayBuffer` $\rightarrow$ giải mã sang ma trận 2D $\rightarrow$ chạy qua bộ phân tích cột động thông minh.
    - Hiển thị card thông tin file đã chọn: Tên file, dung lượng, số lượng hợp đồng phát hiện được kèm nút hủy/chọn lại.
    - Vẫn giữ nguyên tùy chọn dán phím tắt nhanh `Ctrl+V` từ bảng tính Excel.

---

## 2. Kết quả kiểm thử & Chứng minh thực tế
1. **Kiểm tra TypeScript & Linter**:
   - `npm run build`: Build sạch 100% trong 808ms, tạo file dist bundle hoàn chỉnh.
   - `npx oxlint`: 0 lỗi type hay syntax trong `excelTemplate.ts` và `CustomerImportModal.tsx`.
2. **Kiểm thử trên trình duyệt (Playwright/Browser Smoke Test)**:
   - Đã sinh và tải file `.xlsx` thật `plans/test_danh_sach_hop_dong_aia.xlsx`.
   - Nạp file `.xlsx` vào modal qua Drag & Drop / File Input.
   - Bảng xem trước (Preview Table) nhận diện chính xác 5 hợp đồng:
     - `U926687581`: Tạm hoãn, Khỏe Bình An, Lê Thị Ngọc Sương, 12.522.000 đ.
     - `U926599543`: Hiệu lực, Khỏe Trọn Vẹn, Đỗ Văn Dân, 26.631.000 đ, Fansipan.
     - `U926506400`: Hiệu lực, Khỏe Bình An, Thái Tấn Định, 26.042.000 đ, Fansipan.
     - `U926411239`: Hiệu lực, Trọn Vẹn Cân Bằng, Nguyễn Thị Mai Hương, 35.150.000 đ, Everest.
     - `U926388912`: Hiệu lực, Bệnh Hiểm Nghèo Toàn Diện, Trần Quốc Bảo, 18.900.000 đ.
   - Bấm nút nạp vào hệ thống:
     - CRM cập nhật từ 10 lên 15 khách hàng.
     - Tổng phí bảo hiểm quản lý tăng lên 335.223.000 đ.
     - Mở Drawer chi tiết khách hàng hiển thị đầy đủ thông tin hợp đồng, ngày nộp phí, thời gian gia hạn 60 ngày và hạn mức Thẻ Sức Khỏe 250.000.000 đ.
   - Các ảnh chụp minh chứng:
     - `plans/verify-excel-modal-opened.png`
     - `plans/verify-excel-imported-preview.png`
     - `plans/verify-after-import-customers.png`
     - `plans/verify-imported-customer-drawer.png`
     - `plans/verify-imported-customer-policy-tab.png`
