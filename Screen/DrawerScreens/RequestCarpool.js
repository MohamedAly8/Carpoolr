import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GOOGLE_MAPS_API_KEY} from '@env';

const RequestCarpool = ({route, navigation}) => {
  const {lat, long, destinationName} = route.params;
  const [carpools, setCarpools] = useState([]);
  const [loading, setLoading] = useState(true);
  const dest = destinationName.split(',')[0];
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
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].photos
          ) {
            const photoRef = data.candidates[0].photos[0].photo_reference;
            // Call Google Places Photos API to retrieve the actual image
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
            setPhotoUrl(photoUrl);
            console.log(photoUrl);
          } else {
            console.log('No photos found for destination');
          }
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    };

    fetchCarpools();
  }, [lat, long]);

  console.log(carpools);
  console.log(destinationName);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6026c2" />
        <Text> Looking for Carpools </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, {fontWeight: 400}]}>
        Found {carpools.length ? carpools.length : 0} Carpools for{' '}
      </Text>
      <Text style={styles.text}>{dest}</Text>

      {photoUrl && <Image source={{uri: photoUrl}} style={styles.image} />}
      <View style={styles.carpoolOptions}>
        {carpools.map((carpool, index) => (
          <View key={index} style={styles.carpoolBox}>
            <Text style={[styles.carpoolText, {fontWeight: 500}]}>
              Carpool {index + 1}
            </Text>
            <Text style={styles.carpoolText}>
              {carpool.passengers ? carpool.passengers.length : 0} /{' '}
              {carpool.maxPassengers ? carpool.maxPassengers : 0} Full
            </Text>
            <Text style={styles.carpoolText}>
              Passengers:{' '}
              {carpool.passengers ? carpool.passengers.join(', ') : 'None'}
            </Text>
            <TouchableOpacity
              style={styles.joinbutton}
              onPress={() =>
                navigation.navigate('FinishRequestCarpool', {passengers: carpool.passengers, 
                                                             fare: carpool.currentFare})
                }>
              <Text style={styles.buttontext}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  carpoolOptions: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  carpoolBox: {
    borderWidth: 1,
    borderColor: '#caadf7',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    marginTop: 10,
    width: '45%',
    backgroundColor: '#ede5fa',
    flexBasis: '45%',
  },
  carpoolText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black',
  },
  joinbutton: {
    backgroundColor: '#7455B7',
    color: 'white',
    padding: 5,
    borderRadius: 15,
    width: 70,
    height: 35,
    marginTop: 10,
    alignSelf: 'center',
  },
  image: {
    width: '75%',
    height: 200,
    margin: 10,
    borderRadius: 5,
  },
  buttontext: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RequestCarpool;
