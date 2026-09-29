# Phase 2: Design Tokens & Typography Standardization

## Target Files
- `src/index.css`
- `src/types/crm.ts`
- `src/types/claim.ts`

## Changes
1. Cấu hình bảng màu chuẩn và các lớp tiện ích typography trong `src/index.css`:
   - Định nghĩa font Inter làm chuẩn typography toàn hệ thống với smoothing font tối ưu (`-webkit-font-smoothing: antialiased`).
   - Thiết lập chuẩn tabular numbers `.font-numeric` cho tất cả các trường số tiền, ngày tháng, mã hợp đồng, số điện thoại.
   - Thêm các utility class cho badge chuẩn: `.badge-subtle`, `.badge-aia`, `.badge-success`, `.badge-warning`.
2. Đồng bộ màu sắc trạng thái (Status Config):
   - Thay các viền đậm và màu tương phản gắt bằng màu dịu nhẹ theo chuẩn SaaS hiện đại (Slate, Emerald, Rose, Amber nhẹ).
