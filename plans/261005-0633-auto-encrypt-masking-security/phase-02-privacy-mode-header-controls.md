---
phase: 2
title: "Privacy Mode State & Header Controls"
status: pending
priority: P1
effort: "45m"
dependencies: [1]
---

# Phase 2: Privacy Mode State & Header Controls

## Overview
Quản lý trạng thái bảo mật toàn cục (Chế độ riêng tư - Privacy Mode) lưu trữ trong trình duyệt (mặc định bật) và tích hợp nút điều khiển trực quan trên `Header.tsx` để tư vấn viên dễ dàng chuyển đổi trạng thái khi cần làm việc hay đối soát.

## Requirements
- Functional:
  - Lưu trạng thái `isPrivacyMode` (mặc định `true`).
  - Nút chuyển đổi trên Header: Biểu tượng con mắt (`Eye` / `EyeOff`), hiển thị trạng thái "Riêng tư: BẬT" / "Riêng tư: TẮT".
  - Bổ sung phím tắt nhanh (ví dụ: `Alt + P`) hoặc click trực tiếp để bật/tắt nhanh mà không làm gián đoạn công việc.
- Non-functional:
  - UI hài hòa với nhận diện AIA, responsive trên cả mobile và desktop.

## Related Code Files
- Modify: `src/hooks/useCRMStore.ts` hoặc tạo `src/hooks/usePrivacyMode.ts`
- Modify: `src/components/Header.tsx`
- Modify: `src/App.tsx`

## Implementation Steps
1. Xây dựng hook `usePrivacyMode`:
   - State `isPrivacyMode`, hàm `togglePrivacyMode()`.
   - Lưu trữ lựa chọn vào `localStorage` key `aia_agent_privacy_mode`.
2. Tích hợp nút vào `Header.tsx`:
   - Nằm cạnh nút "Sao lưu & Dữ liệu", có tooltip giải thích rõ: "Chế độ riêng tư: Ẩn bớt số CCCD và SĐT để tránh lộ thông tin khi làm việc trước mặt người khác".
   - Hiệu ứng màu sắc: Đang bật bảo vệ (xanh lá hoặc slate cao cấp), đang tắt bảo vệ (cảnh báo nhẹ).

## Success Criteria
- [x] Bấm nút mắt trên Header: trạng thái `isPrivacyMode` đảo ngược lập tức.
- [x] F5 tải lại trang: trạng thái đã chọn vẫn được ghi nhớ chuẩn xác.
