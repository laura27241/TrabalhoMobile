import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ navigation }) {
  console.log("navigation", navigation);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Login</Text>

      <TextInput placeholder="Email ou usuário" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/TaskListScreen")}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/RegisterScreen")}>
        <Text style={styles.link}>Não tem conta? Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eaf4ff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#77a3d0' },
  subtitle: { fontSize: 20, marginBottom: 20, color: '#77a3d0' },
  input: { width: '80%', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 10 },
  button: { backgroundColor: '#a8c5e8', padding: 12, borderRadius: 20, width: '60%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 20, color: '#1a73e8' },
});