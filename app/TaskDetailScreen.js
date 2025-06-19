import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const task = { id: params.id, title: params.title, schedule: params.schedule, icon: params.icon};

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name={task.icon} size={60} color="#507daf" style={{ marginBottom: 10 }} />
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskSchedule}>{task.schedule}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: '/AddTaskScreen', params: {id: task.id, title: task.title, schedule: task.schedule, icon: task.icon}})}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#7bc67b' }]} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Confirmar</Text>
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
  buttonRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20,}
});