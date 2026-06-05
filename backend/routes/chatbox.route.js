const route = require("express").Router();
const chatboxController = require("../controllers/chatbox.controller");
const middleware = require("../middlewares/users.middleware");

route.post("/", middleware, chatboxController.chatboxController);
module.exports = route;