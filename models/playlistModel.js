const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistModel = new Schema({
  name: { type: String, default: 'Playlist' },
  userId: { type: String, default: "" },
  playlistType: { type: Number, default: 0 },
  image: { type: String, default: "" },
  //updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('playlistModel', playlistModel);