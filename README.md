# TaskFlow - Full-Stack Todo List Application

TaskFlow is a premium, responsive, full-stack Todo List application designed with a dark-mode theme. It supports user registration, secure JWT authentication, real-time dashboard analytics, search query filters, priority settings, and overdue indicators.

---

## Tech Stack

*   **Frontend**: React 19, Vite, Tailwind CSS (v4), Axios, React Router DOM (v6), Lucide Icons, React Hot Toast
*   **Backend**: FastAPI, SQLAlchemy (ORM), Uvicorn, Pydantic, Passlib (bcrypt), PyJWT (jose)
*   **Database**: PostgreSQL

---

## Folder Structure

```text
├── backend/
│   ├── app/
│   │   ├── auth/            # JWT validation & password hashing
│   │   ├── database/        # Database session setup
│   │   ├── models/          # SQLAlchemy Database entities (User, Todo)
│   │   ├── routers/         # API Route Handlers (auth, todos, dashboard)
│   │   ├── schemas/         # Pydantic Schemas (inputs & serialization)
│   │   ├── utils/
│   │   └── main.py          # FastAPI application entry point
│   ├── .env                 # Environment variables config
│   ├── requirements.txt     # Python package requirements
│   └── check_db.py          # Database connectivity validation helper
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable widgets (Navbar, TodoCard, TodoModal, Stats)
│   │   ├── context/         # AuthContext for login/logout/registration states
│   │   ├── layouts/         # Master Layout template
│   │   ├── pages/           # Login, Register, and Dashboard pages
│   │   ├── services/        # Axios API client wrapper
│   │   ├── App.jsx          # Route manager
│   │   ├── index.css        # Tailwind directives and custom themes
│   │   └── main.jsx         # React application mounting
│   ├── index.html           # SEO-optimized markup
│   ├── package.json         # NPM script dependencies
│   └── vite.config.js       # Vite bundler configurations
│
└── README.md                # Project documentation
```

---

## Setup & Running Instructions

### 1. Database Setup

1.  Open your PostgreSQL console (`psql`) or management tool (e.g., pgAdmin).
2.  Create a database called `todo_db`:
    ```sql
    CREATE DATABASE todo_db;
    ```

### 2. Backend Setup

1.  Navigate into the `backend/` directory:
    ```bash
    cd backend
    ```
2.  The virtual environment is already initialized. Activate it:
    *   **Windows (PowerShell)**:
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```
    *   **Windows (CMD)**:
        ```cmd
        .\venv\Scripts\activate.bat
        ```
    *   **Linux/macOS**:
        ```bash
        source venv/bin/activate
        ```
3.  Configure your environment variables. Open `backend/.env` and update the database credentials under `DATABASE_URL`:
    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
    ```
4.  Test if your database connection is active using the check script:
    ```bash
    python check_db.py
    ```
5.  Start the FastAPI development server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The server will start on [http://localhost:8000](http://localhost:8000). You can access the Swagger documentation page at [http://localhost:8000/docs](http://localhost:8000/docs).

---

### 3. Frontend Setup

1.  Open a new terminal session and navigate into the `frontend/` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies (already pre-scaffolded):
    ```bash
    npm install
    ```
3.  Start the Vite developer server:
    ```bash
    npm run dev
    ```
    The frontend client will spin up at [http://localhost:5173](http://localhost:5173). Open the URL in your browser to interact with the application!

---

## API Endpoints

### Authentication
*   `POST /api/auth/register` - Create user profile.
*   `POST /api/auth/login` - Sign in user and retrieve a JWT Access Token.
*   `GET  /api/auth/me` - Retrieve current active user profile information.

### Todos
*   `GET    /api/todos` - Retrieve list of user's own tasks.
*   `POST   /api/todos` - Create a new task.
*   `GET    /api/todos/{id}` - View specific task details.
*   `PUT    /api/todos/{id}` - Modify task configurations.
*   `DELETE /api/todos/{id}` - Remove task.
*   `PATCH  /api/todos/{id}/status` - Mark task as completed or incomplete.

### Analytics Dashboard
*   `GET /api/dashboard` - Get total task counts, completed tasks, pending tasks, and overdue tasks.
