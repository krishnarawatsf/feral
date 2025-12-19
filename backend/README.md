# FERAL Backend - PostgreSQL + Express API

Complete backend infrastructure for the FERAL e-commerce platform.

## Setup Instructions

### 1. Install PostgreSQL

**macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Verify installation:**
```bash
psql --version
```

### 2. Create Database & User

```bash
# Connect to PostgreSQL
psql -U postgres

# In PostgreSQL shell:
CREATE DATABASE feral_db;
CREATE USER feral_user WITH PASSWORD 'your_secure_password';
ALTER ROLE feral_user SET client_encoding TO 'utf8';
ALTER ROLE feral_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE feral_user SET default_transaction_deferrable TO on;
ALTER ROLE feral_user SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE feral_db TO feral_user;
\q
```

### 3. Setup Backend

```bash
cd backend
npm install
```

### 4. Configure Environment

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=feral_db
DB_USER=feral_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 5. Run Database Migrations

```bash
npm run migrate
```

This creates all necessary tables:
- `users` - User accounts & authentication
- `products` - FERAL products (animals)
- `orders` - Customer orders
- `newsletter_subscribers` - Email subscriptions
- `memberships` - Collectors Club tiers

### 6. Start Backend Server

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:user_id` - Get user's orders
- `PUT /api/orders/:id` - Update order status

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers (admin)

## Database Schema

```
users
├── id (PK)
├── email (UNIQUE)
├── password (hashed)
├── name
└── created_at

products
├── id (PK)
├── name
├── region
├── symbolism
├── personality
├── price
├── tier
├── image
└── created_at

orders
├── id (PK)
├── user_id (FK)
├── product_id (FK)
├── quantity
├── total_price
├── status
└── created_at

newsletter_subscribers
├── id (PK)
├── email (UNIQUE)
└── subscribed_at

memberships
├── id (PK)
├── user_id (FK)
├── tier
├── animals_collected
└── created_at
```

## Example Usage

**Register User:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'
```

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Create Order:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"product_id":1,"quantity":1,"total_price":180}'
```

## Next Steps

1. Connect React frontend to API endpoints
2. Add authentication middleware
3. Implement payment processing (Stripe)
4. Add admin dashboard
5. Set up email notifications
