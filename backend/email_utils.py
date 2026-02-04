import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def send_otp_email(email: str, otp: str):
    sender_email = os.getenv("MAIL_USERNAME")
    password = os.getenv("MAIL_PASSWORD")
    
    if not sender_email or not password:
        print("❌ ERROR: Email credentials missing in .env file")
        return False

    # Create the email content
    message = MIMEMultipart("alternative")
    message["Subject"] = "Your KOVA Login Code"
    message["From"] = sender_email
    message["To"] = email

    # HTML Version (Prettier)
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-w-md mx-auto p-6 border border-gray-200 rounded-lg">
          <h2 style="color: #000; text-transform: uppercase;">Admin Access</h2>
          <p>You requested a secure login code for the KOVA Dashboard.</p>
          
          <div style="background: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px;">{otp}</span>
          </div>
          
          <p style="font-size: 12px; color: #666;">If you didn't request this, please ignore this email.</p>
        </div>
      </body>
    </html>
    """
    
    # Attach HTML part
    message.attach(MIMEText(html, "html"))

    try:
        # Connect to Gmail's SSL Server
        print(f"📧 Connecting to Gmail to send to {email}...")
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, password)
            server.send_message(message)
        
        print(f"✅ Email sent successfully to {email}")
        return True
    
    except Exception as e:
        print(f"❌ Email Failed: {e}")
        return False