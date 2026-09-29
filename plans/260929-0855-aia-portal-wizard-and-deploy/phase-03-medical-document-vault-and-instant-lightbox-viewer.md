---
title: "Phase 3: Medical Document Vault & Instant Lightbox Viewer"
status: todo
priority: P1
effort: 2h
---

# Phase 3: Medical Document Vault & Instant Lightbox Viewer

## Overview

Hoàn thiện phân hệ **Kho Lưu Trữ Ảnh Y Tế & Trình Chiếu Toàn Màn Hình (Medical Document Vault & Lightbox Viewer)** nhằm giải quyết dứt điểm nỗi đau tư vấn viên chia sẻ: *"Thường em claim thì hồ sơ gửi về công ty, hình ảnh claim không check lại được, phải lội lại tin nhắn Zalo của khách hàng mà ảnh hay bị mất."*

Hệ thống cho phép:
1. Lưu ảnh giấy tờ trực tiếp dưới dạng Base64/Data URI an toàn trong hồ sơ.
2. Trình chiếu phóng to (Zoom in/out, xoay 90 độ, tải về máy) xem rõ nét từng con số trên hóa đơn VAT và bảng kê viện phí.
3. Cho phép bổ sung thêm giấy tờ mới bất cứ lúc nào trong Slide-over Drawer.

---

## Related Files

### Files to Modify / Create:
- `src/components/DocumentImageViewer.tsx`
- `src/components/ClaimDetailDrawer.tsx`
- `src/hooks/useCRMStore.ts`

---

## Todo List

- [ ] Hoàn thiện `DocumentImageViewer.tsx` với các phím tắt và nút zoom/xoay ảnh
- [ ] Thêm Album ảnh chứng từ y tế (Photo Gallery) trực quan tại đầu Drawer hồ sơ claim
- [ ] Cho phép tải thêm hoặc đổi ảnh chứng từ bất kỳ lúc nào chỉ với 1 click
- [ ] Bổ sung tính năng thêm nhanh loại giấy tờ y tế tùy chỉnh

---

## Success Criteria

- Bấm vào bất kỳ ảnh chứng từ nào mở ra cửa sổ phóng to toàn màn hình mượt mà.
- Đọc rõ từng chi tiết trên hóa đơn viện phí và giấy ra viện.
- Ảnh được lưu trữ bền vững, không bao giờ bị hết hạn.
