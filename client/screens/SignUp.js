import React, { PureComponent, useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../API/firebaseMethods.js';
import {Picker} from '@react-native-picker/picker';
import { COLORS, FONTS, SIZES, icons, dummyData } from "../constants"


export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [car, setCar] = useState('');
  const [type, setType] = useState('');
  const [fuel, setFuel] = useState('');
  const [age, setAge] = useState('');
  const [yearofmanu, setYearofManu] = useState('');
  const [enginecapa, setEngineCapacity] = useState('');

  let initPrem = 0
  let points = 0

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCar('');
    setType('');
    setFuel('');
    setAge('');
    setYearofManu('');
    setEngineCapacity('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    }else if (!car) {
      Alert.alert('Car is required.');
    } else if (!type) {
      Alert.alert('Car Type is required.');
    } else if (!age) {
      Alert.alert('Age is required.');
    }else if (!fuel) {
      Alert.alert('Fuel field is required.');
    } else if (!yearofmanu) {
      Alert.alert('Year of Manufacture field is required.');
    } else if (!enginecapa) {
      Alert.alert('Engine Capacity field is required.');
    }   else   {
      if(car === 'Honda' || car === 'Nissan' || car === 'Kia' || car === 'Hyundai' || car === 'Toyota' || car === 'Mitsubishi' || car === 'Tata' || car === 'Maruti' || car === 'Mahindra') {
        points = points + 1
      } else if(car === 'Lexus' || car === 'Ford' || car === 'Land Rover' || car === 'Skoda' || car === 'Chevrolet' || car === 'Fiat' || car === 'Renault') {
        points = points + 2
      } else if (car === 'BMW' || car === 'Mercedes' || car === 'Audi' || car === 'VolksWagen') {
        points = points + 3
      } 

      if(type === 'Hatchback' || type === 'Compact') {
        points = points + 1
      } else if(type === 'Sedan' || type === 'Convertible' || type === 'Climber') {
        points = points + 2
      } else if(type === 'SUV') {
        points = points + 3
      }

      if ( age <= 25 && age >= 18) {
        points = points + 2
      } else if ( age > 25) {
        points = points + 1
      }

      if (fuel === 'CNG' ) {
        points = points + 2 
      } else if (fuel === 'Petrol' || fuel === 'Diesel') {
        points = points + 1
      }

      if (2021 - yearofmanu < 5 ) {
        points = points + 2
      } else if (2021 - yearofmanu > 5) {
        points = points + 1
      }

      if (enginecapa < 1000) {
        initPrem = (1 + ((points+28)/100)) * 1850
      } else if (enginecapa >= 1000 && enginecapa <= 1500) {
        initPrem = (1 + ((points+28)/100)) * 2863
      } else if (enginecapa > 1500) {
        initPrem = (1 + ((points+28)/100)) * 7890
      }

      registration(
        email,
        password,
        lastName,
        firstName,
        car, 
        type, 
        fuel, 
        age, 
        yearofmanu,
        enginecapa,
        initPrem
      );
       
      // navigation.navigate('SignIn');
      emptyState();
    }
  };

  return (
    <SafeAreaView>
     <View style={styles.container}>
       <Text style={styles.text}>Create an account </Text>

       <ScrollView >
          <TextInput
          style={styles.textInput}
          placeholder="First name*"
          value={firstName}
          onChangeText={(name) => setFirstName(name)}
          />
         <TextInput
          style={styles.textInput}
          placeholder="Last name*"
          value={lastName}
          onChangeText={(name) => setLastName(name)}
         />

         <TextInput
          style={styles.textInput}
          placeholder="Enter your email*"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
         />

          <TextInput
          style={styles.textInput}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
         />
         <TextInput
          style={styles.textInput}
          placeholder="Retype your password to confirm*"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
          />
        <View style={{padding:3}}></View>

         
         <View
          style={{
            paddingLeft:5,
            borderWidth: 1.5,
            borderRadius: 15,
            borderColor: COLORS.white
          }}
        >
          <Text
          style={{
            color: COLORS.white,
            paddingLeft: 10,
            paddingTop: 5,
            fontSize: 18

          }}
          >Car Name:</Text>
          <Picker
          style={{
            color: COLORS.secondary,
            fontSize: 18,
            paddingLeft: 10
          }}
            selectedValue={car}
            onValueChange={(itemValue, itemIndex) =>
              setCar(itemValue)
            }>
            <Picker.Item label="Honda" value="Honda" />
            <Picker.Item label="Nissan" value="Nissan" />
            <Picker.Item label="Kia" value="Kia" />
            <Picker.Item label="Hyundai" value="Hyundai" />
            <Picker.Item label="Toyota" value="Toyota" />
            <Picker.Item label="Mitsubishi" value="Mitsubishi" />
            <Picker.Item label="Tata" value="Tata" />
            <Picker.Item label="Lexus" value="Lexus" />
            <Picker.Item label="Ford" value="Ford" />
            <Picker.Item label="Skoda" value="Skoda" />
            <Picker.Item label="BMW" value="BMW" />
            <Picker.Item label="Mercedes" value="Mercedes" />
            <Picker.Item label="Audi" value="Audi" />
            <Picker.Item label="VolksWagen" value="VolksWagen" />
            <Picker.Item label="Maruti" value="Maruti" />
            <Picker.Item label="Mahindra" value="Mahindra" />
            <Picker.Item label="Chevrolet" value="Chevrolet" />
            <Picker.Item label="Fiat" value="Fiat" />
            <Picker.Item label="Renault" value="Renault" />
            <Picker.Item label="Land Rover" value="Land Rover" />
          </Picker>

        </View>
        <View style={{padding:3}}></View>
         <View
          style={{
            paddingLeft:5,
            borderWidth: 1.5,
            borderRadius: 15,
            borderColor: COLORS.white
          }}
        >
          <Text
          style={{
            color: COLORS.white,
            paddingLeft: 10,
            paddingTop: 5,
            fontSize: 18

          }}
          >Car Type:</Text>
          <Picker
          style={{
            color: COLORS.secondary,
            fontSize: 18,
            paddingLeft: 10
          }}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) =>
              setType(itemValue)
            }>
            <Picker.Item label="HatchBack" value="Hatchback" />
            <Picker.Item label="Sedan" value="Sedan" />
            <Picker.Item label="Convertible" value="Convertible" />
            <Picker.Item label="SUV" value="SUV" />
            <Picker.Item label="Compact" value="Compact" />
            <Picker.Item label="Climber" value="Climber" />
          </Picker>

        </View>

            <View style={{padding:3}}></View>
        <View
        style={{
          paddingLeft:5,
          borderWidth: 1.5,
          borderRadius: 15,
          borderColor: COLORS.white
        }}
        >
          <Text
          style={{
            color: COLORS.white,
            paddingLeft: 10,
            paddingTop: 5,
            fontSize: 18

          }}
          >Fuel Type:</Text>
          <Picker
          style={{
            color: COLORS.secondary,
            fontSize: 18,
            paddingLeft: 10,
          }}
            selectedValue={fuel}
            onValueChange={(itemValue, itemIndex) =>
              setFuel(itemValue)
            }>
            <Picker.Item label="CNG" value="CNG" />
            <Picker.Item label="Petrol" value="Petrol" />
            <Picker.Item label="Diesel" value="Diesel" />
          </Picker>

        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Age*"
          value={age}
          onChangeText={(name) => setAge(name)}
         />

         <TextInput
          style={styles.textInput}
          placeholder="Year of Manufacture of Car*"
          value={yearofmanu}
          onChangeText={(name) => setYearofManu(name)}
         />

          <TextInput
          style={styles.textInput}
          placeholder="Engine Capacity*"
          value={enginecapa}
          onChangeText={(name) => setEngineCapacity(name)}
         />

          <TouchableOpacity style={styles.button} onPress={handlePress}>
           <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.inlineText}>Already have an account?</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Sign In</Text>
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
    backgroundColor: '#f06044',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    padding: 5,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: '5%',
  },
  buttonText: {
    fontSize:20,
    color: '#f06044',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop:'15%',
    fontWeight: 'bold',
    color: COLORS.white,
    
  },
  textInput: {
    width: 300,
    fontSize:18,
    borderWidth: 1.5,
    borderColor:COLORS.white,
    padding: 10,
    margin: 5,
    borderRadius: 20
  },
});