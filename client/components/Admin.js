import React, { useEffect, useState } from 'react'
// import { Button, Text, View, StyleSheet } from 'react-native'
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView, Button
} from 'react-native';
import { loggingOut } from '../API/firebaseMethods'
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants"
import { HeaderBar, CustomButton, IconButton, HeaderNormal } from "../components";

import { getAllUsers } from '../API/getAllUsers'

const Admin = ({ navigation }) => {
    const [usersData, setUsersData] = useState([])   
    const [isLoading, setIsLoading] = useState(null)

    useEffect(() => {
        if(usersData.length !== 0)
            setIsLoading(false)
    }, [usersData])

    function renderHeaderSection() {
        return (
            <SafeAreaView
                style={{
                    height: 180,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center',
                    paddingTop: 30
                }}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        alignItems: "center"
                    }}
                >
                    {/* <IconButton
                        icon={icons.leftArrow}
                        onPress={() => navigation.goBack()}
                    /> */}
                     <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 24, paddingRight: 15 }}>Admin Page</Text>
                        <IconButton
                            icon={icons.refresh}
                            onPress={() => {setUsersData([]); setIsLoading(true); getAllUsers(setUsersData)}}
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

            {/* Details */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.secondary,
                    marginTop: -90,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2,
                    padding: SIZES.padding

                }}
            >
               
               {isLoading? 
               <Text style={{ ...FONTS.h5, color: COLORS.tert, fontSize: 18, fontWeight: 'bold' }}>Loading, wait please..</Text>
               :
               <View style={styles.padder}>
                       <ScrollView
                          style={{ marginBottom: 65}} 
                          >
                       { usersData.map((val, index) => {
                            return(                        
                                <View key={index} style={styles.emailStyle}>
                                    <TouchableOpacity
                                        style={{
                                            marginBottom: SIZES.radius,
                                            borderRadius: SIZES.radius * 2,
                                            paddingHorizontal: 15,
                                            paddingVertical: SIZES.radius,
                                            backgroundColor: COLORS.tert,
                                        }}
                                        onPress={() => navigation.navigate('AdminDetails', val)}
                                    >
                                        <Text style={styles.fonter}>User Name: {val.userName}</Text>
                                        <Text style={styles.fonter}>Latest Premium : {Math.round(val.latestPremium * 100)/100}</Text>
                                        <Text style={styles.fonter}>Latest Average Aggressive % : {Math.round(val.latestAverage * 100)/100}</Text>
                                    </TouchableOpacity>                            
                                </View>
                            )
                        })
                       }
                       </ScrollView>
               </View> 
             }   
            </View>
            <TouchableOpacity
                    style={{
                        width: "100%",
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.tert,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: COLORS.white,
                        position: 'absolute',
                        left: 0,
                        bottom: 40

                    }}
                    onPress={() => loggingOut()}  
                    >
                        <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            fontSize: 16
                        }}>Log out</Text>
                </TouchableOpacity>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 50,      
    },

    padder: {
        paddingTop: 0,
    },

    emailStyle: {
        paddingTop: 10
    },

    fonter: {
        ...FONTS.h5,
        color: COLORS.white,
        fontSize: 18
    }
})

export default Admin