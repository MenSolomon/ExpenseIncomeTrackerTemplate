const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs"); // this reads information in a specific directory
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

// midllewares
app.use(express.json());
app.use(cors());

// routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();

//
