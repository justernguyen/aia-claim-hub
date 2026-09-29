# Technical Session Reflection: Refine Customer Card Numbers & Compact Header

**Date:** 2026-09-29  
**Session Scope:** Fix data linkage bug causing customer claim count explosion, format financial metrics & CCCD, compact consultant header profile, and deploy.

---

## 1. Problem & Root Cause
- **Claim Linkage Bug**: Legacy mock claims (`U9182390`, `U9283120`...) without a matching policy ID were defaulting to `customerId: 'CUST-001'` in `prepareInitialClaims()`. This caused customer Nguyễn Thị Mai Anh to mistakenly show 13 claims instead of 1.
- **Card Financial Readability**: Long currency strings (`26.000.000 đ`, `224.000.000 đ`) were rendered in faint `text-slate-400` with no explicit total limit indicator. CCCD was an unspaced 12-digit string (`079198002341`), difficult to verify.
- **Header Profile Card Line Break**: On viewports between 1024px and 1280px, the consultant card (`Dương Như Ý`) was squeezed, causing `AIA-VN-8869` to break across lines at the hyphen into `AIA-VN-` / `8869`.

---

## 2. Implemented Changes
- **`src/hooks/useCRMStore.ts`**:
  - Replaced hardcoded fallback `'CUST-001'` in `prepareInitialClaims` with accurate customer lookup by name and CCCD.
  - Added localStorage migration/sanitization on hydration to automatically fix any existing stored state.
- **`src/utils/formatters.ts`**:
  - Added `formatCCCD` to group CCCD into standard 3-digit segments (`079 198 002 341`).
  - Added `formatCompactVND` for clean limit notations (e.g. `250 tr`, `500 tr`).
- **`src/components/CustomerCard.tsx`**:
  - Formatted CCCD and annual premium.
  - Redesigned medical benefit quota into a clear 2-column stats panel with bold text (`text-slate-800`), emerald remaining amount (`text-emerald-700`), and explicit max limit indicator (`/ 250 tr`).
  - Filtered claims strictly by customer ID, name, CCCD, and policy IDs.
- **`src/components/Header.tsx`**:
  - Re-styled consultant box: avatar 36px, MDRT badge in gold/amber (`bg-amber-50 text-amber-800 border-amber-300`), and non-breaking hyphens (`\u2011`) preventing any split of `AIA-VN-8869`.
- **`src/components/CustomerTableView.tsx` & `src/components/CustomerDetailDrawer.tsx`**:
  - Updated CCCD formatting and claims filtering logic to ensure 100% consistency across views.

---

## 3. Verification & Deployment
- `npm run build`: Zero errors, production bundle built in ~720ms.
- Headless browser verification: Customer Card and Table View screenshots confirmed correct claim counts (Mai Anh: 1 ca), readable numbers, and single-line consultant header.
- Pushed commit `c98d84f` to `origin main` to trigger automated Vercel production deployment.
