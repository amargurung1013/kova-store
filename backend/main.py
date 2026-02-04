from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
import shutil
import random
import time
from datetime import datetime, timedelta
from jose import jwt, JWTError

# Internal imports
from database import engine, SessionLocal
from models import Product, User, Order, Base
from email_utils import send_otp_email
# form routes.products import router as product_router # (Optional if you use routers)

# 1. Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Clothing Store API")

# 2. Mount Uploads Folder
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 3. CORS Settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SECURITY CONFIG ---
# FIX: Use a static key so tokens don't expire on server reload
SECRET_KEY = "my_super_secret_static_key_123" 
ALGORITHM = "HS256"
security = HTTPBearer()

# --- AUTH DEPENDENCY ---
def get_current_user(creds: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(creds.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        db = SessionLocal()
        # FIX: Check against 'email', not 'phone'
        user = db.query(User).filter(User.email == email).first()
        db.close()

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        # FIX: Removed 'if not user.is_admin' so regular customers can log in
        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def create_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(days=7), # Tokens last 7 days now
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# --- Pydantic Models ---
class ProductCreate(BaseModel):
    name: str
    price: float
    category: str
    image: str
    sizes: List[str]
    collection: str = None # <--- Add this (Optional)

class OrderCreate(BaseModel):
    items: list
    total_price: float

class ProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    phone: str

# --- ROUTES ---

@app.get("/")
def root():
    return {"message": "Backend is running"}

# 1. PRODUCTS
@app.get("/products")
def get_products(search: str = "", collection: str = "", category: str = ""): # <--- Added category param
    db = SessionLocal()
    query = db.query(Product)
    
    # Filter by Name (Search)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    
    # Filter by Collection (e.g. Winter)
    if collection:
        query = query.filter(Product.collection == collection)

    # Filter by Category (e.g. Jackets)
    if category:
        query = query.filter(Product.category == category) # <--- The logic was missing!
        
    products = query.all()
    db.close()
    return products

@app.get("/products/{product_id}")
def get_product(product_id: int):
    db = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()
    db.close()
    return product

@app.post("/products")
def create_product(product: ProductCreate): 
    db = SessionLocal()
    new_product = Product(
        name=product.name,
        price=product.price,
        category=product.category,
        image=product.image,
        sizes=product.sizes,
        collection=product.collection # <--- Save it to DB
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    db.close()
    return new_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    db = SessionLocal()
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        db.close()
        return {"error": "Product not found"}
    db.delete(product)
    db.commit()
    db.close()
    return {"message": "Product deleted"}

# 2. FILE UPLOAD
@app.post("/upload")
def upload_image(file: UploadFile = File(...)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_url": file_path}

# 3. AUTHENTICATION (OTP)
@app.post("/auth/send-otp")
async def send_otp(email: str):
    db = SessionLocal()
    otp = str(random.randint(100000, 999999))
    expires = int(time.time()) + 300

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, is_admin=False)
        db.add(user)
    
    user.otp = otp
    user.otp_expires = expires
    db.commit()
    
    await send_otp_email(email, otp)
    db.close()
    return {"message": "OTP sent"}

@app.post("/auth/verify-otp")
def verify_otp(email: str, otp: str):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if not user or user.otp != otp or user.otp_expires < int(time.time()):
        db.close()
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    user.otp = None 
    user.otp_expires = 0 
    db.commit()
    
    token = create_token(user.email)
    return {"access_token": token, "is_admin": user.is_admin}

# 4. ORDERS
@app.post("/orders")
def create_order(order: OrderCreate, user = Depends(get_current_user)):
    db = SessionLocal()
    new_order = Order(
        user_id=user.id,
        items=order.items,
        total_price=order.total_price,
        status="Processing",
        created_at=datetime.utcnow()
    )
    db.add(new_order)
    db.commit()
    db.close()
    return {"message": "Order placed successfully!"}

@app.get("/orders/my")
def get_my_orders(user = Depends(get_current_user)):
    db = SessionLocal()
    orders = db.query(Order).filter(Order.user_id == user.id).all()
    db.close()
    return orders

# 5. USER PROFILE
@app.get("/users/me")
def get_me(user = Depends(get_current_user)):
    return user

@app.put("/users/profile")
def update_profile(profile: ProfileUpdate, user = Depends(get_current_user)):
    db = SessionLocal()
    db_user = db.query(User).filter(User.id == user.id).first()
    
    db_user.first_name = profile.first_name
    db_user.last_name = profile.last_name
    db_user.phone = profile.phone
    
    db.commit()
    db.close()
    return {"message": "Profile updated"}