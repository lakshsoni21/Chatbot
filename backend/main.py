from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from routes.home import router as home_router
from routes.signup import router as signup_router
from routes.login import router as login_router
from routes.chat import router as chat_router
from routes.message import router as msg_router
from routes.delete import router as delete_router

app = FastAPI()

origins = ["http://localhost:5173", "localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_router)
app.include_router(signup_router)
app.include_router(login_router)
app.include_router(chat_router)
app.include_router(msg_router)
app.include_router(delete_router)
