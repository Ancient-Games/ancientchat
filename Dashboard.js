import Image from "next/image"
import AG from "./Ancient Games.jpg"
import { useState } from "react"
import AncientChat from "./AncientChat"
import BeforeAncientChat from "./BeforeAncientChat"
import { UseUserAuth } from "./store"

export default function Dashboard(){
 const { chatAccess } = UseUserAuth()
 
 return (
  <>
   { chatAccess ? <AncientChat/> : <BeforeAncientChat/> }
  </>
 )
}