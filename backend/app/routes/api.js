const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.get("/notes", noteController.getAllNotes);
router.get("/notes/:id", noteController.getNote);
router.post("/notes", noteController.saveNote);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
