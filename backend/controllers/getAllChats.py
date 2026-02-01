from database import users_collection, chats_collection
from bson import ObjectId

def getAllChats(user_id: str):
    allChats = list(chats_collection.find({"userId": user_id}))
    for chat in allChats:
        chat["_id"] = str(chat["_id"])
        if "createdAt" in chat:
            chat["createdAt"] = chat["createdAt"].isoformat()
        chat.pop("userId", None)

    data = users_collection.find_one({"_id": ObjectId(user_id)})
    return {"chats": allChats, "name": data["name"]}