import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../API/firebaseMethods.js';
import { COLORS } from '../constants/theme.js';


export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthCorrect, setIsAuthCorrect] = useState(null)

  useEffect(() => {
    if(isAuthCorrect!==null){   
        if(isAuthCorrect)
          navigation.navigate('Home')   
       else 
          Alert.alert('Incorrect email or password') 
        
        setIsAuthCorrect(null)
    }
  }, [isAuthCorrect])

  const handlePress = () => {
    if (!email) {
      Alert.alert('Email field is required.');
      navigation.navigate('SignIn')
    }

    if (!password) {
      Alert.alert('Password field is required.');
      navigation.navigate('SignIn')
    }

    signIn(email, password, setIsAuthCorrect);
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign in to your account:</Text>

      <TextInput
        style={styles.formInput}
        placeholder="Enter your email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.formInput}
        placeholder="Enter your password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 5,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "2%",
  },
  buttonText: {
    fontSize:20,
    color: '#f06044',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f06044',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: 300,
    fontSize:18,
    borderWidth: 1.5,
    borderColor:COLORS.white,
    padding: 10,
    margin: 5,
    borderRadius: 20
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    margin: 10,
    fontWeight: 'bold',
    color: COLORS.white,
  }
});