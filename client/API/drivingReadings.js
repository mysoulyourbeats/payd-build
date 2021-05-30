import firebase from "firebase"
import { Alert } from "react-native"

export async function addDriveData(driveData, tripId) {
  try {
    console.log('tripId is', tripId)
    const db = firebase.firestore()
    db.collection('tripIdOfVariousUsers')
    .doc(tripId)
    .collection('driveDataOfThisTrip')
    .add(driveData)
    .then(res => console.log('successfully posted to firebase', res))
    .catch((error) => console.log('wtf', error))
      
  } catch (error) {
    Alert.alert("Server ed up!", error.message)
  }
}

export const initializeTrip = async(setTripId) => {

  try {
    const db = firebase.firestore()
    const tripId = await db.collection('tripIdOfVariousUsers').add({})
    setTripId(tripId.id)

  } catch (error) {
    console.log(error => console.log(error))
  }
}
