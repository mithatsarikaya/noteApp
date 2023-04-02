const noNoteScreen = document.querySelector(".ifNoNote");
const noteScreen = document.querySelector(".mainPage");
let textareas = document.getElementsByTagName("textarea");
// const notes = document.querySelectorAll(".note");

const notesHeaderDiv = document.querySelector(".notes");
const notesArticle = document.querySelector("article");

let firstNoteHeader = '<div class="note n1">Note 1</div>';
let firstNote =
  '<textarea class="n1text" name="" id="" cols="30" rows="20"></textarea>';
// // localStorage.setItem("data", "how u doin");
// get data
//if no data then "let user create his first page", if data then "let user see his note" page

//when user click note to edit, show user to the right text area
const getSelectedTextAreaToTheScreen = (textareas, selectedUniqueClass) => {
  for (let i = 0; i < textareas.length; i++) {
    const t = textareas[i];

    //textarea class example is "n1text"
    Array.from(t.classList)[0].replace("text", "") === selectedUniqueClass
      ? (t.style.display = "block")
      : (t.style.display = "none");
  }
  // console.log(textareas);
  // console.log(selectedUniqueClass);
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

const refreshPageWhenAddedOrRemovedData = () => {
  let data = localStorage.getItem("data");
  // console.log(data);
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
  let noteData = [{ id: "Note 1", note: "" }];
  localStorage.setItem("data", JSON.stringify(noteData));

  //after creating first note, adding to the page
  notesHeaderDiv.innerHTML = firstNoteHeader;
  notesArticle.innerHTML = firstNote;

  showMainPageIfHasData();

  //make first noteheader selected
  //make dota 2 great again
  document.querySelector(".note").classList.add("selected--note");
  addFirstNoteHeaderAndText();

  getSelectedTextAreaToTheScreen(textareas, selectedUniqueClass);
});

//add 'selectedNote' style to the div, if not selected then remove it
const addOrRemoveSelectedNoteClass = (selectedNote, selectedUniqueClass) => {
  let notes = document.querySelectorAll(".note");
  let textareas = document.getElementsByTagName("textarea");
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
const selectedTextToTheScreen = () => {
  let notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    note.addEventListener("click", (e) => {
      let selectedNote = e.target;
      let selectedUniqueClass = e.target.classList[1];

      let textareas = document.getElementsByTagName("textarea");
      // console.log(selectedUniqueClass);
      // console.log(selectedNote);
      // console.log(textareas);
      addOrRemoveSelectedNoteClass(selectedNote, selectedUniqueClass);

      getSelectedTextAreaToTheScreen(textareas, selectedUniqueClass);
    });
  });
};
const addNotesBtn = document.querySelector(".header--button");

//to be able to see this button there should already be firstData, since there is a data clickcount starts with1
let clickCount = 1;

addNotesBtn.addEventListener("click", () => {
  clickCount++;
  let data = JSON.parse(localStorage.getItem("data"));
  // console.log(data);
  data = [...data, { id: `Note ${clickCount}`, note: "" }];
  localStorage.setItem("data", JSON.stringify(data));

  let noteHeaderNode = document.querySelector(".note");
  let noteTextNode = document.querySelector(".n1text");
  // console.log(noteHeaderNode);
  // console.log(noteTextNode);

  let newNoteHeader = noteHeaderNode.cloneNode();
  newNoteHeader.innerText = `Note ${data.length}`;
  newNoteHeader.classList = `note n${data.length}`;
  document.querySelector(".notes").append(newNoteHeader);

  let newNoteTextNode = noteTextNode.cloneNode();
  newNoteTextNode.innerText = `n${data.length}textaSSASA`;
  newNoteTextNode.classList = `n${data.length}text`;
  newNoteTextNode.style.display = "none";
  document.querySelector("article").append(newNoteTextNode);

  selectedTextToTheScreen();
  // refreshPageWhenAddedOrRemovedData();
});
