const joi = require('@hapi/joi');


const readOne = {
  params: {
    categoryId: joi.string().required(),
  }
};


const remove = {
  params: {
    categoryId: joi.string().required(),
  }
};

module.exports = {
  readOne,
  remove,
};