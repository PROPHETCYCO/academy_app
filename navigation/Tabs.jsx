import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../src/screens/HomeScreen';
import ExploreScreen from '../src/screens/ExploreScreen';
import ProgressScreen from '../src/screens/ProgressScreen';
import MyCoursesScreen from '../src/screens/MyCoursesScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './../src/screens/RegisterScreen';
import LoginScreen from '../src/screens/LoginScreen';
import CourseDetail from '../src/screens/CourseDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Explore = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Explore'
        component={ExploreScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='CourseDetail'
        component={CourseDetail}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  )
}

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#e60000',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          height: 80,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#9933ff',
          borderRadius: 15,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../src/images/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e60000' : '#ff6666',
                }}
              />
              <Text
                style={{color: focused ? '#e60000' : '#ff6666', fontSize: 12}}>
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Explore1"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../src/images/icons/explore.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e60000' : '#ff6666',
                }}
              />
              <Text
                style={{color: focused ? '#e60000' : '#ff6666', fontSize: 12}}>
                EXPLORE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../src/images/icons/progress.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#fff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="MyCourses"
        component={MyCoursesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../src/images/icons/course.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e60000' : '#ff6666',
                }}
              />
              <Text
                style={{color: focused ? '#e60000' : '#ff6666', fontSize: 12}}>
                MY COURSE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile1"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
              <Image
                source={require('../src/images/icons/profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e60000' : '#ff6666',
                }}
              />
              <Text
                style={{color: focused ? '#e60000' : '#ff6666', fontSize: 12}}>
                PROFILE
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000066',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
