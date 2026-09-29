---
title: Thay Thế Icon Khách Hàng Bằng 16 Avatar Khuôn Mặt Hoạt Hình & Modal Chuẩn Image #1
date: 2026-09-29
summary: Khắc phục triệt để lỗi icon bóng người đen, thay thế toàn bộ bằng 16 vector khuôn mặt hoạt hình biểu cảm chuẩn phong cách Image #1 và tái cấu trúc AvatarPickerModal có Preview tròn lớn và 2 Tab Hình mẫu/Tải lên.
---

# Thay Thế Icon Khách Hàng Bằng 16 Avatar Khuôn Mặt Hoạt Hình & Modal Chuẩn Image #1

Khắc phục triệt để phản hồi của người dùng: *"Lỗi icon, mà icon xấu quá, hãy làm icon khuôn mặt đi, ví dụ vậy"*.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

## Chi tiết thực hiện

1. **Nguyên nhân cốt lõi:**
   - Bộ avatar cũ trong `avatarCatalog` vẽ hình bóng người mặc áo vest/áo blouse màu đen xám (`#18181B`, `#0F172A`) trên nền gradient tối. Khi thu nhỏ về 36px - 48px trên thẻ khách hàng, các icon này trông như các đốm đen bị vỡ/lỗi hình ảnh.
   - Ngoài ra, tồn tại cả file `avatarCatalog.ts` (cũ) và `avatarCatalog.tsx` (mới) khiến Vite ưu tiên nạp file cũ. Đã xóa file `.ts` để đảm bảo hệ thống sử dụng duy nhất file `.tsx` mới.

2. **Xây dựng 16 Avatar Khuôn mặt hoạt hình (Cartoon Face Avatars) chuẩn phong cách Image #1:**
   - **8 nhân vật chính khớp 100% với ảnh mẫu:**
     1. `face-hijab-pink`: Bé gái trùm khăn Hijab hồng, mắt nhắm thư thái (khớp vòng preview lớn).
     2. `face-turban-winking`: Bạn nam quấn khăn Turban xanh ngọc nháy mắt, áo đen họa tiết gạc nai (Card 1).
     3. `face-spiky-boy`: Bạn trai tóc nâu nhọn cười tươi rạng rỡ (Card 2).
     4. `face-curly-glasses`: Cô gái tóc xoăn bồng bềnh đeo kính trắng (Card 3).
     5. `face-heart-eyes`: Bạn trai mắt trái tim đỏ rực rỡ, áo khoác xanh (Card 4).
     6. `face-beanie-tongue`: Bạn trai đội mũ len hồng lè lưỡi nháy mắt tinh nghịch (Card 5).
     7. `face-flower-crown`: Cụ già râu trắng đội vương miện hoa sắc màu, khuyên tai tia sét (Card 6).
     8. `face-blonde-winking`: Bạn nữ tóc vàng nâu nháy mắt duyên dáng (Card 7).
   - **8 nhân vật bổ trợ mở rộng:**
     9. `face-trapper-winter`: Nhân vật nón mùa đông che tai pom-pom (Card 8 trong ảnh mẫu).
     10. `face-cool-sunglasses`: Bạn trai ngầu đeo kính râm mắt đen.
     11. `face-headband-sport`: Bạn nữ thể thao băng đô cam năng động.
     12. `face-beret-artist`: Bạn nữ mũ Beret đỏ phong cách nghệ sĩ.
     13. `face-cap-backward`: Bạn trai đội mũ lưỡi trai ngược.
     14. `face-blush-cute`: Bé gái má hồng tóc hai búi đáng yêu.
     15. `face-elder-glasses`: Quý bà kính tròn thông thái tóc bạc.
     16. `face-executive-smile`: Chuyên viên tài chính nụ cười rạng rỡ.
   - Nền pastel tươi sáng: Xanh da trời `#BAE6FD`, tím nhạt `#DDD6FE`, vàng kem `#FEEBC8`, xanh bạc hà `#CFFAFE`...

3. **Tái cấu trúc `AvatarPickerModal.tsx` theo chuẩn 100% Image #1:**
   - Header: *"Thay đổi ảnh đại diện (Tên khách)"* + nút đóng `✕`.
   - **Vòng tròn preview lớn ở trên cùng:** Bo tròn viền trắng bóng bẩy, kích thước 128px, cập nhật thời gian thực khi bấm chọn avatar trong lưới.
   - **Thanh 2 Tab chuyển đổi:**
     * `[ Hình mẫu ]`: Lưới 16 khuôn mặt hoạt hình bo góc tròn mềm mại, viền đỏ AIA khi chọn.
     * `[ Tải lên ]`: Khung kéo thả tải ảnh từ máy tính/điện thoại (JPG/PNG/WEBP) hoặc dán link URL ảnh.
   - Nút hành động: "HỦY BỎ" & "LƯU THAY ĐỔI".

4. **Triển khai Production lên Vercel:**
   - Đã commit và push lên GitHub `justernguyen/aia-claim-hub` (Commit: `90122ce`).
   - Vercel deployment ID `6737471611` thành công 100%.
   - Đã kiểm tra trực quan trên website online `https://aia-claim-hub.vercel.app`.
