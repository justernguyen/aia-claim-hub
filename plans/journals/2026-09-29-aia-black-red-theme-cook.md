---
title: Hoàn Thành Chuẩn Hóa Nhận Diện Thương Hiệu AIA - Tone Màu Đen & Đỏ Chủ Đạo
date: 2026-09-29
summary: Tối giản thành công bảng màu CRM, loại bỏ các nút và chỉ báo màu xanh lá / vàng cam, đưa toàn bộ giao diện về chuẩn Đen Than & Đỏ AIA thanh lịch.
---

# Hoàn Thành Chuẩn Hóa Nhận Diện Thương Hiệu AIA - Tone Màu Đen & Đỏ Chủ Đạo

Tối giản thành công bảng màu CRM, loại bỏ các nút và chỉ báo màu xanh lá / vàng cam, đưa toàn bộ giao diện về chuẩn Đen Than & Đỏ AIA thanh lịch.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Chi tiết triển khai
- **Plan directory**: `plans/260929-0933-aia-black-red-theme/`
- **Kết quả thực hiện**:
  1. **Header & Thao tác**: Chuyển nút `Nhập Excel` sang gam màu đen than `bg-slate-900 text-white`, icon xuất/nhập sang slate monochrome; badge MDRT sang viền xám thanh lịch; điểm đỏ duy nhất được dành cho nút `+ Thêm KH` và `+ Thêm mới`.
  2. **Dải 4 Card KPI**: Toàn bộ chỉ số chuyển sang màu đen than `text-slate-900 font-mono font-extrabold`, các hộp icon chuyển sang nền xám trung tính `bg-slate-100` hoặc đỏ AIA cảnh báo nhẹ.
  3. **Thẻ Khách hàng & Bảng**: Trạng thái "Đang hiệu lực" chuyển sang badge xám tối giản `bg-slate-100 text-slate-800` có dot đen; trạng thái "Chờ nộp phí" và hạn gia hạn 60 ngày dùng nền đỏ AIA tinh tế `bg-rose-50 text-aia-red border-rose-200`. Thanh tiến độ hạn mức quyền lợi dùng xám đen `bg-slate-700` và chuyển `bg-aia-red` khi cảnh báo >80%.
  4. **CustomerImportModal**: Icon đầu trang đổi từ xanh lá sang đen than `bg-slate-800`, nút Submit chuyển sang đỏ AIA `bg-aia-red`.
  5. **Xác thực**: Lệnh build `npm run build` hoàn thành không lỗi. Smoke test Chromium headless đã chụp lại toàn bộ màn hình nghiệm thu tại `plans/verified-black-red-theme.png`.
