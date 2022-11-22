const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistDetailModel = new Schema({
  playlistId: { type: String },
  productId: { type: String },
  creationDate: { type: Date, default: Date.now },
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('playlistProductModel', playlistDetailModel);