import React, { useState, useEffect } from 'react';
 import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 import {GOOGLE_MAPS_API_KEY} from "@env";
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {MapViewDirections} from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [region, setRegion] = useState({
      latitude: 43.260319,
      longitude: -79.919060,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  const mapRef = React.useRef(null);

  useEffect(() => {
    async function getUsername() {
      const user = auth().currentUser.displayName;
      console.log(user);
      if (user !== null) {
        setUsername(user);
      }
    }

  getUsername();

}, []);

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

    if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back, {username}!</Text>
      </View>

      <View style={styles.body}>
        <GooglePlacesAutocomplete
          placeholder="Where do you want to go?"
          onPress={onDestinationSelect}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: '100%',
            },
            textInput: {
              height: 40,
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 4,
              paddingLeft: 10,
              marginBottom: 20,
            },
          }}
        />

        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}>
                          <Text style={styles.buttonText}>Request a Carpool</Text>
                        </TouchableOpacity>
                      </View>

      </View>

       <MapView style={{ flex: 1, minHeight: 200, marginTop: 10 }}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={region}
            >
            {selectedDestination && (
              <Marker
                coordinate={selectedDestination}
                title="Your Destination"
              />
            )}
        </MapView>
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
    backgroundColor: '#f9f6fd',
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
  profileButton: {
    backgroundColor: '#2F2F2F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
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
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#692ad5',
          borderRadius: 10,
          width: '50%',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,


    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

