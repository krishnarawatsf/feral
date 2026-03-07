# Database Migrations & Deployment

## Running Migrations

### Local Development
```bash
# Make sure .env is configured with local database
npm run migrate
```

### Production (Vercel)

Since Vercel doesn't support long-running processes, you have two options:

#### Option 1: Run Migrations Locally (Recommended)
```bash
# Install dependencies
npm install

# Set environment variables to production database
export DB_HOST=your-prod-host
export DB_PORT=5432
export DB_NAME=your-prod-db
export DB_USER=your-prod-user
export DB_PASSWORD=your-prod-password

# Run migrations against production
npm run migrate
```

#### Option 2: Cloud Service Integration
- **Prisma Cloud**: Set up automatic migrations on deploy
- **Liquibase**: CI/CD pipeline integration
- **Flyway**: Migration version control

## Database Setup

### Initial Database Schema
Create these tables in your PostgreSQL database:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(255),
  symbolism TEXT,
  personality TEXT,
  price DECIMAL(10, 2),
  tier VARCHAR(50),
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_id ON products(id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
```

## Migration File Structure

The `backend/migrations/run.js` file should contain your migration logic:

```javascript
// backend/migrations/run.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');
    
    // Your migration SQL or files here
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✓ Migrations completed successfully');
  } catch (err) {
    console.error('✗ Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
    await pool.end();
  }
}

runMigrations();
```

## Supabase Setup (Recommended)

### 1. Create Supabase Account
- Go to https://supabase.com
- Create new project
- Wait for database to be ready

### 2. Get Connection String
- Project Settings → Database → Connection string
- Copy the URI format connection string

### 3. Extract Environment Variables
From the connection string `postgresql://user:password@host:port/database`:
```
DB_HOST=host
DB_PORT=port
DB_NAME=database
DB_USER=user
DB_PASSWORD=password
```

### 4. Run Schema Setup
```bash
# Add environment variables
export DB_HOST=...
export DB_PORT=...
etc.

# Run migrations
npm run migrate
```

## Vercel + Supabase

### Automatic Environment Detection
When using Supabase, you can:

1. Create `.env.production.local` with production database
2. Create `.env.development.local` with development database
3. Vercel automatically uses production vars on deploy

### Connection Pooling
Supabase includes PgBouncer connection pooling:
- Use PgBouncer connection string in Vercel
- Contains `?pgbouncer=true` in the URL

```
postgresql://user:password@host:6543/database?pgbouncer=true
```

## Health Check After Deployment

```bash
# Check if database is connected
curl https://your-vercel-app.vercel.app/api/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-03-07T...",
  "environment": "production"
}
```

## Rollback Strategy

### If Something Goes Wrong
1. **Vercel**: Previous deployments are always available
   - Go to Deployments tab
   - Promote a previous production deployment

2. **Database**: Restore from backup
   - Supabase: Automatic backups
   - Manual backup command:
   ```bash
   pg_dump postgresql://... > backup.sql
   ```

## Monitoring

### Check Vercel Logs
```bash
# View real-time logs
vercel logs --tail
```

### Check Database Connection
```bash
# From command line
psql postgresql://user:pass@host:port/db

# Test connection from API
curl https://your-app.vercel.app/api/health
```

## Production Best Practices

✅ **Do:**
- Keep backups of production database
- Test migrations on staging first
- Use connection pooling (PgBouncer)
- Monitor database connections
- Use SSL for database connections
- Store JWT_SECRET securely

❌ **Don't:**
- Run migrations during peak traffic
- Disable SSL in production
- Expose database credentials in code
- Leave default passwords
- Skip environment variable setup

## Troubleshooting

### Migration Failed on Deploy
- Verify all DB environment variables are set
- Check database is accessible from Vercel servers
- Run migration locally first to test

### Connection Timeout
- Increase timeout in connection string
- Check database firewall settings
- Verify correct host/port

### Out of Connections
- Enable connection pooling (PgBouncer)
- Check for connection leaks
- Reduce max_connections if needed
