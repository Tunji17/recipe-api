const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: String,
  menuItems: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Menu'
  }],
  deletedAt: Date,
}, { timestamps: true });

CategorySchema.index({
  _id: 1,
  name: 1,
});

CategorySchema.statics.findByCategoryId = function findcategory(id) {
  return this.findOne({ _id: id, deletedAt: null });
};

module.exports = mongoose.model('Category', CategorySchema);