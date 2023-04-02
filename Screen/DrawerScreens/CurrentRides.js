import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function CurrentRides(){


  firestore()
    .collection('ActiveRiders')
    .get()
    .then(querySnapshot => {
      console.log('Total users: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('User ID: ' documentSnapshot.id, documentSnapshot.data());
      });
    });


  return (
    <Text> Hello </Text>
  )

};

