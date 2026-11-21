import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isFavorite, toggleFavorite } from '../utils/storage';

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    isFavorite(item.id).then(setFav);
  }, [item.id]);

  const handleToggle = async () => {
    const nowFav = await toggleFavorite(item);
    setFav(nowFav);
  };

  return (
    <View style={s.c}>
      <Text style={s.title}>{item.title}</Text>
      <Text style={s.info}>{item.info}</Text>
      <TouchableOpacity style={s.btn} onPress={handleToggle}>
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={28} color="red" />
        <Text style={s.btnText}>{fav ? 'Saved to Favorites' : 'Add to Favorites'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  info: { fontSize: 16, marginBottom: 24 },
  btn: { flexDirection: 'row', alignItems: 'center' },
  btnText: { marginLeft: 8, fontSize: 16 },
});