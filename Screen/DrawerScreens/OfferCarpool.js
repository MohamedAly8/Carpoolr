import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Slider, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import {GOOGLE_MAPS_API_KEY} from "@env";


const OfferCarpool = ({ route }) => {
    const { lat, long, destinationName, fare } = route.params;
    const dest = destinationName.split(',')[0];
    const BaseFare = fare;

    const [maxPassengers, setMaxPassengers] = useState(1);
    const [maxTimeDelay, setMaxTimeDelay] = useState(0);
    const [estimatedFare, setEstimatedFare] = useState(BaseFare);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(true);


    const onMaxPassengersChange = (value) => {
        setMaxPassengers(value);
        calculateEstimatedFare(value, maxTimeDelay);
    }

    const onMaxTimeDelayChange = (value) => {
        setMaxTimeDelay(value);
        calculateEstimatedFare(maxPassengers, value);
    }

    const calculateEstimatedFare = (passengers, timeDelay) => {
        // Calculation logic for estimated fare based on maxPassengers and maxTimeDelay
        // You can customize this logic as per your requirements
        const fare = BaseFare - (passengers * 2) - (timeDelay * 0.5);
        setEstimatedFare(Math.max(2, fare.toFixed(2)));
    }

    useEffect(() => {
        // Call Google Places API to retrieve photo reference for the destination
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${dest}&inputtype=textquery&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.candidates && data.candidates.length > 0 && data.candidates[0].photos) {
                    console.log('heeeere')
                    const photoRef = data.candidates[0].photos[0].photo_reference;
                    // Call Google Places Photos API to retrieve the actual image
                    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_MAPS_API_KEY}`;
                    setPhotoUrl(photoUrl);
                    console.log(photoUrl);
                } else {
                    console.log('No photos found for destination');
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [dest]);

    return (
        <View style={styles.container}>

            <View style={styles.promptTexts}>

            <Text style={styles.text}>Your Destination is</Text>
            <Text style={styles.destinationtext}>{dest}</Text>

            </View>

            <View style={styles.img}>
                {photoUrl && <Image source={{ uri: photoUrl }} style={styles.image} />}

            </View>

            <View style={styles.formContainer}>

                <Text style={styles.modifytext}> Modify Your Carpool Settings </Text>


                <Text style={styles.label}>Max Passengers to Join: {maxPassengers}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={6}
                    step={1}
                    value={maxPassengers}
                    onValueChange={onMaxPassengersChange}
                />
                <Text style={styles.label}>Estimated Travel Delay (minutes): {maxTimeDelay}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={30}
                    step={1}
                    value={maxTimeDelay}
                    onValueChange={onMaxTimeDelayChange}
                />
                <Text style={styles.fare}>Estimated Fare: ${estimatedFare}</Text>
                <Text style={styles.savings}>You're Saving: ${(BaseFare-estimatedFare).toFixed(2)} !</Text>

                <View style={styles.buttonContainer}>
                   <TouchableOpacity style={styles.button} >
                         <Text style={styles.buttonText}>Submit</Text>
                   </TouchableOpacity>
                </View>

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
    img : {
        flex: 3,

    },
    image : {
        flex: 1,
        width: 350,
        borderRadius: 30,

    },
    promptTexts : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    destinationtext : {
        fontSize: 30,
        fontWeight: 'bold',
    },
    modifytext: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 20,

    },
    formContainer: {
        flex: 7,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green'
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
          backgroundColor: '#692ad5',
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
});

export default OfferCarpool;