import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [5000, 'Description cannot be more than 5000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    maxlength: [8, 'Price cannot be more than 8 digits'],
  },
  discountPrice: {
    type: Number,
    maxlength: [8, 'Discount price cannot be more than 8 digits'],
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide product category'],
  },
  subCategory: {
    type: String,
    default: '',
  },
  brand: {
    type: String,
    default: 'Generic',
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    maxlength: [5, 'Stock cannot be more than 5 digits'],
    default: 1,
  },
  sold: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  features: [String],
  specifications: {
    type: Map,
    of: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

export default mongoose.model('Product', productSchema);

