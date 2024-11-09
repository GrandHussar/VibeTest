import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '@/authService';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await signUp(email, password);
      Alert.alert('Success', 'User registered successfully');
      router.replace({ pathname: '/(tabs)/login' }); // Redirect to login page after registration
    } catch (error) {
      Alert.alert('Error', 'User registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register - Future Gadget Lab</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} color="#00A7E1" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Back to Login"
          onPress={() => router.push({ pathname: '/(tabs)/login' })}
          color="#00A7E1"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A', // Dark sci-fi background
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#00A7E1', // Aqua-blue text color for sci-fi effect
    marginBottom: 24,
    fontFamily: 'Courier', // Monospaced font for tech look
    textShadowColor: '#00FF00', // Glitchy green shadow
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333', // Dark border for input fields
    borderRadius: 5,
    backgroundColor: '#2A2A2A', // Darker background for inputs
    color: '#00A7E1', // Text color inside inputs
    fontFamily: 'Courier', // Monospaced font
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 5,
    overflow: 'hidden', // Round corners for button
  },
});
