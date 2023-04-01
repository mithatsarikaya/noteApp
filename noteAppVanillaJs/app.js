const notes = document.querySelectorAll(".note");

//add 'selectedNote' style to the div, if not selected then remove it
const addOrRemoveSelectedNoteClass = (selectedNote) => {
  notes.forEach((n) => {
    Array.from(n.classList).includes(selectedNote.classList[1])
      ? n.classList.add("selected--note")
      : n.classList.remove("selected--note");
  });
};

//when any note click, find it and show it to user
notes.forEach((note) => {
  note.addEventListener("click", (e) => {
    let selectedNote = e.target;

    addOrRemoveSelectedNoteClass(selectedNote);
  });
});
