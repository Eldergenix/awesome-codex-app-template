from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .auth import CurrentUser, verify_telegram_login

app = FastAPI(title="Enterprise API", version="0.1.0")


class HealthResponse(BaseModel):
    ok: bool = True
    service: str = "api"


class TelegramLoginPayload(BaseModel):
    id: str
    auth_date: str
    hash: str
    first_name: str | None = None
    last_name: str | None = None
    username: str | None = None
    photo_url: str | None = Field(default=None)


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse()


@app.get("/me")
def me(user: CurrentUser) -> dict[str, str]:
    return {"id": user.subject}


@app.post("/auth/telegram/verify")
def telegram_verify(payload: TelegramLoginPayload) -> dict[str, bool]:
    if not verify_telegram_login(payload.model_dump(exclude_none=True)):
        raise HTTPException(status_code=401, detail="Invalid Telegram login payload")
    return {"ok": True}
