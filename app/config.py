from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    database_hostname: str
    database_port: int
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    openai_api_key: str

    class Config:
        env_file = Path(__file__).parent.parent / ".env"

settings = Settings()

print(settings.dict())