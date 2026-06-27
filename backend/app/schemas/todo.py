from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    priority: str = Field("Medium", pattern="^(Low|Medium|High)$")
    due_date: Optional[datetime] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    priority: Optional[str] = Field(None, pattern="^(Low|Medium|High)$")
    status: Optional[bool] = None
    due_date: Optional[datetime] = None

class TodoPatchStatus(BaseModel):
    status: bool

class TodoOut(TodoBase):
    id: int
    user_id: int
    status: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
