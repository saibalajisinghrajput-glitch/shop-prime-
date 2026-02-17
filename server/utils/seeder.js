import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Order from './models/Order.js';
import Cart from './models/Cart.js';
import connectDB from './config/database.js';

dotenv.config();

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and electronics' },
  { name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Home appliances and kitchenware' },
  { name: 'Books', slug: 'books', description: 'Books, eBooks, and audiobooks' },
  { name: 'Sports & Outdoors', slug: 'sports-outdoors', description: 'Sports equipment and outdoor gear' },
  { name: 'Beauty & Personal Care', slug: 'beauty', description: 'Beauty and personal care products' },
  { name: 'Toys & Games', slug: 'toys-games', description: 'Toys and games for all ages' },
  { name: 'Automotive', slug: 'automotive', description: 'Car parts and accessories' },
];

const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones Premium Sound',
    description: 'Experience high-quality audio with these premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers and professionals.',
    price: 149.99,
    discountPrice: 99.99,
    category: 'electronics',
    brand: 'SoundMax',
    stock: 50,
    sold: 234,
    ratings: 4.5,
    numOfReviews: 89,
    images: [
      { public_id: 'headphones_1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
      { public_id: 'headphones_2', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
    ],
    features: ['Active Noise Cancellation', '30-hour battery life', 'Bluetooth 5.0', 'Comfortable ear cushions'],
    isFeatured: true,
  },
  {
    name: 'Smart Watch Series X Fitness Tracker',
    description: 'Stay connected and track your fitness with this advanced smart watch. Features heart rate monitoring, GPS, sleep tracking, and water resistance. Compatible with iOS and Android.',
    price: 299.99,
    discountPrice: 249.99,
    category: 'electronics',
    brand: 'TechWear',
    stock: 35,
    sold: 156,
    ratings: 4.7,
    numOfReviews: 67,
    images: [
      { public_id: 'watch_1', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
    ],
    features: ['Heart rate monitoring', 'GPS tracking', 'Water resistant 50m', '7-day battery'],
    isFeatured: true,
  },
  {
    name: '4K Ultra HD Smart TV 55 Inch',
    description: 'Transform your viewing experience with this stunning 55-inch 4K Smart TV. Features HDR10+, built-in streaming apps, and voice control. Perfect for movies, gaming, and sports.',
    price: 699.99,
    discountPrice: 549.99,
    category: 'electronics',
    brand: 'VisionTech',
    stock: 20,
    sold: 89,
    ratings: 4.8,
    numOfReviews: 45,
    images: [
      { public_id: 'tv_1', url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
    ],
    features: ['4K Ultra HD', 'HDR10+', 'Smart TV with apps', 'Voice control'],
    isFeatured: true,
  },
  {
    name: 'Portable Bluetooth Speaker Waterproof',
    description: 'Take your music anywhere with this portable waterproof speaker. Features 360-degree sound, 24-hour battery life, and IPX7 water resistance. Perfect for outdoor adventures.',
    price: 79.99,
    discountPrice: 59.99,
    category: 'electronics',
    brand: 'SoundMax',
    stock: 75,
    sold: 312,
    ratings: 4.4,
    numOfReviews: 123,
    images: [
      { public_id: 'speaker_1', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
    ],
    features: ['360-degree sound', '24-hour battery', 'IPX7 waterproof', 'Bluetooth 5.0'],
    isFeatured: false,
  },
  {
    name: 'Gaming Laptop Pro 15.6 inch',
    description: 'Power through games and work with this high-performance gaming laptop. Features RTX graphics, 144Hz display, and RGB keyboard. Built for serious gamers and creators.',
    price: 1299.99,
    discountPrice: 1099.99,
    category: 'electronics',
    brand: 'GameForce',
    stock: 15,
    sold: 67,
    ratings: 4.9,
    numOfReviews: 34,
    images: [
      { public_id: 'laptop_1', url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400' },
    ],
    features: ['RTX 3060 graphics', '144Hz display', 'RGB keyboard', '16GB RAM'],
    isFeatured: true,
  },
  // Clothing
  {
    name: 'Premium Cotton T-Shirt Pack of 3',
    description: 'Upgrade your wardrobe with this pack of premium cotton t-shirts. Soft, breathable, and perfect for everyday wear. Available in multiple colors.',
    price: 39.99,
    discountPrice: 29.99,
    category: 'clothing',
    brand: 'ComfortWear',
    stock: 100,
    sold: 567,
    ratings: 4.3,
    numOfReviews: 234,
    images: [
      { public_id: 'tshirt_1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
    ],
    features: ['100% cotton', 'Soft & breathable', 'Pre-shrunk', 'Machine washable'],
    isFeatured: false,
  },
  {
    name: 'Slim Fit Denim Jeans Classic',
    description: 'Look stylish in these classic slim fit denim jeans. Made with premium quality denim for comfort and durability. Perfect for any casual occasion.',
    price: 69.99,
    discountPrice: 49.99,
    category: 'clothing',
    brand: 'DenimCo',
    stock: 60,
    sold: 234,
    ratings: 4.5,
    numOfReviews: 89,
    images: [
      { public_id: 'jeans_1', url: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400' },
    ],
    features: ['Premium denim', 'Slim fit', 'Classic 5-pocket', 'Machine washable'],
    isFeatured: true,
  },
  {
    name: 'Winter Parka Insulated Jacket',
    description: 'Stay warm in style with this insulated winter parka. Features water-resistant outer shell, warm fleece lining, and multiple pockets. Perfect for cold weather.',
    price: 189.99,
    discountPrice: 149.99,
    category: 'clothing',
    brand: 'ArcticWear',
    stock: 30,
    sold: 123,
    ratings: 4.7,
    numOfReviews: 56,
    images: [
      { public_id: 'jacket_1', url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
    ],
    features: ['Water-resistant', 'Insulated lining', 'Multiple pockets', 'Hooded'],
    isFeatured: true,
  },
  // Home & Kitchen
  {
    name: 'Coffee Maker Programmable 12 Cup',
    description: 'Start your mornings right with this programmable coffee maker. Features auto-brew, keep-warm function, and easy-to-clean design. Makes up to 12 cups.',
    price: 89.99,
    discountPrice: 69.99,
    category: 'home-kitchen',
    brand: 'BrewMaster',
    stock: 45,
    sold: 189,
    ratings: 4.6,
    numOfReviews: 78,
    images: [
      { public_id: 'coffee_1', url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400' },
    ],
    features: ['12 cup capacity', 'Programmable timer', 'Auto shut-off', 'Reusable filter'],
    isFeatured: false,
  },
  {
    name: 'Air Fryer XL 5.8 Quart',
    description: 'Cook healthier meals with this XL air fryer. Uses hot air circulation to fry, bake, and grill with little to no oil. Includes recipe book and accessories.',
    price: 129.99,
    discountPrice: 99.99,
    category: 'home-kitchen',
    brand: 'ChefPro',
    stock: 40,
    sold: 267,
    ratings: 4.8,
    numOfReviews: 145,
    images: [
      { public_id: 'airfryer_1', url: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=400' },
    ],
    features: ['5.8 quart capacity', 'Digital touchpad', '150+ recipes', 'Easy cleanup'],
    isFeatured: true,
  },
  {
    name: 'Vacuum Cleaner Bagless Upright',
    description: 'Keep your home clean with this powerful bagless upright vacuum. Features HEPA filter, pet hair attachment, and large dust cup. Perfect for all floor types.',
    price: 199.99,
    discountPrice: 149.99,
    category: 'home-kitchen',
    brand: 'CleanPro',
    stock: 25,
    sold: 98,
    ratings: 4.5,
    numOfReviews: 67,
    images: [
      { public_id: 'vacuum_1', url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
    ],
    features: ['Bagless design', 'HEPA filter', 'Pet hair tool', 'Multi-surface'],
    isFeatured: false,
  },
  // Beauty
  {
    name: 'Skincare Set Complete Routine',
    description: 'Get glowing skin with this complete skincare set. Includes cleanser, toner, serum, and moisturizer. Made with natural ingredients suitable for all skin types.',
    price: 79.99,
    discountPrice: 59.99,
    category: 'beauty',
    brand: 'GlowNature',
    stock: 55,
    sold: 345,
    ratings: 4.6,
    numOfReviews: 156,
    images: [
      { public_id: 'skincare_1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400' },
    ],
    features: ['4-step routine', 'Natural ingredients', 'All skin types', 'Cruelty-free'],
    isFeatured: true,
  },
  {
    name: 'Hair Dryer Professional Salon Grade',
    description: 'Achieve salon-quality hair at home with this professional hair dryer. Features ionic technology, multiple heat settings, and concentrator attachments.',
    price: 129.99,
    discountPrice: 89.99,
    category: 'beauty',
    brand: 'SalonPro',
    stock: 35,
    sold: 178,
    ratings: 4.7,
    numOfReviews: 89,
    images: [
      { public_id: 'hairdryer_1', url: 'https://images.unsplash.com/photo-1595468506557-5a57dc1b1f4d?w=400' },
    ],
    features: ['Ionic technology', '3 heat settings', 'Concentrator included', 'Cool shot button'],
    isFeatured: false,
  },
  // Sports
  {
    name: 'Yoga Mat Premium Non-Slip',
    description: 'Enhance your yoga practice with this premium non-slip yoga mat. Extra thick for joint protection, eco-friendly material, and carrying strap included.',
    price: 49.99,
    discountPrice: 34.99,
    category: 'sports-outdoors',
    brand: 'ZenFit',
    stock: 80,
    sold: 456,
    ratings: 4.8,
    numOfReviews: 234,
    images: [
      { public_id: 'yoga_1', url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400' },
    ],
    features: ['6mm thick', 'Non-slip surface', 'Eco-friendly', 'Carrying strap'],
    isFeatured: false,
  },
  {
    name: 'Running Shoes Performance',
    description: 'Take your running to the next level with these performance running shoes. Lightweight design, responsive cushioning, and breathable mesh upper.',
    price: 119.99,
    discountPrice: 89.99,
    category: 'sports-outdoors',
    brand: 'RunFast',
    stock: 50,
    sold: 289,
    ratings: 4.6,
    numOfReviews: 123,
    images: [
      { public_id: 'shoes_1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    ],
    features: ['Lightweight', 'Responsive cushioning', 'Breathable mesh', 'Durable outsole'],
    isFeatured: true,
  },
  // Toys
  {
    name: 'Building Blocks Set 500 Pieces',
    description: 'Unleash creativity with this 500-piece building blocks set. Compatible with major brands, includes instruction booklet, and storage box. Great for kids and adults.',
    price: 49.99,
    discountPrice: 39.99,
    category: 'toys-games',
    brand: 'BuildFun',
    stock: 65,
    sold: 234,
    ratings: 4.5,
    numOfReviews: 89,
    images: [
      { public_id: 'blocks_1', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400' },
    ],
    features: ['500 pieces', 'Compatible with major brands', 'Instruction booklet', 'Storage box'],
    isFeatured: false,
  },
  {
    name: 'Board Game Family Fun',
    description: 'Bring the family together with this fun board game. Easy to learn, suitable for all ages, and provides hours of entertainment. Perfect for family game night.',
    price: 29.99,
    discountPrice: 24.99,
    category: 'toys-games',
    brand: 'GameTime',
    stock: 70,
    sold: 178,
    ratings: 4.7,
    numOfReviews: 67,
    images: [
      { public_id: 'boardgame_1', url: 'https://images.unsplash.com/photo-1610890716171-6b1c9f8549ac?w=400' },
    ],
    features: ['2-6 players', 'Ages 6+', '30 min playtime', 'Easy to learn'],
    isFeatured: true,
  },
  // Books
  {
    name: 'Bestselling Novel Collection Box Set',
    description: 'Enjoy this bestselling novel collection box set. Includes 5 award-winning books from acclaimed authors. Perfect for book lovers and collectors.',
    price: 59.99,
    discountPrice: 44.99,
    category: 'books',
    brand: 'PageTurner',
    stock: 40,
    sold: 156,
    ratings: 4.9,
    numOfReviews: 78,
    images: [
      { public_id: 'books_1', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400' },
    ],
    features: ['5 books', 'Bestsellers', 'Collectible box', 'Award-winning'],
    isFeatured: false,
  },
  // Automotive
  {
    name: 'Car Phone Mount Magnetic',
    description: 'Keep your phone secure while driving with this magnetic car phone mount. Strong magnetic hold, 360-degree rotation, and easy installation. Compatible with all phones.',
    price: 24.99,
    discountPrice: 17.99,
    category: 'automotive',
    brand: 'DriveTech',
    stock: 120,
    sold: 567,
    ratings: 4.4,
    numOfReviews: 234,
    images: [
      { public_id: 'mount_1', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400' },
    ],
    features: ['Strong magnetic hold', '360 rotation', 'Easy install', 'Universal fit'],
    isFeatured: false,
  },
  {
    name: 'Car Vacuum Cleaner Portable',
    description: 'Keep your car clean with this portable car vacuum cleaner. Cordless design, powerful suction, and multiple attachments for hard-to-reach areas.',
    price: 49.99,
    discountPrice: 39.99,
    category: 'automotive',
    brand: 'AutoClean',
    stock: 55,
    sold: 234,
    ratings: 4.6,
    numOfReviews: 123,
    images: [
      { public_id: 'carvacuum_1', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400' },
    ],
    features: ['Cordless', 'Powerful suction', 'Multiple attachments', 'Rechargeable'],
    isFeatured: false,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Cart.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Map category names to IDs
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    // Add category IDs to products
    const productsWithCategory = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    // Create products
    const createdProducts = await Product.insertMany(productsWithCategory);
    console.log('Created products');

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@shopprime.com',
      password: 'demo123',
      role: 'user',
    });
    console.log('Created demo user');

    // Create demo cart for user
    await Cart.create({
      user: demoUser._id,
      products: [],
    });
    console.log('Created demo cart');

    console.log('Database seeded successfully!');
    console.log('Demo credentials: demo@shopprime.com / demo123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

