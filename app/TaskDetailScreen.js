import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useTasks } from '../context/TasksContext';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export default function TaskDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { tasks, toggleComplete } = useTasks();

  // Encontra a tarefa atual pelo id
  const task = tasks.find(function(t) {
    return t.id === params.id;
  });

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  const handleConfirmDone = () => {
    if (task.completed) {
      Alert.alert('Atenção', 'Esta tarefa já foi marcada como concluída.');
      return;
    }
    toggleComplete(task.id);
    Alert.alert('Parabéns!', 'Tarefa marcada como concluída!');
    router.back();
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
      <View style={styles.card}>
        <MaterialIcons name={task.icon} size={60} color="#507daf" style={{ marginBottom: 10 }} />
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskSchedule}>{formatSchedule(task.schedule)}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: '/AddTaskScreen',
                params: {
                  id: task.id,
                  title: task.title,
                  schedule: task.schedule,
                  icon: task.icon,
                },
              });
            }}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: task.completed ? '#999' : '#7bc67b' }
            ]}
            onPress={handleConfirmDone}
            disabled={task.completed}
          >
            <Text style={styles.buttonText}>
              {task.completed ? 'Concluída' : 'Confirmar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eaf4ff' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 16, alignItems: 'center', width: '80%', elevation: 5 },
  taskTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  taskSchedule: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#a8c5e8', padding: 10, margin: 8, borderRadius: 20, width: '40%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
});
