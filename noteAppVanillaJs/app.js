const noNoteScreen = document.querySelector(".ifNoNote");
const noteScreen = document.querySelector(".mainPage");
const textareas = document.getElementsByTagName("textarea");

const notesHeaderDiv = document.querySelector(".notes");
const notesArticle = document.querySelector("article");

let firstNoteHeader = '<div class="note n1">Note 1</div>';
let firstNote =
  '<textarea class="n1text" name="" id="" cols="30" rows="20">1</textarea>';
// // localStorage.setItem("data", "how u doin");
// get data
//if no data then "let user create his first page", if data then "let user see his note" page

//when user click note to edit, show user to the right text area
const getSelectedTextAreaToTheScreen = (textareas, selectedUniqueClass) => {
  console.log("getSelectedTextAreaToTheScreen");
  for (let i = 0; i < textareas.length; i++) {
    const t = textareas[i];
    //textarea class example is "n1text"
    Array.from(t.classList)[0].slice(0, 2).includes(selectedUniqueClass)
      ? (t.style.display = "block")
      : (t.style.display = "none");
  }
};

const addFirstNoteHeaderAndText = () => {
  //after creating first note, adding to the page
  notesHeaderDiv.innerHTML = firstNoteHeader;
  notesArticle.innerHTML = firstNote;

  //make first noteheader selected
  //make dota 2 great again
  document.querySelector(".note").classList.add("selected--note");
  getSelectedTextAreaToTheScreen(textareas, (selectedUniqueClass = "n1"));
};

const showMainPageIfHasData = () => {
  let data = localStorage.getItem("data");
  data
    ? ((noteScreen.style.display = "flex"),
      (noNoteScreen.style.display = "none"))
    : ((noNoteScreen.style.display = "flex"),
      (noteScreen.style.display = "none"));

  addFirstNoteHeaderAndText();
};
showMainPageIfHasData();

const createFirstNoteBtn = document.querySelector(".ifNoNote--button");
createFirstNoteBtn.addEventListener("click", () => {
  let noteData = [{ id: 1, note: "Note 1" }];
  localStorage.setItem("data", JSON.stringify(noteData));
  showMainPageIfHasData();

  //after creating first note, adding to the page
  notesHeaderDiv.innerHTML = firstNoteHeader;
  notesArticle.innerHTML = firstNote;

  //make first noteheader selected
  //make dota 2 great again
  document.querySelector(".note").classList.add("selected--note");
  addFirstNoteHeaderAndText();
});

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

addNotesBtn.addEventListener("click", () => {
  console.log("will be here soon");
});
