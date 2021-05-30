import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Text
} from 'react-native';

import * as firebase from 'firebase';
import {getProfileDetails} from "../API/getProfileDetails"
import { SIZES, COLORS, FONTS,  } from "../constants";

const HeaderBar = () => {
    const [profileDetails, setProfileDetails] = useState(null)
    const userId = firebase?.auth()?.currentUser?.uid

    useEffect(() => {
        getProfileDetails(userId, setProfileDetails)
    }, [])

    return (
        <SafeAreaView
            style={{
                height: 150,
                width: '100%',
                backgroundColor: COLORS.primary,
                flexDirection: 'row',
                paddingTop: 20
            }}
        >
            {/* Greetings */}

            <View
                style={{
                    flex: 1,
                    paddingLeft: SIZES.padding,
                    paddingTop: 5
                }}
            >
                <Text 
                    style={{color: COLORS.white, ...FONTS.h2}} 
                >
                    Welcome, 
                </Text>
                <Text 
                    style={{color: COLORS.white, ...FONTS.h2}} 
                >
                    {profileDetails?.firstName} {profileDetails?.lastName}
                </Text>
            </View>

        </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    flex: 1
})


export default HeaderBar;
