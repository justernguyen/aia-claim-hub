---
title: "Phase 4: Filter & Dual Data Views"
status: done
---

# Phase 4: Filter & Dual Data Views

## Overview
Xây dựng thanh công cụ tìm kiếm - lọc đa tiêu chí và hai chế độ xem dữ liệu linh hoạt: Bảng chi tiết (Data Table) và Bảng tiến độ luồng (Kanban Pipeline Board).

## Requirements
- [x] Thanh tìm kiếm tức thời (Search Bar): Tìm theo Tên khách hàng, Mã Claim, Số Hợp đồng hoặc Bệnh viện.
- [x] Bộ lọc trạng thái (Filter Tabs): Tất cả, Tiếp nhận, Bổ sung chứng từ, Đang thẩm định, Đã duyệt, Đã chi trả, Từ chối kèm số đếm động.
- [x] Bộ lọc loại quyền lợi (Category Filter): Viện phí, Phẫu thuật, Y tế, Bệnh hiểm nghèo, Tai nạn.
- [x] Công tắc Dual View:
  - **Table View:** Bảng dữ liệu hiện đại, phân loại badge màu chuẩn AIA, hiển thị ngày nộp, số tiền yêu cầu/duyệt, tình trạng chứng từ (ví dụ 4/4 chứng từ), nút hành động xem chi tiết/cập nhật nhanh.
  - **Kanban Board View:** 6 cột tương ứng các giai đoạn hồ sơ, hiển thị dạng thẻ hồ sơ trực quan (Card), cho phép xem nhanh và chuyển trạng thái tức thời.
