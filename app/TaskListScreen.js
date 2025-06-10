import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const tasks = [
  { id: '1', title: 'Lavar roupa', schedule: 'quinta-feira às 21:30', icon: 'local-laundry-service' },
  { id: '2', title: 'Fazer Rancho Supermercado', schedule: 'Sábado às 10:00', icon: 'shopping-cart' },
  { id: '3', title: 'Tomar Remédio', schedule: 'Todos os dias às 22:30', icon: 'medication' },
];

export default function TaskListScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Tarefas:</Text>
      <TextInput placeholder="Buscar tarefa..." style={styles.searchInput} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={() => navigation.navigate('TaskDetail', { task: item })}>
            <MaterialIcons name={item.icon} size={28} color="#507daf" style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.schedule}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+ Adicionar tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#eaf4ff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#77a3d0', textAlign: 'center' },
  subtitle: { fontSize: 20, marginVertical: 10, color: '#333' },
  searchInput: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
  task: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#a8c5e8', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
