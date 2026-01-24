import { useState } from "react";
import api from "../api";
import "../styles/createnote.css";
import { messageToast } from "../components/messageToast";
function CreateNote(){
    const [title, setTitle] = useState("");
    const [text_content, setTextContent] = useState("");
    const notify = () => toast("note created");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await api.post("/notes/",{
                title,
                text_content,
            })
            console.log(res);
            messageToast("Note Created","success");
            setTitle("");
            setTextContent("");
        }catch(err){
            if(err.response && err.response.status === 401){
                messageToast("Note is not created","error");
            }
            conmsole.error("Error creating note: ", err.response?.date || err);
        }
    }
    return (
        <section className="create-note-container">
            <h1 className="create-note-title">Create A Note</h1>
            <form className="create-note-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="note-title"
                    placeholder="title"
                    className="note-input"
                    value = {title}
                    onChange={(e)=>setTitle(e.target.value)}
                    required/>
                <textarea 
                    name="text_content" 
                    id="note-content"
                    className="note-textarea" 
                    placeholder="Write your note"
                    value={text_content}
                    onChange={(e)=>setTextContent(e.target.value)}
                    required></textarea>
                <button type="submit" className="note-submit-btn">Create</button>
            </form>
        </section>
    );
}
export default CreateNote;