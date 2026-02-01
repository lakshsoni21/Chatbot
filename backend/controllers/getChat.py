from database import users_collection, chats_collection
from bson import ObjectId
from fastapi import Request

async def getChat(request: Request, user_id: str):
    data = await request.json()
    id = data["chatId"]
    chat = chats_collection.find_one({"_id": ObjectId(id)})
    chat_title = chat["title"]
    return {"title": chat_title}