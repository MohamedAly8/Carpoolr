// Import React
import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingsScreen';
import RideHistory from './DrawerScreens/RideHistory';
import TourModeSelect from './DrawerScreens/TourModeSelect';
import TourModeProceed from './DrawerScreens/TourModeProceed';
import TourModeStart from './DrawerScreens/TourModeStart';
import RequestCarpool from './DrawerScreens/RequestCarpool';
import FinishRequestCarpool from './DrawerScreens/FinishRequestCarpool';
import OfferCarpool from './DrawerScreens/OfferCarpool';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import QRScan from './DrawerScreens/QRScan';
import OnGoingRide from './DrawerScreens/OnGoingRide';

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={{marginRight: 10}}>
              <Image
                source={require('../Image/profile.png')} // Replace with the correct path to your image file
                style={{width: 24, height: 24, tintColor: '#fff'}} // Set the desired width, height, and tint color for the image
              />
            </TouchableOpacity>
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
              style={{marginRight: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>HOME</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="TourModeProceed"
        component={TourModeProceed}
        options={{
          title: 'Tour Mode Proceed', //Set Header Title
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
              style={{marginRight: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Cancel Tour
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RequestCarpool"
        component={RequestCarpool}
        options={{
          title: 'Requesting Carpool',
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
              style={{marginRight: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Cancel Carpool
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="FinishRequestCarpool"
        component={FinishRequestCarpool}
        options={{
          title: 'Rate Your Carpoolers',

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
        name="OfferCarpool"
        component={OfferCarpool}
        options={{
          title: 'Offering Carpool',
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
              style={{marginRight: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Cancel Carpool
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Account Management',
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
              style={{marginRight: 10}}>
              <Image
                source={require('../Image/home.png')} // Replace with the correct path to your image file
                style={{width: 24, height: 24, tintColor: '#fff'}} // Set the desired width, height, and tint color for the image
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="QRScan"
        component={QRScan}
        options={{
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          title: 'QR Scan', //Set Header Title
        }}
      />
      <Stack.Screen
        name="TourModeStart"
        component={TourModeStart}
        options={{
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          title: 'Tour Mode Ongoing', //Set Header Title
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="OnGoingRide"
        component={OnGoingRide}
        options={{
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          title: 'Ongoing Ride', //Set Header Title
          headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={{marginRight: 10}}>
              <Image
                source={require('../Image/home.png')} // Replace with the correct path to your image file
                style={{width: 24, height: 24, tintColor: '#fff'}} // Set the desired width, height, and tint color for the image
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RideHistory"
        component={RideHistory}
        options={{
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          title: 'Ride History', //Set Header Title
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={{marginRight: 10}}>
              <Image
                source={require('../Image/home.png')} // Replace with the correct path to your image file
                style={{width: 24, height: 24, tintColor: '#fff'}} // Set the desired width, height, and tint color for the image
              />
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

const OnGoingRideStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="OnGoingRide"
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
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.popToTop()}
            style={{marginRight: 10}}>
            <Image
              source={require('../Image/home.png')} // Replace with the correct path to your image file
              style={{width: 24, height: 24, tintColor: '#fff'}} // Set the desired width, height, and tint color for the image
            />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name="OnGoingRide"
        component={OnGoingRide}
        options={{
          title: 'Ongoing Ride', //Set Header Title
        }}
        // add home button on right

      />
    </Stack.Navigator>
  );
};

const QRScanStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="QRScan"
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
        name="QRScan"
        component={QRScan}
        options={{
          title: 'QR Scan', //Set Header Title
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

const RequestCarpoolStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="RequestCarpool"
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
        name="RequestCarpool"
        component={RequestCarpool}
        options={{
          title: 'RequestCarpool',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />

      <Stack.Screen
        name="FinishRequestCarpool"
        component={FinishRequestCarpool}
        options={{
          title: 'FinishRequestCarpool',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={{marginRight: 10}}
            />
          ),
        }}
      />

    </Stack.Navigator>
  );
};

const FinishRequestCarpoolStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="FinishRequestCarpool"
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
        name="FinishRequestCarpool"
        component={FinishRequestCarpool}
        options={{
          title: 'FinishRequestCarpool',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />

    </Stack.Navigator>
  );
};


const TourModeStartStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TourModeStart"
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
        name="TourModeStart"
        component={TourModeStart}
        options={{
          title: 'TourModeStart',
        }}
      />
    </Stack.Navigator>
  );
};

const OfferCarpoolStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="OfferCarpool"
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
        name="OfferCarpool"
        component={OfferCarpool}
        options={{
          title: 'OfferCarpool',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="QRScan"
        component={QRScan}
        options={{
          headerStyle: {
            backgroundColor: '#692ad5', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
          title: 'QR Scan', //Set Header Title
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
      <Stack.Screen
        name="TourModeProceed"
        component={TourModeProceed}
        options={{
          title: 'Tour Mode Proceed', //Set Header Title
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
              style={{marginRight: 10}}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>
                Cancel Tour
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="TourModeStart"
        component={TourModeStart}
        options={{
          title: 'TourModeStart',
        }}
      />
    </Stack.Navigator>
  );
};

const TourModeProceedStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="TourModeProceed"
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
        name="TourModeProceed"
        component={TourModeProceed}
        options={{
          title: 'TourModeProceed',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
        }}
      />
      <Stack.Screen
        name="TourModeStart"
        component={TourModeStart}
        options={{
          title: 'TourModeStart',
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        inactiveTintColor: 'red', //Set inactive drawer text color
        activeTintColor: 'white', //Set active drawer text color
        style: {backgroundColor: 'red'},
      }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Home Screen',
          drawerActiveBackgroundColor: '#f6f0fe',
          drawerActiveTintColor: '#692ad5',
        }}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="SettingScreenStack"
        options={{
          drawerLabel: 'Account Management',
          drawerActiveBackgroundColor: '#f6f0fe',
          drawerActiveTintColor: '#692ad5',
        }}
        component={SettingScreenStack}
      />
      <Drawer.Screen
        name="RideHistoryStack"
        options={{
          drawerLabel: 'Ride History',
          drawerActiveBackgroundColor: '#f6f0fe',
          drawerActiveTintColor: '#692ad5',
        }}
        component={RideHistoryStack}
      />

      <Drawer.Screen
        name="TourModeSelectStack"
        options={{
          drawerLabel: 'Tour Mode',
          drawerActiveBackgroundColor: '#f6f0fe',
          drawerActiveTintColor: '#692ad5',
        }}
        component={TourModeSelectStack}
      />
      <Drawer.Screen
        name="TourModeProceedStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={TourModeProceedStack}
      />
      <Drawer.Screen
        name="RequestCarpoolStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={RequestCarpoolStack}
      />

      <Drawer.Screen
        name="OfferCarpoolStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={OfferCarpoolStack}
      />
      <Drawer.Screen
        name="FinishRequestCarpoolStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={FinishRequestCarpoolStack}
      />

      <Drawer.Screen
        name="QRScanStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={QRScanStack}
      />

      <Drawer.Screen
        name="OnGoingRideStack"
        options={{
          drawerItemStyle: {height: 0},
        }}
        component={OnGoingRideStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
