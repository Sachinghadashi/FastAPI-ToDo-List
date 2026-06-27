from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.session import engine, Base
from app.routers import auth, todos, dashboard

# Create database tables automatically
# For a production setup, database migrations like Alembic are recommended.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Todo List API",
    description="Backend API for the Todo List Application",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(todos.router)
app.include_router(dashboard.router)

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "message": "Welcome to the Todo List API. Append /docs to view Swagger documentation."
    }
