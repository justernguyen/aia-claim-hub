---
phase: 3
title: "Specialized Business Tabs (MDRT Overview, Portfolio, Claims & Quota Radar)"
status: completed
priority: P1
effort: "1.5h"
dependencies: [1, 2]
---

# Phase 3: Specialized Business Tabs (MDRT Overview, Portfolio, Claims & Quota Radar)

## Goal
Xây dựng và tích hợp 4 phân hệ Tab chuyên sâu phục vụ toàn diện các góc nhìn quản trị của Chuyên viên Tư vấn Tài chính AIA: Kinh doanh & Chỉ tiêu MDRT, Quản trị Hợp đồng & Dòng phí, Vận hành Quyền lợi & Bồi thường, và Radar Hạn mức Thẻ sức khỏe.

## Files to Create / Modify
- Create: `src/components/analytics/tabs/OverviewTab.tsx`
- Create: `src/components/analytics/tabs/PortfolioTab.tsx`
- Create: `src/components/analytics/tabs/ClaimsTab.tsx`
- Create: `src/components/analytics/tabs/QuotaRadarTab.tsx`
- Modify: `src/components/AnalyticsDashboardView.tsx`

## Tasks & Steps

1. **Xây dựng `OverviewTab.tsx` (Tổng Quan Doanh Số & MDRT)**:
   - Tích hợp `DynamicAreaChart` hiển thị diễn biến doanh số và hợp đồng phát hành qua các tháng.
   - Tích hợp `MdrtProgressGauge` thể hiện khoảng cách tới cột mốc danh hiệu MDRT cá nhân.
   - Bảng **Top Sản Phẩm Khai Thác Nhiều Nhất**: Thống kê số lượng hợp đồng, tổng doanh số APE theo từng dòng sản phẩm chủ lực (ví dụ: *AIA - Khỏe Trọn Vẹn*, *AIA - Trọn Vẹn Cân Bằng*, *AIA - An Phúc Trọn Đời*).
   - Card **Chỉ Số Hoạt Động Trọng Yếu**: Giá trị hợp đồng bình quân (Average Case Size APE), Tháng bùng nổ doanh số cao nhất trong năm.

2. **Xây dựng `PortfolioTab.tsx` (Cơ Cấu Danh Mục & Dòng Phí K1/K2)**:
   - Tích hợp `DonutChart` phân bổ tỷ trọng tình trạng hợp đồng (Đang hiệu lực, Chờ nộp phí, Mất hiệu lực).
   - Khối phân tích dòng tiền chuyên sâu:
     - **FYP (First Year Premium)**: Phí khai thác mới năm đầu.
     - **RYP (Renewal Year Premium)**: Phí tái tục các năm tiếp theo để duy trì tỷ lệ K1/K2.
     - **Phí Đang Chờ Thu**: Tổng số tiền phí cần thu trong thời gian gia hạn 60 ngày.
   - **Bảng Cảnh Báo Thu Phí Bảo Vệ K1**: Liệt kê danh sách các hợp đồng có ngày đến hạn (`nextDueDate`) sắp tới hoặc đang trong thời gian gia hạn 60 ngày, tính toán số ngày đếm ngược, hiển thị nút bấm gọi/zalo nhanh và mở chi tiết khách hàng.

3. **Xây dựng `ClaimsTab.tsx` (Vận Hành Quyền Lợi & Bồi Thường Chuyên Sâu)**:
   - Dải thẻ đối soát 3 chiều:
     - Tổng tiền khách yêu cầu bồi thường (Claimed).
     - Tổng tiền AIA thực duyệt chi trả (Approved).
     - Tổng tiền giảm trừ hợp lý (Deducted - ngoài phạm vi bảo hiểm, vượt định mức phòng).
   - Khối SLA Vận Hành:
     - Tỷ lệ duyệt chi trả thành công (Approval Rate %).
     - Tỷ lệ bồi hoàn theo giá trị yêu cầu (Payout Ratio %).
     - Thời gian giải quyết hồ sơ trung bình (SLA Turnaround Time TAT).
   - Biểu đồ thanh tiến độ phân bổ chi trả trên 11 nhóm quyền lợi bảo hiểm AIA (Điều trị nội trú, Ngoại trú, Nằm viện phẫu thuật, Bệnh hiểm nghèo, Tai nạn, v.v.).

4. **Xây dựng `QuotaRadarTab.tsx` (Radar Hạn Mức Thẻ Sức Khỏe Khách Hàng)**:
   - Bộ lọc phân tầng rủi ro trực quan dạng Pill Buttons:
     - `Tất cả`
     - `🔴 Khẩn cấp cạn hạn mức (>80%)`: Cảnh báo nguy cơ hết hạn mức trong năm, cần tư vấn nâng hạn mức hoặc bổ sung quyền lợi.
     - `🟡 Cần theo dõi (40% - 80%)`: Mức khai thác trung bình.
     - `🟢 An toàn (<40%)`: Hạn mức còn dồi dào.
   - Ô tìm kiếm nhanh theo tên khách hàng hoặc mã hợp đồng.
   - Bảng dữ liệu: Tên khách hàng & Mã HĐ, Tên quyền lợi, Hạn mức năm, Đã bồi thường, Thanh tiến độ màu động, Số dư còn lại, Đánh giá & Khuyến nghị hành động.
   - Tương tác: Bấm vào tên khách hàng kích hoạt ngay `onSelectCustomer(customerId)`.

5. **Hoàn thiện `AnalyticsDashboardView.tsx`**:
   - Thanh Tab chuyển đổi mượt mà giữa 4 phân hệ (với icon, badge số lượng cảnh báo nếu có).
   - Truyền dữ liệu đồng bộ và bộ lọc thời gian vào từng Tab.

## Verification
- Chuyển đổi qua lại giữa 4 Tab không có độ trễ, giữ nguyên trạng thái bộ lọc thời gian.
- Bấm vào tên khách hàng ở Tab Radar và Tab Portfolio mở chính xác Customer Drawer.