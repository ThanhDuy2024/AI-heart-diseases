const route = require("express").Router();
const predictController = require("../controllers/predicts.controller");
const middleware = require("../middlewares/users.middleware");

route.post("/predict", middleware, predictController.predictController);
module.exports = route;