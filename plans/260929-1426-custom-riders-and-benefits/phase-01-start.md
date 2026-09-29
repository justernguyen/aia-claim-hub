---
title: "Phase 1: Domain & Preset Catalogs"
status: todo
---

# Phase 1: Domain & Preset Catalogs

## Overview

Xây dựng nền tảng dữ liệu và danh mục chuẩn (catalog presets) cho các sản phẩm bổ trợ (Riders) của AIA, đảm bảo tương thích 100% với kiểu dữ liệu `BenefitQuota` và hệ thống 11 loại quyền lợi Claim hiện có trong CRM.

## Requirements

- [x] Định nghĩa danh mục mẫu các Sản phẩm bổ trợ (Rider Presets) phổ biến của AIA Việt Nam
- [x] Chuẩn hóa ánh xạ giữa từng Rider Preset với `ClaimType` tương ứng để phục vụ khấu trừ tự động khi bồi thường
- [x] Thiết lập kiểu dữ liệu biểu diễn sản phẩm bổ trợ trong form tạo hợp đồng (`RiderConfigItem`)
- [x] Đảm bảo chuyển đổi thông suốt sang mảng `BenefitQuota[]` của `Policy`

## Architecture & Data Schema

### 1. Danh mục Rider Presets chuẩn AIA
```typescript
export interface AIAProductPreset {
  id: string;
  name: string;
  category: 'main' | 'rider';
}

export interface RiderPreset {
  id: string;
  name: string;
  claimType: ClaimType;
  defaultLimit: number;
  unit: 'VND' | 'days';
  defaultEnabled: boolean;
  categoryBadge: string;
  limitPresets?: number[]; // Các mốc gợi ý nhanh
  description: string;
}
```

Các gói mẫu:
1. **Thẻ Chăm sóc Sức khỏe Toàn cầu (Nội trú)**: `claimType: 'medical_expense'`, mốc 150tr, 250tr, 500tr, 1 tỷ VND.
2. **Bảo hiểm Bệnh hiểm nghèo Toàn diện (3 giai đoạn)**: `claimType: 'critical_illness'`, mặc định 300tr VND, mốc 200tr, 300tr, 500tr, 1 tỷ.
3. **Bảo hiểm Tai nạn Toàn diện**: `claimType: 'accident_injury'`, mặc định 500tr VND, mốc 200tr, 500tr, 1 tỷ.
4. **Trợ cấp Nằm viện Tiêu chuẩn**: `claimType: 'hospital_cash'`, mặc định 30tr VND (tương đương 500.000đ/ngày x 60 ngày).
5. **Bảo hiểm Miễn đóng phí khi mắc Bệnh hiểm nghèo**: `claimType: 'critical_illness'`, bảo vệ duy trì hiệu lực hợp đồng.

### 2. Định dạng Form State cho Sản phẩm bổ trợ
```typescript
export interface ActiveRiderState {
  id: string;
  presetId?: string;
  name: string;
  claimType: ClaimType;
  limitStr: string;
  unit: 'VND' | 'days';
  enabled: boolean;
  isCustom?: boolean;
}
```

## Related Code Files

- `src/types/crm.ts`: Bổ sung kiểu `RiderPreset`, `AIA_RIDER_PRESETS`
- `src/types/claim.ts`: Rà soát các `ClaimType` tương ứng

## Implementation Steps

1. Khởi tạo danh mục `AIA_RIDER_PRESETS` trong `src/types/crm.ts` với đầy đủ tên thương mại AIA, claim type, hạn mức mặc định và danh sách hạn mức gợi ý.
2. Cung cấp hàm chuyển đổi tiện ích từ `ActiveRiderState[]` sang `BenefitQuota[]` chuẩn.
3. Kiểm tra tính tương thích ngược với các HĐ hiện tại đang có `benefits` mẫu.

## Todo

- [x] Tạo danh mục `AIA_RIDER_PRESETS` trong `src/types/crm.ts`
- [x] Bổ sung hàm tiện ích `convertRidersToBenefits`
- [x] Kiểm tra tính toàn vẹn kiểu TypeScript với `ClaimType`
- [x] Kiểm tra mapping claim types hiện có không bị xung đột

## Success Criteria

- Mã nguồn biên dịch không lỗi TypeScript.
- Danh mục `AIA_RIDER_PRESETS` có tối thiểu 5 gói bổ trợ thông dụng và hàm helper sinh mảng `BenefitQuota[]` sẵn sàng để `NewCustomerModal` tái sử dụng.
