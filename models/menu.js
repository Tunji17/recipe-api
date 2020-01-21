const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: String,
  ingredients: [],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
}, { timestamps: true });

MenuSchema.index({
  _id: 1,
  name: 1,
});

// MenuSchema.statics.findAdminSongs = function AdminSongs(songid) {
//   return this.find({ songid, isAdminSong: true });
// };

// MenuSchema.statics.findNonAdminSongs = function nonAdminSongs(songid) {
//   return this.find({ songid, isAdminSong: false });
// };

module.exports = mongoose.model('Menu', MenuSchema);
