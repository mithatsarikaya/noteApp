const notes = document.querySelectorAll(".note");

//add 'selectedNote' style to the div, if not selected then remove it
const addOrRemoveSelectedNoteClass = (selectedNote, selectedUniqueClass) => {
  notes.forEach((n) => {
    //classList[1] has unique value to find the selected class
    Array.from(n.classList).includes(selectedUniqueClass)
      ? n.classList.add("selected--note")
      : n.classList.remove("selected--note");
  });
};

//when user click note to edit, show user to the right text area
const getSelectedTextAreaToTheScreen = (textareas, selectedUniqueClass) => {
  for (let i = 0; i < textareas.length; i++) {
    const t = textareas[i];
    //textarea class example is "n1text"
    Array.from(t.classList)[0].slice(0, 2).includes(selectedUniqueClass)
      ? (t.style.display = "block")
      : (t.style.display = "none");
  }
};

const textareas = document.getElementsByTagName("textarea");
// console.log(textareas);
// console.log(notes);

//when any note click, find it and show it to user
notes.forEach((note) => {
  note.addEventListener("click", (e) => {
    let selectedNote = e.target;
    let selectedUniqueClass = e.target.classList[1];

    addOrRemoveSelectedNoteClass(selectedNote, selectedUniqueClass);

    getSelectedTextAreaToTheScreen(textareas, selectedUniqueClass);
  });
});

const addNotesBtn = document.querySelector(".header--button");
