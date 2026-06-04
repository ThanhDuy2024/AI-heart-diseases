const route = require("express").Router();
const usersController = require("../controllers/users.controller");
const middleware = require("../middlewares/users.middleware");

route.post("/login", usersController.loginController);
route.post("/register", usersController.registerController);
route.get("/profile", middleware, usersController.profileController);
module.exports = route;