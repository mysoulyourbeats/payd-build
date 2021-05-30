import firebase from "firebase"

export async function getAllUsers(setUsersData) {
    try {
        
        const db = firebase.firestore()
        const userRef = db.collection('users').orderBy('firstName')
        const userIdDocs = await userRef.get()
      
        userIdDocs.forEach(async(val) => {
            if(val.data().email !== 'admin@gmail.com'){
                const userTripSummaryRef = db.collection('tripAnalysisOfUsers')
                                    .doc(val.id)
                                    .collection('setOfResultsOfEachTripOfThisUser')
                                    .orderBy('time_stamp','desc')
            
                const userTripSummaryDoc = await userTripSummaryRef.get()
                let arrayOfTripsOfThisUser = []
                userTripSummaryDoc.forEach(temp => {arrayOfTripsOfThisUser.push(temp.data())})

                const insuranceRef = db.collection('insuranceAmount')
                                     .doc(val.id)
                
                const insuranceDoc = await insuranceRef.get()
                setUsersData(prev => [...prev, { latestAverage: insuranceDoc?.data()?.recentAverage, latestPremium: insuranceDoc?.data()?.recentPremium, initPrem: val.data().initprem, email: val.data().email, userName: (val.data().firstName + " " + val.data().lastName), arrayOfTripsOfThisUser}])
            }
        })                

    } catch (error) {
        console.log("Goli beta asgtii naii", error)
    }
}