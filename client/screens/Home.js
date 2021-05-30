import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Animated,
    Image
} from 'react-native';

import * as firebase from 'firebase';
import {getProfileDetails} from "../API/getProfileDetails"

import {HeaderBar, CustomButton} from "../components"; 
import { COLORS, SIZES, constants, icons, FONTS, dummyData, images } from '../constants';


const Home = ({ navigation }) => {

    
    return (
        <View style={styles.container}>
            <HeaderBar/>

            <View
                style={{
                    flex: 1,
                    marginTop: -45,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2,
                    backgroundColor: COLORS.secondary
                }}
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            >
                
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
                    <View>
                        <Text
                            style={{
                                ...FONTS.h1,
                                color: COLORS.tert,
                                fontSize: 23,
                                paddingBottom:16
                            }}
                        >
                            To start your ride click below:
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 250,
                            height: 250,
                            borderRadius: 125,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.tert,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => navigation.navigate("StartJourney")}
                        >

                            <Image
                                source={require('../assets/anuj.gif')}  
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 1000
                                }}
                            />

                            <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.h2,
                                paddingTop: 10
                            }}>Start Driving</Text>
                    </TouchableOpacity>
                </View>
                 

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,      
    }
})

export default Home;
