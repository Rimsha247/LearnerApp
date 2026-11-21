import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    const stored = await AsyncStorage.getItem('users');
    const users = stored ? JSON.parse(stored) : [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Invalid email or password');
      return;
    }
    setError('');
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    navigation.navigate('Home');
  };

  return (
    <View style={s.c}>
      <TextInput style={s.i} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.i} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={s.e}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <View style={{ height: 12 }} />
      <Button title="Sign up" color="#555" onPress={() => navigation.navigate('Signup')} />
      <Text style={s.l} onPress={() => navigation.navigate('Signup')}>Don't have an account? Sign up</Text>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, justifyContent: 'center', padding: 24 },
  i: { borderWidth: 1, borderColor: '#aaa', borderRadius: 6, padding: 10, marginBottom: 12 },
  e: { color: 'red', marginBottom: 12 },
  l: { color: 'blue', marginTop: 16, textAlign: 'center' },
});