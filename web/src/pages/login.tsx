import LayoutInit from "@/layout/layoutInit"
import { loginWithGoogle } from "@/services/firebase"
import React from "react"
type props = {}
console.log("login")
const Login: React.FC<props> = ({}) => {
  return (
    <LayoutInit>
      <h1>Hola mundo</h1>
      <button onClick={loginWithGoogle}> Login Google</button>
    </LayoutInit>
  )
}

export default Login
