import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCreditCard, FiCheckCircle, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { getOrder } from '../api';

const UPIPayment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  
  const totalPrice = location.state?.totalPrice || 0;
  const upiId = location.state?.upiId || '';

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
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    // Open Razorpay.me payment link
    window.open('https://razorpay.me/@Shopprime', '_blank');
  };

  const handleConfirmPayment = () => {
    // Mark as paid and redirect to confirmation
    setPaymentStatus('paid');
    setTimeout(() => {
      navigate(`/order-confirmation/${id}`);
    }, 1500);
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

        {/* Payment Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Instructions</h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Click the "Pay Now" button below</li>
            <li>You will be redirected to Razorpay secure payment page</li>
            <li>Enter amount: <strong>₹{totalPrice.toFixed(2)}</strong></li>
            <li>Complete payment using UPI, Card, or Net Banking</li>
            <li>Return here and click "I've Paid"</li>
          </ol>
        </div>

        {/* Pay Now Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            Pay Now <FiExternalLink />
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Opens Razorpay.me/@Shopprime in new tab
          </p>
        </div>

        {/* Confirm Payment Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 mb-4 text-center">
            After completing payment on Razorpay, click below:
          </p>
          <button
            onClick={handleConfirmPayment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            I've Completed the Payment
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Secure Payment</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Powered by Razorpay</li>
            <li>256-bit SSL encryption</li>
            <li>PCI DSS compliant</li>
            <li>All major UPI apps supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;
