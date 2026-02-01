from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from database import users_collection
from models import UserSchema

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

router = APIRouter()

@router.post("/signup")
def signup(user: UserSchema):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered") 
    
    hashed_pw = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email,
        "password":hashed_pw
    }

    users_collection.insert_one(new_user)
    return {"message": "User created successfully"}
    

