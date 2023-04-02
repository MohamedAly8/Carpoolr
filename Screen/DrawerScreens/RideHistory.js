import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useState, useEffect} from 'react';

export default function RideHistory() {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    firestore()
      .collection('ActiveRiders')
      .get()
      .then(querySnapshot => {
        const riders = [];
        querySnapshot.forEach(documentSnapshot => {
          riders.push({
            ...documentSnapshot.data(),
          });
        });
        setRiders(riders);

      });
  }, []);

  return (
    <View style={{flex: 1}}>


      {riders.map(rider => (
        <Text style={{  marginTop: 80,
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'red',
                        textAlign: 'center'}}
        key={rider.username}>{rider.username}</Text>
      ))}

    </View>


  );
}
