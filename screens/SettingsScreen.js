import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('currentUser');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const MENU = [
    { id: '1', label: 'Favorites', icon: 'heart-outline', onPress: () => navigation.navigate('Favorites') },
    { id: '2', label: 'Notifications', icon: 'notifications-outline', onPress: () => navigation.navigate('Notifications') },
    { id: '3', label: 'About', icon: 'information-circle-outline', onPress: () => Alert.alert('LearnerApp', 'Version 1.0') },
    { id: '4', label: 'Log out', icon: 'log-out-outline', onPress: handleLogout },
  ];

  return (
    <View style={s.c}>
      {MENU.map(m => (
        <TouchableOpacity key={m.id} style={s.row} onPress={m.onPress}>
          <Ionicons name={m.icon} size={24} color="#333" />
          <Text style={s.label}>{m.label}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  label: { flex: 1, marginLeft: 12, fontSize: 16 },
});