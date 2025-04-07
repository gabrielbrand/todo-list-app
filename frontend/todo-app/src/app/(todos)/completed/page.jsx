"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import TopBarCompleted from '@/components/TopBarCompleted';
import MobileTemplatePurple from '@/components/MobileTemplatePurple';
import TaskCompleted from '@/components/TaskCompleted';

export default function CompletedPage() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('https://singular-api-gabriel.5eh2fn.easypanel.host/tasks/');
        setCompletedTasks(response.data.filter(task => task.is_completed === true));
      } catch (error) {
        console.error('Erro ao carregar tarefas completas:', error);
      }
    };
    
    fetchCompletedTasks();
  }, []);


  return (
    <div>
      <TopBarCompleted />
      <MobileTemplatePurple>
        {completedTasks.map(task => (
          <TaskCompleted
            key={task.id}
            title={task.title_text}
            detail={task.detail_text}
          />
        ))}
      </MobileTemplatePurple>
    </div>
  );
}