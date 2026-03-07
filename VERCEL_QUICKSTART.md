# FERAL - Vercel Deployment Quick Start

## Prerequisites
- Node.js 18+ installed
- GitHub account with your repository
- Vercel account (free)
- PostgreSQL database (Supabase recommended)

## Setup in 5 Minutes

### 1. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 2. Create `.env` File
```bash
cp .env.example .env
```

Then edit `.env` with your database credentials:
```
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database-name  
DB_USER=your-postgres-user
DB_PASSWORD=your-password
JWT_SECRET=any-secure-random-string
NODE_ENV=development
```

### 3. (Optional) Run Locally
```bash
npm run dev
# Frontend: http://localhost:5173
# API: http://localhost:3000/api/*
```

### 4. Push to GitHub
```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### 5. Deploy to Vercel
1. Go to https://vercel.com/import
2. Select your GitHub repository
3. Framework preset: Keep default (Vercel auto-detects Vite)
4. **Important**: Add environment variables:
   - Click "Environment Variables"
   - Add all 6 variables from your `.env` file
5. Click "Deploy"

## After Deployment

### Test Your API
```bash
# Replace VERCEL_URL with your actual Vercel domain
curl https://VERCEL_URL/api/health

# Test products endpoint
curl https://VERCEL_URL/api/products
```

### Update Frontend API URLs
If your frontend calls your backend, update the API base URL:

**In your React components:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Use for API calls
fetch(`${API_URL}/products`)
```

**Add to `.env` file:**
```
VITE_API_URL=/api
```

## Environment Variables Needed

| Variable | Example | Required |
|----------|---------|----------|
| `DB_HOST` | `db.example.com` | ✅ |
| `DB_PORT` | `5432` | ✅ |
| `DB_NAME` | `feral_db` | ✅ |
| `DB_USER` | `postgres` | ✅ |
| `DB_PASSWORD` | `secure-password` | ✅ |
| `JWT_SECRET` | `your-secret-key` | ✅ |
| `NODE_ENV` | `production` | ✅ |

## Common Issues & Solutions

### ❌ Build Fails
- **Solution**: Ensure Node.js 18+ is set in Vercel Project Settings

### ❌ Database Connection Error
- **Solution**: Verify all DB environment variables in Vercel Dashboard
- Make sure your database allows connections from Vercel IPs

### ❌ API Routes Return 404
- **Solution**: Check that `/api` files are in the `/api/` directory structure

### ❌ CORS Errors
- **Solution**: Already configured, should work automatically

## Recommended Postgres Providers

### Supabase (Easiest)
1. Create account at https://supabase.com
2. New project → Get connection string
3. Use in Vercel environment variables

### Railway.app (Free Tier)
1. Create account at https://railway.app
2. New PostgreSQL database
3. Copy environment variables

## File Structure (Vercel Compatible)
```
/
├── api/                    # Serverless functions
│   ├── health.js
│   ├── db.js               # Database connection
│   ├── middleware.js       # CORS & auth helpers
│   ├── products/
│   │   ├── index.js        # GET/POST
│   │   └── [id].js         # GET/PUT/DELETE
│   ├── users/
│   │   ├── register.js
│   │   ├── login.js
│   │   └── [id].js
│   ├── orders/
│   │   └── index.js
│   └── newsletter/
│       └── index.js
├── src/                    # React frontend
├── components/
├── pages/
├── package.json            # Frontend deps
├── vite.config.js
├── vercel.json             # Vercel config
└── .env                    # Local only!
```

## What's Changed

1. ✅ Created `/api` serverless functions
2. ✅ Updated `vercel.json` with proper configuration  
3. ✅ Added Node.js version specification
4. ✅ Configured CORS for all endpoints
5. ✅ Set up proper database connection pooling

## Next: Database Setup

Run migrations (locally first):
```bash
npm run migrate
```

Then deploy the same command on Vercel after first deployment.

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Serverless Functions**: https://vercel.com/docs/concepts/functions/serverless-functions
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Full-Stack Guide**: https://vercel.com/guides/nextjs-nodejs-postgre-sql-database
