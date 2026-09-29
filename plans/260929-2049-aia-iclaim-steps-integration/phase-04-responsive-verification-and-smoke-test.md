---
title: "Phase 4: Kiểm Thử Giao Diện Mobile/Desktop và Kiểm Tra Tích Hợp Hệ Thống"
status: pending
priority: P1
effort: 0.8h
---

# Phase 4: Kiểm Thử Giao Diện Mobile/Desktop và Kiểm Tra Tích Hợp Hệ Thống

## 1. Mục tiêu (Objective)

Thực hiện kiểm thử toàn diện giao diện và nghiệp vụ của Wizard tiếp nhận hồ sơ AIA iClaim 4 bước:
- **Kiểm thử giao diện Responsive:** Đối chiếu trực tiếp giao diện trên kích thước màn hình điện thoại (Viewport 375px - 430px, tương ứng với iPhone trong các ảnh mẫu tại `D:\Desktop\claim`) và màn hình Desktop máy tính.
- **Kiểm thử 2 luồng nghiệp vụ chính:**
  1. *Luồng điền nhanh (Quick-fill):* Chọn khách hàng có sẵn từ CRM $\rightarrow$ Kiểm tra tự động điền thông tin và quyền lợi $\rightarrow$ Chuyển nhanh qua các bước.
  2. *Luồng thủ công chuẩn Portal AIA:* Đi qua từng bước từ Xác thực Đại lý $\rightarrow$ Lựa chọn 11 quyền lợi $\rightarrow$ Đính kèm ảnh có xem thumbnail $\rightarrow$ Nhập thông tin sự kiện & Tra cứu ICD-10 $\rightarrow$ Phương thức thanh toán $\rightarrow$ Xác nhận & Nộp.
- **Kiểm thử tích hợp hệ thống (CRM Integration):** Xác nhận claim mới tạo được lưu vào `useCRMStore`, hiển thị đầy đủ trên Bảng danh sách, bảng Kanban, và có thể mở xem chi tiết tài liệu trong `ClaimDetailDrawer` & `DocumentImageViewer`.
- **Cổng hồi quy (Regression Gate):** Chạy `npm run build` và `npm run lint` đảm bảo 100% không phát sinh lỗi.

---

## 2. Kịch bản kiểm thử chi tiết (Test Scenarios)

### Kịch bản 1: Kiểm thử giao diện Mobile (Khớp 9 ảnh mẫu)
| Bước | Hành động | Kết quả kỳ vọng |
| :--- | :--- | :--- |
| 1.1 | Mở modal trên viewport `390x844` (iPhone 14) | Modal hiển thị full-screen hoặc vừa vặn màn hình, nút Tiếp tục và Quay lại ghim đáy hoặc dễ bấm. |
| 1.2 | Kiểm tra Bước 1 (Ảnh 1, 2, 3, 5, 6) | Hiển thị mã đại lý `000850386`, lưới 11 quyền lợi dễ tích chọn, mục đính kèm ảnh có nút Tải hồ sơ và preview thumbnail dạng carousel. |
| 1.3 | Kiểm tra Bước 2 (Ảnh 7, 8) | Nhóm I và nhóm II hiển thị rõ ràng, ô tìm kiếm bệnh viện và mã ICD-10 hoạt động mượt mà. |
| 1.4 | Kiểm tra Bước 3 (Ảnh 9) | Radio chọn ngân hàng và nhận tiền mặt kèm dòng cảnh báo đỏ hiển thị đúng layout. |

### Kịch bản 2: Kiểm thử luồng tạo Claim hoàn chỉnh (End-to-End)
1. Bấm nút **"Tiếp nhận hồ sơ"** trên Header.
2. Chọn khách hàng *"Nguyễn Thị Mai"* từ danh bạ $\rightarrow$ Form tự động nạp Số hợp đồng `AIA-1108924` và CCCD.
3. Chọn quyền lợi *"Điều trị ngoại trú"* $\rightarrow$ Danh mục chứng từ yêu cầu xuất hiện (Hóa đơn, Toa thuốc...).
4. Đính kèm 2 ảnh mẫu $\rightarrow$ Kiểm tra thumbnail xem trước, bấm xóa 1 ảnh và giữ lại 1 ảnh.
5. Bấm **"Tiếp tục"** sang Bước 2 $\rightarrow$ Nhập số tiền `601.873` đ $\rightarrow$ Kiểm tra chữ đọc tiền.
6. Chọn Tỉnh *"TP. Hồ Chí Minh"*, Bệnh viện *"Bệnh viện Vinmec"*, Tra cứu mã bệnh `K29` (Viêm dạ dày).
7. Bấm **"Tiếp tục"** sang Bước 3 $\rightarrow$ Chọn Ngân hàng *"Vietcombank"*, nhập STK `0071001234567`.
8. Bấm **"Tiếp tục"** sang Bước 4 $\rightarrow$ Kiểm tra lại thông tin tóm tắt trên Review Card $\rightarrow$ Tích chọn cam kết $\rightarrow$ Bấm **"Nộp hồ sơ bồi thường"**.
9. Xác nhận:
   - Thông báo Toast hiển thị thành công: *"Đã tiếp nhận hồ sơ CLM-2026-xxxx cho khách hàng Nguyễn Thị Mai!"*
   - Claim mới xuất hiện ngay lập tức ở cột *"Tiếp nhận hồ sơ"* trên Kanban.
   - Bấm vào claim để mở `ClaimDetailDrawer`, kiểm tra thấy đầy đủ mã ICD-10, tài khoản ngân hàng và tài liệu đã đính kèm.

---

## 3. Lệnh kiểm tra chất lượng (Verification Commands)

```bash
# 1. Kiểm tra biên dịch TypeScript và đóng gói Vite
npm run build

# 2. Kiểm tra chất lượng mã nguồn với Oxlint
npm run lint
```

---

## 4. Danh sách công việc (Todo List)

- [ ] Thực hiện kiểm tra toàn bộ luồng tạo claim trên môi trường dev.
- [ ] Chụp ảnh chụp màn hình kiểm chứng giao diện Mobile và Desktop lưu vào thư mục `plans/`.
- [ ] Chạy lệnh `npm run build` để kiểm tra tính toàn vẹn type và bundle.
- [ ] Chạy lệnh `npm run lint` để kiểm tra sạch lỗi lint.
- [ ] Cập nhật nhật ký kỹ thuật (Technical Journal).

---

## 5. Tiêu chí thành công & Nghiệm thu (Success Criteria)

1. Lệnh `npm run build` trả về mã thoát `0` (Success).
2. Quy trình 4 bước hoạt động trơn tru không có độ trễ hay lỗi state.
3. Hồ sơ tạo mới hiển thị chính xác mọi thông tin trên toàn bộ hệ thống CRM.
