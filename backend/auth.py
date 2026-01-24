from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
#password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")
MAX_BCRYPT_LEN = 72  # bcrypt max password length

SECRET_KEY = "56%^hdjdss#$"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 #1 hour

#hash password

def hash_password(password: str) -> str:
    # truncate password to 72 bytes for bcrypt
    truncated = password[:MAX_BCRYPT_LEN]
    return pwd_context.hash(truncated)

# verify password
def verify_password(plain_password:str, hashed_password:str) -> bool:
    truncated = plain_password[:MAX_BCRYPT_LEN]
    return pwd_context.verify(truncated,hashed_password)

def create_access_token(data:dict, expires_delta: timedelta=None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp":expire})
    token = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return token
#decode jwt token
def decode_access_token(token:str):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None