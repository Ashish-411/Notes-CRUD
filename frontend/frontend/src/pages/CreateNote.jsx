import { useState } from "react";
import api from "../api";
import "../styles/createnote.css";
function CreateNote(){
    const [title, setTitle] = useState("");
    const [text_content, setTextContent] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        try{
            api.post("/notes/",{
                title,
                text_content,
            })
            console.log({title,text_content});
            setTitle("");
            setTextContent("");
        }catch(err){
            console.error("Error creating note: ", err.response?.date || err);
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