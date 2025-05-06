import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('documents').select('*').order('created_at', { ascending: false });
    if (!error) setDocuments(data);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welli Mobile App</Text>
      <Text style={styles.subtitle}>Your health, anywhere.</Text>
      <Text style={styles.section}>Documents (from Supabase):</Text>
      {loading ? <Text>Loading...</Text> : null}
      {documents.map(doc => (
        <View key={doc.id} style={styles.card}>
          <Text>{doc.name}</Text>
        </View>
      ))}
      <Button title="Refresh" onPress={fetchDocuments} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#4A5568', marginBottom: 16 },
  section: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  card: { backgroundColor: '#F2FCE2', padding: 12, borderRadius: 8, marginBottom: 8, width: '100%' },
}); 