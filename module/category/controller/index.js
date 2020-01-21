const mongoose = require('mongoose');
const { sendJSONResponse } = require('../../../helpers');

const Category = mongoose.model('Category');
const Menu = mongoose.model('Menu');

const read = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skip = (page * limit) - limit;

  const categoryPromise = Category
    .find({ deletedAt: null })
    .populate({
      path: 'menuItems',
      model: 'Menu',
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const countPromise = Category.find({ deletedAt: null }).count();

  const [category, count] = await Promise.all([categoryPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  return sendJSONResponse(
    res,
    200,
    {
      category, page, pages, count
    },
    req.method,
    'All categories fetched',
  );
};

const readOne = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category
    .findByCategoryId(categoryId)
    .populate({
      path: 'menuItems',
      model: 'Menu',
    });

  if (!category) {
    return sendJSONResponse(res, 404, null, req.method, 'Category not found');
  }
  return sendJSONResponse(res, 200, category, req.method, 'Category found');
};

const remove = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findByCategoryId(categoryId);

  if (!category) {
    return sendJSONResponse(res, 404, null, req.method, 'Category not found');
  }

  category.deletedAt = new Date();

  await category.save();

  return sendJSONResponse(res, 200, null, req.method, 'Category deleted');
};

module.exports = {
  read,
  readOne,
  remove,
};