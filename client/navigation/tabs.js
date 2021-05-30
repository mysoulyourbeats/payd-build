import React from "react";
import {
    Image,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { Home, Rewards, Location, ProfileDisplay } from "../screens"
import { COLORS, SIZES, icons } from "../constants"

import firebase from "firebase"
import Admin from '../components/Admin'

const Tab = createBottomTabNavigator()

const CustomTabBar = (props) => {
    return (
        <View>
            <View
                style={{
                    position:'absolute',
                    bottom: 0,
                    height: 30,
                    left: 0,
                    right: 0,
                    backgroundColor: COLORS.tert
                }}
            />
            <BottomTabBar
                {...props.props}
            />

        </View>
    )
}

const CustomTabBarButton = ({containerStyle, isFloat, children, onPress}) => {
    if (isFloat) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: -30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <TouchableNativeFeedback
                onPress={onPress}
            >
                <View
                    style={{
                        flex: 1,
                        height: 60,
                        backgroundColor: COLORS.tert,
                        ...containerStyle
                    }}
                >
                    {children}
                </View>

            </TouchableNativeFeedback>

        )
    }
}

const Tabs = () => {

    const handlePress = () => {
        loggingOut();
        navigation.replace('MainPage');
      };

    if(firebase?.auth()?.currentUser?.email === 'admin@gmail.com'){
        return(
            <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            elevation: 0,
                            backgroundColor: 'transparent',
                            borderTopColor: "transparent",
                            height: (Platform.OS == 'android') ? 0 : 0
                        }
                    }}
                    tabBar={(props) => (
                        <CustomTabBar
                            props={props}
                        />
                    )}
            >
                    <Tab.Screen
                        name="Home"
                        component={Admin}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    // source={icons.home}
                                    resizeMode="contain"
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: focused ? COLORS.white : COLORS.black
                                    }}
                                />
                            ),
                            tabBarButton: (props) => (
                                <CustomTabBarButton
                                    {...props}
                                    containerStyle={{
                                        borderTopLeftRadius: SIZES.radius * 2.5,
                                        borderTopRightRadius: SIZES.radius * 2.5,
                                    }}
                                />

                            )
                        }}
                    />
           </Tab.Navigator>
        )
    } else{
            return (
                <Tab.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        style: {
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            elevation: 0,
                            backgroundColor: 'transparent',
                            borderTopColor: "transparent",
                            height: (Platform.OS == 'android') ? 60 : 80
                        }
                    }}
                    tabBar={(props) => (
                        <CustomTabBar
                            props={props}
                        />
                    )}
                >
                    <Tab.Screen
                        name="Home"
                        component={Home}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={icons.home}
                                    resizeMode="contain"
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: focused ? COLORS.white : COLORS.black
                                    }}
                                />
                            ),
                            tabBarButton: (props) => (
                                <CustomTabBarButton
                                    {...props}
                                    containerStyle={{
                                        borderTopLeftRadius: SIZES.radius * 2.5,
                                    }}
                                />

                            )
                        }}
                    />

                    <Tab.Screen
                        name="Favourite"
                        component={Location}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={icons.pie_chart}
                                    resizeMode="contain"
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: focused ? COLORS.white : COLORS.black
                                    }}
                                />
                            ),

                            tabBarButton: (props) => (
                                <CustomTabBarButton
                                    {...props}
                                    
                                />

                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileDisplay}
                        //  After filling profile, there should be profile page here
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={icons.profile}
                                    resizeMode="contain"
                                    style={{
                                        width: 35,
                                        height: 35,
                                        tintColor: focused ? COLORS.white : COLORS.black
                                    }}
                                />
                            ),

                            tabBarButton: (props) => (
                                <CustomTabBarButton
                                    {...props}
                                    containerStyle={{
                                        borderTopRightRadius: SIZES.radius * 2.5
                                    }}
                                    
                                />

                            )
                        }}
                    />
                </Tab.Navigator>
            )
        }
}

export default Tabs;