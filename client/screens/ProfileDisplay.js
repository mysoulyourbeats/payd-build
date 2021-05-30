import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import { HeaderBar, CustomButton, IconButton, HeaderNormal } from "../components";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants"
import {getProfileDetails, getInsuranceAmount} from "../API/getProfileDetails"
import {loggingOut} from "../API/firebaseMethods"
import * as firebase from 'firebase'

const ProfileDisplay = ({ navigation }) => {

    const [profileDetails, setProfileDetails] = useState(null)
    const [insuranceAmount, setInsuranceAmount] = useState(null)
    const userId = firebase?.auth()?.currentUser?.uid

    const updateInsurance = () => {
        getInsuranceAmount(userId, setInsuranceAmount)
    }

    useEffect(() => {
        getProfileDetails(userId, setProfileDetails)
    }, [])

    useEffect(() => {
        getInsuranceAmount(userId, setInsuranceAmount)
    }, [])

    const handlePress = () => {
        loggingOut();
        navigation.replace('MainPage');
      };


    function renderHeaderSection() {
        return (
            <SafeAreaView
                style={{
                    height: 180,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    paddingTop: 20
                }}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        icon={icons.leftArrow}
                        onPress={() => navigation.goBack()}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25, paddingRight: 15 }}>Profile</Text>
                        <IconButton
                            icon={icons.refresh}
                            onPress={updateInsurance}
                        />
                    </View>

                    <View 
                        style={{
                            width: 25
                        }}
                    />

                </View>


            </SafeAreaView>
        )
    }
    
    return (
        <View style={styles.container}>
            {/* Header */}
            {renderHeaderSection()}
            {/* <ScrollView>
                
            </ScrollView> */}
            {/* Details */}
            <View style={{
                flex:1,
                backgroundColor: COLORS.secondary,
                marginTop: -100,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40
            }}>

                <View
                    style={{
                        paddingBottom: 5
                    }}
                />


                {/*  listing */}

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}
                >

                    {/* Listing */}

                    <View 
                        style= {{
                            marginTop:15,
                            paddingBottom: 40
                        }}>
                            <ScrollView>
                        
                        <TouchableWithoutFeedback >
                            <View
                                style={{
                                    height: 480,
                                    width: 360,
                                    paddingHorizontal: SIZES.padding,
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end' 
                                }}
                            >

                                    <View
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            paddingLeft: "6%",
                                            paddingVertical: SIZES.base,
                                            paddingRight: SIZES.base,
                                            borderRadius: SIZES.radius,
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.primary
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                ...FONTS.h5,
                                                fontSize: 23,                                                    
                                            }}
                                        >
                                            Name: <Text style={styles.textInput}>{profileDetails?.firstName} {profileDetails?.lastName}</Text> 
                                        </Text>
                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                ...FONTS.h5,
                                                fontSize: 23,                                                    
                                            }}
                                        >
                                            Age: <Text style={styles.textInput}>{profileDetails?.age}</Text> 
                                        </Text>


                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                ...FONTS.h5,
                                                fontSize: 16,
                                                // lineHeight: 25,
                                                
                                            }}
                                        >
                                            
                                        </Text>

                                        <Text
                                            style={styles.texts}
                                        >Car Model: <Text style={styles.textInput}>{profileDetails?.car}</Text>
                                        </Text>
                                        <Text
                                            style={styles.texts}
                                        >Car Type: <Text style={styles.textInput}>{profileDetails?.type}</Text> 
                                        </Text>
                                        <Text
                                            style={styles.texts}
                                        >Fuel: <Text style={styles.textInput}>{profileDetails?.fuel}</Text>
                                        </Text>
                                        <Text
                                            style={styles.texts}
                                        >Year of Manufacture: <Text style={styles.textInput}>{profileDetails?.yearofmanu}</Text>
                                        </Text>
                                        <Text
                                            style={styles.texts}
                                        >Engine Capacity: <Text style={styles.textInput}>{profileDetails?.enginecapa} cc</Text>
                                        </Text>
                                        <Text
                                            style={styles.texts}
                                        >Initial Premium: <Text style={{ ...FONTS.h2, color: COLORS.lightYellow , fontStyle: 'italic' }}>Rs. {Math.round(profileDetails?.initprem * 100)/100}</Text>
                                        </Text>
                                        

                                            
                                        <Text
                                            style={{
                                                color: COLORS.white,
                                                ...FONTS.h2,
                                                fontSize: 16, 
                                            }}
                                        >
                                            
                                        </Text>


                                        <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <TouchableOpacity
                                            onPress={updateInsurance}
                                                style={{
                                                    width: 250,
                                                    height: 50,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.secondary,
                                                borderRadius: 15
                                                }}  >
                                                    <Text
                                                    style={{
                                                        color: COLORS.tert,
                                                        ...FONTS.h2,
                                                        fontSize: 18,
                                                    }}>Current Trips Average: {Math.round(insuranceAmount?.recentAverage * 100)/100}</Text>
                                            </TouchableOpacity>
                                                
                                            
                                                {/* <Text
                                                    style={{
                                                        color: COLORS.white,
                                                        ...FONTS.h2,
                                                        fontSize: 16,                                                
                                                    }}
                                                >    
                                                </Text> */}

                                            {/* <TouchableOpacity
                                                onPress={updateInsurance}
                                                style={{
                                                    width: 250,
                                                    height: 50,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.secondary,
                                                borderRadius: 15
                                                }}  >
                                                    <Text
                                                        style={{
                                                            color: COLORS.white,
                                                            ...FONTS.h2,
                                                            fontSize: 18,
                                                        }}>Current Insurance: Rs. {insuranceAmount?.recentPremium? Math.round(insuranceAmount?.recentPremium * 100)/100 
                                                                                                                : Math.round(profileDetails?.initprem * 100)/100} 
                                                    </Text>
                                            </TouchableOpacity> */}

                                            <Text
                                                style={{
                                                    color: COLORS.white,
                                                    ...FONTS.h2,
                                                    fontSize: 16,                                            
                                                }}
                                            >      
                                            </Text>

                                            <TouchableOpacity
                                                style={{
                                                    width: 150,
                                                    height: 50,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: COLORS.white,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                onPress={handlePress}  >
                                                    <Text
                                                    style={{
                                                        color: COLORS.primary,
                                                        ...FONTS.h2
                                                    }}>Log Out</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>                     
                            </View>
                        </TouchableWithoutFeedback>
                        </ScrollView>

                    </View>
                                           
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    texts: {
        color: COLORS.white,
        ...FONTS.h5,
        fontSize: 21
    },
    textInput: {
        ...FONTS.h5, 
        fontStyle: 'italic', 
        color: COLORS.secondary
    }
})


export default ProfileDisplay;
