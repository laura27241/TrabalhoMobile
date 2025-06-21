import React, { createContext, useContext, useState, ReactNode } from 'react';

type Task = {
  id: string;
  title: string;
  schedule: string;
  icon: string;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, schedule: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Lavar roupa', schedule: 'quinta-feira às 21:30', icon: 'local-laundry-service' },
    { id: '2', title: 'Fazer Rancho Supermercado', schedule: 'Sábado às 10:00', icon: 'shopping-cart' },
    { id: '3', title: 'Tomar Remédio', schedule: 'Todos os dias às 22:30', icon: 'medication' },
  ]);

  const addTask = (title: string, schedule: string) => {
    let icon = 'check-circle';
    if (title.toLowerCase().includes('roupa')) icon = 'local-laundry-service';
    else if (title.toLowerCase().includes('rancho') || title.toLowerCase().includes('mercado')) icon = 'shopping-cart';
    else if (title.toLowerCase().includes('remédio')) icon = 'medication';

    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title,
      schedule,
      icon,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
};
