---
title: "Phase 4: Customer Bulk Import & Agency Sync"
status: todo
priority: P1
effort: 1h
---

# Phase 4: Customer Bulk Import & Agency Sync

## Overview

Xây dựng tính năng **Nhập danh bạ Khách hàng Hàng loạt từ Excel / CSV** để tư vấn viên dễ dàng kéo toàn bộ danh sách khách hàng và hợp đồng đang có trên cổng nội bộ công ty (Agency Portal / iPoS) về ứng dụng cá nhân mà không cần mất công gõ tay từng người.

---

## Related Files

### Files to Modify / Create:
- `src/components/CustomerImportModal.tsx`
- `src/components/CustomerManagementView.tsx`
- `src/hooks/useCRMStore.ts`

---

## Todo List

- [ ] Cung cấp nút tải file mẫu CSV chuẩn cột
- [ ] Hỗ trợ cả 2 cách nhập: Dán (Ctrl+V) trực tiếp từ bảng tính Excel hoặc Tải file .csv
- [ ] Tự động phân tách họ tên, SĐT, CCCD, số hợp đồng, phí định kỳ và sản phẩm AIA
- [ ] Bảng xem trước (Preview) kiểm tra số lượng và thông tin trước khi nạp vào hệ thống

---

## Success Criteria

- Dán dữ liệu từ Excel vào textarea nhận diện đúng các cột.
- Bấm "Nạp vào hệ thống" thêm toàn bộ khách hàng và hợp đồng mới tức thì.
