export const categories = [
    { _id: '1', name: 'Electronics', slug: 'electronics', description: 'Gadgets, phones, and more', order: 1 },
    { _id: '2', name: 'Clothing', slug: 'clothing', description: 'Fashion for men, women, and kids', order: 2 },
    { _id: '3', name: 'Home & Kitchen', slug: 'home-kitchen', description: 'Everything for your home', order: 3 },
    { _id: '4', name: 'Beauty & Personal Care', slug: 'beauty', description: 'Makeup, skincare, and more', order: 4 },
    { _id: '5', name: 'Grocery', slug: 'grocery', description: 'Daily essentials and food', order: 5 },
    { _id: '6', name: 'Sports & Fitness', slug: 'sports-fitness', description: 'Gear for your active life', order: 6 },
    { _id: '7', name: 'Books', slug: 'books', description: 'Read and learn', order: 7 },
    { _id: '8', name: 'Toys & Games', slug: 'toys-games', description: 'Fun for all ages', order: 8 },
    { _id: '9', name: 'Automotive', slug: 'automotive', description: 'Car and bike accessories', order: 9 },
    { _id: '10', name: 'Office Supplies', slug: 'office-supplies', description: 'Stationery and office gear', order: 10 },
    { _id: '11', name: 'Health', slug: 'health', description: 'Health and wellness', order: 11 },
    { _id: '12', name: 'Baby Products', slug: 'baby-products', description: 'Care for your little ones', order: 12 },
    { _id: '13', name: 'Accessories', slug: 'accessories', description: 'Watches, bags, and more', order: 13 }
];

export const products = [
    // --- ELECTRONICS ---
    // Mobiles & Tablets
    { _id: '101', name: 'iPhone 15 Pro Max', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 159900, description: 'The ultimate iPhone.', images: [{ url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800' }], brand: 'Apple', stock: 50, isFeatured: true, rating: 4.9, numOfReviews: 120 },
    { _id: '102', name: 'Samsung Galaxy S24 Ultra', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 129999, description: 'Galaxy AI is here.', images: [{ url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800' }], brand: 'Samsung', stock: 45, isFeatured: true, rating: 4.8, numOfReviews: 95 },
    { _id: '103', name: 'Redmi 13C', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 8999, description: 'Budget smartphone.', images: [{ url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=800' }], brand: 'Xiaomi', stock: 100, rating: 4.3, numOfReviews: 200 },
    { _id: '104', name: 'ASUS ROG Phone 8', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 94999, description: 'Gaming phone.', images: [{ url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' }], brand: 'ASUS', stock: 20, rating: 4.7, numOfReviews: 15 },
    { _id: '105', name: 'iPad Air 5th Gen', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 54900, description: 'Powerful tablet.', images: [{ url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800' }], brand: 'Apple', stock: 30, rating: 4.8, numOfReviews: 60 },
    { _id: '106', name: 'Galaxy Watch 6', category: 'electronics', subCategory: 'Mobiles & Tablets', price: 29999, description: 'Smart watch.', images: [{ url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800' }], brand: 'Samsung', stock: 50, rating: 4.6, numOfReviews: 80 },

    // Computers
    { _id: '110', name: 'MacBook Air M3', category: 'electronics', subCategory: 'Computers', price: 114900, description: 'Laptop.', images: [{ url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=800' }], brand: 'Apple', stock: 25, rating: 4.9, numOfReviews: 45 },
    { _id: '111', name: 'Dell XPS 15', category: 'electronics', subCategory: 'Computers', price: 184990, description: 'High performance laptop.', images: [{ url: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800' }], brand: 'Dell', stock: 15, rating: 4.7, numOfReviews: 30 },
    { _id: '112', name: 'Alienware m18', category: 'electronics', subCategory: 'Computers', price: 299990, description: 'Gaming laptop.', images: [{ url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800' }], brand: 'Dell', stock: 5, rating: 4.9, numOfReviews: 10 },
    { _id: '113', name: 'LG 27" Monitor', category: 'electronics', subCategory: 'Computers', price: 24999, description: '4K monitor.', images: [{ url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800' }], brand: 'LG', stock: 40, rating: 4.6, numOfReviews: 25 },
    { _id: '114', name: 'Logitech MX Master', category: 'electronics', subCategory: 'Computers', price: 9995, description: 'Wireless mouse.', images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' }], brand: 'Logitech', stock: 80, rating: 4.9, numOfReviews: 150 },
    { _id: '115', name: 'Razer Keyboard', category: 'electronics', subCategory: 'Computers', price: 4999, description: 'Mechanical keyboard.', images: [{ url: 'https://images.unsplash.com/photo-1587829741301-3e4b78759394?w=800' }], brand: 'Razer', stock: 60, rating: 4.7, numOfReviews: 85 },
    { _id: '116', name: 'Samsung T7 SSD', category: 'electronics', subCategory: 'Computers', price: 8999, description: 'Portable SSD.', images: [{ url: 'https://images.unsplash.com/photo-1597872250965-f50226e6d5b0?w=800' }], brand: 'Samsung', stock: 120, rating: 4.8, numOfReviews: 200 },

    // Audio
    { _id: '120', name: 'Sony WH-1000XM5', category: 'electronics', subCategory: 'Audio', price: 29990, description: 'Headphones.', images: [{ url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800' }], brand: 'Sony', stock: 60, rating: 4.8, numOfReviews: 150 },
    { _id: '121', name: 'AirPods Pro 2', category: 'electronics', subCategory: 'Audio', price: 24900, description: 'Earbuds.', images: [{ url: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800' }], brand: 'Apple', stock: 100, rating: 4.8, numOfReviews: 200 },
    { _id: '122', name: 'JBL Flip 6', category: 'electronics', subCategory: 'Audio', price: 11999, description: 'Speaker.', images: [{ url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800' }], brand: 'JBL', stock: 80, rating: 4.5, numOfReviews: 90 },
    { _id: '123', name: 'Soundbar', category: 'electronics', subCategory: 'Audio', price: 24990, description: 'Home theatre.', images: [{ url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800' }], brand: 'Sony', stock: 15, rating: 4.6, numOfReviews: 40 },

    // TV & Appliances
    { _id: '130', name: 'LG OLED TV', category: 'electronics', subCategory: 'TV & Appliances', price: 134990, description: 'Smart TV.', images: [{ url: 'https://images.unsplash.com/photo-1593784653277-e9a6da83842c?w=800' }], brand: 'LG', stock: 15, rating: 4.9, numOfReviews: 40 },
    { _id: '131', name: 'Samsung Fridge', category: 'electronics', subCategory: 'TV & Appliances', price: 34990, description: 'Refrigerator.', images: [{ url: 'https://images.unsplash.com/photo-1571175443880-49e1d58b95da?w=800' }], brand: 'Samsung', stock: 20, rating: 4.5, numOfReviews: 60 },
    { _id: '132', name: 'Washing Machine', category: 'electronics', subCategory: 'TV & Appliances', price: 18990, description: 'Top load.', images: [{ url: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=800' }], brand: 'Whirlpool', stock: 25, rating: 4.4, numOfReviews: 35 },
    { _id: '133', name: 'Air Fryer', category: 'electronics', subCategory: 'TV & Appliances', price: 8999, description: 'Healthy cooking.', images: [{ url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800' }], brand: 'Philips', stock: 45, rating: 4.7, numOfReviews: 120 },

    // Gaming
    { _id: '140', name: 'PS5 Console', category: 'electronics', subCategory: 'Gaming', price: 54990, description: 'Gaming console.', images: [{ url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800' }], brand: 'Sony', stock: 10, rating: 4.9, numOfReviews: 300 },
    { _id: '141', name: 'Xbox Series X', category: 'electronics', subCategory: 'Gaming', price: 49990, description: 'Gaming console.', images: [{ url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800' }], brand: 'Microsoft', stock: 8, rating: 4.8, numOfReviews: 150 },
    { _id: '142', name: 'PS5 Controller', category: 'electronics', subCategory: 'Gaming', price: 5990, description: 'Controller.', images: [{ url: 'https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=800' }], brand: 'Sony', stock: 50, rating: 4.7, numOfReviews: 200 },
    { _id: '143', name: 'Gaming Chair', category: 'electronics', subCategory: 'Gaming', price: 14999, description: 'Ergonomic chair.', images: [{ url: 'https://images.unsplash.com/photo-1598550476439-d058a69e7f7f?w=800' }], brand: 'Green Soul', stock: 20, rating: 4.5, numOfReviews: 45 },

    // --- CLOTHING ---
    // Men
    { _id: '201', name: 'T-Shirt', category: 'clothing', subCategory: 'Men', price: 499, description: 'Cotton tee.', images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800' }], brand: 'H&M', stock: 200, rating: 4.3, numOfReviews: 150 },
    { _id: '202', name: 'Jeans', category: 'clothing', subCategory: 'Men', price: 2499, description: 'Denim jeans.', images: [{ url: 'https://images.unsplash.com/photo-1542272617-08f08637533d?w=800' }], brand: 'Levis', stock: 100, rating: 4.5, numOfReviews: 90 },
    { _id: '203', name: 'Formal Shirt', category: 'clothing', subCategory: 'Men', price: 1499, description: 'Office shirt.', images: [{ url: 'https://images.unsplash.com/photo-1620012253295-c15cc3fe5d3d?w=800' }], brand: 'Van Heusen', stock: 80, rating: 4.4, numOfReviews: 60 },
    { _id: '204', name: 'Jacket', category: 'clothing', subCategory: 'Men', price: 3999, description: 'Winter jacket.', images: [{ url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800' }], brand: 'Woodland', stock: 40, rating: 4.6, numOfReviews: 30 },

    // Women
    { _id: '210', name: 'Dress', category: 'clothing', subCategory: 'Women', price: 1999, description: 'Summer dress.', images: [{ url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800' }], brand: 'Zara', stock: 80, rating: 4.7, numOfReviews: 60 },
    { _id: '211', name: 'Kurti', category: 'clothing', subCategory: 'Women', price: 899, description: 'Cotton kurti.', images: [{ url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800' }], brand: 'Biba', stock: 120, rating: 4.5, numOfReviews: 85 },
    { _id: '212', name: 'Saree', category: 'clothing', subCategory: 'Women', price: 4999, description: 'Silk saree.', images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' }], brand: 'FabIndia', stock: 30, rating: 4.8, numOfReviews: 40 },

    // Kids
    { _id: '220', name: 'Graphic Tee', category: 'clothing', subCategory: 'Kids', price: 399, description: 'Kids t-shirt.', images: [{ url: 'https://images.unsplash.com/photo-1519238809107-742f9d38c29e?w=800' }], brand: 'Gap Kids', stock: 150, rating: 4.5, numOfReviews: 40 },

    // Footwear
    { _id: '230', name: 'Running Shoes', category: 'clothing', subCategory: 'Footwear', price: 4999, description: 'Sports shoes.', images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800' }], brand: 'Nike', stock: 70, rating: 4.6, numOfReviews: 85 },
    { _id: '231', name: 'Formal Shoes', category: 'clothing', subCategory: 'Footwear', price: 2999, description: 'Office shoes.', images: [{ url: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800' }], brand: 'Red Tape', stock: 60, rating: 4.4, numOfReviews: 50 },

    // --- HOME & KITCHEN ---
    { _id: '301', name: 'Pressure Cooker', category: 'home-kitchen', subCategory: 'Kitchen', price: 1599, description: '3L cooker.', images: [{ url: 'https://images.unsplash.com/photo-1584269619280-5a369dc11e58?w=800' }], brand: 'Hawkins', stock: 50, rating: 4.5, numOfReviews: 80 },
    { _id: '302', name: 'Dinner Set', category: 'home-kitchen', subCategory: 'Kitchen', price: 2499, description: 'Melamine set.', images: [{ url: 'https://images.unsplash.com/photo-1603194565261-7e8e578ce857?w=800' }], brand: 'Cello', stock: 30, rating: 4.3, numOfReviews: 40 },
    { _id: '303', name: 'Knife Set', category: 'home-kitchen', subCategory: 'Kitchen', price: 799, description: 'Steel knives.', images: [{ url: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800' }], brand: 'Pigeon', stock: 70, rating: 4.4, numOfReviews: 55 },
    { _id: '304', name: 'Gas Stove', category: 'home-kitchen', subCategory: 'Kitchen', price: 4999, description: '3 burner stove.', images: [{ url: 'https://images.unsplash.com/photo-1585237672814-8f85a8118b9b?w=800' }], brand: 'Prestige', stock: 25, rating: 4.6, numOfReviews: 35 },
    { _id: '305', name: 'Mixer Grinder', category: 'home-kitchen', subCategory: 'Kitchen', price: 3499, description: '750W mixer.', images: [{ url: 'https://images.unsplash.com/photo-1585237672814-8f85a8118b9b?w=800' }], brand: 'Bajaj', stock: 40, rating: 4.3, numOfReviews: 80 },
    { _id: '306', name: 'Water Bottle', category: 'home-kitchen', subCategory: 'Kitchen', price: 599, description: 'Steel bottle.', images: [{ url: 'https://images.unsplash.com/photo-1602143407151-011141997438?w=800' }], brand: 'Milton', stock: 100, rating: 4.5, numOfReviews: 120 },

    // Decor
    { _id: '310', name: 'Wall Clock', category: 'home-kitchen', subCategory: 'Home Decor', price: 999, description: 'Modern clock.', images: [{ url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800' }], brand: 'Ajanta', stock: 50, rating: 4.4, numOfReviews: 25 },
    { _id: '311', name: 'Bed Sheet', category: 'home-kitchen', subCategory: 'Home Decor', price: 1299, description: 'Cotton sheet.', images: [{ url: 'https://images.unsplash.com/photo-1522771753035-4a50470a3096?w=800' }], brand: 'Bombay Dyeing', stock: 60, rating: 4.6, numOfReviews: 70 },
    { _id: '312', name: 'Curtains', category: 'home-kitchen', subCategory: 'Home Decor', price: 899, description: 'Door curtains.', images: [{ url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' }], brand: 'Swayam', stock: 60, rating: 4.5, numOfReviews: 50 },
    { _id: '313', name: 'Table Lamp', category: 'home-kitchen', subCategory: 'Home Decor', price: 1299, description: 'Bedside lamp.', images: [{ url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800' }], brand: 'Chumbak', stock: 45, rating: 4.6, numOfReviews: 40 },

    // Furniture
    { _id: '320', name: 'Office Chair', category: 'home-kitchen', subCategory: 'Furniture', price: 12999, description: 'Ergonomic chair.', images: [{ url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800' }], brand: 'Godrej', stock: 20, rating: 4.8, numOfReviews: 35 },
    { _id: '321', name: 'Sofa', category: 'home-kitchen', subCategory: 'Furniture', price: 24999, description: '3 seater sofa.', images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' }], brand: 'HomeCentre', stock: 10, rating: 4.7, numOfReviews: 20 },
    { _id: '322', name: 'Bed', category: 'home-kitchen', subCategory: 'Furniture', price: 18999, description: 'Queen bed.', images: [{ url: 'https://images.unsplash.com/photo-1505693416388-b0346efee535?w=800' }], brand: 'Wakefit', stock: 10, rating: 4.7, numOfReviews: 60 },
    { _id: '323', name: 'Study Table', category: 'home-kitchen', subCategory: 'Furniture', price: 4999, description: 'Wooden table.', images: [{ url: 'https://images.unsplash.com/photo-1519219788971-8d9797e0928e?w=800' }], brand: 'Bluewud', stock: 30, rating: 4.4, numOfReviews: 45 },
    { _id: '324', name: 'Wardrobe', category: 'home-kitchen', subCategory: 'Furniture', price: 15999, description: '3 door wardrobe.', images: [{ url: 'https://images.unsplash.com/photo-1595428774783-da52b2f63b21?w=800' }], brand: 'Godrej', stock: 15, rating: 4.5, numOfReviews: 25 },

    // --- BEAUTY ---
    { _id: '401', name: 'Moisturizer', category: 'beauty', subCategory: 'Skincare', price: 899, description: 'Face cream.', images: [{ url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800' }], brand: 'CeraVe', stock: 100, rating: 4.8, numOfReviews: 200 },
    { _id: '402', name: 'Face Wash', category: 'beauty', subCategory: 'Skincare', price: 199, description: 'Cleanser.', images: [{ url: 'https://images.unsplash.com/photo-1556212063-8a0e88358e08?w=800' }], brand: 'Nivea', stock: 100, rating: 4.5, numOfReviews: 120 },
    { _id: '403', name: 'Lipstick', category: 'beauty', subCategory: 'Makeup', price: 1299, description: 'Matte lipstick.', images: [{ url: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=800' }], brand: 'Maybelline', stock: 80, rating: 4.6, numOfReviews: 90 },
    { _id: '404', name: 'Foundation', category: 'beauty', subCategory: 'Makeup', price: 450, description: 'Liquid foundation.', images: [{ url: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?w=800' }], brand: 'Lakme', stock: 80, rating: 4.4, numOfReviews: 90 },
    { _id: '405', name: 'Perfume', category: 'beauty', subCategory: 'Fragrance', price: 3500, description: 'Men\'s perfume.', images: [{ url: 'https://images.unsplash.com/photo-1523293188086-b43e0cf7f99b?w=800' }], brand: 'Davidoff', stock: 40, rating: 4.8, numOfReviews: 60 },
    { _id: '406', name: 'Hair Oil', category: 'beauty', subCategory: 'Hair Care', price: 250, description: 'Coconut oil.', images: [{ url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800' }], brand: 'Parachute', stock: 150, rating: 4.7, numOfReviews: 200 },
    { _id: '407', name: 'Shampoo', category: 'beauty', subCategory: 'Hair Care', price: 699, description: 'Repair shampoo.', images: [{ url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800' }], brand: 'L\'Oreal', stock: 120, rating: 4.6, numOfReviews: 110 },
    { _id: '408', name: 'Trimmer', category: 'beauty', subCategory: 'Grooming', price: 1499, description: 'Beard trimmer.', images: [{ url: 'https://images.unsplash.com/photo-1621607512214-68297f319043?w=800' }], brand: 'Philips', stock: 100, rating: 4.5, numOfReviews: 150 },
    { _id: '409', name: 'Hair Dryer', category: 'beauty', subCategory: 'Hair Care', price: 999, description: 'Travel dryer.', images: [{ url: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=800' }], brand: 'Vega', stock: 60, rating: 4.3, numOfReviews: 50 },

    // --- GROCERY ---
    { _id: '501', name: 'Basmati Rice', category: 'grocery', subCategory: 'Staples', price: 649, description: '5kg rice.', images: [{ url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800' }], brand: 'India Gate', stock: 200, rating: 4.7, numOfReviews: 80 },
    { _id: '502', name: 'Atta', category: 'grocery', subCategory: 'Staples', price: 450, description: '10kg flour.', images: [{ url: 'https://images.unsplash.com/photo-1625867455823-38e4a9d28229?w=800' }], brand: 'Aashirvaad', stock: 100, rating: 4.8, numOfReviews: 150 },
    { _id: '503', name: 'Cooking Oil', category: 'grocery', subCategory: 'Staples', price: 160, description: '1L oil.', images: [{ url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800' }], brand: 'Fortune', stock: 120, rating: 4.7, numOfReviews: 100 },
    { _id: '504', name: 'Almonds', category: 'grocery', subCategory: 'Dry Fruits', price: 499, description: '500g almonds.', images: [{ url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d60?w=800' }], brand: 'Happilo', stock: 150, rating: 4.8, numOfReviews: 120 },
    { _id: '505', name: 'Spices', category: 'grocery', subCategory: 'Spices', price: 85, description: 'Garam masala.', images: [{ url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800' }], brand: 'Everest', stock: 200, rating: 4.8, numOfReviews: 90 },
    { _id: '506', name: 'Tea Bags', category: 'grocery', subCategory: 'Beverages', price: 450, description: 'Green tea.', images: [{ url: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800' }], brand: 'Lipton', stock: 90, rating: 4.6, numOfReviews: 60 },
    { _id: '507', name: 'Chocolate', category: 'grocery', subCategory: 'Chocolates', price: 299, description: 'Dark chocolate.', images: [{ url: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800' }], brand: 'Amul', stock: 100, rating: 4.9, numOfReviews: 180 },
    { _id: '508', name: 'Chips', category: 'grocery', subCategory: 'Snacks', price: 20, description: 'Potato chips.', images: [{ url: 'https://images.unsplash.com/photo-1566478989066-246c66c04fbb?w=800' }], brand: 'Lays', stock: 300, rating: 4.6, numOfReviews: 500 },
    { _id: '509', name: 'Noodles', category: 'grocery', subCategory: 'Instant Foods', price: 140, description: 'Maggi pack.', images: [{ url: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800' }], brand: 'Maggi', stock: 250, rating: 4.9, numOfReviews: 400 },

    // --- SPORTS ---
    { _id: '601', name: 'Yoga Mat', category: 'sports-fitness', subCategory: 'Yoga', price: 899, description: 'Non-slip mat.', images: [{ url: 'https://images.unsplash.com/photo-1592432678010-c591e1e9a9be?w=800' }], brand: 'BoldFit', stock: 70, rating: 4.6, numOfReviews: 50 },
    { _id: '602', name: 'Dumbbells', category: 'sports-fitness', subCategory: 'Gym Equipment', price: 14999, description: 'Adjustable weights.', images: [{ url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800' }], brand: 'Bowflex', stock: 20, rating: 4.8, numOfReviews: 30 },
    { _id: '603', name: 'Cricket Bat', category: 'sports-fitness', subCategory: 'Sports', price: 4999, description: 'Willow bat.', images: [{ url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800' }], brand: 'SG', stock: 30, rating: 4.7, numOfReviews: 25 },
    { _id: '604', name: 'Whey Protein', category: 'sports-fitness', subCategory: 'Supplements', price: 2899, description: 'Chocolate flavor.', images: [{ url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800' }], brand: 'ON', stock: 60, rating: 4.8, numOfReviews: 100 },
    { _id: '605', name: 'Treadmill', category: 'sports-fitness', subCategory: 'Gym Equipment', price: 24999, description: 'Motorized treadmill.', images: [{ url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800' }], brand: 'Fitkit', stock: 10, rating: 4.6, numOfReviews: 20 },
    { _id: '606', name: 'Football', category: 'sports-fitness', subCategory: 'Sports', price: 999, description: 'Size 5 ball.', images: [{ url: 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?w=800' }], brand: 'Nivia', stock: 60, rating: 4.7, numOfReviews: 50 },
    { _id: '607', name: 'Resistance Bands', category: 'sports-fitness', subCategory: 'Gym Equipment', price: 699, description: 'Set of 5.', images: [{ url: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800' }], brand: 'BoldFit', stock: 80, rating: 4.5, numOfReviews: 60 },

    // --- BOOKS ---
    { _id: '701', name: 'The Alchemist', category: 'books', subCategory: 'Fiction', price: 299, description: 'Best seller.', images: [{ url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800' }], brand: 'HarperCollins', stock: 100, rating: 4.8, numOfReviews: 300 },
    { _id: '702', name: 'Sapiens', category: 'books', subCategory: 'Non-Fiction', price: 499, description: 'History book.', images: [{ url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800' }], brand: 'Vintage', stock: 120, rating: 4.9, numOfReviews: 500 },
    { _id: '703', name: 'Atomic Habits', category: 'books', subCategory: 'Self Help', price: 450, description: 'Habit building.', images: [{ url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800' }], brand: 'Penguin', stock: 150, rating: 4.9, numOfReviews: 450 },
    { _id: '704', name: 'Physics Book', category: 'books', subCategory: 'Academic', price: 600, description: 'H.C. Verma.', images: [{ url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800' }], brand: 'Bharati', stock: 80, rating: 4.7, numOfReviews: 200 },
    { _id: '705', name: 'Rich Dad Poor Dad', category: 'books', subCategory: 'Business', price: 399, description: 'Finance book.', images: [{ url: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800' }], brand: 'Plata', stock: 90, rating: 4.8, numOfReviews: 350 },
    { _id: '706', name: 'Exam Guide', category: 'books', subCategory: 'Competitive Exams', price: 550, description: 'UPSC guide.', images: [{ url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800' }], brand: 'McGraw', stock: 60, rating: 4.5, numOfReviews: 100 },

    // --- TOYS ---
    { _id: '801', name: 'RC Car', category: 'toys-games', subCategory: 'Remote Control Cars', price: 1499, description: 'Off-road car.', images: [{ url: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800' }], brand: 'Generic', stock: 40, rating: 4.4, numOfReviews: 60 },
    { _id: '802', name: 'Monopoly', category: 'toys-games', subCategory: 'Board Games', price: 999, description: 'Classic game.', images: [{ url: 'https://images.unsplash.com/photo-1610890716171-6b1c9f20ad82?w=800' }], brand: 'Hasbro', stock: 80, rating: 4.7, numOfReviews: 90 },
    { _id: '803', name: 'Lego Set', category: 'toys-games', subCategory: 'Educational Toys', price: 2499, description: 'Building blocks.', images: [{ url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800' }], brand: 'Lego', stock: 60, rating: 4.9, numOfReviews: 120 },
    { _id: '804', name: 'Action Figure', category: 'toys-games', subCategory: 'Action Figures', price: 899, description: 'Superhero.', images: [{ url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800' }], brand: 'Marvel', stock: 50, rating: 4.6, numOfReviews: 70 },
    { _id: '805', name: 'Teddy Bear', category: 'toys-games', subCategory: 'Soft Toys', price: 599, description: 'Plush toy.', images: [{ url: 'https://images.unsplash.com/photo-1559454403-b8fb87521bc7?w=800' }], brand: 'Generic', stock: 100, rating: 4.8, numOfReviews: 80 },

    // --- AUTOMOTIVE ---
    { _id: '901', name: 'Car Cover', category: 'automotive', subCategory: 'Car Covers', price: 1299, description: 'Waterproof.', images: [{ url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800' }], brand: 'Generic', stock: 40, rating: 4.3, numOfReviews: 40 },
    { _id: '902', name: 'Seat Cover', category: 'automotive', subCategory: 'Seat Covers', price: 4999, description: 'Leather covers.', images: [{ url: 'https://images.unsplash.com/photo-1503376763036-066120622c74?w=800' }], brand: 'AutoForm', stock: 20, rating: 4.5, numOfReviews: 30 },
    { _id: '903', name: 'Helmet', category: 'automotive', subCategory: 'Bike Helmets', price: 1999, description: 'Full face.', images: [{ url: 'https://images.unsplash.com/photo-1558535213-956247a3e792?w=800' }], brand: 'Steelbird', stock: 35, rating: 4.7, numOfReviews: 50 },
    { _id: '904', name: 'Vacuum Cleaner', category: 'automotive', subCategory: 'Car Vacuum Cleaner', price: 1499, description: 'Portable.', images: [{ url: 'https://images.unsplash.com/photo-1552526367-8e1d6dd52975?w=800' }], brand: 'Black+Decker', stock: 50, rating: 4.4, numOfReviews: 60 },
    { _id: '905', name: 'Car Perfume', category: 'automotive', subCategory: 'Car Perfumes', price: 299, description: 'Gel freshener.', images: [{ url: 'https://images.unsplash.com/photo-1605218427368-35b86e28e3cf?w=800' }], brand: 'Godrej', stock: 150, rating: 4.5, numOfReviews: 100 },

    // --- OFFICE ---
    { _id: '1001', name: 'Notebook', category: 'office-supplies', subCategory: 'Notebooks', price: 199, description: 'Hardcover.', images: [{ url: 'https://images.unsplash.com/photo-1531346878377-a513bc95cc8d?w=800' }], brand: 'Classmate', stock: 200, rating: 4.6, numOfReviews: 80 },
    { _id: '1002', name: 'Pen Set', category: 'office-supplies', subCategory: 'Pens', price: 299, description: 'Ball pens.', images: [{ url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800' }], brand: 'Parker', stock: 150, rating: 4.7, numOfReviews: 120 },
    { _id: '1003', name: 'Office Chair', category: 'office-supplies', subCategory: 'Office Chairs', price: 8999, description: 'Mesh chair.', images: [{ url: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800' }], brand: 'Green Soul', stock: 20, rating: 4.5, numOfReviews: 40 },
    { _id: '1004', name: 'Laptop Stand', category: 'office-supplies', subCategory: 'Laptop Stands', price: 1299, description: 'Aluminum stand.', images: [{ url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800' }], brand: 'Portronics', stock: 60, rating: 4.6, numOfReviews: 90 },
    { _id: '1005', name: 'Whiteshield', category: 'office-supplies', subCategory: 'White Boards', price: 1499, description: '2x3 feet.', images: [{ url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800' }], brand: 'Pragati', stock: 30, rating: 4.4, numOfReviews: 35 },

    // --- HEALTH ---
    { _id: '1101', name: 'Multivitamin', category: 'health', subCategory: 'Multivitamins', price: 899, description: 'Daily tablets.', images: [{ url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800' }], brand: 'HealthKart', stock: 90, rating: 4.7, numOfReviews: 150 },
    { _id: '1102', name: 'Glucometer', category: 'health', subCategory: 'Glucometers', price: 1299, description: 'Sugar test.', images: [{ url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800' }], brand: 'Accu-Chek', stock: 60, rating: 4.8, numOfReviews: 80 },
    { _id: '1103', name: 'BP Monitor', category: 'health', subCategory: 'BP Monitors', price: 1899, description: 'Digital BP.', images: [{ url: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800' }], brand: 'Omron', stock: 45, rating: 4.8, numOfReviews: 70 },
    { _id: '1104', name: 'Thermometer', category: 'health', subCategory: 'Thermometers', price: 499, description: 'Digital.', images: [{ url: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=800' }], brand: 'Dr.Trust', stock: 80, rating: 4.5, numOfReviews: 100 },
    { _id: '1105', name: 'Sanitizer', category: 'health', subCategory: 'Sanitizers', price: 250, description: '500ml.', images: [{ url: 'https://images.unsplash.com/photo-1584483766114-2cea6fac2578?w=800' }], brand: 'Dettol', stock: 200, rating: 4.9, numOfReviews: 300 },

    // --- BABY ---
    { _id: '1201', name: 'Diapers', category: 'baby-products', subCategory: 'Baby Diapers', price: 1199, description: 'Large pack.', images: [{ url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800' }], brand: 'Pampers', stock: 100, rating: 4.8, numOfReviews: 200 },
    { _id: '1202', name: 'Baby Food', category: 'baby-products', subCategory: 'Baby Food', price: 350, description: 'Cereal.', images: [{ url: 'https://images.unsplash.com/photo-1596708682054-9e8c47f7d4d4?w=800' }], brand: 'Cerelac', stock: 100, rating: 4.8, numOfReviews: 150 },
    { _id: '1203', name: 'Feeding Bottle', category: 'baby-products', subCategory: 'Feeding Bottles', price: 499, description: 'Anti-colic.', images: [{ url: 'https://images.unsplash.com/photo-1612803862214-7d877d9431ec?w=800' }], brand: 'Philips', stock: 80, rating: 4.7, numOfReviews: 60 },
    { _id: '1204', name: 'Stroller', category: 'baby-products', subCategory: 'Baby Strollers', price: 6999, description: 'Foldable.', images: [{ url: 'https://images.unsplash.com/photo-1591871937631-2f64059d234f?w=800' }], brand: 'LuvLap', stock: 20, rating: 4.6, numOfReviews: 40 },
    { _id: '1205', name: 'Baby Toys', category: 'baby-products', subCategory: 'Baby Toys', price: 599, description: 'Rattle set.', images: [{ url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800' }], brand: 'Funskool', stock: 80, rating: 4.6, numOfReviews: 40 },

    // --- ACCESSORIES ---
    { _id: '1301', name: 'Watch', category: 'accessories', subCategory: 'Watches', price: 2499, description: 'Analog watch.', images: [{ url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800' }], brand: 'Titan', stock: 75, rating: 4.5, numOfReviews: 60 },
    { _id: '1302', name: 'Sunglasses', category: 'accessories', subCategory: 'Sunglasses', price: 4999, description: 'Aviator.', images: [{ url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800' }], brand: 'RayBan', stock: 50, rating: 4.8, numOfReviews: 90 },
    { _id: '1303', name: 'Wallet', category: 'accessories', subCategory: 'Wallets', price: 1299, description: 'Leather wallet.', images: [{ url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800' }], brand: 'Hidesign', stock: 60, rating: 4.6, numOfReviews: 80 },
    { _id: '1304', name: 'Handbag', category: 'accessories', subCategory: 'Handbags', price: 2999, description: 'Tote bag.', images: [{ url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800' }], brand: 'Lavie', stock: 60, rating: 4.4, numOfReviews: 70 },
    { _id: '1305', name: 'Phone Case', category: 'accessories', subCategory: 'Phone Cases', price: 499, description: 'Silicone case.', images: [{ url: 'https://images.unsplash.com/photo-1603313011171-3195d43d2416?w=800' }], brand: 'Spigen', stock: 100, rating: 4.7, numOfReviews: 200 }
];
