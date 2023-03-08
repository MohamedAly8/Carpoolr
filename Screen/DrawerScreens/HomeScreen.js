import React, { useState, useEffect } from 'react';
 import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 import {GOOGLE_MAPS_API_KEY} from "@env";
import auth from '@react-native-firebase/auth';

 export default function HomeScreen() {
   const [username, setUsername] = useState('');
   const [destination, setDestination] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome back, {username}!</Text>
      </View>

      <View style={styles.body}>
        <GooglePlacesAutocomplete
                placeholder="Where do you want to go?"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                  setDestination(data.description);
                  AsyncStorage.setItem('destination', data.description);

                }}
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
        <Text style={styles.tourhead}> Tour Mode Available Now! </Text>
        <Text> You are going to {destination}</Text>
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
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1E1E1E',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 20,
  },
});

