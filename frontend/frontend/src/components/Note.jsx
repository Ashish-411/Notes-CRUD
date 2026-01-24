import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import "../styles/note.css";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { confirmToast } from "./checkToast";
import { messageToast } from "./messageToast";
function Note({note_id, title,text_content, onDelete}){
    const navigate = useNavigate();
    const handleDelete = async() =>{
        const confirm = await confirmToast("Are You Sure You Want to Delete?");
        if(!confirm) return;
        try{
            const res = await api.delete(`/notes/${note_id}`);
            onDelete();
            messageToast(res.data.message,"success");

        }catch(err){
            console.log(err);
        }
    }
    function handleUpdate(note_id){
        navigate(`/update-note/${note_id}`);
    }
    return(
        <section className="note-card">
            <div className="note-header">
                <h2 className="note-title">{title}</h2>
                <div className="note-icons">
                    <RxUpdate 
                        className="note-icon update-icon"
                        onClick={()=>handleUpdate(note_id)}/>
                    <MdDelete 
                        className = "note-icon delete-icon"
                        onClick={handleDelete}/>
                </div>
            </div>
            <div className="note-body">
                <p className="note-text">{text_content}</p>
            </div>
        </section>
    );
}
export default Note;