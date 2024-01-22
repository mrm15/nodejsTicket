const mongoose = require('mongoose');
const unitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('units', unitsSchema)