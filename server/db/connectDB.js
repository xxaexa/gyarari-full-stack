import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/gensForum')
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error(`Error : ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
