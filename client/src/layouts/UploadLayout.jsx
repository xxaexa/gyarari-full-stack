import FormRow from '../components/FormRow'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from './../features/post/postSlice'
import { useState } from 'react'
import { setCloseModal } from './../features/modal/modalSlice'

const UploadLayout = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
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
              <FormRow
                type={'text'}
                name={'uploadBy'}
                value={(values.uploadBy = user.username)}
                onChange={handleChange}
              />
              <FormRow
                text={'Description'}
                type={'description'}
                name={'description'}
                value={values.description}
                onChange={handleChange}
              />
              <FormRow
                text={'Image'}
                type={'file'}
                name={'image'}
                accept=".png, .jpg, .jpeg"
                onChange={handleFile}
              />
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
export default UploadLayout
