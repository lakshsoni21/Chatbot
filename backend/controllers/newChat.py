from fastapi import Request
from database import chats_collection
from datetime import datetime


async def newChat(request:Request, user_id: str):
    msg = await request.json()
    title = msg["question"]
    createdAt = datetime.now()
    chatObj = {
        "userId": user_id,
        "title": title,
        "createdAt":createdAt
    }
    chat = chats_collection.insert_one(chatObj)
    chat_id = str(chat.inserted_id)
    return {"message": "Success", "chatId": chat_id}
