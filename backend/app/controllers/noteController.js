const Note = require("../db/models/Note");

class NoteController {
  async getAllNotes(req, res) {
    const data = await Note.find({});

    res.status(200).json(data);
  }

  async getNote(req, res) {
    const { id } = req.params;
    let note;

    try {
      note = await Note.findOne({ _id: id });
    } catch (error) {
      if (error.name === "CastError") {
        error.message = "Note not found!"; // todo: move to user model
      }
      return res.status(404).json({ message: error.message });
    }

    res.status(200).json(note);
  }

  async saveNote(req, res) {
    const { title, body } = req.body;
    let newNote;

    try {
      newNote = new Note({ title, body });
      await newNote.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }

    res.status(201).json(newNote);
  }

  async updateNote(req, res) {
    const { id } = req.params;
    const { title, body } = req.body;

    const note = await Note.findOne({ _id: id });
    note.title = title;
    note.body = body;
    await note.save();

    res.status(201).json(note);
  }

  async deleteNote(req, res) {
    const { id } = req.params;

    await Note.deleteOne({ _id: id });

    res.status(204).send();
  }
}

module.exports = new NoteController();
