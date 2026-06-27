import os
import sys
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from sqlalchemy import create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("Error: DATABASE_URL is not set in your backend/.env file!")
    sys.exit(1)

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+pg8000://", 1)

print(f"Attempting to connect to database using driver pg8000: {DATABASE_URL}")

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
        print("\n[SUCCESS] Database connection SUCCESSFUL! The database is reachable.")
except Exception as e:
    print(f"\n[FAIL] Database connection FAILED!")

    print(f"Error Details: {e}")
    print("\nTroubleshooting tips:")
    print("1. Make sure your PostgreSQL server is active and running.")
    print("2. Ensure that the database (default 'todo_db') actually exists. You can create it in pgAdmin or psql using: CREATE DATABASE todo_db;")
    print("3. Check your database credentials (username, password, port) in your backend/.env file.")
    sys.exit(1)
