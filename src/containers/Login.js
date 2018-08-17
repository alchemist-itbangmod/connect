import React from 'react'
import GoogleLoginButton from '../components/Login/GoogleLoginButton'

const LoginPage = () => (
  <div className="container h-100 d-flex justify-content-center align-items-center flex-column">
    <p className="small">Please Login with your KMUTT Email, Let's enjoy!</p>
    <GoogleLoginButton />
  </div>
)

export default LoginPage
