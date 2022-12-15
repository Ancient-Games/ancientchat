import { UseUserAuth } from "../../store"
import Link from "next/link"
import { useState, useEffect } from "react"
import { serverTimestamp } from "firebase/firestore"

export default function SignUp(){
 
 const { SignUp, SendEmailLink, SignOut, currentUser, Router, addUserData } = UseUserAuth()
 if(currentUser !== null && currentUser.emailVerified === true){
  Router.push("/auth/Dashboard")
 }

 const [name, setName] = useState("")
 const [username, setUsername] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 
 function menu1(){
  if(name.length === 0){
   document.querySelector("#t-home").click()
   document.querySelector("#signup-name").classList.add("is-invalid")
   document.querySelector("#name-err").innerHTML = "Please enter your name"
   
  }else if(username.length === 0){
   document.querySelector("#t-home").click()
   document.querySelector("#signup-name").classList.remove("is-invalid")
   document.querySelector("#name-err").innerHTML = ""
   document.querySelector("#signup-username").classList.add("is-invalid")
   document.querySelector("#username-err").innerHTML = "Please enter your username"
  }else{
   document.querySelector("#signup-name").classList.remove("is-invalid")
   document.querySelector("#name-err").innerHTML = ""
   document.querySelector("#signup-username").classList.remove("is-invalid")
   document.querySelector("#username-err").innerHTML = ""
   document.querySelector("#t-menu1").click()
  }
 }
 
 const signUpCheck = () => {
  if(email.length === 0){
   document.querySelector("#signup-email").classList.add("is-invalid")
   document.querySelector("#email-err").innerHTML = "Please enter your email address"
  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
   document.querySelector("#email-err").innerHTML = "Please enter valid email address"
  }else if(password.length === 0){
   document.querySelector("#signup-email").classList.remove("is-invalid")
   document.querySelector("#email-err").innerHTML = ""
   document.querySelector("#signup-password").classList.add("is-invalid")
   document.querySelector("#password-err").innerHTML = "Please enter password"
  }else if(password.length < 8){
   document.querySelector("#signup-email").classList.remove("is-invalid")
   document.querySelector("#email-err").innerHTML = ""
   document.querySelector("#signup-password").classList.add("is-invalid")
   document.querySelector("#password-err").innerHTML = "Enter password of minimum 8 characters"
  }else{
   document.querySelector("#signup-email").classList.remove("is-invalid")
   document.querySelector("#email-err").innerHTML = ""
   document.querySelector("#signup-password").classList.remove("is-invalid")
   document.querySelector("#password-err").innerHTML = ""
   SignUp(email, password).then((res) => {
    document.getElementById("signup-button").classList.add("disabled")
    addUserData({uid: res.user.uid, email: res.user.email, password: password, name: name, username: username, created_at: serverTimestamp()})
    SendEmailLink(res.user).then(() => {
     document.querySelector("#imp2").classList.add("p-2")
     document.querySelector("#imp2").innerHTML = "You have got an email verification link. Please verify email and then SignIn."
     SignOut()
     setTimeout(() => {
      Router.push('/auth/SignIn')
     }, 2000)
    }).catch((err) => alert(err))
   }).catch((err) => alert(err))
  }
 }
 
 
 return (
  <>
   <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
     <div className="navbar-brand">SignUp page</div>
     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigate">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div id="navigate" className="navbar-collapse collapse">
      <ul className="navbar-nav">
       <li className="nav-item"><Link href="/" className="nav-link">Home page</Link></li>
       <li className="nav-item"><Link href="/auth/SignIn" className="nav-link">SignIn</Link></li>
      </ul>
     </div>
    </div>
   </nav>
   
   <ul className="nav nav-pills justify-content-center mt-2">
    <li className="nav-item">
     <a className="nav-link active" data-bs-toggle="tab" href="#home" id="t-home">
      1 
     </a>
    </li>
    <li className="nav-item">
     <a className="nav-link" data-bs-toggle="tab" href="#menu1" id="t-menu1" onClick={menu1}>
      2
     </a>
    </li>
   </ul>
   
   <div className="tab-content">
    <div className="tab-pane container active" id="home">
     <div className="ms-5 text-center text-primary border border-primary rounded w-75 mt-3" id="imp1"></div>
     <div className="form-floating w-75 ms-5 mt-3 ">
      <input className="form-control" type="text" id="signup-name" placeholder="Enter name..." onChange={(e) => setName(e.target.value)} />
      <label htmlFor="signup-name">Name</label>
      <div className="form-text text-danger" id="name-err"></div>
     </div>
     <div className="form-floating w-75 ms-5 mt-3">
      <input className="form-control" type="text" id="signup-username" placeholder="Enter username..." onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="signup-username">Username</label>
      <div className="form-text text-danger" id="username-err"></div>
     </div>
     <button type="button" className="btn btn-primary w-75 mt-3 ms-5" onClick={menu1}>Next</button>
    </div>
    
    <div className="tab-pane container fade" id="menu1">
     <div className="ms-5 text-center text-primary border border-primary rounded w-75 mt-3" id="imp2"></div>
     <div className="form-floating w-75 ms-5 mt-3 ">
      <input type="email" id="signup-email" className="form-control" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="signup-email">Email</label>
      <div className="form-text text-danger" id="email-err"></div>
     </div>
     <div className="form-floating w-75 ms-5 mt-4 ">
      <input type="password" id="signup-password" className="form-control" placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)}/>
      <label htmlFor="signup-password">Password</label>
      <div className="form-text text-danger" id="password-err"></div>
     </div>
     <div className="row w-75 ms-5">
      <button type="button" className="btn btn-primary col mt-3" onClick={() => document.querySelector("#t-home").click()}>Previous</button>
      <button type="button" className="btn btn-primary col mt-3 ms-2 " onClick={signUpCheck} id="signup-button">SignUp</button>
     </div>
    </div>
   </div>
   
  </>
 )
}
