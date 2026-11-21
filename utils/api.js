const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

export async function fetchItems() {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Failed to load data');
  }
  const data = await response.json();
  return data.map(p => ({
    id: String(p.id),
    title: p.title,
    info: p.body,
  }));
}