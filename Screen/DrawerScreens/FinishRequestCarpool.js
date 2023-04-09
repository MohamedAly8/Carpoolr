import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Slider, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import {GOOGLE_MAPS_API_KEY} from "@env";

const FinishRequestCarpool = ({navigation}) => {






return (
    <View style={styles.container}>
        <Text>Enjoy Your Carpool</Text>
        
        <ActivityIndicator size="large" color="#0000ff" />

        <TouchableOpacity style={styles.returnhomebutton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.buttontext}>Return to Home</Text>
        </TouchableOpacity>
        
    </View>

)

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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