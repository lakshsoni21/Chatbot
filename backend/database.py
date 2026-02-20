from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["chatbot_db"]

users_collection = db["users"]
chats_collection = db["chats"]
messages_collection = db["messages"]
password_resets_collection = db["password_resets"]
