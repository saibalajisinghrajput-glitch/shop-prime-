import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    const result = await addToCart(product._id);
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(result.message);
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const displayPrice = product.discountPrice || product.price;
  const discount = product.discountPrice
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image container */}
      <Link to={`/product/${product._id}`} className="block relative aspect-square bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
      </Link>

      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform opacity-0 group-hover:opacity-100 z-10"
      >
        <FiHeart
          className={`text-lg ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
        />
      </button>

      {/* Product info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 mb-1">
          {product.category?.name || 'General'}
        </p>

        {/* Name */}
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`w-3 h-3 ${star <= Math.round(product.ratings)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.numOfReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{displayPrice.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Sold count */}
        <p className="text-xs text-gray-500 mt-1">
          {product.sold || 0} sold
        </p>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

