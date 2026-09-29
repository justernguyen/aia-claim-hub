---
title: "Phase 3: Kiểm Thử Responsive & Đóng Gói Nghiệm Thu"
status: todo
---

# Phase 3: Kiểm Thử Responsive & Đóng Gói Nghiệm Thu

## Context Links
- Toàn bộ giao diện ứng dụng sau khi tích hợp: Header, Dashboard, Claims, Care, Analytics.
- Quy chuẩn kiểm thử dự án: Build sạch không lỗi type, layout hiển thị chuẩn trên mọi thiết bị.

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Đảm bảo toàn bộ thay đổi không gây lỗi biên dịch TypeScript, layout responsive hoạt động trơn tru trên mọi kích thước màn hình, và hình ảnh hiển thị sắc nét.

## Requirements
- **Kiểm tra biên dịch**:
  - `npm run build` hoặc `npx tsc --noEmit` hoàn thành không có cảnh báo/lỗi type.
- **Kiểm tra giao diện Desktop (≥ 1280px)**:
  - Logo AIA vector đầy đủ (Đỉnh núi + Wordmark) hiển thị chuẩn mực ở Header.
  - Khung tư vấn viên hiển thị đầy đủ avatar tròn, tên "Dương Như Ý", huy hiệu MDRT, mã số "AIA-VN-8869" và chi nhánh.
- **Kiểm tra giao diện Tablet / Mobile (< 768px)**:
  - Header không bị tràn ngang hoặc che khuất các nút thao tác.
  - Logo và avatar tự căn chỉnh kích thước hợp lý.
- **Kiểm tra Favicon**:
  - Favicon tab trình duyệt tải thành công biểu tượng đỉnh núi AIA.

## Implementation Steps
1. Chạy lệnh kiểm tra TypeScript: `npx tsc --noEmit` để đảm bảo không có lỗi type.
2. Chạy lệnh build: `npm run build` để kiểm tra quá trình bundle và assets tĩnh.
3. Khởi động preview hoặc dev server và thực hiện smoke test trực quan.
4. Kiểm tra ảnh avatar ở các trạng thái hover / responsive.

## Todo List
- [ ] Chạy kiểm tra TypeScript (`tsc --noEmit`).
- [ ] Chạy build kiểm tra bundle (`npm run build`).
- [ ] Xác minh hiển thị favicon trên tab trình duyệt.
- [ ] Kiểm tra responsive trên Desktop (1280px) và Mobile (375px).
- [ ] Hoàn tất tài liệu nghiệm thu và chuyển giao.

## Success Criteria
- Lệnh build thành công (exit code 0).
- Không có lỗi console trong runtime.
- Logo AIA và Avatar tư vấn viên hiển thị sắc nét, chuyên nghiệp, đúng yêu cầu người dùng.
