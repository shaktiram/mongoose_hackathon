var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema= new Schema({
  title: String,
  actor: String,
  genre: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
