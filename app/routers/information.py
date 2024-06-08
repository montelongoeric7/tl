# information.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import app.models as models
import app.schemas as schemas
from app.database import get_db
import app.oauth2 as oauth2
from typing import List

router = APIRouter(
    prefix="/information",
    tags=["Information"],
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.InformationOut)
def create_information(information: schemas.InformationCreate, db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    new_information = models.Information(**information.dict(), user_id=current_user.id)
    db.add(new_information)
    db.commit()
    db.refresh(new_information)
    return new_information


@router.get("/", response_model=List[schemas.InformationOut])
def get_informations(db: Session = Depends(get_db), current_user: models.User = Depends(oauth2.get_current_user)):
    if current_user.is_admin:
        information=db.query(models.Information).all()
    else:
        information=db.query(models.Information).filter(models.Information.user_id==current_user.id).all()
    return information


@router.get("/{id}", response_model=schemas.InformationOut)
def get_information(id:int,db:Session=Depends(get_db),current_user:models.User=Depends(oauth2.get_current_user)):
    information=db.query(models.Information).filter(models.Information.id==id).first()
    if not information:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Information not found")
    if information.user_id!=current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,detail="You are not authorized to access this information")
    return information