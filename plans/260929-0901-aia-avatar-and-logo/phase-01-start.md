---
title: "Phase 1: Chuẩn Hóa Tài Nguyên Avatar & Logo AIA Vector"
status: todo
---

# Phase 1: Chuẩn Hóa Tài Nguyên Avatar & Logo AIA Vector

## Context Links
- **Ảnh nguồn gốc**: Blob phiên làm việc `~/.omp/agent/blobs/043547c97c0c35be11eb3850de86727a48b0abba5638c0319eac48c8e9b9bd64.webp` (1568x1545 px).
- **Quy chuẩn thương hiệu AIA**: Màu đỏ AIA `#D31145`, biểu tượng Đỉnh núi AIA (Mountain Crest) và Font chữ AIA Wordmark.
- **Tệp đích dự án**:
  - `public/avatar-consultant.png`: Ảnh đại diện vuông 512x512.
  - `public/favicon.svg`: Icon trình duyệt chuẩn vector đỉnh núi AIA.
  - `src/components/AiaLogo.tsx`: Component React vector logo tái sử dụng linh hoạt.

## Overview
- **Độ ưu tiên**: P1
- **Mục tiêu**: Chuẩn bị đầy đủ các tài nguyên hình ảnh chất lượng cao và component vector độc lập trước khi gắn kết vào các màn hình UI.

## Requirements
- **Chân dung Avatar**:
  - Tỷ lệ 1:1, kích thước 512x512 pixel, định dạng PNG sắc nét, nén tối ưu (< 200KB).
  - Cắt cúp tập trung vào chân dung (từ đỉnh tóc tới cổ áo vest, thấy rõ gương mặt, nụ cười và nét tự tin chuyên nghiệp).
- **Logo AIA Vector**:
  - Chuẩn nhận diện tập đoàn AIA: Biểu tượng Đỉnh núi cách điệu (Mountain Crest) kết hợp hoặc tách rời với chữ "AIA".
  - Hỗ trợ các biến thể linh hoạt: `variant: 'full' | 'symbol' | 'wordmark'`, `theme: 'red' | 'white'`, cho phép tuỳ biến `className` chiều cao/chiều rộng.
- **Favicon**:
  - Thay thế biểu tượng tia chớp mặc định của Vite bằng biểu tượng đỉnh núi AIA đỏ sắc nét trên nền trong suốt.

## Architecture & Component Design

```tsx
// src/components/AiaLogo.tsx
interface AiaLogoProps {
  variant?: 'full' | 'symbol' | 'wordmark';
  theme?: 'red' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

## Related Code Files
- **Tạo mới**:
  - `src/components/AiaLogo.tsx`: Component vector SVG chính thức.
  - `public/avatar-consultant.png`: Ảnh đại diện 512x512.
- **Chỉnh sửa**:
  - `public/favicon.svg`: Cập nhật SVG đỉnh núi AIA.
  - `index.html`: Cập nhật thẻ link favicon và tiêu đề trang.

## Implementation Steps
1. Sử dụng script xử lý ảnh PIL để crop ảnh gốc từ tọa độ `(360, 80, 1160, 880)` (kích thước 800x800) và resize xuống `512x512` Lanczos, lưu vào `public/avatar-consultant.png`.
2. Tạo component `src/components/AiaLogo.tsx` chứa path SVG chính xác của Mountain Crest và AIA Wordmark.
3. Cập nhật `public/favicon.svg` chứa path SVG biểu tượng đỉnh núi AIA màu đỏ `#D31145`.
4. Cập nhật `index.html` trỏ `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.

## Todo List
- [x] Trích xuất và tối ưu hóa `public/avatar-consultant.png` đạt chuẩn 512x512.
- [x] Viết component `src/components/AiaLogo.tsx` với đầy đủ các variants và themes.
- [x] Cập nhật `public/favicon.svg` với vector đỉnh núi AIA.
- [x] Cập nhật thẻ `<link rel="icon">` trong `index.html`.

## Success Criteria
- Tệp `public/avatar-consultant.png` tồn tại, dung lượng < 200KB, hiển thị khuôn mặt tư vấn viên rõ nét.
- Component `AiaLogo` biên dịch không lỗi TypeScript, hiển thị đúng tỷ lệ vector khi phóng to/thu nhỏ.
- Favicon tab trình duyệt hiển thị đúng biểu tượng AIA.
