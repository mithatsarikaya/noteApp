
import React from "react"
import Note from "./components/Note"
import Textarea from "./components/Textarea"

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

//generating initial data when user press button to create not
const generateBlankData = ()=>{
  let randomId = createRandomId()
  let data = {
    id:randomId,
    header: randomId.slice(0,3),
    text: ""
  }

  return data
}


export default function App() {
  const [note, setNote] = React.useState([])
  const [selectedNoteId, setSelectedNoteId] = React.useState("")
  const selectNote = (e)=>{
    setSelectedNoteId(selectedNoteId=>e.target.dataset.id)
    console.log(selectedNoteId);
  }
  const createFirstNote = ()=>setNote([generateBlankData()])
  const deleteForFun = ()=>setNote([])
  const addNoteAndTextArea =()=>{
    setNote(prevNote => [...prevNote, generateBlankData()])
  }

  console.log(selectedNoteId);
  return (
    
    <body>
      {!note.length>0 ? 
    <div class="ifNoNote">
      <h1 class="ifNoNote--title">Click button to create first note</h1>
      <button onClick={createFirstNote} class="ifNoNote--button">Create</button>
    </div>
    :
    <div class="mainPage">
      <aside>
        <header>
          <h4>Notes</h4>
          <button class="header--button" onClick={addNoteAndTextArea}>+</button>
          <button onClick={deleteForFun} class="header--button">-</button>
        </header>
        <div class="notes">
        {note.map(n=><Note id={n.id} header={n.header} selectedNoteId={selectedNoteId} onClick={selectNote} />)}
        
        </div>
      </aside>
      <main>
        <article>
        
        {note.map(n=><Textarea id={n.id} text={n.text} />)}
        
        </article>
      </main>
    </div>
    }
  </body>
  )
}




 