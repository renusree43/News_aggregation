from fastapi import APIRouter, HTTPException

from config.database import check_database
from config.settings import get_settings
from models.schemas import HealthResponse


router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    settings = get_settings()
    try:
        check_database()
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Database connection failed: {exc}") from exc

    return HealthResponse(
        status="ok",
        database="connected",
        spring_backend_url=settings.spring_backend_url,
    )
