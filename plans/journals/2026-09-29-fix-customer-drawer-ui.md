# Nhật Ký Kỹ Thuật: Khắc phục Lỗi Vỡ Giao diện Drawer Chi tiết Khách hàng

- **Thời gian**: 2026-09-29
- **Tác vụ**: Sửa lỗi xén đứt tab, tràn layout và nâng cấp giao diện CustomerDetailDrawer & ClaimDetailDrawer
- **Kế hoạch**: `plans/260929-0925-fix-customer-drawer-ui/`

## 1. Vấn đề Phát hiện & Cơ chế Gây Lỗi
- **Triệu chứng**: Khi mở drawer chi tiết khách hàng ("Trần Hoàng Nam"), tab thứ 4 bị xén đứt chữ thành *"Hồ sơ Cá nh..."*.
- **Nguyên nhân cốt lõi**:
  1. Drawer container bị giới hạn bề ngang cứng ở `max-w-2xl` ($672\text{px}$).
  2. Bốn tab điều hướng với nhãn đầy đủ và badge số lượng yêu cầu tối thiểu $\approx 780\text{px}$, dẫn tới tab cuối cùng bị tràn và xén đứt chữ. Thuộc tính `scrollbar-none` ẩn thanh cuộn khiến giao diện trông như bị lỗi vỡ.
  3. Thứ tự tab chưa hợp lý: "Hồ sơ Cá nhân" bị xếp sau cùng và dùng sai icon `Calendar`.
  4. Header hiển thị `Trần Hoàng Nam Nam` do chưa tách biệt badge giới tính và họ tên.
  5. Nội dung tab hồ sơ chưa có cấu trúc thẻ phân nhóm và nút sao chép nhanh CCCD/SĐT.

## 2. Giải pháp Thực hiện
1. **Drawer Responsive Width**:
   - Nâng cấp container từ `max-w-2xl` lên `w-screen max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl`.
   - Cung cấp không gian $768\text{px} - 896\text{px}$ trên Desktop/Tablet để hiển thị toàn bộ 4 tab và bảng hạn mức quyền lợi.
2. **Chuẩn hóa Tab Navigation**:
   - Tab 1: **Hồ sơ Cá nhân** (Icon `User`).
   - Tab 2: **Hợp đồng & Quyền lợi** (Icon `ShieldCheck` + badge số lượng).
   - Tab 3: **Lịch sử Bồi thường** (Icon `Receipt` + badge số lượng).
   - Tab 4: **Nhật ký Chăm sóc** (Icon `Clock` + badge số lượng).
   - Thiết lập thanh cuộn `scrollbar-thin` linh hoạt khi màn hình hẹp, không còn hiện tượng xén đứt chữ.
3. **Nâng cấp Giao diện Tab Hồ sơ Cá nhân**:
   - **Thẻ 1 - Thông tin Định danh & Pháp lý**: CCCD kèm nút Copy nhanh + feedback "Đã chép", Ngày sinh kèm tính tuổi tự động, Giới tính, Mã KH, Phân khúc KH AIA.
   - **Thẻ 2 - Thông tin Liên hệ Trực tiếp**: SĐT với nút Gọi / Zalo / Copy nhanh, Email với `mailto:`, Địa chỉ thường trú với icon `MapPin`.
   - **Thẻ 3 - Nghề nghiệp & Ghi chú Tư vấn**: Vị trí công tác và khối trích dẫn ghi chú tư vấn với viền đỏ AIA nổi bật.
4. **Header & Badge Giới tính**:
   - Phân biệt rõ ràng Họ tên và Giới tính với badge `♂ Nam` hoặc `♀ Nữ`.
5. **Đồng bộ hóa ClaimDetailDrawer**:
   - Cập nhật chiều rộng responsive tương đương cho drawer chi tiết bồi thường.

## 3. Kết quả Kiểm thử
- `npm run build`: Thành công 100% trong 833ms, không có lỗi TypeScript.
- `npm run lint`: Không phát sinh cảnh báo lỗi mới trong `CustomerDetailDrawer.tsx` và `ClaimDetailDrawer.tsx`.
- `browser.open` smoke test: Đã kiểm thử trực tiếp trên Chromium cả Desktop (1280px) và Mobile (390px). Cả 4 tab và các nội dung thẻ hiển thị trọn vẹn, sắc nét, chuyển tab mượt mà.
- Ảnh nghiệm thu:
  - `plans/260929-0925-fix-customer-drawer-ui/drawer-preview.png`
  - `plans/260929-0925-fix-customer-drawer-ui/tab-policies.png`
  - `plans/260929-0925-fix-customer-drawer-ui/tab-claims.png`
  - `plans/260929-0925-fix-customer-drawer-ui/mobile-preview.png`
