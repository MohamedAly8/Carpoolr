import { Text, View, StyleSheet, TouchableOpacity, Alert, TextInput, Keyboard } from 'react-native';
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

  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSaveChanges = async () => {
    Keyboard.dismiss();

    if (newEmail.trim() === '' && newName.trim() === '' && newPassword.trim() === '') {
      Alert.alert('No Changes Made', 'You have not made any changes to your account information.');
      setEditMode(false);
      return;
    }

    const user = auth().currentUser;
    const updateData = {};

    if (newEmail.trim() !== '') {
      updateData.email = newEmail.trim();
      setEmail(newEmail.trim());
    }

    if (newName.trim() !== '') {
      updateData.displayName = newName.trim();
      setName(newName.trim());

    }

    if (newPassword.trim() !== '') {
      if (newPassword.trim().length < 6) {
        Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
        return;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert('Passwords Do Not Match', 'Please confirm your new password.');
        return;
      }

      try {
        await user.updatePassword(newPassword.trim());
        setPassword(confirmPassword.trim());
      } catch (error) {
        console.error(error);
        Alert.alert('Error Updating Password', 'There was an error updating your password. Please try again later.');
        return;
      }
    }

    if (Object.keys(updateData).length > 0) {
      try {
        await user.updateProfile(updateData);
        Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error Updating Profile', 'There was an error updating your profile. Please try again later.');
        return;
      }
    }

    setEditMode(false);




  };

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
{editMode ? (
  <>
    <View style={styles.row}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={newName} onChangeText={setNewName} />
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={newEmail} onChangeText={setNewEmail} />
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>New Password:</Text>
      <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} />
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
    </View>
  </>
) : (
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

<TouchableOpacity style={styles.button} onPress={() => setEditMode(!editMode)}>
  <Text style={styles.buttonText}>{editMode ? 'Cancel' : 'Edit'}</Text>
</TouchableOpacity>
{editMode && (
  <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
    <Text style={styles.buttonText}>Save Changes</Text>
  </TouchableOpacity>
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


