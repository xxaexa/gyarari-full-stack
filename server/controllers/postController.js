import Post from '../models/Post.js'
import User from './../models/User.js'

export const createPost = async (req, res) => {
  try {
    const { uploadBy, description } = req.body
    const image = req.file.filename
    const newPost = new Post({
      uploadBy,
      description,
      image,
      likes: {},
    })
    console.log(image)
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await Post.find({})
    res.status(201).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
