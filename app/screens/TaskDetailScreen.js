import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <MaterialIcons name={task.icon} size={60} color="#507daf" style={{ marginBottom: 10 }} />
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskSchedule}>{task.schedule}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eaf4ff' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 16, alignItems: 'center', width: '80%', elevation: 5 },
  taskTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
  taskSchedule: { fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#a8c5e8', padding: 12, borderRadius: 20, width: '60%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});