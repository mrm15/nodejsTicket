const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: false
  },
  roles: {
    User: {
      type: Number,
      default: 2001
    },
    Editor: Number,//5150
    Admin: Number//1984
  },
  password: {
    type: String,
    required: false
  },
  refreshToken: [String],
  phoneNumber: {
    type: String,
    required: true
  },
  lastLoginDate: {
    type: String,
    required: false
  },
  isRegister: {
    type: Boolean,
    required: false,
    default: false
  },
  loginCode: {
    type: String,
    required: false,
    default: "",
  },
  loginCodeSendDate: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  familyName: {
    type: String,
    required: false
  },
  createAt: {
    type: String,
    required: false
  },
  updateAt: {
    type: String,
    required: false,
    default: "0"
  }


});

module.exports = mongoose.model('User', userSchema);