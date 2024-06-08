# schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    is_admin: bool = False

class UserOut(UserBase):
    id: int
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True  # Update for pydantic V2

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class InformationBase(BaseModel):
    title: str
    content: str
    published: bool = True

class InformationCreate(InformationBase):
    pass

class InformationOut(InformationBase):
    id: int
    created_at: datetime
    user_id: int
    owner: UserOut

    class Config:
        from_attributes = True  # Update for pydantic V2

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None

class ChatbotResponse(BaseModel):
    write_up: str
