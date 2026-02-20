from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from models import LoginSchema
from database import users_collection
from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()

# Hashing password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token creation
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINIUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINIUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login")
def signin(user: LoginSchema):
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not pwd_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"sub": str(existing_user["_id"])})

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
    }
