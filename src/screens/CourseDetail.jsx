import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Vimeo} from 'react-native-vimeo-iframe';
import axios from 'axios';

const CourseDetail = ({route}) => {
  const {courseId} = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.29.121:3000/api/v1/getcoursebyid/${courseId}`,
        );
        setCourse(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const getVimeoId = url => {
    const regex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+\/)?video\/|video\/|)(\d+)(?:$|\/|\?)/;
    const matches = regex.exec(url);
    return matches ? matches[1] : null;
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!course) {
    return <Text>No course details available</Text>;
  }

  const videoCallbacks = {
    timeupdate: data => console.log('timeupdate: ', data),
    play: data => console.log('play: ', data),
    pause: data => console.log('pause: ', data),
    fullscreenchange: data => console.log('fullscreenchange: ', data),
    ended: data => console.log('ended: ', data),
    controlschange: data => console.log('controlschange: ', data),
  };

  const videoId = getVimeoId(course.introduction_video);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {videoId && (
        <Vimeo
          videoId={videoId}
          params={'api=1&autoplay=0'}
          handlers={videoCallbacks}
          style={styles.video}
        />
      )}
      <Text style={styles.title}>{course.course_name}</Text>
      <Text style={{color: '#000000'}}>
        {stripHTML(course.course_description)}
      </Text>
    </ScrollView>
  );
};

const stripHTML = html => {
  return html.replace(/<[^>]*>?/gm, '');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  video: {
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
});

export default CourseDetail;
