import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api";
function UpdateNote(){
    const [title, setTitle] = useState("");
    const [text_content, setTextContent] = useState("");
    const {note_id} = useParams();
    const navigate = useNavigate();
    //to fetch single note date
    useEffect(() => {
        const fetchNote = async() =>{
            try{
                const res = await api.get(`notes/${note_id}`);
                const data = res.data;
                setTitle(data.title);
                setTextContent(data.text_content);
        
            }catch(err){
                console.error(err);
            }
        }
        fetchNote();
        },[]);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await api.put(`/notes/${note_id}`,{
                title,
                text_content,
            })
            console.log({title,text_content});
            setTitle("");
            setTextContent("");
            navigate("/");
        }catch(err){
            console.error("Error Updating note: ", err.response?.date || err);
        }
    }
    return (
        <section className="create-note-container">
            <h1 className="create-note-title">Update Your Note</h1>
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
                <button 
                    type="submit" 
                    className="note-submit-btn"
                    onClick={()=>{
                        if(window.confirm("Are you sure you want to update this note")){
                            return;
                        }
                    }}>Update</button>
            </form>
        </section>
    );
}
export default UpdateNote;