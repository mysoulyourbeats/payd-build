import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants";
import { IconButton, TabButton, CustomButton } from "../components";
import * as firebase from 'firebase';


const MainPage = ({ navigation }) => {
   
    return (
        <View style={styles.container}>
            
            {/* Details */}
            <View style={{
                flex:1,
                // paddingTop: 100,
                paddingLeft: 20,
                alignContent: 'center',
                justifyContent: 'center'
            }}>

                <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h1,
                    alignSelf: 'center'
                }}
                >Welcome To </Text>
                <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h1,
                    alignSelf: 'center'
                }}
                >Pay As you Drive!
                </Text>
                <View
                    style={{
                        padding: 30
                    }}
                ></View>



                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                        onPress={() => navigation.navigate("SignUp")}  >
                            <Text
                            style={{
                                color: COLORS.primary,
                                ...FONTS.h2
                            }}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={{padding: 10}} ></View>
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
                        onPress={() => navigation.navigate("SignIn")}  >
                            <Text
                            style={{
                                color: COLORS.primary,
                                ...FONTS.h2
                            }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
        
    },
    texts: {
        color: COLORS.lightYellow,
        ...FONTS.h2,
        fontSize: 20

    }
})


export default MainPage;