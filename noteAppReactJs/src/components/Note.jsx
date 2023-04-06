import trashLogo from '../assets/trash-solid.svg'
export default function Note(props){

    return(
        <div class={`note n1 ${props.selectedNoteId === props.id ? "selected--note" : ""}`} data-id={props.id} onClick={props.onClick} >Note {props.header}
  <button onClick={()=>props.getIdToBeDeletedFromChildAndDelete(props.id)} class="deleteNoteBtn">
  <img class="trashImg" src={trashLogo} alt="" />
  </button>
  </div>
    )
}