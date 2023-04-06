import trashLogo from '../assets/trash-solid.svg'
export default function Note(props){

    console.log(props);
    return(
        <div class="note n1" data-id={props.id} >Note {props.header}
  <button class="deleteNoteBtn">
  <img class="trashImg" src={trashLogo} alt="" />
  </button>
  </div>
    )
}