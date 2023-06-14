import React from 'react'
import FormSignin from './components/FormSignin'
import { useDispatch } from 'react-redux'
import { signin } from '../../../features/authSlice'


const SigninPage = () => {
const dispatch = useDispatch()

  const handleSubmit = async (payload) => {
    try {
      const response = await dispatch(signin(payload)).unwrap()
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <FormSignin onSubmit = {handleSubmit}/>
  )
}

export default SigninPage