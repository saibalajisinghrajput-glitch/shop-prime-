import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('products.product', 'name price discountPrice images stock');

    if (!cart) {
      // Create new cart if doesn't exist
      cart = await Cart.create({ user: req.user.id, products: [] });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Product out of stock',
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, products: [] });
    }

    // Check if product already in cart
    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      // Update quantity
      cart.products[productIndex].quantity += quantity;
      cart.products[productIndex].stock = product.stock;
    } else {
      // Add new product
      cart.products.push({
        product: productId,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images[0]?.url || '',
        quantity,
        stock: product.stock,
      });
    }

    await cart.save();

    // Populate product details
    cart = await Cart.findOne({ user: req.user.id })
      .populate('products.product', 'name price discountPrice images stock');

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.productId
    );

    if (productIndex > -1) {
      // Check stock
      const product = await Product.findById(req.params.productId);
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Product out of stock',
        });
      }

      if (quantity <= 0) {
        // Remove item if quantity is 0
        cart.products.splice(productIndex, 1);
      } else {
        cart.products[productIndex].quantity = quantity;
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({ user: req.user.id })
      .populate('products.product', 'name price discountPrice images stock');

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user.id })
      .populate('products.product', 'name price discountPrice images stock');

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { products: [] }
    );

    res.json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

