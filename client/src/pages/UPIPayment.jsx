import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FiSmartphone, FiCheckCircle, FiCopy, FiExternalLink, FiRefreshCw, FiCreditCard } from 'react-icons/fi';
import { getOrder } from '../api';

const UPIPayment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [copied, setCopied] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  
  // Get UPI details from location state or use defaults
  const upiId = location.state?.upiId || 'shopprime@upi';
  const totalPrice = location.state?.totalPrice || 0;

  // Generate UPI deep link - customer pays to merchant's UPI ID
  const generateUPILink = () => {
    // Merchant's UPI ID (where payments will be received)
    const merchantUpiId = 'saibalajisinghrajput@oksbi';
    const amount = totalPrice.toFixed(2);
    const note = `Order #${id?.slice(-6)}`;
    
    // UPI deep link format
    const upiLink = `upi://pay?pa=${merchantUpiId}&pn=ShopPrime%20Payment&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
    return upiLink;
  };

  // Generate QR code URL using GoQR API
  const generateQRCodeUrl = () => {
    const upiLink = encodeURIComponent(generateUPILink());
    return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${upiLink}&bgcolor=ffffff&color=000000`;
  };

  // Auto-refresh to check for payment status
  useEffect(() => {
    fetchOrder();
    
    // Poll for payment status every 3 seconds
    const interval = setInterval(() => {
      if (paymentStatus === 'pending') {
        checkPaymentStatus();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [id, paymentStatus]);

  const checkPaymentStatus = async () => {
    try {
      const { data } = await getOrder(id);
      if (data.order?.paymentInfo?.status === 'paid') {
        setPaymentStatus('paid');
        navigate(`/order-confirmation/${id}`);
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

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

  const handleCopyUPI = () => {
    const upiLink = generateUPILink();
    navigator.clipboard.writeText(upiLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUPIApp = () => {
    const upiLink = generateUPILink();
    window.location.href = upiLink;
  };

  const handleSimulatePayment = () => {
    // For demo purposes - simulate successful payment
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('paid');
      navigate(`/order-confirmation/${id}`);
    }, 2000);
  };

  const handleQRScanned = () => {
    setScanCount(prev => prev + 1);
    // Auto-trigger payment simulation when QR is "scanned"
    if (scanCount === 0) {
      handleSimulatePayment();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (paymentStatus === 'paid' || paymentStatus === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 text-center">
          {paymentStatus === 'processing' ? (
            <>
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold mb-2">Processing Payment...</h1>
              <p className="text-gray-600">Please wait while we confirm your payment.</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
              <Link to={`/order-confirmation/${id}`} className="btn-primary px-6 py-3 inline-block">
                View Order Details
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCreditCard className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Scan & Pay</h1>
          <p className="text-gray-600 mt-2">Scan the QR code with any UPI app to pay</p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium">#{id?.slice(-6)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Amount to Pay</span>
            <span className="text-2xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pay To</span>
            <span className="font-medium text-sm">saibalajisinghrajput@oksbi</span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <h2 className="text-lg font-semibold mb-4">Scan this QR Code</h2>
          
          <div className="relative inline-block">
            <img 
              src={generateQRCodeUrl()} 
              alt="UPI QR Code" 
              className="w-64 h-64 mx-auto border-2 border-gray-200 rounded-lg"
              onLoad={handleQRScanned}
            />
            {/* Scanning animation overlay */}
            <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse opacity-50"></div>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Open any UPI app (Google Pay, PhonePe, Paytm, BHIM) and scan this QR code
          </p>
        </div>

        {/* Payment Options */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Or Pay Using</h2>
          
          {/* Option 1: Open UPI App */}
          <button
            onClick={handleOpenUPIApp}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3 rounded-lg mb-4 hover:bg-primary-700 transition-colors"
          >
            <FiExternalLink className="w-5 h-5" />
            Open UPI App
          </button>

          {/* Option 2: Copy UPI Link */}
          <button
            onClick={handleCopyUPI}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg mb-4 hover:bg-gray-50 transition-colors"
          >
            <FiCopy className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy UPI Link'}
          </button>

          {/* Option 3: Simulate Payment (Demo) */}
          <button
            onClick={handleSimulatePayment}
            className="w-full flex items-center justify-center gap-2 border border-green-300 text-green-600 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            <FiRefreshCw className="w-5 h-5" />
            Simulate Successful Payment
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">How to Pay:</h3>
          <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
            <li>Open your UPI app (GPay, PhonePe, Paytm, etc.)</li>
            <li>Scan the QR code above</li>
            <li>Verify the amount (₹{totalPrice.toFixed(2)})</li>
            <li>Complete the payment</li>
            <li>Page will auto-refresh to confirm payment</li>
          </ol>
        </div>

        {/* Cancel Link */}
        <div className="mt-6 text-center">
          <Link to="/checkout" className="text-gray-500 hover:text-gray-700">
            Cancel and go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UPIPayment;

