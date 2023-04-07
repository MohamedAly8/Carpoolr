import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GOOGLE_MAPS_API_KEY} from "@env";


const TourModeStart = ({route, navigation}) => {
  const { city, fare, exists } = route.params;
  const name = auth().currentUser.displayName;
  const [tour, setTour] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);


      // if fare is null generate random fare between 5 to 20, if not null set fare to fare


  useEffect(() => {

    if (exists) {
      // Join the existing tour
      firestore()
        .collection('ActiveTours')
        .where('city', '==', city)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 1) {
            const doc = querySnapshot.docs[0];
            const members = doc.data().members || [];
            if (!members.includes(name)) {
            
              members.push(name);
              console.log(name);
              console.log(doc.data().members);
              console.log('before update');
              doc.ref.update({members});
              console.log('after update');
            }
            setTour({ id: doc.ref.id, city, members });
          } else {
            console.warn(`Found ${querySnapshot.size} tours for city "${city}"`);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Create a new tour
      const members = [name];
      firestore()
        .collection('ActiveTours')
        .add({ city, members })
        .then(() => {
          setTour({city, members });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;

    fetch(url)

      .then((response) => response.json())
      .then((data) => {
        
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].photos) {

            const photoRefs = data.candidates[0].photos.map((photo) => photo.photo_reference);

          if (photoRefs.length > 1){
            const photoRef = photoRefs[1];
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
            console.log('more than one pic');
          }
            else {
            console.log('only one pic');
            const photoRef = photoRefs[0];
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
          // Call Google Places Photos API to retrieve the actual image

          setPhotoUrl(photoUrl);
          console.log(photoUrl);
        
        }
     } else { 
          console.log('No photos found for destination');
        }
      
    })
    .catch((error) => console.log(error))

  }, [city, name]);


  // function handleEndTour to end a tour. Remove name from the database 
  const handleEndTour = () => {
    const updatedMembers = tour.members.filter((member) => member !== name);
    firestore()
      .collection('ActiveTours')
      .doc(tour.id)
      .update({ members: updatedMembers })
      .then(() => {
        setTour({ ...tour, members: updatedMembers });
      })
      .catch((error) => {
        console.error(error);
      });
    // make an alert telling user message about tour ended
    Alert.alert(
        'Tour Ended',
        'Thank you for using our service!',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
    navigation.navigate('HomeScreen');
    
    // ADD RIDE TO RIDE HISTORY

  };
    
  return (
    <View style={styles.container}>
      {tour ? (
        <>
        
        <View style={styles.containerheader}>
          <Text style={styles.text}>You are now in Tour Mode</Text>
          <Text style={styles.title}>{`Enjoy ${tour.city}!`}</Text>
        </View>

        <View style={styles.imagecontainer}>
        {photoUrl && <Image source={{ uri: photoUrl }} style={styles.image} />}
        </View>


        <View style={styles.tourmemberscontainer}>   
        <Text style={styles.memberheader}>Members:</Text>
            <View style={styles.membercontainer}>
                <Text style={styles.membertext}>{tour.members ? tour.members.join(', ') : 'None'}</Text>
            </View>
        </View>

        <View style={styles.farecontainer}>
        <Text style={styles.text}>{`Fare: $${fare ? fare : (Math.random() * 10 + 5).toFixed(2)}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={handleEndTour}
        >
        <Text style={styles.buttonText}>End Tour</Text>
        </TouchableOpacity>
        </View>

        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  memberheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  membertext: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,

  },
  buttonContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    },
    button: {
    backgroundColor: '#6026c2',
    padding: 10,
    borderRadius: 5,
    width: 150,
    height: 50,
    alignItems: 'center',
    
    },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
    containerheader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 20,
        },
    tourmemberscontainer: {
        // make itemsside by side 
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        },
        membercontainer: {
        // make itemsside by side 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 20,
        },
    farecontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 20,
        },
    imagecontainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 20,
        },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        },
    memberheadercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 20,
        },
    

});

export default TourModeStart;
