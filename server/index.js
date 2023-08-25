import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoute.js'
import postRoutes from './routes/postRoute.js'
import connectDB from './db/connectDB.js'
import 'dotenv/config'

// Configuration
const port = 3001
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
connectDB()

app.get('/', (req, res) => {
  res.json({ message: 'Server Connected' })
})

// Routes setup
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.listen(port, () => console.log('server running on port ' + port))
