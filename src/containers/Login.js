import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase/app'
import { withRouter } from 'react-static'
import { Button, message, Icon } from 'antd'

import logo from '../static/logo.png'

const Logo = styled.img`
  width: 150px;
`

class LoginPage extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    this.mounted = true
    firebase.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        await this.props.history.push('/')
      }
      this.setState({ loading: false })
    })
  }

  login = () => {
    this.setState({
      loading: true
    })
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        if (this.mounted) {
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message

        message.error(
          <small>{`การเข้าสู่ระบบของคุณผิดพลาด (${errorCode})`}</small>
        )

        this.setState({
          loading: false
        })
      })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center flex-column">
        <div className="mb-3 text-center">
          <Logo src={logo} alt="IT Connect 2018" />
        </div>
        <p className="small">กรุณาเข้าสู่ระบบด้วย KMUTT Email นะครับ : )</p>
        <Button onClick={this.login} size="large" loading={this.state.loading}>
          <Icon type="google" />
          Login with Google
        </Button>
      </div>
    )
  }
}

export default withRouter(LoginPage)
