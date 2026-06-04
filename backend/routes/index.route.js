const route = require("express").Router();
const usersRoute = require("./users.route");
const predictRoute = require("./predicts.route");

route.use("/users", usersRoute);
route.use("/ai", predictRoute);
module.exports = route;