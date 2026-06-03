const express = require("express");
const cookieParser = require("cookie-parser");
const indexRoute = require("./routes/index.route.js");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
