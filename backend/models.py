from sqlalchemy import Boolean, Column, Integer, String
from database import Base
import uuid

class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title_text = Column(String, index=True)
    detail_text = Column(String, index=True)
    is_completed = Column(Boolean, default=False)
