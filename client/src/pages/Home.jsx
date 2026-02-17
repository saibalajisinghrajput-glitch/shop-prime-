import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getCategories } from '../api';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600',
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    description: 'Discover amazing deals on electronics, fashion, and more.',
    cta: 'Shop Now',
    link: '/products?sort=popularity',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600',
    title: 'New Arrivals',
    subtitle: 'Latest Tech',
    description: 'Check out the newest gadgets and electronics.',
    cta: 'Explore',
    link: '/products?category=electronics',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600',
    title: 'Fashion Week',
    subtitle: 'Trendy Styles',
    description: 'Update your wardrobe with the latest fashion trends.',
    cta: 'Browse',
    link: '/products?category=clothing',
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getFeaturedProducts(),
        getCategories(),
      ]);
      setFeaturedProducts(productsRes.data.products || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-xl">
                  <p className="text-primary-500 font-semibold mb-2">{slide.subtitle}</p>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-lg mb-6">{slide.description}</p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded transition-colors"
                  >
                    {slide.cta}
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        >
          <FiChevronLeft className="text-white text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        >
          <FiChevronRight className="text-white text-2xl" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-primary-500' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Categories section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category.slug}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                  <span className="text-2xl">
                    {category.name === 'Electronics' && '📱'}
                    {category.name === 'Clothing' && '👕'}
                    {category.name === 'Home & Kitchen' && '🏠'}
                    {category.name === 'Books' && '📚'}
                    {category.name === 'Sports & Outdoors' && '⚽'}
                    {category.name === 'Beauty & Personal Care' && '💄'}
                    {category.name === 'Toys & Games' && '🎮'}
                    {category.name === 'Automotive' && '🚗'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link
              to="/products?sort=popularity"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              See more <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-primary-100">On orders over ₹999</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-blue-100">100% secure checkout</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-green-100">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Best Sellers</h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View all <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 px-4 bg-amazon-light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-6">
            Get the latest updates on new products and upcoming sales.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;

