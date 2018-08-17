import React from 'react'
import firebase from 'firebase/app'
import { withRouter } from 'react-static'
import { Button } from 'antd'

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

    try {
      firebase.auth().signInWithRedirect(provider)
    } catch (error) {
      // Handle Error here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;

      console.log(`${errorCode}: ${errorMessage}`)
      this.setState({
        loading: false
      })
    }
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
