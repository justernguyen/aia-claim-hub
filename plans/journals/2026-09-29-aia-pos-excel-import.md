---
title: Hoàn Thành Bộ Nhập Dữ Liệu Excel Chuẩn Báo Cáo AIA POS
date: 2026-09-29
summary: Nâng cấp CustomerImportModal.tsx hỗ trợ copy-paste trực tiếp từ báo cáo DSHĐ đang phục vụ của AIA POS (9 cột), tự động nhận diện header, xử lý tiền tệ VN, phân loại hợp đồng và đồng bộ thông tin đại lý Dương Thị Như Ý.
---

# Hoàn Thành Bộ Nhập Dữ Liệu Excel Chuẩn Báo Cáo AIA POS

Nâng cấp `CustomerImportModal.tsx` hỗ trợ copy-paste trực tiếp từ báo cáo "DSHĐ đang được phục vụ bởi ĐL" của AIA POS (9 cột), tự động nhận diện header, xử lý tiền tệ VN, phân loại hợp đồng và đồng bộ thông tin đại lý Dương Thị Như Ý.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Các tính năng hoàn thành
1. **Thông tin đại lý chuẩn hóa theo báo cáo**:
   - Tên tư vấn viên: `Dương Thị Như Ý`
   - Mã số đại lý: `000850386`
   - Văn phòng đại lý: `GA - Exc HCM1` (AIA Exchange HCM1)
   - Tự động phát hiện dòng metadata báo cáo đầu bảng và hiển thị banner xác nhận.
2. **Bộ bóc tách dữ liệu thông minh (Smart Parser)**:
   - Tự động bỏ qua các dòng tiêu đề báo cáo ở đầu bảng (`Tên danh sách:`, `Mã số đại lý:`, `Văn phòng:`, `Phòng nghiệp vụ:`).
   - Tự động dò tìm dòng tiêu đề 9 cột (`Hợp đồng`, `Tình trạng HĐ`, `Sản phẩm chính`, `Bên mua bảo hiểm`, `Người được bảo hiểm`, `Phí BH định kỳ`, `Định kỳ đóng phí`, `Phân khúc KH`, `Ghi chú`).
   - Xử lý định dạng tiền tệ VN chuẩn Excel: `12.522.000,0` $\rightarrow$ `12522000` đ (tách bỏ đuôi thập phân `,0` và loại bỏ dấu chấm hàng nghìn).
   - Ánh xạ trạng thái HĐ: `Tạm hoãn` $\rightarrow$ `pending_payment` (tự động tính hạn nộp phí và ngày gia hạn 60 ngày để đưa vào danh sách cảnh báo chăm sóc), `Hiệu lực` $\rightarrow$ `in_force`.
   - Ánh xạ định kỳ đóng phí: `Năm` $\rightarrow$ `annual`, `Nửa năm` $\rightarrow$ `semi_annual`, `Quý` $\rightarrow$ `quarterly`.
   - Lưu trữ phân khúc khách hàng (`Fansipan`, `Everest`...) và người được bảo hiểm.
3. **UI Preview & File mẫu**:
   - Xem trước sắc nét với các cột Số HĐ, Tình trạng (badge xanh/vàng), Bên mua BH, Người được BH, Sản phẩm chính, Phân khúc KH (badge tím) và Phí định kỳ.
   - Nút tải file mẫu CSV chuẩn UTF-8 BOM 9 cột đúng định dạng AIA POS.
4. **Kiểm thử**:
   - `tsc --noEmit` & `npm run build` thành công 100%.
   - End-to-end smoke test mô phỏng dán trực tiếp 3 dòng dữ liệu từ ảnh của người dùng và nạp thành công vào giao diện CRM.
