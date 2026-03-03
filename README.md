# Noor Crochets - Full Stack E-Commerce Website

A modern, premium, and aesthetic full-stack e-commerce platform for a handmade crochet brand. Built with React, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB.

![Noor Crochets](https://images.unsplash.com/photo-1580891546656-c2ca1f7c2e32?w=1200&h=400&fit=crop)

## ✨ Features

### Frontend
- 🎨 **Modern Design**: Soft pastel theme with elegant animations
- 🎭 **Framer Motion Animations**: Floating elements, parallax scrolling, smooth transitions
- 📱 **Fully Responsive**: Mobile-first design approach
- 🛒 **Shopping Cart**: Persistent cart with localStorage
- 🔐 **Authentication**: JWT-based user authentication
- 👤 **User Profiles**: Order history and profile management
- ✨ **Custom Orders**: Request custom crochet pieces
- 👑 **Admin Dashboard**: Product, order, and custom order management

### Backend
- 🔒 **Secure Authentication**: JWT tokens with bcrypt password hashing
- 📦 **Product Management**: Full CRUD operations
- 🛍️ **Order Processing**: Complete order lifecycle management
- ✨ **Custom Orders**: Handle custom order requests
- 🎯 **Role-Based Access**: User and Admin roles
- 📊 **RESTful API**: Clean, organized API structure

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - API calls
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noor_crochets
JWT_SECRET=your_secure_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🚀 Getting Started

### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS/Linux
mongod

# Windows
mongod.exe
```

### 2. Run Backend
```bash
cd backend
npm run dev
```

### 3. Run Frontend
```bash
cd frontend
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 👤 Creating an Admin User

1. Register a normal user through the UI
2. Connect to MongoDB and update the user role:

```javascript
// MongoDB Shell
use noor_crochets
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📁 Project Structure

```
noor_crochets/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── uploads/         # File uploads
│   ├── .env.example     # Environment variables template
│   ├── package.json
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── context/     # React Context (Auth, Cart)
    │   ├── pages/       # Page components
    │   ├── utils/       # Utility functions
    │   ├── App.jsx      # Main app component
    │   ├── main.jsx     # Entry point
    │   └── index.css    # Global styles
    ├── .env.example
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🎨 Design Features

### Color Palette
- **Cream** (#FFF8F0) - Background
- **Beige** (#F5E6D3) - Secondary background
- **Blush Pink** (#FFD1DC) - Accents
- **Sage Green** (#C8D5B9) - Accents
- **Lavender** (#E6E6FA) - Accents
- **Gold** (#D4AF37) - Primary CTA
- **Dark Brown** (#4A4238) - Text

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Animations
- Floating elements
- Parallax scrolling
- Smooth page transitions
- Button ripple effects
- Hover micro-interactions
- Scroll-triggered animations

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/categories/all` - Get categories

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update to paid (Protected)
- `PUT /api/orders/:id/status` - Update status (Admin)

### Custom Orders
- `POST /api/custom-orders` - Create custom order (Protected)
- `GET /api/custom-orders` - Get all (Admin)
- `GET /api/custom-orders/my-orders` - Get user's orders (Protected)
- `GET /api/custom-orders/:id` - Get by ID (Protected)
- `PUT /api/custom-orders/:id` - Update (Admin)
- `DELETE /api/custom-orders/:id` - Delete (Protected)

## 🎯 Key Features Walkthrough

### For Customers
1. **Browse Products**: Filter by category, search, and sort
2. **Product Details**: View images, description, colors, sizes
3. **Shopping Cart**: Add items, update quantities, view total
4. **Checkout**: Complete purchase with shipping details
5. **Custom Orders**: Request personalized crochet pieces
6. **Profile**: View order history and update information

### For Admins
1. **Dashboard**: View statistics and recent activity
2. **Product Management**: Add, edit, delete products
3. **Order Management**: Update order status and tracking
4. **Custom Orders**: Review and respond to custom requests

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Role-based access control
- Input validation
- Secure HTTP headers

## 🚢 Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables
2. Deploy from GitHub
3. Ensure MongoDB connection

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables
4. Configure redirects for SPA

## 📝 License

This project is created for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, reach out to hello@noorcrochets.com

---

Made with 💛 by Noor Crochets
