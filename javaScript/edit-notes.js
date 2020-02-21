"use strict";

const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeButton = document.querySelector("#remove-note");
const addNoteButton = document.querySelector("#addNote");
const dateElement = document.querySelector("#last-edited");
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

//check if there is an existing note

if (!note) {
  location.assign("./index.html");
}

//populate note title and body
titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited();

titleElement.addEventListener("input", e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited();
  saveNotes(notes);
});

bodyElement.addEventListener("input", e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited();
  saveNotes(notes);
});

removeButton.addEventListener("click", e => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("./index.html");
});

addNoteButton.addEventListener("click", e => {
  location.assign("./index.html");
});

//save note title and body to local storage
window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);

    note = notes.find(note => {
      return note.id === noteId;
    });

    //check if there is an existing note

    if (!note) {
      location.assign("./index.html");
    }

    //populate note title and body
    titleElement.value = note.title;
    bodyElement.value = note.body;
    dateElement.textContent = generateLastEdited();
  }
});
