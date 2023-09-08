import { APP_CONST } from "@/const/configurationsCont"
import Login from "@/pages/login"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
type props = {}

const Router: React.FC<props> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${APP_CONST.URL.LOGIN}`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
