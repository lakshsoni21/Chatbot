import httpx
from database import messages_collection
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

LLAMA_API_KEY = os.getenv("LLAMA_API_KEY")
LLAMA_API_URL = os.getenv("LLAMA_API_URL")


async def createMessage(question: str, chat_id: str):
    messages = list(
        messages_collection.find({"chatId": chat_id}).sort("sequence", 1).limit(100)
    )

    llm_messages = [
        {"role": msg["role"], "content": msg["content"]} for msg in messages
    ]

    # ✅ add current user question
    llm_messages.append({"role": "user", "content": question})
    payload = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": llm_messages,
        "temperature": 0.7,
    }

    headers = {
        "Authorization": f"Bearer {LLAMA_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(
            LLAMA_API_URL,
            json=payload,
            headers=headers,
        )

    response.raise_for_status()
    data = response.json()

    assistant_reply = data["choices"][0]["message"]["content"]

    # ---------
    last_message = messages_collection.find_one(
        {"chatId": chat_id}, sort=[("sequence", -1)]
    )
    next_sequence = (last_message["sequence"] + 1) if last_message else 1

    user_message = {
        "chatId": chat_id,
        "role": "user",
        "content": question,
        "sequence": next_sequence,
        "createdAt": datetime.utcnow(),
    }

    messages_collection.insert_one(user_message)

    assistant_replyObj = {
        "chatId": chat_id,
        "role": "assistant",
        "content": assistant_reply,
        "sequence": next_sequence + 1,
        "createdAt": datetime.utcnow(),
    }

    messages_collection.insert_one(assistant_replyObj)

    obj = {"question": question, "answer": assistant_reply, "isNew": False}

    return {"message": "Successfull", "data": obj}
