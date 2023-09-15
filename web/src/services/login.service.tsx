import { APP_CONST } from "@/const/configurationsCont"
import { IUser } from "@/types/user.type"

const login = async (user: IUser): Promise<boolean> => {
  try {
    const response = await fetch(APP_CONST.API_URL.AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    const data: IUser = await response.json()

    await localStorage.setItem("user", JSON.stringify(data))
    return true
  } catch (error) {
    throw new Error("Error while login")
  }
}

export { login }
