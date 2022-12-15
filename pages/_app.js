import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { useEffect } from "react"
import { UserAuthContextProvider } from "../store"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
   import("bootstrap/dist/js/bootstrap");
  }, [])
  
  return (
   <UserAuthContextProvider>
    <Component {...pageProps} />
   </UserAuthContextProvider>
  )
}

export default MyApp
