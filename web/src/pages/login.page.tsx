import { APP_CONST } from "@/const/configurationsCont"
import LayoutInit from "@/layout/layoutInit"
import { loginWithGoogle } from "@/services/firebase.service"
import { login } from "@/services/login.service"
import React from "react"
import GoogleButton from "react-google-button"
import { useNavigate } from "react-router-dom"
type props = {}

const LoginPage: React.FC<props> = ({}) => {
  const navigate = useNavigate()
  return (
    <LayoutInit>
      <main
        className="w-full min-h-screen md:min-h-[90vh] flex justify-center
       items-center flex-col gap-4 p-4"
      >
        <img src="task.svg" alt="" width={"300px"} />
        <p>The best place to write down your tasks and keep track of them </p>
        <GoogleButton
          onClick={() => {
            loginWithGoogle().then(user => {
              login(user).then(rest => {
                if (rest) {
                  navigate(APP_CONST.URL.HOME, { replace: true })
                }
              })
            })
          }}
        />
      </main>
    </LayoutInit>
  )
}

export default LoginPage
