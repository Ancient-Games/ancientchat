import { UseUserAuth } from "../../../store"
import { useEffect, useState } from "react"
import Dashboard from "../../../Dashboard"

export default function DashboardManage(){
 const { currentUser } = UseUserAuth()
 const [access, setAccess] = useState(false)
 
 useEffect(() => {
  if(currentUser === null){
   setAccess(false)
  }else if(!currentUser.emailVerified){
   setAccess(false)
  }else{
   setAccess(true)
  }
 }, [currentUser])
 
 return (
  <>
   { access ? <Dashboard/> : "" }
  </>
 )
}
