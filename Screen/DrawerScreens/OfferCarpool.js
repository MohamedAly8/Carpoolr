import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

const OfferCarpool = ({route}) => {

    const { lat, long, destinationName } = route.params;
    const dest = destinationName.split(',')[0]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading Offer Carpool to {dest}</Text>
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

export default OfferCarpool;