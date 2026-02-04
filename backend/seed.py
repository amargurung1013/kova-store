from database import SessionLocal, engine
from models import Product, Base

# 1. RESET DATABASE (Deletes old data so we start fresh)
print("♻️  Resetting database...")
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

db = SessionLocal()
print("🌱 Seeding Database...")

BASE_URL = "http://127.0.0.1:8000/uploads"

# --- WINTER COLLECTION (The New Drop) ---
winter_items = [
    # JACKETS
    {
        "name": "KOVA The Aspen Puffer - Green",
        "price": 5999.0,
        "category": "Jackets",
        "image": f"{BASE_URL}/green-aspen.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    {
        "name": "KOVA The Aspen Puffer - Blue",
        "price": 5999.0,
        "category": "Jackets",
        "image": f"{BASE_URL}/blue-aspen.jpeg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    {
        "name": "KOVA The Aspen Puffer - Black",
        "price": 5999.0,
        "category": "Jackets",
        "image": f"{BASE_URL}/black-aspen.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    # SWEATERS
    {
        "name": "KOVA Merino Mock Neck - Green",
        "price": 2499.0,
        "category": "Sweater",
        "image": f"{BASE_URL}/merino-green.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    {
        "name": "KOVA Merino Mock Neck - Blue",
        "price": 2499.0,
        "category": "Sweater",
        "image": f"{BASE_URL}/merino-blue.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    {
        "name": "KOVA Merino Mock Neck - Beige",
        "price": 2499.0,
        "category": "Sweater",
        "image": f"{BASE_URL}/merino-beige.jpg",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Winter"
    },
    # PANTS (Winter Cargos)
    {
        "name": "KOVA Glacier Cargo Pant - Green",
        "price": 3999.0,
        "category": "Pants",
        "image": f"{BASE_URL}/green-cargo.jpg",
        "sizes": ["30", "32", "34", "36"],
        "collection": "Winter"
    },
    {
        "name": "KOVA Glacier Cargo Pant - Blue",
        "price": 3999.0,
        "category": "Pants",
        "image": f"{BASE_URL}/cargo-blue.jpg",
        "sizes": ["30", "32", "34", "36"],
        "collection": "Winter"
    },
    {
        "name": "KOVA Glacier Cargo Pant - Black",
        "price": 3999.0,
        "category": "Pants",
        "image": f"{BASE_URL}/black-cargo.jpg",
        "sizes": ["30", "32", "34", "36"],
        "collection": "Winter"
    }
]

# --- STANDARD ITEMS (Essentials / T-Shirts) ---
standard_items = [
    {
        "name": "Oversized Street Tee - Black",
        "price": 1499.0,
        "category": "T-Shirts",
        "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "collection": "Essentials"
    },
    {
        "name": "Heavyweight Cotton Tee - White",
        "price": 1499.0,
        "category": "T-Shirts",
        "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
        "sizes": ["S", "M", "L", "XL"],
        "collection": "Essentials"
    },
    {
        "name": "Urban Bomber Jacket",
        "price": 4999.0,
        "category": "Jackets",
        "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
        "sizes": ["M", "L", "XL"],
        "collection": "Essentials"
    }
]

# COMBINE AND ADD TO DATABASE
all_products = winter_items + standard_items

for item in all_products:
    db.add(Product(**item))

db.commit()
db.close()
print(f"✅ Success! Added {len(all_products)} products to the database.")