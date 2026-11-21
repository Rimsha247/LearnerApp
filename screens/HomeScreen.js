import { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchItems } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 16 }}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View style={s.header}>
          <Image source={require('../assets/icon.png')} style={s.logo} />
          <Text style={s.title}>LearnerApp</Text>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch(() => setError('Could not load data. Check your internet.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return <Text style={s.error}>{error}</Text>;
  }

  return (
    <View style={s.c}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Detail', { item })}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text numberOfLines={2}>{item.info}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#333" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 32, height: 32, marginRight: 8, borderRadius: 6 },
  title: { fontSize: 18, fontWeight: 'bold' },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 14, marginBottom: 12 },
  cardTitle: { fontWeight: 'bold', marginBottom: 4 },
  error: { textAlign: 'center', marginTop: 40, color: 'red', fontSize: 16 },
});