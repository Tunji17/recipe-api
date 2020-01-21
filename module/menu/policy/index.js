const joi = require('@hapi/joi');

const create = {
  body: {
    name: joi.string().required().min(3).max(30),
    ingredients: joi.array().items(joi.string()).required(),
    category: joi.string().required().min(3).max(100),
  }
};

const readOne = {
  params: {
    menuId: joi.string().required(),
  }
};


const update = {
  body: {
    name: joi.string().required().min(3).max(30),
    ingredients: joi.array().items(joi.string()).required(),
  },
  params: {
    menuId: joi.string().required(),
  }
};

const remove = {
  params: {
    menuId: joi.string().required(),
  }
};

module.exports = {
  create,
  readOne,
  update,
  remove,
};