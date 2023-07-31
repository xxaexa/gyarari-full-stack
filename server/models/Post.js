import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    uploadBy: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 5,
    },
    image: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', PostSchema)

export default Post
