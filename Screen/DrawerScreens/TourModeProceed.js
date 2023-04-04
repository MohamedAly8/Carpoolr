import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const TourModeProceed = ({route}) => {
    const { city } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finding Tour Matches for {city}</Text>
      <ActivityIndicator size='large' color='#6026c2' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TourModeProceed;