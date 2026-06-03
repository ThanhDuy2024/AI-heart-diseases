const route = require("express").Router();
const usersRoute = require("./users.route");

route.use("/users", usersRoute);

module.exports = route;