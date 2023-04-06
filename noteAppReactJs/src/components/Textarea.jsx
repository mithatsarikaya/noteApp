
export default function Textarea(props){
    return(
        <textarea class="n1text" 
        data-id={props.id} 
        style={{display:`${props.selectedNoteId === props.id ? "block" : ""}`}}
        name="" id="" cols="30" 
        rows="20">{props.text}</textarea>
    )
}