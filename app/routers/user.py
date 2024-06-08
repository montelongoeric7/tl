from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
import app.models as models
import app.schemas as schemas
from app.database import get_db
import app.utils as utils
from typing import List
import app.oauth2 as oauth2

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_password = utils.hash_password(user.password)
    user.password = hashed_password
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this user")
    return user

@router.get("/", response_model=List[schemas.UserOut])
def get_users(db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access all users")
    users = db.query(models.User).all()
    return users

@router.put("/{id}", response_model=schemas.UserOut)
def update_user(id: int, user: schemas.UserCreate, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    user_db = db.query(models.User).filter(models.User.id == id).first()
    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user_db.id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this user")
    user_db.username = user.username
    user_db.email = user.email
    user_db.password = utils.hash_password(user.password)
    db.commit()
    db.refresh(user_db)
    return user_db
