import { UseUserAuth } from "../../store"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function SignIn(){
 
 const { SignIn, SignOut, SendEmailLink, currentUser, Router } = UseUserAuth()
 
 if(currentUser !== null && currentUser.emailVerified === true){
  Router.push("/auth/Dashboard")
 }
 
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")
 
 const signInCheck = () => {
  if(email.length === 0){
   document.querySelector("#signin-email").classList.add("is-invalid")
   document.querySelector("#email-err").innerHTML = "Please enter your email address"
  }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
   document.querySelector("#email-err").innerHTML = "Please enter valid email address"
  }else if(password.length === 0){
   document.querySelector("#signin-email").classList.remove("is-invalid")
   document.querySelector("#email-err").innerHTML = ""
   document.querySelector("#signin-password").classList.add("is-invalid")
   document.querySelector("#password-err").innerHTML = "Please enter password"
  }else{
   document.querySelector("#signin-email").classList.remove("is-invalid")
   document.querySelector("#email-err").innerHTML = ""
   document.querySelector("#signin-password").classList.remove("is-invalid")
   document.querySelector("#password-err").innerHTML = ""
   SignIn(email, password).then((res) => {
    document.querySelector("#signin-button").classList.add("disabled")
    if(res.user.emailVerified){
     document.querySelector("#imp1").classList.add("p-2")
     document.querySelector("#imp1").innerHTML = "Successfully SignIn"
     setTimeout(() => {
      Router.push('/auth/Dashboard')
     }, 2000)
    }else{
     document.querySelector("#imp1").classList.add("p-2")
     document.querySelector("#imp1").innerHTML = "Your email is not verified. Please check your email to verify."
     SendEmailLink(res.user).then(() => {
      SignOut()
      setTimeout(() => {
       Router.reload()
      }, 2000)
     }).catch((err) => alert(err))
    }
   }).catch((err) => alert(err))
  }
 }
 
 return (
  <>
   <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
     <div className="navbar-brand">SignIn Page</div>
     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigate">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div id="navigate" className="navbar-collapse collapse">
      <ul className="navbar-nav">
       <li className="nav-item"><Link href="/" className="nav-link">Home page</Link></li>
       <li className="nav-item"><Link href="/auth/SignUp" className="nav-link">SignUp</Link></li>
      </ul>
     </div>
    </div>
   </nav>
   
   <div >
    <div className="ms-5 text-center text-primary border border-primary rounded w-75 mt-4" id="imp1"></div>
     <div className="form-floating w-75 ms-5 mt-4 ">
      <input type="email" id="signin-email" className="form-control" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="signin-email">Email</label>
      <div className="form-text text-danger" id="email-err"></div>
     </div>
     <div className="form-floating w-75 ms-5 mt-4 ">
      <input type="password" id="signin-password" className="form-control" placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)}/>
     <label htmlFor="signin-password">Password</label>
     <div className="form-text text-danger" id="password-err"></div>
    </div>
    <button type="button" className="btn btn-primary mt-3 ms-5 w-75" onClick={signInCheck} id="signin-button">SignIn</button>
   </div>
  </>
 )
}
