import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getMessaging } from "firebase/messaging"
import { useEffect } from "react"

const firebaseConfig = {
  apiKey: "AIzaSyBlIGib90MWK5Lrqn5r1k8svPNd5koEiAs",
  authDomain: "react-fb99.firebaseapp.com",
  projectId: "react-fb99",
  storageBucket: "react-fb99.appspot.com",
  messagingSenderId: "451687384238",
  appId: "1:451687384238:web:5cc39478821ebd7434d93f",
  measurementId: "G-EKFV09G9S1"
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)


