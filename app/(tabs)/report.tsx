import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Reports() {  // Updated name
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports Page</Text>
      <Text style={styles.subtitle}>Detailed reports will be displayed here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
