const route = require("express").Router();
const usersController = require("../controllers/users.controller");

route.post("/login", usersController.loginController);
route.post("/register", usersController.registerController);
route.get("/profile", usersController.profileController);
module.exports = route;