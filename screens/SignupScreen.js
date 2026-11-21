import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    const stored = await AsyncStorage.getItem('users');
    const users = stored ? JSON.parse(stored) : [];
    if (users.some(u => u.email === email)) {
      setError('This email is already registered');
      return;
    }
    users.push({ username, email, password });
    await AsyncStorage.setItem('users', JSON.stringify(users));
    setError('');
    navigation.navigate('Login');
  };

  return (
    <View style={s.c}>
      <TextInput style={s.i} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={s.i} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.i} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={s.e}>{error}</Text> : null}
      <Button title="Sign up" onPress={handleSignup} />
      <Text style={s.l} onPress={() => navigation.navigate('Login')}>Already have an account? Login</Text>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, justifyContent: 'center', padding: 24 },
  i: { borderWidth: 1, borderColor: '#aaa', borderRadius: 6, padding: 10, marginBottom: 12 },
  e: { color: 'red', marginBottom: 12 },
  l: { color: 'blue', marginTop: 16, textAlign: 'center' },
});