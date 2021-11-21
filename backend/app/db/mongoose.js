const mongoose = require("mongoose");
const { database } = require("../config");

// database connect
mongoose.connect(database, {});
