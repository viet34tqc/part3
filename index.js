// Lấy giá trị biến từ file .env
require('dotenv').config();

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('build'));

const Note = require('./models/note');

app.get('/api', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes.map(note => note.toJSON()));
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(note => {
      res.status(200).end();
    })
    .catch(error => next(error));
});

// Tạo note
app.post('/api/notes', (req, res, next) => {
  const { body } = req;

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      res.json(savedAndFormattedNote);
    })
    .catch(error => next(error));
});

// Update note
app.put('/api/notes/:id', (req, res, next) => {
  const { body } = req;

  const note = {
    content: body.content,
    important: body.important,
  };
  console.log(body);

  // Thêm new: true để updatedNote lấy giá trị update
  // Nếu không, mặc định updatedNote sẽ lấy giá trị ban đầu.
  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformated id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
