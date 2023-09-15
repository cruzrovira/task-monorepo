import LayoutPage from "@/layout/layoutPage"
import React from "react"
type props = {}
const HomePage: React.FC<props> = ({}) => {
  console.log("home")
  return (
    <LayoutPage>
      <h1>home</h1>
    </LayoutPage>
  )
}

export default HomePage
