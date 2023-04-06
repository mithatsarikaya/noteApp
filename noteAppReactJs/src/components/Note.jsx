import trashLogo from '../assets/trash-solid.svg'
export default function Note(props){

    return(
        <div class={`note n1 ${props.selected ? "selected--note" : ""}`} data-id={props.id} onClick={props.onClick} >Note {props.header}
  <button class="deleteNoteBtn">
  <img class="trashImg" src={trashLogo} alt="" />
  </button>
  </div>
    )
}