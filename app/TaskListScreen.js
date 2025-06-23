import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTasks } from '../context/TasksContext';
import * as Notifications from 'expo-notifications';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks, toggleComplete } = useTasks();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Ative as notificações para receber lembretes de tarefas.');
      }
    };

    getPermission();
  }, []);

  const scheduleNotification = async (task) => {
    try {
      const taskDate = parseISO(task.schedule);
      const notificationTime = new Date(taskDate.getTime() - 5 * 60 * 1000);

      if (notificationTime <= new Date()) {
        console.log('Horário da notificação já passou.');
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lembrete de Tarefa 📌',
          body: `Sua tarefa "${task.title}" começa em 5 minutos.`,
          sound: true,
        },
        trigger: { type: 'date', date: notificationTime },
      });

      console.log('Notificação agendada para:', notificationTime);
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleComplete = (id) => {
    toggleComplete(id);
    Alert.alert('Tarefa concluída', 'A tarefa foi marcada como concluída!');
  };

  const formatSchedule = (isoString) => {
    try {
      const date = parseISO(isoString);
      return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return isoString;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Tarefas:</Text>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#777" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar tarefa..."
          style={styles.searchInput}
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.task,
              item.completed && { backgroundColor: '#d2ffd2' }
            ]}
            onPress={async () => {
              await scheduleNotification(item);
              router.push({
                pathname: '/TaskDetailScreen',
                params: {
                  id: item.id,
                  title: item.title,
                  schedule: item.schedule,
                  icon: item.icon,
                },
              });
            }}
            onLongPress={() => handleComplete(item.id)}
          >
            <MaterialIcons name={item.icon} size={28} color="#507daf" style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{formatSchedule(item.schedule)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/AddTaskScreen')}>
        <Text style={styles.buttonText}>+ Adicionar tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#eaf4ff', paddingBottom: 30 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  searchIcon: { margin: 8 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#77a3d0', textAlign: 'center' },
  subtitle: { fontSize: 20, marginVertical: 10, color: '#333' },
  searchInput: { flex: 1, paddingTop: 12, fontSize: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  task: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#a8c5e8', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
