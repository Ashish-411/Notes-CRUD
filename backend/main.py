from fastapi import FastAPI
import asyncpg
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import database as db
from users import user_router
from notes import note_router
@asynccontextmanager
async def lifespan(app:FastAPI):
    try:
        await db.connect()
        print("Database connected.....")
    except asyncpg.PostgresError as e:
        raise e
    yield

    await db.close()
    print("Database Closed.......")



app = FastAPI(lifespan=lifespan)
#  CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # React (Vite)
        "http://127.0.0.1:5173", 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router.router)
app.include_router(note_router.router)
@app.get('/')
async def root():
    return{"message":"Hello world"}