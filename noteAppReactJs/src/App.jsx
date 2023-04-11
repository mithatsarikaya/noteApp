
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

  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("data")) || []
  )
  //get data on first render
  
  //if notes change write it to localStorage
  React.useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(notes))
    if(notes.length ===0){
      localStorage.clear()
    }
  }, [notes])

  
  const [selectedNoteId, setSelectedNoteId] = React.useState(notes[0] && notes[0].id || "")
  const selectNote = (e)=>{
    setSelectedNoteId(selectedNoteId=>e.target.dataset.id)
  }
  const createFirstNote = ()=>{
    let firstData = generateBlankData()
    setNotes([...notes, firstData])
    setSelectedNoteId(firstData.id)
  }
  const deleteForFun = ()=>setNotes([])
  const addNoteAndTextArea =()=>{
    setNotes(prevNote => [...prevNote, generateBlankData()])
  }

  //when textarea change then edit the specific note
  const editTheNoteText = (e)=>{
    let noteIdToBeEditText = e.target.dataset.id
    setNotes(prevNote=> {
      let newArray = []
      for (let i = 0; i < prevNote.length; i++) {
        let note = prevNote[i];
        if(note.id===noteIdToBeEditText){
          note = {...note, text:e.target.value }
          newArray.unshift(note)
        }else{
          newArray.push(note)
        }
      }
      return newArray
    //  return prevNote.map(p=> p.id === noteIdToBeEditText ? {...p, text : e.target.value} : p)
    })

  }
  
  //when user click trash button which is close to note, delete it 
  const getIdToBeDeletedFromChildAndDelete=(e,getIt)=>{
    e.stopPropagation()
    let idToBeDeleted = getIt
    setNotes(prevNotes=>prevNotes.filter(n=>n.id!==idToBeDeleted))
  }
  

  



  return (
    
    <div>
      {!notes.length>0 ? 
    <div className="ifNoNote">
      <h1 className="ifNoNote--title">Click button to create first note</h1>
      <button onClick={createFirstNote} className="ifNoNote--button">Create</button>
    </div>
    :
    <div className="mainPage">
      <aside>
        <header>
          <h4>Notes</h4>
          <button className="header--button" onClick={addNoteAndTextArea}>+</button>
          <button onClick={deleteForFun} className="header--button">-</button>
        </header>
        <div className="notes">
        {notes.map(n=><Note key={n.id} id={n.id}  header={n.header} selectedNoteId={selectedNoteId} getIdToBeDeletedFromChildAndDelete={getIdToBeDeletedFromChildAndDelete} onClick={selectNote} />)}
        
        </div>
      </aside>
      <main>
        <article>
        
        {notes.map(n=><Textarea key={n.id} id={n.id} text={n.text} selectedNoteId={selectedNoteId}  onChange={editTheNoteText}/>)}
        
        </article>
      </main>
    </div>
    }
  </div>
  
  )
}




 