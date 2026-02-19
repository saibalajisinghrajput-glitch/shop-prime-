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

        {/* QR Code Payment - For Desktop Users */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-sm p-6 mb-6 border-2 border-purple-200">
          <h3 className="font-bold text-gray-800 mb-4 text-center text-lg">Scan QR Code to Pay</h3>
          
          <div className="bg-white rounded-lg p-4 mb-4 text-center border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Scan with any UPI app (PhonePe, GPay, Paytm)</p>
            <img 
              src="/qrcode.jpeg" 
              alt="Payment QR Code" 
              className="w-48 h-48 mx-auto object-contain border-2 border-gray-200 rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-2">QR Code for ₹{totalPrice.toFixed(2)}</p>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
            <p className="text-center text-sm text-gray-700 mb-2">Amount to Pay:</p>
            <p className="text-center text-3xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</p>
          </div>

          <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside bg-white rounded-lg p-4">
            <li>Open your UPI app (PhonePe, GPay, Paytm, etc.)</li>
            <li>Scan the QR code above</li>
            <li>Verify the amount: <strong>₹{totalPrice.toFixed(2)}</strong></li>
            <li>Complete the payment</li>
            <li>Return here and click "I've Paid" below</li>
          </ol>
        </div>

        {/* Razorpay.me Link - For Mobile Users */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm p-6 mb-6 border-2 border-green-200">
          <h3 className="font-bold text-gray-800 mb-4 text-center text-lg">Or Pay via Razorpay Link</h3>
          
          <div className="bg-white rounded-lg p-4 mb-4 text-center border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Your Payment Link:</p>
            <a 
              href="https://razorpay.me/@Shopprime"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 font-bold text-lg hover:underline break-all"
            >
              razorpay.me/@Shopprime
            </a>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
            <p className="text-center text-sm text-gray-700 mb-2">Enter this exact amount:</p>
            <p className="text-center text-3xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</p>
          </div>

          <ol className="text-sm text-gray-700 space-y-3 list-decimal list-inside bg-white rounded-lg p-4">
            <li>Click the link above on your mobile</li>
            <li>Enter the amount shown above</li>
            <li>Complete payment using UPI/Card/Net Banking</li>
            <li>Return here and click "I've Paid" below</li>
          </ol>
        </div>

        {/* Pay Now Button */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <a
            href="https://razorpay.me/@Shopprime"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 block text-center"
          >
            Pay on Razorpay.me <FiExternalLink />
          </a>
          <p className="text-center text-sm text-gray-500 mt-4">
            Enter amount: ₹{totalPrice.toFixed(2)}
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
