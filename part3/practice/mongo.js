const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongos.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://oscar:${password}@cluster0.qs0uv.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

Note.find({ important: true }).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
