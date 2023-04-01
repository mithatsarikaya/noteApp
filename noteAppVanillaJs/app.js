const notes = document.querySelectorAll(".note");
// console.log(selectedNote.classList.add("selected--note"));

notes.forEach((note) => {
  note.addEventListener("click", (e) => {
    let selectedNote = e.target;

    //add 'selectedNote' style to the div, if not selected then remove it
    notes.forEach((n) => {
      Array.from(n.classList).includes(selectedNote.classList[1])
        ? n.classList.add("selected--note")
        : n.classList.remove("selected--note");
    });
  });
});
