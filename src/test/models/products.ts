const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'productGroup'

  },
  description: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    defaultValue: 1
  },
  price: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('products', productsSchema)