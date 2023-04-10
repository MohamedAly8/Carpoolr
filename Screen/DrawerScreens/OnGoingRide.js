import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';

export default function OnGoingRide({route, navigation}) {
  const {currentUser, pickupLocation, fare, dropoffLocation} = route.params;

  const handleRouteRideHistory = () => {
    navigation.navigate('RideHistory');
  };

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../Image/logo.png')} style={styles.picture} />
      <Text style={styles.text}>Enjoy your ride!</Text>
      <Text style={styles.text1}>We will redirect you once you arrive</Text>
      <TouchableOpacity style={styles.button} onPress={handleRouteRideHistory}>
        <Text style={styles.buttonText}>View Ride History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    resizeMode: 'contain',
    width: 250,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 300,
  },
  text1: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7455B7',
    borderRadius: 10,
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
