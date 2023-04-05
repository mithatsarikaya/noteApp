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
      let data = dataFromLocalStorage();
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

// localStorage.clear();

const generateBlankData = () => {
  let randomId = createRandomId();
  let data = {
    id: randomId,
    header: `Note ${randomId.slice(0, 3)}`,
    text: "",
  };
  return data;
};

firstCreateBtn.addEventListener("click", () => {
  console.log("clicked create btn");
  let data = [generateBlankData()];

  localStorage.setItem("data", JSON.stringify(data));

  //just after clicking create button, this function will create first elements and show it to the screen
  showMainPageIfHasData();
  deleteNote();
});

const dataFromLocalStorage = () => JSON.parse(localStorage.getItem("data"));

//show note and textarea
const showAndCreateNoteAndTextArea = (id, header, text) => {
  notesHeaderDiv.insertAdjacentHTML(
    "beforeend",
    `<div class="note n1" data-id="${id}" >${header}
  <button class="deleteNoteBtn">
  <img class="trashImg" src="trash-solid.svg" alt="" />
  </button>
  </div>`
  );

  notesArticle.insertAdjacentHTML(
    "beforeend",
    `<textarea class="n1text" data-id="${id}" name="" id="" cols="30" rows="20">${text}</textarea>`
  );
};

const selectNoteAndShowTextArea = () => {
  let noteDivs = document.querySelectorAll(".note");

  let textareas = document.querySelectorAll("textarea");

  noteDivs.forEach((noteDiv) => {
    noteDiv.addEventListener("click", (e) => {
      e.target.classList.add("selected--note");
      let selectedDivId = e.target.dataset.id;

      //make 'textarea of the selected div' visible
      textareas.forEach((t) => {
        if (t.dataset.id === selectedDivId) {
          t.style.display = "block";
        } else {
          t.style.display = "none";
        }

        //if any textarea has any input then find it with dataset id then write it to localStorage
        t.addEventListener("input", (e) => {
          let data = dataFromLocalStorage();
          let idOfTheTextArea = e.target.dataset.id;
          data.filter((d) =>
            d.id === idOfTheTextArea ? (d.text = e.target.value) : ""
          );

          setLocalStorage("data", data);
        });
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

//if local storage has data then show the Main page which has notes, also add the nodes
//else show noData screen
const showMainPageIfHasData = () => {
  let data = dataFromLocalStorage();
  if (data) {
    noteScreen.style.display = "flex";
    noNoteScreen.style.display = "none";

    //"beforeend" adds the element end of it

    for (let i = 0; i < data.length; i++) {
      // const element = data[i];

      showAndCreateNoteAndTextArea(data[i].id, data[i].header, data[i].text);
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
  let data = dataFromLocalStorage();
  let newData = generateBlankData();

  data.push(newData);
  setLocalStorage("data", data);
  showAndCreateNoteAndTextArea(newData.id, newData.header, newData.text);
  selectNoteAndShowTextArea();
  deleteNote();
});
