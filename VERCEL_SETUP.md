# Vercel Deployment Guide for FERAL

## Project Structure
Your project is now configured for Vercel deployment with:

### Frontend
- **Framework**: Vite + React
- **Build Output**: `dist/` directory
- **Pages**: All routes fallback to `index.html` for SPA routing

### Backend
- **Format**: Vercel Serverless Functions
- **Location**: `/api/` directory
- **API Routes**:
  - `/api/health` - Health check
  - `/api/products` - GET/POST all products
  - `/api/products/[id]` - GET/PUT/DELETE specific product
  - `/api/users/register` - User registration
  - `/api/users/login` - User login
  - `/api/users/[id]` - GET/PUT user by ID
  - `/api/orders` - GET/POST orders
  - `/api/newsletter` - POST to newsletter subscription

## Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

```
DB_HOST=          # Your PostgreSQL host
DB_PORT=          # PostgreSQL port (default 5432)
DB_NAME=          # Database name
DB_USER=          # Database username
DB_PASSWORD=      # Database password
JWT_SECRET=       # Your JWT secret key
NODE_ENV=         # Set to "production"
```

## Deployment Steps

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com/import
   - Select your Git repository
   - Vercel auto-detects the Vite framework

3. **Add Environment Variables**
   - In Vercel Dashboard, go to Project Settings
   - Add all required environment variables (see above)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

## Database Setup

For PostgreSQL hosting options:
- **Supabase** (easiest for Postgres): https://supabase.com
- **Railway.app**: https://railway.app
- **Heroku Postgres**: https://www.heroku.com/postgres
- **AWS RDS**: https://aws.amazon.com/rds/postgresql
- **Azure Database for PostgreSQL**: https://azure.microsoft.com/en-us/products/postgresql

## Local Development

```bash
# Install dependencies (both frontend and backend)
npm install
cd backend && npm install && cd ..

# Set up .env file with your local database credentials
cp .env.example .env

# Run locally
npm run dev
```

## API Usage Examples

### Authentication
```javascript
// Register
fetch('/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password',
    name: 'John'
  })
})

// Login
fetch('/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
})
```

### Products
```javascript
// Get all products
fetch('/api/products')

// Get specific product
fetch('/api/products/1')

// Create product
fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Product Name',
    region: 'Region',
    symbolism: 'Description',
    personality: 'Personality',
    price: 99.99,
    tier: 'premium',
    image: 'image-url'
  })
})
```

## Important Notes

1. **CORS**: All API endpoints support CORS for frontend communication
2. **SSL**: Production database connections use SSL
3. **Database Pool**: Connection pooling is handled via environment variables
4. **Error Handling**: All endpoints return proper HTTP status codes and error messages
5. **Authentication**: Protected endpoints require JWT token in Authorization header

## Troubleshooting

- **Build Fails**: Ensure Node.js 18+ is used
- **Database Connection**: Verify all DB environment variables are set
- **CORS Issues**: Already configured, but check that frontend URL matches
- **API Timeouts**: Increase function timeout in vercel.json if needed

## Next Steps

1. Create a PostgreSQL database
2. Run migrations: `npm run migrate` (locally first)
3. Set environment variables in Vercel
4. Deploy to Vercel
5. Test API endpoints in production
