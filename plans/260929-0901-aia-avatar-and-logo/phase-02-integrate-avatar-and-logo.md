---
title: "Phase 2: Tích Hợp Avatar & Logo Vào Giao Diện App"
status: todo
---

# Phase 2: Tích Hợp Avatar & Logo Vào Giao Diện App

## Context Links
- `src/components/Header.tsx`: Header chính của ứng dụng, chứa logo thương hiệu và khung thông tin tư vấn viên.
- `src/data/mockClaims.ts`: Nơi định nghĩa `CURRENT_CONSULTANT` và thông tin khởi tạo.
- `src/App.tsx`: Layout tổng thể và footer thông tin tư vấn viên.
- `src/components/AiaLogo.tsx`: Component logo vừa được tạo ở Phase 1.

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Đưa logo AIA vector và avatar tư vấn viên vào các vị trí hiển thị trọng yếu trên giao diện CRM, thay thế toàn bộ các placeholder tạm bợ.

## Requirements
- **Header Brand Area (Góc trái)**:
  - Thay khối `div` đỏ "AIA" cũ bằng component `<AiaLogo />` chính hãng.
  - Trên màn hình Desktop: Hiển thị logo AIA kết hợp với tiêu đề hệ thống "AIA Agent CRM & Claim Hub" và badge "MDRT Portal".
  - Trên màn hình Mobile: Tự động co gọn để không chiếm quá nhiều diện tích.
- **Consultant Profile Card (Góc phải)**:
  - Hiển thị ảnh đại diện tròn (`w-9 h-9 sm:w-10 sm:h-10 rounded-full`) với ảnh thật của tư vấn viên (`/avatar-consultant.png`).
  - Viền mỏng cao cấp (`ring-2 ring-rose-100 border border-white shadow-xs`).
  - Fallback thông minh: Nếu ảnh gặp sự cố nạp hoặc lỗi mạng, tự động chuyển về avatar chữ cái "Ý" trên nền gradient đỏ.
  - Giữ chấm tròn trạng thái online (`bg-emerald-500`) ở góc dưới cùng bên phải avatar.
- **Dữ liệu Mock Data**:
  - Cập nhật trường `CURRENT_CONSULTANT.avatarUrl` trong `src/data/mockClaims.ts` trỏ tới `/avatar-consultant.png`.
- **Footer & Màn hình phụ**:
  - Footer trang `App.tsx`: Cập nhật biểu tượng AIA chuẩn và avatar thu nhỏ.

## Related Code Files
- `src/components/Header.tsx`: Sửa đổi vùng logo thương hiệu và khung profile tư vấn viên.
- `src/data/mockClaims.ts`: Cập nhật `avatarUrl` trong `CURRENT_CONSULTANT`.
- `src/App.tsx`: Tinh chỉnh footer đồng bộ nhận diện thương hiệu.

## Implementation Steps
1. Mở `src/components/Header.tsx`:
   - Import `AiaLogo` từ `./AiaLogo`.
   - Thay thế khối div tĩnh dòng 108 bằng `<AiaLogo variant="full" className="h-9 sm:h-10" />`.
   - Sửa dòng 129: Thêm state xử lý lỗi ảnh `imgError`, render thẻ `<img>` với `src={consultant.avatarUrl || '/avatar-consultant.png'}` kèm fallback component.
2. Mở `src/data/mockClaims.ts`:
   - Cập nhật `avatarUrl: '/avatar-consultant.png'` trong hằng số `CURRENT_CONSULTANT`.
3. Mở `src/App.tsx`:
   - Kiểm tra footer dòng 286: Thêm logo AIA mini chuẩn thay cho text đơn điệu.

## Todo List
- [ ] Tích hợp `<AiaLogo />` vào Header góc trái.
- [ ] Thêm hiển thị `<img>` avatar với fallback xử lý lỗi vào Header góc phải.
- [ ] Cập nhật `mockClaims.ts` trỏ avatarUrl về ảnh mới.
- [ ] Cập nhật footer trong `App.tsx` đồng bộ nhận diện AIA.

## Success Criteria
- Header hiển thị logo AIA vector sắc nét thay vì chữ AIA text thông thường.
- Avatar chân dung tư vấn viên hiển thị đúng ảnh người dùng cung cấp, căn tròn đẹp mắt, không bị méo tỷ lệ.
- Fallback hoạt động nếu đường dẫn ảnh bị lỗi.
