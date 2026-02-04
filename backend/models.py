from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String, nullable=True) # New
    last_name = Column(String, nullable=True)  # New
    phone = Column(String, nullable=True)      # New
    is_admin = Column(Boolean, default=False)
    otp = Column(String, nullable=True)
    otp_expires = Column(Integer, nullable=True)
    
    # Link User to Orders
    orders = relationship("Order", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    category = Column(String)
    image = Column(String)
    sizes = Column(JSON)
    collection = Column(String, nullable=True)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_price = Column(Float)
    items = Column(JSON) # We will store the cart items as a JSON list
    status = Column(String, default="Processing")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="orders")