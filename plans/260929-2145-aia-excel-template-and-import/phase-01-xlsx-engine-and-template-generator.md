# Phase 1: Engine `xlsx-js-style` & Tiện Ích Xuất Mẫu Excel AIA Chuẩn

## Mục tiêu
Tích hợp engine xử lý file Excel `xlsx-js-style` và xây dựng module tiện ích `src/utils/excelTemplate.ts` chuyên biệt để:
1. Sinh và tải file mẫu Excel `.xlsx` mang phong cách thiết kế AIA (Header màu đỏ thương hiệu `#D31145`, chữ trắng nổi bật, font Calibri, căn chỉnh độ rộng cột tự động, định dạng phân cách hàng nghìn cho tiền tệ, viền bảng rõ nét).
2. Xử lý đọc nhị phân (binary `ArrayBuffer`) cho các file `.xlsx` / `.xls` người dùng tải lên, chuyển đổi sheet thành ma trận dữ liệu 2D (`string[][]`) sẵn sàng cho bộ parser nhận diện.

---

## File tác động
- `package.json`: Thêm dependency `xlsx-js-style`.
- `src/utils/excelTemplate.ts` (Tạo mới): Tiện ích sinh file mẫu & parse file Excel nhị phân.

---

## Các bước thực hiện chi tiết

### 1. Cài đặt thư viện
```bash
npm install xlsx-js-style
```
*Lưu ý*: `xlsx-js-style` tương thích hoàn toàn với API SheetJS chuẩn (`XLSX.utils`, `XLSX.read`, `XLSX.write`) và bổ sung thuộc tính `.s` (cell styles) mà không cần cài thêm dependency phụ.

### 2. Xây dựng module `src/utils/excelTemplate.ts`
- **Khai báo cấu trúc cột chuẩn AIA POS**:
  - `Hợp đồng` (Độ rộng: 16 ký tự)
  - `Tình trạng HĐ` (Độ rộng: 18 ký tự)
  - `Sản phẩm chính` (Độ rộng: 45 ký tự)
  - `Bên mua bảo hiểm` (Độ rộng: 26 ký tự)
  - `Người được bảo hiểm` (Độ rộng: 26 ký tự)
  - `Phí BH định kỳ` (Độ rộng: 20 ký tự, format số `#,##0`)
  - `Định kỳ đóng phí` (Độ rộng: 18 ký tự)
  - `Phân khúc KH` (Độ rộng: 18 ký tự)
  - `Số điện thoại` (Độ rộng: 16 ký tự)
  - `CCCD / CMND` (Độ rộng: 18 ký tự)
  - `Ghi chú` (Độ rộng: 30 ký tự)

- **Định dạng giao diện (Cell Styling)**:
  - Header Row:
    ```typescript
    const headerStyle = {
      fill: { fgColor: { rgb: 'D31145' } }, // AIA Crimson Red
      font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: 'FFFFFF' } },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: {
        top: { style: 'thin', color: { rgb: 'B00E3A' } },
        bottom: { style: 'thin', color: { rgb: 'B00E3A' } },
        left: { style: 'thin', color: { rgb: 'B00E3A' } },
        right: { style: 'thin', color: { rgb: 'B00E3A' } }
      }
    };
    ```
  - Dữ liệu mẫu (Sample Rows):
    - Đưa vào 3-4 dòng mẫu chuẩn hợp đồng AIA thực tế (ví dụ: `U926687581`, `U926599543`, `U926506400`, `U926411239`).
    - Viền mỏng màu xám nhạt (`#E2E8F0`), font chữ 10pt chuẩn, tiền tệ căn phải rõ ràng.
  - Thiết lập thuộc tính `ws['!cols']` để khi mở file bằng Microsoft Excel, các cột không bị che khuất văn bản.

- **Hàm `downloadAiaExcelTemplate()`**:
  - Tạo workbook, gán worksheet với styles và data.
  - Sử dụng `XLSX.writeFile(wb, 'mau_danh_sach_hop_dong_aia_pos.xlsx')` hoặc xuất `Blob` tải về trình duyệt.

- **Hàm `readExcelFileAsMatrix(file: File): Promise<string[][]>`**:
  - Đọc `file` qua `FileReader.readAsArrayBuffer(file)`.
  - Gọi `XLSX.read(data, { type: 'array' })`.
  - Lấy sheet đầu tiên `wb.Sheets[wb.SheetNames[0]]`.
  - Chuyển đổi thành mảng 2 chiều bằng `XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })`.
  - Chuẩn hóa toàn bộ ô thành kiểu chuỗi sạch (trim, chuyển date/number nếu có).

---

## Tiêu chuẩn nghiệm thu Phase 1
- `npm run build` không lỗi TypeScript.
- Gọi thử `downloadAiaExcelTemplate()` tải về file `.xlsx` thật có dung lượng ~5-10KB, mở bằng Excel hiển thị đúng header đỏ AIA `#D31145`, chữ trắng đậm, cột rộng đẹp mắt.
