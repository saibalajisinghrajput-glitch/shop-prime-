import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, cartTotal, updateCartItem, removeFromCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
    } else {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg h-32" />
                ))}
              </div>
              <div className="bg-white p-4 rounded-lg h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

        {!cart?.products?.length ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <FiShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.products.map((item) => (
                <div key={item.product?._id || item.product} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                  {/* Product image */}
                  <Link to={`/product/${item.product?._id || item.product}`} className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.product?.images?.[0]?.url || item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </Link>

                  {/* Product info */}
                  <div className="flex-1">
                    <Link to={`/product/${item.product?._id || item.product}`} className="font-medium text-gray-900 hover:text-primary-600">
                      {item.name || item.product?.name}
                    </Link>
                    <p className="text-gray-500 text-sm mt-1">
                      ₹{(item.price || item.product?.price || item.product?.discountPrice)?.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.product?._id || item.product, item.quantity - 1)}
                          className="p-1 border rounded hover:bg-gray-50"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product?._id || item.product, item.quantity + 1)}
                          disabled={item.quantity >= (item.stock || item.product?.stock || 10)}
                          className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product?._id || item.product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Item total */}
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{((item.price || item.product?.price || item.product?.discountPrice) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping === 0 && (
                  <p className="text-green-600 text-sm mb-4">
                    ✓ You qualify for free shipping!
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3"
                >
                  Proceed to Checkout
                </button>

                <Link to="/products" className="block text-center mt-4 text-primary-600 hover:text-primary-700">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

