import express from 'express'
import { createPost, getPost } from './../controllers/postController.js'
import upload from '../middleware/storage.js'

const router = express.Router()

router.post('/createPost', upload.single('image'), createPost)
router.get('/', getPost)

export default router
