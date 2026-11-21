import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { setupNotifications, sendTestNotification } from '../utils/notifications';

export default function NotificationsScreen() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('');

  const handleEnable = async () => {
    const granted = await setupNotifications();
    setEnabled(granted);
    setMessage(granted ? 'Notifications are enabled' : 'Permission denied');
  };

  const handleTest = async () => {
    await sendTestNotification();
    setMessage('Test notification will appear in 2 seconds. Minimize the app to see it.');
  };

  return (
    <View style={s.c}>
      <Text style={s.title}>Notification Setup</Text>
      <Button title="Enable notifications" onPress={handleEnable} />
      <View style={{ height: 12 }} />
      <Button title="Send test notification" onPress={handleTest} disabled={!enabled} />
      {message ? <Text style={s.msg}>{message}</Text> : null}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  msg: { marginTop: 20, fontSize: 16 },
});