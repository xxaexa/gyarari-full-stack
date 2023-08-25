import Button from './Button'
import FormRow from './FormRow'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from './../features/post/postSlice'
import { useState, useEffect } from 'react'
import { setCloseModal } from './../features/modal/modalSlice'
import { RiImageAddLine } from 'react-icons/ri'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { app } from './../firebase/config'
import { useNavigate } from 'react-router'

const Upload = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const { modal } = useSelector((state) => state.modal)

  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const initialValues = {
    uploadBy: '',
    description: '',
    image: '',
  }
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const imageName = image.name
    const storage = getStorage(app)
    const storageRef = ref(storage, imageName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      (error) => {
        console.log(error)
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const post = { ...values, image: downloadURL }
          dispatch(createPost(post))
          dispatch(setCloseModal())
        })
      }
    )
  }

  useEffect(() => {
    if (modal === false) setTimeout(() => navigate('/post'), 3000)
  }, [])
  console.log(modal === false)

  return (
    <div className=" bg-opacity-60 absolute min-h-screen">
      {modal === true ? (
        <div className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black h-full w-full bg-opacity-80 fixed">
          <div className="flex flex-col justify-center items-center min-h-screen p-1 font-semibold tracking-widest text-white">
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto  text-center rounded-xl p-2 bg-white bg-opacity-50">
              <div className="hidden">
                <FormRow
                  type={'text'}
                  name={'uploadBy'}
                  value={(values.uploadBy = user.user.username)}
                  onChange={handleChange}
                />
              </div>

              <FormRow
                text={'Description'}
                type={'text'}
                name={'description'}
                value={values.description}
                onChange={handleChange}
              />
              <div className="my-4">
                <label htmlFor="file" className="cursor-pointer">
                  <div className="text-4xl flex space-x-4">
                    <RiImageAddLine />
                    {image && <p className="text-xl">{image.name}</p>}
                  </div>

                  <input
                    id="file"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden w-12"
                  />
                </label>
              </div>

              <div className="flex flex-row">
                <Button type={'submit'} text={'Upload'} />
                <p
                  onClick={() => dispatch(setCloseModal())}
                  className="bg-red-500 text-xl font-semibold tracking-wider text-white px-2 py-1 rounded-lg mx-auto block cursor-pointer">
                  Close
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default Upload
