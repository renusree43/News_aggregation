from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import Base, engine
from config.settings import get_settings
from models import user  # noqa: F401 - imports SQLAlchemy models before create_all
from routes import health, proxy, users


settings = get_settings()

app = FastAPI(title=settings.app_name)

# Allows Vite on 5173/5174 and local frontend preview ports.
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def create_tables() -> None:
    Base.metadata.create_all(bind=engine)


app.include_router(health.router)
app.include_router(users.router)
app.include_router(proxy.router)
