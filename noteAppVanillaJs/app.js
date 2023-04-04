const noNoteScreen = document.querySelector(".ifNoNote");
const noteScreen = document.querySelector(".mainPage");
let textareas = document.getElementsByTagName("textarea");
// const notes = document.querySelectorAll(".note");

const notesHeaderDiv = document.querySelector(".notes");
const notesArticle = document.querySelector("article");

let firstNoteHeader =
  '<div class="note n1">Note 1<button class="deleteNoteBtn"><img class="trashImg" src="trash-solid.svg" alt="" /></button></div>';
let firstNote =
  '<textarea class="n1text" name="" id="" cols="30" rows="20"></textarea>';

//if ant noteText change, writes it to the localStorage
// const noteTextOnChange = () => {
//   let noteTexts = document.querySelector("textarea");
//   console.log(noteTexts);
//   noteTexts.forEach((noteText) =>
//     noteText.addEventListener("onchange", (event) => {
//       console.log(event.target.value);
//     })
//   );
// };

// // localStorage.setItem("data", "how u doin");
// get data
//if no data then "let user create his first page", if data then "let user see his note" page

//every clone should append 2 elements : header:div noteArea:textarea
const cloneNodes = (number, localStorageValue) => {
  let noteHeaderNode = document.querySelector(".note");
  let noteTextNode = document.querySelector(".n1text");

  let newNoteHeader = noteHeaderNode.cloneNode();
  newNoteHeader.innerText = `Note ${number}`;
  newNoteHeader.classList = `note n${number}`;
  document.querySelector(".notes").append(newNoteHeader);

  let newNoteTextNode = noteTextNode.cloneNode();
  //if data from localStorage has text value then it will be shown
  newNoteTextNode.innerText = localStorageValue
    ? localStorageValue
    : `n${number} buraları manuel ekledim`;
  newNoteTextNode.classList = `n${number}text`;
  newNoteTextNode.style.display = "none";
  document.querySelector("article").append(newNoteTextNode);

  // noteTextOnChange();
};

//when user click note to edit, show user to the right text area
const getSelectedTextAreaToTheScreen = (textareas, selectedUniqueClass) => {
  for (let i = 0; i < textareas.length; i++) {
    const t = textareas[i];

    //textarea class example is "n1text"
    Array.from(t.classList)[0].replace("text", "") === selectedUniqueClass
      ? (t.style.display = "block")
      : (t.style.display = "none");
  }

  let textareassssss = document.querySelectorAll("textarea");
  // console.log(textareassssss);
  textareassssss.forEach((textareass) => {
    textareass.addEventListener("onkeyup", (event) => {
      console.log("here");
      console.log(event.target);
    });
  });
  // console.log(textareas);
  // console.log(selectedUniqueClass);
};
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

const addFirstNoteHeaderAndText = () => {
  //after creating first note, adding to the page
  notesHeaderDiv.innerHTML = firstNoteHeader;
  notesArticle.innerHTML = firstNote;

  //if there is more than one data, big if
  if (localStorage.getItem("data")?.length >= 1) {
    let data = JSON.parse(localStorage.getItem("data"));
    //since first note is already on the screen start from the second one
    for (let i = 1; i < data.length; i++) {
      cloneNodes(i + 1, data[i].note);
    }
  }

  //make first noteheader selected
  //make dota 2 great again
  document.querySelector(".note").classList.add("selected--note");
  getSelectedTextAreaToTheScreen(textareas, (selectedUniqueClass = "n1"));
  selectedTextToTheScreen();
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

// console.log(textareas);
// console.log(notes);

const addNotesBtn = document.querySelector(".header--button");

addNotesBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("data"));
  // console.log(data);
  data = [...data, { id: `Note ${data.length}`, note: "" }];
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

/////////////saves inputttttttttttttttttttttttttttttt
let textarea1 = document.querySelector(".n1text");
// console.log(textarea1);
textarea1.addEventListener("input", (e) => {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
});

//delete note
const deleteNoteBtn = document.querySelector(".deleteNoteBtn");
deleteNoteBtn.addEventListener("click", (e) => {
  //imgTrash and the button are inside the noteDiv. this snippet is to find it and delete it.
  //trying to find immediate div.
  let parentElement = e.target.parentElement;
  while (parentElement.nodeName !== "DIV") {
    parentElement = parentElement.parentElement;
  }
});
