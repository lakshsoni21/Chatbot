from database import messages_collection
from bson import ObjectId


def pair_messages(messages):
    pairs = []
    current_question = None

    for msg in messages:
        if msg["role"] == "user":
            current_question = msg["content"]

        elif msg["role"] == "assistant" and current_question:
            pairs.append({"question": current_question, "answer": msg["content"]})
            current_question = None

    return pairs


def getAllMessages(chatId: str):
    allMessages = list(messages_collection.find({"chatId": chatId}))

    data = pair_messages(allMessages)

    return {"msg": "Successfull", "messages": data}
