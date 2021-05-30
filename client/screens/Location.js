import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    FlatList,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants"

// import { connect } from 'react-redux';
import { IconButton, TabButton } from "../components";
import { getTripSummary } from '../API/getTripSummary'
import * as firebase from 'firebase';

const Location = ({ navigation }) => {

    // const x = require("../assets/logomai2.png")
    const userId = firebase?.auth()?.currentUser?.uid
    const [tripData, setTripData] = useState(null)
    let index = 0

    const updateTripList = () => {
        getTripSummary(userId, setTripData)
    }

    useEffect(() => {
        getTripSummary(userId, setTripData)
    }, [])

    useEffect(() => console.log('tripData has changed' , tripData), [tripData])

    function renderHeader() {
        return (
            <SafeAreaView
                style={{
                    paddingTop: 5,
                    height: 105,
                    backgroundColor: COLORS.primary,
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingVertical: SIZES.padding,
                        alignItems: 'center'
                    }}
                >
                    {/* Back Button */}

                    <IconButton
                        icon={icons.leftArrow}
                        onPress={() => navigation.goBack()}
                    />

                    {/* title */}


                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 24, paddingRight: 15 }}>My Stats</Text>
                        <IconButton
                            icon={icons.refresh}
                            onPress={updateTripList}
                        />
                    </View>

                    {/* Empty */}
                    {/* <View style={{ width:25 }}/> */}

                </View>
            </SafeAreaView>
        )
    }

    
    function renderLocationList() {
        return (
            <FlatList 
               style={{
                //    marginTop: SIZES.radius,
                   paddingHorizontal: SIZES.radius
               }} 
               data={tripData}
               keyExtractor={item => item.id}
               showsVerticalScrollIndicator={false}
               keyboardDismissMode="on-drag"
               renderItem={({ item }) => (
                   <TouchableOpacity
                   key={index++}
                    style={{
                        marginBottom: SIZES.radius,
                        borderRadius: SIZES.radius * 2,
                        paddingHorizontal: 15,
                        paddingVertical: SIZES.radius,
                        backgroundColor: COLORS.tert,
                        borderWidth: 1.5,
                        borderColor: COLORS.black                    
                    }}
                    onPress={() => navigation.navigate("Order", item)}
                   >
                       {/* Ride ID and Bookmark */}
                       <View
                        style={{
                            flexDirection: 'row'
                        }}
                       >
                           
                           <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2, fontSize: 18 }}>
                              Destination: { item.destination }
                           </Text>
                            
                       </View>

                       {/* Aggresive % */}
                       <View
                        style={{
                            marginTop: SIZES.base,
                            width: "80%"
                        }}
                       >
                           <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body3,
                                lineHeight: 21
                            }}
                           >Aggresive % : {item.aggresive_percentage}</Text>
                           <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body3,
                                lineHeight: 21
                            }}
                           >Normal Driving : {item.normal_driving}</Text>
                           <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.body3,
                                fontSize: 12,
                                lineHeight: 26
                            }}
                           >Time Stamp : {item.time_stamp}</Text>
                            
                       </View>


                       {/* Services */}
                       <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.base,
                        }}
                       >


                            {/* More Details */}
                            <View
                                style={{
                                    borderColor: COLORS.white,
                                    borderWidth: 1,
                                    borderRadius: 20,
                                    paddingHorizontal: SIZES.radius,
                                    paddingVertical: 5,
                                    marginLeft: 5
                                }}
                            >
                                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>See More Details</Text>
                            </View>

                    
                            
                       </View>


                   </TouchableOpacity>
               )}
               ListFooterComponent={
                <View style={{ marginBottom: 40}} />
            }
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}

            {renderHeader()}
            {/* Detail */}

            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.secondary,
                    marginTop: -20,
                    borderTopLeftRadius: SIZES.radius * 2,
                    borderTopRightRadius: SIZES.radius * 2,
                    padding: SIZES.padding

                }}
            >

                {/* Search */}

                {/* {renderSearchBar()} */}
                
                {/* Flatlist */}

                {renderLocationList()}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})



export default Location;