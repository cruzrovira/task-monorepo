import React from "react"
import { TbMoonStars, TbSunLow } from "react-icons/tb"
type props = {}
const Menu: React.FC<props> = ({}) => {
  const [theme, setTheme] = React.useState(() => localStorage.theme)
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      localStorage.theme = "light"
      setTheme("light")
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
      localStorage.theme = "dark"
      setTheme("dark")
    }
  }
  console.log(typeof localStorage.theme)
  return (
    <div className="bg-teal-500 p-2 flex justify-between">
      <h1 className="text-white">Tasks</h1>
      {theme === "light" ? (
        <TbMoonStars
          onClick={handleClick}
          className="w-[24px] h-[24px] text-white"
        />
      ) : (
        <TbSunLow
          onClick={handleClick}
          className="w-[24px] h-[24px] text-white"
        />
      )}
    </div>
  )
}

export default Menu
