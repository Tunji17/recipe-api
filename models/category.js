const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
}, { timestamps: true });

CategorySchema.index({
  _id: 1,
  name: 1,
});

// CategorySchema.statics.findAdminSongs = function AdminSongs(songid) {
//   return this.find({ songid, isAdminSong: true });
// };

// CategorySchema.statics.findNonAdminSongs = function nonAdminSongs(songid) {
//   return this.find({ songid, isAdminSong: false });
// };

module.exports = mongoose.model('Category', CategorySchema);