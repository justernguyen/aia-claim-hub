---
title: "Phase 3: Dashboard Layout & Metrics"
status: done
---

# Phase 3: Dashboard Layout & Metrics

## Overview
Xây dựng khung giao diện chính với Header nhận diện thương hiệu AIA, hiển thị thông tin tư vấn viên Dương Như Ý và hệ thống thẻ chỉ số KPI tổng quan phản ánh tình trạng giải quyết quyền lợi bảo hiểm.

## Requirements
- [x] Header chuẩn AIA: Logo biểu trưng AIA, danh tính: *"Tư vấn viên: Dương Như Ý | Mã số: AIA-VN-8869 | Văn phòng: AIA Exchange Bitexco Q1, TP.HCM"*.
- [x] Nút thao tác nhanh: Tạo hồ sơ claim mới (`+ Tiếp nhận hồ sơ mới`), Sao lưu dữ liệu (`Xuất JSON`, `Xuất Excel`), Khôi phục (`Nhập file`, `Khôi phục mặc định`).
- [x] Cụm thẻ Metrics KPI:
  1. Tổng hồ sơ bồi thường (Total Claims) kèm tổng tiền yêu cầu.
  2. Hồ sơ cần bổ sung chứng từ y tế (Cảnh báo vàng).
  3. Hồ sơ đang chờ AIA thẩm định (Theo dõi hạn SLA).
  4. Đã duyệt & chi trả thành công (Tỷ lệ duyệt % và tổng số tiền đã chi trả).
- [x] SLA Alert Banner: Cảnh báo trực quan các hồ sơ đã quá 5 ngày làm việc theo cam kết chất lượng dịch vụ của AIA.
