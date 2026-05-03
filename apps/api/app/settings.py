from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env.local", extra="ignore")

    supabase_url: str = ""
    supabase_jwks_url: str = ""
    telegram_bot_secret: str = ""
    environment: str = "local"


settings = Settings()
