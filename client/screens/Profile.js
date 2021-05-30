import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {profile} from '../API/firebaseMethods.js';

export default function Profile({navigation}) {
  const [car, setCar] = useState('');
  const [type, setType] = useState('');
  const [fuel, setFuel] = useState('');
  const [age, setAge] = useState('');
  const [yearofmanu, setYearofMAnu] = useState('');
  const [enginecapa, setEngineCapacity] = useState('');
  // const [prem, setPrem] = useState('');

  const emptyState = () => {
    setCar('');
    setType('');
    setFuel('');
    setAge('');
    setYearofMAnu('');
    setEngineCapacity('');
    // setPrem('');
  };

  const handlePress = () => {
   
    profile(car, type, fuel, age, yearofmanu, enginecapa);
      navigation.navigate('Home');
      emptyState();
  };
    

  return (
    <SafeAreaView>
     <View style={styles.container}>
       <Text style={styles.text}>Enter Car Details:</Text>

       <ScrollView onBlur={Keyboard.dismiss}>
          <TextInput
          style={styles.textInput}
          placeholder="Car Model Name : eg. Honda or Tata"
          value={car}
          onChangeText={(name) => setCar(name)}         
          >
          {/* {car == 'Honda'? setPrem(1000): null } */}
         </TextInput>
         <TextInput
          style={styles.textInput}
          placeholder="Car Type : eg. Sedan or Compact"
          value={type}
          onChangeText={(name) => setType(name)}
         />

        <TextInput
          style={styles.textInput}
          placeholder="Fuel: CNG or Petrol/Diesel"
          value={fuel}
          onChangeText={(name) => setFuel(name)}
         />

        <TextInput
          style={styles.textInput}
          placeholder="Age"
          value={age}
          onChangeText={(name) => setAge(name)}
         />
         <TextInput
          style={styles.textInput}
          placeholder="Year of Manufacture of Car"
          value={yearofmanu}
          onChangeText={(name) => setYearofMAnu(name)}
         />
         <TextInput
          style={styles.textInput}
          placeholder="Engine Capacity : eg. 1000cc or 15000cc"
          value={enginecapa}
          onChangeText={(name) => setEngineCapacity(name)}
         />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
           <Text style={styles.buttonText}> Submit</Text>
          </TouchableOpacity>
       </ScrollView>
     </View>
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#75c9bc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 200,
      padding: 5,
      backgroundColor: '#ff9999',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 15,
      alignSelf: 'center',
      margin: '5%',
    },
    buttonText: {
      fontSize:20,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inlineText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'navy',
      textAlign: 'center',
      marginTop: '5%',
    },
    text: {
      textAlign: 'center',
      fontSize: 25,
      margin: '5%',
      marginTop:'15%',
      fontWeight: 'bold',
      color: '#2E6194',
    },
    textInput: {
      width: 300,
      fontSize:18,
      borderWidth: 1,
      borderColor:'#a4eddf',
      padding: 10,
      margin: 5,
      borderRadius: 20
    },
  });