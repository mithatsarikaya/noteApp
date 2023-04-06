import trashLogo from '../assets/trash-solid.svg'
export default function Note(props){

    return(
        <div className={`note n1 ${props.selectedNoteId === props.id ? "selected--note" : ""}`} data-id={props.id} onClick={props.onClick} >Note {props.header}
  <button onClick={()=>props.getIdToBeDeletedFromChildAndDelete(props.id)} className="deleteNoteBtn">
  <img className="trashImg" src={trashLogo} alt="" />
  </button>
  </div>
    )
}