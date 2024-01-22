const mongoose = require('mongoose');
const ordersSchema = new mongoose.Schema({

  orderNumber: {
    type: String, required: true,
  }, senderId: {
    type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User'

  }, receiverId: {
    type: mongoose.Schema.Types.ObjectId, required: false, ref: 'User'
  }, title: {
    type: String, required: true,
  },

  tableData: {
    type: [Object], // Define the field as an array of objects
    default: [],    // Provide a default empty array
  },

  fileName: {
    type: String,
  }, fileUrl: {
    type: String,
  }, description: {
    type: String,
  },

  totalPrice: {
    type: String,
  }
});

module.exports = mongoose.model('orders', ordersSchema)