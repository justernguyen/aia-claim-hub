# Plan: Streamline & Standardize UI / Typography Overhaul

## 1. Audit Synthesis & Problem Statement
Dự án **AIA Claim Hub & Agent CRM** hiện đang có **quá nhiều thông tin rối (Cognitive & Visual Overload)**:
1. **Header thừa mứa nút thao tác trùng lặp**: Nút `Sao lưu` đã mở đầy đủ modal Export/Import JSON/CSV, nhưng ngay cạnh đó vẫn hiển thị thêm 4 nút icon phụ (`Xuất JSON`, `Xuất Excel`, `Nhập file`, `Khôi phục`) gây rối mắt cạnh nút `+ Thêm mới`. Trong Tab Khách hàng lại lặp lại nút `Nhập Excel` và `+ Thêm KH`.
2. **Mỗi dòng bảng và thẻ card bị "nhồi nhét" 8-12 dữ liệu cùng lúc**: Khách hàng, CCCD, SĐT, Địa chỉ, HĐBH, Sản phẩm, Badge bổ trợ, Trạng thái, Phí năm, Thẻ sức khỏe, % đã dùng, Còn lại, Thanh tiến độ, Số ca claim... Mỗi thông tin lại mang một màu sắc / badge khác nhau (hồng, đỏ, xanh lá, vàng, xám) tạo hiệu ứng "cây thông Noel", khiến mắt người dùng không có điểm dừng.
3. **Phông chữ & Typography thiếu chuẩn hóa (Inconsistent Type Hierarchy)**:
   - Sử dụng tùy tiện: `text-[10.5px]`, `text-[11px]`, `text-xs`, `text-[13px]`, `text-sm`, `text-base`, `text-xl`, `text-2xl`.
   - Độ đậm lộn xộn: `font-black`, `font-extrabold`, `font-bold`, `font-semibold`, `font-medium`, `font-normal`.
   - Tabular numeric chưa được áp dụng đồng bộ, số tiền và số lượng lúc thì to đậm quá mức (`font-black`), lúc thì nhạt nhòa.
4. **Không nhất quán trong Design Tokens**: Màu nhận diện chính là AIA Red (`#D31145`), nhưng Tab 4 lại dùng nút chuyển tab màu đen `bg-slate-900`, các nút bo góc lúc `rounded-xl`, lúc `rounded-2xl`, lúc `rounded-lg`.

## 2. Proposed Architecture & Solutions (Tinh giản & Chuẩn hóa)
- **Chuẩn hóa Typography Scale 4 bậc**:
  - `Display / Page Title`: `text-xl sm:text-2xl font-bold tracking-tight text-slate-900`
  - `Section / Card Header`: `text-sm sm:text-base font-semibold text-slate-900`
  - `Body / Primary Labels`: `text-xs sm:text-sm font-medium text-slate-700`
  - `Meta / Badges / Subtext`: `text-[11px] sm:text-xs font-normal / font-medium text-slate-500`
  - `Numbers & Financials`: `font-numeric font-semibold text-slate-900` (thay vì lạm dụng `font-black`).
- **Tinh giản Header**:
  - Giữ lại 1 nút `Sao lưu & Dữ liệu` duy nhất (mở modal quản lý tập trung), loại bỏ 4 icon thừa.
  - Tinh gọn thẻ tư vấn viên, gom các thông tin phụ vào tooltip hoặc popover.
- **Áp dụng Nguyên lý "Progressive Disclosure" cho Bảng & Thẻ**:
  - Bảng Khách hàng & Bồi thường: Chỉ hiển thị các cột cốt lõi phục vụ quét nhanh (Họ tên, SĐT, Số HĐ, Trạng thái, Số tiền/Phí, Thao tác).
  - Các chi tiết chuyên sâu (địa chỉ đầy đủ, CCCD, danh sách bệnh viện, lịch sử khám, thanh hạn mức chi tiết) hiển thị tự nhiên trong Drawer chi tiết khi bấm vào dòng.
- **Thống nhất Hệ thống Badges & Status Pills**:
  - Giảm độ bão hòa màu, sử dụng màu pastel dịu mắt (`bg-emerald-50 text-emerald-700`, `bg-rose-50 text-aia-red`, `bg-slate-100 text-slate-600`), loại bỏ viền dày và chữ `font-extrabold`.

## 3. Phased Execution Roadmap
- **Phase 01**: Header & Global Navigation Cleanup (src/components/Header.tsx).
- **Phase 02**: Global Typography & Design Tokens Standardization (src/index.css, src/utils/formatters.ts).
- **Phase 03**: Customer Management View & CustomerCard/Table Streamlining (src/components/CustomerCard.tsx, src/components/CustomerTableView.tsx, src/components/CustomerManagementView.tsx).
- **Phase 04**: Claims View & KPI Strips Harmonization (src/components/MetricsOverview.tsx, src/components/FilterBar.tsx, src/components/ClaimTableView.tsx, src/components/AnalyticsDashboardView.tsx).
- **Phase 05**: Build Validation, Browser Smoke Testing, Commit & Deployment.
