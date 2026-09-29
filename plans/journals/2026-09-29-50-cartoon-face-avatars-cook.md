---
title: Mở Rộng Kho 50 Avatar Khuôn Mặt Hoạt Hình & Bộ Lọc Phân Loại Cho Khách Hàng
date: 2026-09-29
summary: Mở rộng từ 16 lên đúng 50 mẫu khuôn mặt hoạt hình vector chất lượng cao chuẩn AIA, bổ sung 4 tab phân loại danh mục và thanh cuộn mượt mà trên AvatarPickerModal.
---

# Mở Rộng Kho 50 Avatar Khuôn Mặt Hoạt Hình & Bộ Lọc Phân Loại Cho Khách Hàng

Thực hiện yêu cầu người dùng: *"MẪU AVATAR KHÁ ÍT, LÀM 50 MẪU ĐI"*.

## Chi tiết thực hiện

1. **Mở rộng kho Avatar lên đúng 50 mẫu vector chuẩn SVG:**
   - Bảo lưu trọn vẹn 16 mẫu hiện có và cấu hình kế thừa `LEGACY_AVATAR_MAP`.
   - Bổ sung 34 mẫu mới (tổng cộng đúng 50 mẫu) phân bổ đồng đều:
     * **Nữ tươi tắn (20 mẫu):** Cô gái Hijab hồng, tóc xoăn kính trắng, tóc vàng nháy mắt, băng đô thể thao, mũ beret nghệ sĩ, bé gái má hồng, tóc tém cá tính, búi tóc củ tỏi, bác sĩ blouse nữ, tiếp viên hàng không AIA, tóc bob kẹp hoa, mọt sách kính tròn, mũ len vàng ấm áp, tóc đuôi ngựa năng động, quý cô khăn lụa công sở, bé gái tai thỏ, nữ nhân viên văn phòng đeo thẻ AIA, cô nàng da nâu tóc xoăn afro, nữ streamer tai nghe hồng, nữ sinh sơ mi thắt nơ đỏ.
     * **Nam năng động (20 mẫu):** Bạn nam Turban, tóc nhọn spiky, mắt trái tim, mũ len lè lưỡi, kính râm ngầu, mũ snapback ngược, chuyên viên sơ mi ấm áp, lập trình viên IT kính tri thức, râu quai nón sành điệu, bác sĩ nam áo blouse xanh, game thủ tai nghe LED xanh, phi công thương mại mũ đại cán, tóc uốn xoăn sóng lãng tử, quý ông ria mép cong lịch thiệp, nam sinh cà vạt sọc trẻ trung, vận động viên băng trán thể thao, cậu bạn răng khểnh dễ thương, áo hoodie xám năng động, doanh nhân vest cà vạt đỏ AIA, tóc undercut vuốt keo nam tính.
     * **Sáng tạo & Nghề nghiệp (10 mẫu):** Cụ già vương miện hoa, nón mùa đông trapper, quý bà kính tròn thông thái, phi hành gia vũ trụ mũ phi thuyền, bếp trưởng mũ nón trắng cao vút, chú mèo hoạt hình đội mũ len, người máy tương lai mắt sáng LED xanh, thám tử mũ fedora cổ điển, cụ ông râu tóc bạc phơ hiền hậu, nhà khoa học kính bảo hộ lab.

2. **Nâng cấp giao diện `AvatarPickerModal.tsx`:**
   - **Thanh lọc phân loại (Category Filter Pills):** `✨ Tất cả (50)`, `👩 Nữ tươi tắn (20)`, `👨 Nam năng động (20)`, `🎨 Sáng tạo & Nghề (10)`. Bấm tab lọc tức thì theo danh mục.
   - **Khung lưới responsive & thanh cuộn:** Lưới 6 cột (desktop) / 4 cột (mobile) với `max-h-72 sm:max-h-80 overflow-y-auto` cuộn nhẹ nhàng, không tràn màn hình.
   - **Tính năng gợi ý ngẫu nhiên:** Tự động pick ngẫu nhiên trong danh mục đang chọn.
   - **Xem trước thời gian thực (Live Preview):** Vòng tròn lớn 128px cập nhật ngay lập tức khi bấm chọn kèm tên mẫu avatar.

3. **Kiểm tra & Nghiệm thu (Verification):**
   - TypeScript build: `tsc -b && vite build` hoàn thành trong 828ms với 0 lỗi.
   - Chạy kiểm thử tự động toàn diện: 50/50 avatar render thành SVG hợp lệ.
   - Browser smoke test: Chụp ảnh màn hình thực tế cả 4 tab phân loại, chọn avatar Người máy / Nhà khoa học, lưu thành công vào thẻ khách hàng kèm thông báo toast.
