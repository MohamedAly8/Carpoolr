import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect, useFocusEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Dimensions} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {Timestamp} from '@react-native-firebase/firestore';

export default function RideHistory({navigation}) {
  const screenWidth = Dimensions.get('window').width;
  const [currentUser, setCurrentUser] = useState(
    auth().currentUser.displayName,
  );
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const estOffset = -5 * 60; // Eastern Standard Time (EST) is 5 hours behind UTC

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const rideHistorySnapshot = await firestore()
          .collection('RideHistory')
          .where('username', '==', currentUser)
          .get();
        const rideHistoryData = rideHistorySnapshot.docs.map(doc => doc.data());
        console.log(rideHistoryData);
        setRides(
          rideHistoryData.sort(function (a, b) {
            return (
              b.TripTime.toDate().getTime() - a.TripTime.toDate().getTime()
            );
          }),
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ride history', error);
      }
    };
    fetchRides();
    console.log(rides);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading Ride History . . .</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recent Rides</Text>

      <ScrollView contentContainerStyle={{width: screenWidth - 50}}>
        {rides.map((ride, index) => (
          <View key={index} style={styles.rideBox}>
            <Text style={styles.text1}>
              {' '}
              {new Date(
                ride.TripTime.toDate().getTime() -
                  estOffset * 1000 -
                  5 * 60 * 1000,
              ).toLocaleDateString('en-US', {timeZone: 'America/New_York'})}
            </Text>
            <Text style={styles.text2}>
              Pickup: {ride.pickupLocation.split(',')[0]}
            </Text>
            <Text style={styles.text2}>
              Dropoff: {ride.dropOffLocation.split(',')[0]}
            </Text>
            <Text style={styles.text2}>Fare: ${ride.fare}</Text>
            <Text style={styles.text2}>
              Time:{' '}
              {new Date(
                ride.TripTime.toDate().getTime() -
                  estOffset * 1000 -
                  5 * 60 * 1000,
              ).toLocaleTimeString('en-US', {timeZone: 'America/New_York'})}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text1: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
    color: 'black',
    marginVertical: 3,
  },
  rideBox: {
    borderWidth: 1,
    borderColor: '#caadf7',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ede5fa',
  },
  image: {
    width: '75%',
    margin: 10,
    borderRadius: 5,
  },
});
