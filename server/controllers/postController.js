import Post from '../models/Post.js'

export const createPost = async (req, res) => {
  try {
    const { uploadBy, description, image } = req.body
    const newPost = new Post({
      uploadBy,
      description,
      image,
      likes: {},
    })
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
