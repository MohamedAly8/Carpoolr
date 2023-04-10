import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';

export default function ReoccurringRide({route, navigation}) {
  const {destinationName, pickupLocation} = route.params;
  const dest = destinationName.split(',')[0];
  const pickup = pickupLocation.split(',')[0];
  const [photoUrl, setPhotoUrl] = useState(null);
  const [switchVals, setSwitchVals] = useState([false, false, false]);

  const handleSwitch1 = () => {
    switchVals[0]
      ? setSwitchVals([false, false, false])
      : setSwitchVals([true, false, false]);
  };
  const handleSwitch2 = () => {
    switchVals[1]
      ? setSwitchVals([false, false, false])
      : setSwitchVals([false, true, false]);
  };
  const handleSwitch3 = () => {
    switchVals[2]
      ? setSwitchVals([false, false, false])
      : setSwitchVals([false, false, true]);
  };

  useEffect(() => {
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
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {pickup} {' -> '} {dest}
      </Text>
      {photoUrl && <Image source={{uri: photoUrl}} style={styles.image} />}
      <View style={styles.optionsContainer}>
        <View style={styles.startsOn}>
          <Text style={styles.text1}>Starts on: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Start Date"
            keyboardType="default"
          />
        </View>
        <View style={styles.startsOn}>
          <Text style={styles.text1}>Ends on: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Start Date"
            keyboardType="default"
          />
        </View>
        <View style={styles.startsOn}>
          <Text style={styles.text1}>Pickup Time: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Pickup Time"
            keyboardType="default"
          />
        </View>
        <View style={styles.startsOn}>
          <Text>Daily</Text>

          <Switch
            disabled={false}
            value={switchVals[0]}
            onChange={handleSwitch1}></Switch>
          <Text>Weekly</Text>
          <Switch
            disabled={false}
            value={switchVals[1]}
            onChange={handleSwitch2}></Switch>
          <Text>Monthly</Text>
          <Switch
            disabled={false}
            value={switchVals[2]}
            onChange={handleSwitch3}></Switch>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  image: {
    width: '90%',
    height: 200,
    margin: 10,
    borderRadius: 5,
    borderColor: '#692ad5',
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    width: '92%',
    borderWidth: 1,
    borderColor: '#caadf7',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ede5fa',
  },
  startsOn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
  },
  text1: {
    fontSize: 16,
    color: 'black',
    padding: 2,
  },
  textInput: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#692ad5',
    height: 40,
  },
  button: {
    backgroundColor: '#7455B7',
    borderRadius: 10,
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
