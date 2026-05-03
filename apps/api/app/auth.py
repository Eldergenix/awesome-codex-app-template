from __future__ import annotations

import hashlib
import hmac
import time
from typing import Annotated

import jwt
from fastapi import Depends, Header, HTTPException, status
from jwt import PyJWKClient

from .settings import settings


class Principal(dict):
    @property
    def subject(self) -> str:
        return str(self.get("sub", ""))


def verify_supabase_jwt(authorization: Annotated[str | None, Header()] = None) -> Principal:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token")
    if not settings.supabase_jwks_url:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="JWKS URL not configured")
    token = authorization.removeprefix("Bearer ").strip()
    jwks_client = PyJWKClient(settings.supabase_jwks_url)
    signing_key = jwks_client.get_signing_key_from_jwt(token)
    claims = jwt.decode(token, signing_key.key, algorithms=["ES256", "RS256"], options={"verify_aud": False})
    return Principal(claims)


def verify_telegram_login(payload: dict[str, str], max_age_seconds: int = 86400) -> bool:
    received_hash = payload.get("hash", "")
    if not received_hash or not settings.telegram_bot_secret:
        return False
    auth_date = int(payload.get("auth_date", "0"))
    if time.time() - auth_date > max_age_seconds:
        return False
    check_items = [f"{key}={value}" for key, value in sorted(payload.items()) if key != "hash" and value is not None]
    data_check_string = "\n".join(check_items)
    secret_key = hashlib.sha256(settings.telegram_bot_secret.encode()).digest()
    computed = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, received_hash)


CurrentUser = Annotated[Principal, Depends(verify_supabase_jwt)]
