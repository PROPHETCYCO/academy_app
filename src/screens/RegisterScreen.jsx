import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const RegisterScreen = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullname || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      // Send a POST request to your backend server
      const response = await axios.post(
        'http://192.168.0.103:3000/api/auth/register',
        {
          fullname,
          email,
          password,
        },
      );

      // Handle successful registration
      if (response.status === 201) {
        Alert.alert('Registration successful');
        navigation.navigate('Login'); // Navigate to login screen after successful registration
      } else {
        Alert.alert('Registration failed', response.data.message);
      }
    } catch (error) {
      // Handle errors
      Alert.alert('An error occurred', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default RegisterScreen;
