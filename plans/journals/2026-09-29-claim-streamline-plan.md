# Kế Hoạch: Tinh Gọn Quy Trình Tiếp Nhận & Xử Lý Claim Bảo Hiểm (AIA Express Claim)
**Ngày tạo:** 2026-09-29  
**Người phụ trách:** AI Assistant & Tư vấn viên AIA  
**Trạng thái:** Đã lập kế hoạch (Ready for Cook)

## Bối cảnh & Vấn đề
- Form tạo Claim hiện tại (`NewClaimModal.tsx`) trải dài trên 1 trang đơn với nhiều trường thông tin nhập tay lặp lại (Họ tên, CCCD, SĐT, Tên gói SP).
- Tư vấn viên đi thăm khách tại viện cần thao tác nhanh trên điện thoại dưới 60 giây.
- Khâu đính kèm chứng từ y tế chưa có phân loại slot thông minh theo quyền lợi (inpatient, outpatient, accident...).

## Kế hoạch hành động
1. **Phase 1: Domain & Presets:** Xây dựng bộ presets chứng từ theo quyền lợi và top gợi ý bệnh viện (`claimPresets.ts`).
2. **Phase 2: Express 3-Step Wizard:** Thay thế form dài bằng Wizard 3 bước:
   - Bước 1: Khách hàng & Hợp đồng (Auto-fill 80%).
   - Bước 2: Sự kiện điều trị & Tài chính (Chips gợi ý viện phí).
   - Bước 3: Đính kèm chứng từ theo slot quyền lợi chuẩn AIA.
3. **Phase 3: Drawer Quick Actions:** Bổ sung thanh tác vụ 1 chạm (Báo thiếu giấy tờ qua Zalo, Nộp thẩm định iClaim, Duyệt nhanh).
4. **Phase 4: Kiểm thử & Nghiệm thu:** Build check & Smoke test mobile/desktop.
