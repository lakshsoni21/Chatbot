# routes/reset_password.py
from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from bson import ObjectId

from schemas.resetpassword import ResetPasswordRequest
from utils.security import hash_token, hash_password
from database import db

router = APIRouter(prefix="", tags=["Auth"])


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest):
    token_hash = hash_token(payload.token)

    reset_doc = db.password_resets.find_one({"token_hash": token_hash})
    expires_at = reset_doc["expires_at"]
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    now_ts = datetime.now(timezone.utc)

    # 1️⃣ Token exists?
    if not reset_doc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token",
        )

    # 2️⃣ Token already used?
    if reset_doc.get("used"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Reset token already used"
        )

    # 3️⃣ Token expired?
    if expires_at < now_ts:
        print(expires_at)
        print(now_ts)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Reset token expired"
        )

    user_id = reset_doc["user_id"]

    # 4️⃣ Update user password
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password": hash_password(payload.new_password)}},
    )

    # 5️⃣ Mark token as used
    db.password_resets.update_one(
        {"_id": reset_doc["_id"]},
        {"$set": {"used": True, "used_at": datetime.now(timezone.utc)}},
    )

    return {"message": "Password reset successful"}
