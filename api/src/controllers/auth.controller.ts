import { type Request, type Response } from "express"
import jwt from "jsonwebtoken"

import { User } from "@/models/user.model"
import { type IUser } from "@/types/user.type"

const login = async (req: Request, res: Response): Promise<void> => {
  const { name, email, picture } = req.body

  try {
    let user: IUser | null = await User.findOne({ email })

    if (user === null) {
      const newUser = new User({ name, email, picture })
      user = await newUser.save()
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "168h" },
    )

    res.status(200).json({
      name: `${user.name}`,
      email: `${user.email}`,
      picture: `${user.picture}`,
      token,
    })
  } catch (error) {
    res.status(400).json(error)
  }
}

const verifyToken = (req: Request, res: Response): any => {
  const authorization = req.get("Authorization")
  let token = ""

  if (
    authorization !== undefined &&
    authorization.toLowerCase().startsWith("bearer")
  ) {
    token = authorization.substring(7)
  }

  if (token === "") {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
  if (token === undefined || decodedToken === undefined) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  return res.status(200).json()
}

export { login, verifyToken }
