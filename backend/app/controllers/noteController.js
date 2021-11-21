const Note = require("../db/models/Note");

class NoteController {
  getAllNotes(req, res) {
    res.send("Notes list");
  }

  getNote(req, res) {
    const { id } = req.params;
    res.send(`Note ID: ${id}`);
  }

  saveNote(req, res) {
    const { title, body } = req.body;
    console.log(title, body);

    const newNote = new Note({
      title: "Test note",
      body: "Lorem ipsum dolor sit amet",
    });

    newNote.save();
    res.send("Note saved");
  }

  updateNote(req, res) {
    const { id } = req.params;
    res.send(`Note ID: ${id} updated`);
  }

  deleteNote(req, res) {
    const { id } = req.params;
    res.send(`Note ID: ${id} deleted`);
  }
}

module.exports = new NoteController();
