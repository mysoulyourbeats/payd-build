import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import  MapView, { Marker, Polyline }  from 'react-native-maps'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { Accelerometer, Gyroscope } from 'expo-sensors'

import { addDriveData } from '../API/drivingReadings' //FIREBASE FUNC
import { initializeTrip } from '../API/drivingReadings' //FIREBASE FUNC
import axios from 'axios'
import * as firebase from 'firebase';
import { COLORS, SIZES, FONTS, icons } from '../constants'
import Loading from '../screens/Loading'

// const url = 'http://192.168.43.17:5000' // LOCALHOST:5000 (FLASK END POINT)
const url = 'https://payd-flask.herokuapp.com/' // HEROKU ENDPOINT

const NativeMap = ({ route, navigation }) => {
  
  const [isStop, setIsStop] = useState(false)
  const [userId, setUserId] = useState(firebase?.auth()?.currentUser?.uid)
  const [isLoading, setIsLoading] = useState(null)

  // const [isLocationEnabled, setIsLocationEnabled] = useState('ppp')

  let destinationOfTrip = route?.params?.destinationOfTrip

  const callToFlask = () => {
    setIsStop(true)
    setIsLoading(false)
    axios.get(`${url}/tripOver/${userId}/${tripId}/${destinationOfTrip}`)
    .then(res => { 
      console.log('res', res.data)
      setIsLoading(true)
      navigation.navigate('Stats', res.data)
    })
    .catch(error => console.log(error))
  }

  // ========================
  //    SETTING TripId
  // ========================

  const [tripId, setTripId] = useState(route?.params?.tripId? route.params.tripId : null)
  useEffect(() => {
    if(!route?.params?.tripId){
      initializeTrip(setTripId)
    }
  }, [])

  // ========================
  //    SETTING ACC, GYRO
  // ========================
 

  const [isSend, setIsSend] = useState(false)

  const [accData, setAccData] = useState({ ax: 0, ay: 0, az: 0 })
  const [accSubscription, setAccSubscription] = useState(null)

  const [gyroData, setGyroData] = useState({ gx: 0, gy: 0, gz: 0 })
  const [gyroSubscription, setGyroSubscription] = useState(null)

  const _subscribe = () => {

      setAccSubscription( Accelerometer.addListener(accData => setAccData({ ax: (Math.round(accData.x * 1000)/1000), ay: (Math.round(accData.y * 1000)/1000), az: (Math.round(accData.z * 1000)/1000) })) )
      setGyroSubscription( Gyroscope.addListener(gyroData =>  setGyroData({ gx: (Math.round(gyroData.x * 1000)/1000), gy: (Math.round(gyroData.y * 1000)/1000), gz: (Math.round(gyroData.z * 1000)/1000) })) )
  }

  const _unsubscribe = () => {
      accSubscription && accSubscription.remove()
      setAccSubscription(null)

      gyroSubscription && gyroSubscription.remove()
      setGyroSubscription(null)
  }

  useEffect(() => {
    const intervalId = setInterval(() => setIsSend(true), 5000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    _subscribe()

    return () => _unsubscribe()
  }, [])

  // ========================
  //      HERE MAPS API
  // ========================

  const speedGenre = new Map([
    ['SC1', 140],
    ['SC2', 130],
    ['SC3', 100],
    ['SC4', 90],
    ['SC5', 70],
    ['SC6', 50],
    ['SC7', 30],
    ['SC8', 11],
  ])

  const HERE_API_SPEED_URL = 'https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apiKey=5ic1GK_EUj1M6vTiQnZWOyr4l3kRa322zUrJef2SWPI&mode=fastest;car;traffic:disabled&legattributes=li'
  const HOME_API_CATEGORY_URL = 'https://reverse.geocoder.cit.api.here.com/6.2/reversegeocode.json?app_id=0eVttg5Ru5IyUwkTkt10&app_code=JMtt-611GhOU2yGv-2QoqA&mode=retrieveAddresses&maxResults=1&locationattributes=linkInfo'

  // ========================
  //    SENDING TO FIREBASE,
  //     (1 record per 8s)
  // ========================

  useEffect(() => {

    if(tripId && !isStop && isSend && location?.coords?.latitude){
      console.log(route.params.coords)
      let result

      const api_call = async() => {
        try {
          result = await axios.get(`${HERE_API_SPEED_URL}&waypoint0=geo!${location?.coords?.latitude},${location?.coords?.longitude}&waypoint1=geo!${location?.coords?.latitude},${location?.coords?.longitude}`)
          result = result?.data?.response?.route[0]?.leg[0]?.link[0]?.speedLimit? (result.data.response.route[0].leg[0].link[0].speedLimit)*3.6
                    : 'infinity'

          if(!result || result === 'infinity'){
            result = await axios.get(`${HOME_API_CATEGORY_URL}&prox=${location?.coords?.latitude},${location?.coords?.longitude},500`)
            result = result.data.Response.View[0].Result[0].Location.LinkInfo.SpeedCategory
            result = speedGenre.get(result)
          }
          let timeStamp = new Date()
          addDriveData({ acc: accData, gyro: gyroData, 
            speed: (location?.coords?.speed)*3.6,
            latitude: location?.coords?.latitude, 
            longitude: location?.coords?.longitude,
            speedLimit: result,
            timeStamp: timeStamp.toDateString() + " " + timeStamp.toLocaleTimeString()
          }, tripId)

        } catch (error) {
          console.log(error)
        } 
      }
      api_call()

      setIsSend(false)
    }

  }, [accData])


  // ========================
  //    SETTING LOCATION
  // ========================
  
  const [location, setLocation] = useState(null)
  const [polyArr, setPolyArr] = useState([])
  const [origin, setOrigin] = useState(null)

  // ========================
  //   INITIALIZE ORIGIN PT.
  // ========================
  useEffect(() => {
    (async () => {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
            setOrigin({ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude })
    })()

    }, [])
   
  const destination = route?.params? {latitude: route.params.coords.latitude, longitude: route.params.coords.longitude} 
                                     : {latitude: 19.015, longitude: 73.05}

  const GOOGLE_MAPS_API_KEY = 'AIzaSyBJkM5hjGBEOebKjHflIXWh1Y2p6r1QEPw'



  useEffect(() => {
    (async () => {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
            setLocation(location)
            setPolyArr(prev => [...prev, { latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }])        
    })()

    }, [location])


    return (
        <>
          {isLoading === false? <Loading /> 
                  : 
                  <View style={styles.container}>
                    
                      <MapView  style={styles.map} 
                        initialRegion={{
                          latitude: location? location.coords?.latitude : 19.015,
                          longitude: location? location?.coords?.longitude : 73.035,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}     
                      > 
                        { location? <Marker coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}>
                                    </Marker> : null
                        }
                        <Polyline coordinates={polyArr} strokeColor="#188783" strokeWidth={3} />
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey={GOOGLE_MAPS_API_KEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            />
                      </MapView>
                      <View
                        style={{
                            height: 100,
                            backgroundColor: COLORS.secon,
                            padding: 10,
                            width: '100%',
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            justifyContent:'center', alignItems: 'center'
                        }}
                    >

                      {/* <Text style={{ ...FONTS.b2, color: COLORS.white, fontSize: 16 }}>Latitude is {location?.coords?.latitude}</Text> 
                      <Text style={{ ...FONTS.b2, color: COLORS.white, fontSize: 16 }}>Longitude is {location?.coords?.longitude}</Text> 
                      <Text style={{ ...FONTS.b2, color: COLORS.white, fontSize: 16 }}>Speed is {location?.coords?.speed}</Text>  */}
                      {/* <Text style={{ ...FONTS.b2, color: COLORS.white, fontSize: 16 }}>is Location Enabled: {isLocationEnabled}</Text>  */}
                      <Text style={{ ...FONTS.b2, color: COLORS.white, fontSize: 16, paddingBottom: 5 }}>Speed is {Math.round(((location?.coords?.speed)*3.6) * 1000)/1000} km/h</Text>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingTop: 5,
                        }}
                      >
                        
                        <TouchableOpacity
                        disabled={isStop}
                          style={{
                              width: 100,
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: COLORS.secon,
                              borderRadius: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth:1,
                              borderColor:COLORS.white
                          }}
                          onPress={callToFlask}  >
                              <Text
                              style={{
                                  color: COLORS.white,
                                  ...FONTS.h2,
                                  fontSize: 14
                              }}>Stop Trip</Text>
                        </TouchableOpacity>
                        {/* <View style={{padding: 5  }}></View> */}
                        <View style={{ padding: 5 }}></View>
                        <TouchableOpacity
                          style={{
                              width: 180,
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: COLORS.secon,
                              borderRadius: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderWidth:1,
                              borderColor:COLORS.white
                          }}
                          onPress={() => navigation.navigate('StartJourney', {tripId, destination})}  >
                              <Text
                              style={{
                                  color: COLORS.white,
                                  ...FONTS.h2,
                                  fontSize: 14
                              }}>Change Destination</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                      
                  </View>
              } 
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#ecf0f1',
  },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  
export default NativeMap