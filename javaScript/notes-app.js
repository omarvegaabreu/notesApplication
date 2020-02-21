"use strict";

let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

// renderNotes(notes, filters);

// @ts-ignore
document.querySelector("#create-note").addEventListener("click", function(e) {
  const id = uuidv4();
  const timeStamp = moment().valueOf();

  notes.push({
    // @ts-ignore
    id: id,
    title: "",
    body: "",
    createdAt: timeStamp,
    updatedAt: timeStamp
  });

  saveNotes(notes);
  // renderNotes(notes, filters);
  // location.hash(noteId);
  location.assign(`./edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", e => {
  // @ts-ignore
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", e => {
  if ((e.key = "notes")) {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
