import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import { Rating } from 'react-native-ratings';

import {GOOGLE_MAPS_API_KEY} from "@env";

const FinishRequestCarpool = ({navigation, route }) => {
    const {passengers, fare} = route.params;
    const [showOngoingRideScreen, setShowOngoingRideScreen] = useState(true);
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowOngoingRideScreen(false);
            console.log(passengers);
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    if (showOngoingRideScreen) {
        return (
            <View style={styles.container}>
                <Text>Your Ride is Currently Ongoing</Text>
                <Text>Your Fare is: {fare}</Text>
                
                <ActivityIndicator size="large" color="#0000ff" />
        

                
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Rate Your Carpool Passengers</Text>
                {passengers.map((passenger, index) => (
                    <View key={index} style={styles.passengerContainer}>
                        <Text>Rate {passenger}</Text>
                        <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={40}
                        showRating
                        onFinishRating={this.ratingCompleted}
                        />
                    </View>
                ))}

                <TouchableOpacity style={styles.returnhomebutton} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.buttontext}>Submit</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    passengerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    returnhomebutton: {
        backgroundColor: '#692ad5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 20,
        
    },
    buttontext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default FinishRequestCarpool;