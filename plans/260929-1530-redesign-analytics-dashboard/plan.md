---
title: "Redesign Phân Hệ Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ Chuẩn Chuyên Gia AIA (Executive Financial Dashboard)"
description: "Nâng cấp toàn diện phân hệ Thống Kê (Analytics) thành Executive Financial Dashboard chuyên nghiệp chuẩn MDRT/Agency Leader với bộ lọc thời gian động, thanh chỉ huy KPI 4 zone, bộ biểu đồ Native SVG tương tác và 4 tab nghiệp vụ chuyên sâu."
status: completed
priority: P1
effort: "4h"
tags: [frontend, refactor, analytics, ui-ux, svg-charts, aia-luxury]
created: 2026-09-29
---

# Redesign Phân Hệ Thống Kê & Báo Cáo Hiệu Quả Nghiệp Vụ Chuẩn Chuyên Gia AIA

## 1. Bối cảnh & Vấn đề giải quyết

Phân hệ Thống Kê hiện tại (`AnalyticsDashboardView`) tuy đã có các số liệu cơ bản nhưng còn nhiều hạn chế cản trở trải nghiệm nghiệp vụ của Chuyên viên Hoạch định Tài chính / MDRT AIA:
1. **Thiếu bộ lọc thời gian và điều khiển trung tâm**: Tất cả số liệu bị tổng hợp cứng trên toàn bộ database, không có tùy chọn xem theo Năm 2026, 6 tháng gần nhất, hay Quý hiện tại.
2. **Biểu đồ tĩnh và mảng tháng hardcode**: `MonthlyGrowthChart` đang dùng mảng tháng cố định từ `2025-10` đến `2026-09` bằng CSS bar đơn sơ, chưa tính toán động theo ngày phát hành HĐ (`issueDate`) và ngày tạo khách hàng (`createdAt`), thiếu biểu đồ doanh số APE theo thời gian.
3. **Bố cục cuộn dài quá tải (Cognitive Overload)**: Tất cả bảng biểu và báo cáo xếp chồng một dải cuộn dài gần 2000px, thiếu cấu trúc phân tầng nghiệp vụ.
4. **Thiếu các chỉ số cốt lõi chuẩn ngành Bảo hiểm Nhân thọ (MDRT Standards)**:
   - Thiếu thước đo tiến độ hoàn thành chỉ tiêu MDRT cá nhân (Target 750M APE).
   - Thiếu phân rã dòng phí FYP (Năm 1) vs RYP (Tái tục) kèm danh sách cảnh báo HĐ sắp đến hạn đóng phí trong 60 ngày ân hạn để bảo toàn tỷ lệ K1.
   - Thiếu bộ lọc phân tầng rủi ro thẻ sức khỏe (>80% cạn hạn mức) để chủ động chăm sóc và upsell.

**Mục tiêu chính**:
- Xây dựng **Executive Financial Dashboard** đẳng cấp nhận diện thương hiệu AIA Luxury (AIA Crimson `#D31145`, Slate Charcoal `#1A1D20`, Emerald, Font số Tabular Numeric).
- Tích hợp **Executive Toolbar** với bộ lọc khung thời gian động (Tất cả / Năm 2026 / 6 tháng gần nhất / Quý này) và xuất báo cáo.
- **Thanh chỉ huy KPI 4 Zone**: Doanh số APE, Tiến độ MDRT, Quyền lợi đã chi trả, Tỷ lệ duy trì K1.
- **Bộ biểu đồ Native SVG tương tác (Zero-Dependency)**: Dynamic Area Chart (Doanh số & HĐ mới kèm Tooltip), Donut Chart phân bổ trạng thái, và Thước đo MDRT.
- **Cấu trúc 4 Tab nghiệp vụ chuyên sâu**:
  1. `Tab 1: Tổng Quan & MDRT`: Biểu đồ xu hướng, chỉ tiêu MDRT, Top sản phẩm chủ lực.
  2. `Tab 2: Hợp Đồng & Dòng Phí`: Donut cơ cấu HĐ, phân rã FYP/RYP, cảnh báo thu phí bảo vệ K1.
  3. `Tab 3: Vận Hành Bồi Thường`: Đối soát Claim Yêu cầu vs Thực duyệt vs Giảm trừ, TAT SLA, phân bổ 11 quyền lợi AIA.
  4. `Tab 4: Radar Hạn Mức Thẻ`: Bảng theo dõi hạn mức phân tầng rủi ro, tìm kiếm nhanh và deep-link mở drawer khách hàng.

---

## 2. Kiến trúc Hệ Thống & Luồng Dữ Liệu (Architecture & Flow)

```mermaid
flowchart TD
    A[CRM Store Data: Customers, Policies, Claims] --> B[Time Filter & Period Aggregator Engine]
    
| **Phase 1** | **Core Architecture & Executive KPI Strip** | Xây dựng filter engine thời gian, thanh điều khiển trung tâm và 4 thẻ chỉ huy KPI chuẩn tài chính | `src/components/analytics/types.ts`, `ExecutiveToolbar.tsx`, `ExecutiveCommandStrip.tsx`, `AnalyticsDashboardView.tsx` | Completed |
| **Phase 2** | **Native SVG Chart Suite** | Xây dựng bộ biểu đồ Native SVG tương tác (Area Chart có Tooltip, Donut Chart phân bổ, Gauge MDRT) | `src/components/analytics/charts/DynamicAreaChart.tsx`, `DonutChart.tsx`, `MdrtProgressGauge.tsx` | Completed |
| **Phase 3** | **4 Specialized Business Tabs** | Tách và hoàn thiện 4 tab nghiệp vụ chuyên sâu: Doanh số & MDRT, Danh mục Hợp đồng, Vận hành Claims, Radar Hạn mức Thẻ | `src/components/analytics/tabs/OverviewTab.tsx`, `PortfolioTab.tsx`, `ClaimsTab.tsx`, `QuotaRadarTab.tsx` | Completed |
| **Phase 4** | **Verification & Smoke Test** | Kiểm thử Type-check, lint, tương tác bộ lọc, deep-link khách hàng, xuất file Excel/CSV và responsiveness | `src/App.tsx`, build verification, browser testing | Completed |
    
    E --> E1[Doanh Số APE]
    E --> E2[Tiến Độ MDRT]
    E --> E3[Quyền Lợi Đã Chi Trả]
    E --> E4[Tỷ Lệ Duy Trì K1]
- [x] Bộ lọc khung thời gian hoạt động mượt mà, cập nhật tức thì tất cả KPI và biểu đồ mà không cần tải lại trang.
- [x] Biểu đồ xu hướng SVG tính toán động từ ngày phát hành HĐ và ngày tạo khách hàng, hover chuột hiển thị tooltip số liệu VND và số lượng hợp đồng chuẩn xác.
- [x] Thước đo chỉ tiêu MDRT hiển thị % hoàn thành và số tiền còn thiếu dựa trên doanh số APE thực tế.
- [x] Phân rã dòng phí FYP/RYP và cảnh báo hợp đồng đến hạn nộp phí trong 60 ngày ân hạn giúp tư vấn viên bảo toàn tỷ lệ K1.
- [x] Báo cáo bồi thường đối soát rõ ràng 3 chỉ số: Tiền khách yêu cầu, AIA thực duyệt chi trả, Số tiền giảm trừ hợp lý.
- [x] Bảng Radar hạn mức thẻ sức khỏe hỗ trợ lọc theo mức độ rủi ro (>80% đỏ, 40-80% vàng, <40% xanh) và click vào tên khách hàng mở ngay hồ sơ khách hàng.
- [x] Giao diện responsive 100% không tràn ngang trên Mobile (375px), Tablet (768px), Laptop (1280px), Desktop (1920px).
- [x] Toàn bộ dự án vượt qua kiểm tra `npm run build` (`tsc -b && vite build`) và `npm run lint` (`oxlint`) không có lỗi.
---

## 3. Phân Rã Các Giai Đoạn (Phased Roadmap)

| # | Giai đoạn | Mục tiêu chính | File tác động | Trạng thái |
|---|---|---|---|---|
| **Phase 1** | **Core Architecture & Executive KPI Strip** | Xây dựng filter engine thời gian, thanh điều khiển trung tâm và 4 thẻ chỉ huy KPI chuẩn tài chính | `src/components/analytics/types.ts`, `ExecutiveToolbar.tsx`, `ExecutiveCommandStrip.tsx`, `AnalyticsDashboardView.tsx` | Pending |
| **Phase 2** | **Native SVG Chart Suite** | Xây dựng bộ biểu đồ Native SVG tương tác (Area Chart có Tooltip, Donut Chart phân bổ, Gauge MDRT) | `src/components/analytics/charts/DynamicAreaChart.tsx`, `DonutChart.tsx`, `MdrtProgressGauge.tsx` | Pending |
| **Phase 3** | **4 Specialized Business Tabs** | Tách và hoàn thiện 4 tab nghiệp vụ chuyên sâu: Doanh số & MDRT, Danh mục Hợp đồng, Vận hành Claims, Radar Hạn mức Thẻ | `src/components/analytics/tabs/OverviewTab.tsx`, `PortfolioTab.tsx`, `ClaimsTab.tsx`, `QuotaRadarTab.tsx` | Pending |
| **Phase 4** | **Verification & Smoke Test** | Kiểm thử Type-check, lint, tương tác bộ lọc, deep-link khách hàng, xuất file Excel/CSV và responsiveness | `src/App.tsx`, build verification, browser testing | Pending |

---

## 4. Tiêu Chí Nghiệm Thu (Success Criteria)

- [ ] Bộ lọc khung thời gian hoạt động mượt mà, cập nhật tức thì tất cả KPI và biểu đồ mà không cần tải lại trang.
- [ ] Biểu đồ xu hướng SVG tính toán động từ ngày phát hành HĐ và ngày tạo khách hàng, hover chuột hiển thị tooltip số liệu VND và số lượng hợp đồng chuẩn xác.
- [ ] Thước đo chỉ tiêu MDRT hiển thị % hoàn thành và số tiền còn thiếu dựa trên doanh số APE thực tế.
- [ ] Phân rã dòng phí FYP/RYP và cảnh báo hợp đồng đến hạn nộp phí trong 60 ngày ân hạn giúp tư vấn viên bảo toàn tỷ lệ K1.
- [ ] Báo cáo bồi thường đối soát rõ ràng 3 chỉ số: Tiền khách yêu cầu, AIA thực duyệt chi trả, Số tiền giảm trừ hợp lý.
- [ ] Bảng Radar hạn mức thẻ sức khỏe hỗ trợ lọc theo mức độ rủi ro (>80% đỏ, 40-80% vàng, <40% xanh) và click vào tên khách hàng mở ngay hồ sơ khách hàng.
- [ ] Giao diện responsive 100% không tràn ngang trên Mobile (375px), Tablet (768px), Laptop (1280px), Desktop (1920px).
- [ ] Toàn bộ dự án vượt qua kiểm tra `npm run build` (`tsc -b && vite build`) và `npm run lint` (`oxlint`) không có lỗi.