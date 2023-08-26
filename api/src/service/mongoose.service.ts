import { connect } from "mongoose"
const URL =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@clustertasks.duosd3h.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    : `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@clustertasks.duosd3h.mongodb.net/${process.env.MONGO_DB_NAME_DEV}?retryWrites=true&w=majority`

const initialConnectDB = (): void => {
  connect(URL)
    .then(data => {
      const name = data.connections[0].name
      console.log(`Connected to ${name} database`)
    })
    .catch(err => {
      console.error(err)
    })
}

export { initialConnectDB }
