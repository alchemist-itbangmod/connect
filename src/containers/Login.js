import React from 'react'
import Layout from '../components/Layout'
import { Button } from 'antd'

const LoginPage = () => (
  <Layout>
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <Button size="large">Login with Google</Button>
    </div>
  </Layout>
)

export default LoginPage
