# Technical Session Reflection: Fix Numeric Typography & UI Readability

**Date:** 2026-09-29  
**Session Scope:** Fix UI issue where numerical figures (financial metrics, policy quotas, CCCD, phone numbers) were difficult to read due to monospace font fallback on Windows and non-standard currency abbreviations.

---

## 1. Problem & Root Cause Analysis
- **Monospace Font Fallback**: The project only loaded `Inter` via Google Fonts. When components used Tailwind's `font-mono` on numbers, Windows browsers fell back to `Consolas` or `Courier New`. This resulted in thin strokes, uneven character kerning, wide spacing around thousand dots (`.`), and distorted diacritic/currency glyphs (`đ`).
- **Zero Clutter & Unit Duplication**:
  - `formatShortCurrency` rendered awkward combinations such as `311.8 tr đ` (both "tr" and "đ" duplicated, and dot `.` instead of Vietnamese comma `,`).
  - Currency symbols were rendered as lower-case `đ` with inconsistent visual weight and spacing.

---

## 2. Changes Implemented
1. **`src/index.css`**:
   - Added `.font-numeric` utility leveraging `Inter` with OpenType tabular figures (`font-variant-numeric: tabular-nums; font-feature-settings: 'tnum' 1, 'cv05' 1; letter-spacing: -0.01em;`).
   - Configured `.font-mono` fallback to inherit `Inter` tabular figures to protect any untransformed inputs from degrading into Windows `Consolas`.
2. **`src/utils/formatters.ts`**:
   - `formatCurrencyVND`: Now outputs the official Vietnamese Dong currency symbol `₫` (`\u20AB`) with proper non-breaking space.
   - `formatShortCurrency`: Formats numbers using standard Vietnamese financial units (`154,8 triệu`, `1,2 tỷ`) with comma decimal separators, eliminating the clumsy `tr đ` notation.
   - `formatCompactVND`: Clean compact representations (`250 tr`, `1,2 tỷ`, `0 ₫`).
   - `formatPhone`: Added standard 4-3-3 phone grouping (`0912 345 678`).
3. **Components Refactored to `.font-numeric`**:
   - `src/components/CustomerCard.tsx`: Formatted phone, CCCD, policy annual premium (separated value and unit `₫/năm`), and medical card quotas.
   - `src/components/CustomerTableView.tsx`: Applied `.font-numeric` to CCCD, phone, policy IDs, and annual premiums.
   - `src/components/CustomerManagementView.tsx`: Top KPI strip metrics now render cleanly in `font-numeric`.
   - `src/components/MetricsOverview.tsx`: Claim metrics and approval rate render with Vietnamese shorthand (`311,8 triệu`, `82,3 triệu`, `21% duyệt`).
   - `src/components/ClaimTableView.tsx` & `src/components/ClaimKanbanView.tsx`: Formatted claim IDs, claimed and approved amounts.
   - `src/components/AnalyticsDashboardView.tsx`, `PolicyStatusDistribution.tsx`, `ClaimSettlementAnalytics.tsx`, and `BenefitUtilizationReport.tsx`: All charts, FYP/RYP figures, and benefit tables upgraded to `.font-numeric`.
   - `src/components/ClaimDetailDrawer.tsx` & `CustomerDetailDrawer.tsx`: Upgraded all drawer financial details, benefit limit tables, and account numbers.

---

## 3. Verification & Evidence
- **Build Verification**: `npm run build` completed with 0 errors in ~739ms.
- **Headless Browser Visual Inspection**:
  - Captured screenshots across Customer Cards, Customer Detail Drawer, Claims Management, and Analytics Dashboard.
  - Verified clear, solid, high-contrast tabular numbers across all views.
