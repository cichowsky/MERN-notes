const Note = require("../db/models/Note");

class NoteController {
  async getAllNotes(req, res) {
    const { user_id } = req.data; // from authMiddleware
    const data = await Note.find({ _author_id: user_id });

    res.status(200).json(data);
  }

  async getNote(req, res) {
    const { id } = req.params;
    let note;

    try {
      note = await Note.findOne({ _id: id });
      if (!note) return res.status(404).json({ message: "Note not found!" });
    } catch (error) {
      if (error.name === "CastError") {
        error.message = "Note not found!"; // todo: move to user model
      }
      return res.status(404).json({ message: error.message });
    }

    res.status(200).json(note);
  }

  async saveNote(req, res) {
    const { user_id } = req.data; // from authMiddleware
    const { title, body } = req.body;

    let newNote;

    try {
      newNote = new Note({ _author_id: user_id, title, body });
      await newNote.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }

    res.status(201).json(newNote);
  }

  async updateNote(req, res) {
    const { user_id } = req.data; // from authMiddleware
    const { id } = req.params;
    const { title, body } = req.body;

    const note = await Note.findOne({ _id: id });

    if (note._author_id.toString() !== user_id) {
      return res.status(403).json("Author of the note is not valid!");
    }

    note._author_id = user_id;
    note.title = title;
    note.body = body;

    await note.save();

    res.status(201).json(note);
  }

  async deleteNote(req, res) {
    const { user_id } = req.data; // from authMiddleware
    const { id } = req.params;

    const note = await Note.findOne({ _id: id });

    if (note._author_id.toString() !== user_id) {
      return res.status(403).json("Author of the note is not valid!");
    }

    await note.remove();

    res.status(204).send();
  }
}

module.exports = new NoteController();
