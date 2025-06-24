// Salvar dados
const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Dados salvos!');
  } catch (error) {
    console.log('Erro ao salvar dados:', error);
  }
};

// Ler dados
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    console.log('Erro ao ler dados:', error);
    return null;
  }
};
