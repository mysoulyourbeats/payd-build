import firebase from "firebase"

export async function getTripSummary(userId, setTripData) {
    try {
        // console.log(userId)
        const db = firebase.firestore()
        const ref = db.collection('tripAnalysisOfUsers')
                    .doc(userId)
                    .collection('setOfResultsOfEachTripOfThisUser')
                    .orderBy('time_stamp','desc')

        const doc = await ref.get()

        let temp = []
        doc.forEach(val => temp.push(val.data()))
        setTripData(temp)

    } catch (error) {
        console.log("Goli beta asgtii naii", error)
    }
}