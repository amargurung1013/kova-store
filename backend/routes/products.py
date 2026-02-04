from fastapi import APIRouter

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("/")
def get_products():
    return [
        {
            "id": 1,
            "name": "Black Hoodie",
            "price": 1499,
            "category": "Hoodie",
            "image": "https://via.placeholder.com/300",
            "description": "Warm black hoodie",
            "stock": 10
        },
        {
            "id": 2,
            "name": "White T-Shirt",
            "price": 699,
            "category": "T-Shirt",
            "image": "https://via.placeholder.com/300",
            "description": "Cotton white t-shirt",
            "stock": 25
        }
    ]
