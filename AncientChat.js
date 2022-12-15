import { UseUserAuth } from "./store"
import Image from "next/image"
import AG from "./Ancient Games.jpg"
import { useState, useEffect } from "react"
import { onSnapshot, query, where, serverTimestamp, orderBy } from "firebase/firestore"

export default function AncientChat(props){

 
 const { setChatAccess, addUserChat, currentUser, usersDB, chatsDB } = UseUserAuth()
 const [message, setMessage] = useState("")
 const [userData, setUserData] = useState({})
 const [chatsData, setChatsData] = useState(false)
 
 const userCondition = query(usersDB, where("email", "==", currentUser.email))
 const chatsCondition = query(chatsDB, orderBy("created_at", "desc"))
 useEffect(() => {
  onSnapshot(userCondition, (snap) => {
   const data = snap.docs.map((doc) => ({
    id: doc.id,
    data: doc.data()
   }))
   setUserData(data[0])
  })
 }, [])
 
 onSnapshot(chatsCondition, (snap) => {
  const data = snap.docs.map((doc) => ({
   id: doc.id,
   data: doc.data()
  }))
  setChatsData(data)
 })
 
 const sendMessage = () => {
  if(message.length !== 0){
   addUserChat({uid: currentUser.uid, username: userData.data.username, message, created_at: serverTimestamp()})
   setMessage("")
  }
 }
 
 return (
  <>
   <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
     <div className="navbar-brand">&nbsp;<i className="bi bi-arrow-left" onClick={() => setChatAccess(false)}></i>&nbsp;&nbsp;&nbsp;Ancient Games Chat </div>
     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigate">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div id="navigate" className="navbar-collapse collapse">
      <ul className="navbar-nav">
       
      </ul>
     </div>
    </div>
   </nav>
   <div style={{height: "83.8vh"}} className="position-relative">
    <Image src={AG}  className="opacity-25 w-100 h-100" />
    <div className="w-100 position-absolute top-0 overflow-scroll" style={{height: "87%"}}>
     {
      chatsData ? chatsData.map((doc) => {
       if(doc.data.username === userData.data.username){
        return (
         <div className="bg-primary rounded p-2 mx-2 my-2 w-50 position-relative" style={{right:  "-46%"}}>
          <div className="text-dark fw-bold" style={{fontSize: "13px"}}>
           {doc.data.username}
          </div>
          <div className="fw-bold fs-6 text-white">
           {doc.data.message}
          </div>
          <div className="text-dark" style={{fontSize: "13px"}}>
           {
            doc.data.created_at ? new Date(doc.data.created_at.toMillis()).getFullYear() === new Date().getFullYear() && new Date(doc.data.created_at.toMillis()).getMonth() === new Date().getMonth() ? 
              new Date(doc.data.created_at.toMillis()).getDate() === new Date().getDate() ? "today, " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : (new Date().getDate() - new Date(doc.data.created_at.toMillis()).getDate()) === 1 ? "yesterday, " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : new Date(doc.data.created_at.toMillis()).toLocaleDateString() + " " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() 
                : new Date(doc.data.created_at.toMillis()).toLocaleDateString() + " " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : ""
           }
          </div>
         </div>
        )
       }else{
        return (
         <div className="bg-dark rounded p-2 mx-2 my-2 w-50 position-relative">
          <div className="text-danger" style={{fontSize: "13px"}}>
           {doc.data.username}
          </div>
          <div className="fw-bold fs-6 text-white">
           {doc.data.message}
          </div>
          <div className="text-danger" style={{fontSize: "13px"}}>
           {
            doc.data.created_at ? new Date(doc.data.created_at.toMillis()).getFullYear() === new Date().getFullYear() && new Date(doc.data.created_at.toMillis()).getMonth() === new Date().getMonth() ? 
              new Date(doc.data.created_at.toMillis()).getDate() === new Date().getDate() ? "today, " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : (new Date().getDate() - new Date(doc.data.created_at.toMillis()).getDate()) === 1 ? "yesterday, " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : new Date(doc.data.created_at.toMillis()).toLocaleDateString() + " " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() 
                : new Date(doc.data.created_at.toMillis()).toLocaleDateString() + " " + new Date(doc.data.created_at.toMillis()).toLocaleTimeString() : ""
           }
          </div>
         </div>
        )
       }
      }) : ""
     }
    </div>
    <textarea className="form-control position-absolute w-75" style={{top: "88%", left: '8px'}} id="message" placeholder="Message..." onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
    <button className="btn btn-primary position-absolute p-2" style={{top: "90%", right: "8px", width: '65px'}} id="message-send" onClick={sendMessage}>Send</button>
   </div>
  </>
 )
}