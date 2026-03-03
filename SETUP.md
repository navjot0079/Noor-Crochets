# 🌸 Noor Crochets - Setup Guide

Welcome! Follow these steps to get the project running on your machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud database)
- **npm** (comes with Node.js) or **yarn**

## 🚀 Quick Start (All-in-One)

### Option 1: Run Everything Together

1. **Install all dependencies**:
```bash
npm install
npm run install-all
```

2. **Start MongoDB** (if using local):
```bash
# macOS/Linux
mongod

# Windows
mongod.exe

# Or start MongoDB as a service
```

3. **Set up environment variables**:

Backend `.env` file:
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

Frontend `.env` file:
```bash
cd frontend
cp .env.example .env
# Edit .env if needed (default should work)
```

4. **Run both frontend and backend**:
```bash
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

## 🔧 Manual Setup (Step-by-Step)

### Step 1: Clone or Download

```bash
cd noor_crochets
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noor_crochets
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**Start the backend**:
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

### Step 3: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `frontend/.env` (optional, defaults work):
```env
VITE_API_URL=http://localhost:5000/api
```

**Start the frontend**:
```bash
npm run dev
```

## 📊 MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
Start MongoDB service from Services or run mongod.exe
```

### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/noor_crochets?retryWrites=true&w=majority
```

## 👤 Creating Your First Admin User

1. **Register a user** through the UI:
   - Go to http://localhost:3000/register
   - Create an account

2. **Promote to admin** via MongoDB:

Using MongoDB Compass or Shell:
```javascript
use noor_crochets
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

3. **Log out and log back in** to access admin features

## 📦 Adding Products

### Option 1: Using Admin Dashboard

1. Log in as admin
2. Go to Admin Dashboard
3. Click "Add Product"
4. Fill in product details

### Option 2: Using API

Make a POST request to `/api/products`:
```json
{
  "name": "Crochet Tote Bag",
  "description": "Handmade crochet tote bag with striped pattern",
  "price": 45,
  "category": "bags",
  "images": ["https://example.com/image.jpg"],
  "stock": 10,
  "colors": ["Pink", "Beige"],
  "sizes": ["Medium"],
  "isFeatured": true,
  "isBestSeller": true
}
```

## 🎨 Image Handling

For development, you can use placeholder images:
- Unsplash: https://unsplash.com/
- Placeholder services: https://placeholder.com/

For production:
- Upload images to `backend/uploads/` folder
- Or use a cloud service like Cloudinary

## ✅ Verify Installation

1. **Backend**: Visit http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend**: Visit http://localhost:3000
   - Should see the Noor Crochets homepage

3. **Database**: Check MongoDB connection
   ```bash
   # MongoDB Shell
   mongosh
   use noor_crochets
   show collections
   ```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
# macOS/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using Atlas

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Backend should have CORS enabled
- Check API_URL in frontend `.env`

## 📝 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Instant UI updates
- Backend: Auto-restarts on file changes

### Browser DevTools
- React DevTools for component inspection
- Network tab for API debugging

### MongoDB GUI
Use [MongoDB Compass](https://www.mongodb.com/products/compass) for visual database management

## 🚀 Next Steps

1. **Customize branding** - Update colors, fonts, images
2. **Add products** - Populate your store
3. **Test flows** - Create orders, test cart
4. **Set up payments** - Integrate Stripe/PayPal
5. **Deploy** - Host on Vercel (frontend) and Railway/Render (backend)

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)

## 💡 Need Help?

- Check the main README.md
- Review API documentation in backend/README.md
- Check frontend documentation in frontend/README.md

---

Happy coding! 🧶✨
