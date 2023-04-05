import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GOOGLE_MAPS_API_KEY} from "@env";


const RequestCarpool = ({ route, navigation }) => {
  const { lat, long, destinationName } = route.params;
  const [carpools, setCarpools] = useState([]);
  const [loading, setLoading] = useState(true);
  const dest = destinationName.split(',')[0]
  const [photoUrl, setPhotoUrl] = useState(null);

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

      // Call Google Places API to retrieve photo reference for the destination
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${dest}&inputtype=textquery&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;

      fetch(url)

        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.candidates && data.candidates.length > 0 && data.candidates[0].photos) {

            const photoRef = data.candidates[0].photos[0].photo_reference;
            // Call Google Places Photos API to retrieve the actual image
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
            setPhotoUrl(photoUrl);
            console.log(photoUrl);
          } else {
            console.log('No photos found for destination');
          }
        
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); 
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

     
      {photoUrl && <Image source={{ uri: photoUrl }} style={styles.image} />}
      {carpools.map((carpool, index) => (
        <View key={index} style={styles.carpoolBox}>
          <TouchableOpacity style={styles.joinbutton} onPress={() => navigation.navigate('FinishRequestCarpool', {carpool: carpool})}/>
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
    width: '70%',
  },
  carpoolText: {
    fontSize: 16,
    marginVertical: 5,
  },
  joinbutton: {
    backgroundColor: '#6026c2',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
  },
  image: {
    width: 250,
    height: 200,
    margin: 10,
    borderRadius: 5,
  },

});

export default RequestCarpool;