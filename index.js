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

let phonebooks = [
  { name: "Arto Hellas", phone: "040-123456", id: 1 },
  { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 }
];

app.get("/api/persons", (req, res) => {
  res.json(phonebooks);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = phonebooks.find(contact => contact.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebooks = phonebooks.filter(contact => contact.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const message = `
    Phonebook has info of ${phonebooks.length} people
    ${new Date()}
  `;
  res.send(message);
});

const getRand = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const isDuplicate = name => {
  return phonebooks.some(contact => {
    return contact.name.indexOf(name) !== -1;
  });
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  let error = "";
  if (!body.name) {
    error = "Name missing";
  } else if (!body.phone) {
    error = "Phone missing";
  } else if (isDuplicate(body.name)) {
    error = "name must be unique";
  }

  if (error) {
    return res.status(400).json({
      error
    });
  }
  const contact = {
    name: body.name,
    phone: body.phone,
    id: getRand(100)
  };
  phonebooks = phonebooks.concat(contact);

  res.json(contact);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
