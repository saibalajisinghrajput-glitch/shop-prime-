import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
export const createRazorpayOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${orderId}`,
      notes: {
        orderId: orderId,
        userId: req.user.id,
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
    });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Update order status
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.paymentInfo = {
      id: razorpay_payment_id,
      status: 'paid',
      paidAt: Date.now(),
    };
    order.orderStatus = 'processing';

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};

// @desc    Get Razorpay key
// @route   GET /api/payment/key
// @access  Public
export const getRazorpayKey = async (req, res) => {
  res.status(200).json({
    key_id: process.env.RAZORPAY_KEY_ID,
  });
};
