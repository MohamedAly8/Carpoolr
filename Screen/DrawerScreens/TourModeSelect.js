import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from "@env";
import axios from 'axios';
import MapView, {Marker} from 'react-native-maps';

const TourModeSelect = ({navigation}) => {
  const [destinations, setDestinations] = useState([]);
  const [city, setcity] = useState(null);
  const [locations, setLocations] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);


  const getTouristDestinations = (city) => {

    const cityTrim = city.split(',')[0].trim();
    setcity(cityTrim);
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${city}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => {
      const results = response.data.results;
      const topDestinations = results.slice(0, 5).map(result => result.name);
      const topLocations = results.slice(0, 5).map(result => ({
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng
      }));
      setDestinations(topDestinations);
      setLocations(topLocations);

        // Compute the bounding box that contains all the markers
        const minLat = Math.min(...topLocations.map(location => location.latitude));
        const maxLat = Math.max(...topLocations.map(location => location.latitude));
        const minLng = Math.min(...topLocations.map(location => location.longitude));
        const maxLng = Math.max(...topLocations.map(location => location.longitude));
        const midLat = (minLat + maxLat) / 2;
        const midLng = (minLng + maxLng) / 2;
        const latDelta = Math.abs(maxLat - minLat) * 1.2;
        const lngDelta = Math.abs(maxLng - minLng) * 1.2;
        const setRegion = {
          latitude: midLat,
          longitude: midLng,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        };
        setMapRegion(setRegion);


      console.log(topLocations);
    })
    .catch(error => console.log(error));
  };

   const handleTourModeProceed = () => {
      navigation.navigate('TourModeProceed', {city: city});
    };


  return (
    <View style={styles.container}>

      <Text style={styles.heading}>Select a City</Text>
      <GooglePlacesAutocomplete
        placeholder='Where do you want to tour?'
        onPress={(data, details = null) => {
          const city = data.description;
          getTouristDestinations(city);
        }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
          types: '(cities)'
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          poweredContainer: { display: 'none' }, // hides powered by Google logo
          listView: { zIndex: 9999 }, // sets z-index of listView to 9999
        }
        }
      />
      {destinations.length > 0 &&
        <View style={styles.destinationsContainer}>
          <Text style={styles.destinationsHeading}>Top 5 Tourist Destinations to {city}</Text>
          {destinations.map((destination, index) => (
            <Text key={index} style={styles.destination}>{index + 1}. {destination}</Text>
          ))}
        </View>
      }

      {mapRegion ? (
      <View style={{flex: 5, borderRadius: 40, overflow: 'hidden', zIndex: -1}}>
      <MapView style={styles.map}
        region={mapRegion}
      >
            {locations.map((location, index) => (
              <Marker key={index} coordinate={location} title={destinations[index]} />
            ))}

        </MapView>
        </View>
      ) : (
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', zIndex: -999 }}>
            <ActivityIndicator size='large' color='#6026c2' style={{zIndex: -1}} />
            <Text style={{zIndex: -1}}>
                Loading Your City's Top Spots
            </Text>
          </View>
      )}
      {city &&
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitbutton} onPress={handleTourModeProceed}>
            <Text style={styles.buttonText}>Find a Tour</Text>
          </TouchableOpacity>
      </View>
      }
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  textInputContainer: {

    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 10
  },
  destinationsContainer: {

    alignItems: 'center',
    backgroundColor: '#ede5fa',
    width: 380,
    marginBottom: 40,
    zIndex: -1,
  },
  destinationsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    borderRadius: 100
  },
  destination: {
    fontSize: 18,
    marginBottom: 5,
    color: 'black'
  },
buttonContainer: {
  backgroundColor: '#692ad5',
  borderRadius: 10,
  width: '40%',
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 20,
  zIndex: 1,
},
  buttonText : {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    height: 350,
  },
});

export default TourModeSelect;