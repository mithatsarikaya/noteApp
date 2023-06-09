
export default function Textarea(props){
    return(
        <textarea className="n1text" 
        data-id={props.id} 
        onChange={props.onChange}
        style={{display:`${props.selectedNoteId === props.id ? "block" : "none"}`}}
        value={props.text}
        name="" id="" cols="30" 
        rows="20">{props.text}</textarea>
    )
}