import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, SIZES, constants, icons, FONTS, dummyData, images } from '../constants';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/anuj.gif')}  
        style={{width: 170, height: 170 }}
    />
      <Text style={{ ...FONTS.h2,fontSize: 17, paddingTop: 15, color: COLORS.white }}>Calculating your trip summary..</Text>
      <Text style={{...FONTS.h2, fontSize: 17, color: COLORS.white }}>May take several minutes..</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f06044',
    alignItems: 'center',
    justifyContent: 'center',
  },
});