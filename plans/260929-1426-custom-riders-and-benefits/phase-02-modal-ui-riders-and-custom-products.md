---
title: "Phase 2: Modal UI Riders & Custom Products"
status: todo
---

# Phase 2: Modal UI Riders & Custom Products

## Overview

Nâng cấp toàn diện Section 2 của `NewCustomerModal.tsx` để đại lý có thể chủ động cấu hình Sản phẩm chính và toàn bộ các Sản phẩm bổ trợ (Riders) đi kèm hợp đồng, hỗ trợ cả danh mục có sẵn lẫn tự gõ sản phẩm mới.

## Requirements

- [x] Cung cấp cơ chế chọn Sản phẩm chính AIA hoặc nhập tên sản phẩm chính khác tùy biến
- [x] Xây dựng khu vực "Danh mục Sản phẩm bổ trợ & Quyền lợi đính kèm (Riders)" trực quan
- [x] Tích hợp danh sách Checkbox kèm nút gạt bật/tắt cho các gói AIA mẫu (Thẻ CSSK, Bệnh hiểm nghèo, Tai nạn, Viện phí, Miễn đóng phí)
- [x] Cho phép chỉnh sửa Hạn mức / Số tiền bảo hiểm cho từng gói bổ trợ với format tiền tệ và chữ đọc số tiền VND
- [x] Nút "+ Thêm sản phẩm bổ sung khác" cho phép tạo thêm các dòng sản phẩm con tùy biến (tên gói, loại quyền lợi, hạn mức) kèm nút xóa dòng
- [x] Trình thu thập dữ liệu form tổng hợp chính xác mảng `benefits` khi đại lý bấm "Hoàn tất thêm khách hàng"

## UI/UX Design Specifications

### 1. Sản phẩm chính linh hoạt
- Dropdown danh sách sản phẩm AIA hiện tại:
  - AIA - Khỏe Trọn Vẹn
  - AIA - Trọn Vẹn Cân Bằng
  - AIA - An Phúc Trọn Đời Ưu Việt
  - AIA - Bùng Sức Sống 10+ Cùng AIA
  - AIA - Khỏe Toàn Diện
  - *+ Nhập tên sản phẩm khác...*
- Nếu chọn mục "+ Nhập tên sản phẩm khác...", hiển thị ô input text để đại lý gõ tự do (vd: AIA - An Tâm Thượng Khách, AIA - Bước Đột Phá...).

### 2. Danh sách Sản phẩm bổ trợ (Riders Checklist)
- Mỗi gói có:
  - Checkbox bật/tắt (kèm icon và màu nhận diện: đỏ AIA, xanh ngọc, xanh dương, tím)
  - Tên gói sản phẩm & nhãn loại quyền lợi (`ClaimType badge`)
  - Ô nhập hạn mức (VND) định dạng số `1.000.000` + chip hiển thị số tiền bằng chữ (vd: *300 triệu đồng*)
  - Chip bấm chọn nhanh hạn mức gợi ý (vd: 150tr | 250tr | 500tr | 1 tỷ)

### 3. Khối Thêm Sản phẩm tùy biến (Custom Riders)
- Nút bấm viền nét đứt: `+ Thêm sản phẩm bổ trợ khác`
- Mỗi dòng mới tạo gồm:
  - Input tên sản phẩm (vd: Bảo hiểm Chăm sóc Nha khoa Quốc tế)
  - Select loại quyền lợi tương ứng (`ClaimType`: Ngoại trú, Nha khoa, Phẫu thuật...)
  - Input hạn mức VND
  - Nút biểu tượng thùng rác để xóa dòng

## Related Code Files

- `src/components/NewCustomerModal.tsx`: Cải tiến form nhập liệu hợp đồng và state quản lý riders
- `src/utils/formatters.ts`: Sử dụng `formatNumberInput`, `parseNumberInput`, `formatWordsVND`

## Implementation Steps

1. Khởi tạo state `riders` trong `NewCustomerModal` với các gói mặc định từ `AIA_RIDER_PRESETS`.
2. Bổ sung state cho custom main product name (`isCustomProduct`, `customProductName`).
3. Render giao diện checklist riders với thiết kế card tinh gọn, hiện đại theo tông màu AIA Red/Slate.
4. Render danh sách custom riders với các nút thêm/xóa dòng.
5. Cập nhật hàm `handleSubmit` để đóng gói toàn bộ các gói đã bật thành mảng `benefits: BenefitQuota[]`.

## Todo

- [x] Thiết lập state cho sản phẩm chính tùy biến và danh sách riders
- [x] Xây dựng UI checklist cho các gói bổ trợ AIA chuẩn
- [x] Xây dựng UI cho các dòng sản phẩm con tự do (+ Thêm sản phẩm)
- [x] Tích hợp format tiền tệ và đọc số tiền bằng chữ tiếng Việt cho từng rider
- [x] Cập nhật hàm `handleSubmit` xuất mảng `benefits` hoàn chỉnh

## Success Criteria

- Đại lý có thể bật/tắt các gói bổ trợ và nhập hạn mức mong muốn mà không gặp lỗi layout.
- Thêm được ít nhất 2 gói bổ trợ tùy biến và xóa được khi không cần thiết.
- Dữ liệu `policyData.benefits` chứa đầy đủ tất cả các gói được kích hoạt với hạn mức chính xác.
