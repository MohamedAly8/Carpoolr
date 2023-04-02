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
  <View style={styles.settingsLayout}>
    <View style={styles.row}>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder={name}/>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} value={newEmail} onChangeText={setNewEmail} placeholder={email}/>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>New Password:</Text>
      <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} />
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
    </View>
   </View>
  </>
) : (
  <>
  <View style={style=styles.settingsLayout}>
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
        <Text style={styles.showPassword}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>
    </View>
   </View>
  </>
)}
<View style={styles.buttonContainer}>
    <TouchableOpacity style={[styles.editButton, styles.button]} onPress={() => setEditMode(!editMode)}>
      <Text style={styles.buttonText}>{editMode ? 'Cancel' : 'Edit'}</Text>
    </TouchableOpacity>
    {editMode && (
      <TouchableOpacity style={[styles.saveButton, styles.button]} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
)}
</View>
<TouchableOpacity style={[styles.deleteButton, styles.button]} onPress={handleDeleteAccount}>
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
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 20,
      color: '#000',
    },
    value: {
      fontSize: 16,
      color: '#000',
    },
    showPassword: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        zIndex: -1,
      },
    button: {
      fontSize: 16,
      color: 'blue',
      textDecorationLine: 'underline',
      borderRadius: 10,
      width: '40%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      marginRight: 5,
      marginLeft: 5,
    },
    editButton: {
        backgroundColor: '#692ad5'
    },
    saveButton: {
        backgroundColor: '#28a745'
    },
    deleteButton: {
        marginTop: -15,
        backgroundColor: '#dc3444'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 150,
      },
      settingsLayout: {
      alignSelf: 'flex-start',
      marginLeft: 15,
      marginBottom: 20
      },
      value: {
      fontSize: 18,
      color: 'black'
      },
  });
export default SettingsScreen;


