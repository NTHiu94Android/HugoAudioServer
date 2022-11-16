const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistDetailModel = new Schema({
  playlistId: { type: String },
  productId: { type: String },
  creationDate: { type: String, default: '01/01/2022' },
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('playlistDetailModel', playlistDetailModel);