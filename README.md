# KOVA Store 🚀
A full-stack streetwear e-commerce brand built with **React (Vite)** and **FastAPI**.

## 🛠️ Prerequisites
Make sure you have these installed:
* [Node.js](https://nodejs.org/) (for the frontend)
* [Python](https://www.python.org/) (for the backend)

---

## 🚀 How to Run locally

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/YOUR_USERNAME/kova-store.git](https://github.com/YOUR_USERNAME/kova-store.git)
cd kova-store
```

### 2. Setup Backend
Open a terminal in the kova-store folder:
cd backend

### Create virtual environment
python -m venv venv

### Activate it
### Windows:
venv\Scripts\activate
### Mac/Linux:
source venv/bin/activate

### Install dependencies
pip install -r requirements.txt

### Run the Server
uvicorn main:app --reload

### 3. Setup Frontend
Open a new terminal (keep the other one running)

cd frontend

### Install dependencies
npm install

### Run the website
npm run dev
