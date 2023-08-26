import { FormRow, Button } from '../components'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Formik } from 'formik'
import * as yup from 'yup'
import { loginUser, registerUser } from './../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

// configuration
const registerSchema = yup.object().shape({
  name: yup.string().required('required'),
  username: yup.string().required('required').min(3).max(15),
  password: yup.string().required('required'),
  picture: yup.string(),
})

const loginSchema = yup.object().shape({
  username: yup.string().required('required'),
  password: yup.string().required('required'),
})

const initialValuesRegister = {
  name: '',
  username: '',
  password: '',
  picture: '',
}

const initialValuesLogin = {
  username: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const [pageType, setPageType] = useState('login')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/post')
      }, 2000)
    }
  }, [user, navigate])

  const handleFormSubmit = (values, props) => {
    if (isLogin) {
      dispatch(loginUser(values))
      return navigate('/post')
    }

    if (isRegister) {
      dispatch(registerUser(values))
      props.resetForm()
      setPageType('login')
    }
  }

  return (
    <div className="bg-over flex justify-center items-center">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}>
        {({ values, errors, handleChange, handleSubmit, resetForm }) => (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto  bg-white bg-opacity-50 p-4 text-center rounded-xl">
            <h2 className="text-center font-bold text-2xl">Gyararī</h2>
            {isRegister && (
              <div>
                <FormRow
                  text={'Name'}
                  type={'text'}
                  name={'name'}
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>
            )}

            <FormRow
              text={'Username'}
              type={'text'}
              name={'username'}
              value={values.username}
              onChange={handleChange}
              error={errors.username}
            />
            <FormRow
              text={'Password'}
              type={'password'}
              name={'password'}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button type={'submit'} text={isLogin ? 'LOGIN' : 'REGISTER'} />
            <p className="mt-3">
              {isLogin ? `Don't have an account?` : 'Already have an account?'}
              <span
                onClick={() => {
                  setPageType(isLogin ? 'register' : 'login')
                  resetForm()
                }}
                className="cursor-pointer px-1">
                {isLogin ? 'Sign Up ' : 'Login'}
              </span>
            </p>
          </form>
        )}
      </Formik>
    </div>
  )
}
export default Login
