import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {GOOGLE_MAPS_API_KEY} from "@env";


const TourModeProceed = ({ route, navigation }) => {
  const { city } = route.params;
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);


  useEffect(() => {

    const fetchTours = async () => {
      try {
        const toursSnapshot = await firestore()
          .collection('ActiveTours')
          .where('city', '==', city)
          .get();
        const toursData = toursSnapshot.docs.map(doc => doc.data());
        setTours(toursData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Tours:', error);
      }

    };

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;

    fetch(url)

      .then((response) => response.json())
      .then((data) => {
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].photos) {

          const photoRef = data.candidates[0].photos[0].photo_reference;
          // Call Google Places Photos API to retrieve the actual image
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
          setPhotoUrl(photoUrl);
        
        } else { 
          console.log('No photos found for destination');
        }
      
    })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));




    fetchTours();
  }, [city]);

  return (
    <View style={styles.container}>
      {/* Loading State */}
      {isLoading ? (
        <View>
          <Text style={styles.headertext}>Finding Tour Matches for {city}</Text>
          <ActivityIndicator size='large' color='#6026c2' />
        </View>
      
      // no tours found 
      ) : tours.length === 0 ? (
        <View styles={styles.container}>

        <View style={styles.tourTitleContainer}> 
        <Text style={styles.starttourheadertext}>No Tours Found in {city}</Text>
        </View>
        <View style={styles.starttourImageContainer}>
            {photoUrl && <Image source={{ uri: photoUrl }} style={styles.starttourimage} />}
            </View>
        <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.startbutton}
          onPress={() => navigation.navigate('TourModeStart', { city: city, fare: null, exists: false })}

        >
          <Text style={styles.startbuttonText}>Start Your Own Tour</Text>
        </TouchableOpacity>
        </View>
        </View>
      
      // Tour Found
      ) : (
        tours.map((tour) => (
          <View style={styles.tourContainer} key={tour.id}>
            <View style={styles.tourTitleContainer}>
            <Text style={styles.tourTitle}>On going {tour.city} Tour Found !</Text>
            </View>

            <View style={styles.tourImageContainer}>
            {photoUrl && <Image source={{ uri: photoUrl }} style={styles.image} />}
            </View>

          {/* Display Members */}
          <View style={styles.tourinfo}>
            <Text style={styles.memberText}> Current Passengers </Text>
            <Text style={styles.member}>{tour.members ? tour.members.join(', ') : 'None'}</Text>
            <Text style={styles.fare}> Tour Fare: ${tour.fare}</Text>
          </View>

          <View style={styles.buttoncontainer}>
            {/* Prompt User To Accept / Decline Tour with 2 button options */}
            <TouchableOpacity

              style={styles.Acceptbutton}
              onPress={() => {
                console.log(tour.docid);
                navigation.navigate('TourModeStart', { city: tour.city,
                                                        fare: tour.fare,
                                                        exists: true });
              }}
            >
              <Text style={styles.buttonText}>Join Tour</Text>
            </TouchableOpacity>

            <TouchableOpacity

              style={styles.Rejectbutton}
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          
          </View>

          </View>
          


        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  tourContainer: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
  },
  tourinfo: {
    flex: 1,
    alignItems: 'center',
  },
  tourTitleContainer : {
    flex: 1,
    alignItems: 'center',
  },
  tourTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
    color: 'black',
  },
  buttoncontainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 40,
    justifyContent: 'center',
  },
  member: {
    fontSize: 25,
    marginBottom: 2,
  },
  memberText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  Acceptbutton: {
    backgroundColor: '#1fae51',
    padding: 10,
    borderRadius: 10,
    width: 130,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Rejectbutton: {
    backgroundColor: '#d72503',
    padding: 10,
    borderRadius: 10,
    width: 130,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startbutton: {
    backgroundColor: '#6026c2',
    padding: 10,
    borderRadius: 10,
    width: 300,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startbuttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

  },
  image: {
    width: 350,
    height: 250,
    margin: 10,
    borderRadius: 20,
  },
  starttourimage: {
    width: 350,
    height: 250,
    margin: 10,
    borderRadius: 20,
  },
  tourImageContainer: {
    flex: 2,
    alignItems: 'center',
  },
  starttourImageContainer: {
    flex: 3,
    alignItems: 'center',
  },
  starttourheadertext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
  },

  fare: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 20,
  },

});

export default TourModeProceed;