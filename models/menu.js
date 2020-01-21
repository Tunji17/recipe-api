const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: String,
  ingredients: [],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  deletedAt: Date,
}, { timestamps: true });

MenuSchema.index({
  _id: 1,
  name: 1,
});

MenuSchema.statics.findByMenuId = function findmenu(id) {
  return this.findOne({ _id: id, deletedAt: null });
};

module.exports = mongoose.model('Menu', MenuSchema);
