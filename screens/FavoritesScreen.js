import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFavorites } from '../utils/storage';

export default function FavoritesScreen() {
  const [favs, setFavs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavs);
    }, [])
  );

  return (
    <View style={s.c}>
      {favs.length === 0 ? (
        <Text style={s.empty}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favs}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text>{item.info}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  card: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 14, marginBottom: 12 },
  cardTitle: { fontWeight: 'bold', marginBottom: 4 },
});