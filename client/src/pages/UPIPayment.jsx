import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { getOrder, getRazorpayKey, createRazorpayOrder, verifyRazorpayPayment } from '../api';

const UPIPayment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await getOrder(id);
      setOrder(data.order || data);
      if (data.order?.paymentInfo?.status === 'paid') {
        setPaymentStatus('paid');
      }
      setBackendStatus('connected');
    } catch (error) {
      console.error('Error fetching order:', error);
      setBackendStatus('error');
      setError('Backend connection failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setPaymentStatus('processing');
      setError('');
      
      // Get Razorpay key
      const { data: keyData } = await getRazorpayKey();
      
      if (!keyData.key_id) {
        throw new Error('Razorpay key not configured');
      }
      
      // Create order on backend
      const { data: orderData } = await createRazorpayOrder(id, totalPrice);
      
      if (!orderData.order?.id) {
        throw new Error('Failed to create payment order');
      }
      
      // Initialize Razorpay checkout
      const options = {
        key: keyData.key_id,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'ShopPrime',
        description: `Order #${id?.slice(-6)}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Verify payment
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: id,
            });
            
            setPaymentStatus('paid');
            navigate(`/order-confirmation/${id}`);
          } catch (error) {
            console.error('Payment verification failed:', error);
            setPaymentStatus('failed');
          }
        },
        prefill: {
          name: order?.shippingInfo?.firstName + ' ' + order?.shippingInfo?.lastName,
          email: order?.shippingInfo?.email,
          contact: order?.shippingInfo?.phone,
        },
        notes: {
          orderId: id,
        },
        theme: {
          color: '#10B981',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setPaymentStatus('failed');
        setError(`Payment failed: ${response.error.description || 'Please try again'}`);
      });
      
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('failed');
      setError(error.message || 'Failed to initiate payment. Please check your connection and try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (paymentStatus === 'paid') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
          <Link to={`/order-confirmation/${id}`} className="btn-primary px-6 py-3 inline-block">
            View Order Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        {/* Back button */}
        <Link to="/checkout" className="flex items-center gap-2 text-gray-600 mb-6 hover:text-gray-900">
          <FiArrowLeft /> Back to Checkout
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCreditCard className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by Razorpay</p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium">#{id?.slice(-6)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount to Pay</span>
            <span className="text-2xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Backend Status */}
        {backendStatus === 'error' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>⚠️ Backend Not Connected</strong><br />
              The payment system requires a backend server. Please ensure:
            </p>
            <ul className="text-yellow-700 text-sm mt-2 list-disc list-inside">
              <li>MongoDB is connected</li>
              <li>Backend is deployed and running</li>
              <li>Environment variables are set correctly</li>
            </ul>
          </div>
        )}

        {/* Payment Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <button
            onClick={handleRazorpayPayment}
            disabled={paymentStatus === 'processing'}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentStatus === 'processing' ? 'Processing...' : `Pay ₹${totalPrice.toFixed(2)}`}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Click the button above to open Razorpay secure checkout
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Secure Payment</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>256-bit SSL encryption</li>
            <li>PCI DSS compliant</li>
            <li>All major UPI apps supported</li>
            <li>Cards, Net Banking & Wallet options</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;
