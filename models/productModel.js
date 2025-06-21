const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 1,
    },
    category: String,
    images: [String], // array of image URLs, later we use AWS to store images 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
