const express = require("express");
const childrenRouter = express.Router();
const db = require("../config/database");
const debug = require("debug")("app:childrenRouter");
const ChildrenModel = require('../modules/ChildrenModel');
const childrenController = require('../controllers/childrenController')

function router(nav) {
  const { getIndex, getById, middleWare } = childrenController(nav);
  childrenRouter.use(middleWare);
  childrenRouter.route("/").get(getIndex);


  childrenRouter.use(middleWare);
  childrenRouter.route("/:id").get(getById);

  return childrenRouter;

}

module.exports = router;
