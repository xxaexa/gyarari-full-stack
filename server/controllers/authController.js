import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Register user
export const register = async (req, res) => {
  try {
    const { name, username, password } = req.body
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      username,
      password: passwordHash,
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Logging in
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, 'abcd1234')
    delete user.password
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
