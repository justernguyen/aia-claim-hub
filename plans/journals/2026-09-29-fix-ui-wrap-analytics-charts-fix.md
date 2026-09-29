# Nhật ký kỹ thuật: Khắc phục triệt để lỗi Wrap chữ trên Dashboard Báo cáo (Tab Thống kê & Báo cáo)

**Thời gian:** 2026-09-29  
**Mục tiêu:** Khắc phục lỗi chữ, số và badge bị rớt dòng (wrap) làm méo mó bố cục thẻ card biểu đồ doanh số (`DynamicAreaChart.tsx`) và lộ trình MDRT (`MdrtProgressGauge.tsx`).

## 1. Nguyên nhân gốc rễ (Root Cause)
- **Thẻ Diễn biến Doanh số (`DynamicAreaChart.tsx`):**
  - Cụm tiêu đề `Diễn Biến Doanh Số & Hợp Đồng Mới` bị rớt chữ "Mới" do cạnh tranh diện tích với toggle bên phải.
  - Badge `{monthlyData.length} Kỳ` thiếu `whitespace-nowrap` khiến số và chữ bị bẻ đôi thành 2 dòng ("12" / "Kỳ").
  - Nút toggle có chuỗi quá dài `Doanh Số APE (VNĐ)` và `Số Hợp Đồng` thiếu `whitespace-nowrap`, dẫn đến chữ `(VNĐ)` và `Đồng` bị rớt hàng.
- **Thẻ Lộ trình MDRT (`MdrtProgressGauge.tsx`):**
  - Danh hiệu mặc định `currentTierName = 'Chuyên Viên Hoạch Định Tài Chính'` quá dài (36 ký tự) được đặt thẳng hàng trên `<h4>`, đẩy chữ `2026` của tiêu đề và chữ `tại:` của cột doanh số bên phải rớt dòng.
  - Dòng footer chia 2 khối flex nhưng chuỗi dài không có `whitespace-nowrap` ở từng cụm ngữ nghĩa, gây va đập làm vỡ thành 4 mẩu vụn rải rác trên 2 hàng.

## 2. Giải pháp kỹ thuật đã triển khai
1. **`DynamicAreaChart.tsx`:**
   - Đặt `sm:whitespace-nowrap` cho tiêu đề và `whitespace-nowrap shrink-0` cho badge kỳ.
   - Tinh gọn text nút toggle thành `Doanh số APE` | `Số hợp đồng`, thêm `whitespace-nowrap` cho từng nút và `shrink-0` cho khối toggle.
2. **`MdrtProgressGauge.tsx`:**
   - Tinh gọn danh hiệu thành `Chuyên Viên Tài Chính` và chuyển xuống dòng phụ kèm định mức (`Chuyên Viên Tài Chính • Định mức quốc tế AIA Premier`), giải phóng 100% không gian cho dòng tiêu đề chính và doanh số APE bên phải.
   - Thêm `whitespace-nowrap` cho `Doanh số APE hiện tại:` và số tiền.
   - Cấu trúc lại footer với `xl:flex-row xl:items-center` và khóa `whitespace-nowrap` ở từng vế: Vế 1 (`Mục tiêu (MDRT 2026): Còn thiếu...`), Vế 2 (`Cần duy trì: ~205,7 triệu/tháng (3 tháng còn lại)`), đảm bảo hiển thị thẳng hàng, không bao giờ gãy chữ giữa câu.

## 3. Kết quả xác thực (Verification)
- **Build:** `tsc -b && vite build` hoàn tất không lỗi trong 816ms.
- **Lint:** `oxlint` không có lỗi cú pháp mới.
- **Visual Smoke Test:** Kiểm tra trực quan qua Chromium headless ở cả độ phân giải laptop phổ biến (1280x800) và desktop tiêu chuẩn (1440x900). Kết quả: cả hai thẻ card đều thẳng tắp, không còn hiện tượng rớt dòng, khoảng cách thở (whitespace) đạt chuẩn thiết kế AIA Luxury.
