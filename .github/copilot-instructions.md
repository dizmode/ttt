# Auto-generated for T-Shirts That Talk (Next.js T-Shirt Store E-Commerce)
# Copilot / Agent Instructions

Purpose
- Help AI coding agents quickly become productive in this T-shirt store e-commerce repository. This is a full-stack Next.js 14 application with custom design tools.

Repository state
- **Project Type**: Next.js 14 (React framework with built-in API routes)
- **Language**: TypeScript with Tailwind CSS
- **Key Files**: `package.json`, `next.config.js`, `src/` (all application code), `public/` (static assets)

How to orient yourself (AI agent checklist)
- Look at `src/app/` for Next.js pages and API routes (file-based routing)
- Check `src/data/products.ts` for product catalog data structure
- Review `src/store/cartStore.ts` for Zustand state management (cart functionality)
- Check `src/components/` for reusable React components with TypeScript types
- API endpoints are in `src/app/api/` (Next.js convention)

Big-picture architecture
- **Frontend**: Next.js 14 App Router (React 18) with server and client components
- **State**: Zustand for cart management (`src/store/cartStore.ts`)
- **Styling**: Tailwind CSS with global styles in `src/globals.css`
- **Data**: In-memory product catalog in `src/data/products.ts`; mock orders in API
- **Key Pages**: 
  - `/` Home with featured products
  - `/products` Product listing with filters
  - `/products/[id]` Product detail page
  - `/cart` Shopping cart with order summary
  - `/custom` Canvas-based design editor for custom prints
- **API Routes**: RESTful endpoints for products, orders, and cart operations

Critical developer workflows
- **Install deps**: `npm install`
- **Run dev server**: `npm run dev` (default: http://localhost:3000)
- **Build for production**: `npm run build && npm run start`
- **Lint code**: `npm run lint`
- **Add product**: Edit `src/data/products.ts`, update `Product[]` array
- **Create new page**: Add `.tsx` file in `src/app/` (Next.js file-based routing auto-creates routes)
- **Add API endpoint**: Create route handler in `src/app/api/` folder

Project-specific conventions
- **Cart State**: Managed with Zustand (`useCartStore` hook) - persists in memory per session
- **Product Types**: Define in `src/types/index.ts` (Product, CartItem, Order, DesignElement)
- **Components**: All client-side interactive components marked with `'use client'` directive
- **API Routes**: Place in `src/app/api/` using Next.js route handlers, return `NextResponse`
- **Styling**: Use Tailwind utility classes; global styles in `src/globals.css`
- **Color System**: Primary = black (`#000`), Secondary = white. Edit `tailwind.config.ts` to change brand colors

Integration points and external dependencies
- **Stripe**: Payment processing ready (import available, not yet integrated in checkout)
- **Fabric.js**: Canvas library available but basic Canvas API used in custom design tool
- **Storage**: No persistent database yet; data lives in memory (products) or localStorage (cart via Zustand)
- **Future Integrations**: Database (PostgreSQL/MongoDB), image hosting (S3 or CDN), payment gateway (Stripe/Square)

When to ask for human help
- Missing or ambiguous build/test commands.
- Unclear runtime environment (OS, required services like Redis/Postgres).

Example prompts an agent can act on now
- "Run test suite and report failing tests" — only if tests exist and a test command is found.
- "Add a small unit test for function X in file Y" — only when file paths and functions are present.

Next steps for maintainers
- Populate the sections marked "Not found" with concrete paths and commands.
- Add a short architecture note at the top (2–5 lines) describing major components and their responsibilities.

Feedback request
- If any section is unclear or incomplete, please update this file or tell the agent where key files live so it can iterate.
