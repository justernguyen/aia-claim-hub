# Phase 02: CustomerCard & Mobile KPI Metrics

## Objective
Chống vỡ dòng huy hiệu trạng thái trên `CustomerCard.tsx` và khắc phục lỗi số tiền KPI đè lên biểu tượng hoặc tràn viền trên `CustomerManagementView.tsx` & `AnalyticsDashboardView.tsx`.

## Files Owned
- `src/components/CustomerCard.tsx`
- `src/components/CustomerManagementView.tsx`
- `src/components/AnalyticsDashboardView.tsx`

## Changes
1. **`CustomerCard.tsx`**:
   - Thêm `min-w-0 flex-1` cho khối tên & nghề nghiệp khách hàng.
   - Thêm `whitespace-nowrap shrink-0` cho huy hiệu trạng thái hợp đồng (`Đang hiệu lực` / `Chờ nộp phí`) để luôn hiển thị gọn trên 1 dòng.
2. **`CustomerManagementView.tsx`**:
   - Tối ưu 4 thẻ KPI trên lưới 2 cột mobile (`p-3.5 sm:p-5`), ẩn hoặc thu nhỏ icon trang trí trên màn hình siêu nhỏ (`hidden xs:flex sm:flex`), điều chỉnh cỡ chữ số tiền `text-sm sm:text-xl` để `228.500.000 đ` không bao giờ đè lên icon.
3. **`AnalyticsDashboardView.tsx`**:
   - Điều chỉnh cỡ chữ KPI trên mobile `text-base sm:text-xl` và `truncate` an toàn để `228.500.000 đ` và `82.271.390 đ` nằm gọn trong thẻ.
