import Image from "next/image"
import AG from "./Ancient Games.jpg"
import { useState, useEffect } from "react"
import { UseUserAuth } from "./store"
import { onSnapshot, query, where } from "firebase/firestore"

export default function BeforeAncientChat(){
 const { setChatAccess, usersDB, currentUser } = UseUserAuth()
 const [userData, setUserData] = useState({})
 const condition = query(usersDB, where("email", "==", currentUser.email))
 
 useEffect(() => {
  onSnapshot(condition, (snap) => {
   const data = snap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data()
   }))
   setUserData(data[0])
  })
 }, [])
 
 return (
  <>
   <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
     <div className="navbar-brand">Welcome, {userData.data ? userData.data.name : (
        <div class="spinner-border" role="status">
         &nbsp;&nbsp;<span class="visually-hidden">Loading...</span>
        </div>
       )}</div>
     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigate">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div id="navigate" className="navbar-collapse collapse">
      <ul className="navbar-nav">
       
      </ul>
     </div>
    </div>
   </nav>
   <div className="card">
    <Image src={AG} className="card-img-top"  height="330" width="200"/>
    <div className="card-body">
     <h5 className="card-title">Ancient Games Group</h5>
     <p className="card-text">This is an web application to chat privately to our teams. Never leak this web app link. Made by ~ Abhay yadav.</p>
     <button type="button" onClick={() => setChatAccess(true)} className="btn btn-primary">Click to chat in Ancient Games Group</button>
    </div>
   </div>
  </>
 )
}