from database import SessionLocal
from models import User

# ENTER YOUR EMAIL HERE
TARGET_EMAIL = "amargurung1013@gmail.com" 

db = SessionLocal()
user = db.query(User).filter(User.email == TARGET_EMAIL).first()

if user:
    user.is_admin = True
    db.commit()
    print(f"👑 SUCCESS: {TARGET_EMAIL} is now an Admin!")
else:
    print(f"❌ ERROR: User {TARGET_EMAIL} not found. Try logging in once first to create the account.")

db.close()