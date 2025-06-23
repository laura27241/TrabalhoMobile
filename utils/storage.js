import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTasks = async (tasks) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = async () => {
  const data = await AsyncStorage.getItem('tasks');
  return data ? JSON.parse(data) : [];
};
