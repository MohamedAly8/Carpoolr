import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';
import { makeMutable } from 'react-native-reanimated';

export default function OnGoingRide({route, navigation}) {
  const {currentUser, pickupLocation, fare, dropOffLocation} = route.params;
  // state for wheter the ride is done or not 
  const [showOngoingRideScreen, setShowOngoingRideScreen] = useState(true);
  
  // const destination is string dropOffLocation before the first , 
  const destination = dropOffLocation.split(',')[0];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOngoingRideScreen(false);
    }, 4000)
  });

  const handleRouteRideHistory = () => {
    navigation.navigate('RideHistory');
  };

  const handleHome = () => {
    navigation.navigate('HomeScreen');
  };

  if (showOngoingRideScreen) {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
      <Image source={require('../../Image/logo.png')} style={styles.picture} />
      </View>
      <Text style={styles.text}>Enjoy your ride!</Text>
      <Text style={styles.text1}>We will redirect you once you arrive</Text>
      <Text style={styles.text1}>Your Fare is: {fare}</Text>
    </View>
  );

  }
  return (
    <View style={styles.container}>

      <View style={styles.imagecontainer}>
      <Image source={require('../../Image/logo.png')} style={styles.picture} />
      </View>

      <View style={styles.arrivalmessage}>
        <Text style={styles.text}>You have arrived at {destination} !</Text>
      </View>

      <View style={styles.thankcontainer}>
        <Text style={styles.thanktext}>Thank you for using our service!</Text>
      </View>

      <View style={styles.farecontainer}>
      <Text style={styles.fareheader}>Present Fare to Driver</Text>
      <Text style={styles.faretext}>Fare: ${fare}</Text>
      </View>
      <View style={styles.buttoncontainer}>
      <TouchableOpacity style={styles.button} onPress={handleRouteRideHistory}>
        <Text style={styles.buttonText}>View Ride History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Return Home</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    resizeMode: 'contain',
    width: 350,
  },
  arrivalmessage: {
    flex: 0.5,
    marginBottom: 20,
    backgroundColor: '#caadf7',
    borderRadius: 10,
    // add padding 
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 400,
  },
  fareheader: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 400,
    marginTop: 20,
  },
  faretext: {
    fontSize: 25,
    marginBottom: 10,
    color: 'black',
    fontWeight: 500,
  },
  text1: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7455B7',
    borderRadius: 10,
    width: '45%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // make buttons side by side in button container 
  buttoncontainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  farecontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thankcontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thanktext: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 500,
  },

});
