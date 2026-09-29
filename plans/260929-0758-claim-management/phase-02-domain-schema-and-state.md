---
title: "Phase 2: Domain Schema & State Management"
status: done
---

# Phase 2: Domain Schema & State Management

## Overview
Định nghĩa hệ thống kiểu dữ liệu TypeScript cho toàn bộ nghiệp vụ giải quyết quyền lợi bảo hiểm AIA, xây dựng bộ dữ liệu mẫu (mock data) thực tế và thiết lập tầng lưu trữ cục bộ (LocalStorage) kèm khả năng đồng bộ trạng thái, xuất/nhập file.

## Requirements
- [x] Schema `ClaimStatus`: `intake` (Tiếp nhận), `pending_docs` (Cần bổ sung chứng từ), `underwriting` (AIA đang thẩm định), `approved` (Đã duyệt chi trả), `paid` (Đã chuyển khoản), `rejected` (Từ chối).
- [x] Schema `ClaimType`: Trợ cấp nằm viện, Chi phí phẫu thuật, Điều trị nội trú/ngoại trú, Bệnh hiểm nghèo, Tai nạn thương tật, Tử vong.
- [x] Schema `ClaimItem`: Mã hồ sơ (VD: `CLM-2026-0081`), Mã số HĐBH AIA, Tên khách hàng, Số CCCD, Số điện thoại, Tên sản phẩm AIA, Tên bệnh viện, Thời gian nằm viện, Chẩn đoán, Chi tiết tài chính (yêu cầu, duyệt, khấu trừ), Checklist chứng từ, Timeline nhật ký xử lý.
- [x] Bộ dữ liệu mẫu phong phú mang đậm nghiệp vụ AIA Việt Nam do tư vấn viên Dương Như Ý quản lý.
- [x] Hook `useClaims` quản lý state: Tự động lưu và load từ LocalStorage (`aia_claims_storage_nhuy_v1`), hỗ trợ CRUD, bộ lọc đa tiêu chí, tính toán KPI/SLA, và Export/Import JSON/CSV.
