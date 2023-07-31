import User from '../models/User.js'

// Read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(201).json(user)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}