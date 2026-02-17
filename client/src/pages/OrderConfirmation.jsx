import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiHome } from 'react-icons/fi';
import { getOrder } from '../api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await getOrder(id);
      setOrder(data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          {order && (
            <p className="text-sm text-gray-500 mt-2">
              Order ID: <span className="font-medium text-gray-900">#{order._id}</span>
            </p>
          )}
        </div>

        {/* Order details */}
        {order && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Order status */}
            <div className="bg-primary-50 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiPackage className="w-5 h-5 text-primary-600" />
                  <span className="font-medium">Order Placed</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTruck className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHome className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">Delivered</span>
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image || 'https://via.placeholder.com/80'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping info */}
            <div className="border-t p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <p className="text-gray-600">
                {order.shippingInfo?.firstName} {order.shippingInfo?.lastName}<br />
                {order.shippingInfo?.address}<br />
                {order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zipCode}<br />
                {order.shippingInfo?.country}
              </p>
            </div>

            {/* Order summary */}
            <div className="border-t p-6 bg-gray-50">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{order.itemsPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{order.shippingPrice === 0 ? 'Free' : `₹${order.shippingPrice?.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{order.taxPrice?.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/orders" className="btn-primary px-6 py-3">
            View All Orders
          </Link>
          <Link to="/products" className="btn-secondary px-6 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

