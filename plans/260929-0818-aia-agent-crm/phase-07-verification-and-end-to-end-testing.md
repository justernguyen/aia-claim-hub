---
title: "Phase 7: Verification and End-to-End Testing"
status: todo
priority: P1
effort: 2h
---

# Phase 7: Verification and End-to-End Testing

## Overview

Thực hiện kiểm thử khép kín (End-to-End Verification) toàn bộ 4 phân hệ của hệ thống **AIA Agent CRM & Claim Management**. Kiểm tra tính nhất quán dữ liệu giữa Hồ sơ Khách hàng, Hợp đồng, Hồ sơ Claim, Lịch chăm sóc và Thống kê Báo cáo KPI.

Đồng thời xác thực tính năng Sao lưu (Export JSON/CSV) và Phục hồi (Import JSON) cơ sở dữ liệu ngoại tuyến, kiểm tra độ nhạy trên thiết bị di động/máy tính bảng và đảm bảo quá trình build production đạt tiêu chuẩn không có bất kỳ lỗi type hay cảnh báo nào.

---

## Key Insights & Requirements

- **Kiểm thử Luồng Nghiệp vụ Xuyên suốt (E2E Workflow):**
  1. *Bước 1:* Thêm một khách hàng mới kèm 1 hợp đồng AIA và thiết lập hạn mức quyền lợi (VD: Thẻ sức khỏe 250tr, Nằm viện 500k/ngày).
  2. *Bước 2:* Tạo hồ sơ claim mới cho khách hàng này (chọn từ dropdown, dữ liệu tự điền đầy đủ).
  3. *Bước 3:* Chuyển trạng thái claim sang `Đang thẩm định` ➔ `Đã duyệt` với số tiền bồi thường 15.000.000đ.
  4. *Bước 4:* Kiểm tra số dư thẻ sức khỏe của khách hàng tại Tab 1: Xác nhận hạn mức còn lại đã tự động giảm xuống 235.000.000đ.
  5. *Bước 5:* Ghi một nhật ký chăm sóc tại Tab 3 (ví dụ: *Gọi điện thông báo tiền bảo hiểm đã về tài khoản*), đánh dấu hoàn thành.
  6. *Bước 6:* Mở Tab 4 (Thống kê): Xác nhận chỉ số Tổng tiền claim duyệt và Doanh số khách hàng mới đã tăng tương ứng.
- **Kiểm thử Toàn vẹn Dữ liệu Sao lưu (Data Backup & Restore):**
  - Xuất dữ liệu ra file JSON (`aia_crm_backup.json`).
  - Bấm "Khôi phục dữ liệu mặc định" để làm mới hệ thống.
  - Nhập lại file JSON vừa tải về: Kiểm tra toàn bộ khách hàng, hợp đồng, claim và lịch chăm sóc được khôi phục nguyên vẹn 100%.
- **Kiểm thử Build & Tối ưu hóa:**
  - Chạy lệnh `npm run build` xác nhận `tsc -b && vite build` hoàn thành với mã thoát 0.
  - Đảm bảo bundle size tối ưu, không có module rò rỉ bộ nhớ.

---

## Architecture & Verification Matrix

| Kịch bản kiểm thử | Hành vi kỳ vọng | Tiêu chuẩn Đạt |
|-------------------|-----------------|----------------|
| Chuyển Tab Navigation | 4 tab chuyển đổi tức thời, giữ nguyên trạng thái | Đạt khi không reload |
| Thêm KH & Hợp đồng | Lưu vào LocalStorage, hiển thị trên cả Card & Table | Đạt khi F5 vẫn còn |
| Đối chiếu & Trừ Quyền lợi | Duyệt claim tự động trừ hạn mức thẻ sức khỏe | Đạt khi số dư khớp 100% |
| Toggle Sheet Chăm sóc | Bấm toggle trạng thái hoàn thành trực tiếp trên bảng | Đạt khi icon đổi màu |
| Cảnh báo Sinh nhật & Kỳ phí | Quét đúng ngày sinh và hợp đồng sắp đến hạn | Đạt khi hiển thị đúng |
| Biểu đồ Thống kê | Cập nhật số liệu tức thì khi thêm mới dữ liệu | Đạt khi render đúng |
| Export & Import JSON | Khôi phục đầy đủ cả 4 phân hệ dữ liệu | Đạt khi dữ liệu toàn vẹn |
| Production Build | `npm run build` thành công trong < 1.5 giây | Đạt khi exit code = 0 |

---

## Related Files

### Files to Modify / Verify:
- `src/App.tsx`
- `src/components/Header.tsx`
- `src/components/CustomerManagementView.tsx`
- `src/components/ClaimTableView.tsx` & `src/components/ClaimKanbanView.tsx`
- `src/components/CareScheduleView.tsx`
- `src/components/AnalyticsDashboardView.tsx`
- `src/hooks/useCRMStore.ts`

---

## Implementation Steps

1. **Thực hiện Kịch bản E2E:** Đi qua toàn bộ luồng nghiệp vụ 6 bước mô tả ở trên.
2. **Kiểm tra Edge Cases:**
   - Số tiền claim duyệt lớn hơn hạn mức còn lại: Hệ thống cảnh báo rõ ràng.
   - Hợp đồng hết hạn gia hạn 60 ngày: Hiển thị nhãn cảnh báo nguy cơ mất hiệu lực.
   - Nhập file JSON không hợp lệ: Xử lý ngoại lệ an toàn, thông báo lỗi thân thiện.
3. **Chạy Build Verification:** Thực thi `npm run build` trên terminal và kiểm tra báo cáo kích thước file.
4. **Đánh giá Trải nghiệm Responsive:** Kiểm tra giao diện trên màn hình độ phân giải di động (375px), máy tính bảng (768px) và màn hình rộng (1440px).

---

## Todo List

- [ ] Thực hiện smoke test toàn bộ luồng tạo khách hàng ➔ nộp claim ➔ trừ hạn mức ➔ ghi nhận chăm sóc
- [ ] Kiểm tra cơ chế xuất/nhập JSON và phục hồi dữ liệu hoàn chỉnh
- [ ] Kiểm tra các trường hợp biên (vượt hạn mức, sai định dạng file import)
- [ ] Chạy lệnh `npm run build` đảm bảo không có lỗi type hoặc cảnh báo
- [ ] Kiểm tra responsive trên các kích thước màn hình phổ biến

---

## Success Criteria

- Toàn bộ các bước trong kịch bản kiểm thử E2E hoạt động chính xác không phát sinh lỗi.
- File backup JSON lưu trữ và phục hồi toàn vẹn 100% dữ liệu của 4 phân hệ.
- Lệnh `npm run build` hoàn thành thành công trong thời gian dưới 1.5 giây.
- Giao diện trực quan, chuyên nghiệp, phản ánh trọn vẹn phong cách chuyên gia của tư vấn viên Dương Như Ý.
