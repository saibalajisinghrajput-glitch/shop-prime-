import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

const categoriesData = [
    { name: 'Electronics', slug: 'electronics', description: 'Gadgets, phones, and more', order: 1 },
    { name: 'Clothing', slug: 'clothing', description: 'Fashion for men, women, and kids', order: 2 },
    { name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Everything for your home', order: 3 },
    { name: 'Beauty & Personal Care', slug: 'beauty', description: 'Makeup, skincare, and more', order: 4 },
    { name: 'Grocery', slug: 'grocery', description: 'Daily essentials and food', order: 5 },
    { name: 'Sports & Fitness', slug: 'sports-fitness', description: 'Gear for your active life', order: 6 },
    { name: 'Books', slug: 'books', description: 'Read and learn', order: 7 },
    { name: 'Toys & Games', slug: 'toys-games', description: 'Fun for all ages', order: 8 },
    { name: 'Automotive', slug: 'automotive', description: 'Car and bike accessories', order: 9 },
    { name: 'Office Supplies', slug: 'office-supplies', description: 'Stationery and office gear', order: 10 },
    { name: 'Health', slug: 'health', description: 'Health and wellness', order: 11 },
    { name: 'Baby Products', slug: 'baby-products', description: 'Care for your little ones', order: 12 },
    { name: 'Accessories', slug: 'accessories', description: 'Watches, bags, and more', order: 13 }
];

const productsData = [
    // --- ELECTRONICS ---
    // Mobiles & Tablets
    {
        name: 'iPhone 15 Pro Max',
        category: 'electronics',
        subCategory: 'Mobiles & Tablets',
        price: 1199.99,
        description: 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.',
        images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800' }],
        brand: 'Apple',
        stock: 50,
        isFeatured: true
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        category: 'electronics',
        subCategory: 'Mobiles & Tablets',
        price: 1299.99,
        description: 'Galaxy AI is here. Epic camera, nightography, and S Pen functionality.',
        images: [{ url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800' }],
        brand: 'Samsung',
        stock: 45,
        isFeatured: true
    },
    {
        name: 'iPad Pro 12.9"',
        category: 'electronics',
        subCategory: 'Mobiles & Tablets',
        price: 1099.99,
        description: 'Supercharged by M2. The ultimate iPad experience with Liquid Retina XDR display.',
        images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' }],
        brand: 'Apple',
        stock: 30
    },
    // Computers
    {
        name: 'MacBook Air M3',
        category: 'electronics',
        subCategory: 'Computers',
        price: 1099.99,
        description: 'Lean. Mean. M3 machine. Strikingly thin and fast with incredible battery life.',
        images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800' }],
        brand: 'Apple',
        stock: 25,
        isFeatured: true
    },
    {
        name: 'Dell XPS 15',
        category: 'electronics',
        subCategory: 'Computers',
        price: 1499.99,
        description: 'High performance laptop with OLED display, perfect for creators.',
        images: [{ url: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800' }],
        brand: 'Dell',
        stock: 20
    },
    {
        name: 'Gaming Monitor 27" 144Hz',
        category: 'electronics',
        subCategory: 'Computers',
        price: 299.99,
        description: 'Smooth gameplay with high refresh rate and 1ms response time.',
        images: [{ url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800' }],
        brand: 'Asus',
        stock: 40
    },
    // Audio
    {
        name: 'Sony WH-1000XM5',
        category: 'electronics',
        subCategory: 'Audio',
        price: 349.99,
        description: 'Industry leading noise cancelling headphones with exceptional sound quality.',
        images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' }],
        brand: 'Sony',
        stock: 60,
        isFeatured: true
    },
    {
        name: 'AirPods Pro 2nd Gen',
        category: 'electronics',
        subCategory: 'Audio',
        price: 249.99,
        description: 'Rich audio. Advanced Active Noise Cancellation. Adaptive Audio.',
        images: [{ url: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800' }],
        brand: 'Apple',
        stock: 100
    },
    {
        name: 'JBL Flip 6 Speaker',
        category: 'electronics',
        subCategory: 'Audio',
        price: 129.99,
        description: 'Bold sound for every adventure. Waterproof and dustproof.',
        images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800' }],
        brand: 'JBL',
        stock: 80
    },
    // TV & Appliances
    {
        name: 'LG OLED C3 55"',
        category: 'electronics',
        subCategory: 'TV & Appliances',
        price: 1499.99,
        description: 'The world\'s #1 OLED TV. Stunning picture quality with perfect black.',
        images: [{ url: 'https://images.unsplash.com/photo-1593784653277-e9a6da83842c?w=800' }],
        brand: 'LG',
        stock: 15
    },
    {
        name: 'Samsung Double Door Refrigerator',
        category: 'electronics',
        subCategory: 'TV & Appliances',
        price: 899.99,
        description: 'Keep food fresh for longer with Twin Cooling Plus technology.',
        images: [{ url: 'https://images.unsplash.com/photo-1571175443880-49e1d58b95da?w=800' }],
        brand: 'Samsung',
        stock: 10
    },
    // Gaming
    {
        name: 'PlayStation 5 Console',
        category: 'electronics',
        subCategory: 'Gaming',
        price: 499.99,
        description: 'Experience lightning fast loading and incredible immersion with haptic feedback.',
        images: [{ url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800' }],
        brand: 'Sony',
        stock: 5,
        isFeatured: true
    },
    {
        name: 'Xbox Wireless Controller',
        category: 'electronics',
        subCategory: 'Gaming',
        price: 59.99,
        description: 'Textured grip, hybrid D-pad, and button mapping for advanced gaming.',
        images: [{ url: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800' }],
        brand: 'Microsoft',
        stock: 50
    },

    // --- CLOTHING ---
    // Men
    {
        name: 'Men\'s Classic Fit T-Shirt',
        category: 'clothing',
        subCategory: 'Men',
        price: 19.99,
        description: 'Soft cotton crew neck t-shirt. Essential for every wardrobe.',
        images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' }],
        brand: 'H&M',
        stock: 200
    },
    {
        name: 'Slim Fit Jeans - Men',
        category: 'clothing',
        subCategory: 'Men',
        price: 49.99,
        description: 'Modern slim fit jeans with a comfortable stretch.',
        images: [{ url: 'https://images.unsplash.com/photo-1542272617-08f08637533d?w=800' }],
        brand: 'Levi\'s',
        stock: 100
    },
    // Women
    {
        name: 'Floral Summer Dress',
        category: 'clothing',
        subCategory: 'Women',
        price: 39.99,
        description: 'Light and airy floral dress, perfect for summer days.',
        images: [{ url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800' }],
        brand: 'Zara',
        stock: 80,
        isFeatured: true
    },
    {
        name: 'Women\'s Yoga Leggings',
        category: 'clothing',
        subCategory: 'Women',
        price: 29.99,
        description: 'High-waisted leggings perfect for yoga and workouts.',
        images: [{ url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=800' }],
        brand: 'Nike',
        stock: 120
    },
    // Kids
    {
        name: 'Kids Graphic Tee',
        category: 'clothing',
        subCategory: 'Kids',
        price: 14.99,
        description: 'Fun graphic t-shirt for boys and girls.',
        images: [{ url: 'https://images.unsplash.com/photo-1519238809107-742f9d38c29e?w=800' }],
        brand: 'Gap Kids',
        stock: 150
    },
    // Footwear
    {
        name: 'Unisex Running Sneakers',
        category: 'clothing',
        subCategory: 'Footwear',
        price: 79.99,
        description: 'Lightweight running shoes for daily comfort.',
        images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' }],
        brand: 'Nike',
        stock: 70
    },

    // --- HOME & KITCHEN ---
    {
        name: 'Non-Stick Cookware Set',
        category: 'home-kitchen',
        subCategory: 'Kitchen',
        price: 129.99,
        description: '10-piece non-stick cookware set including pots and pans.',
        images: [{ url: 'https://images.unsplash.com/photo-1584269619280-5a369dc11e58?w=800' }],
        brand: 'Prestige',
        stock: 30
    },
    {
        name: 'Modern Wall Clock',
        category: 'home-kitchen',
        subCategory: 'Home Decor',
        price: 49.99,
        description: 'Minimalist wall clock to enhance your living room decor.',
        images: [{ url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800' }],
        brand: 'DecorHome',
        stock: 50
    },
    {
        name: 'Ergonomic Office Chair',
        category: 'home-kitchen',
        subCategory: 'Furniture',
        price: 199.99,
        description: 'Comfortable mesh office chair with lumbar support.',
        images: [{ url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800' }],
        brand: 'Herman Miller',
        stock: 15
    },
    {
        name: 'Double Bed Sheet Set',
        category: 'home-kitchen',
        subCategory: 'Home Decor',
        price: 34.99,
        description: 'Soft cotton bed sheets with pillow covers.',
        images: [{ url: 'https://images.unsplash.com/photo-1522771753035-4a50470a3096?w=800' }],
        brand: 'Spaces',
        stock: 60
    },

    // --- BEAUTY ---
    {
        name: 'Hydrating Face Moisturizer',
        category: 'beauty',
        subCategory: 'Skincare',
        price: 24.99,
        description: 'Daily moisturizer with hyaluronic acid for soft skin.',
        images: [{ url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800' }],
        brand: 'CeraVe',
        stock: 100
    },
    {
        name: 'Matte Liquid Lipstick',
        category: 'beauty',
        subCategory: 'Makeup',
        price: 19.99,
        description: 'Long-lasting matte liquid lipstick in vibrant shades.',
        images: [{ url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800' }],
        brand: 'Maybelline',
        stock: 80
    },
    {
        name: 'Philips Hair Dryer',
        category: 'beauty',
        subCategory: 'Hair Care',
        price: 39.99,
        description: 'Powerful hair dryer for quick and easy styling.',
        images: [{ url: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800' }],
        brand: 'Philips',
        stock: 45
    },

    // --- GROCERY ---
    {
        name: 'Premium Basmati Rice 5kg',
        category: 'grocery',
        subCategory: 'Staples',
        price: 15.99,
        description: 'Aromatic long grain basmati rice.',
        images: [{ url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800' }],
        brand: 'India Gate',
        stock: 200
    },
    {
        name: 'Almonds 500g',
        category: 'grocery',
        subCategory: 'Dry Fruits',
        price: 9.99,
        description: 'Premium quality California almonds.',
        images: [{ url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d60?w=800' }],
        brand: 'Happilo',
        stock: 150
    },
    {
        name: 'Dark Chocolate Bar',
        category: 'grocery',
        subCategory: 'Chocolates',
        price: 4.99,
        description: 'Rich dark chocolate with 70% cocoa.',
        images: [{ url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800' }],
        brand: 'Lindt',
        stock: 100
    },

    // --- SPORTS & FITNESS ---
    {
        name: 'Yoga Mat',
        category: 'sports-fitness',
        subCategory: 'Yoga',
        price: 19.99,
        description: 'Non-slip yoga mat for home workouts.',
        images: [{ url: 'https://images.unsplash.com/photo-1592432678010-c591e1e9a9be?w=800' }],
        brand: 'BoldFit',
        stock: 70
    },
    {
        name: 'Adjustable Dumbbells Set',
        category: 'sports-fitness',
        subCategory: 'Fitness',
        price: 199.99,
        description: 'Space-saving adjustable dumbbells for strength training.',
        images: [{ url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800' }],
        brand: 'Bowflex',
        stock: 20
    },
    {
        name: 'Cricket Bat Grade A',
        category: 'sports-fitness',
        subCategory: 'Sports',
        price: 149.99,
        description: 'English willow cricket bat for professional play.',
        images: [{ url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800' }],
        brand: 'SG',
        stock: 30
    },

    // --- BOOKS ---
    {
        name: 'The Psychology of Money',
        category: 'books',
        subCategory: 'Self Help',
        price: 14.99,
        description: 'Timeless lessons on wealth, greed, and happiness.',
        images: [{ url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800' }],
        brand: 'Penguin',
        stock: 100
    },
    {
        name: 'Atomic Habits',
        category: 'books',
        subCategory: 'Self Help',
        price: 16.99,
        description: 'An easy & proven way to build good habits & break bad ones.',
        images: [{ url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800' }],
        brand: 'Penguin',
        stock: 120,
        isFeatured: true
    },

    // --- TOYS & GAMES ---
    {
        name: 'LEGO Classic Bricks',
        category: 'toys-games',
        subCategory: 'Building Blocks',
        price: 34.99,
        description: 'Creative brick box for endless building possibilities.',
        images: [{ url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800' }],
        brand: 'LEGO',
        stock: 60
    },
    {
        name: 'Remote Control Car',
        category: 'toys-games',
        subCategory: 'Remote Control',
        price: 49.99,
        description: 'High speed remote control car for kids.',
        images: [{ url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800' }],
        brand: 'Hot Wheels',
        stock: 40
    },

    // --- AUTOMOTIVE ---
    {
        name: 'Car Vacuum Cleaner',
        category: 'automotive',
        subCategory: 'Car Accessories',
        price: 39.99,
        description: 'Portable high power vacuum cleaner for car interiors.',
        images: [{ url: 'https://images.unsplash.com/photo-1552526367-8e1d6dd52975?w=800' }],
        brand: 'Black+Decker',
        stock: 50
    },
    {
        name: 'Motorbike Helmet',
        category: 'automotive',
        subCategory: 'Safety',
        price: 89.99,
        description: 'DOT certified full face helmet for bikers.',
        images: [{ url: 'https://images.unsplash.com/photo-1558535213-956247a3e792?w=800' }],
        brand: 'Steelbird',
        stock: 35
    },

    // --- OFFICE SUPPLIES ---
    {
        name: 'Premium Notebook',
        category: 'office-supplies',
        subCategory: 'Stationery',
        price: 12.99,
        description: 'Hardcover notebook with premium quality paper.',
        images: [{ url: 'https://images.unsplash.com/photo-1531346878377-a513bc95cc8d?w=800' }],
        brand: 'Moleskine',
        stock: 100
    },
    {
        name: 'Laptop Stand',
        category: 'office-supplies',
        subCategory: 'Accessories',
        price: 29.99,
        description: 'Adjustable aluminum laptop stand for ergonomic viewing.',
        images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' }],
        brand: 'Portronics',
        stock: 60
    },

    // --- HEALTH ---
    {
        name: 'Digital Thermometer',
        category: 'health',
        subCategory: 'Devices',
        price: 19.99,
        description: 'Fast and accurate digital thermometer for home use.',
        images: [{ url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800' }],
        brand: 'Omron',
        stock: 80
    },
    {
        name: 'Multivitamin Supplements',
        category: 'health',
        subCategory: 'Supplements',
        price: 24.99,
        description: 'Daily multivitamin tablets for overall health immunity.',
        images: [{ url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800' }],
        brand: 'HealthKart',
        stock: 90
    },

    // --- BABY PRODUCTS ---
    {
        name: 'Baby Diapers Pack',
        category: 'baby-products',
        subCategory: 'Diapers',
        price: 39.99,
        description: 'Soft and absorbent diapers for babies.',
        images: [{ url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800' }],
        brand: 'Pampers',
        stock: 100
    },
    {
        name: 'Baby Stroller',
        category: 'baby-products',
        subCategory: 'Gear',
        price: 149.99,
        description: 'Lightweight and foldable baby stroller.',
        images: [{ url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800' }],
        brand: 'Chicco',
        stock: 20
    },

    // --- ACCESSORIES ---
    {
        name: 'Leather Wallet',
        category: 'accessories',
        subCategory: 'Wallets',
        price: 49.99,
        description: 'Genuine leather bifold wallet for men.',
        images: [{ url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800' }],
        brand: 'Titan',
        stock: 75
    },
    {
        name: 'Aviator Sunglasses',
        category: 'accessories',
        subCategory: 'Sunglasses',
        price: 129.99,
        description: 'Classic aviator style sunglasses with UV protection.',
        images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800' }],
        brand: 'Ray-Ban',
        stock: 50,
        isFeatured: true
    }
];

const seedData = async () => {
    // Connect to database inside the function
    await connectDB();

    try {
        // Clear existing data
        console.log('Clearing existing data...');
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Data destroyed...');

        // Insert categories
        const createdCategories = await Category.insertMany(categoriesData);
        console.log(`${createdCategories.length} Categories inserted...`);

        // Create a map of slug -> category ID for easy lookup
        const categoryMap = {};
        createdCategories.forEach(cat => {
            categoryMap[cat.slug] = cat._id;
        });

        // Prepare products with correct category IDs
        const sampleProducts = productsData.map(product => {
            const catId = categoryMap[product.category];

            if (!catId) {
                console.warn(`Warning: Category '${product.category}' not found for product '${product.name}'. Skipping.`);
                return null;
            }

            return {
                ...product,
                category: catId
                // subCategory field is already present in product object
            };
        }).filter(Boolean); // Remove nulls

        // Insert products
        await Product.insertMany(sampleProducts);
        console.log(`${sampleProducts.length} Products inserted...`);

        console.log('Data Import Completed Successfully!');
        process.exit();
    } catch (err) {
        console.error('Error with data import:', err);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();
    try {
        await Category.deleteMany();
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Run based on argument
if (process.argv[2] === '-d') {
    destroyData();
} else {
    seedData();
}
