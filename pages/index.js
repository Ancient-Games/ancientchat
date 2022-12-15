import { useState } from "react"
import Link from "next/link"

export default function App() {
 
 return (
  <>
   <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <div className="container-fluid">
     <div className="navbar-brand">Ancient Games</div>
     <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navigate">
      <span className="navbar-toggler-icon"></span>
     </button>
     <div id="navigate" className="navbar-collapse collapse">
      <ul className="navbar-nav">
       <li className="nav-item"><Link href="/auth/SignUp" className="nav-link">SignUp</Link></li>
       <li className="nav-item"><Link href="/auth/SignIn" className="nav-link">SignIn</Link></li>
      </ul>
     </div>
    </div>
   </nav>
  </>
 )
}