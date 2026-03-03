# Noor Crochets Backend

A Node.js/Express backend for the Noor Crochets e-commerce platform.

## Features

- 🔐 JWT Authentication
- 👤 User Management
- 🛍️ Product Management
- 📦 Order Processing
- ✨ Custom Order Requests
- 🔒 Role-based Access Control (User/Admin)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/noor_crochets
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Make sure MongoDB is running on your system

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products (supports filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/categories/all` - Get all categories

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/myorders` - Get user's orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Custom Orders
- `POST /api/custom-orders` - Create custom order request (Protected)
- `GET /api/custom-orders` - Get all custom orders (Admin only)
- `GET /api/custom-orders/my-orders` - Get user's custom orders (Protected)
- `GET /api/custom-orders/:id` - Get custom order by ID (Protected)
- `PUT /api/custom-orders/:id` - Update custom order (Admin only)
- `DELETE /api/custom-orders/:id` - Delete custom order (Protected)

## Product Categories

- bags
- plushies
- tops
- blankets
- accessories
- wearables
- home

## Order Status Values

- pending
- processing
- shipped
- delivered
- cancelled

## Custom Order Status Values

- pending
- reviewing
- approved
- in-progress
- completed
- rejected

## Creating an Admin User

To create an admin user, first register a normal user, then update the role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Error Handling

The API uses consistent error responses:
```json
{
  "message": "Error message here"
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Role-based access control
- Input validation
