# Kế Hoạch Triển Khai Mẫu Excel Chuẩn AIA & Nạp Trực Tiếp File .xlsx / .xls

**Thời gian**: 2026-09-29  
**Vấn đề xử lý**: Phản hồi của người dùng về việc file mẫu CSV hiện tại quá đơn sơ, xấu khi mở trên Excel và hệ thống chưa hỗ trợ nạp trực tiếp file `.xlsx` / `.xls` từ máy tính.

## Các quyết định kỹ thuật chính:
1. **Sử dụng engine `xlsx-js-style`**: Hỗ trợ đầy đủ việc đọc file nhị phân `.xlsx` / `.xls` ở phía client-side và tạo file Excel có styling cao cấp (Header đỏ thương hiệu AIA `#D31145`, chữ trắng đậm, borders ô tính, auto fit độ rộng cột, format tiền tệ VNĐ).
2. **Nâng cấp `CustomerImportModal`**:
   - Vùng kéo thả (Drag & Drop zone) trực quan.
   - Nút tải mẫu `.xlsx` thay thế hoàn toàn file `.csv` thô.
   - Bộ chọn file mở rộng: `.xlsx, .xls, .csv, .txt, .tsv`.
   - Giữ nguyên trải nghiệm dán nhanh clipboard `Ctrl+V`.
3. **Phân rã thành 3 giai đoạn**:
   - Phase 1: Engine `xlsx-js-style` & tiện ích `src/utils/excelTemplate.ts`.
   - Phase 2: Nâng cấp giao diện modal và luồng nạp file trong `CustomerImportModal.tsx`.
   - Phase 3: Kiểm thử toàn diện, build và smoke test giao diện.
