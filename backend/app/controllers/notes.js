const Note = require("../db/models/Note");
module.exports = {
  showAllNotes(req, res) {
    res.send("Notes list");
  },

  saveNote(req, res) {
    const newNote = new Note({
      title: "Test note",
      body: "Lorem ipsum dolor sit amet",
    });

    newNote.save().then(() => {
      console.log("Note saved");
    });
  },
};
