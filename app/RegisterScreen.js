import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const criarConta = async () => {
  if (!nome || !email || !senha || !confirmarSenha) {
    setErro('Preencha todos os campos');
    return;
  }

  if (senha !== confirmarSenha) {
    setErro('As senhas não coincidem');
    return;
  }
  try {
    const user = { nome, email, senha };
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    await AsyncStorage.setItem('userEmail', email); 
    router.push('/LoginScreen');
  } catch (e) {
    setErro('Erro ao criar conta');
    console.error(e);
  }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Cadastro</Text>

      <TextInput placeholder="Nome Completo" style={styles.input} onChangeText={setNome} value={nome} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} value={senha} />
      <TextInput placeholder="Confirmar senha" secureTextEntry style={styles.input} onChangeText={setConfirmarSenha} value={confirmarSenha} />

      <TouchableOpacity style={styles.button} onPress={criarConta}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
        <Text style={styles.link}>Já possui uma conta? Entre!</Text>
      </TouchableOpacity>

      {erro ? <Text style={{ color: 'red' }}>{erro}</Text> : null}
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