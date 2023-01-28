import mongoose from 'mongoose'

export default async (URL: string) => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(URL)

    return mongoose
}
