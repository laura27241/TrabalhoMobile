import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { AndroidImportance } from 'expo-notifications';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

type Task = {
  id: string;
  title: string;
  schedule: string; // Exemplo: '22/06/2025 21:35'
  icon: string;
  completed?: boolean;
};

type TasksContextType = {
  tasks: Task[];
  addTask: (title: string, schedule: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);
const STORAGE_KEY = '@TaskEasy:tasks';

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Criar canal de notificação no Android
  useEffect(() => {
    async function setupNotificationChannel() {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: AndroidImportance.HIGH,
        });
      }
    }
    setupNotificationChannel();
  }, []);

  // Pedir permissão de notificação
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };
    requestPermission();
  }, []);

  // Carregar tarefas salvas
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTasks(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas', error);
      }
    };
    loadTasks();
  }, []);

  // Salvar tarefas sempre que mudar
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar tarefas', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const addTask = async (title: string, schedule: string) => {
    let icon = 'check-circle';
    if (title.toLowerCase().includes('roupa')) icon = 'local-laundry-service';
    else if (title.toLowerCase().includes('rancho') || title.toLowerCase().includes('mercado')) icon = 'shopping-cart';
    else if (title.toLowerCase().includes('remédio')) icon = 'medication';

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      schedule,
      icon,
      completed: false,
    };

    setTasks(prev => [...prev, newTask]);

    // Agendar notificação 5 minutos antes
    try {
      const taskDate = parseDateFromString(schedule);
      if (taskDate) {
        const notificationTime = new Date(taskDate.getTime() - 5 * 60 * 1000);
        const timeDifferenceInSeconds = Math.floor((notificationTime.getTime() - Date.now()) / 1000);

        if (timeDifferenceInSeconds > 0) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Lembrete de Tarefa',
              body: `Sua tarefa "${title}" será às ${schedule}.`,
            },
            trigger: {
              channelId: 'default',
              seconds: timeDifferenceInSeconds,
            },
          });
          console.log('✅ Notificação agendada para:', notificationTime);
        } else {
          console.log('⚠️ Horário da notificação já passou.');
        }
      } else {
        console.warn('⚠️ Não foi possível interpretar a data:', schedule);
      }
    } catch (error) {
      console.error('❌ Erro ao agendar notificação:', error);
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleComplete, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

// Função para converter "22/06/2025 21:35" em Date
function parseDateFromString(dateString: string): Date | null {
  try {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    const date = new Date(year, month - 1, day, hours, minutes);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error('Erro ao converter data:', error);
    return null;
  }
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
};
