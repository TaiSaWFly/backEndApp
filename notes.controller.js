const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreenBright("Node was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNoteById(id) {
  const notes = await getNotes();
  const findIndexNote = notes.findIndex((note) => Number(note.id) === id);

  if (findIndexNote !== -1) {
    const notesWithRemovedId = notes.filter((note) => Number(note.id) !== id);
    await fs.writeFile(notesPath, JSON.stringify(notesWithRemovedId));
    console.log(chalk.bgRedBright(`Note id:${id} was removed!`));
  } else {
    console.log(chalk.bgRed(`Note id:${id} not found!`));
  }
}

async function printNones() {
  const notes = await getNotes();

  console.log(chalk.bgBlueBright("Here is the list of notes:"));
  notes.forEach((note) =>
    console.log(chalk.bgCyanBright(note.id), chalk.bgBlue(note.title))
  );
}

module.exports = {
  addNote,
  removeNoteById,
  printNones,
};
