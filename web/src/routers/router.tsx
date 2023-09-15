import { APP_CONST } from "@/const/configurationsCont"
import HomePage from "@/pages/home.page"
import LoginPage from "@/pages/login.page"

import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Guardian from "./guardian"

type props = {}

const Router: React.FC<props> = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${APP_CONST.URL.LOGIN}`} element={<LoginPage />} />

        <Route element={<Guardian />}>
          <Route path={`${APP_CONST.URL.HOME}`} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
