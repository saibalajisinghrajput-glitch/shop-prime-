# ShopPrime - Professional E-Commerce Platform

A full-stack Amazon-like e-commerce application built with React, Node.js, Express, and MongoDB.

## Features

### Frontend (React + Tailwind CSS)
- ✅ Responsive design (mobile-first)
- ✅ Amazon-inspired UI with professional look
- ✅ Home page with hero slider and featured products
- ✅ Product listing with filters and sorting
- ✅ Product detail page with image gallery, reviews
- ✅ Shopping cart functionality
- ✅ User authentication (login/register)
- ✅ Checkout process
- ✅ Order history and confirmation

### Backend (Node.js + Express + MongoDB)
- ✅ RESTful API endpoints
- ✅ User authentication with JWT
- ✅ Product management with categories
- ✅ Shopping cart management
- ✅ Order processing
- ✅ Review and rating system

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, React Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS with custom Amazon-like theme

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd shopprime/server
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd shopprime/client
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   
   Edit `shopprime/server/.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/shopprime
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

2. **MongoDB Setup**
   
   - Install MongoDB locally OR
   - Use MongoDB Atlas (cloud) and update MONGODB_URI

### Running the Application

1. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

2. **Seed the Database** (optional - creates sample data)
   ```bash
   cd shopprime/server
   node utils/seeder.js
   ```

3. **Start Backend Server**
   ```bash
   cd shopprime/server
   npm run dev
   ```
   Server runs on http://localhost:5000

4. **Start Frontend Development Server**
   ```bash
   cd shopprime/client
   npm run dev
   ```
   Client runs on http://localhost:5173

### Demo Account
- Email: demo@shopprime.com
- Password: demo123

## Project Structure

```
shopprime/
├── server/                 # Backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions (seeder)
│   ├── index.js           # Server entry point
│   └── package.json
│
├── client/                 # Frontend
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   └── package.json
│
└── README.md
```

## API Endpoints

### Auth
- POST /api/users/register - Register new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- GET /api/products?featured=true - Get featured products

### Categories
- GET /api/categories - Get all categories

### Cart
- GET /api/cart - Get user cart
- POST /api/cart - Add to cart
- PUT /api/cart/:productId - Update cart item
- DELETE /api/cart/:productId - Remove from cart

### Orders
- POST /api/orders - Create new order
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get order details

## Screenshots

The application features:
- Professional Amazon-like header with search
- Hero slider with promotional content
- Product grids with ratings and prices
- Shopping cart with quantity controls
- Checkout with shipping and payment forms
- Order confirmation pages

## License

MIT

