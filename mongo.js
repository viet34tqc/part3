const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0-clcwl.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const contact = new Phonebook({
  name,
  phone
});

/* contact.save().then(result => {
  console.log(`added ${name} number ${phone} to phonebook`);
  mongoose.connection.close();
});
 */
Phonebook.find({}).then(result => {
  console.log('phonebook:');
  result.forEach(contact => {
    console.log( `${contact.name}: ${contact.phone}` );
  });
  mongoose.connection.close();
});
