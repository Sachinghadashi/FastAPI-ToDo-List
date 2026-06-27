from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.todo import Todo
from app.models.user import User
from app.schemas.dashboard import DashboardStats
from app.auth.jwt import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("", response_model=DashboardStats)
def get_dashboard_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todos_query = db.query(Todo).filter(Todo.user_id == current_user.id)
    
    total_tasks = todos_query.count()
    completed_tasks = todos_query.filter(Todo.status == True).count()
    pending_tasks = todos_query.filter(Todo.status == False).count()
    
    now = datetime.utcnow()
    # Overdue means status is False, due_date is set, and it is less than now
    overdue_tasks = todos_query.filter(
        Todo.status == False,
        Todo.due_date != None,
        Todo.due_date < now
    ).count()
    
    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "overdue_tasks": overdue_tasks
    }
