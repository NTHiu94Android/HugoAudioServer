const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: { type: String,  default: 'admin', require: true, unique: true },
  password: { type: String, default: 'admin', required: true },
  email: { type: String, default: 'abc@gmail.com',  },
  numberPhone: { type: String, default: 'TPHCM'},
  birthDay: { type: String, default: '01/01/2001'},
  gender: { type: String, default: 'Nam'},
  userType: { type: Number, default: 0},
  image: { type: String, default: "https://supercharge.info/images/avatar-placeholder.png"},
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('userModel', userModel);