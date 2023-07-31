import express from 'express'
import { login, register } from './../controllers/authController.js'
import upload from '../middleware/storage.js'

const router = express.Router()

router.post('/register', upload.single('picture'), register)
router.post('/login', login)

export default router
