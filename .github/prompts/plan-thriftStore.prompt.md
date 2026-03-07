# Project: ThriftStore E-Commerce

## Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Deployment: Vercel
- Dev environment: Docker

## What we're building
A thrift/streetwear e-commerce store like thriftellc.in with:
- Homepage with hero banner, collections grid, featured products
- Product listing pages by category (Jackets, Jerseys, Shirts, Caps, Bottoms, Accessories)
- Product detail page with size selector and add to cart
- Shopping cart (drawer/sidebar)
- Checkout flow
- Admin panel to manage products

## Supabase Tables
- products (id, name, price, images[], category, sizes[], stock, description)
- orders (id, user_id, items[], total, status, created_at)
- users (handled by Supabase Auth)
- categories (id, name, slug, image_url)

## Conventions
- Use TypeScript
- Use Tailwind for all styling
- Use Supabase client for all DB calls
- Currency: Indian Rupees (₹)
- Always use Next.js App Router patterns (not Pages Router)
- Use Supabase for all database operations — never use local state as a DB
- All prices are in Indian Rupees (₹)
- Products have: name, price, images (array), category, sizes (array), stock count
- Use Tailwind CSS only — no CSS modules or styled-components
- When creating API routes, always use Supabase server client with service role key

## Project Structure
```
my-thrift-store/
├── .github/
│   └── copilot-instructions.md   ← Copilot reads this!
├── app/
│   ├── page.tsx                  ← Homepage (hero + collections + products)
│   ├── collections/[slug]/page.tsx
│   ├── products/[id]/page.tsx
│   ├── cart/page.tsx
│   └── api/
│       ├── products/route.ts
│       └── orders/route.ts
├── components/
│   ├── HeroBanner.tsx
│   ├── CollectionsGrid.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── lib/
│   └── supabase.ts               ← Supabase client setup
├── docker-compose.yml            ← Local dev with Docker
├── .env.local                    ← Supabase keys
└── vercel.json
```
