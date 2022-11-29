const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, default: 'admin', required: true },
  email: { type: String, default: 'abc@gmail.com',  },
  numberPhone: { type: String, default: 'Binh Duong'},
  birthDay: { type: String, default: '01/01/2001'},
  gender: { type: String, default: 'Binh Duong'},
  userType: { type: Number, default: 0},
  image: { type: String, default: ""},
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('userModel', userModel);