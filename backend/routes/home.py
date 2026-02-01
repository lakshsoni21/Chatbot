from fastapi import Depends, APIRouter
from fastapi.security import OAuth2PasswordBearer
from auth.dependencies import get_current_user
from database import users_collection
from bson import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()

@router.get("/")
def read_root(user_id: str = Depends(get_current_user)):
    data = users_collection.find_one({"_id": ObjectId(user_id)})
    return {"id":user_id, "name": data["name"]}

