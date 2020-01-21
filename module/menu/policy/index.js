const joi = require('@hapi/joi');

const create = {
  body: {
    name: joi.string().required().min(3).max(30),
    ingredients: joi.string().required().min(3).max(30),
    category: joi.string().required().min(3).max(100),
  }
};

const read = {
  query: {
    page: joi.number(),
    limit: joi.number().max(100),
  },
  params: {
    companyId: joi.string().required(),
  }
};

const readOne = {
  params: {
    companyId: joi.string().required(),
    projectId: joi.string().required(),
  }
};


const update = {
  body: {
    name: joi.string().min(3).max(30).optional(),
    status: joi.string().optional(),
    description: joi.string().min(3).max(100).optional(),
    repository: joi.string().optional().min(3).max(100),
    assets: joi.string().optional().min(3).max(100),
    startDate: joi.date().optional(),
    endDate: joi.date().optional(),
  },
  params: {
    companyId: joi.string().required(),
    projectId: joi.string().required(),
  }
};

const remove = {
  params: {
    companyId: joi.string().required(),
    projectId: joi.string().required(),
  }
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};