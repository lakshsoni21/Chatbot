from fastapi import Depends, APIRouter, Request
from auth.dependencies import get_current_user
from controllers.getAllMessages import getAllMessages
from controllers.createMessage import createMessage

router = APIRouter()


@router.post("/getAllMessages")
async def getMessages(request: Request, user_id: str = Depends(get_current_user)):
    response = await request.json()
    print(response)
    chat_id = response["chatId"]
    msgs = getAllMessages(chat_id)

    return msgs


@router.post("/createMessage")
async def create(request: Request, user_id: str = Depends(get_current_user)):
    response = await request.json()
    question = response["question"]
    chatId = response["chatId"]
    data = await createMessage(question, chatId)
    return data
