# Implementation Plan - Full-Stack Todo List Application

This project is a modern, responsive, full-stack Todo List application featuring robust user authentication (JWT) and dashboard analytics.

## Tech Stack
*   **Frontend**: React 19, Vite, Tailwind CSS, Axios, React Router DOM (v6), React Icons, React Hot Toast
*   **Backend**: FastAPI, SQLAlchemy (ORM), Pydantic, Uvicorn, PostgreSQL, Passlib (bcrypt), PyJWT
*   **Database**: PostgreSQL

---

## Folder Structure

```text
backend/
├── app/
│   ├── auth/
│   │   ├── __init__.py
│   │   └── jwt.py
│   ├── database/
│   │   ├── __init__.py
│   │   └── session.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── todo.py
│   │   └── user.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── dashboard.py
│   │   └── todos.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── dashboard.py
│   │   ├── todo.py
│   │   └── user.py
│   ├── utils/
│   │   └── __init__.py
│   └── main.py
├── .env
└── requirements.txt

frontend/
├── src/
│   ├── components/
│   │   ├── DashboardStats.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── TodoCard.jsx
│   │   └── TodoModal.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Backend Modules

### 1. Database Setup (`backend/app/database/session.py`)
*   Initialize SQLAlchemy Engine using an environment variable `DATABASE_URL`.
*   Create a `SessionLocal` class.
*   Create a `Base` class using `declarative_base()`.
*   Provide a dependency function `get_db()` to manage session lifecycles.

### 2. Models (`backend/app/models/`)
*   `User`: fields `id`, `name`, `email`, `password_hash`, `created_at`.
*   `Todo`: fields `id`, `user_id`, `title`, `description`, `priority` (enum/string), `status` (boolean/string), `due_date`, `created_at`, `updated_at`. Contains relationship back to `User`.

### 3. Auth Service (`backend/app/auth/jwt.py`)
*   Password hashing and verification using `passlib.context.CryptContext` with `bcrypt`.
*   JWT creation and validation using `PyJWT` (or `python-jose`).
*   Dependency injection for extracting and verifying the logged-in user from the JWT token.

### 4. Schemas (`backend/app/schemas/`)
*   User Schemas: `UserRegister`, `UserLogin`, `UserOut`.
*   Todo Schemas: `TodoCreate`, `TodoUpdate`, `TodoOut`, `TodoPatchStatus`.
*   Dashboard Schemas: `DashboardStats`.

### 5. Routers (`backend/app/routers/`)
*   `auth`: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`.
*   `todos`: `/api/todos` (GET, POST), `/api/todos/{id}` (GET, PUT, DELETE), `/api/todos/{id}/status` (PATCH).
*   `dashboard`: `/api/dashboard` (GET - calculates total, completed, pending, overdue tasks).

### 6. Main (`backend/app/main.py`)
*   FastAPI application instance setup.
*   CORS configuration to allow the React frontend to communicate.
*   Include routers.
*   Create database tables on startup.

---

## Frontend Modules

### 1. Style & Tailwind Config
*   Add Inter font.
*   Configure Tailwind with custom colors and transitions to support rich dark-modern aesthetics.

### 2. Context API (`frontend/src/context/AuthContext.jsx`)
*   Manage state for: logged-in user, JWT authentication token, loading states.
*   Provide `login`, `register`, `logout` functions.
*   Set authorization header on Axios.

### 3. API Service (`frontend/src/services/api.js`)
*   Axios instance configured with base URL and automatic Authorization headers.
*   Endpoints for authentication, todos (CRUD, complete), and dashboard stats.

### 4. Router and Layouts
*   Define Protected Routes that redirect unauthorized users to the Login page.
*   `MainLayout` including a Navbar with log out capability and current user context.

### 5. Pages
*   **Login**: Clean card interface with form validation.
*   **Register**: Card layout with fields for Name, Email, Password, and Confirm Password with client-side validation.
*   **Dashboard**:
    *   Responsive statistics section showing Total, Completed, Pending, and Overdue tasks.
    *   Action button to "Add Todo".
    *   Search and Filter (All, Pending, Completed) toggles.
    *   Dynamic listing of todo cards.
    *   Edit modal / Slide-over and Confirmation modals for deletion.

---

## Setup & Execution Plan
1.  **Backend**:
    *   Create virtual environment.
    *   Install backend dependencies.
    *   Write backend files.
    *   Add a test script to check database connectivity.
2.  **Frontend**:
    *   Create standard Vite React-Tailwind setup.
    *   Install frontend dependencies (`axios`, `react-router-dom`, `lucide-react` for icons, `react-hot-toast`).
    *   Write frontend components and services.
3.  **End-to-End Verification**:
    *   Check both services run correctly and communicate with each other.
