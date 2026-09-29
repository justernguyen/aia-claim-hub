# Technical Session Reflection: Mobile Responsive Overhaul (375px Viewport)

**Date:** 2026-09-29  
**Plan:** `plans/260929-1015-mobile-responsive-overhaul/plan.md`  
**Commit:** `f556741` (`main`)

---

## 1. Root Cause Analysis (Mobile 375x812 Inspection)
- **Horizontal Scroll Overflow (`543px` vs `375px`)**: `Header.tsx` top bar had `whitespace-nowrap` on the full title `AIA Agent CRM & Claim Hub` next to the full-size `AiaLogo`, pushing the mobile avatar and `+ Thêm mới` button off-screen.
- **Cut-off Navigation Tabs**: 2 out of 4 main navigation tabs (`Lịch chăm sóc & Sự kiện`, `Thống kê & Báo cáo`) were hidden off-screen to the right on mobile.
- **CustomerCard Status Pill Squash**: On `CustomerCard.tsx`, the `Đang hiệu lực` badge lacked `whitespace-nowrap shrink-0`, causing it to wrap vertically into a 3-line circle on 375px screens.
- **KPI Metric Collision**: In 2-column mobile grids (`~165px` per card), `228.500.000 đ` collided with the `w-11 h-11` decorative icon in `CustomerManagementView.tsx` and overflowed card boundaries in `AnalyticsDashboardView.tsx`.
- **Drawer Clipping**: `CustomerDetailDrawer.tsx` and `ClaimDetailDrawer.tsx` had `pl-4`/`pl-10` offsets on mobile, and a `whitespace-nowrap` premium summary row that pushed the `X` close button off the right edge of the viewport.

---

## 2. Fixes Implemented
- **`src/components/Header.tsx` & `src/components/AiaLogo.tsx`**:
  - Scaled `AiaLogo` `md` size to `h-6 sm:h-9` and displayed `CRM & Claim` beside the AIA logo on mobile (`sm:hidden`), reducing `scrollWidth` from `543px` to an exact `375px`.
  - Converted the 4 main navigation tabs into a balanced `grid-cols-2 sm:flex` layout on mobile so all 4 modules are immediately visible.
- **`src/components/CustomerCard.tsx`**:
  - Added `min-w-0 flex-1` to customer name/occupation container and `whitespace-nowrap shrink-0` to the policy status pill.
- **`src/components/CustomerManagementView.tsx` & `src/components/AnalyticsDashboardView.tsx`**:
  - Responsive font sizing (`text-sm sm:text-xl`) and `hidden sm:flex` on decorative KPI icons so currency figures have full card width on mobile.
- **`src/components/CustomerDetailDrawer.tsx` & `src/components/ClaimDetailDrawer.tsx`**:
  - Full-width mobile drawer (`pl-0 sm:pl-10`), flexible header wrapping (`flex-wrap`) preserving the `X` close button, and a `grid-cols-2 sm:flex` sub-tab bar showing all 4 tabs simultaneously.

---

## 3. Verification & Deployment
- Headless browser at `375x812`: Confirmed `{"scrollWidth":375,"clientWidth":375}` and captured visual proof across all tabs, cards, and drawers.
- `npm run build` succeeded in 662ms with 0 errors.
- Pushed `f556741` to `origin main` for automatic Vercel production deployment.
