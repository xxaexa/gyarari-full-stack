import Button from './Button'
import FormRow from './FormRow'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from './../features/post/postSlice'
import { useState } from 'react'
import { setCloseModal } from './../features/modal/modalSlice'
import { RiImageAddLine } from 'react-icons/ri'

const Upload = () => {
  const { user } = useSelector((state) => state.user)

  const { modal } = useSelector((state) => state.modal)
  const initialValues = {
    uploadBy: '',
    description: '',
    image: '',
  }
  const [values, setValues] = useState(initialValues)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleFile = (e) => {
    setValues({ ...values, image: e.target.files[0] })
  }

  const handleSubmit = () => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value)
    }
    dispatch(createPost(formData))
  }
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
                type={'description'}
                name={'description'}
                value={values.description}
                onChange={handleChange}
              />
              <div className="my-4">
                <label htmlFor="file" className="cursor-pointer">
                  <div className="text-4xl flex space-x-4">
                    <RiImageAddLine />
                    <p className="text-xl">{values.image.name}</p>
                  </div>

                  <input
                    id="file"
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFile}
                    className="hidden w-12"
                  />
                </label>
              </div>

              <div className="flex flex-row">
                <Button
                  type={'submit'}
                  text={'Upload'}
                  onClick={() => dispatch(setCloseModal())}
                />
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
