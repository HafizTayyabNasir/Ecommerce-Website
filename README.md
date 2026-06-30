# SUSPENDED — Premium Streetwear E-Commerce Platform

A production-grade, full-stack e-commerce web application modeled after high-end streetwear and athleisure brands. Built with a modern Next.js stack for performance, scalability, and an exceptional user experience.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** NextAuth.js (Auth.js) v5 (Credentials + Google OAuth)
- **Payments:** Stripe (to be implemented in Phase 3)
- **State Management:** Zustand (Client) + TanStack Query
- **Forms:** React Hook Form + Zod

## Features Included in Phase 1

- **Project Scaffold:** Complete Next.js + TS + Tailwind setup.
- **Data Model:** Comprehensive Prisma schema for Users, Products, Variants, Orders, Cart, Reviews, etc.
- **Base Layout:** Storefront header with mega-menu, responsive footer, and global design tokens.
- **Homepage:** Bold, streetwear-aesthetic landing page with hero banner, featured collections, bestsellers, and testimonials.
- **Admin Dashboard Layout:** Secure admin panel layout with collapsible sidebar and navigation.
- **Admin Dashboard Home:** Statistical overview, recent orders table, and low stock alerts.
- **Seed Script:** Populates the database with realistic demo data (Products, Variants, Customers, Orders, Settings).
- **Authentication:** NextAuth configuration with route protection via middleware (`proxy.ts`).

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Ensure you have a running PostgreSQL instance and update the `DATABASE_URL` appropriately. Or, you can use Prisma's local development database feature:

### 2. Database Setup

Install dependencies if you haven't already:
```bash
npm install
```

Push the schema to your database (or use `npx prisma dev` for local managed Postgres):
```bash
npx prisma db push
# or
npx prisma migrate dev
```

### 3. Seed Demo Data

Run the seed script to populate the database with demo products, users, orders, and configuration:
```bash
npm run db:seed
```

### 4. Run the Development Server

Start the Next.js development server with Turbopack:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the storefront.

## Architecture Notes

- **Storefront & Admin Integration:** Both are served from the same Next.js app (`/app/(storefront)` and `/app/admin`).
- **Middleware Protection:** Admin routes (`/admin/*`) are protected by NextAuth middleware. Only users with roles `SUPPORT`, `MANAGER`, `ADMIN`, or `OWNER` can access them.
- **UI System:** Custom design system based on `shadcn/ui`, adapted for a dark, bold, streetwear aesthetic using standard CSS variables in `globals.css`.
- **Database Scaling:** Prisma client is instantiated as a singleton in `src/lib/db.ts` to prevent connection exhaustion in development.
