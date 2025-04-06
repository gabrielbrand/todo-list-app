from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class TaskBase(BaseModel):
    id: int
    title_text: str
    detail_text: str
    is_completed: Optional[bool] = False

class TaskUpdate(BaseModel):
    title_text: str
    detail_text: str

class TaskCreate(BaseModel):
    title_text: str
    detail_text: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/tasks/", response_model=List[TaskBase])
async def read_tasks(db: db_dependency):
    result = db.query(models.Tasks).order_by(models.Tasks.id.desc()).all()
    if not result:
        raise HTTPException(status_code=404, detail='Nenhuma task encontrada')
    return result


@app.get("/tasks/{task_id}", response_model=TaskBase)
async def read_task(task_id: int, db: db_dependency):
    result = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not result:
        raise HTTPException(status_code=404, detail='Task não encontrada')
    return result


@app.post("/tasks/", response_model=TaskBase)
async def create_tasks(task: TaskCreate, db: db_dependency):
    db_task = models.Tasks(
        title_text=task.title_text,
        detail_text=task.detail_text,
        is_completed=False 
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.delete("/tasks/{task_id}")
async def delete_tasks(task_id: int, db: db_dependency):
    result = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not result:
        raise HTTPException(status_code=404, detail='Task não foi encontrada')
    db.delete(result)
    db.commit()

# Adicione este novo modelo para atualização parcial
class TaskCompletionUpdate(BaseModel):
    is_completed: bool

# Adicione este novo endpoint para atualizar apenas o status de completude
@app.patch("/tasks/{task_id}/complete", response_model=TaskBase)
async def update_task_completion(
    task_id: int, 
    completion: TaskCompletionUpdate, 
    db: db_dependency
):
    db_task = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail='Task não encontrada')
    
    db_task.is_completed = completion.is_completed
    db.commit()
    db.refresh(db_task)
    return db_task

# Atualize o endpoint PUT para não modificar o is_completed
@app.put("/tasks/{task_id}", response_model=TaskBase)
async def update_tasks(task_id: int, update_tasks: TaskUpdate, db: db_dependency):
    result = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()
    if not result:
        raise HTTPException(status_code=404, detail='Task não foi encontrada')
    
    result.title_text = update_tasks.title_text
    result.detail_text = update_tasks.detail_text
    db.commit()
    db.refresh(result)
    return result

