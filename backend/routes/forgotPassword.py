# routes/forgotPassword.py
from fastapi import APIRouter, Request
from controllers.auth_controller import forgot_password_controller

router = APIRouter()


@router.post("/forgot-password")
async def forgot_password(request: Request):
    response = await request.json()
    email = response["email"]
    forgot_password_controller(email)
    return {"msg": "success"}
