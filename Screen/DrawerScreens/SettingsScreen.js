import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env";
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';



const SettingsScreen = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const getHiddenPassword = (password) => {
    if (password != null) {
         return '*'.repeat(password.length);
    }
    return '*****';

  };

  useEffect(() => {
    // Function to fetch user info
    const fetchUserInfo = async () => {
      try {
        // Fetch user info from API

        setName(auth().currentUser.displayName);
        setEmail(auth().currentUser.email);
        const password = await AsyncStorage.getItem('password');

        if(password != null){
            setPassword(password);
        }


      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchUserInfo function
    fetchUserInfo();
  }, []);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Delete',
          onPress: async () => {
            const user = auth().currentUser;
            try {
              await user.delete();
              AsyncStorage.clear();
              navigation.replace('Auth');
            } catch (error) {
              console.log(error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };



  return (
    <View style={styles.container}>
      {name && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
            </View>
            <View style={styles.row}>
           {showPassword ? (
           <>
             <Text style={styles.label}>Password:</Text>
             <Text style={styles.value}>{password}</Text>
           </>
         ) : (
           <>
             <Text style={styles.label}>Password:</Text>
             <Text style={styles.value, { marginRight: 10 }}>{getHiddenPassword(password)}</Text>
           </>
         )}

         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
           <Text style={styles.button}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
         </TouchableOpacity>
          </View>

        </>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
      color: '#000',
    },
    value: {
      fontSize: 16,
      color: '#000',
    },
    button: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
      marginLeft: 10,
    },
  });
export default SettingsScreen;


