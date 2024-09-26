import mongoose from "mongoose";

const connectToDatabase = async () => {
    const MongoUri = process.env.MONGO_URI
    const dbName = process.env.DB_NAME
    try {
        await mongoose.connect(`${MongoUri}/${dbName}`)
        const connection = mongoose.connection
        console.log(`MongoDb Connected ! ${connection.host}/${dbName}`)

    } catch (error) {
        console.log(error)
    }
}

export { connectToDatabase }