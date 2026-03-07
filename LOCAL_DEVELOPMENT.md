# Local Development Setup

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- PostgreSQL 12+ (or use Supabase cloud)
- Git
- A code editor (VSCode recommended)

## Installation & Setup

### 1. **Clone Repository** (if not already done)
```bash
git clone <your-repo-url>
cd FERAL
```

### 2. **Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. **Set Up Environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your local database credentials
# Use an editor: nano .env, code .env, or open in your editor
```

#### Database Options

**Option A: Supabase (Cloud - Easiest)**
1. Go to https://supabase.com
2. Create account
3. New project → wait for setup
4. Settings → Database → Connection string
5. Extract and add to `.env`:

```bash
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-password>
```

**Option B: Local PostgreSQL**
```bash
# macOS with Homebrew
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb feral_db

# Create user
createuser -P feral_user  # Enter password when prompted

# Update .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=feral_db
DB_USER=feral_user
DB_PASSWORD=<password-you-set>
```

**Option C: Docker**
```bash
# Use Docker Compose
docker-compose up -d postgresql

# Get connection details from docker-compose.yml
```

### 4. **Set Up Database Schema**

Run migrations:
```bash
npm run migrate
```

Or manually create tables (see MIGRATIONS.md for full schema).

### 5. **Start Development Servers**

#### Open Terminal 1 - Frontend (Port 5173)
```bash
npm run dev
```

#### Open Terminal 2 - Monitor Backend Files (Port 3000)
```bash
cd backend
npm run dev
```

#### Verify Both Are Running
- **Frontend**: http://localhost:5173
- **API Health**: http://localhost:5173/api/health
- **API Direct**: http://localhost:3000/api/health

---

## Development Tips

### File Structure
```
src/                    # React source
├── main.jsx            # Entry point
├── index.jsx           # Root component
├── index.css           # Global styles
├── lib/
│   └── supabase.js     # Supabase config

components/            # Reusable components
├── Navigation.jsx
├── Footer.jsx
├── ProductCard.jsx
└── ...

pages/                 # Page components
├── HomePage.jsx
├── ClubPage.jsx
├── CollectionPage.jsx
└── AtelierPage.jsx

backend/              # Node.js/Express (reference)
├── server.js         # Main server
├── routes/           # API routes
├── migrations/       # Database migrations
└── package.json
```

### API Development

**Local API URL (Development):**
```javascript
// In React components
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Make requests
const response = await fetch(`${API_URL}/products`);
const data = await response.json();
```

**Available Endpoints:**
```
GET    /api/health                    Health check
GET    /api/products                  Get all products
POST   /api/products                  Create product
GET    /api/products/:id              Get product
PUT    /api/products/:id              Update product
DELETE /api/products/:id              Delete product

POST   /api/users/register            Register user
POST   /api/users/login               Login user
GET    /api/users/:id                 Get user
PUT    /api/users/:id                 Update user

GET    /api/orders                    Get orders
POST   /api/orders                    Create order

POST   /api/newsletter                Subscribe
```

### Testing API Locally

Using `curl`:
```bash
# Health check
curl http://localhost:3000/api/health

# Get products
curl http://localhost:3000/api/products

# Create product (POST)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Shirt",
    "region": "Africa",
    "symbolism": "Strength",
    "personality": "Bold"
    "price": 99.99,
    "tier": "premium",
    "image": "https://example.com/image.jpg"
  }'

# User registration
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

Using Postman or Insomnia:
1. Import collection from [Postman Hub](https://www.postman.com)
2. Set environment variables
3. Test endpoints

### Frontend Development

**Hot Module Reload (HMR):**
Vite automatically reloads when you save files. No manual refresh needed!

**Environment Variables:**
Add to `.env`:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_API_URL=/api
```

Access in JavaScript:
```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const apiUrl = import.meta.env.VITE_API_URL;
```

### Debugging

**View Console Errors:**
```bash
# Browser DevTools - F12 → Console tab

# Vite Terminal - Shows build errors
# Backend Terminal - Shows API errors
```

**Debug API Requests:**
```javascript
// In your React component
const response = await fetch(`${API_URL}/products`);
console.log('API Response:', response);
console.log('Data:', await response.json());
```

**Check Database Connection:**
```bash
# Test with psql (if local PostgreSQL)
psql postgresql://user:password@localhost:5432/feral_db

# Or use Supabase dashboard if cloud
```

---

## Build for Production

### Test Production Build Locally
```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

Then visit: http://localhost:4173

### Verify Build Output
```bash
# Check generated files
ls dist/

# Should see:
# - index.html
# - assets/main-xxxxx.js
# - assets/style-xxxxx.css
```

---

## Database Management

### Backup Local Database
```bash
# PostgreSQL dump
pg_dump postgresql://user:password@localhost:5432/feral_db > backup.sql

# Restore from backup
psql -U user -d feral_db < backup.sql
```

### View Database

**Using psql:**
```bash
psql postgresql://user:password@localhost:5432/feral_db

# List tables
\dt

# View table structure
\d users

# Query data
SELECT * FROM products;

# Exit
\q
```

**Using Supabase Dashboard:**
1. Log in to supabase.com
2. Select your project
3. Click "SQL Editor"
4. Run queries

### Reset Database
```bash
# Drop all tables
npm run migrate  # Or drop and recreate manually
```

---

## Troubleshooting

### ❌ "npm install fails"
```bash
# Clear cache
npm cache clean --force

# Remove lock file
rm package-lock.json

# Reinstall
npm install
```

### ❌ "Cannot connect to database"
```bash
# Check if PostgreSQL is running
# macOS:
brew services list

# Can you connect manually?
psql postgresql://user:password@localhost:5432/db
```

### ❌ "Frontend loads but API returns 404"
- Verify backend server is running: `npm run dev` in backend folder
- Check API URL: http://localhost:3000/api/health
- Check CORS policies in `api/middleware.js`

### ❌ "CORS error from browser"
- Ensure vite.config.js proxy is configured
- Check API_URL matches backend location
- Verify middleware.js has CORS headers

### ❌ "Port 5173 already in use"
```bash
# Use different port
npm run dev -- --port 5174
```

### ❌ ".env file not being read"
- Restart servers after .env changes
- Don't commit .env file (should be in .gitignore)
- Prefix variables with `VITE_` to use in frontend

---

## Useful Commands

```bash
# Install dependencies
npm install

# Frontend dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Backend dev with auto-reload
cd backend && npm run dev

# Database migrations
npm run migrate

# View git status
git status

# Commit changes
git add .
git commit -m "message"

# Push to GitHub
git push origin main
```

---

## VS Code Extensions (Recommended)

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss
- **Prettier** - esbenp.prettier-vscode
- **PostgreSQL** - ms-ossdata.vscode-postgresql
- **Thunder Client** (API testing) - rangav.vscode-thunder-client
- **GitLens** - eamodio.gitlens

---

## Next Steps

1. **Local Development**: Get it running locally first
2. **Test API**: Verify all endpoints work
3. **Prepare for Deploy**: Follow DEPLOYMENT_CHECKLIST.md
4. **Deploy to Vercel**: Push to GitHub and import in Vercel

---

**Happy coding! 🎉**

For Vercel deployment help, see **DEPLOYMENT_CHECKLIST.md**
