const personRouter = require("express").Router();

// Lấy giá trị module.export từ file /models/Person
const Person = require("../models/Person");

personRouter.get("/", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()));
  });
});

personRouter.get("/:id", (req, res, next) => {
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

personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

personRouter.put("/:id", (req, res, next) => {
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

personRouter.get("/info", (req, res) => {
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

personRouter.post("/", (req, res, next) => {
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

module.exports = personRouter;
