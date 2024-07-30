import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const name = await AsyncStorage.getItem('userFullName');
      if (value !== null) {
        setIsLoggedIn(true);
        setUserName(name);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkLoginStatus(); // Refresh logic
    }, []),
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      setUserName('');
      navigation.navigate('Profile'); // Navigate to Login screen after logout
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../images/profile_photo.png')}
          style={styles.profilePhoto}
        />
        {isLoggedIn && <Text style={styles.userName}>{userName}</Text>}
      </View>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../images/details.png')}
          style={styles.buttonIconStart}
        />
        <Text style={styles.buttonText}>My Details</Text>
        <Image
          source={require('../images/arrow.png')}
          style={styles.buttonIconEnd}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../images/help.png')}
          style={styles.buttonIconStart}
        />
        <Text style={styles.buttonText}>Help</Text>
        <Image
          source={require('../images/arrow.png')}
          style={styles.buttonIconEnd}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../images/about.png')}
          style={styles.buttonIconStart}
        />
        <Text style={styles.buttonText}>About</Text>
        <Image
          source={require('../images/arrow.png')}
          style={styles.buttonIconEnd}
        />
      </TouchableOpacity>

      {isLoggedIn ? (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutButtonText}>LogIn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.logoutButtonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
  },
  buttonIconStart: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  buttonIconEnd: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
