
import trashLogo from './assets/trash-solid.svg'

export default function App() {
  return (
    <body>
    <div class="ifNoNote">
      <h1 class="ifNoNote--title">Click button to create first note</h1>
      <button class="ifNoNote--button">Create</button>
    </div>
    <div class="mainPage">
      <aside>
        <header>
          <h4>Notes</h4>
          <button class="header--button">+</button>
        </header>
        <div class="notes">
        <div class="note n1">Note 1
  <button class="deleteNoteBtn">
  <img class="trashImg" src={trashLogo} alt="" />
  </button>
  </div>
          <div class="note n2">Note 2</div>
          <div class="note n3">Note 3</div>
        </div>
      </aside>
      <main>
        <article>
        <textarea class="n1text" name="" id="" cols="30" rows="20">1</textarea>
          <textarea class="n2text" name="" id="" cols="30" rows="20">2</textarea>
          <textarea class="n3text" name="" id="" cols="30" rows="20">3</textarea>
        </article>
      </main>
    </div>
  </body>
  )
}




 