import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Cadastro</Text>

      <TextInput placeholder="Nome Completo" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
      <TextInput placeholder="Confirmar senha" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/LoginScreen')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
        <Text style={styles.link}>Já possui uma conta? Entre!</Text>
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