from database import chats_collection, messages_collection
from bson import ObjectId


def deleteChat(id: str):
    chats_collection.delete_one({"_id": ObjectId(id)})
    messages_collection.delete_many({"chatId": id})

    return {"msg": "Deleted Successfull"}
