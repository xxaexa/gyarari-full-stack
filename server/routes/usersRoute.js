import express from 'express'
import { getUser } from './../controllers/usersController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

// Read
router.get('/:id', verifyToken, getUser)

export default router
