from fastapi import APIRouter, HTTPException, Depends, status
from .schemas import User, createUser, LoginUser
from typing import List
from auth import hash_password,verify_password,create_access_token,decode_access_token
import database as db
import asyncpg
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm

router = APIRouter(
    tags = ['users'],
    prefix= '/users'
)

tablename = 'users'
@router.get("/",response_model=List[User])
async def get_users():
    query = f"""
    SELEcT * FROM {tablename}
    
    """
    try:
        async with db.pool.acquire() as conn:
            users = await conn.fetch(query)
        if users is None:
            raise HTTPException(status_code=200, detail="No users")
        return [dict(user) for user in users]
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=e)

@router.post('/',response_model=User)
async def create_user(request: createUser):
    hashed_pw = hash_password(request.password)
    query = f"""
        INSERT INTO {tablename}(name,password,email)
        VALUES($1,$2,$3)
        RETURNING id,name,email,is_active;
        """
    try:
        async with db.pool.acquire() as conn:
            user = await conn.fetchrow(query,request.name,hashed_pw,request.email)
        return User(**(dict(user)))
    except asyncpg.PostgresError as e:
        raise HTTPException(status_code=500, detail=e)
    
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    query = f"""
        SELECT * FROM {tablename} WHERE name = $1;
    """
    async with db.pool.acquire() as conn:
        row = await conn.fetchrow(query,form_data.username)
        if not row:
            raise HTTPException(status_code=401, detail="Invalid Username or Password")
        if not verify_password(form_data.password,row["password"]):
            raise HTTPException(status_code=401,detail="Invalid username or password")
        token = create_access_token({
                                        "sub":row["name"],
                                        "user_id": row["id"]})
    return {"access_token":token, "token_type":"bearer"}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

async def get_current_user(token:str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

#protected route
@router.get("/me")
async def read_users_me(current_user:dict = Depends(get_current_user)):
    return{"Username": current_user["sub"]}
