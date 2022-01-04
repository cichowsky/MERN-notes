const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const noteController = require("../controllers/noteController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.post("/user/refresh", userController.refresh);
router.delete("/user/logout", userController.logout);

router.get("/notes", authMiddleware, noteController.getAllNotes);
router.get("/notes/:id", noteController.getNote);
router.post("/notes", authMiddleware, noteController.saveNote);
router.put("/notes/:id", authMiddleware, noteController.updateNote);
router.delete("/notes/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
