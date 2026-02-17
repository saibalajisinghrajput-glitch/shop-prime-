import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '',
    rating: searchParams.get('rating') || '',
  });

  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    rating: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams);
      const { data } = await getProducts(params);
      setProducts(data.products || []);
      setPagination({
        page: data.page,
        pages: data.pages,
        total: data.total,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      rating: '',
    });
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage);
    setSearchParams(params);
  };

  const toggleFilter = (filter) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {filters.category 
              ? categories.find(c => c.slug === filters.category)?.name || 'Products'
              : filters.keyword 
                ? `Search results for "${filters.keyword}"`
                : 'All Products'
            }
          </h1>
          <p className="text-gray-600 mt-2">
            {pagination.total} products found
          </p>
        </div>

        <div className="flex gap-8">
          {/* Mobile filter toggle */}
          <button
            className="lg:hidden flex items-center gap-2 mb-4 px-4 py-2 bg-white rounded-lg shadow"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> Filters
          </button>

          {/* Filters sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>

              {/* Category filter */}
              <div className="mb-4">
                <button
                  onClick={() => toggleFilter('category')}
                  className="flex items-center justify-between w-full font-medium py-2"
                >
                  Category
                  {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilters.category && (
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={!filters.category}
                        onChange={() => updateFilters({ category: '' })}
                        className="text-primary-600"
                      />
                      <span className="text-sm">All Categories</span>
                    </label>
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === cat.slug}
                          onChange={() => updateFilters({ category: cat.slug })}
                          className="text-primary-600"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price filter */}
              <div className="mb-4 border-t pt-4">
                <button
                  onClick={() => toggleFilter('price')}
                  className="flex items-center justify-between w-full font-medium py-2"
                >
                  Price Range
                  {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilters.price && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => updateFilters({ minPrice: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                    <button
                      onClick={() => updateFilters({})}
                      className="w-full btn-primary text-sm py-1"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Rating filter */}
              <div className="mb-4 border-t pt-4">
                <button
                  onClick={() => toggleFilter('rating')}
                  className="flex items-center justify-between w-full font-medium py-2"
                >
                  Rating
                  {expandedFilters.rating ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilters.rating && (
                  <div className="mt-2 space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating.toString()}
                          onChange={() => updateFilters({ rating: rating.toString() })}
                          className="text-primary-600"
                        />
                        <span className="text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilters({ sort: e.target.value })}
                  className="border-none bg-transparent font-medium focus:outline-none"
                >
                  <option value="">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popularity">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary-600 hover:text-primary-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 border rounded-lg ${
                      pagination.page === i + 1
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

