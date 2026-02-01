from fastapi import Depends, APIRouter, Request
from auth.dependencies import get_current_user
from controllers.deleteChat import deleteChat

router = APIRouter()


@router.post("/deletechat")
async def delete(request: Request, user_id: str = Depends(get_current_user)):
    msg = await request.json()
    chatId = msg["chatId"]
    msg = deleteChat(chatId)
    return {"msg": msg}
