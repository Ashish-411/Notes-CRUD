from pydantic import BaseModel
class User(BaseModel):
    id:int
    name: str
    email: str
    is_active:bool

class createUser(BaseModel):
    name:str
    password: str
    email: str

class LoginUser(BaseModel):
    name:str
    password:str