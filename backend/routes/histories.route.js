const route = require("express").Router();
const historiesController = require("../controllers/histories.controller");
const middleware = require("../middlewares/users.middleware");

route.get("/list", middleware, historiesController.historyController);
module.exports = route;