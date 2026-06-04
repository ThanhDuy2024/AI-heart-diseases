const express = require("express");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const indexRoute = require("./routes/index.route.js");
const connectDatabase = require("./configs/database.config.js");
const app = express();
const port = 4000;
connectDatabase.connectDatabase();
app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
