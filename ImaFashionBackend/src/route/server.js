require("dotenv").config();
console.log(process.env);

const express = require("express");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 8180;

server.use(cors());

server.use(express.json());
server.use("/", require("./produtosRoute"));

server.listen(port, () => {
  console.log("listening on port " + port);
});
