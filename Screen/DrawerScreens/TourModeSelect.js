import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from "@env";
import axios from 'axios';

const TourModeSelect = () => {
  const [destinations, setDestinations] = useState([]);
  const [city, setcity] = useState(null);

  const getTouristDestinations = (city) => {

    const cityTrim = city.split(','[0].trim())[0];
    setcity(cityTrim);
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${city}&key=${GOOGLE_MAPS_API_KEY}`)
    .then(response => {
      const results = response.data.results;
      const topDestinations = results.slice(0, 5).map(result => result.name);
      setDestinations(topDestinations);
    })
    .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a city to find top tourist destinations:</Text>
      <GooglePlacesAutocomplete
        placeholder='Enter a city'
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
          textInput: styles.textInput
        }}
      />
      {destinations.length > 0 &&
        <View style={styles.destinationsContainer}>
          <Text style={styles.destinationsHeading}>Top 5 Tourist Destinations to {city}:</Text>
          {destinations.map((destination, index) => (
            <Text key={index} style={styles.destination}>{index + 1}. {destination}</Text>
          ))}
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
    justifyContent: 'center'
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
    height: 40,
    borderWidth: 1,
    paddingLeft: 10
  },
  destinationsContainer: {
    flex: 5,
    marginTop: 20,
    alignItems: 'center'
  },
  destinationsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  destination: {
    fontSize: 20,
    marginBottom: 5
  }
});

export default TourModeSelect;