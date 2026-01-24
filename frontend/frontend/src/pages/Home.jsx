import { useState,useEffect } from "react";
import Note from "../components/Note";
import api from "../api";
import "../styles/home.css";
function Home(){
    const [notes,setNotes] = useState([])
    useEffect(()=>{
        getNotes();
    },[]);
    function onDelete(){
        getNotes();
    }
     
    const getNotes = async() =>{
        try{
            const res = await api.get("/notes/");
            setNotes(()=>res.data);
        }catch(err){
            console.error(err);
        }}
        return(
            <>
            
                {notes.length === 0? 
                    (<p> You have not created any Note</p>):
                    (
                    <ul className="notes-list">
                    {
                        notes.map((note)=>{
                            return(
                            <li key={note.note_id}>
                                <Note note_id = {note.note_id} title = {note.title} text_content = {note.text_content} onDelete = {onDelete}/>
                            </li>
                        );
                        })
                    }
                    </ul>
                    )    
                }
            </>
    );
}
export default Home;