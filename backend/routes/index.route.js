const route = require("express").Router();
const usersRoute = require("./users.route");
const predictRoute = require("./predicts.route");
const chatboxRoute = require("./chatbox.route");

route.use("/users", usersRoute);
route.use("/ai", predictRoute);
route.use("/chatbox", chatboxRoute);
module.exports = route;