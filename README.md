# TimeStore - Watch E-Commerce Platform

**Version 2.0.0**

A full-stack e-commerce application for selling watches online with user authentication, product management, shopping cart, and order tracking.

## 🚀 Live Demo & Testing Credentials

**Deployment Link**: https://timestore-2.vercel.app

### Admin Testing Account
- **Email**: admin@gmail.com
- **Password**: admin


## Features

### 🛍️ User Features
- User registration and login with JWT authentication
- Browse and search products
- Filter products by brand, color, gender, type, and price
- View detailed product information
- Add products to cart with stock validation
- Manage shopping cart (add, remove, update quantity)
- Place orders and track order status
- View order history

### 📦 Product Management
- Product catalog with images and descriptions
- Real-time stock tracking
- Stock status indicators (In Stock / Out of Stock)
- Automatic stock reduction when orders are placed
- Stock restoration if orders are cancelled

### 🔐 Admin Features
- Admin dashboard to manage products
- Create, update, and delete products
- Upload product images
- Manage inventory and stock levels
- View and update order statuses
- Monitor all customer orders

### 💅 UI/UX
- Responsive design for all devices
- Mobile-friendly navigation and filters
- Real-time notifications (toast messages)
- Smooth animations and transitions


## Tech Stack

**Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Cloudinary

**Frontend**: React, Redux, Vite, Tailwind CSS, React Router


## Installation & Setup

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=
PORT=8000
```

Start server:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file for development:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```


**Environment Variables:**
- `VITE_API_BASE_URL` - Backend API base URL
  - Development: `http://localhost:8000/api/v1`
  - Production: Set to your deployed backend URL

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```


## API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register new user
- `POST /api/v1/users/login` - Login user
- `POST /api/v1/users/logout` - Logout (protected)
- `GET /api/v1/users/me` - Get current user profile (protected)

### Products
- `GET /api/v1/products` - Get all products with filters and pagination
- `GET /api/v1/products/:id` - Get single product
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/products/filter-options` - Get filter options (brands, genders, colors, types, price range)
- `GET /api/v1/products/suggestions?q=search` - Get search suggestions
- `POST /api/v1/products` - Create product (admin only)
- `PATCH /api/v1/products/:id` - Update product (admin only)
- `DELETE /api/v1/products/:id` - Delete product (admin only)

### Cart
- `GET /api/v1/cart` - Get user cart (protected)
- `POST /api/v1/cart` - Add item to cart (protected)
- `PATCH /api/v1/cart/:productId` - Update cart item (protected)
- `DELETE /api/v1/cart/:productId` - Remove from cart (protected)
- `DELETE /api/v1/cart/clear` - Clear cart (protected)

### Orders
- `POST /api/v1/orders` - Create order (protected)
- `GET /api/v1/orders` - Get user orders (protected)
- `GET /api/v1/orders/:id` - Get order details (protected)
- `GET /api/v1/orders/admin/all` - Get all orders (admin only)
- `PATCH /api/v1/orders/:id` - Update order status (admin only)

## Stock Management

How stock tracking works:
- Products have a stock quantity
- Stock is validated before adding to cart
- Stock decreases when order is placed
- Stock restores if order is cancelled
- UI shows "In Stock" or "Out of Stock"

## Troubleshooting

**Backend won't start?**
- Check MongoDB connection string in .env
- Ensure MongoDB is running
- Verify port 8000 is not in use

**Frontend API errors?**
- Make sure backend is running on port 8000
- Check VITE_API_URL in .env file
- Clear browser cache

**Image upload fails?**
- Verify Cloudinary credentials in .env
- Check file size is under 5MB

---

**TimeStore © 2026** | Version 2.0.0
