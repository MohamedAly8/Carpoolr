import React, { useState, useEffect } from 'react';
 import { Text, View, StyleSheet, TouchableOpacity, TextInput, PermissionsAndroid, Alert} from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 import {GOOGLE_MAPS_API_KEY} from "@env";
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({navigation}) {
  const [currentUser, setCurrentUser] = useState(auth().currentUser.displayName);
  const [destination, setDestination] = useState(null);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [pickupLocation, setPickup] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const[tripDistance, setTripDistance] = useState(null);
  const[tripDuration, setTripDuration] = useState(null);
  const[estimatedFare, setEstimatedFare] = useState(null);
  const [region, setRegion] = useState({
      latitude: 43.260319,
      longitude: -79.919060,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  const mapRef = React.useRef(null);

    // to rerender Home Screen when SideBar button is Pressed
  useFocusEffect(
    React.useCallback(() => {
      const currentUser = auth().currentUser;
      setCurrentUser(currentUser.displayName);
    }, []));

  const onDestinationSelect = (data, details = null) => {
    setDestination(data.description);
    setSelectedDestination({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    });


    const newRegion = {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
    setRegion(newRegion);
  }

 const handleTourModeSelect = () => {
    navigation.navigate('TourModeSelect' );
  };

const handleRequestCarpool = () => {
  if (selectedDestination !== null && selectedPickup !== null) {
    navigation.navigate('RequestCarpool', {lat: selectedDestination.latitude,
                                           long: selectedDestination.longitude,
                                           destinationName: destination});
  } else {
    Alert.alert('Where are you going?', 'Please select a pick-up spot and destination');
  }
};

const handleOfferCarpool = () => {
  if (selectedDestination !== null && selectedPickup !== null) {
    navigation.navigate('OfferCarpool', {lat: selectedDestination.latitude,
                                           long: selectedDestination.longitude,
                                           destinationName: destination,
                                           fare: estimatedFare,
                                           QR: false});
  } else {
    Alert.alert('Where are you going?', 'Please select a pick-up spot and destination');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back, {currentUser}!</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.inputPrompts}> Where are you getting picked up? </Text>
        <GooglePlacesAutocomplete
          placeholder="CN Tower"
          onPress={(data, details = null) => {
            setPickup(data.description);
            setSelectedPickup({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            });
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '100%',
              marginBottom: 5,
            },
            textInput: {
              height: 40,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 4,
              paddingLeft: 10,
              marginBottom: 20,
                },
                listView: {
                  position: 'absolute',
                  zIndex: 9999, // set the z-index to a high value to bring the dropdown to the front
                  marginTop: 40, // adjust this value based on the height of the input container
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 4,
                },
                poweredContainer: {
                  display: 'none', // hide the "powered by Google" logo
                },
              }}
            />
         <Text style={styles.inputPrompts} >Where do you want to go?</Text>
        <GooglePlacesAutocomplete
          placeholder="McMaster University"
          onPress={onDestinationSelect}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '100%',
              marginTop: 5,
            },
            textInput: {
              height: 40,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 4,
              paddingLeft: 10,

              marginBottom: 20,
            },

            listView: {
              position: 'absolute',
              zIndex: 9999, // set the z-index to a high value to bring the dropdown to the front
              marginTop: 40, // adjust this value based on the height of the input container
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 4,
            },
            poweredContainer: {
              display: 'none', // hide the "powered by Google" logo
            },
          }}
        />


        {tripDistance && tripDuration &&
        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', zIndex: -1 }}>
          <Text style={{ fontSize: 20 }}>
            Distance: {tripDistance} km | Time: {tripDuration} min
          </Text>
          <Text style={{fontSize: 20, marginBottom: 10}}> Estimated Fare: ${estimatedFare}  </Text>
        </View>
        }
     <View style={styles.buttonContainer}>
       <TouchableOpacity style={styles.button} onPress={handleRequestCarpool}>
         <Text style={styles.buttonText}>Request Carpool</Text>
       </TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={handleOfferCarpool}>
                <Text style={styles.buttonText}>Offer Carpool</Text>
          </TouchableOpacity>

       <TouchableOpacity style={styles.Tourbutton} onPress={handleTourModeSelect}>
         <Text style={styles.buttonText}>Try Tour Mode</Text>
       </TouchableOpacity>
     </View>



        </View>

        <View style={{ flex: 0.7, borderRadius: 40, overflow: 'hidden' }}>
       <MapView style={{ flex: 1, minHeight:50, marginLeft: 10, marginRight: 10, marginBottom: 10, borderRadius: 10}}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            >
            {selectedPickup && selectedDestination && (
              <MapViewDirections
                origin={selectedPickup}
                destination={selectedDestination}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={5}
                strokeColor="hotpink"

                onReady={result => {
                    const costPerKm = 0.5;
                    const minFare = 5;
                    const distanceInKm = result.distance;
                    setTripDistance(distanceInKm.toFixed(2));
                    setTripDuration(result.duration.toFixed(2));
                    const fare = Math.max(minFare, distanceInKm * costPerKm);
                    setEstimatedFare(fare.toFixed(2));
                  }}

              />
            )}
            {selectedPickup && selectedDestination && (
              mapRef.current.fitToCoordinates([selectedPickup, selectedDestination], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              })
            )}
        </MapView>
        </View>



    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#dbcbf5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#692ad5',
    textAlign: 'center',
  },
  tourhead: {
    fontSize: 30,

  },
  body: {
    flex: 0.8,
  },
  map: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E1E1E',
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
      backgroundColor: '#692ad5',
          borderRadius: 10,
          width: '40%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          marginRight: 5,
          marginLeft: 5,


    },
    Tourbutton: {
          backgroundColor: '#b14e64',
              borderRadius: 10,
              width: '40%',
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
    inputPrompts: {
        marginBottom: 5,
        marginTop: 5,
        textAlign: 'center',
        fontSize: 15,
        zIndex: -1,
        color: 'black',
        fontWeight: 'bold',
        


   }

});

