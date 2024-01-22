const mongoose = require('mongoose');
const productGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('productGroup', productGroupSchema)