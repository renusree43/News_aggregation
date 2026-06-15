from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class HealthResponse(BaseModel):
    status: str
    database: str
    spring_backend_url: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    role: str
    active: bool
    created_at: datetime
