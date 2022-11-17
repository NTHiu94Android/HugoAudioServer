const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumModel = new Schema({
  name: { type: String, default: '' },
  genre: { type: String, default: ''},
  releaseDate: { type: Date, default: Date.now() },
  userId: {type: String, default: ''},
  image: { type: String, default: ''},
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('albumModel', albumModel);