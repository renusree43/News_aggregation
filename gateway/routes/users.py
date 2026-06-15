from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import get_db
from models.schemas import UserRead
from services.user_service import get_user_by_username, list_users


router = APIRouter(prefix="/gateway/users", tags=["users"])


@router.get("", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)) -> list[UserRead]:
    return list_users(db)


@router.get("/{username}", response_model=UserRead)
def get_user(username: str, db: Session = Depends(get_db)) -> UserRead:
    user = get_user_by_username(db, username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
