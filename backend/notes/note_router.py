from fastapi import APIRouter, HTTPException, Depends
from .schemas import Note, NoteUpdate, NoteCreate
from typing import List
import database as db
import asyncpg
from users.user_router import get_current_user
router = APIRouter(
    tags = ['notes'],
    prefix='/notes'
)
tablename = 'notes'
@router.get('/',response_model=List[Note])
async def getNotes(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    query = f"""
    SELECT * FROM {tablename} WHERE user_id = $1
    """

    try:
        async with db.pool.acquire() as conn:
            notes = await conn.fetch(query,user_id)
        return [dict(note) for note in notes]
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=(e))
#get single note
@router.get('/{note_id}',response_model=Note)
async def getSingleNote(note_id:int,current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    query = f"""
    SELECT * FROM {tablename}
    WHERE note_id = $1 AND user_id = $2
    """
    try:
        async with db.pool.acquire() as conn:
            note = await conn.fetchrow(query,note_id,user_id)
        if not note:
            return HTTPException(status_code=404,detail="Note Not Found or not allowed")
        return Note(**(dict(note)))
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=str(e))
#create note
@router.post('/',response_model=Note)
async def createNote(request: NoteCreate, current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    query = f"""
    INSERT INTO {tablename} (title,text_content,user_id) VALUES
    ($1,$2,$3)
    RETURNING note_id,title,text_content,created_at,user_id
    """
    try:
        async with db.pool.acquire() as conn:
            note = await conn.fetchrow(query,request.title,request.text_content,user_id)
        return Note(**(dict(note)))
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500,detail=str(e))

#update note
@router.put('/{note_id}', response_model=Note)
async def updateNote(note_id:int, request: NoteUpdate, current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]

    #check if note belongs to user
    check_query = f"""
    SELECT * FROM {tablename} 
    WHERE note_id = $1 AND user_id = $2
    """
    async with db.pool.acquire() as conn:
        existing_note = await conn.fetchrow(check_query, note_id, user_id)
        if not existing_note:
            raise HTTPException(status_code=404, detail="Note not found or not allowed")
    fields = []
    values = []

    if request.title is not None:
        fields.append("title = $%d" % (len(values)+1))
        values.append(request.title)

    if request.text_content is not None:
        fields.append("text_content = $%d" % (len(values)+1))
        values.append(request.text_content)
    if not fields:
        raise HTTPException(status_code=400, detail = "no fields to update")
    
    #add note id as last parameter
    values.append(note_id)
    query = f"""
    UPDATE {tablename}
    SET {','.join(fields)}
    WHERE note_id = ${len(values)}
    RETURNING note_id,title,text_content,created_at,user_id
    """
    try:
        async with db.pool.acquire() as conn:
            updated_note = await conn.fetchrow(query,*values)
        if not updated_note:
            raise HTTPException(status_code=404, detail="Not found Note")
        return Note(**(dict(updated_note)))
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail= str(e))

#delete note
@router.delete("/{note_id}", response_model=dict)
async def deleteNote(note_id:int, current_user:dict = Depends(get_current_user)):
    user_id = current_user["user_id"]

    #check if note belongs to user
    check_query = f"""
            SELECT * FROM {tablename}
            WHERE note_id = $1 AND user_id = $2
        """
    async with db.pool.acquire() as conn:
        existing_note = await conn.fetchrow(check_query,note_id,user_id)
        if not existing_note:
            raise HTTPException(status_code=404,detail="Note not found or not allowed")
            
    #Delete Note
    delete_query = f"""
            DELETE FROM {tablename} 
            WHERE note_id = $1
        """
    try:
        async with db.pool.acquire() as conn:
            await conn.execute(delete_query, note_id)
        return {"message":"Note Deleted Successfully"}
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500,detail=str(e))
