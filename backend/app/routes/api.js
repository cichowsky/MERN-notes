const express = require("express");
const router = express.Router();
const actions = require("../controllers/notes");

router.get("/", actions.showAllNotes);

module.exports = router;
