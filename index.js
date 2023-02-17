const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());

const port = process.env.PORT || 2010;
console.log(port);

const root = require("./routes/root");
app.use("/", root);

app.listen(port, () => {
  console.log("server is running on" + port);
});
