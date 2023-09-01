import { type NextFunction, type Request, type Response } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
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

  next()
}

export { authMiddleware }
