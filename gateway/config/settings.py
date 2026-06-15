from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings


load_dotenv(Path(__file__).resolve().parents[1] / ".env")


class Settings(BaseSettings):
    app_name: str = Field(default="SDC Gateway", alias="APP_NAME")
    app_host: str = Field(default="127.0.0.1", alias="APP_HOST")
    app_port: int = Field(default=8000, alias="APP_PORT")
    frontend_origin: str = Field(default="http://localhost:5173", alias="FRONTEND_ORIGIN")
    spring_backend_url: str = Field(default="http://localhost:8001", alias="SPRING_BACKEND_URL")
    database_url: str = Field(default="sqlite:///./sdc_gateway.db", alias="DATABASE_URL")

    class Config:
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
