import React from 'react';
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

// import { HeaderBar } from "../components";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants"
import { HeaderBar, CustomButton, IconButton, HeaderNormal } from "../components";
import { Home } from '../screens/Home'



const Stats = ({ route, navigation }) => {

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
                    <IconButton
                        icon={icons.leftArrow}
                        onPress={() => navigation.navigate('Home')}
                    />
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Ride Statistics</Text>

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

    // console.log(route.params)

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
                                    marginTop: SIZES.padding,
                                    paddingBottom: 40
                                }}>
                                
                                <TouchableWithoutFeedback >
                                    <View
                                        style={{
                                            height: 400,
                                            width: 365,
                                            paddingHorizontal: SIZES.padding,
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end' 
                                        }}
                                    >
    
    
                                        {/* Details */}
    
                                        <View
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                paddingLeft: "10%",
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
                                                    ...FONTS.h2,
                                                    fontSize: 16,
                                                }}
                                            >
                                                {/* space */}
                                            </Text>
    
                                            {/* if possible enter dest location */}
                                            <Text style={styles.texts}>Acceleration: {route.params.stats.accelerations}</Text> 
                                            <Text style={styles.texts}>Left turns: {route.params.stats.left_turns}</Text> 
                                            <Text style={styles.texts}>Right turns: {route.params.stats.right_turns}</Text> 
                                            <Text style={styles.texts}>Sudden accelerations: {route.params.stats.sudden_accelerations}</Text> 
                                            <Text style={styles.texts}>Sudden braking: {route.params.stats.sudden_braking}</Text> 
                                            <Text style={styles.texts}>Sudden left turns: {route.params.stats.sudden_left_turns}</Text> 
                                            <Text style={styles.texts}>Sudden right turns: {route.params.stats.sudden_right_turns}</Text> 
                                            <Text style={styles.texts}>Normal driving: {route.params.stats.normal_driving}</Text> 
                                            <Text style={styles.texts}>Speed exceeds %: {route.params.stats.percent_speed_exceeds}</Text> 
                                            <Text style={styles.texts}>Aggresive %: {route.params.stats.aggresive_percentage}</Text> 
                                            <Text style={styles.texts}>Current All Trips Average %: {route.params.currentAllTripsAvg}</Text> 
                                                
                                            <Text
                                                style={{
                                                    color: COLORS.white,
                                                    ...FONTS.h2,
                                                    fontSize: 16, 
                                                }}
                                            >
                                                {/* space */}
                                            </Text>
    
    
                                            
                                        </View>
    
                                    </View>
                                </TouchableWithoutFeedback>
    
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
        fontSize: 19
    },
})


export default Stats;