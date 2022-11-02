const express = require("express");
const cors = require("cors");

const server = express();
const port = 8180;

server.use(cors());

server.use(express.json());
server.use("/", require("./produtosRoute"));

server.listen(port, () => {
  console.log("listening on port " + port);
});