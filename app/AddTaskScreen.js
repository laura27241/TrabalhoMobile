import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTasks } from '../context/TasksContext';
import * as Notifications from 'expo-notifications';
import { parse } from 'date-fns';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative as notificações para receber lembretes de tarefas.');
      }
    };

    getPermission();
  }, []);

  const scheduleNotification = async (taskTitle, scheduleText) => {
    try {
      // Faz o parse do texto digitado pelo usuário (ex: "22/06/2025 21:35")
      const parsedDate = parse(scheduleText, 'dd/MM/yyyy HH:mm', new Date());

      if (isNaN(parsedDate.getTime())) {
        Alert.alert('Formato inválido', 'Por favor, use o formato: dd/MM/yyyy HH:mm. Exemplo: 22/06/2025 21:35');
        return;
      }

      const notificationTime = new Date(parsedDate.getTime() - 5 * 60 * 1000);

      if (notificationTime <= new Date()) {
        console.log('Horário da notificação já passou. Não será agendada.');
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lembrete de Tarefa 📌',
          body: `Sua tarefa "${taskTitle}" começa em 5 minutos.`,
          sound: true,
        },
        trigger: { type: 'date', date: notificationTime },
      });

      console.log('Notificação agendada para:', notificationTime);
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  const handleAddTask = async () => {
    if (title.trim() === '' || schedule.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    await scheduleNotification(title, schedule);
    addTask(title, schedule);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        placeholder="Ex: Lavar roupa"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}> Dia/Horário:</Text>
      <TextInput
        placeholder="Ex: 22/06/2025 21:35"
        style={styles.input}
        value={schedule}
        onChangeText={setSchedule}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Salvar Tarefa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#eaf4ff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#77a3d0', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 16 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#77a3d0', padding: 12, borderRadius: 20, marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  cancelButton: { marginTop: 10, alignItems: 'center' },
  cancelButtonText: { color: '#77a3d0', fontWeight: 'bold' },
});
