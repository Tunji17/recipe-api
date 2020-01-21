const mongoose = require('mongoose');
const { sendJSONResponse } = require('../../../helpers');

const Category = mongoose.model('Category');
const Menu = mongoose.model('Menu');


const create = async (req, res) => {
  const { name, ingredients, category } = req.body;
  const categorymodel = new Category();
  const menu = new Menu();

 const categoryExists = await find({ name: category.tolower()});
 console.log(categoryExists);

 if (categoryExists) {
  menu.name = name;
  menu.ingredients = ingredients;
  menu.category = categoryExists._id;
  await menu.save();

  return sendJSONResponse(res, 200, menu, req.method, 'Menu created successfully');
 }

 categorymodel.name = category.tolower();
 const newCategory = await categorymodel.save();

 menu.name = name;
 menu.ingredients = ingredients;
 menu.category = newCategory._id;
 await menu.save();

 return sendJSONResponse(res, 200, menu, req.method, 'Menu created successfully');
};

const read = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const { companyId } = req.params;

  const userProjects = await Permission.findByOrganisation(companyId, req.decoded._id);

  if (!userProjects.length) {
    return sendJSONResponse(
      res,
      200,
      {
        projects: [],
        page: 1,
        pages: 1,
        count: 0
      }
    );
  }

  const projectIds = userProjects.map((project) => project.project);

  const skip = (page * limit) - limit;

  const projectPromise = Project
    .findByOrganisation(companyId, projectIds)
    .populate({
      path: 'organisation',
      populate: {
        path: 'members',
        select: 'name email photoUrl organisation',
        model: 'User',
      },
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const countPromise = Project.findByOrganisation(companyId, projectIds).count();

  const [projects, count] = await Promise.all([projectPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  return sendJSONResponse(
    res,
    200,
    {
      projects, page, pages, count
    },
    req.method,
    'Projects fetched',
  );
};

const readOne = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project
    .findByProjectId(projectId)
    .populate({
      path: 'manager',
      select: 'name email photoUrl organisation',
      model: 'User',
    });

  if (!project) {
    return sendJSONResponse(res, 404, null, req.method, 'Project not found');
  }

  return sendJSONResponse(res, 200, project, req.method, 'Project found');
};

const update = async (req, res) => {
  const {
    name,
    description,
    startDate,
    endDate,
    repository,
    assets,
    status,
  } = req.body;
  const { projectId } = req.params;

  const project = await Project.findByProjectId(projectId);

  if (!project) {
    return sendJSONResponse(res, 404, null, req.method, 'Project not found');
  }

  if (name) {
    project.name = name;
  }
  if (description) {
    project.description = description;
  }
  if (startDate) {
    project.startDate = startDate;
  }
  if (endDate) {
    project.endDate = endDate;
  }
  if (repository) {
    project.repository = repository;
  }
  if (assets) {
    project.assets = assets;
  }
  if (status && projectStatus[status]) {
    project.status = projectStatus[status];
  }

  await project.save();

  return sendJSONResponse(res, 200, project, req.method, 'Project updated');
};

const remove = async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findByProjectId(projectId);

  if (!project) {
    return sendJSONResponse(res, 404, null, req.method, 'Project not found');
  }

  project.deletedAt = new Date();

  await project.save();

  return sendJSONResponse(res, 200, null, req.method, 'Project deleted');
};

module.exports = {
  create,
  read,
  readOne,
  update,
  remove,
};