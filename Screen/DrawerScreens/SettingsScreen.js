import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env";
import React, { useState, useEffect } from 'react';

const SettingsScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const getHiddenPassword = (password) => {
    return '*'.repeat(password.length);
  };

  useEffect(() => {
    // Function to fetch user info
    const fetchUserInfo = async () => {
      try {
        // Fetch user info from API
        const user_id = await AsyncStorage.getItem('user_name');
        console.log(user_id);
        const response = await fetch(`http://192.168.2.10:3000/api/user/search?q=${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });



        // Parse response to JSON
        const data = await response.json();
//        console.log(data);
        console.log(data);

        // Set user info to state
        setUserInfo(data.data[0]);

      } catch (error) {
        console.error(error);
      }
    };

    // Call fetchUserInfo function
    fetchUserInfo();
  }, []);


  return (
    <View style={styles.container}>
      {userInfo && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userInfo.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
            </View>
            <View style={styles.row}>
           {showPassword ? (
           <>
             <Text style={styles.label}>Password:</Text>
             <Text style={styles.value}>{userInfo.password}</Text>
           </>
         ) : (
           <>
             <Text style={styles.label}>Password:</Text>
             <Text style={styles.value, { marginRight: 10 }}>{getHiddenPassword(userInfo.password)}</Text>
           </>
         )}

         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
           <Text style={styles.button}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
         </TouchableOpacity>
          </View>

        </>
      )}
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


