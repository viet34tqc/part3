require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Lấy giá trị module.export từ file /models/Person
const Person = require("./models/Person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      // Không có person ở đây là id đúng format nhưng không tìm thấy
      if (!person) {
        res.status(404).end();
      } else {
        res.json(person.toJSON());
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  if (body === undefined) {
    return res.status(400).json({ error: "invalid submitted data" });
  }

  const person = {
    name: body.name,
    phone: body.phone
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.get("/info", (req, res) => {
  const message = `
    Phonebook has info of ${phonebooks.length} people
    ${new Date()}
  `;
  res.send(message);
});

const isDuplicate = name => {
  const isDuplicate = Person.find({}).then(persons =>
    persons.some(contact => contact.name.indexOf(name) !== -1)
  );
  return isDuplicate;
};

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    phone: body.phone
  });
  person
    .save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  // CastError is invalid object id.
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
