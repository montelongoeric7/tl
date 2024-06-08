from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import app.models as models
import app.schemas as schemas
from app.database import get_db
import app.oauth2 as oauth2
from app.config import settings
import openai
from langchain_community.llms import OpenAI

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"],
)

openai.api_key = settings.openai_api_key

def write_up(user_info: str) -> str:
    llm = OpenAI(api_key=openai.api_key)
    prompt = f"You are a traffic and ticket lawyer in California. Given the following information, write up a trial by written declaration document in defense of your client:\n\n{user_info}"
    response = llm(prompt)
    # Split response into lines
    causes = response.split('\n')
    formatted_causes = []
    for index, cause in enumerate(causes, 1):
        formatted_causes.append(f"{index}. {cause.strip()}")

    return "\n".join(formatted_causes)

@router.post("/lawyer_up", response_model=schemas.ChatbotResponse)
def lawyer_up(current_user: models.User = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    user_info = db.query(models.Information).filter(models.Information.user_id == current_user.id).all()

    if not user_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No information found for the current user")

    user_info_str = "\n".join([f"Title: {info.title}, Content: {info.content}" for info in user_info])
    write_up_result = write_up(user_info_str)

    return {"write_up": write_up_result}

