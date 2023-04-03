
// Import React
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import RideHistory from './DrawerScreens/RideHistory';
import TourModeSelect from './DrawerScreens/TourModeSelect';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
            <Stack.Screen
              name="TourModeSelect"
              component={TourModeSelect}
              options={{
                title: 'Tour Mode', //Set Header Title
                headerLeft: () => (
                  <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                  backgroundColor: '#692ad5', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
                headerRight: () => (
                            <TouchableOpacity
                              onPress={() => navigation.popToTop()}
                              style={{ marginRight: 10 }}
                            >
                              <Text style={{ color: '#fff', fontWeight: 'bold' }}>HOME</Text>
                            </TouchableOpacity>
                          ),
              }}
            />
    </Stack.Navigator>
  );
};

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#692ad5', //Set Header color
        },
        headerTintColor: 'white', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const RideHistoryStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="RideHistory"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#692ad5',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={{
          title: 'Ride History',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TourModeSelectStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TourModeSelect"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#692ad5',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="TourModeSelect"
        component={TourModeSelect}
        options={{
          title: 'TourModeSelect',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator


    screenOptions={{headerShown: false,
      inactiveTintColor: 'red', //Set inactive drawer text color
      activeTintColor: 'white', //Set active drawer text color
      style: {backgroundColor: 'red'},}}
      drawerContent={CustomSidebarMenu}
     >

      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Home Screen'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{drawerLabel: 'Setting Screen'}}
        component={SettingScreenStack}
      />
      <Drawer.Screen
          name="RideHistoryStack"
          options={{drawerLabel: 'Ride History'}}
          component={RideHistoryStack}
            />

     <Drawer.Screen
         name="TourModeSelectStack"
         options={{drawerLabel: 'Tour Mode'}}
         component={TourModeSelectStack}
           />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;