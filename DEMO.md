# SUSPENDED — Storefront Demo Guide

This guide will help you navigate the Phase 1 build of the SUSPENDED e-commerce platform. The database comes pre-seeded with realistic data to immediately showcase the platform's capabilities.

## 🔑 Demo Credentials

After running `npm run db:seed`, the following accounts are available for testing:

**Admin Account** (Has access to `/admin` dashboard):
- **Email:** `admin@suspended.store`
- **Password:** `admin123`
- **Role:** OWNER

**Customer Account** (Standard shopper):
- **Email:** `john@example.com`
- **Password:** `customer123`
- **Role:** CUSTOMER

## 🚶‍♂️ Walkthrough Script (5 Minutes)

Follow this order to see all the major functionality currently built in Phase 1:

### 1. Storefront Experience (Public)
1. **Navigate to `http://localhost:3000`**
   - Notice the bold, streetwear-inspired aesthetic (dark mode by default).
   - See the sticky header with the announcement bar.
   - Hover over the "Shop" link in the header to view the mega-menu dropdown.
2. **Scroll the Homepage**
   - Check out the hero section and CTA buttons.
   - See the "Trust Badges" (Free Shipping, Easy Returns, etc.).
   - View the "Shop by Category" grid.
   - Check the "Bestsellers" section to see product cards with hover effects, rating stars, and sale/new badges.
   - Scroll down to the "Our Philosophy" brand story strip and the customer testimonials.
3. **Footer**
   - Notice the structured links, newsletter signup, and contact info at the bottom.

### 2. Authentication & Admin Panel
1. **Navigate to `/admin` (`http://localhost:3000/admin`)**
   - You will be intercepted by the middleware and redirected to the `/login` page because the route is protected.
   - *Note: In Phase 1, the login page UI is not fully built out, but the NextAuth integration is active.*
2. **Admin Dashboard Preview**
   - Once logged in with the Admin credentials (or by bypassing the middleware locally if testing UI components directly), you will see the Admin Layout.
   - Notice the left sidebar with categorized navigation (Overview, Sales, Catalog, Customers, Content, Configuration).
   - Collapse and expand the sidebar using the chevron icon.
   - View the top stat cards (Revenue, Orders, Customers, AOV).
   - See the "Recent Orders" table showing the seeded demo orders with status badges.
   - Check the "Low Stock Alerts" panel on the right.

### 3. Mobile Responsiveness
1. **Resize your browser to mobile width (or open dev tools device toolbar)**
   - See how the homepage grid stacks nicely.
   - Click the hamburger menu icon in the header to open the slide-out mobile navigation drawer.
   - In the admin panel, notice how the sidebar disappears and can be toggled via the hamburger menu in the top bar.

---
*End of Phase 1 Demo. Phase 2 will introduce the core catalog features (PLP, PDP, filters, and search).*
