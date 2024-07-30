import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';


const MyCoursesScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {userName}</Text>
      {/* Your course listing logic */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
});

export default MyCoursesScreen;
