"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskHome from '@/components/TaskHome';
import MobileTemplatePurple from '@/components/MobileTemplatePurple';
import TopBarHome from '@/components/TopBarHome';
import BottomBar from '@/components/BottomBar';
import NewTask from '@/components/NewTask';
import { useRouter } from 'next/navigation';
import { toggleTaskCompletion } from '@/services/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    tasksList();
  }, []);

  const tasksList = async () => {
    try {
      const response = await axios.get('https://singular-api-gabriel.5eh2fn.easypanel.host/tasks/');
      setTasks(response.data.filter(task => !task.is_completed));
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

const handleCompleteTask = async (taskId) => {
  try {
    const response = await toggleTaskCompletion(taskId, true);
    
    if (response.is_completed) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
      router.refresh();
    }
  } catch (error) {
    console.error('Erro ao completar tarefa:', error.message);
  }
};

const handleDeleteTask = async (taskId) => {
  try {
    await axios.delete(`https://singular-api-gabriel.5eh2fn.easypanel.host/tasks/${taskId}/`);
    setTasks(tasks.filter(task => task.id !== taskId));
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
};


  const addTaskButton = async (newTask) => {
    try {
      const response = await axios.post('https://singular-api-gabriel.5eh2fn.easypanel.host/tasks/', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };



  
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopBarHome />
      
      <MobileTemplatePurple>
        <>
          {tasks.map(task => (
            <TaskHome 
              key={task.id}
              id={task.id}
              title={task.title_text}
              detail={task.detail_text}
              onDelete={handleDeleteTask}
              onComplete={handleCompleteTask}
            />
          ))}
          
          <NewTask onClick={addTaskButton} />
        </>
      </MobileTemplatePurple>
      
      <BottomBar />
    </div>
  );
}