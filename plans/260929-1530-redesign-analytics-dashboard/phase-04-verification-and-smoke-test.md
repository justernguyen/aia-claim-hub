---
phase: 4
title: "Verification, Responsive Smoke Test & Report Export"
status: completed
priority: P1
effort: "0.5h"
dependencies: [1, 2, 3]
---

# Phase 4: Verification, Responsive Smoke Test & Report Export

## Goal
Kiểm tra toàn diện độ chính xác của các thuật toán tính toán tài chính, khả năng tương tác của biểu đồ SVG, tính năng lọc dữ liệu theo thời gian, độ mượt mà khi deep-link mở drawer khách hàng, tính tương thích responsive trên các kích thước màn hình và kiểm tra xuất báo cáo.

## Files to Create / Modify
- Test/Verify: `src/components/AnalyticsDashboardView.tsx`
- Test/Verify: `src/components/analytics/**/*`
- Verify: `npm run lint`, `npm run build`

## Tasks & Steps

1. **Kiểm Tra Biên Dịch & Chất Lượng Mã Nguồn (Code Quality & Build Gate)**:
   - Chạy `npm run lint` (`oxlint`) để đảm bảo không có cảnh báo syntax, biến thừa hay import sai.
   - Chạy `npm run build` (`tsc -b && vite build`) để xác minh 100% type-safety của TypeScript và hoàn tất đóng gói bundle tối ưu.

2. **Kiểm Thử Nghiệp Vụ & Độ Chính Xác Số Liệu (Functional Verification)**:
   - **Executive Toolbar**: Thử nghiệm chuyển đổi các mốc thời gian (*Tất cả*, *Năm 2026*, *6 Tháng Gần Nhất*, *Quý 3/2026*); xác nhận số liệu toàn bộ 4 thẻ KPI và các biểu đồ cập nhật ngay lập tức.
   - **Thanh Chỉ Huy KPI**:
     - Doanh số APE khớp với tổng phí thường niên của các hợp đồng có hiệu lực.
     - % Tiến độ MDRT tính toán chuẩn xác trên định mức chuẩn 750,000,000 ₫.
     - Số tiền chi trả và tỷ lệ duyệt claim khớp với trạng thái `approved` / `paid`.
     - Tỷ lệ K1 phản ánh chính xác tỷ trọng hợp đồng `in_force`.
   - **Tab 1 — Tổng Quan & MDRT**:
     - Rê chuột trên `DynamicAreaChart`: Tooltip hiển thị mượt mà theo tọa độ chuột, hiển thị đầy đủ tên tháng, doanh số VND và số HĐ.
     - Thử nghiệm nút chuyển đổi giữa *"Doanh số APE (VNĐ)"* và *"Số hợp đồng mới"*.
   - **Tab 2 — Danh Mục Hợp Đồng & Dòng Phí**:
     - Kiểm tra phân rã FYP vs RYP vs Phí chờ nộp.
     - Bấm thử nút xem khách hàng trong danh sách cảnh báo thu phí xem có mở đúng drawer khách hàng hay không.
   - **Tab 3 — Vận Hành Bồi Thường**:
     - Xác minh đối soát 3 chiều: Số tiền yêu cầu, Thực duyệt và Giảm trừ hợp lý.
     - Kiểm tra thanh tiến độ và số ca của 11 nhóm quyền lợi AIA.
   - **Tab 4 — Radar Hạn Mức Thẻ**:
     - Thử nghiệm các nút lọc phân tầng rủi ro (*🔴 Khẩn cấp >80%*, *🟡 40-80%*, *🟢 <40%*).
     - Nhập từ khóa tìm kiếm tên khách hàng hoặc mã hợp đồng.
     - Bấm vào tên khách hàng để xác minh cơ chế deep-link mở `CustomerDetailDrawer`.
   - **Xuất Báo Cáo**: Bấm nút *"Xuất Báo Cáo Excel (CSV)"* và xác minh file tải xuống trọn vẹn dữ liệu.

3. **Kiểm Tra Độ Tương Thích Giao Diện Đa Thiết Bị (Responsive Check)**:
   - Kiểm tra hiển thị tại kích thước Mobile (375px - 414px): Thẻ KPI co giãn thành grid 2x2, toolbar xếp chồng tự nhiên, bảng dữ liệu có scroll ngang mềm mại.
   - Kiểm tra hiển thị tại kích thước Tablet (768px) và Laptop/Desktop (1280px - 1920px): Bố cục cân đối, thoáng đãng, sắc nét, không vỡ layout hay tràn viền ngang.

## Verification
- Lệnh chạy kiểm tra:
  ```bash
  npm run lint
  npm run build
  ```
- Toàn bộ các tiêu chí kiểm thử trên giao diện thực tế đều đạt chuẩn chất lượng.