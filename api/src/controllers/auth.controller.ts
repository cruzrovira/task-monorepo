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
      },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "168h" },
    )

    res
      .status(200)
      .json({ name: `${user.name}`, email: `${user.email}`, token })
  } catch (error) {
    res.status(400).json(error)
  }
}
export { login }
