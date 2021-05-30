export const availableRewards = [
    {
        id: 1,
        title: "Accerelaration: ...",
        eligible: true,
    },
    {
        id: 2,
        title: "Gyroscope:...",
        eligible: true,
    },
    {
        id: 3,
        title: "Sudden Turns:...",
        eligible: true,
    },
    {
        id: 4,
        title: "Too much speed:...",
        eligible: true,
    },
]

export const locations = [
    {
        id: 1,
        title: "Ride ID: ...",
        address: "K.J. Somaiya college of engg, VidyaVihar, Mumbai, Maharashtra",
        drivestatus: "No. of Sudden Turns: 2 \n Accuracy: 87%",
        bookmarked: true
    },
    {
        id: 2,
        title: "Ride ID: ...",
        address: "Naturals Ice Cream Shop, Vashi, Navi Mumbai",
        drivestatus: "No. of Sudden Turns: 7 \n Accuracy: 67%",
        bookmarked: false
    },
    {
        id: 3,
        title: "Ride ID: ...",
        address: "Lonavla",
        drivestatus: "No. of Sudden Turns: 1 \n Accuracy: 90%",
        bookmarked: true
    },
    {
        id: 4,
        title: "Ride ID: ...",
        address: "Theatre",
        drivestatus: "No. of Sudden Turns: 5 \n Accuracy: 69%",
        bookmarked: false
    },
]

export const menuList = [
    {
        id: 1,
        name: "Acceleration",
        description: "lorem ipsum dolor sit amet",
        category: "Acceleration"
    },
    {
        id: 2,
        name: "Gyroscope",
        description: "lorem ipsum dolor sit amet",
        category: "Gyroscope"
    },
    {
        id: 3,
        name: "Sudden Turns",
        description: "lorem ipsum dolor sit amet",
        category: "Sudden Turns"
    },
    {
        id: 4,
        name: "Accuracy",
        description: "lorem ipsum dolor sit amet",
        category: "Accuracy"
    },
    
]


const promos = [
    {
        id: 1,
        name: "Mirrors!",
        description: "Always use mirrors while driving!",
        calories: "1 in the Front & 2 on the Side ",
        // image: require("../assets/icons/mirror.png")
    },
    {
        id: 2,
        name: "Seatbelts",
        description: "Always wear Seatbelts!",
        calories: "400 - 570",
        // image: require("../assets/icons/seatbelt.png")
    },
    {
        id: 3,
        name: "Concentration",
        description: "Always concentrate on the road!",
        calories: "449 - 570",
        // image: require("../assets/icons/witness.png")
    },

]

const dummyData = {
    availableRewards,
    locations,
    menuList,
    promos,
};

export default dummyData;