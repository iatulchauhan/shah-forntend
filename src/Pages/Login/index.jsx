import React from 'react'
import AuthLayout from '../../Components/AuthLayout'
import CommonTextField from '../../Components/Fields/TextField'

const Login = () => {
  return (
    <AuthLayout>
      <CommonTextField placeholder={"Email id"}/>
      <CommonTextField placeholder={"Password"} type="password" showPasswordToggle/>
    </AuthLayout>
  )
}

export default Login