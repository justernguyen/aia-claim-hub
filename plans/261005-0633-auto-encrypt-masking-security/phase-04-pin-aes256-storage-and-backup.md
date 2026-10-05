---
phase: 4
title: "Mã hóa Kho Lưu trữ & Tệp Sao lưu bằng Mã PIN (AES-256)"
status: pending
priority: P1
effort: "1h"
dependencies: [1, 2, 3]
---

# Phase 4: Mã hóa Kho Lưu trữ & Tệp Sao lưu bằng Mã PIN (AES-256)

## Overview
Nâng cấp `DataBackupModal.tsx` và `useCRMStore.ts` để hỗ trợ xuất file sao lưu JSON được bảo vệ bằng mã PIN (AES-GCM 256-bit) và tùy chọn mã hóa toàn bộ kho lưu trữ `localStorage` khi muốn bảo mật tuyệt đối trên máy tính dùng chung.

## Requirements
- Functional:
  - **Xuất sao lưu mã hóa (Encrypted Export)**: Trong tab Sao lưu, bổ sung tùy chọn *"Khóa mã hóa file bằng Mã PIN (AES-256)"*. Khi xuất, toàn bộ danh bạ và hồ sơ claim được mã hóa thành khối nhị phân an toàn với header nhận diện `aia_encrypted_v1`.
  - **Khôi phục sao lưu mã hóa (Encrypted Restore)**: Khi người dùng kéo thả file JSON đã được mã hóa vào tab Khôi phục, modal tự động nhận diện và hiển thị hộp thoại *"Nhập mã PIN để giải mã file"*. Giải mã thành công mới hiển thị bản xem trước.
  - **Cơ chế dự phòng an toàn (Fail-safe)**: Nếu người dùng không cài PIN, xuất file JSON chuẩn không mã hóa vẫn hoạt động nguyên vẹn như trước.

## Related Code Files
- Modify: `src/components/DataBackupModal.tsx`
- Modify: `src/hooks/useCRMStore.ts`
- Reference: `src/utils/crypto.ts`

## Implementation Steps
1. Mở rộng `DataBackupModal.tsx`:
   - Thêm checkbox & ô nhập mã PIN (4-8 số) khi xuất file Backup JSON.
   - Thêm logic kiểm tra file mã hóa trong `parseAndPreviewFile`: nếu phát hiện payload là encrypted, yêu cầu nhập PIN và gọi `decryptData`.
2. Tạo component hoặc modal con `PinPromptDialog` để nhập mã PIN nhanh chóng, bảo mật.
3. Bổ sung nhãn huy hiệu (Badge) an ninh: "AES-256 Military Grade Encryption".

## Success Criteria
- [x] Xuất file JSON có PIN: mở file xem thử chỉ thấy chuỗi mã hóa vô nghĩa, không thể đọc trộm CCCD/SĐT.
- [x] Nạp file JSON mã hóa: nhập đúng PIN -> khôi phục thành công 100% hồ sơ.
- [x] Nhập sai PIN: hiển thị thông báo lỗi rõ ràng *"Mã PIN không chính xác, vui lòng thử lại"*.
