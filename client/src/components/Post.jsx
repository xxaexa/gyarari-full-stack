import { CiHeart, CiShare1, CiCircleMore } from 'react-icons/ci'
import { useState } from 'react'
import { AiFillHeart, AiOutlineDownload } from 'react-icons/ai'
import FileSaver from 'file-saver'

const Post = ({ description, image, likes, uploadBy }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleDownload = () => {
    FileSaver.saveAs(`http://localhost:3001/${image}`, image)
  }
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }
  return (
    <div
      className="relative"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}>
      <img className="rounded-xl " src={`http://localhost:3001/${image}`} />
      <div
        className={`absolute bottom-0 w-full tracking-wider text-white text-xl bg-black bg-opacity-50 rounded-b-xl p-2 ${
          isHovering ? 'block' : 'hidden'
        }`}>
        <button
          className={`px-4 ${isLiked === true ? 'text-red-400' : null}`}
          onClick={() => {
            setIsLiked(!isLiked)
          }}>
          {isLiked === true ? <AiFillHeart /> : <CiHeart />}
        </button>
        <button className="px-4" onClick={handleDownload}>
          <AiOutlineDownload />
        </button>
        <button className="px-4" onClick={() => setOpenDetail(!openDetail)}>
          <CiCircleMore />
        </button>
        {openDetail ? (
          <div className="px-4 text-base font-thin">
            <p>{description}</p>
            <p>upload by {uploadBy}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Post
