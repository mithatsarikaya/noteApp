const noNoteScreen = document.querySelector(".ifNoNote");
const noteScreen = document.querySelector(".mainPage");

const notesHeaderDiv = document.querySelector(".notes");
const notesArticle = document.querySelector("article");

//save data array of objects to local storage
const setLocalStorage = (storageName, data) =>
  localStorage.setItem(storageName, JSON.stringify(data));

const createOneNoteBtn = document.querySelector(".header--button");

//generating random id for pairing text areas and header divs
const createRandomId = () => {
  var randomWord = "";
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    randomWord += str.charAt(char);
  }

  return randomWord;
};

//delete note and headerdiv pairs with their dataset-id
//at the end check whether there any note that can be deleted. if no note left, then reload the page
const deleteNote = () => {
  //delete note
  const deleteNoteBtns = document.querySelectorAll(".deleteNoteBtn");
  deleteNoteBtns.forEach((deleteNoteBtn) => {
    deleteNoteBtn.addEventListener("click", (e) => {
      //imgTrash and the button are inside the noteDiv. this snippet is to find it and delete it.
      //trying to find immediate div.
      let parentElement = e.target.parentElement;
      //find immediate div
      while (parentElement.nodeName !== "DIV") {
        parentElement = parentElement.parentElement;
      }

      //get data from localStorage check the same object has same id and remove it from the data
      let data = getDataFromLocalStorage();
      data = data.filter((d) => d.id !== parentElement.dataset.id);
      setLocalStorage("data", data);
      parentElement.remove();

      //check if any data left, if not then reload page and remove data
      !data.length ? (localStorage.clear(), location.reload()) : "";
    });
  });
};

let randomId = createRandomId();

let firstNoteHeader = `<div class="note n1" data-id="${randomId}" >Note 1<button class="deleteNoteBtn"><img class="trashImg" src="trash-solid.svg" alt="" /></button></div>`;
let firstNote = `<textarea class="n1text" data-id="${randomId}" name="" id="" cols="30" rows="20"></textarea>`;

const clickBtn = (elem) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "b") {
      elem.click();
    }
  });
};

const firstCreateBtn = document.querySelector(".ifNoNote--button");

const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem("data"));

const generateBlankData = () => {
  let isFirstData = getDataFromLocalStorage() ? false : true;
  let randomId = createRandomId();
  let data = {
    id: randomId,
    header: `Note ${randomId.slice(0, 3)}`,
    isSelected: isFirstData,
    text: "",
  };
  return data;
};

firstCreateBtn.addEventListener("click", () => {
  let data = [generateBlankData()];

  localStorage.setItem("data", JSON.stringify(data));

  //just after clicking create button, this function will create first elements and show it to the screen
  showMainPageIfHasData();
  deleteNote();
  saveChangesToTextArea();
});

const rearrangeNoteDiv = (id, header, text, isSelected) => {
  notesHeaderDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="note n1 ${
      isSelected ? "selected--note" : ""
    }" data-id="${id}" >${header}
  <button class="deleteNoteBtn">
  <img class="trashImg" src="trash-solid.svg" alt="" />
  </button>
  </div>`
  );
};

//show note and textarea
const showAndCreateNoteAndTextArea = (id, header, text, isSelected) => {
  //"beforeend" adds the element end of it
  notesHeaderDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="note n1 ${
      isSelected ? "selected--note" : ""
    }" data-id="${id}" >${header}
  <button class="deleteNoteBtn">
  <img class="trashImg" src="trash-solid.svg" alt="" />
  </button>
  </div>`
  );

  notesArticle.insertAdjacentHTML(
    "beforeend",
    `<textarea class="n1text" style="display:${
      isSelected ? "block" : "none"
    }" data-id="${id}" name="" id="" cols="30" rows="20">${text}</textarea>`
  );
};

const selectNoteAndShowTextArea = () => {
  let noteDivs = document.querySelectorAll(".note");

  let textareas = document.querySelectorAll("textarea");

  noteDivs.forEach((noteDiv) => {
    noteDiv.addEventListener("click", (e) => {
      e.target.classList.add("selected--note");
      let selectedDivId = e.target.dataset.id;

      let data = getDataFromLocalStorage();
      //if any not selected make isSelected attr true else make it false
      data = data.map((d) =>
        d.id === selectedDivId
          ? { ...d, isSelected: true }
          : { ...d, isSelected: false }
      );
      setLocalStorage("data", data);

      //make 'textarea of the selected div' visible
      textareas.forEach((t) => {
        if (t.dataset.id === selectedDivId) {
          t.style.display = "block";
        } else {
          t.style.display = "none";
        }

        saveChangesToTextArea();
      });

      //remove selectedclass list
      noteDivs.forEach((noteDiv) => {
        if (noteDiv.dataset.id !== selectedDivId) {
          noteDiv.classList.remove("selected--note");
        }
      });
    });
  });
};

selectNoteAndShowTextArea();

const saveChangesToTextArea = () => {
  let textareas = document.querySelectorAll("textarea");

  textareas.forEach((t) => {
    if (t.style.display === "block") {
      t.addEventListener("input", (e) => {
        let data = getDataFromLocalStorage();
        let idOfTheTextArea = e.target.dataset.id;
        data.filter((d) =>
          d.id === idOfTheTextArea ? (d.text = e.target.value) : ""
        );

        //if user make any change on a note, then put it on the beginning of the note
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          const note = data[i];
          if (note.id === idOfTheTextArea) {
            newData.unshift(note);
          } else {
            newData.push(note);
          }
        }

        setLocalStorage("data", newData);

        notesHeaderDiv.innerHTML = "";
        // notesArticle.innerHTML = "";

        for (let i = 0; i < newData.length; i++) {
          const data = newData[i];

          rearrangeNoteDiv(data.id, data.header, data.text, data.isSelected);
        }
        deleteNote();
        selectNoteAndShowTextArea();
      });
    }
  });
};

window.addEventListener("load", saveChangesToTextArea);

// saveChangesToTextArea();
//if local storage has data then show the Main page which has notes, also add the nodes
//else show noData screen
const showMainPageIfHasData = () => {
  let data = getDataFromLocalStorage();
  if (data) {
    noteScreen.style.display = "flex";
    noNoteScreen.style.display = "none";

    for (let i = 0; i < data.length; i++) {
      // const element = data[i];

      showAndCreateNoteAndTextArea(
        data[i].id,
        data[i].header,
        data[i].text,
        data[i].isSelected
      );
    }

    selectNoteAndShowTextArea();
    deleteNote();
    //if main page initial data from local storage then show it
  } else {
    noNoteScreen.style.display = "flex";
    noteScreen.style.display = "none";
  }

  // addFirstNoteHeaderAndText();
};

showMainPageIfHasData();

createOneNoteBtn.addEventListener("click", () => {
  let data = getDataFromLocalStorage();
  let newData = generateBlankData();

  data.push(newData);
  setLocalStorage("data", data);
  showAndCreateNoteAndTextArea(newData.id, newData.header, newData.text);
  selectNoteAndShowTextArea();
  deleteNote();
});
