import firebase from "firebase"

export async function getProfileDetails(userId, setProfileDetails) {
    try {
        // console.log(userId)
        const db = firebase.firestore()
        const ref = db.collection('users')
                    .doc(userId)

        const doc = await ref.get()

        // let temp = []
        // doc.forEach(val => temp.push(val.data()))
        // console.log('profile details are', doc.data())
        setProfileDetails(doc.data())

    } catch (error) {
        console.log("Goli beta masti naii", error)
    }
}

export async function getInsuranceAmount(userId, setInsuranceAmount) {
    try {
        // console.log(userId)
        const db = firebase.firestore()
        const ref = db.collection('insuranceAmount')
                    .doc(userId)

        const doc = await ref.get()

        // let temp = []
        // doc.forEach(val => temp.push(val.data()))
        console.log('Insurance details are', doc.data())
        setInsuranceAmount(doc.data())

    } catch (error) {
        console.log("Goli beta masti naii", error)
    }
}
