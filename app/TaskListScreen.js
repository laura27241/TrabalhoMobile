import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const tasks = [
  { id: '1', title: 'Lavar roupa', schedule: 'quinta-feira às 21:30', icon: 'local-laundry-service' },
  { id: '2', title: 'Fazer Rancho Supermercado', schedule: 'Sábado às 10:00', icon: 'shopping-cart' },
  { id: '3', title: 'Tomar Remédio', schedule: 'Todos os dias às 22:30', icon: 'medication' },
];

export default function TaskListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const router = useRouter();  
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
          onChangeText={(text) => {
            setSearch(text);
            const filtered = tasks.filter(task =>
              task.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredTasks(filtered);
          }}
        />
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={() => router.push({pathname: '/TaskDetailScreen',params: {id: item.id, title: item.title, schedule: item.schedule, icon: item.icon}})}>
            <MaterialIcons name={item.icon} size={28} color="#507daf" style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.schedule}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/AddTasklScreen')}>
        <Text style={styles.buttonText}>+ Adicionar tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#eaf4ff', paddingBottom: 30 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10},
  searchIcon: { margin: 8},
  title: { fontSize: 32, fontWeight: 'bold', color: '#77a3d0', textAlign: 'center' },
  subtitle: { fontSize: 20, marginVertical: 10, color: '#333' },
  searchInput: {  flex: 1, paddingTop: 12, fontSize: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 10 },
  task: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#a8c5e8', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
