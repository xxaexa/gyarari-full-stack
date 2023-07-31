import { PiUploadSimpleBold } from 'react-icons/pi'
import { CgLogOut } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { setOpenModal } from './../features/modal/modalSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <nav className="tracking-widest text-xl bg-black bg-opacity-75 text-white">
      <ul className="flex flex-wrap justify-between py-2 px-1 shadow-2xl shadow-gray-950">
        <li className="text-2xl font-bold px-5">
          <Link to={'/post'}>Gyararī</Link>
        </li>
        <li className="flex space-x-6 px-4">
          <p>{user.username}</p>
          <button
            onClick={() => dispatch(setOpenModal())}
            className="cursor-pointer">
            <PiUploadSimpleBold />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              dispatch(logoutUser())
              navigate('/')
            }}>
            <CgLogOut />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
