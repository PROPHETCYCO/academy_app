import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ExploreScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://192.168.29.121:3000/api/v1/get_course');
        setCourses(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <Text style={{ color: '#000000' }}>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!Array.isArray(courses)) {
    return <Text>Error: Data format is incorrect</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {courses.map(course => (
        <View key={course._id} style={styles.card}>
          <Image source={{ uri: course.image }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.title}>{course.course_name}</Text>
            <Text style={styles.info}>Total Videos: {course.total_video}</Text>
            <Text style={styles.info}>Teacher: {course.teacher_name}</Text>
            <Text style={styles.info}>Price: {course.course_price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CourseDetail', { courseId: course._id })}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 115,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExploreScreen;
