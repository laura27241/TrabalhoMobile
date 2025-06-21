import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useTasks } from '../context/TasksContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [schedule, setSchedule] = useState('');

  const handleAddTask = () => {
    if (title.trim() === '' || schedule.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
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

      <Text style={styles.label}>Horário/Agenda:</Text>
      <TextInput
        placeholder="Ex: Quinta-feira às 21:30"
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
