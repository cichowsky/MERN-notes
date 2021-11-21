const express = require("express");
const app = express();
const { port } = require("./app/config");
const router = require("./app/routes/api");

// database
require("./app/db/mongoose");

// routes
app.use("/api", router);

// server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
