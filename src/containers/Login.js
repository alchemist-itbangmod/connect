import React from 'react'
import firebase from 'firebase/app'
import { withRouter } from 'react-static'
import { Button, message } from 'antd'

class LoginPage extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
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
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        const errorCode = err.code
        const errorMessage = err.message

        console.log(`${errorCode}: ${errorMessage}`)
        message.error(<small>{`Authentication Failed (${errorCode})`}</small>)

        this.setState({
          loading: false
        })
      })
  }

  render() {
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center flex-column">
        <p className="small">
          Please Login with your KMUTT Email, Let's enjoy!
        </p>
        <Button onClick={this.login} size="large" loading={this.state.loading}>
          Login with Google
        </Button>
      </div>
    )
  }
}

export default withRouter(LoginPage)
