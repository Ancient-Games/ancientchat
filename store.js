import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { auth, db } from "./firebase"
import { 
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 onAuthStateChanged,
 signOut,
 sendEmailVerification,
} from "firebase/auth"
import {
 addDoc,
 getDoc,
 doc,
 collection,
 Timestamp,
} from "firebase/firestore"

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({ children }) => {
 
 const usersDB = collection(db, "users")
 const chatsDB = collection(db, "chats")
 const Router = useRouter()
 const [currentUser, setCurrentUser] = useState(null)
 const [chatAccess, setChatAccess] = useState(false)
 
 const SignUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
 }
 
 const SignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
 }
 
 const SignOut = () => {
  return signOut(auth)
 }
 
 const SendEmailLink = (registerUser) => {
  return sendEmailVerification(registerUser)
 }
 
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (res) => {
   setCurrentUser(res)
  })
  
  return () => {
   unsubscribe()
  }
 }, [])
 
 const addUserData = (data) => {
  return addDoc(usersDB, data)
 }
 
 const addUserChat = (data) => {
  return addDoc(chatsDB, data)
 }
 

 const methods = {
  SignUp,
  SignIn,
  SignOut,
  SendEmailLink,
  currentUser,
  addUserData,
  Router,
  chatAccess,
  setChatAccess,
  addUserChat,
  chatsDB,
  usersDB,
  
 }
 
 return (
  <UserAuthContext.Provider value={methods}>
   { children }
  </UserAuthContext.Provider>
 )
}

export const UseUserAuth = () => {
 return useContext(UserAuthContext)
}