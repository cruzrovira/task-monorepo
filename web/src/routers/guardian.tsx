import { APP_CONST } from "@/const/configurationsCont"
import React, { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
type props = {}

const Guardian: React.FC<props> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean | undefined>(
    undefined,
  )

  const isTokenValid = async (): Promise<boolean> => {
    const userLocal = localStorage.getItem("user")
    if (!userLocal) return false
    try {
      const user = JSON.parse(userLocal)
      const res = await fetch(APP_CONST.API_URL.AUTH_VERIFY_TOKEN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (res.ok) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }
  useEffect(() => {
    isTokenValid().then(res => {
      setIsAuthenticated(res)
    })
  }, [])

  if (isAuthenticated === true) {
    return <Outlet />
  }

  if (isAuthenticated === false) {
    return <Navigate to={APP_CONST.URL.LOGIN} replace />
  }
}

export default Guardian
