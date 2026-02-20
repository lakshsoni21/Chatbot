# utils/email.py
import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()


def send_email(to: str, subject: str, body: str) -> None:
    """
    Sends a plain-text email.
    Raise exception if sending fails (caller can log / handle it).
    """

    email_user = os.getenv("email_user")
    email_pass = os.getenv("email_pass")

    if not email_user or not email_pass:
        raise RuntimeError("Email credentials are not set")

    msg = EmailMessage()
    msg["From"] = f"Your App <{email_user}>"
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    # Gmail SMTP (SSL)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email_user, email_pass)
        server.send_message(msg)
