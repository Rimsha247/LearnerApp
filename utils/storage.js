import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'favorites';

export async function getFavorites() {
  const stored = await AsyncStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
}

export async function toggleFavorite(item) {
  const favs = await getFavorites();
  const exists = favs.some(f => f.id === item.id);
  const updated = exists ? favs.filter(f => f.id !== item.id) : [...favs, item];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return !exists;
}

export async function isFavorite(id) {
  const favs = await getFavorites();
  return favs.some(f => f.id === id);
}