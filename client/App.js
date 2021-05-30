import React from 'react'
import { Home,Location, Order, SignUp,SignIn, Profile, ProfileDisplay, MainPage, LoadingScreen, Loading } from "./screens"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native'
import {useFonts} from 'expo-font'
import Tabs from "./navigation/tabs"
import * as firebase from 'firebase'
import StartJourney from './components/StartJourney'
import NativeMap from './components/NativeMap'
import Stats from './components/Stats'
import Admin from './components/Admin'
import AdminDetails from './screens/AdminDetails'

const Stack = createStackNavigator();


const firebaseConfig = {
    apiKey: "YOUR_GOOGLE_API_KEY",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}
 

if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

const App = () => {


    const [loaded] = useFonts({
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      });
      
    if (!loaded) {
    return null;
    }

    return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'LoadingScreen'}
                >
                    <Stack.Screen
                        name="MainPage"
                        component={MainPage}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Tabs}
                    />

                    <Stack.Screen
                        name="Location"
                        component={Location}
                    />

                    <Stack.Screen
                        name="Order"
                        component={Order}
                    />

                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                    />

                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />

                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                    />

                    <Stack.Screen
                        name="ProfileDisplay"
                        component={ProfileDisplay}
                    />

                    <Stack.Screen
                        name="NativeMap"
                        component={NativeMap}
                    />

                    <Stack.Screen
                        name="StartJourney"
                        component={StartJourney}
                    />

                    <Stack.Screen
                        name="Stats"
                        component={Stats}
                    />

                    <Stack.Screen
                        name="Loading"
                        component={Loading}
                    />

                    <Stack.Screen
                         name="LoadingScreen"
                        component={LoadingScreen}
                    />

                    <Stack.Screen
                         name="Admin"
                        component={Admin}
                    />

                    <Stack.Screen
                        name="AdminDetails"
                        component={AdminDetails}
                    />

                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default App;