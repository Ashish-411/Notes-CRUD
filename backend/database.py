import asyncpg

DATABASE_CONFIG = {
    "user":"postgres",
    "password":"Ashish100",
    "host":"localhost",
    "database":"Notes_DB",
    "port":5432
}

pool : asyncpg.pool.Pool = None

async def connect():
    global pool 
    pool = await asyncpg.create_pool(**DATABASE_CONFIG)

async def close():
    global pool
    await pool.close()