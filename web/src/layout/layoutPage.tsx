import Menu from "@/components/menu"
import React, { useEffect } from "react"

type props = {
  children: React.ReactNode
}

const LayoutPage: React.FC<props> = ({ children }) => {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      localStorage.theme = "light"
    }
  }, [])

  return (
    <div
      className="w-[100vw] md:w-[520px] min-h-screen md:min-h-[90vh] mx-auto
     bg-gray-100 dark:bg-slate-800 md:my-[5vh] md:shadow-sm"
    >
      <Menu />
      {children}
    </div>
  )
}

export default LayoutPage
