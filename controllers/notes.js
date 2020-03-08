// Sử dụng note Router để tách thành module
// const express = require('express)
// const notesRouter = express.Router();
const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });

  response.json(notes.map(note => note.toJSON()));
});
notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// Tạo note
notesRouter.post('/', async (request, response, next) => {
  const { body } = request;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  });
  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    // Lưu vào field notes của user
    await user.save();
    response.json(savedNote.toJSON());
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Update note
notesRouter.put('/:id', (request, response, next) => {
  const { body } = request;

  const note = {
    content: body.content,
    important: body.important,
  };

  // Thêm new: true để updatedNote lấy giá trị update
  // Nếu không, mặc định updatedNote sẽ lấy giá trị ban đầu.
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON());
    })
    .catch(error => next(error));
});

module.exports = notesRouter;
