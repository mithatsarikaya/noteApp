
export default function Textarea(props){
    console.log(props);
    return(
        <textarea class="n1text" data-id={props.id} name="" id="" cols="30" rows="20">{props.text}</textarea>
    )
}