const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModel = new Schema({
  name: { type: String, default: 'hugoaudio' },
  genre: { type: String, default: 'Pop' },
  description: { type: String, default: 'hugoaudio pop' },
  duration: { type: String, default: '01/01/2022' },
  albumId: { type: String, default: "" },
  userId: { type: String, default: "" },
  productType: { type: Number, default: 0 },
  image: { type: String, default: "" },
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('productModel', productModel);