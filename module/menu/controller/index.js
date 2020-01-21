const mongoose = require('mongoose');
const { sendJSONResponse } = require('../../../helpers');

const Category = mongoose.model('Category');
const Menu = mongoose.model('Menu');


const create = async (req, res) => {
  const { name, ingredients, category } = req.body;
  const categorymodel = new Category();
  const menu = new Menu();

 const categoryExists = await Category.findOne({ name: category.toLowerCase()});
 console.log(categoryExists);

 if (categoryExists) {
  menu.name = name;
  menu.ingredients = ingredients;
  menu.category = categoryExists._id;
  const newmenu = await menu.save();

  await Category.update(
    { _id: categoryExists._id },
    { $push: { menuItems: newmenu._id } }
  );
  return sendJSONResponse(res, 200, menu, req.method, 'Menu created successfully');
 }

 categorymodel.name = category.toLowerCase();
 const newCategory = await categorymodel.save();
 console.log(newCategory);

 menu.name = name;
 menu.ingredients = ingredients;
 menu.category = newCategory._id;
 const newMenuItem = await menu.save();
 console.log(newMenuItem);
 
 await Category.update(
  { _id: newCategory._id },
  { $push: { menuItems: newMenuItem._id } }
);

 return sendJSONResponse(res, 200, menu, req.method, 'Menu created successfully');
};

const read = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const skip = (page * limit) - limit;

  const menuPromise = Menu
    .find({ deletedAt: null })
    .populate({
      path: 'category',
      model: 'Category',
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const countPromise = Menu.find({ deletedAt: null }).count();

  const [menu, count] = await Promise.all([menuPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  return sendJSONResponse(
    res,
    200,
    {
      menu, page, pages, count
    },
    req.method,
    'ALL Menu items fetched',
  );
};

const readOne = async (req, res) => {
  const { menuId } = req.params;

  const menu = await Menu
    .findByMenuId(menuId)
    .populate({
      path: 'category',
      model: 'Category',
    });

  if (!menu) {
    return sendJSONResponse(res, 404, null, req.method, 'Menu Item not found');
  }
  return sendJSONResponse(res, 200, menu, req.method, 'Menu Item found');
};

const update = async (req, res) => {
  const { name, ingredients } = req.body;

  const { menuId } = req.params;

  const menu = await Menu.findByMenuId(menuId);

  if (!menu) {
    return sendJSONResponse(res, 404, null, req.method, 'Menu Item not found');
  }

  if (name) {
    menu.name = name;
  }
  if (ingredients) {
    menu.ingredients = ingredients;
  }
  await menu.save();

  return sendJSONResponse(res, 200, menu, req.method, 'Menu Item updated');
};

const remove = async (req, res) => {
  const { menuId } = req.params;

  const menu = await Menu.findByMenuId(menuId);


  if (!menu) {
    return sendJSONResponse(res, 404, null, req.method, 'Menu Item not found');
  }

  menu.deletedAt = new Date();

  await menu.save();

  return sendJSONResponse(res, 200, null, req.method, 'Menu Item deleted');
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};