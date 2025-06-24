import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedEmail) {
        router.push('/TaskListScreen');
      }
    };
    checkLogin();
  }, []);

  const fazerLogin = async () => {
    if (!email || !senha) {
      setErro('Preencha email e senha');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        setErro('Usuário não cadastrado');
        return;
      }

      const { email: savedEmail, senha: savedSenha } = JSON.parse(userData);

      if (email === savedEmail && senha === savedSenha) {
        await AsyncStorage.setItem('userEmail', email); // salva login ativo
        router.push('/TaskListScreen');
      } else {
        setErro('Email ou senha incorretos');
      }
    } catch (e) {
      setErro('Erro ao fazer login');
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskEasy</Text>
      <Text style={styles.subtitle}>Login</Text>

      <TextInput placeholder="Email ou usuário" style={styles.input} onChangeText={setEmail} value={email} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} onChangeText={setSenha} value={senha} />

      <TouchableOpacity style={styles.button} onPress={fazerLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/RegisterScreen")}>
        <Text style={styles.link}>Não tem conta? Cadastrar</Text>
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
