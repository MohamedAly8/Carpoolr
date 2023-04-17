import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from '@env';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import { max } from 'react-native-reanimated';

const OfferCarpool = ({route, navigation}) => {
  const {lat, long, destinationName, pickupLocation, fare, QR, user} =
    route.params;
  const dest = destinationName.split(',')[0];
  const BaseFare = fare;
  const isQR = QR;
  const [maxPassengers, setMaxPassengers] = useState(1);
  const [maxTimeDelay, setMaxTimeDelay] = useState(0);
  const [estimatedFare, setEstimatedFare] = useState(BaseFare);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  // create Async Storage for boolean isQRCodeScanned initially set to false
  // Define a function to set the initial value of `isQRCodeScanned`

  const onMaxPassengersChange = value => {
    setMaxPassengers(value);
    calculateEstimatedFare(value, maxTimeDelay);
  };

  const onMaxTimeDelayChange = value => {
    setMaxTimeDelay(value);
    calculateEstimatedFare(maxPassengers, value);
  };

  const calculateEstimatedFare = (passengers, timeDelay) => {
    // Calculation logic for estimated fare based on maxPassengers and maxTimeDelay
    // You can customize this logic as per your requirements
    const fare = BaseFare - passengers * 2 - timeDelay * 0.5;
    setEstimatedFare(Math.max(2, fare.toFixed(2)));
  };

  const handleScanQRCode = () => {
    navigation.navigate('QRScan', {
      lat: lat,
      long: long,
      destinationName: destinationName,
      pickupLocation: pickupLocation,
      fare: estimatedFare,
      user: user,
    });
  };

  const handleSubmitOffer = () => {
    navigation.navigate('OnGoingRide', {
      currentUser: user,
      pickupLocation: pickupLocation,
      fare: fare,
      dropOffLocation: destinationName,
    });

    firestore()
      .collection('RideHistory')
      .add({
        TripTime: firestore.Timestamp.now(),
        dropOffLocation: destinationName,
        fare: fare,
        pickupLocation: pickupLocation,
        username: user,
      })
      .then(() => {
        console.log('Ride added to ride History');
      });
    firestore()
    .collection('ActiveCarpools')
    .add({
      currentFare: fare,
      destination: new firestore.GeoPoint(lat,long),
      maxPassengers: maxPassengers,
      passengers: [user],
      isFull: false,
    })
    .then( () => {
      console.log('Added Carppol to active carpools');
    });
  };

  useEffect(() => {
    // Call Google Places API to retrieve photo reference for the destination
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${dest}&inputtype=textquery&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (
          data.candidates &&
          data.candidates.length > 0 &&
          data.candidates[0].photos
        ) {
          const photoRef = data.candidates[0].photos[0].photo_reference;
          // Call Google Places Photos API to retrieve the actual image
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
          setPhotoUrl(photoUrl);
        } else {
          console.log('No photos found for destination');
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [dest, navigation, QR]);

  return (
    <View style={styles.container}>
      <View style={styles.promptTexts}>
        <Text style={styles.text}>Your Destination is</Text>
        <Text style={styles.destinationtext}>{dest}</Text>
      </View>

      <View style={styles.img}>
        {photoUrl && <Image source={{uri: photoUrl}} style={styles.image} />}
      </View>

      <View style={styles.qrState}>
        {Boolean(isQR) ? (
          <Text style={styles.qrtextSuccess}>QR Code successfully scanned</Text>
        ) : (
          <Text style={styles.qrtextFail}>
            Scan the QR Code to Start Carpool
          </Text>
        )}
      </View>

      <View
        style={{
          flex: 0.01,
          height: 1,
          backgroundColor: '#b8b8b8',
          width: '95%',
          alignSelf: 'center',
        }}
      />

      <View style={styles.modifymessage}>
        <Text style={styles.modifytext}> Modify Your Carpool Settings </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Max Passengers: {maxPassengers}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={6}
          step={1}
          value={maxPassengers}
          onValueChange={onMaxPassengersChange}
          thumbTintColor="#692ad5"
          minimumTrackTintColor="#692ad5"
        />
        <Text style={styles.label}>
          Estimated Travel Delay: {maxTimeDelay} minutes
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={30}
          step={1}
          value={maxTimeDelay}
          onValueChange={onMaxTimeDelayChange}
          thumbTintColor="#692ad5"
          minimumTrackTintColor="#692ad5"
        />
        <Text style={styles.fare}>Estimated Fare: ${estimatedFare}</Text>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.savings}>
            You're Saving: ${(BaseFare - estimatedFare).toFixed(2)} !
          </Text>
        </View>
      </View>

      <View key={QR} style={styles.buttonContainer}>
        {!Boolean(isQR) && (
          <TouchableOpacity onPress={handleScanQRCode} style={styles.button}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        )}

        {Boolean(isQR) && (
          <TouchableOpacity style={styles.button} onPress={handleSubmitOffer}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex: 3,
  },
  image: {
    flex: 1,
    width: 350,
    borderRadius: 30,
  },
  promptTexts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 600,
  },
  destinationtext: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modifymessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modifytext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    flex: 3,
    width: '80%',
    justifyContent: 'center',
  },
  label: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fare: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  savings: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  slider: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: -1,
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
  qrState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrtextSuccess: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'green',
  },
  qrtextFail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c93253',
  },
});

export default OfferCarpool;
