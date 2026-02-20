from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserSchema(BaseModel):
    name: str
    email: str
    password: str


class LoginSchema(BaseModel):
    email: str
    password: str


class ChatSchema(BaseModel):
    userId: str
    title: str
    createdAt: datetime


class MessageSchema(BaseModel):
    chatId: str
    role: str
    content: str
    sequence: int
    createdAt: datetime


class PasswordReset(BaseModel):
    userId: str
    tokenHash: str
    expiresAt: datetime
    used: bool = False

    class Config:
        arbitrary_types_allowed = True
