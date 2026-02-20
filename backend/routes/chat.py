from fastapi import Depends, APIRouter, Request
from auth.dependencies import get_current_user
from controllers.newChat import newChat
from controllers.getAllChats import getAllChats
from controllers.getChat import getChat
from controllers.createMessage import createMessage


router = APIRouter()


@router.post("/newchat")
async def newChatCreate(request: Request, user_id: str = Depends(get_current_user)):
    msg = await request.json()
    question = msg["question"]
    data1 = await newChat(request, user_id)
    data = await createMessage(question, data1["chatId"])
    return data1


@router.get("/allChats")
def getChats(user_id: str = Depends(get_current_user)):
    return getAllChats(user_id)


@router.post("/getchat")
async def get(request: Request, user_id: str = Depends(get_current_user)):
    return await getChat(request, user_id)
