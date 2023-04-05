import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RequestCarpool = ({ route }) => {
  const { lat, long, destinationName } = route.params;
  const [carpools, setCarpools] = useState([]);
  const [loading, setLoading] = useState(true);
  const dest = destinationName.split(',')[0]

  useEffect(() => {
    // Fetch carpools from Firestore
    const fetchCarpools = async () => {
      try {
        const carpoolsSnapshot = await firestore()
          .collection('ActiveCarpools')
          .where('destination', '==', new firestore.GeoPoint(lat, long))
          .get();

        const carpoolsData = carpoolsSnapshot.docs.map(doc => doc.data());
        setCarpools(carpoolsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carpools:', error);
      }
    };

    fetchCarpools();
  }, [lat, long]);

    console.log(carpools);
    console.log(destinationName);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#6026c2' />
        <Text> Looking for Carpools </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Found {carpools.length ? carpools.length: 0} Carpools for {dest}</Text>
      {carpools.map((carpool, index) => (
        <View key={index} style={styles.carpoolBox}>
          <Text style={styles.carpoolText}>Carpool {index + 1}</Text>
          <Text style={styles.carpoolText}>Passenger Count: {carpool.passengers ? carpool.passengers.length : 0}</Text>
          <Text style={styles.carpoolText}>Max Passengers: {carpool.maxPassengers ? carpool.maxPassengers : 0}</Text>
          <Text style={styles.carpoolText}>Passenger Names: {carpool.passengers ? carpool.passengers.join(', ') : 'None'}</Text>
        </View>
      ))}
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
  carpoolBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  carpoolText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default RequestCarpool;