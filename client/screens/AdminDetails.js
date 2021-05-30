import React, { useState, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import { COLORS, FONTS, SIZES, icons } from "../constants"

import { IconButton } from "../components"

const AdminDetails = ({ navigation, route }) => {

    const userData = route?.params?.arrayOfTripsOfThisUser
    let index = 0
  
    function renderHeader() {
        return (
            <SafeAreaView
                style={{
                    paddingTop:10,
                    height: 200,
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
                        <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 24, paddingRight: 5 }}>{route?.params?.userName}'s Stats</Text>
                    </View>

                    {/* Empty */}
                    {/* <View style={{ width:25 }}/> */}

                </View>
                <View
                >
                    <Text style={{ ...FONTS.h5, color: COLORS.white, fontSize: 17, lineHeight: 24 }}>Initial Premium : {Math.round(route?.params?.initPrem * 100)/100 } </Text>
                    <Text style={{ ...FONTS.h5, color: COLORS.white, fontSize: 17, lineHeight: 24 }}>Latest Premium : {route?.params?.latestPremium? Math.round(route.params.latestPremium * 100)/100 : 'NA'}</Text>
                    <Text style={{ ...FONTS.h5, color: COLORS.white, fontSize: 17, lineHeight: 24 }}>Latest Average Aggressive %  : {route?.params?.latestAverage? Math.round(route.params.latestAverage * 100)/100 : 0}</Text>
                </View>
            </SafeAreaView>
        )
    }
    
    function renderLocationList() {
        return (
            <>           
                <FlatList 
                   style={{
                    //    marginTop: SIZES.radius,
                       paddingHorizontal: SIZES.radius
                   }} 
                   data={userData}
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
                    <View style={{ marginBottom: 10}} />
                }
                />
            </>
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

export default AdminDetails