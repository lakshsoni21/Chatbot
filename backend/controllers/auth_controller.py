# controllers/auth_controller.py
from datetime import datetime, timedelta, timezone
import secrets
import hashlib
import os
from dotenv import load_dotenv

from database import users_collection, password_resets_collection
from utils.email import send_email

load_dotenv()
FRONTEND_URL = os.getenv("FRONTEND_URL")


def forgot_password_controller(email: str):
    user = users_collection.find_one({"email": email})

    # 🔒 Always same response
    if not user:
        return {"message": "If the email exists, a reset link has been sent."}

    # 1️⃣ Generate secure random token
    raw_token = secrets.token_hex(32)

    # 2️⃣ Hash token before storing
    token_hash = hashlib.sha256(raw_token.encode()).hexdigest()

    # 3️⃣ Save reset request in separate collection
    password_resets_collection.insert_one(
        {
            "user_id": user["_id"],
            "token_hash": token_hash,
            "expires_at": datetime.now(timezone.utc) + timedelta(minutes=15),
            "used": False,
        }
    )

    # 4️⃣ Build reset link
    reset_link = f"{FRONTEND_URL}/reset-password" f"?token={raw_token}"

    # 5️⃣ Send email
    send_email(
        to=user["email"],
        subject="Reset your password",
        body=f"""
You requested a password reset.

Click the link below to set a new password:
{reset_link}

This link expires in 15 minutes.
If you didn't request this, ignore this email.
""",
    )

    return {"message": "If the email exists, a reset link has been sent."}
