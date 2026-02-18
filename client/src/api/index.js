
import axios from 'axios';
import { products, categories } from '../data/mockData';

// Mock API Implementation
// We are bypassing the backend entirely as requested by the user.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth APIs (Mock)
export const login = async (email, password) => {
  await delay(500);
  // Extract name from email (e.g., john@example.com -> John)
  const nameFromEmail = email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'User';
  
  return {
    data: {
      user: {
        _id: 'mock-user-id-' + Date.now(),
        name: nameFromEmail,
        email: email,
        isAdmin: false
      },
      token: 'mock-jwt-token-' + Date.now()
    }
  };
};

export const register = async (name, email, password) => {
  await delay(500);
  return {
    data: {
      user: {
        _id: 'mock-user-id',
        name: name,
        email: email,
        isAdmin: false
      },
      token: 'mock-jwt-token'
    }
  };
};

export const getUserProfile = async () => {
  await delay(300);
  return {
    data: {
      user: {
        _id: 'mock-user-id',
        name: 'Demo User',
        email: 'demo@example.com',
        isAdmin: false
      }
    }
  };
};

export const updateProfile = async (userData) => {
  await delay(500);
  return {
    data: {
      user: {
        _id: 'mock-user-id',
        name: userData.name || 'Demo User',
        email: userData.email || 'demo@example.com',
        isAdmin: false
      }
    }
  };
};

// Product APIs (Mock)
export const getProducts = async (params = {}) => {
  await delay(300);
  let filteredProducts = [...products];

  // Filter by keyword
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.brand.toLowerCase().includes(keyword)
    );
  }

  // Filter by category
  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category === params.category || p.subCategory === params.category);
  }

  // Filter by rating
  if (params.rating) {
    filteredProducts = filteredProducts.filter(p => (p.rating || 0) >= Number(params.rating));
  }

  // Filter by price
  if (params.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= Number(params.minPrice));
  }

  if (params.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= Number(params.maxPrice));
  }

  // Sorting
  if (params.sort) {
    if (params.sort === 'price-asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }

  // Pagination (Basic mock)
  const page = Number(params.page) || 1;
  const limit = 12; // Adjusted for better grid view
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    data: {
      products: paginatedProducts,
      page,
      pages: Math.ceil(filteredProducts.length / limit),
      total: filteredProducts.length
    }
  };
};

export const getFeaturedProducts = async () => {
  await delay(300);
  const featured = products.filter(p => p.isFeatured).slice(0, 8);
  return {
    data: {
      products: featured
    }
  };
};

export const getProduct = async (id) => {
  await delay(300);
  const rawProduct = products.find(p => String(p._id) === String(id));
  if (!rawProduct) {
    throw new Error(`Product not found with id: ${id}`);
  }

  // Populate category for the frontend
  const category = categories.find(c => c.slug === rawProduct.category) || { name: rawProduct.category, slug: rawProduct.category };

  return {
    data: {
      product: {
        ...rawProduct,
        category: category
      }
    }
  };
};

export const getCategories = async () => {
  await delay(200);
  return {
    data: {
      categories: categories
    }
  };
};

// Cart APIs (Mock - LocalStorage)
export const getCart = async () => {
  await delay(200);
  const cart = JSON.parse(localStorage.getItem('mockCart')) || { products: [] };
  return { data: { cart } };
};

export const addToCart = async ({ productId, quantity }) => {
  await delay(300);
  let cart = JSON.parse(localStorage.getItem('mockCart')) || { products: [] };
  const existingItemIndex = cart.products.findIndex(item => item.product._id === productId);

  const product = products.find(p => p._id === productId);

  if (existingItemIndex > -1) {
    cart.products[existingItemIndex].quantity += quantity;
  } else {
    cart.products.push({ product, quantity }); // Embed full product for simplicity
  }

  localStorage.setItem('mockCart', JSON.stringify(cart));
  return { data: { cart } };
};

export const updateCartItem = async (productId, { quantity }) => {
  await delay(300);
  let cart = JSON.parse(localStorage.getItem('mockCart')) || { products: [] };
  const itemIndex = cart.products.findIndex(item => item.product._id === productId);

  if (itemIndex > -1) {
    cart.products[itemIndex].quantity = quantity;
    localStorage.setItem('mockCart', JSON.stringify(cart));
  }

  return { data: { cart } };
};

export const removeFromCart = async (productId) => {
  await delay(300);
  let cart = JSON.parse(localStorage.getItem('mockCart')) || { products: [] };
  cart.products = cart.products.filter(item => item.product._id !== productId);
  localStorage.setItem('mockCart', JSON.stringify(cart));
  return { data: { cart } };
};

export const clearCart = async () => {
  await delay(200);
  localStorage.removeItem('mockCart');
  return { data: { message: 'Cart cleared' } };
};

// Order APIs (Mock)
export const createOrder = async (orderData) => {
  await delay(800);
  // In a real app we would save this to DB
  return {
    data: {
      success: true,
      order: { _id: 'mock-order-id-' + Date.now(), ...orderData }
    }
  };
};

export const getOrders = async () => {
  await delay(500);
  return { data: { orders: [] } };
};

export const getOrder = async (id) => {
  await delay(300);
  return { data: { _id: id, totalAmount: 100, status: 'Processing' } };
};


// Review APIs (Mock)
export const getProductReviews = async (productId) => {
  await delay(300);
  return { data: { reviews: [] } };
};

export const createReview = async (productId, reviewData) => {
  await delay(500);
  return { data: { success: true } };
};

const api = axios.create(); // Create dummy axios instance if needed elsewhere
export default api;

// Payment APIs
export const getRazorpayKey = async () => {
  await delay(200);
  return {
    data: {
      key_id: 'rzp_test_key' // In production, fetch from backend
    }
  };
};

export const createRazorpayOrder = async (orderId, amount) => {
  await delay(500);
  return {
    data: {
      success: true,
      order: {
        id: 'order_' + Date.now(),
        amount: amount * 100,
        currency: 'INR'
      }
    }
  };
};

export const verifyRazorpayPayment = async (paymentData) => {
  await delay(500);
  return {
    data: {
      success: true,
      message: 'Payment verified'
    }
  };
};
