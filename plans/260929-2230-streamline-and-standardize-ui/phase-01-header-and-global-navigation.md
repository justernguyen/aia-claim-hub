# Phase 1: Header & Global Controls De-cluttering

## Target Files
- `src/components/Header.tsx`

## Changes
1. Loại bỏ cụm 4 nút icon thừa: `[Xuất JSON]`, `[Xuất Excel]`, `[Nhập file]`, `[Reset/Khôi phục]` ở thanh trên bên phải. Thay vào đó, nút `Sao lưu` trở thành `Trung tâm Dữ liệu` duy nhất, tinh tế, sạch sẽ.
2. Tinh gọn Consultant Badge:
   - Giữ lại Avatar, Tên tư vấn viên, Badge danh hiệu (MDRT/COT/AGENT), Mã số tư vấn viên.
   - Bỏ bớt icon thừa và các dấu chấm ngăn cách rườm rà.
3. Đồng bộ phông chữ, chiều cao thanh header (h-14 sm:h-16), padding và bo góc các nút về `rounded-xl`.
4. Chuẩn hóa Navigation Tabs: Chữ đều đặn `font-medium / font-semibold`, badge số lượng tinh tế, màu nền thẻ tab active chuẩn nhận diện AIA Red (`bg-aia-red text-white shadow-xs`).
