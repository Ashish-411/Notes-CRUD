from pydantic import BaseModel
from datetime import datetime
from  typing import Optional
class Note(BaseModel):
    note_id: int
    title: str
    text_content: str
    created_at: datetime
    user_id: int

class NoteCreate(BaseModel):
    title: str
    text_content: str

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    text_content: Optional[str] = None
